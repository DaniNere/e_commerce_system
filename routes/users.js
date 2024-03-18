const express = require("express");
const router = express.Router();
const User = require('../models/user');
const {hashPassword} = require('../utils/passwordUtils');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');


router.get('/', async (req, res) =>{
    const userList = await User.find().select("-passwordHash");

    if(!userList) {
        res.status(500).json({success:false})
    }
    res.send(userList);
});

router.get("/:id", async(req,res)=> {

try{
    const user = await User.findById(req.params.id).select("-passwordHash");
    res.status(200).send(user)

} catch(error){

    res.status(500).json({ success: false, message: 'The user with the given ID not exists' });
}

});
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phone, isAdmin, street, apartment, zip, city, country } = req.body;
        
        // Verificar se o e-mail já está cadastrado
        const verifyEmail = await User.findOne({ email }).exec();

        if (verifyEmail) {
            return res.status(400).send("Usuário já cadastrado");
        }

        // Criptografar a senha
        const passwordHash = await hashPassword(password);

        // Criar o novo usuário
        let user = new User({
            name,
            email,
            password: passwordHash,
            phone,
            isAdmin,
            street,
            apartment,
            zip,
            city,
            country
        });

        // Salvar o usuário no banco de dados
        user = await user.save();

        // Verificar se o usuário foi salvo com sucesso
        if (!user) {
            return res.status(500).send('Erro ao criar o usuário');
        }

        // Enviar o usuário como resposta
        res.send(user);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get("/get/count", async (req,res) => {
    try{
        const userCount = await User.countDocuments((count)=> count);
        res.status(200).send({userCount: userCount});
    }catch(error){
        res.status(500).json({ success: false })
    }
});

router.put("/update", async (req, res) => {
    try {
        const { name, email, password, phone, isAdmin, street, apartment, zip, city, country } = req.body;
        const userId = req.user.userID; // Obtém o ID do usuário do token de autenticação

        const userUpdate = {};

        if (name) {
            userUpdate.name = name;
        }
        if (email) {
            const verifyEmail = await User.findOne({ email }).exec();

            if (verifyEmail && verifyEmail.id !== userId) {
                return res.status(400).json({ success: false, message: "Email is already registered" });
            }
            userUpdate.email = email;
        }
        if (password) {
            const passwordHash = await bcrypt.hash(password, 10);
            userUpdate.password = passwordHash;
        }

        // Verifique se o usuário existe antes de tentar atualizá-lo
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Atualize o usuário e salve as mudanças
        const updatedUser = await User.findByIdAndUpdate(userId, userUpdate, { new: true });

        res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!password) { // Verifica se a senha está presente no corpo da solicitação
            return res.status(400).send('Password is required');
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send('User with given email not found');
        }
        
        if (user && bcrypt.compareSync(password, user.password)) {

            const token = jwt.sign({ userID: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' });

            return res.status(200).send({ user: user.email, token: token });

        } else {
            
            return res.status(400).send('Incorrect email or password');
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            return res.status(200).json({ success: true, message: 'User deleted successfully' });
        } else {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

router.get("/perfil", async (req,res) => {
 return res.json(req.user)
});


module.exports = router;
