const express = require("express");
const router = express.Router();
const User = require('../models/user');
const {hashPassword} = require('../utils/passwordUtils');


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
router.post('/', async (req, res) => {
    try {
        const { name, email, password, phone, isAdmin, street, apartment, zip, city, country } = req.body;
        
        // Verificar se o e-mail já está cadastrado
        const verifyEmail = await User.findOne({ email }).exec();

        if (verifyEmail) {
            return res.status(400).send("Usuário já cadastrado");
        }

        // Criptografar a senha
        const passwordHash = hashPassword(password);

        // Criar o novo usuário
        let user = new User({
            name,
            email,
            passwordHash,
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

module.exports = router;
