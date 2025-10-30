// J'importe useState depuis React pour gérer mes variables d'état
import { useState } from "react";

// Je déclare mon composant Retrieve
function Retrieve() {
  // Ici, je crée mes états :
  // - value : c’est la valeur tapée dans l’input (le nombre)
  // - result : c’est la réponse que je vais recevoir du backend
  // - loading : me dit si la requête est en cours (pour afficher “Envoi…”)
  // - error : sert à afficher un message d’erreur en cas de souci
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cette fonction se lance quand je clique sur "Envoyer"
  // Quand le formulaire est soumis, React appelle ta fonction 
  // et lui passe automatiquement un objet “événement” en paramètre. Cet objet, c’est le fameux e.
  const handleSubmit = async (e) => {
    e.preventDefault(); // J’empêche le formulaire de recharger la page
    setError(null); // J’efface toute ancienne erreur

    // Je transforme ma valeur en nombre avec Number()
    const num = Number(value);

    // Si ce n’est pas un nombre valide (NaN, vide, etc.), je montre une erreur
    if (!Number.isFinite(num)) {
      setError("Veuillez entrer un nombre valide.");
      return; // Je quitte la fonction ici
    }

    // Je démarre le chargement
    setLoading(true);
    setResult(null); // J’efface tout ancien résultat avant de recevoir le nouveau

    try {
      // J’envoie une requête POST vers mon backend Express
      const res = await fetch("http://localhost:3000/retrieve", {
        method: "POST", // méthode HTTP
        headers: {
          "Content-Type": "application/json", // j’envoie du JSON
          Accept: "application/json", // j’attends du JSON en réponse
        },
        body: JSON.stringify({ value: num }), // je construis mon JSON : { "value": 13 }
      });

      // Si le serveur renvoie une erreur (ex: 400, 404…), je la détecte ici
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      // Si tout va bien, je récupère la réponse JSON du serveur
      const json = await res.json();

      // Et je la mets dans mon état "result" pour l’afficher à l’écran
      setResult(json);
    } catch (e) {
      // Si j’ai une erreur (connexion ou autre), je la stocke dans "error"
      setError(e.message || "Une erreur est survenue.");
    } finally {
      // Quoi qu’il arrive (succès ou erreur), j’arrête le chargement
      setLoading(false);
    }
  };

  // Et maintenant, je retourne ce que je veux afficher dans la page (le JSX)
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 420 }}>
      {/* Mon formulaire principal */}
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
        {/* Input pour taper le nombre */}
        <input
          type="number" // je force l’utilisateur à taper un nombre
          value={value} // la valeur de l’input vient de mon state
          onChange={(e) => setValue(e.target.value)} // à chaque frappe, je mets à jour "value"
          placeholder="Entrez un nombre" // petit texte grisé quand c’est vide
        />

        {/* Bouton d’envoi du formulaire */}
        <button type="submit" disabled={loading}>
          {/* Si je suis en train d’envoyer, j’affiche “Envoi…” sinon “Envoyer” */}
          {loading ? "Envoi…" : "Envoyer"}
        </button>
      </form>

      {/* Si j’ai une erreur, je l’affiche en rouge */}
      {error && <p style={{ color: "crimson" }}>Erreur : {error}</p>}

      {/* Si j’ai reçu un résultat du backend, je l’affiche proprement */}
      {result && (
        <div>
          <h3>Réponse</h3>
          {/* J’affiche le JSON complet formaté pour bien le lire */}
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

// Je n’oublie pas d’exporter mon composant pour l’utiliser ailleurs
export default Retrieve;
