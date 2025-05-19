const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse URL-encoded data (form submissions)
app.use(bodyParser.urlencoded({ extended: false }));
// Middleware to parse JSON data
app.use(bodyParser.json());

// Serve static files from the 'PortfolioPage' directory (your HTML, CSS, frontend JS)
// Assuming server.js is in PortfolioPage directory. If it's one level up, adjust path.
app.use(express.static(__dirname));

// Endpoint to handle contact form submissions
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    console.log('Contact Form Submission:');
    console.log(\`Name: \${name}\`);
    console.log(\`Email: \${email}\`);
    console.log(\`Message: \${message}\`);

    // In a real application, you would:
    // 1. Sanitize inputs
    // 2. Send an email (e.g., using Nodemailer)
    // 3. Store the message in a database
    // For now, we just send a success response.

    res.json({ success: true, message: 'Form submitted successfully! Thank you.' });
});

// Serve index.html for /thebearvoice route
app.get('/thebearvoice', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the main HTML file for any GET request that doesn't match a static file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(\`Server listening at http://localhost:\${port}\`);
});
