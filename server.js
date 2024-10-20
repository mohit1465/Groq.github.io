const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Placeholder function to simulate Groq API response
async function getGroqChatCompletion(userInput) {
    // Simulated response for now
    return {
        choices: [
            {
                message: {
                    content: `Simulated response for: ${userInput}`
                }
            }
        ]
    };
}

// Define the API endpoint
app.post('/api/groq', async (req, res) => {
    try {
        const chatCompletion = await getGroqChatCompletion(req.body.prompt);
        res.json({ response: chatCompletion });
    } catch (error) {
        console.error('Error while calling Groq API:', error.message);
        res.status(500).send(error.message);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
