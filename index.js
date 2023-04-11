const express = require(`express`)
const app = express()
app.set('trust proxy', true)

app.listen(8080, ()=>{
    console.log(`listening on port 8080`)
})

app.get(`/IP`, (req, res)=>{
    res.end("Your IP Addresss is: " + req.socket.remoteAddress);
})