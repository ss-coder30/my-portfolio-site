const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 8080; // or any port you prefer

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (your HTML and CSS)
app.use(express.static('public'));

// POST endpoint for handling form submissions
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;

    // Create a transporter using your email service credentials
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    // Email configuration
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: '30shaurya@gmail.com',
        subject: `New form submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully!');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
