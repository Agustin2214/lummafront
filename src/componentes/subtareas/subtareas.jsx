import { Link, useNavigate } from 'react-router-dom'
import style from './subtareas.module.css'
import { InputGroup,Form, FormControl, Button, Dropdown} from 'react-bootstrap'
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { useEffect, useState } from "react";
import { Administracion } from '../administracion/administracion';

export function Subtareas() {
  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate();
  const [subtarea, setsubTareas] = useState([]);
  const [value, setValue] = useState('');
  const [categoria, setCategoria] = useState([]);
  const [esadmin, setEsadmin] = useState('');
  const [selectedOption, setSelectedOption] = useState({categoria:"",
                                                        categoriaUid:"",
                                                        tareasUid:"",
                                                      subtareas:"",
                                                      subtareas:"" });
  const [tareas, setTareas] = useState([]);


  useEffect(() => {
    user.admin === false?navigate("/inicio"):console.log('ok')
    getCategorias()
    getSubtareas()
 
  }, []);
 

 useEffect(() => {
    user.admin === false?setEsadmin(false):setEsadmin(true)
   
  }, []);



  function getSubtareas(){
    axios.get(`http://172.16.1.108:8080/api/sub` ).then((response) =>{setsubTareas(response)}).catch((err) => console.log("err", err))
  }
  function deletesubTareas(id){
    axios.delete(`http://172.16.1.108:8080/api/sub?uid=${id}` ).then((response) =>{alert(response.data)}).catch((err) => console.log("err", err))
    getSubtareas()
  }
  function agregarSubTareas(data){
    axios.post(`http://172.16.1.108:8080/api/sub`, data ).then((response) =>{console.log(response)}).catch((err) => console.log("err", err))
    getSubtareas()
  }

  function getCategorias(){
    axios.get(`http://172.16.1.108:8080/api/cat` ).then((response) =>{setCategoria(response)}).catch((err) => console.log("err", err))
  }

  function getTareas(id){
    axios.get(`http://172.16.1.108:8080/api/tareas/id?uid=${id}` ).then((response) =>{setTareas(response)}).catch((err) => console.log("err", err))
  }

  

  function handleClick(e){
    e.preventDefault()
    const confirmDelete = window.confirm("¿Está seguro que desea eliminar esta subtarea?");

    if (confirmDelete) {
      deletesubTareas(e.target.value)

    getSubtareas()
    }}



  function setSelectedCategoria(e){
    let aux = e.split(',')
    //Seteo subtarea y sub a 0  
    setSelectedOption({
        categoria:aux[1],
        categoriaUid:aux[0]})
        console.log(tareas,aux[0])
    getTareas(aux[0])
      
  }

  function setSelectedTareas(e){
    setSelectedOption({...selectedOption,
        subtareas:null})
    let aux = e.split(',')
    setSelectedOption({...selectedOption,
                        tareas:aux[1],
                        tareasUid:aux[0],
                        subtareas: null})


}



function handleSubmit(event){
    event.preventDefault();
   

     let obj = {name: value,
                categoriaUid:selectedOption.categoriaUid,
                tareaUid:selectedOption.tareasUid
                }
    const confirmDelete = window.confirm("¿Está seguro que desea agregar esta subtarea?");

    if (confirmDelete) {
    agregarSubTareas(obj)
    setValue('');
    getSubtareas()}
 }

 function handleChange(event)  {
    setValue(event.target.value);
  };


    return (
      <div>
  <nav>{esadmin?<Administracion/>:'' } </nav>
        <h1>Agregar nueva subtarea</h1>
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


{tareas.data?.length > 0?
<Dropdown onSelect={e => setSelectedTareas(e)}>
<Dropdown.Toggle variant="success" id="dropdown-basic">
{selectedOption.tareas?selectedOption.tareas:'Seleccionar Tareas'}
</Dropdown.Toggle>

  <Dropdown.Menu>
    {tareas.data?.map((option, index) => (
      <Dropdown.Item key={index} eventKey={[option.uid , option.name]} >{option.name}</Dropdown.Item>
    ))}
  </Dropdown.Menu>
</Dropdown> : null
}

        <Form.Label>Luego de elegir la categoria ingrese el nombre de la subtarea</Form.Label>
        <Form.Control type="text" placeholder="Ingrese el nombre de la subtarea" value={value} onChange={handleChange} />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Registrar nueva subtarea
      </Button>
    </Form>
  
        </div>


<h1>Ver o eliminar subtarea existentes </h1>
<Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Subtarea</th>
          <th>tarea</th>
          <th>categoria</th>
          <th>Delete</th>
          
        </tr>
      </thead>

      <tbody>
      {subtarea?.data?.length > 0?
      subtarea?.data?.map((option, index) => (
        <tr>
          <td>{index + 1}</td>
          <td>{option.name}</td>
          <td>{option.tarea['name']}</td>
          <td>{option.tarea['categoria']['name']}</td>
          <td ><button value={option.uid} onClick={handleClick}>Delete</button></td>
        
        </tr>
)): <p>No se encontraron subtareas agregue una porfavor</p>}
       
      </tbody>
    </Table>

      </div>
 
    )
}