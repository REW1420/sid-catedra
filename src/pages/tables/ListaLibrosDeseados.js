import React, {useEffect, useState} from 'react';

import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';

const baseUrl='https://api-library-service.herokuapp.com/api/wish'

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



function ListaLibrosDeseados() {

  //busqueda del utimo id


 

const styles= useStyles();
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);

  const [selectedBook, setSelectedBook]=useState( {
    id: (parseInt(lastID)+1).toString(),
    name: '',
    author:'',
    pages: '',
    
  })

  const [dataID, setDataID]=useState([]);
  fetch(baseUrl)
  .then((res)=>res.json()).then((resJson)=>setDataID(resJson));
  
    var lastID = 1;
  dataID.map((book,i) =>{
    lastID = book.id  
    return lastID
  }
  );

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
      dataNueva.map(book=>{
        if(selectedBook.id===book.id){
          book.name=selectedBook.name;
          book.author=selectedBook.author;
          book.pages=selectedBook.pages;
          
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
      <h3>Agregar nuevo libro deseado</h3>
      <TextField name="author" className={styles.inputMaterial} label="Autor" onChange={handleChange}/>
      <br />
      <TextField name="name" className={styles.inputMaterial} label="Titulo" onChange={handleChange}/>
      <br />
      <TextField name="pages" className={styles.inputMaterial} label="Paginas" onChange={handleChange}/>
      <br />
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEditar=(
    <div className={styles.modal}>
      <h3>Editar libro</h3>
      <TextField name="author" className={styles.inputMaterial} label="Autor" onChange={handleChange} value={selectedBook && selectedBook.author}/>
      <br />
     
      <TextField name="name" className={styles.inputMaterial} label="Titulo" onChange={handleChange} value={selectedBook && selectedBook.name}/>
      <br />
      <TextField name="pages" className={styles.inputMaterial} label="Paginas" onChange={handleChange} value={selectedBook && selectedBook.pages}/>
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
    <div className="container">
      <br />
    <Button onClick={()=>abrirCerrarModalInsertar()}>Agregar libro deseado</Button>
      <br /><br />
     <TableContainer>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>ID</TableCell>
             <TableCell>Titulo</TableCell>
             <TableCell>Autor</TableCell>
             <TableCell>Paginas</TableCell>
             <TableCell>Opciones</TableCell>

           </TableRow>
         </TableHead>

         <TableBody>
           {data.map(bookW=>(
             <TableRow key={bookW.id}>
                <TableCell>{bookW.id}</TableCell>
               <TableCell>{bookW.name}</TableCell>
               <TableCell>{bookW.author}</TableCell>
               <TableCell>{bookW.pages}</TableCell>
             
               <TableCell>
                 <Edit className={styles.iconos} onClick={()=>seleccionarConsola(bookW, 'Editar')}/>
                 &nbsp;&nbsp;&nbsp;
                 <Delete  className={styles.iconos} onClick={()=>seleccionarConsola(bookW, 'Eliminar')}/>
                 </TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
     
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
  );
}

export default ListaLibrosDeseados;