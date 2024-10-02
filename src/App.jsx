import Header from './components/Header';
import MenuHeader from './components/merchantPage/MenuHeader';

function App() {
    return (
        <div>
            <Header></Header>
            {/* <MenuHeader></MenuHeader> */}
            <div className="relative w-[361px] h-[241px] bg-white border-2
                     border-red-300 rounded-2xl overflow-hidden">
                <img src="https://cdn.discordapp.com/attachments/1252578325285572700/1290739100466282629/2024-10-02_021609.png?ex=66fe36b6&is=66fce536&hm=bf1dd2c37255fccfb5519d4d2e2c9133565f87379676d816c4eee2267b8ede77&" alt="Store Image" 
                className="relative w-full h-auto object-cover" />
                
            </div>
        </div>
    )
}

export default App;