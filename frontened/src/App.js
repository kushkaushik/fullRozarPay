import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Home';
import Payment from './Payment';

function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>

    {/* Hello Kush Kaushik */}
<Route path = '/' element  = {<Home/>}/>
<Route path = '/success' element  = {<Payment/>}/>

   </Routes>
   {/* Jysg Kauhsik */}
   
   
   </BrowserRouter>
   
   </>
  );
}

export default App;
