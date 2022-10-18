import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";

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
    }
]
// renderizamos la datatable
        return (
            <div className="container my-5">
            <MUIDataTable 
            title={"Busqueda de libros"}
            data={books}
            columns={columns}
            />
            </div>
        )

}