import { Component } from "react";

import Cookies from 'universal-cookie';


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
            <nav className="navbar navbar-expand-lg navbar-light bg-light mx-2">
<div className="container-fluid">
    <p className=" lead text-right fs-2 mx-2 center text-center mt-2">Hola! { cookies.get('user', {path: "/"})}</p>

    <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
        <li className="nav-item">
        <a className="nav-link active" aria-current="page"  href="./lista">Registro de libros</a>
        </li>
        <li className="nav-item">
        <a className="nav-link" aria-current="page" href={'./registro-libros-deseados'}>Libros deseados</a>
        </li>

        <li className="nav-item">
        <a className="nav-link" aria-current="page" href={'./autores'}>Autores</a>
        </li>

        <li className="nav-item">
        <a className="nav-link" aria-current="page" href={'./filtro-libros'}>Filtrar libros</a>
        </li>
        
    </ul>
    <button type="button" className="btn btn-outline-danger " onClick={()=>this.cerrarSesion()}>Cerrar Sesion</button>
    </div>
</div>
</nav>
        );
    }
}
 
export default Nvar;