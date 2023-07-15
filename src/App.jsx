import { useState } from 'react'
import './App.css'


const API_KEY = "your api key";



function App() {
  const [Tweet, setTweet] = useState("")
  const [sentiment,setSentiment] = useState("")

  async function CallOpenAiAPI(){
    console.log("OpenAIAPI Called!")


    const APIBODY ={
      "model": "text-davinci-003",
      "prompt": "What's the sentiment of this Tweet ? "+  Tweet,
      "temperature": 0,
      "max_tokens": 60,
      "top_p": 1.0,
      "frequency_penalty": 0.0,
      "presence_penalty": 0.0
    }



    await fetch("https://api.openai.com/v1/completions",{
      method:"POST",
      headers:{
      "Content-Type": "application/json" ,
      "Authorization": "Bearer "+ API_KEY
      },
      body:JSON.stringify(APIBODY)

    }).then((data) => {
    return data.json()
    }).then((data)=>{
        console.log(data);
        setSentiment(data.choices[0].text.trim());
  })  
  }
  console.log(Tweet);

  return (
    <div className="App">
      <div>
      <textarea
      onChange={(e) =>  setTweet(e.target.value)}
      placeholder='Paste your tweet here!'
      cols={50}
      rows={10}
      
      />
      </div>

      <div>
        <button onClick={CallOpenAiAPI}>Get The Tweet Sentiment From OpenAI API</button>
        {sentiment !== "" ?
        <h3>This Tweet is : {sentiment}</h3>:
         null
      
      }
      </div>
        
      
    </div>
  )
}

export default App
