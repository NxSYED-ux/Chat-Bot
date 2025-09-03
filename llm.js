import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";
dotenv.config();

const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo"
});

async function run() {
    const response = await model.invoke("Hello");
    console.log(response.content); // response is a ChatMessage
}

run();
