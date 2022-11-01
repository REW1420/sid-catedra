import React, {useEffect, useState} from 'react';
import './css/css.css'
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';
import Nvar from '../Nvar';

const baseUrl='https://api-library-service.herokuapp.com/api/author'

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));

function Autores() {
const styles= useStyles();
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);

  const [selectedBook, setSelectedBook]=useState({
    name: '',
    nacionality:'',
    bornDay: '',
    bornMoth: '',
    bornYear: '',
    
  })

   ////////////////////////////
  
   var url='https://api-library-service.herokuapp.com/api/author';
   const [dataID, setDataID] = useState([]);//los corchetes son para especificar que la variable "data" va a recibir un objeto
     //constante con hook para capturar los datos de la petición fetch
     fetch(url)
     .then((res)=>res.json()).then((resJson)=>setDataID(resJson));
     var lastID;
     dataID.map((book,i) =>{
       lastID=book.id
     }
     );
 
     
   const [name,setName]=useState("");
   const [nacionality,setNacionality]=useState("");
   const [bornDay,setDay]=useState("");
   const [bornMoth,setMonth]=useState("");
   const [bornYear,setYear]=useState("");
   
 
   ///////////////////////

  const handleChange=e=>{
    const {name, value}=e.target;
    setSelectedBook(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(selectedBook);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    })
  }

  const peticionPost=async()=>{
    await axios.post(baseUrl, selectedBook)
    .then(response=>{
      setData(data.concat(response.data))
      abrirCerrarModalInsertar()
    })
  }

  const peticionPut=async()=>{
    await axios.put(baseUrl+"/"+selectedBook.id, selectedBook)
    .then(response=>{
      var dataNueva=data;
      dataNueva.map(author=>{
        if(selectedBook.id===author.id){
          author.name=selectedBook.name;
          author.nacionality=selectedBook.nacionality;
          author.bornDay=selectedBook.bornDay;
          author.bornMoth=selectedBook.bornMoth;
          author.bornYear=selectedBook.bornYear;
          
        }
      })
      setData(dataNueva);
      abrirCerrarModalEditar();
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(baseUrl+"/"+selectedBook.id)
    .then(response=>{
      setData(data.filter(book=>book.id!==selectedBook.id));
      abrirCerrarModalEliminar();
    })
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const seleccionarConsola=(consola, caso)=>{
    setSelectedBook(consola);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }

  useEffect(async()=>{
    await peticionGet();
  },[])

  const bodyInsertar=(
    <div className={styles.modal}>
      <h3>Agregar nuevo autor</h3>
      <TextField name="name" className={styles.inputMaterial} label="Nombre" onChange={(e) => setName(e.target.value)}/>
      <br />
      <TextField name="nacionality" className={styles.inputMaterial} label="Nacionalidad" onChange={(e) => setNacionality(e.target.value)}/>
      <br />
      <TextField name="bornDay" className={styles.inputMaterial} label="Dia de nacimiento" onChange={(e) => setDay(e.target.value)}/>
      <br />
      <TextField name="bornMoth" className={styles.inputMaterial} label="Mes de nacimiento (Formato numerico)" onChange={(e) => setMonth(e.target.value)}/>
      <br />
      <TextField name="bornYear" className={styles.inputMaterial} label="Año de nacimiento" onChange={(e) => setYear(e.target.value)}/>
      <br />
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>{
          fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(
                {
                    id: (parseInt(lastID)+1).toString(),
                    name: name,
                    nacionality: nacionality,
                    bornDay: bornDay,
                    bornMoth: bornMoth,
                    bornYear:bornYear 
                }   
            )
        }).then((res)=>res.json()).then(abrirCerrarModalInsertar());}}>Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEditar=(
    <div className={styles.modal}>
      <h3>Editar autor</h3>
      <TextField name="name" className={styles.inputMaterial} label="Nombre" onChange={handleChange} value={selectedBook && selectedBook.name}/>
      <br />
      <TextField name="nacionality" className={styles.inputMaterial} label="Nacionalidad" onChange={handleChange} value={selectedBook && selectedBook.nacionality}/>
      <br />
      <TextField name="bornDay" className={styles.inputMaterial} label="Dia de nacimiento" onChange={handleChange} value={selectedBook && selectedBook.bornDay}/>
      <br />
      <TextField name="bornMoth" className={styles.inputMaterial} label="Mes de nacimiento (Formato numerico)" onChange={handleChange} value={selectedBook && selectedBook.bornMoth}/>
      <br />
      <TextField name="bornYear" className={styles.inputMaterial} label="Año de nacimiento" onChange={handleChange} value={selectedBook && selectedBook.bornYear}/>
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPut()}>Actualizar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar=(
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la consola <b>{selectedBook && selectedBook.name}</b> ? </p>
      <div align="right">
        <Button color="secondary" onClick={()=>peticionDelete()} >Sí</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  )


  return (


    <><Nvar />
    
    <body className='body'>
      <div className="container tablas-udb ">
        <br />
        <Button className='btn-primary botonAgregar' onClick={() => abrirCerrarModalInsertar()}>Registrar nuevo autor</Button>
        <br /><br />
        <div className='tablasColor'>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Nacionalidad</TableCell>
                  <TableCell>Fecha de nacimiento</TableCell>
                  <TableCell>Opciones</TableCell>


                </TableRow>
              </TableHead>

              <TableBody>
                {data.map(bookW => (
                  <TableRow key={bookW.id}>
                    <TableCell>{bookW.id}</TableCell>
                    <TableCell>{bookW.name}</TableCell>
                    <TableCell>{bookW.nacionality}</TableCell>
                    <TableCell>{bookW.bornDay}/{bookW.bornMoth}/{bookW.bornYear}</TableCell>

                    <TableCell>
                      <Edit className={styles.iconos} onClick={() => seleccionarConsola(bookW, 'Editar')} />
                      &nbsp;&nbsp;&nbsp;
                      <Delete className={styles.iconos} onClick={() => seleccionarConsola(bookW, 'Eliminar')} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <Modal
          open={modalInsertar}
          onClose={abrirCerrarModalInsertar}>
          {bodyInsertar}
        </Modal>

        <Modal
          open={modalEditar}
          onClose={abrirCerrarModalEditar}>
          {bodyEditar}
        </Modal>

        <Modal
          open={modalEliminar}
          onClose={abrirCerrarModalEliminar}>
          {bodyEliminar}
        </Modal>
      </div>
    </body></>
  );
}

export default Autores;