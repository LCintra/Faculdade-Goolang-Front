import './App.css';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import goSymbol from './assets/goSymbol.png'
import {Card} from './components/Card';
import React, {useState, useEffect} from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

const mockTasks = [
  {
    id: 0,
    date: '2022-10-11',
    text: 'I need to go to supermarket buy some eggs',
  },
  {
    id: 1,
    date: '2022-10-05',
    text: 'Decide which color is my favorite',
  },
  {
    id: 2,
    date: '2022-10-07',
    text: 'Finish goolang to do list',
  },
]

function App() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [showCreateArea, setShowCreateArea] = useState(false);
  const [inputValue,setInputValue] = useState('');
  const [editField,setEditField] = useState('');
  const [editMode, setEditMode] = useState(false);

  const createTask = () => {
    // api
  }
  
  const editTask = () => {
    // api
  }

  useEffect(() => {
    // api
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
              {mockTasks.map((task) => (
                <Card setEditMode={setEditMode} title={task.text} id={task.id} date={task.date} key={task.id} selectedCard={selectedCard} setSelectedCard={setSelectedCard} />
              ))}
            </section>
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
