const express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    path = require('path'),
    fs = require("fs"),
    shell = require("shelljs");

    //abriendo power shell
var  spawn = require("child_process").spawn,child;
if(process.platform === "win32"){
  child = spawn("powershell.exe",["C:\\Users\\dell\\Desktop\\Proyectos\\Servers\\NodeForm\\createUser.ps1"])
  child.stdout.on("data",(data) =>{
    console.log("Powershell data: " + data);
  })
  child.stderr.on("data",(data) =>{
    console.log("Powershell error: " + data);
  })
  child.on("exit",() =>{
    console.log("Powershell finished. ");
  })
  
  vbs = spawn("cscript.exe", ["C:\\Users\\dell\\Desktop\\Proyectos\\Servers\\NodeForm\\CrearCuentaMail.vbs"]);
  console.log(`stderr: ${vbs.stderr.toString()}`)
  console.log(`stdout: ${vbs.stdout.toString()}`)
  console.log(`status: ${vbs.status}`)
}


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

app.use('/',route);
app.listen(3000,'localhost');

console.log("Node.js Online:)",)