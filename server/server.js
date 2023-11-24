let express=require('express');
let bodyParser=require('body-parser');

let app=express();
const cors=require('cors');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.use('/register',require('./register'));
app.use('/addgame',require('./addgame'));
app.use('/fetchuser',require('./fetchuser'));
app.use('/delete',require('./delete'));
app.use('/login',require('./login'));
app.use('/fetch',require('./fetch'));

//app.use('/update',require('./update'));

app.use('/updateScore',require('./updateScore'));
app.use('/updateUser',require('./updateUser'));
app.use('/fetchadmin',require('./fetchadmin'));
app.use('/delByAdmin',require('./delByAdmin'));


app.listen(9000,()=>{
    console.log("running");
})
