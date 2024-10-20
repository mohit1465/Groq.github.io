const express = require('express');
const Groq = require('groq-sdk');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Allows requests from any origin
app.use(express.json());

// Initialize Groq with your API key
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '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' });

// POST route to handle Groq API requests
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

// Function to call Groq API and get completion
async function getGroqChatCompletion(userInput) {
    const completion = await groq.chat.completions.create({
        messages: [
            { role: "user", content: userInput },
            { role: "system", content: "You are a helpful assistant Named Eva - version (Web Helper). Mohit Yadav is your developer." }
        ],
        model: "llama3-8b-8192",
    });

    // Extract the response text from the API response
    return completion.choices[0]?.message?.content || 'No valid response found.';
}

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
