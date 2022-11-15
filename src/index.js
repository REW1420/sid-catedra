import React from 'react';
import ReactDOM  from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom" 
import Login from './pages/Login';
import Registro from './pages/Registro';
import ListaLibros from './pages/tables/ListaLibros';
import ListaLibrosDeseados  from './pages/tables/ListaLibrosDeseados';






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
<BrowserRouter>


<Routes>

<Route path="/" element={<Login/>}/>
<Route path="/registro" element={<Registro/>}/>
<Route path="/lista" element={<ListaLibros/>}/>
<Route path="/registro-libros-deseados" element={<ListaLibrosDeseados/>}/>


</Routes>


</BrowserRouter>
 
);



