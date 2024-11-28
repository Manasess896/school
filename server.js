const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5500;

// Initialize Firebase Admin SDK
const serviceAccount = require("./psychic-heading-419408-firebase-adminsdk-llays-e5e062b7c4.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.database();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to log request method and URL
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

// Middleware to verify token
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }
    req.userId = decoded.id;
    next();
  });
}

// Function to verify password
async function verifyPassword(uid, password) {
  const user = await admin.auth().getUser(uid);
  // Assuming you have a way to verify the password, e.g., comparing hashed passwords
  // This is a placeholder for actual password verification logic
  return password === user.passwordHash; // Replace with actual verification logic
}

// Endpoint to handle login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await admin.auth().getUserByEmail(username);
    const validPassword = await verifyPassword(user.uid, password);

    if (validPassword) {
      const token = jwt.sign({ id: user.uid }, process.env.JWT_SECRET, {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in: ' + error.message });
  }
});

// Endpoint to serve admin panel
app.get('/admin', verifyToken, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Endpoint to handle contact form submissions
app.post('/contact', async (req, res) => {
    const { name, email, description } = req.body;

    // Basic validation
    if (!name || !email || !description) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Additional validation
    if (!validateEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        // Save data to Firebase
        const contactRef = db.ref('contacts').push();
        await contactRef.set({
            name,
            email,
            description,
            timestamp: admin.database.ServerValue.TIMESTAMP
        });
        res.status(200).json({ message: 'Contact form submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting contact form: ' + error.message });
    }
});

// Endpoint to handle newsletter subscriptions
app.post('/newsletter', async (req, res) => {
    const { email } = req.body;

    // Basic validation
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    // Additional validation
    if (!validateEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        // Save data to Firebase
        const newsletterRef = db.ref('newsletter').push();
        await newsletterRef.set({
            email,
            timestamp: admin.database.ServerValue.TIMESTAMP
        });
        res.status(200).json({ message: 'Newsletter subscription successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error subscribing to newsletter: ' + error.message });
    }
});


// Function to validate email format
function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${port} is already in use. Trying another port...`);
    app.listen(0, () => {
      console.log(`Server started on http://localhost:${app.address().port}`);
    });
  } else {
    console.error('Server error:', err);
  }
});
