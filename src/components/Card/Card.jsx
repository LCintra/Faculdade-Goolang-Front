import React from 'react';
import './Card.styles.css'
import MenuIcon from '@mui/icons-material/Menu';
import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import moment from 'moment'

const Card = ({
  title,
  date,
  selectedCard,
  setSelectedCard,
  id,
  setEditMode,
  setTasks,
  setLoading,
  setEditField}) => {
  const isThisCardSelected = selectedCard === id
  const apiURL = 'https://welcometoatodolist.herokuapp.com'

  const getContainerState = () => {
    if (selectedCard !== null && !isThisCardSelected) {
      return 'card-unselected';
    } else if (isThisCardSelected) {
      return 'card-selected'
    } else return
  }

  const deleteCard = () => {
    setLoading(true);
    axios.delete(`${apiURL}/finish?id=${id}`).then(() => {
      setTasks((previousState) => previousState.filter((task) => task.id !== id));
      setLoading(false);
    })
    setSelectedCard(null);
  }

  const editCard = () => {
    setEditMode(true)
    setEditField(title);
  }

  return (
    <div className={`card-container ${getContainerState()}`}>
      <div className='left-col'>
        <h4 className='date'>{moment(date).format('DD/MM/YYYY')}</h4>
        <h2 className='task-text'>{title}</h2>
      </div>
      <div className={`icons-container`}>
        <div className={`invisible-icons-container ${isThisCardSelected && 'icons-container-appear'}`}>
          <div className='invisible-icons'><CheckIcon onClick={() => setSelectedCard(null)} /></div>
          <div className='invisible-icons'><DeleteForeverIcon onClick={() => deleteCard()} /></div>
          <div className='invisible-icons'><EditIcon onClick={() => editCard()} /></div>
        </div>
        <MenuIcon className={`open-more ${isThisCardSelected && 'icon-selected'}`} onClick={() => isThisCardSelected ? setSelectedCard(null) : setSelectedCard(id)}/>
      </div>
    </div>
  )
}

export default Card