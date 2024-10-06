import Header from './components/Header';
import Merchant from './components/Merchant';
import Searchbar from './components/Searchbar';
<<<<<<< HEAD
import MenuHeader from './components/merchantPage/MenuHeader';

=======
>>>>>>> de91e1c14d5f0429cacde01c9c12ccf54e9460db
function App() {
    //{name, distance, costDownLimit, costUpLimit, starRate, starNumber }
    return (
        <div>
            <Header></Header>
            <Searchbar></Searchbar>
            <Merchant 
                id={0}
                name="海洋大學店" 
                distance={1.6} 
                costDownLimit={98} 
                costUpLimit={123} 
                starRate={4.8} 
                starNumber={71} 
                >
            </Merchant>
            <Merchant 
                id={1}
                name="海" 
                distance={2.5} 
                costDownLimit={12} 
                costUpLimit={124} 
                starRate={3.2} 
                starNumber={12} >
            </Merchant>
<<<<<<< HEAD
            {/* <MenuHeader></MenuHeader> */}
        </div>
    )
}
=======
        </div>
    )
}

>>>>>>> de91e1c14d5f0429cacde01c9c12ccf54e9460db
export default App;