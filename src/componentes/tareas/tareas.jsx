import { Link, useNavigate } from 'react-router-dom'
import style from './tareas.module.css'
import { InputGroup,Form, FormControl, Button, Dropdown} from 'react-bootstrap'
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { useEffect, useState } from "react";
import { Administracion } from '../administracion/administracion';

export function Tareas() {
  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate();
  const [tarea, setTareas] = useState([]);
  const [value, setValue] = useState('');
  const [categoria, setCategoria] = useState([]);
  const [esadmin, setEsadmin] = useState('');
  const [selectedOption, setSelectedOption] = useState({categoria:"",
                                                        categoriaUid:"",
                                                      tareas:"",
                                                      subtareas:"" });


  useEffect(() => {
    user.admin === false?navigate("/inicio"):console.log('ok')
    getCategorias()
    getTareas()
 
  }, []);
 



 
   useEffect(() => {
      user.admin === false?setEsadmin(false):setEsadmin(true)
     
    }, []);
    
    
  function getTareas(){
    axios.get(`http://172.16.1.108:8080/api/tareas` ).then((response) =>{setTareas(response)}).catch((err) => console.log("err", err))
  }
  function deleteTareas(id){
    axios.delete(`http://172.16.1.108:8080/api/tareas?uid=${id}` ).then((response) =>{alert(response.data)}).catch((err) => console.log("err", err))
    getTareas()
  }
  function agregarTareas(data){
    axios.post(`http://172.16.1.108:8080/api/tareas`, data ).then((response) =>{console.log(response)}).catch((err) => console.log("err", err))
    getTareas()
  }
  

  function handleClick(e){
    e.preventDefault()
    const confirmDelete = window.confirm("¿Está seguro que desea eliminar esta tarea?");

    if (confirmDelete) {
    deleteTareas(e.target.value)

    getTareas()
    }}

  function handleSubmit(event){
    event.preventDefault();
    console.log(selectedOption.categoriaUid)
    console.log(value)

     let obj = {name: value,
        categoriaUid:selectedOption.categoriaUid}
    const confirmDelete = window.confirm("¿Está seguro que desea agregar esta tarea?");

    if (confirmDelete) {
    agregarTareas(obj)
    setValue('');
    getTareas()}
 }

 function handleChange(event)  {
    setValue(event.target.value);
  };
  function getCategorias(){
    axios.get(`http://172.16.1.108:8080/api/cat` ).then((response) =>{setCategoria(response)}).catch((err) => console.log("err", err))
  }

  
  
  function setSelectedCategoria(e){
    let aux = e.split(',')
    //Seteo tarea y sub a 0  
    setSelectedOption({
        categoria:aux[1],
        categoriaUid:aux[0]})
      
  }





  return (
      <div>
      <nav>{esadmin?<Administracion/>:'' } </nav>
        <h1>Agregar nueva tarea</h1>
        <div>

        <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">

<h5>Elija categoria</h5>
<Dropdown onSelect={e => setSelectedCategoria(e)}>
<Dropdown.Toggle variant="success" id="dropdown-basic">

{selectedOption.categoria?selectedOption.categoria:'Seleccionar Categoria'}
</Dropdown.Toggle>
  <Dropdown.Menu>
    {categoria.data?.map((option, index) => (
    
      
      <Dropdown.Item key={index} eventKey={[option.uid , option.name]} >{option.name}</Dropdown.Item>
      

    ))}
  </Dropdown.Menu>
</Dropdown>


        <Form.Label>Luego de elegir la categoria ingrese el nombre de la tarea</Form.Label>
        <Form.Control type="text" placeholder="Ingrese el nombre de la tarea" value={value} onChange={handleChange} />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Registrar nueva tarea
      </Button>
    </Form>
  
        </div>


<h1>Ver o eliminar tarea existentes </h1>
<Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Tarea</th>
          <th>Categoria</th>
          <th>Delete</th>
          
        </tr>
      </thead>

      <tbody>
      {tarea?.data?.length > 0?
      tarea?.data?.map((option, index) => (
        <tr>
          <td>{index + 1}</td>
          <td>{option.name}</td>
          <td>{option.categoria['name']}</td>
          <td ><button value={option.uid} onClick={handleClick}>Delete</button></td>
        
        </tr>
)): <p>No se encontraron tareas agregue una porfavor</p>}
       
      </tbody>
    </Table>

      </div>
 
    )
}