import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import './css/css.css'
import Nvar from "../Nvar";
export const BusquedaLibros = () => {
// configuramos Los hooks
const [books, setBooks] = useState( [] )

//2 - fcion para mostrar los datos con axios
const basicURL = 'https://api-library-service.herokuapp.com/api/book'

const getData = async () => {
    await axios.get(basicURL).then((res) => {
        const data = res.data
        setBooks(data)
    })
}

useEffect( ()=>{
    getData()
}, [])

// Definimos las columns
const columns = [
    {
        name: "id",
        label: "ID"
    },
    {
        name: "name",
        label: "Titulo"
    },
    {
        name: "author",
        label: "Autor"
    },
    
    {
        name: "pages",
        label: "Paginas"
    },
    {
        name:'genre',
        label: "Genero"
    }
]
// renderizamos la datatable
        return (


            <>
            <Nvar />
            
            <body className="body">
                <div className="container my-5 tablas-udb">
                    <MUIDataTable
                        title={"Busqueda de libros"}
                        data={books}
                        columns={columns} />
                </div>
            </body></>
        )

}