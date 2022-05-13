const express=require('express');
const ejs=require('ejs');
const app=express();
app.set('view engine','ejs');
app.set('views','views');

app.use('/',express.static(__dirname+'/public'));
app.get('/', (req,res)=>{
    res.render('home');
})
const port=process.env.PORT||3000;
app.listen(port,console.log('server started'));