import express from "express"
import mongoose from "mongoose"
 import router from "./routes/UsersRoutes.js"
 import fileUpload from "express-fileupload"
 import path from "path"
 import { fileURLToPath } from "url"





 const _filename = fileURLToPath(import.meta.url)
 const _dirname = path.dirname(_filename)

const PORT = 5000;
const app = express() 
app.use(express.json())
 app.use(fileUpload({}))
app.use('/uploads', express.static(path.resolve(_dirname , "uploads")))
 app.use(router)


mongoose.connect("mongodb://localhost:27017/usercars").then(()=>{
    console.log("Успешно подключение к БД");
    
}).catch((err)=>{
    console.log("Ошибка при подключении к бд:" + err);
    process.exit(1)
    
})

app.listen(PORT, ()=>{
    console.log("Успешно подключение сервера:" + PORT);
    
})