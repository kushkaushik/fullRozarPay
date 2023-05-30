import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Home';
import Payment from './Payment';
import './App.css'
import { Sub } from './Sub';
import SureSubsc from './SureSubsc'

function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>



    {/* Hello Kush Kaushik */}
    <Route path='/sub' element  = {<Sub/>}/>
    <Route path='/subscribe' element  = {<SureSubsc/>}/>
  
    
<Route path = '/' element  = {<Home/>}/>
<Route path = '/success' element  = {<Payment/>}/>

   </Routes>
   {/* Jysg Kauhsik */}
   
   
   </BrowserRouter>
   
   </>
  );
}

export default App;
