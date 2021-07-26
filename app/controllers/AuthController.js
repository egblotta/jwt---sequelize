const { User } = require('../models/index'); //modelo de usuarios
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

const authController = {
    //login
    signIn: async (req, res) => {

        let result, token, passwordMatches;

            let { email, password } = req.body;

            //Buscamos el usuario
            const user = await User.findOne({ 
                where: { 
                    email: email 
                } 
            }).then(user => {
                if(!user){
                    res.status(404).json({msg: "Usuario no encontrado"});
                }else{
                    if(bcrypt.compareSync(password, user.password)){

                        //creamos el token
                        let token = jwt.sign({user: user}, authConfig.secret, {
                            expiresIn: authConfig.expires
                        });

                        res.json({
                            user: user,
                            token: token
                        })

                    }else{
                        //Acceso no autorizado
                        result = { 
                            success: false, 
                            msg: "Contraseña incorrecta" 
                        };
                        res.json(401).json(result);
                    }
                }
                
            }).catch(err => {
                res.json(500).json(err);
            });    
        },
    
    //registro
    signUp(req, res){

        //Encriptamos la contraseña
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

        User.create({
            name: req.body.name,
            email: req.body.email,
            password: password
        }).then(user => {

            let token = jwt.sign({user: user}, authConfig.secret, {
                expiresIn: authConfig.expires
            });

            res.json({
                user: user,
                token: token
            });

        }).catch(err =>{
            result = { 
                success: false, 
                msg: err 
            };
            res.status(500).json(result);
        });        
    }
};

module.exports = authController;

