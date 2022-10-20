import './App.css';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import goSymbol from './assets/goSymbol.png'
import loadingGif from './assets/loading.gif'
import {Card} from './components/Card';
import React, {useState, useEffect} from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

function App() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [showCreateArea, setShowCreateArea] = useState(false);
  const [inputValue,setInputValue] = useState('');
  const [editField,setEditField] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [tasks,setTasks] = useState([]);
  const [loading,setLoading] = useState(false);

  const apiURL = 'https://welcometoatodolist.herokuapp.com'

  const createTask = () => {
    setLoading(true)
    axios.post(`${apiURL}/create`, {
      content: inputValue,
    }).then((response)=> {
      setTasks((previousState) => [...previousState,response.data])
      setLoading(false)
    })
    setInputValue('');
  }
  
  const editTask = () => {
    setLoading(true)
    axios.put(`${apiURL}/update?id=${selectedCard}`, {
      content: editField
    }).then(() => {
      const newTasks = tasks.map(task => {
        if(task.id === selectedCard) {
          return {
            ...task,
            content: editField,
          }
        }
        return task
      })
      setTasks(newTasks)
      setEditField('');
      setSelectedCard(null);
      setEditMode(false);
      setLoading(false);
    })
  }

  useEffect(() => {
    setLoading(true);
    axios.get(apiURL).then(function (response) {
      setTasks(response.data)
      setLoading(false);
    })
  }, [])

  return (
    <div className="container"> 
      <div className="interface">
        {!editMode && (
          <>
            <header className="header">
              <h1>To Do List - Goolang</h1>
              <div>
                <img className='header_img' src={goSymbol} />
              </div>
            </header>
            {loading 
            ? <img className="loading-gif" src={loadingGif}/>
          : <> 
            <section className='create-container'>
              <div className='create-title-area'>
                <p className='create-title'>Criar nova task</p>
                <AddCircleIcon onClick={() => setShowCreateArea(!showCreateArea)} />
              </div>
              {showCreateArea && (
                <div className='create-button-area'>
                  <TextField onChange={(e) => setInputValue(e.target.value)} value={inputValue} className='create-input' size='small' id="outlined-basic" label="Nome" variant="outlined" />
                  <Button onClick={() => createTask()} className='create-button' variant="outlined">Criar</Button>
                </div>
              )}
            </section>
            <section>
              {tasks.filter((task) => task.finish === false).map((task) => (
                <Card setEditField={setEditField}
                setLoading={setLoading}
                setTasks={setTasks}
                setEditMode={setEditMode}
                title={task.content}
                id={task.id}
                date={task.created_at}
                key={task.id}
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard} />
              ))}
            </section>
          </>}
          </>
        )}
        {editMode && (
          <section className='edit-container'>
            <div className='edit-title-area'>
              <p className='edit-title'>Editar task</p>
              <ArrowBackIcon onClick={() => setEditMode(false)} />
            </div>
            <div className='edit-button-area'>
              <TextField onChange={(e) => setEditField(e.target.value)} value={editField} className='edit-input' size='small' id="outlined-basic" label="Nome" variant="outlined" />
              <Button onClick={() => editTask()} className='edit-button' variant="outlined">Editar</Button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default App;
