const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Firebase Admin SDK Initialization
const serviceAccount = require("./psychic-heading-419408-firebase-adminsdk-llays-e5e062b7c4.json");
// Replace with your Realtime Database URL
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});

const PORT = process.env.PORT || 3000; // Change the port to 3000 or use environment variable

// Middleware
app.use(cors()); // Ensure CORS middleware is at the top
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Token verification middleware
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    admin.auth().verifyIdToken(token)
        .then(decodedToken => {
            req.user = decodedToken;
            next();
        })
        .catch(error => {
            console.error("Token verification error:", error);
            res.status(401).json({ message: "Unauthorized" });
        });
};

// Middleware to check if the user is authenticated
const checkAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/login');
    }

    admin.auth().verifyIdToken(token)
        .then(decodedToken => {
            req.user = decodedToken;
            next();
        })
        .catch(error => {
            console.error("Token verification error:", error);
            res.redirect('/login');
        });
};

// Route: Serve Login Page
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html")); // Adjust the path as needed
});

// Route: Serve Admin Page
app.get("/", checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "admin.html")); // Adjust the path as needed
});

// Route: Login API
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        // Verify the user's credentials using Firebase Admin SDK
        const user = await admin.auth().getUserByEmail(email);
        const customToken = await admin.auth().createCustomToken(user.uid);

        res.status(200).json({ token: customToken });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(401).json({ message: "Invalid email or password" });
    }
});

// Route: Logout API
app.post("/logout", (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logout successful" });
});

// Catch-all route for handling 404 errors
app.use((req, res, next) => {
    res.status(404).send("Sorry, we couldn't find that!");
});

// Start Server
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${server.address().port}`);
});
