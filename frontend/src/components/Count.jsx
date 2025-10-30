// J'importe useState depuis React pour gérer mes variables d'état (word, result, etc.)
import { useState } from "react";

// Je crée mon composant Count
function Count() {

  // Ici je crée des états :
  // - "word" c'est le mot que l'utilisateur va taper
  // - "result" c'est la réponse que je recevrai du backend
  // - "loading" me sert à savoir si la requête est en cours
  // - "error" me sert à afficher un message d'erreur si quelque chose ne va pas
  const [word, setWord] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cette fonction va se lancer quand je clique sur "Envoyer"
  const handleSubmit = async (e) => {
    e.preventDefault(); // J'empêche le formulaire de recharger la page
    setError(null);     // Je remets l'erreur à zéro
    setResult(null);    // Je vide le résultat avant d'en avoir un nouveau

    // Si l'utilisateur n'a rien tapé (mot vide), j'affiche un message d'erreur
    if (word.trim() === "") {
      setError("Veuillez entrer un mot.");
      return; // Je stoppe la fonction ici
    }

    setLoading(true); // J'indique qu'une requête est en cours

    try {
      // J'envoie la requête POST vers mon backend
      const res = await fetch("http://localhost:3000/count", {
        method: "POST", // Méthode POST
        headers: {
          "Content-Type": "application/json", // Je précise que j'envoie du JSON
          Accept: "application/json",         // Et que j'attends du JSON en retour
        },
        body: JSON.stringify({ word }), // J'envoie un objet avec le mot, ex: { "word": "bonjour" }
      });

      // Si le serveur répond avec une erreur (ex: 400 ou 500)
      if (!res.ok) {
        let msg = `HTTP ${res.status}`; // Je récupère le code d'erreur
        try {
          // J'essaie de lire le message d'erreur envoyé par le backend
          const err = await res.json();
          // Si j’ai un message d’erreur, je l’ajoute à la variable msg après un petit tiret, 
          // histoire de préciser ce qui s’est passé
          if (err?.message) msg += ` – ${err.message}`;
        } catch {}
        throw new Error(msg); // Je lance une erreur pour passer dans le catch
      }

      // Si tout va bien, je récupère la réponse JSON du serveur
      const json = await res.json();

      // Et je la mets dans mon état "result" pour pouvoir l'afficher dans le rendu
      setResult(json);
    } catch (e) {
      // En cas d'erreur (connexion, code HTTP, etc.), j'affiche un message clair
      setError(e.message || "Une erreur est survenue.");
    } finally {
      // Qu'il y ait une erreur ou pas, je dis que le chargement est terminé
      setLoading(false);
    }
  };

  // Ici je retourne mon rendu JSX, c’est ce qui s’affiche à l’écran
  return (
    <div
      style={{
        display: "grid",
        gap: "12px",
        maxWidth: "420px",
        margin: "2rem auto",
        fontFamily: "sans-serif",
      }}
    >
      {/* Mon formulaire avec un input et un bouton */}
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
        {/* Input pour taper le mot */}
        <input
          type="text"
          value={word} // L'input est relié à la variable "word"
          onChange={(e) => setWord(e.target.value)} // À chaque frappe, je mets à jour "word"
          placeholder="Entrez un mot"
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        {/* Bouton pour envoyer le formulaire */}
        <button
          type="submit"
          disabled={loading} // Si je suis en train d'envoyer, je bloque le bouton
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {/* Si je suis en train d'envoyer, j'affiche "Envoi…" sinon "Envoyer" */}
          {loading ? "Envoi…" : "Envoyer"}
        </button>
      </form>

      {/* Si j'ai une erreur, je l'affiche en rouge */}
      {error && <p style={{ color: "crimson" }}>Erreur : {error}</p>}

      {/* Si j'ai reçu une réponse du serveur, je l'affiche */}
      {result && (
        <div
          style={{
            backgroundColor: "#f9f9f9",
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ddd",
          }}
        >
          <h3>Réponse du serveur :</h3>
          {/* J'affiche juste le message lisible envoyé par le backend */}
          <p>{result.message}</p>

          {/* Et pour voir le JSON complet, je le montre aussi en format brut */}
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Count
