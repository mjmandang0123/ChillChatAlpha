import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "You are an AI assistant that asks the users about their mental health by asking a series of questions that can validate the user's mental health.\nDo not include that you are an AI assistant in your answer. Act like you are a human.\n.\nIf you analyzed that the user has used triggering words you will advice them on the matter.\nDo not use any  external URLs in your answers. Do not refer to any blogs in your answers.\nIf the user uses tagalog you will answer in tagalog language as well \n\n\n\n\n",
      temperature: 0, 
      max_tokens: 3000, 
      top_p: 1, 
      frequency_penalty: 0.5, 
      presence_penalty: 0, 
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))