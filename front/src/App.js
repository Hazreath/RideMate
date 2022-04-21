import './App.css';
import React from 'react';
import Banner from './components/Banner';
import ParkList from './components/ParkList';
import Menu from './components/Menu'
import './styles/bulma.min.css'
import NewTrickModal from './components/NewTrickModal';
function App() {

  // HTML element
  document.documentElement.style.overflow = 'hidden'

  let content = 
    <div className='app-root'>
      <Banner></Banner>
      
      <ParkList></ParkList>
      <NewTrickModal></NewTrickModal>
    </div>
  return content
}

export default App;