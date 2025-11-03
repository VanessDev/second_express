
import { useState } from 'react'

function Exo4() {

  // Je crée un état avec useState, qui est un Hook, il sert à stocker une donnée dans l’état.
  const [responsepassword, setresponsepassword] = useState();

  // le (e) représente l'événement. Fonction asynchrone.
  const handleSubmit = async (e) => {

    e.preventDefault(); // il empêche le rechargement de la page.

    // Je crée un objet qui recupére les données insérer, et je les transforme en chaîne de caractère.
    const password = {
      password: String(document.getElementById("password").value),
      confirmPassword: String(document.getElementById("confirmPassword").value)
    };

    try {

      // J'envoi la requete au serveur
      const res = await fetch("http://localhost:3000/exo4", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(password),
      });

      const result = await res.json();
      setresponsepassword(result);

    } catch(error) {

      console.error("erreur :", error);

    }

  }

  return (
    <>
    
      <form onSubmit={handleSubmit} method='POST'>

        <label htmlFor="password">Entrée votre mot de passe</label>
        <input type="text" name='password' id='password' required/>

        <label htmlFor="confirmPassword">Confirmer votre mot de passe</label>
        <input type="text" name='confirmPassword' id='confirmPassword' required/>

        <input type="submit" value="Envoyer" />
      </form>

      {/* Affiche la reponse */}
      {responsepassword && ( <pre>{JSON.stringify(responsepassword)}</pre> )}

    </>
  )
}

export default Exo4