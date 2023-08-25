import { useState } from "react";
import { Link } from "react-router-dom"
import clienteAxions from "../config/clienteAxios";
import Alerta from "../components/Alerta";

function OlvidePassword() {
  const [email,setEmail]=useState('');
  const [alerta, setAlerta ] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if(email=="" || email.length<6){
      setAlerta({
        msg: "El email es obligatorio",
        error:true
      });
      return;
    }

    try{

      const {data} = await clienteAxions.post(`/usuarios/olvide-password`, {
        correo: email
      });

      setAlerta({
        error:false,
        msg: data.msg
      });

      setEmail("");

    }catch(error){
      setAlerta({
        msg: error.response.data.msg,
        error:true
      });
    }
  }

  const {msg} = alerta;
  return (
    <>
    <h1 className='text-sky-600 font-black text-6xl capitalize'>
       Recupera tu acceso 
    </h1>
    { msg && <Alerta alerta={alerta}/> }
    <form className='my-10 bg-white shadow rounded-lg p-10' onSubmit={handleSubmit}>
   
      <div className='my-5'>
        <label 
          htmlFor="email" 
          className='uppercase text-gray-600 block text-xl font-bold'>
            Email
        </label>
        <input 
          type="email" 
          id='email' 
          placeholder='Email de Registro' 
          className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
          value={email}
          onChange={e => setEmail(e.target.value)}/>
      </div>
     
      <input type="submit" 
              value="Enviar instrucciones"
              className='bg-sky-700 w-full mb-5 py-3 
                            text-center text-white font-bold 
                            uppercase rounded hover:cursor-pointer 
                            hover:bg-sky-800 transition-colors' 
                           />
    </form>
    <nav className="lg:flex lg:justify-between">
      <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/">¿Ya tienes una cuenta? Inicia sesion</Link>

    </nav>
  </>
  )
}

export default OlvidePassword