const express = require(`express`)
const app = express()
app.set('trust proxy', true)
const port =process.env.PORT || 8080

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})

app.get(`/IP`, (req, res)=>{
    res.end("Your IP Addresss is: " + req.socket.remoteAddress);
})