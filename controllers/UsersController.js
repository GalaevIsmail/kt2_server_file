import Users from "../models/Users.js";
import fileService from "../middleware/fileService.js";

class UserController{
    async getUser(req, res){
        try{
            const user = await Users.find();
            res.status(200).json(user);
        }catch(err){
            res.status(400).json("Ошибка при получении пользователей:" + err)

        }

       
    }

    async getOneUser(req,res){
        try{
            const {id} = req.params;
            const user = await Users.findById(id);
            if(!user){
                return res.status(404).json("Такой задачи не существует")

            }
            res.status(200).json(user);
        
        }catch(err){
            res.status(500).json("Ошибка привылнонии запроса :" +err)
        }
    }

         async addUser(req, res){
        console.log(req.files);
        try{
            let fileName = null;

            if(req.files && req.files.photo){
                fileName = await fileService.saveFile(req.files.photo)
            }

            console.log("Данные формы:", req.body);
            console.log("Загруженный файл:", req.file);

            const { title, description, priority, deadline } = req.body

            if(!title || !description){
                return res.status(400).json({ message: "Заголовок и описание обязательны для заполнения" });
            }

            const newUser = await Users.create({
                title, 
                description,
                priority,
                deadline,
                photo: fileName
            });
            return res.status(200).json(newUser);
        }catch(err){
            console.log("Ошибка при добвлении задачи" + err);
            return res.status(500).json({message: "Ошибка при добавлении на сервере", error: err.message })
            
        }
     }


      async updateUser(req, res){
        try {
            const { id } = req.params;
            const { title, description, priority, deadline } = req.body;
            const updateUser = await tracker.findByIdAndUpdate(
              id,
              {
                title, 
                description, 
                priority, 
                deadline
              },
              { new: true },
            );
            if (!updateUser) {
              return res.status(404).json("Такой задачи не существует!");
            }
            res.status(200).json(updateUser);
          } catch (err) {
            res.status(500).json("Ошибка при обновлении: " + err);
          }
     }

     async deleteUser(req, res){
        try{
            const { id } = req.params;
            const user = await Users.findByIdAndDelete(id);
            if(!user){
                return res.status(404).json("ТАКОЙ ЗАДЛАЧИ НЕТ")
            }
            res.status(200).json("задача удалена")
        }catch(err){
            res.status(500).json("Ошибка при выполнении запроса: " + err)
        }

     }

}
export default new UserController