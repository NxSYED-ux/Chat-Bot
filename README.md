# Open-Ended AI Chatbot (Node.js + Ollama + Mistral/Mixtral)

A simple chatbot server + web UI powered by [Ollama](https://ollama.ai/) and open-source LLMs (Mistral / Mixtral).  
This is **Step 1** of a larger project: starting with an open-ended chatbot, then adding rules, a custom website widget, and database integration.

---

## Features
- Node.js backend using **Express**.
- Connects to **Ollama** (running locally or on your server).
- Works with any Ollama model (`mistral`, `mixtral`, `llama2`, etc.).
- Lightweight **HTML/JS frontend** served at `/`.
- Easy deployment on **AWS EC2**, VPS, or local machine.
- Ready for extension (rules, DB queries, custom chatbot widget).

---

## Prerequisites
- **Node.js 18+** installed
- **Ollama** installed → [Download Ollama](https://ollama.ai)
- At least one model pulled (e.g. Mistral):

  ```bash
  ollama pull mistral



