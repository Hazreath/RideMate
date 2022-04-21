import '../styles/ParkList.css'
import Trick from '../models/Trick'
// STUB
var tricks = [
    new Trick("Bar to Finger","Bowl"),
    new Trick("540","Bowl"),
    new Trick("540","Fly"),
    new Trick("Icepick","Bowl"),
    new Trick("Quad","Fly")
]

function ParkList() {
    let platforms = tricks.map(t => t.platform).filter(uniquifier)
    
    var c = 
        <form className="parklist" method='POST'>
            <div className='tabs is-centered is-boxed is-fullwidth is-medium'>
                <ul>
                    <li className='is-active'><a className='subtitle is-3'>Park</a></li>
                    <li><a className='subtitle is-3'>Street</a></li>
                </ul>
                
            </div>
            <div className='parklist-container'>
                {platforms.map(p => displayTricksWithPlatform(p))}
            </div>
            
        </form>
    
    return c;
}

function uniquifier(v, i, array) {
    return array.indexOf(v) === i
}
function displayParkList() {
    
}
function displayTricksWithPlatform(platform) {
    var c = 
    <div class='parklist-platform box message is-info'>
        <h3 className='subtitle is-3 platform-name message-header'>{platform}</h3>
        <ul className='trick-bag'>
            {
                tricks.filter(trick => trick.platform === platform)
                    .map(t => 
                            <li key={t.name}>
                                <label className='checkbox'>
                                    <input type='checkbox' className='checkbox'/>{t.name}
                                </label>
                            </li>
                        )
            }
        </ul>
    </div>
        
        
    return c
}
export default ParkList