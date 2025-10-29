import { useState } from "react";

export default function Add() {
  const [a, setA] = useState("");         
  const [b, setB] = useState("");         
  const [result, setResult] = useState(null); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    // validation de base : les deux champs doivent être remplis
    if (a.trim() === "" || b.trim() === "") {
      setError("Veuillez entrer deux nombres.");
      return;
    }

    // Je transforme les deux valeurs en nombres
    const numA = Number(a);
    const numB = Number(b);

    // Si ce ne sont pas des nombres valides
    if (!Number.isFinite(numA) || !Number.isFinite(numB)) {
      setError("Les valeurs saisies doivent être des nombres valides.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ a: numA, b: numB }), 
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      setResult(data); 
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 400 }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
        <input
          type="number"
          value={a}
          onChange={(e) => setA(e.target.value)}
          placeholder="Premier nombre"
        />
        <input
          type="number"
          value={b}
          onChange={(e) => setB(e.target.value)}
          placeholder="Deuxième nombre"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Calcul..." : "Additionner"}
        </button>
      </form>

      {error && <p style={{ color: "crimson" }}>Erreur : {error}</p>}

      
      {result && (
        <div>
          <h3>Résultat :</h3>
          <p>{result.message}</p>
          <p>La somme est : {result.somme}</p>
        </div>
      )}
    </div>
  );
}
