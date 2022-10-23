import { Component } from "react";

import Cookies from 'universal-cookie';
import './tables/css/nvar.css'


const cookies = new Cookies();
class Nvar extends Component {
    state = { Component } 

    cerrarSesion=()=>{
        cookies.remove('id', {path: "/"});
        cookies.remove('user', {path: "/"});
        cookies.remove('email', {path: "/"});
        
        window.location.href='./';
    }

    

    render() { 
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
<div className="container-fluid">
    <p className=" lead text-right fs-2 mx-2 center text-center mt-2" style={{color: "white", cursor: "pointer",}}>Hola! { cookies.get('user', {path: "/"})}</p>

    <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
        <li className="nav-item">
        <a className="nav-link active" aria-current="page"  href="./lista" style={{color: "white"}}>Registro de libros</a>
        </li>
        <li className="nav-item">
        <a className="nav-link" aria-current="page" href={'./registro-libros-deseados'} style={{color: "white"}}>Libros deseados</a>
        </li>

        <li className="nav-item">
        <a className="nav-link" aria-current="page" href={'./autores'} style={{color: "white"}}>Autores</a>
        </li>

        <li className="nav-item">
        <a className="nav-link" aria-current="page" href={'./filtro-libros'} style={{color: "white"}}>Filtrar libros</a>
        </li>
        
    
    <button type="button" className="btn btn-outline-danger " onClick={()=>this.cerrarSesion()} style={{color: "white"}}>Cerrar Sesion</button>
   
    <li className="nav-item licencia" >
        <a rel="license noreferrer" href="http://creativecommons.org/licenses/by-nc-sa/4.0/" className="nav-link" target='_blank' >
            <img alt="Licencia Creative Commons" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a>
        </li>
   
   </ul> 
   </div>
</div>
</nav>


        );
    }
}
 
export default Nvar;