import  express  from "express";
import * as dotenv from 'dotenv';
import cors from 'cors'
// cors is for generating cross origion request
import { Configuration, OpenAIApi } from "openai";
// to be able to use dotenv variables we need to be able  to use
dotenv.config();
// console.log(process.env.OPENAI_API_KEY);
// now start with configuration
const configuration = new Configuration({
    apiKey:process.env.OPENAI_API_KEY,
});


// CREATE THE INSATANCE OF OPENAI
const openai = new OpenAIApi(configuration);

// initialize our express application

const app = express();
// make cross origion requests

app.use(cors());
// below line will allow us to pass jason between frontend and backend
app.use(express.json());

app.get('/', async(req,res)=>{
    res.status(200).send({
        message:"helloworld",
    })
})

// this one allows to have payload, and we can get the data from the body of the frontend req
app.post('/', async(req,res)=>{
    try{
const prompt = req.body.prompt;
// now we want to get the response from openai
const response = await openai.createCompletion({
    model: "text-davinci-003",
  prompt: `${prompt}`,
  temperature: 0,
  max_tokens: 3000,
  top_p: 1.0,
  frequency_penalty: 0.0,
  presence_penalty: 0.0,
});

res.status(200).send({
    bot:response.data.choices[0].text
})
    }catch(error){
console.log(error);
res.status(500).send({error})
    }
})

// now the server should always listen to the request
app.listen(5000,()=>{console.log('https://basic-chatgpt.onrender.com');})

