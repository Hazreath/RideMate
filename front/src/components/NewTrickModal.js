import '../styles/NewTrickModal.css'
import { useState } from 'react'


function NewTrickModal() {
    const [modalOpened, changeOpenModal] = useState(false)
    const [newForm, changeNewForm] = useState(true) // true : trick | false: module/platform

    let modalClass = 'modal add-trick-modal'
    
    if (modalOpened) {
        modalClass += ' is-active'
    }

    let c = 
        <div className='new-trick-modal-container'>
            <div className='new-button' onClick={() => openModal(changeOpenModal,!modalOpened)}>➕</div>
            <div className={modalClass}>
                <div className='modal-background'></div>
                <div className='modal-content'>
                    <article className="message is-primary">
                        <div className="message-header">
                            <p>New Item</p>
                            <button className="delete" aria-label="delete" 
                                onClick={() => openModal(changeOpenModal,!modalOpened)}></button>
                        </div>
                        <div className="message-body">
                            <div className='tabs is-boxed is-centered is-full'>
                                <ul>
                                    <li className={newForm && 'is-active'}>
                                        <a onClick={() => changeForm(changeNewForm,!newForm)}>Trick</a>
                                    </li>
                                    <li className={!newForm && 'is-active'}>
                                        <a onClick={() => changeForm(changeNewForm,!newForm)}>Module</a>
                                    </li>
                                </ul>
                            </div>
                            <div className='new-modal-body'>
                            {newForm ? displayNewTrickForm() : displayNewPlatformForm() }
                            
                            </div>
                            
                        </div>
                        
                        
                    </article>
                </div>
                <button className="modal-close is-large" aria-label="close"></button>
            </div>
        </div>
        
    return c
}

function openModal(updater, v) {
    updater(v)
}

function changeForm(updater,v) {
    // console.log('form changed : ' + v ? 'trick' : 'platform')
    updater(v)
}

function displayNewTrickForm() {
    
    let c =
        <form className='columns new-trick-form' method='POST'>
            <input className="input is-info is-rounded is-full column" type="text" placeholder="Trick name..."></input>
            
            <div className="select is-rounded is-full">
                <select>
                    <option>Bowl</option>
                    <option>Fly</option>
                </select>
            </div>

            <input type='submit' className='button is-success is-rounded' value='Ajouter'></input>
        </form>

    return c
}

function displayNewPlatformForm() {
    let c =
        <form className='columns new-trick-form' method='POST'>
            <input className="input is-info is-rounded is-full column" type="text" placeholder="Trick name..."></input>
            
            

            <input type='submit' className='button is-success is-rounded' value='Ajouter'></input>
        </form>

    return c
}
export default NewTrickModal;