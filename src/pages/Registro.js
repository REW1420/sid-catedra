import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/basicDesing.css'
import { Link } from "react-router-dom";







export default function Registro() {

    const [user,setUser]=useState("");
    const [email,setEmail]=useState("");
    const [password2,setPassword2]=useState("");
    
    
    
    var url='http://api-library-service.herokuapp.com/api/registry';
    const [data, setData] = useState([]);
    fetch(url).then((res)=>res.json()).then((resJson)=>setData(resJson));
    
    var lastID;
    data.map((regs,i) =>{
    lastID=regs.id
    }
    );
 
  
   
        return (
           
         
          <div className="wrapper fadeInDown">
          <div id="formContent">
          
        
  
            <div className="fadeIn first">
              <img src="https://admacad.udb.edu.sv/Recursos/imagenes/UDB_negras.png" id="icon" alt="User Icon" />
            </div>
        
         
            
              <input type="text" id="login" className="fadeIn second"  placeholder="Usario"   onChange={(e) => setUser(e.target.value)}/>
              <input type="text" id="login" className="fadeIn second" placeholder="Email"   onChange={(e) => setEmail(e.target.value)}/>
              <input type="password" id="password" className="fadeIn third"  placeholder="Contraseña"   />
              <input type="password" id="password" claclassNamess="fadeIn third"  placeholder="Repetir ontraseña"   onChange={(e) => setPassword2(e.target.value)}/>
              <button className="btn btn-primary p-2 m-2" onClick={()=>{
        fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(
            {
                id: (parseInt(lastID)+1).toString(),
                user: user,
                email: email, 
                password: password2   
            }   
        )
    }).then((res)=>res.json()).then((resJson)=>alert(resJson.message)).then(()=>window.location.href="./");} }>Registrarse</button>
            
        
         
            <div id="formFooter">
              <Link class="underlineHover" to={"./"}>iniciar sesion</Link>
            </div>
        
          </div>
        </div>
                

        );
    }


