const connection = require("../data/db")

//index
const index =(req, res) =>{

    const sql=  `SELECT * FROM posts `

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
        });
}

//show
const show = (req, res) =>{
    const postSql=  `SELECT * FROM posts WHERE id = ?`
    const tagsSql= `
    SELECT tags.id, tags.label
    FROM tags
    JOIN post_tag ON post_tag.tag_id = tags.id
    WHERE post_tag.post_id=?
    `
    const id = req.params.id

    connection.query(postSql, [id], (err, results) => {
        if (err){
            return res.status(500).json({ 
                error: 'Database query failed' 
            });
        } 

        const post = results[0]

        if(!post){
                res.status(400).json({
                    error:'Not Found',
                    message:'non trovato'
                });
            }
            connection.query(postSql, [id], (err, results) => {
                if (err){
                    return res.status(500).json({ 
                        error: 'Database query failed' 
                    });
                } 
        
                post.tags=results
                
                res.json(post);
            });
    });
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
    const sql = `DELETE FROM posts WHERE id = ?`
    const id = req.params.id

    connection.query(sql, [id], (err, results) => {
        if (err){
            return res.status(500).json({ 
                error: 'Database query failed' 
            });
        } 

        res.sendStatus(204)

        });
}
module.exports = {index, show, create, update, modify, destroy }