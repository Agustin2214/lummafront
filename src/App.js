import './App.css';
import { Routes, Route } from "react-router-dom";

import { Home } from './componentes/home/home';
import { Login } from './componentes/login/login';
import { Incio } from './componentes/inicio/inicio';
import { Administracion } from './componentes/administracion/administracion';
import { Categorias } from './componentes/categorias/categorias';
import { Tareas } from './componentes/tareas/tareas';
import { Subtareas } from './componentes/subtareas/subtareas';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/inicio' element={<Incio/>}/>
        <Route path='/administracion' element={<Administracion/>}/>
        <Route path='/categorias' element={<Categorias/>}/>
        <Route path='/tareas' element={<Tareas/>}/>
        <Route path='/subtareas' element={<Subtareas/>}/>
        
   </Routes>
    </div>
  );
}

export default App;
