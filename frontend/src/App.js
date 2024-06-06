import './App.css';
import Create from './componants/Create';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Read from './componants/Read';
import Update from './componants/Update';
import Navbar from './componants/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Navbar/>
     <Routes>
      <Route  path='/' element={<Create/>}/>
      <Route  path='/all' element={<Read/>}/>
      <Route  path='/:id' element={<Update/>}/>
     </Routes>
    </BrowserRouter>
    
    </div>
   
  );
}

export default App;
