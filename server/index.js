const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const bcrypt = require('bcrypt');



app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//GAMES TABLE 
app.get('/apps',async(req,res)=>{
    try{
        const allApps = await pool.query('SELECT * FROM games ORDER BY 2;');
        res.json(allApps.rows);
    }catch(err){
        console.error(err.message);
    }
})

app.get('/apps/:id',async (req,res)=>{ 
    try{
        const {id} = req.params;
        const anApp = await pool.query('SELECT * FROM games WHERE game_id=$1;',[id]);
        res.json([anApp.rows[0]]);
    }catch(err){
        console.error(err.message);
    }
})


//CART TABLE
app.get('/cart/:id',async (req,res)=>{
    try{
        const {id} = req.params;
        const anApp = await pool.query('SELECT cartItems.cart_id,cartItems.game_id,cartItems.user_id,games.image,games.title,games.price FROM cartItems INNER JOIN games on cartItems.game_id = games.game_id WHERE cart_id =$1 GROUP by 1,2,3,4,5,6;',[id]);
        res.json(anApp.rows);
    }catch(err){
        console.error(err.message);
    }
})
app.get('/cart',async (req,res)=>{
    try{
        const anApp = await pool.query('SELECT * FROM cartItems;');
        res.json(anApp.rows);
    }catch(err){
        console.error(err.message);
    }
})

app.post('/cart',async(req,res)=>{ 
    try{
       
        const {cart_id,game_id,user_id} = req.body;
        const newApp = await pool.query('INSERT INTO cartItems(cart_id,game_id,user_id) VALUES($1,$2,$3) RETURNING *;',[cart_id,game_id,user_id]);
        res.json(newApp.rows[0]);
    }catch(err){
        console.error(err.message);
    }
})
app.put('/cart/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const {total,game_id,user_id} = req.body;
        const updateApp = await pool.query('UPDATE cart SET total = $1,game_id=$2,user_id=$3 WHERE cart_id = $4',[total,game_id,user_id,id]);
        res.json('Cart updated');
    }catch(err){
        console.error(err.message);
    }
})

app.put('/cart/delete/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const {game_id} = req.body;
        const updateApp = await pool.query(`DELETE FROM cartItems WHERE game_id=$1 AND cart_id =$2;`,[game_id,id]);
        res.json('Cart updated');
    }catch(err){
        console.error(err.message);
    }
})



//USERS TABLE
app.post('/login', async(req,res)=>{
    
    try{
        const newApp = await pool.query("SELECT * FROM users WHERE password=$1 AND email_address= $2;",[req.body.psw,req.body.email]);
        console.log(newApp.rows)
        if(newApp.rows[0] === undefined){
            console.log('not correct')
            res.status(404).redirect('http://localhost:3001/');
        }
        else{
            res.redirect('http://localhost:3001/');
            res.json(newApp.rows[0]);
            
          
        }
        
    }catch(err){
        console.error(err.message);
    }
})

app.post('/register', async(req,res)=>{
    try{
        console.log(req.body);
 
        const newApp = await pool.query("insert into users (password,email_address) VALUES($1,$2);",[req.body.psw,req.body.email]);
        res.redirect('http://localhost:3001/');
        res.json(newApp.rows[0]);

    }catch(err){
        console.error(err.message);
    }
})

app.listen(3000,()=>{
    console.log('Server has started on port 3000');
})