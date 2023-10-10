import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

const API = 'https://rickandmortyapi.com/api/character'

export default function App() {

  const [nome, setNome] = useState('')
  const [personagem, setPersonagem] = useState(null)
  const [personagens, setPersonagens] = useState([])
  const [personagensNovos, setPersonagensNovos] = useState([])

  const buscarPersonagemPorNome = () => {    
      var select = document.getElementById('status');
      var value = select.options[select.selectedIndex].value;
      console.log(value);
    axios.get(`https://rickandmortyapi.com/api/character/?name=${nome}&status=${value}`).then(({ data }) => {
      
      setPersonagens(data.results)
      console.log(data.results)
      
      
    }, err => {
      alert('Personagem não encontrado')
    })
  }

  const onChangeNome = ({ target }) => {
    setNome(target.value)
  }

  useEffect(() => {
    const fetchPersonagens = async () => {
        const URL = API;
        const response = await fetch(URL);
        const data = await response.json();
        setPersonagens(data.results)
       
    
       
    }
    buscarPersonagemPorNome();
    fetchPersonagens();
}, []);

  return (
    <>
    <div style={{margin:'10px'}}>
    <h2>Lista de Personagens</h2>
      <div className='top-inputs'>
      
      <input
        className='inputName'
        type="text"
        onChange={onChangeNome}
        placeholder='Ex: Rick Sanches'
        value={nome}
      />
     
      <button onClick={buscarPersonagemPorNome}>Pesquisar</button>
    <select id='status'> 

  <option value="Alive">Vivo</option>
  <option value="Dead">Morto</option>
  <option value="unknown">Desconhecido </option>

  </select> 
  </div>
  </div>
      
      <div> {personagens.map((personagem) => (
            <div>
            <div className="personagem-card">

                <img className="fotoPersonagem" src={personagem.image} />              
                <h4>Nome: {personagem.name}</h4>
                </div> 
            </div>
        ))}</div>

      {
        personagem &&
        <div>
          <h4>{personagem.name}</h4>
          <img className="fotoPersonagem" src={personagem.image} />              
                <h4>Nome: {personagem.name}</h4>
        </div>
      }

    </>
  )
}

