import express, { Application, Request, Response } from "express"
import cors from 'cors'
import dotenv from 'dotenv'
import OpenAI from 'openai';



const PORT: number = 8000
dotenv.config()

const app: Application = express()
app.use(cors())
app.use(express.json())


const API_KEY = process.env.API_KEY

const openai = new OpenAI({
    apiKey: API_KEY // This is also the default, can be omitted
  });



app.post("/completions", async (req: Request, res: Response) => {
    try {
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: "Create a SQL request to " + req.body.message}]
        })
        res.send(chatCompletion.choices[0].message)

    } catch (error) {
        console.error(error)
        res.status(500).send("Server error")
    }
})

app.listen(PORT, () => console.log(`Your server is running on PORT ${PORT}`))