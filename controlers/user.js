const {User} = require('../models/user');
const {hashPassword} = require('../utils/passwordUtils');


exports.create = async (req, res) =>{
    const {name, email,password} = req.body;

    const newPassword =  hashPassword(password)

    const verifyEmail = await User.findOne({email}).exec();

    if(verifyEmail) return res.status(400).send("usuário já cadastrado");

    let user = new User({
        name,
        email,
        password:newPassword
    });

    user =await user.save();

    return res.send(user);

}