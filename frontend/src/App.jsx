import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [vava, setVava] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      
      
      try {
        const data = {
          username: "Vanessa",
          age: 28,
          height: 183,
          haircolor: "dark-brown",
        };

        const res = await fetch("http://localhost:3000/vava", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const result = await res.json();
        
        setVava(result);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="App">
      <h1>Mon tableau</h1>

      {vava.length === 0 ? (
        <p>Aucun élément trouvé.</p>
      ) : (
        <ul>
          <li>
            <p>
              <strong>Username :</strong> {vava.message.username}
            </p>
            <p>
              <strong>Age :</strong> {vava.message.age}
            </p>
            <p>
              <strong>Height :</strong> {vava.message.height}
            </p>
            <p>
              <strong>Haircolor :</strong> {vava.message.haircolor}
            </p>
          </li>
        </ul>
      )}
    </div>
  );
}

export default App;
