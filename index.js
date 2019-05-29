const express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    path = require('path'),
    fs = require("fs"),
    shell = require("shelljs");

    //abriendo power shell

// EJECUTAR UBUNTU SHELL
if(process.platform === "linux"){
  shell.exec("./")
}


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

const route = express.Router();

route.get('/', (req,res) =>{
  res.sendFile(path.join(__dirname+'/index.html'));
});
route.post('/server',(req,res) =>{
  res.sendFile(path.join(__dirname+'/post.html'));
})

route.post('/register', (req,res) =>{
  
  var s = req.body;
  console.log(s);
  registerUsers(s);
  res.send(s);
});

function registerUsers({user, password}){
  // console.log(`this is a string ${user} , and ${password} , ANDDDDD ${email}`);
  var  spawn = require("child_process").spawn,child;
  var str = `C:\\Users\\dell\\Desktop\\Proyectos\\Servers\\NodeForm\\createUser.ps1 -arg1 ${user} -arg2 ${password} ` 
  if(process.platform === "win32"){
    child = spawn("powershell.exe",[str])
    child.stdout.on("data",(data) =>{
      console.log("Powershell data: " + data);
    })
    child.stderr.on("data",(data) =>{
      console.log("Powershell error: " + data);
    })
    child.on("exit",() =>{
      console.log("Powershell finished. ");
    })
    var strVb = `C:\\Users\\dell\\Desktop\\Proyectos\\Servers\\NodeForm\\CrearCuentaMail.vbs -arg1 ${user} -arg2 ${password}`
    vbs = spawn("cscript.exe", [strVb]);
    console.log(`stderr: ${vbs.stderr.toString()}`)
    console.log(`stdout: ${vbs.stdout.toString()}`)
    console.log(`status: ${vbs.status}`)
  }

}



app.use('/',route);
app.listen(3000,'localhost');

console.log("Node.js Online:)",)