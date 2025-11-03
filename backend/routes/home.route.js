const express = require("express");
const router = express.Router();
// Ici, je vais chercher Express, et je récupère directement son "Router".
// En gros, ça me donne un mini-routeur indépendant que je peux utiliser pour définir des routes séparées de mon app principale.

router.post("/vava", (req, res) => {
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

//verifier si le nombre est pair ou impair
router.post("/retrieve", (req, res) => {
  const { number } = req.body;

  if (typeof number !== "number" || isNaN(number)) {
    return res.status(400).json({ message: "merci d'envoyer un nombre" });
  }

  //verif de la parité
  const result = number % 2 === 0 ? "pair" : "impair";

  res.status(200).json({
    message: "le nombre" + number + "est" + result,
  });
});

//compter le nombre de caractères dans un mot

router.post("/count", (req, res) => {
  //récupere la propriété word d'un objet
  const { word } = req.body;

  //Si le champ word n'est pas une vraie chaine non vide alors , alors on n'essaie meme pas
  // de compter les caracteres ,on repond directement avec une erreur claire.
  if (typeof word !== "string" || word.trim() === "") {
    return res.status(400).json({ message: "Merci d'envoyer un mot valide." });
  }

  // Calcul du nombre de caractères (sans les espaces autour)
  const length = word.trim().length;

  // Affiche le nombre de caracteres dans une phrase
  //${length > 1 ? "s" : ""}.` = Si le mot a plus d'un caractere met un s pour le pluriel
  //sinon si le mot a exactement un caractere n'ajoute rien
  const message = `Le mot "${word.trim()}" contient ${length} caractère${
    length > 1 ? "s" : ""
  }.`;

  // On configure la response pour l'envoyer à JSON
  res.status(200).json({ word: word.trim(), length, message });
});

router.post("/add", (req, res) => {
  //récupere la propriété word d'un objet
  const { a, b } = req.body;

  //Si le champ word n'est pas une vraie chaine non vide alors , alors on n'essaie meme pas
  // de compter les caracteres ,on repond directement avec une erreur claire.
  if (typeof a !== "number" || typeof b !== "number" || isNaN(a) || isNaN(b)) {
    return res
      .status(400)
      .json({ message: "merci d'envoyer deux nombres valides" });
  }
  const somme = a + b;

  // On configure la response pour l'envoyer à JSON
  res
    .status(200)
    .json({ a, b, somme, message: "La somme de ${a} et ${b} est ${somme}" });
});

module.exports = router;
// Et là, je dis à Node : "ok, ce fichier va exporter ce routeur-là".
// Comme ça, quand quelqu’un fera un require() de ce fichier, il récupérera ce routeur prêt à l’emploi.
// 4. Vérification du mot de passe
//     Le front récupère un mot de passe et sa confirmation (dans le même formulaire).
//     Le back vérifie si les deux sont identiques.
//     Le front affiche un message de validation du mot de passe (ou une erreur si ce n’est pas le cas).



router.post('/', (req, res) => {

    const {password, confirmPassword} = req.body;

    if(password === confirmPassword) {

        res.status(200).json({
            message : "Votre mot de passe est valide.",
        });

    } else {

        res.status(405).json({
            message : "Les mot de passe doivent être identique."
        })

    }

});

module.exports = router;


//Exo 5

router.post('/', (req, res) => {

    const {nbr1, nbr2, nbr3, nbr4, nbr5} = req.body;

    let somme = nbr1 + nbr2 + nbr3 + nbr4 + nbr5;
    let moy = somme / 5;
    let numbers = [nbr1, nbr2, nbr3, nbr4, nbr5];

    let max = Math.max(...numbers);

    res.status(200).json({
        message : "La somme est " + somme + ". La moyenne est " + moy + ". Le plus gran nombre est " + max + ".",
    });

});

module.exports = router;