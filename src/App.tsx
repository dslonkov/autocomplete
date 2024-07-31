import React, {useState} from 'react';
import './App.css';
import { Main } from "./components/Main";

function App() {
  const [value, setValue] = useState<string>('');

  return (
    <div className="app">
      <Main value={value} setValue={setValue} />
    </div>
  );
}

export default App;
