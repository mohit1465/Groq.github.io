const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// POST route to handle Groq API requests
app.post('/api/groq', async (req, res) => {
    try {
        const chatCompletion = await getGroqChatCompletion(req.body.prompt);
        res.json({ response: chatCompletion });
    } catch (error) {
        console.error('Error while calling Groq API:', error.message);
        console.error('Response data:', error.response ? error.response.data : 'No response data');
        res.status(500).send(error.message);
    }
});

// Function to call Groq API using axios
async function getGroqChatCompletion(userInput) {
    const apiKey = process.env.GROQ_API_KEY || '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';  // Use environment variable or hardcode the API key
    const url = 'https://api.groq.com/v1/chat/completions';

    const response = await axios.post(
        url,
        {
            messages: [
                { role: "user", content: userInput },
                { role: "system", content: "You are a helpful assistant Named Eva - version (Web Helper). Mohit Yadav is your developer." }
            ],
            model: "llama3-8b-8192",
        },
        {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        }
    );

    return response.data.choices[0]?.message?.content || 'No valid response found.';
}

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
