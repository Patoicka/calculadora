import React from "react";
import "./App.css";
import { Calculadora } from "./Pages/Calculadora";
import { Welcome } from "./Pages/Welcome";
import { useSelector } from "react-redux";

function App() {

  const { nombre } = useSelector((state) => state.calculator);

  return (
    <div>

      {nombre !== '' ?
        < Calculadora nombre={nombre} />
        :
        <Welcome />
      }
    </div>
  );
}

export default App;
