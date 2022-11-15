import React, {useEffect, useState} from 'react';
import Nvar from '../Nvar';
import './css/css.css'
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';
import { textAlign } from '@mui/system';


const baseUrl='https://api-library-service.herokuapp.com/api/book'

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
    cursor: 'pointer',
   
    
  }, 
  inputMaterial:{
    width: '100%',
    textAlign: 'center'
  }
}));

function ListaLibros() {
const styles= useStyles();
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);

  const [selectedBook, setSelectedBook]=useState({

    
    name: '',
    author:'',
    pages: '',
    genre: ''
    
  })
  ////////////////////////////
  
  var url='https://api-library-service.herokuapp.com/api/book';
  const [dataID, setDataID] = useState([]);
  
    fetch(url)
    .then((res)=>res.json()).then((resJson)=>setDataID(resJson));
    var lastID;
    dataID.map((book,i) =>{
      lastID=book.id
    }
    );

    
  const [name,setName]=useState("");
  const [author,setAuthor]=useState("");
  const [pages,setPages]=useState("");
  const [genre,setGenre]=useState("");
  

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

  

  const peticionPut=async()=>{
    await axios.put(baseUrl+"/"+selectedBook.id, selectedBook)
    .then(response=>{
      var dataNueva=data;
      dataNueva.map(book=>{
        if(selectedBook.id===book.id){
          book.nombre=selectedBook.name;
          book.lanzamiento=selectedBook.author;
          book.empresa=selectedBook.pages;
          
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

  const seleccionarLibro=(libro, caso)=>{
    setSelectedBook(libro);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }

  useEffect(async()=>{
    await peticionGet();
  },[])

  const bodyInsertar=(
    <div className={styles.modal}>
      <h3 id='titulo'>Agregar nuevo libro</h3>
      <TextField name="author" className={styles.inputMaterial} label="Autor" onChange={(e) => setAuthor(e.target.value)}/>
      <br />
      <TextField name="name" className={styles.inputMaterial} label="Titulo" onChange={(e) => setName(e.target.value)}/>
      <br />
      <TextField name="pages" className={styles.inputMaterial} label="Paginas" onChange={(e) => setPages(e.target.value)}/>
      <br />
      <TextField name="genre" className={styles.inputMaterial} label="Genero(s)" onChange={(e) => setGenre(e.target.value)}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>{

          if(author==='' && name === '' && pages === '' && genre === ''){
            document.getElementById('titulo').innerHTML="<h3 className='text-danger'>Datos vacios</h3>"
          }else if(author==='' || name === '' || pages === '' || genre === ''){
            document.getElementById('titulo').innerHTML="<h3 className='text-danger'>Rellene todos los datos</h3>"
          }else if(parseInt(pages)>=0){
            fetch(url,{
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
                },
              body: JSON.stringify(
                  {
                      id: (parseInt(lastID)+1).toString(),
                      name: name,
                      author: author,
                      pages: pages,
                      genre: genre   
                  }   
              )
          }).then((res)=>res.json()).then(abrirCerrarModalInsertar());

          }else {
            document.getElementById('titulo').innerHTML="<h3 className='text-danger'>Las paginas deben ser numeros</h3>"
          }
          }} >Insertar</Button>
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
      <TextField name="genre" className={styles.inputMaterial} label="Genero(s)" onChange={handleChange} value={selectedBook && selectedBook.genre}/>
      <br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPut()}>Actualizar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar=(
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el libro <b>{selectedBook && selectedBook.name}</b> ? </p>
      <div align="right">
        <Button color="secondary" onClick={()=>peticionDelete()} >Sí</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  )


  return (



    <>
    <Nvar />
    <body className='body'>
      <div className="container tablas-udb">
        <br />
        <Button className='btn-primary botonAgregar' onClick={() => abrirCerrarModalInsertar()}>Registrar nuevo libro</Button>
        <br /><br />

        <div className='tablasColor'>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Titulo</TableCell>
                  <TableCell>Autor</TableCell>
                  <TableCell>Paginas</TableCell>
                  <TableCell>Genero</TableCell>
                  <TableCell>Opciones</TableCell>

                </TableRow>
              </TableHead>

              <TableBody>
                {data.map(bookW => (
                  <TableRow key={bookW.id}>
                    <TableCell>{bookW.id}</TableCell>
                    <TableCell>{bookW.name}</TableCell>
                    <TableCell>{bookW.author}</TableCell>
                    <TableCell>{bookW.pages}</TableCell>
                    <TableCell>{bookW.genre}</TableCell>

                    <TableCell>
                      <Edit className={styles.iconos} onClick={() => seleccionarLibro(bookW, 'Editar')} />
                      &nbsp;&nbsp;&nbsp;
                      <Delete className={styles.iconos} onClick={() => seleccionarLibro(bookW, 'Eliminar')} />
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

export default ListaLibros;