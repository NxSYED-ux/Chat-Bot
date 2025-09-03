import express from "express";
import cors from "cors";
import morgan from "morgan";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));


app.use(express.static("public"));


const MODEL = process.env.OLLAMA_MODEL || "mistral"; // or "mixtral"
const OLLAMA_URL = process.env.OLLAMA_URL || "http://127.0.0.1:11434"; // default ollama


// Minimal open-ended chat (no rules yet)
// Body: { message: string, history?: [{role, content}] }
app.post("/chat", async (req, res) => {
    try {
        const { message, history = [] } = req.body || {};
        if (!message || typeof message !== "string") {
            return res.status(400).json({ error: "Missing 'message' string in body" });
        }
        
        // Compose messages for Ollama chat API
        const messages = [
            // You can include a neutral system prompt to keep it very open-ended.
            { role: "system", content: "You are a helpful, neutral assistant. Answer succinctly." },
            ...history,
            { role: "user", content: message }
        ];
        
        // Call Ollama Chat API
        const resp = await axios.post(`${OLLAMA_URL}/api/chat`, {
            model: MODEL,
            messages,
            stream: false // keep it simple for step 1
        }, { timeout: 120000 });
        
        
        const reply = resp?.data?.message?.content || "(no response)";
        return res.json({ reply });
    } catch (err) {
        console.error("/chat error", err?.response?.data || err.message);
        return res.status(500).json({ error: "Chat backend error", detail: err.message });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Open chatbot listening on http://localhost:${PORT}`);
    console.log(`Using model: ${MODEL} @ ${OLLAMA_URL}`);
});