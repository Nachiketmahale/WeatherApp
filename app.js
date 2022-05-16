const express=require('express');
const ejs=require('ejs');
const app=express();
const config=require('./config');
app.set('view engine','ejs');
app.set('views','views');
const cred={
    KEY:config.Key
}
console.log(cred.KEY);
app.use('/',express.static(__dirname+'/public'));
app.get('/', (req,res)=>{
    res.render('home',{cred});
})
const port=process.env.PORT||3000;
app.listen(port,console.log('server started'));