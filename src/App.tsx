import React from 'react';
import './App.css';
import { SearchPage } from './pages';
import { QueryProvider } from "./hooks/queryContext/context";

function App() {
  return (
    <div className="App">
      <QueryProvider >
        <SearchPage />
      </QueryProvider>
    </div>
  );
}

export default App;
