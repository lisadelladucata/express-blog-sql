const blogs = require('../data/blog')

//index
const index =(req, res) =>{
    let postsFiltered = blogs;
    if (req.query.tag){
        postsFiltered = postsFiltered.filter((post) => post.tags.includes(req.query.tag))
    }
    res.json(postsFiltered)
}

//show
const show = (req, res) =>{    

    const post = blogs.find((elm) => elm.id == req.params.id)
    if(!post){
        res.status(400).json({
            error:'Not Found',
            message:'non trovato'
        });
    }
    res.json(post)
}

//store
const create =(req, res) =>{
    console.log(req.body);
    const newId = blogs[blogs.length - 1].id +1;
    const newPost = {
        id : newId,
        titolo: req.body.titolo,
        contenuto : req.body.contenuto,
        immagine: req.body.immagine
    }
    blogs.push(newPost)

    res.sendStatus(201)
}

//update
const update = (req, res) =>{
    const post = blogs.find((elm) => elm.id == req.params.id);

    if(!post) {
        return res.status(400).json({
            error:'Not Found',
            message:'non trovato'
        });
    }

    post.titolo = req.body.titolo;
    post.contenuto = req.body.contenuto;
    post.immagine = req.body.immagine;

    res.json(post)
}

//modify
const modify = (req, res) =>{
    const post = blogs.find((elm) => elm.id == req.params.id);

    if(!post) {
        return res.status(400).json({
            error:'Not Found',
            message:'non trovato'
        });
    }

    posts ={
        ...post,
        ...req.body,
    }

    res.json(posts)

}

//destroy
const destroy =(req, res) =>{
    const post = blogs.find((elm) => elm.id == req.params.id);

    if(!post) {
        return res.status(400).json({
            error:'Not Found',
            message:'non trovato'
        });
    }

    blogs.splice(blogs.indexOf(post) , 1);
    console.log(blogs)

    res.sendStatus(204)
}
module.exports = {index, show, create, update, modify, destroy }