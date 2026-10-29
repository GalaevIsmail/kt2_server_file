import mongoose from "mongoose";
const UsersSchema = new mongoose.Schema({
    title:{
        type: String,
        require:[true , "Заголовок задачи обязателен"],
        trim: true
    },
    priority:{
        type: String,
        require:[true, "Приоритеты задачи обязательны"],

    },
    description:{
        type: String,
        require:[true, "Дедлайны задачи обязательны"]
    },
    photo:{
        type:String
    }
})

export default mongoose.model("Users", UsersSchema)