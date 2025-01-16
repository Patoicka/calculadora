import React from "react";
import "./App.css";
import { Calculadora } from "./Pages/Calculadora";
import { Welcome } from "./Pages/Welcome";
import { useSelector } from "react-redux";
import { History } from "./Pages/History";
import { Notes } from "./Pages/Notes";

function App() {
  const { nombre, option, numbers } = useSelector((state) => state.calculator);

  console.log(numbers);

  const selecOption = () => {
    switch (option) {
      case 'history':
        return <History />;
      case 'notes':
        return <Notes />;
      default:
        return <Calculadora nombre={nombre} />;
    }
  };

  return (
    <div className="bg-black">
      {nombre !== '' ? selecOption() : <Welcome />}
    </div>
  );
}

export default App;
