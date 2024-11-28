

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const contactResponseMessage = document.getElementById('response-message');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const description = document.getElementById('description').value;

    const formData = { name, email, description };

    // Send form data to server via Fetch API
    fetch('http://localhost:5500/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (contactResponseMessage) {
            contactResponseMessage.innerHTML = `<p>${data.message}</p>`;
        }
    })
    .catch(error => {
        if (contactResponseMessage) {
            contactResponseMessage.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    });
});

// Newsletter Subscription
const newsletterForm = document.querySelector('.newsletter form');
const newsletterResponseMessage = document.createElement('div');
newsletterForm.appendChild(newsletterResponseMessage);

newsletterForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('newsletteremail').value;

    const formData = { email };

    // Send form data to server via Fetch API
    fetch('http://localhost:5500/newsletter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (newsletterResponseMessage) {
            newsletterResponseMessage.innerHTML = `<p>${data.message}</p>`;
        }
    })
    .catch(error => {
        if (newsletterResponseMessage) {
            newsletterResponseMessage.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    });
});

