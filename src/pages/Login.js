import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from 'universal-cookie'
import '../css/basicDesing.css'
//api
const baseURL = 'https://api-library-service.herokuapp.com/api/registry/'
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

    google(){
        window.location.href="./google-login"
    }


    iniciarSesion=async()=>{
        await axios.get(baseURL+this.state.form.username+'-'+this.state.form.password)
        .then(res=>{
           console.log(res.data)
          return res.data;

        }).then(res=>{
                cookies.set('user', res.user, {path:"/"});
                cookies.set('email', res.email, {path:"/"});
                alert(`Bienvenido ${res.user}`);

                window.location.href="./lista"
            
        })
        .catch(error=>{
            console.log(error)
            if((this.state.form.username == "") || (this.state.form.password == "")){
                alert('Por favor, llene los campos')
            }else if(error){
                alert('La contraseña o usuario son incorrectos')
            }
        })
    }

    componentDidMount() {
        if(cookies.get('user')){
            window.location.href="./lista";
        }
    }









    render() {
        return (
            <>

               
            
            <body className='body'>
            
            <div className="wrapper fadeInDown">
                <div id="formContent">



                    <div className="fadeIn first">
                        <img src="https://admacad.udb.edu.sv/Recursos/imagenes/UDB_negras.png" id="icon" alt="User Icon" />
                    </div>



                    <input type="text" id="login" className="fadeIn second" name="username" placeholder="Usuario" onChange={this.handleChange} />
                    <input type="password" id="password" className="fadeIn third" name="password" placeholder="Contraseña" onChange={this.handleChange} />
                    <button className="btn btn-primary p-2 m-2" onClick={() => this.iniciarSesion()}>Iniciar Sesión</button>
                               
                                         
                
                 
                   
                    <div id="formFooter">
                        <a className="underlineHover" href='./registro'>Registrarse</a>
                    </div>

                </div>
            </div>
            </body>
          </>
        );
    }
}

export default Login;