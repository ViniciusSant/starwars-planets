import React from 'react';
import './App.css';
import ContextProvider from './context/ContextProvider';
import Table from './components/Table';

function App() {
  return (
    <ContextProvider>
      <main>
        <Table />
      </main>
    </ContextProvider>
  );
}

export default App;
