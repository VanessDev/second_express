const express = require("express");
const router = express.Router();

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

//Grâce à module.exports = router, le fichier routes.js renvoie le router quand on le require.
module.exports = router;
