import React, {useState, useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response=>{
      setRepositories(response.data);
    });
  },[]);

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: `New repository ${Date.now()}`
    });
    const repository = response.data;

    setRepositories([...repositories, repository]);    
  }

  async function handleRemoveRepository(id) {      
    await api.delete('repositories/'+id);

    api.get('repositories').then(response=>{
      setRepositories(response.data);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        <button onClick={handleAddRepository}>Adicionar</button>
        {repositories.map(repo => <li key={repo.id}>{repo.title}
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>)}
      </ul>  
    </div>
  );
}

export default App;
