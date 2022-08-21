const express = require('express');
const app = express();
const userRouter = require('./users');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("Hello world!");
})
app.post('/', (req, res) => {
  res.send("Hello world!");
})

app.put('/',(req,res)=>{
  res.send("Hello world");
})
app.delete('/',(req,res)=>{
  res.send("Hello world");
})
app.use('/users', userRouter);
const port = process.env.PORT || 5000;
app.listen(port, () => `Server running on port ${port} 🔥`);