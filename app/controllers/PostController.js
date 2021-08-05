const { Post } = require('../models/index');

module.exports = {

    async find(req, res, next){
        let post = await Post.findByPk(req.params.id);

        if(!post){
            res.status(404).json({msg: 'El post no ha sido encontrado'});
        }else{
            req.post = post;
            next();
        }
    },

    //Api call para el index
    async index(req,res){
        let posts = await Post.findAll();
        res.json(posts);
    },

    //Show
    async show(req, res){
        let post = await Post.findByPk(req.params.id);

        if(!post){
            res.status(404).json({msg: 'El post no ha sido encontrado'});
        }else{
            res.json(req.post);
        }        
    },

    //Create
    create: async (req, res) => {
        let result, post;
        try {
            post = await Post.create({
                title: req.body.title,
                body: req.body.body,
                userId: req.body.userId,
            });
            result = {
                success: true,
                msg: 'Publicación creada',
                post: post,
            };
            return res.status(201).json(result);
        } catch (err) {
            result = { success: false, msg: err };
            return res.status(500).json(result);
        }
    },

    //Update
    async update(req, res){
        req.post.title = req.body.title;
        req.post.body = req.body.body;

        req.post.save().then(post =>{
            res.json({msg: 'El post ha sido actualizado',post});
        })        
    },

    //Delete
    async delete(req, res){
        req.post.destroy().then(post => {
            res.json({msg: 'El post ha sido eliminado'});
        })        
    }, 

}