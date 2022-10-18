import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from 'universal-cookie'
import { Link } from "react-router-dom";
import '../css/basicDesing.css'

const baseURL = 'http://api-library-service.herokuapp.com/api/registry'
const cookies = new Cookies()


class Login extends Component {
    
    state={
        form:{
            username: '',
            password: ''
        }
    }

    handleChange=async e=>{
         this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    registrarse(){
        window.location.href="./registro"
    }


    iniciarSesion=async()=>{
        await axios.get(baseURL,{params: {user: this.state.form.username, password: this.state.form.password}})
        .then(res=>{
           
            return res.data;
        })
        .then(res=>{
            if(res.length>0){
              
                var respuesta=res[0];
                cookies.set('id', respuesta.id, {path: "/"});
                cookies.set('user', respuesta.user, {path: "/"});
                cookies.set('email', respuesta.email, {path: "/"});
                alert(`Bienvenido ${respuesta.user}`);
               window.location.href="./lista"
            
            }else{
                alert('El usuario o la contraseña no son correctos');
            }
        })
       
        .catch(error=>{
            console.log(error)
        })
    }

    componentDidMount() {
        if(cookies.get('user')){
            window.location.href="./libros-registro";
        }
    }

    render() {
        return (
            <div className="wrapper fadeInDown">
            <div id="formContent">
            
          
    
              <div className="fadeIn first">
                <img src="https://admacad.udb.edu.sv/Recursos/imagenes/UDB_negras.png" id="icon" alt="User Icon" />
              </div>
          
           

                <input type="text" id="login" className="fadeIn second" name="username" placeholder="Usario"   onChange={this.handleChange}/>
                <input type="password" id="password" className="fadeIn third" name="password" placeholder="Contraseña"    onChange={this.handleChange}/>
                <button className="btn btn-primary p-2 m-2" onClick={()=> this.iniciarSesion()}>Iniciar Sesión</button>
           
           
              <div id="formFooter">
                <Link className="underlineHover" to='./registro'>Registrarse</Link>
              </div>
          
            </div>
          </div>
        );
    }
}

export default Login;