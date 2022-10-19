import React from 'react';
import './Card.styles.css'
import MenuIcon from '@mui/icons-material/Menu';
import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

const Card = ({title, date, selectedCard, setSelectedCard, id, setEditMode}) => {
  const isThisCardSelected = selectedCard === id

  const getContainerState = () => {
    if (selectedCard !== null && !isThisCardSelected) {
      return 'card-unselected';
    } else if (isThisCardSelected) {
      return 'card-selected'
    } else return
  }

  const deleteCard = () => {
    // api
  }

  const editCard = () => {
    setEditMode(true)
  }

  return (
    <div className={`card-container ${getContainerState()}`}>
      <div className='left-col'>
        <h4 className='date'>{date}</h4>
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