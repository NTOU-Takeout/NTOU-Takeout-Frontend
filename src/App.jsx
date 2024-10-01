//import {owo} from './assets/card.svg'
//import merchant from './components/Merchant'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as hollowFaBookmark } from '@fortawesome/free-regular-svg-icons/faBookmark';//hollow
import { faBookmark as solidFaBookmark } from '@fortawesome/free-solid-svg-icons/faBookmark';

function App(){
    return (
        <div>
            
            <FontAwesomeIcon icon={hollowFaBookmark} />
            <FontAwesomeIcon icon={solidFaBookmark} />
            <h1>My First React App asfasfas</h1>
            <p>Welcome to my first React app</p>
        </div>
    )
}

export default App