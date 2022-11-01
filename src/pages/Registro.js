import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/basicDesing.css'







export default function Registro() {

    const [user,setUser]=useState("");
    const [email,setEmail]=useState("");
    const [password2,setPassword2]=useState("");
    const [password1,setPassword1]=useState("");
    
    
    
    var url='https://api-library-service.herokuapp.com/api/registry';
    const [data, setData] = useState([]);
    fetch(url).then((res)=>res.json()).then((resJson)=>setData(resJson));
    
    var lastID;
    data.map((regs,i) =>{
    lastID=regs.id
    }
    );
 
  
   
        return (
           
         <body className='body'>
          <div className="wrapper fadeInDown">
          <div id="formContent">
          
        
  
            <div className="fadeIn first">
              <img src="https://admacad.udb.edu.sv/Recursos/imagenes/UDB_negras.png" id="icon" alt="User Icon" />
            </div>
        
         
            
              <input type="text" id="user" className="fadeIn second"  placeholder="Usuario"   onChange={(e) => setUser(e.target.value)} required/>
              <input type="text" id="email" className="fadeIn second" placeholder="Email"   onChange={(e) => setEmail(e.target.value)} required/>
              <input type="password" id="password1" className="fadeIn third"  placeholder="Contraseña"  onChange={(e) => setPassword1(e.target.value)} required/>
             
              <input type="password" id="password2" className="fadeIn third"  placeholder="Repetir contraseña"   onChange={(e) => setPassword2(e.target.value)} required/>
              <button className="btn btn-primary p-2 m-2" onClick={()=>{
                if((user == "") || (email == "") || (password1 == "") || (password2 == "")){

                  alert('Porfavor llenar todos los datos')

               } else if(password1 != password2){
                  
                  alert('Las contraseñas no coinciden')

                }else{
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
                }).then((res)=>res.json()).then((resJson)=>alert(resJson.message)).then(()=>window.location.href="./");
                }
       ;} }>Registrarse</button>
            
        
         
            <div id="formFooter">
              <a class="underlineHover" href={"./"}>Iniciar sesion</a>
            </div>
        
          </div>
        </div>
        </body>

        );
    }


