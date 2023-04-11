const express = require(`express`)
const app = express()
app.set('trust proxy', true)
const port = 8080 || process.env.PORT

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})

app.get(`/IP`, (req, res)=>{
    res.end("Your IP Addresss is: " + req.socket.remoteAddress);
})