import { useEffect, useState } from "react";


    


function Retrieve() {
     const [retrieve, setRetrieve] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      
      
      try {
        const data = {
         "n1": 1,
        "n2":40,
        "n3":39,
        "n4":70
        };

        const res = await fetch("http://localhost:3000/retrieve", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const result = await res.json();
        
        setRetrieve(result);
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
        <>
        
        </>
    )
  
}

export default Retrieve;
