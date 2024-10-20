const express = require('express');
const Groq = require('groq-sdk');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize Groq with your API key
const groq = new Groq({ apiKey: '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' }); // Replace with process.env.GROQ_API_KEY for production

app.post('/api/groq', async (req, res) => {
    try {
        const chatCompletion = await getGroqChatCompletion(req.body.prompt); // Pass the user's input
        res.json({ response: chatCompletion });
    } catch (error) {
        console.error('Error while calling Groq API:', error.message);
        console.error('Response data:', error.response ? error.response.data : 'No response data');
        res.status(500).send(error.message);
    }
});

async function getGroqChatCompletion(userInput) {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: userInput, // Use the user input here
            },
            {
                role: "system",
                content: "You are a helpful assistant Named Eva - version (Web Helpper). Mohit yadav is your developer.",
            },
        ],
        model: "llama3-8b-8192",
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
