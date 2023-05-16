import { Link, useNavigate } from 'react-router-dom'
import style from './home.module.css'
import img from '../../media/LUMMA.jpg'
import { Button } from 'react-bootstrap'

import { useEffect } from 'react'

export function Home() {
  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate();


useEffect(() => {
  user?navigate("/inicio"):console.log('ok')
}, []);


    return (
      
     <div className={style.app}>
           <img className={style.img}  src={img} alt="asd" />
            
            <p className={style.txt}></p>
<div className={style.btn}>
            
<Link to= 'Login'> <Button variant="primary" size="lg">Login</Button>{' '}</Link>

          </div>
        </div>
        
    )
}