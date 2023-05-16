
import { useEffect, useState } from "react";
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown'
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
//import style from "./inicio.module.css"
import style from './inicio.module.css'
import { Administracion } from "../administracion/administracion";


export function Incio() {

const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem("user")) //UID en user
// let valueFilter = localStorage.getItem("valueFilter")
const [categoria, setCategoria] = useState([]);
const [tareas, setTareas] = useState([]);
const [subtareas, setSubtareas] = useState([])
const [text, setText] = useState('');
const [horas, setHoras] = useState('');
const [cant, setCant] = useState('');
const [esadmin, setEsadmin] = useState('');
const [selectedOption, setSelectedOption] = useState({categoria:"",
                                                      tareas:"",
                                                      subtareas:"" });
const [categoriaFinal, setCategoriaFinal] = useState([]);
const [tareasFinal, setTareasFinal] = useState([]);
const [subtareasFinal, setSubtareasFinal] = useState([])




function getCategorias(){
  axios.get(`http://172.16.1.108:8080/api/cat` ).then((response) =>{setCategoria(response)}).catch((err) => console.log("err", err))
}
function getTareas(id){
  axios.get(`http://172.16.1.108:8080/api/tareas/id?uid=${id}` ).then((response) =>{setTareas(response)}).catch((err) => console.log("err", err))
}
function getsubTareas(id){
    axios.get(`http://172.16.1.108:8080/api/sub/id?uid=${id}` ).then((response) =>{setSubtareas(response)}).catch((err) => console.log("err", err))
}
function postExcel(data){
    axios.post(`http://172.16.1.108:8080/api/excel`,data ).then((response) =>{setSubtareas(response)}).catch((err) => console.log("err", err))
}
//console.log(categoria)
//eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
    
    
    getCategorias()
}, []);

useEffect(() => {
    user?console.log(''):navigate("/login")
  }, []);

  useEffect(() => {
    user.admin === false?setEsadmin(false):setEsadmin(true)
   
  }, []);
  

//Ejecuta luego de seleccion categoria----------------------------------------------------------------------------

function setSelectedCategoria(e){
  //Seteo tarea y sub a 0  
  setSelectedOption({
    tareas: "",
    subtareas: ""
  });
    
let aux = e.split(',')
 
   setSelectedOption({
    categoria:aux[1]})
    setTareasFinal([])
    setSubtareasFinal([])
    setTareas([])
    setSubtareas([])
    setCategoriaFinal(aux[0])
    getTareas(aux[0])
    
}

//Ejecuta luego de seleccion tareas--------------------------------------------------
function setSelectedTareas(e){
    setSelectedOption({...selectedOption,
        subtareas:null})
    let aux = e.split(',')
    setSelectedOption({...selectedOption,
                        tareas:aux[1],
                        subtareas: null})
   setSubtareasFinal([])                     
   setSubtareas([])
   setTareasFinal(aux[0])
   getsubTareas(aux[0])
  console.log(subtareas)
}


//Ejecuta luego de seleccion subtareas--------------------------------------------------
function setSelectedsubTareas(e){
    let aux = e.split(',')
    setSubtareasFinal(aux[0])
    setSelectedOption({...selectedOption,
                        subtareas:aux[1]})
                        console.log(selectedOption)

 }
//ejecuta luego de boton enviar
function handleSubmit(e){
e.preventDefault() 
console.log(cant)
let excel = {
"userUid":user.user,
"tareaUid": tareasFinal,
"subTareaUid": subtareasFinal,
"categoriaUid": categoriaFinal,
"horas": horas,
"CantidadProducida": cant,
"descripcion": text
}

if(excel.userUid == '' || excel.tareaUid == ''  || excel.subTareaUid == ''  || excel.categoriaUid == ''  || excel.horas == ''  || excel.descripcion == '' ){
    alert( 'Por favor complete todos los campos antes de enviar el formulario')
}else {
    postExcel(excel)
    alert(' Formulario cargado correctamente')
    window.location.reload();

}


}



return (
    <div>
      <nav>{esadmin?<Administracion/>:'' } </nav>
      
        <p>Seleccione Categoria, Tarea y Subtarea </p>
        <div className={style.DivDrops}>
            
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
{subtareas.data?.length > 0?
<Dropdown onSelect={e => setSelectedsubTareas(e)}>
<Dropdown.Toggle variant="success" id="dropdown-basic">
{selectedOption.subtareas?selectedOption.subtareas:'Seleccionar Sub-Tareas'}
</Dropdown.Toggle>

  <Dropdown.Menu>
    {subtareas.data?.map((option, index) => (
      <Dropdown.Item key={index} eventKey={[option.uid , option.name]} >{option.name}</Dropdown.Item>
    ))}
  </Dropdown.Menu>
</Dropdown> : null
}
</div>
<div className={style.DivForm} >
<Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
    <div className={style.DivFormJr}>
    <label>Ingrese horas</label>
      <Form.Control
          type="number"
          placeholder="Horas"
          min={1}
          max={10}
          maxLength={2}
          value={horas}
          style={{ width: "100px", maxWidth: "500px" }}

          onChange={(event) => setHoras(event.target.value)  }
          />
         </div> 
         <div className={style.DivFormJr}>
         <label>Ingrese Cantidad producida</label>
         <Form.Control
          type="number"
          placeholder="Cantidad Producida"
          min={1}
          max={500}
          maxLength={3}
          value={cant}
          style={{ width: "100px", maxWidth: "500px" }}

          onChange={(event) => setCant(event.target.value)  }
          />
         </div> 
        <Form.Control
          type="text"
          style={{ height: "200px",width: "500px" }}
          placeholder="Ingrese Descripcion de la tarea"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Enviar
      </Button>
    </Form>
    </div>
</div>
)

}

