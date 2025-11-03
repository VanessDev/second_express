import { useState } from 'react'

function Exo5() {

  const [responseNbrsResult, setresponseNbrsResult] = useState();

  const handleSubmit = async (e) => {

    e.preventDefault(); // il empêche le rechargement de la page

    const nbrs = {
      nbr1: Number(document.getElementById("nbr1").value),
      nbr2: Number(document.getElementById("nbr2").value),
      nbr3: Number(document.getElementById("nbr3").value),
      nbr4: Number(document.getElementById("nbr4").value),
      nbr5: Number(document.getElementById("nbr5").value),
    };

    try {

      const res = await fetch("http://localhost:3000/exo5", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nbrs),
      });

      const result = await res.json();
      setresponseNbrsResult(result);

    } catch(error) {

      console.error("erreur :", error);

    }

  }

  return (
    <>
      <form onSubmit={handleSubmit} method='POST'>

        <label htmlFor="nbr1">Entrée un premier nombre</label>
        <input type="number" name="nbr1" id="nbr1" />

        <label htmlFor="nbr2">Entrée un deuxiéme nombre</label>
        <input type="number" name="nbr2" id="nbr2" />

        <label htmlFor="nbr3">Entrée un troisiéme nombre</label>
        <input type="number" name="nbr3" id="nbr3" />

        <label htmlFor="nbr4">Entrée un quatriéme nombre</label>
        <input type="number" name="nbr4" id="nbr4" />
        
        <label htmlFor="nbr5">Entrée un cinquième nombre</label>
        <input type="number" name="nbr5" id="nbr5" />

        <input type="submit" value="Calculer" />
        
      </form>

      {/* Affiche les data */}
      {responseNbrsResult && (
        <pre>{JSON.stringify(responseNbrsResult)}</pre>
      )}

    </>
  )
  
}

export default Exo5