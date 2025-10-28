//refaire la base pour paremetrer mon api et mon server 
//faire un endpoint en POST 
//ce endpoint recevra une request avec un tableau et le renverra dans sa response
//faire un console.log du tableau que vous recuperez

const express = require("express");
const cors = require('cors');

const app = express();
//middleware(prog qui se lance automatiquement)(outil)va intercepter la requête et va la transformer en json comprehensible pour JS(parse: analyse)
//middleware qui fait le lien entre le language de la request et l'environnement js node
//pour que les deux communiquent bien (convertit le language de la request en json)
app.use(express.json());
//npm install cors
app.use(cors());



app.post("/vava", (req, res) => {  
    // Ici, on dit à notre serveur : "Quand quelqu’un envoie une requête POST à l’adresse /vava, fais ce qui suit"
    
    const data = req.body;  
    // On récupère les données que la personne a envoyées dans le corps (body) de la requête.
    // En gros, c’est les infos que le client envoie (comme un formulaire, par exemple).

    console.log("verif des datas", data);  
    // On affiche dans la console du serveur les données reçues, juste pour vérifier ce qu’on a reçu.
    // C’est utile pour le débogage.

    res.status(201).json({  
      // On prépare la réponse qu’on va renvoyer au client.
      // Le code "201" veut dire "créé avec succès" (c’est un code HTTP).
      
      message: data,  
      // On renvoie un objet JSON qui contient un champ "message" avec les données qu’on a reçues.
      // En gros, on renvoie au client : "ok, j’ai bien reçu tes données, les voilà".
    
    });  
    // On termine la réponse.
});



app.listen(3000,() => {
  console.log("lancement sur le port 3000 TOTO ma gueule ");
});



