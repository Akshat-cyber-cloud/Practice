import axios from "axios";
import readline from "readline";
import dotenv from "dotenv";
dotenv.config();

const messages = [{ role: "system", content: "You are a helpful assistant." }];
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const ask = () => rl.question("You: ", async (input) => {
    messages.push({ role: "user", content: input });

    try {
        const res = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            { model: "llama-3.1-8b-instant", messages },
            { headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` } }
        );

        const reply = res.data.choices[0].message.content;
        messages.push({ role: "assistant", content: reply });
        console.log("\nAI:", reply, "\n");
    } catch (err) {
        console.log("Error:", err.response?.data?.error?.message || err.message);
    }

    ask();
});

ask();