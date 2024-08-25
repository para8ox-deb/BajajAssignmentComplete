const express = require('express');
const cors = require('cors');
const app = express();
// const port = 5000;

const PORT = process.env.PORT || 5000;




app.use(cors()); // Enable the CORS
app.use(express.json()); // Middleware

app.post('/bfhl', (req, res) => {
    console.log('Received request:', req.body);

    const { data } = req.body;

    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, error: "Invalid input format" });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));

    const highestLowercase = alphabets.filter(item => item === item.toLowerCase())
                                      .sort()
                                      .slice(-1);

    const response = {
        is_success: true,
        user_id: "Aakash Kumar",
        email: "aakash.kumar2021@vitstudent.ac.in",
        roll_number: "21BRS1431",
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercase
    };

    console.log('Sending response:', response);
    res.status(200).json(response);
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});