import express, {json} from "express";
import cors from "cors";

const app = express()
app.use(express.json())
app.use(cors())
app.use(json())

const tweteroos = []
const usuarios = []



app.post("/sign-up",(req,res)=>{
const usuario = req.body
usuarios.push(usuario)
res.send("ok")
})

app.post("/tweets",(req,res)=>{
    const tweet = req.headers
    if(usuarios.find(usu => usu.username == tweet.user)){
        tweteroos.push(tweet)
        res.send("ok")
      console.log(1)
    }else{
        console.log(2)
        res.send("UNAUTHORIZED")
    }
})

app.get("/tweets",(req,res)=>{
    let deztweteroos = []
    if(tweteroos.length<=10){
        deztweteroos = tweteroos
    }else{
        for(let i=0;i<10;i++){
            deztweteroos.push(tweteroos[i])
        }
    }
    const avatar = deztweteroos.map(d =>{
        const usuario = usuarios.find(usu => usu.username === d.username)
        return {username:d.username , avatar:usuario.avatar , tweet:d.tweet}
        })
    res.send(avatar)
    
})

app.listen(5000,()=>console.log("ta funfando"))