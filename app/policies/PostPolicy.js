const { User } = require('../models/index');

// Las politicas son middlewares
module.exports = {

    //Politica para mostrar
    show(req, res, next) {
        if(req.user.id === req.post.userId || User.isAdmin(req.user.roles)){
            next();
        }else{
            res.status(401).json({ msg: 'No estás autorizado para ver la publicación' });
        }
    },

    //Politica para actualizacion
    update(req, res, next) {
        if(req.user.id === req.post.userId || User.isAdmin(req.user.roles)){
            next();
        }else{
            res.status(401).json({ msg: 'No estás autorizado para actualizar la publicación' });
        }
    },

    //Politica para delete
    delete(req, res, next) {
        if(req.user.id === req.post.userId || User.isAdmin(req.user.roles)){
            next();
        }else{
            res.status(401).json({ msg: 'No estás autorizado para eliminar la publicación' });
        }
    },
};