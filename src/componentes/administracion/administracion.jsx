import { Link, useNavigate } from 'react-router-dom'
import style from './administracion.module.css'
import { Button } from 'react-bootstrap'

import { useEffect } from 'react'

export function Administracion() {
  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate();

  useEffect(() => {
    user.admin === false?navigate("/inicio"):console.log('ok')
    console.log(user)
  }, []);

    return (
      
 
        <nav className={style.Nav}> 
        <Link to= '/usuarios' >  <p className={style.link}> Administrar usuarios </p>  </Link>
        <Link to= '/categorias'> <p className={style.link}> Administrar categorias </p>  </Link>
        <Link to= '/tareas' >    <p className={style.link}> Administrar tareas</p>  </Link>
        <Link to= '/subtareas' > <p className={style.link}> Administrar subtareas</p>  </Link>
       
        </nav>
    )
}

//equipo y preelaborado