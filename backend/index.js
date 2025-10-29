//refaire la base pour paremetrer mon api et mon server
//faire un endpoint en POST
//ce endpoint recevra une request avec un tableau et le renverra dans sa response
//faire un console.log du tableau que vous recuperez

const express = require("express");  
// Là, je vais chercher le module "express" que j’ai installé avec npm.
// Express, c’est le framework qui simplifie la création de serveurs web en Node.js.
// Donc ici, je le charge dans la constante "express" pour pouvoir ensuite créer mon application, mes routes, etc.


const cors = require("cors");  
// Ici, je vais chercher le module "cors" que j’ai installé avec npm.
// CORS, ça sert à autoriser ou bloquer les requêtes qui viennent d’un autre domaine (par exemple, un front React qui parle à mon API).
// Donc là, je le charge dans la constante "cors" pour pouvoir l’utiliser ensuite comme un middleware dans mon app Express.


const app = express();
//middleware(prog qui se lance automatiquement)(outil)va intercepter la requête et va la transformer en json comprehensible pour JS(parse: analyse)
//middleware qui fait le lien entre le language de la request et l'environnement js node
//pour que les deux communiquent bien (convertit le language de la request en json)
const router = require("./routes/home.route");
app.use(express.json());
//npm install cors
app.use(cors());
//on rappelle la route
app.use("/", router);

//logique qui gere les erreurs 404

app.use((req, res) => {  
  // Ici, j’utilise app.use() sans préciser de chemin.
  // Ça veut dire : "si aucune des routes définies avant n’a répondu, alors on arrive ici".
  // En gros, c’est mon middleware de secours, mon “attrape-tout”.

  res.status(404).json({  
    // Je renvoie une réponse avec le code HTTP 404 → ça veut dire "page non trouvée".
    
    message: 'page non existante',  
    // Dans la réponse JSON, j’envoie un petit message explicite.
    
    path: req.originalUrl  
    // Et j’ajoute le chemin demandé, pour savoir quelle URL a posé problème.
  });  
});

//si on me demande une route qui n'existe pas



app.listen(3000, () => {
  console.log("lancement sur le port 3000 TOTO ma gueule ");
});
