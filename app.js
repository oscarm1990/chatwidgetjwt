const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the "public" directory

// Endpoint to generate JWT token
app.post('/generate-token', (req, res) => {
    const { name, email, sharedSecret } = req.body;

    if (!name || !email || !sharedSecret) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const timestamp = Math.round((new Date()).getTime() / 1000);
    const payload = {
        name: name,
        email: email,
        iat: timestamp,
        external_id: name + '1234' // Combine name and "1234"
    };

    // Generate the JWT token
    const token = jwt.sign(payload, sharedSecret);
    res.json({ token });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
