import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

 function App() {

  const [nome, setNome] = useState('')
  const [personagem, setPersonagem] = useState()
  const [personagens, setPersonagens] = useState([])
  const [personagensNovos, setPersonagensNovos] = useState()

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
    buscarPersonagemPorNome();
}, []);



const getPersonagem = (url) =>{
  axios.get(url).then(({ data }) => {
    setPersonagem(data)
  }, err => {
    alert('Detalhes não encontrado')
  })
}

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
      <div style={{display:'flex'}}>
      <div> {personagens.map((personagem) => (
            <div >
            <div className="personagem-card" onClick={() => getPersonagem(personagem.url)}>
                <img className="fotoPersonagem" src={personagem.image} />              
                <h4>Nome: {personagem.name}</h4>
                </div>
                
            </div>
        ))}</div>
            <div className='detalhesPersonagem'>
      <h2>Detalhes do Personagem</h2>
      {
        personagem &&
        <div>
          <img className="fotoPersonagemDetalhe" src={personagem.image} />   
          <div>           
                <h4>Nome: {personagem.name}</h4>
                <h4>Espécie: {personagem.species}</h4>
                <h4>Status: {personagem.status}</h4>
                </div>
        </div>
      }
      </div>
</div>
    </>
  )
}

export default App;
