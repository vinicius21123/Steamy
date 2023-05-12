const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const localStrategy = require ('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({
    origin:"http://localhost:3001",
    credentials:true
})); 


app.use(session({
    secret:'secretcode', 
    resave:true,
    saveUninitialized:true,
})); 

app.use(cookieParser('secretcode'));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);





//GAMES TABLE 
app.get('/apps',async(req,res)=>{
    try{
        const allApps = await pool.query('SELECT * FROM games ORDER BY 2;');
        res.json(allApps.rows);
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


app.post('/cart',async(req,res)=>{ 
    try{
       
        const {cart_id,game_id,user_id} = req.body;
        const newApp = await pool.query('INSERT INTO cartItems(cart_id,game_id,user_id) VALUES($1,$2,$3) RETURNING *;',[cart_id,game_id,user_id]);
        res.json(newApp.rows[0]);
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
app.post('/login',(req,res,next)=>{
    
    passport.authenticate("local",(err,user,info)=>{
        if(err) throw err;
        if(!user)res.send('No user Exists');
        else{
            req.logIn(user,(err)=>{
                
                // if(err)throw err;
                
                res.send(req.user);
            });
        }
        
    })(req,res,next);

    

    // try{
    //     // const newApp = await pool.query("SELECT * FROM users WHERE password=$1 AND email_address= $2;",[req.body.psw,req.body.email]);
    //     // console.log(newApp.rows)
    //     // if(newApp.rows[0] === undefined){
    //     //     console.log('not correct')
    //     //     res.status(404).redirect('http://localhost:3001/');
    //     // }
    //     // else{
    //     //     res.redirect('http://localhost:3001/');
    //     //     res.json(newApp.rows[0]);
    //     // }
    //     console.log(req.body);
    //     const checkUser = await pool.query("SELECT * FROM users WHERE password=$1 AND email_address= $2;",[req.body.password,req.body.email]);
    //     console.log(checkUser.rows)
    //     if(checkUser.rows.length !== 0){
    //        res.send('login found')
    //     }
    //     else{
    //         res.send('Theres no user with that combination of email and password')
    //     }
    // }catch(err){
    //     console.error(err.message);
    // }
})

app.post('/register', async(req,res)=>{
    try{
        console.log(req.body);
        const checkUser = await pool.query("SELECT * FROM users WHERE email_address= $1;",[req.body.email]);
        
        if(checkUser.rows.length !== 0){
            console.log(checkUser.rows[0].password)
           res.send('Theres already a user with that email.')
        }
        else{
            let cartNumber = Math.floor((Math.random() * 10000) + 1);
            let checkCart = await pool.query('select * from cart where cart_id = $1;',[cartNumber]);
            console.log(`first time the number is ${cartNumber}`)
            while(checkCart.rows.length !== 0){
                console.log(`in the loop, number = ${cartNumber}`)
                cartNumber = Math.floor((Math.random() * 10000) + 1);
                checkCart = await pool.query('select * from cart where cart_id = $1;',[cartNumber]);
            }
            if(checkCart.rows.length === 0){
                const cartCreate = await pool.query('insert into cart values($1)',[cartNumber])
                const hashedPassword = await bcrypt.hash(req.body.password,10);
                const newApp = await pool.query("insert into users (password,email_address,cart_id) VALUES($1,$2,$3);",[hashedPassword,req.body.email,cartNumber]);
                res.send('User created')

            }
           
            console.log('dunno what happend')
            // res.redirect('http://localhost:3001/');
            // res.json(newApp.rows[0]);
        }
       
        

    }catch(err){
        console.error(err.message); 
    }
})
app.get('/logOut', async(req,res)=>{
    try{
        req.logout(()=>{
            console.log('logged out');
      
        });
        
 
    
    }catch(err){
        console.error(err.message);
    }
})
app.listen(3000,()=>{
    console.log('Server has started on port 3000');
})