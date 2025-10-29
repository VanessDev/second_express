const express = require('express');
const router = express.Router();  
// Ici, je vais chercher Express, et je récupère directement son "Router".
// En gros, ça me donne un mini-routeur indépendant que je peux utiliser pour définir des routes séparées de mon app principale.




// router.post("/vava", (req, res) => {
  // Ici, on dit à notre serveur : "Quand quelqu’un envoie une requête POST à l’adresse /vava, fais ce qui suit"

//   const data = req.body;
  // On récupère les données que la personne a envoyées dans le corps (body) de la requête.
  // En gros, c’est les infos que le client envoie (comme un formulaire, par exemple).

//   console.log("verif des datas", data);
  // On affiche dans la console du serveur les données reçues, juste pour vérifier ce qu’on a reçu.
  // C’est utile pour le débogage.

//   res.status(201).json({
    // On prépare la réponse qu’on va renvoyer au client.
    // Le code "201" veut dire "créé avec succès" (c’est un code HTTP).

    // message: data,
    // On renvoie un objet JSON qui contient un champ "message" avec les données qu’on a reçues.
    // En gros, on renvoie au client : "ok, j’ai bien reçu tes données, les voilà".
//   });
  // On termine la réponse.
// });




//verifier si le nombre est pair ou impair 
router.post("/retrieve", (req, res) => {
    const {number} = req.body;
    
    if (typeof number !== 'number'  || isNaN(number)) {
        return res.status(400).json({message: "merci d'envoyer un nombre"});
    }

    //verif de la parité
    const result = number % 2 === 0 ? 'pair' : 'impair';

    res.status(200).json({
        message: "le nombre" + number + "est" + result,
    });
});



module.exports = router;  
// Et là, je dis à Node : "ok, ce fichier va exporter ce routeur-là".
// Comme ça, quand quelqu’un fera un require() de ce fichier, il récupérera ce routeur prêt à l’emploi.