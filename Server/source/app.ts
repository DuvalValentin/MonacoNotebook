import * as express from "express";
import * as bodyParser from "body-parser";
import * as fs from "fs";

const clientUrl:string="../Client/";

const app: express.Application=express();

app.use((bodyParser.urlencoded({extended:false})));
app.use((bodyParser.json()));

app.get("/",function(req,res){
    res.redirect("/d/index.html");
});


app.use("/n",express.static("notebook"));

app.post("/n",function(req,res){
    fs.writeFile("./notebook/test.ipynb",JSON.stringify(req.body,null,1),(err) => {
        if (err) {
            console.error(err);
            return;
        }
        else
        {
            console.log("Fichier enregistré !");
        }
    });
});

app.use("/s",express.static(clientUrl+"source/"));

app.use("/d",express.static(clientUrl+"dist/"));

app.listen(3000, function(){
    console.log("Serveur lancé sur le port 3000");
});