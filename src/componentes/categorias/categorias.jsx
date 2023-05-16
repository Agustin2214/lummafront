import { Link, useNavigate } from 'react-router-dom'
import style from './categorias.module.css'
import { InputGroup,Form, FormControl, Button} from 'react-bootstrap'
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { useEffect, useState } from "react";
import { Administracion } from '../administracion/administracion';

export function Categorias() {
  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState([]);
  const [value, setValue] = useState('');
  const [esadmin, setEsadmin] = useState('');








   useEffect(() => {
      user.admin === false?setEsadmin(false):setEsadmin(true)
     
    }, []);
    
    useEffect(() => {
    user.admin === false?navigate("/inicio"):console.log('ok')
    
    getCategorias()
 
  }, []);
 



  function getCategorias(){
    axios.get(`http://172.16.1.108:8080/api/cat` ).then((response) =>{setCategoria(response)}).catch((err) => console.log("err", err))
  }
  function deleteCategorias(id){
    axios.delete(`http://172.16.1.108:8080/api/cat?uid=${id}` ).then((response) =>{alert(response.data)}).catch((err) => console.log("err", err))
    getCategorias()
  }
  function agregarCategorias(data){
    axios.post(`http://172.16.1.108:8080/api/cat`,data ).then((response) =>{alert("Categoria cargada correctamente")}).catch((err) => console.log("err", err))
    getCategorias()
  }
  

  function handleClick(e){
    e.preventDefault()
    const confirmDelete = window.confirm("¿Está seguro que desea eliminar esta categoría?");

    if (confirmDelete) {
    deleteCategorias(e.target.value)

    getCategorias()
    }}

  function handleSubmit(event){
    event.preventDefault();
    let obj = {name: value}
    const confirmDelete = window.confirm("¿Está seguro que desea agregar esta categoría?");

    if (confirmDelete) {
    agregarCategorias(obj)
    setValue('');
    getCategorias()}
 }

 function handleChange(event)  {
    setValue(event.target.value);
  };

  return (
    <div>
        <nav>{esadmin?<Administracion/>:'' } </nav>
        <h1>Agregar nueva categoria</h1>
        <div>

        <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Nueva categoría</Form.Label>
        <Form.Control type="text" placeholder="Ingrese el nombre de la categoría" value={value} onChange={handleChange} />
        <Form.Text className="text-muted">
          Ingrese el nombre de la categoría que desea agregar
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Enviar
      </Button>
    </Form>
  
        </div>


<h1>Ver o eliminar categoria existentes </h1>
<Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Categoria</th>
          <th>Delete</th>
          
        </tr>
      </thead>

      <tbody>
      {categoria?.data?.length > 0?
      categoria?.data?.map((option, index) => (
        <tr>
          <td>{index + 1}</td>
          <td>{option.name}</td>
          <td ><button value={option.uid} onClick={handleClick}>Delete</button></td>
        
        </tr>
)): <p>No se encontraron categorias agregue una porfavor</p>}
       
      </tbody>
    </Table>

      </div>
 
    )
}