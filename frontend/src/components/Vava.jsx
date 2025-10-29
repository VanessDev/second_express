import { useState } from "react";

function Retrieve() {
  const [value, setValue] = useState("");     // valeur saisie dans l'input
  const [result, setResult] = useState(null); // réponse du serveur
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (value === "") {
      setError("Veuillez entrer un nombre.");
      return;
    }

    const num = Number(value);
    if (!Number.isFinite(num)) {
      setError("Veuillez entrer un nombre valide.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/retrieve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ number: num }), // 🔥 le backend attend 'number'
      });

      if (!res.ok) {
        let msg = `HTTP ${res.status}`;
        try {
          const err = await res.json();
          if (err?.message) msg += ` – ${err.message}`;
        } catch {}
        throw new Error(msg);
      }

      const json = await res.json();
      setResult(json);
    } catch (e) {
      setError(e.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

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
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Entrez un nombre"
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Envoi…" : "Envoyer"}
        </button>
      </form>

      {error && <p style={{ color: "crimson" }}>Erreur : {error}</p>}

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
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Retrieve
