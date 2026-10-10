const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

// CORS跨域设置，允许前端网页访问
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if(req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

const DS_KEY = process.env.DEEPSEEK_KEY;
const DS_URL = "https://api.deepseek.com/v1/chat/completions";

app.post('/api/chat', async (req,res)=>{
  try{
    const resp = await fetch(DS_URL,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${DS_KEY}`
      },
      body:JSON.stringify(req.body)
    })
    const data = await resp.json();
    res.json(data);
  }catch(e){
    res.status(500).json({error:e.message})
  }
})

const port = process.env.PORT || 10000;
app.listen(port,()=>{
  console.log(`server running on port ${port}`);
})
