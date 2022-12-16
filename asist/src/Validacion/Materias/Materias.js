import React, { useState } from 'react';
import '../../Validacion/Materias/Materias.css';
import { Formik, Form, Field, ErrorMessage, setIn } from 'formik';
import Materias2 from '../../pages/Materias';
import axios from "axios";
import * as Yup from "yup";
import {toast} from 'react-toastify';

const url = "http://127.0.0.1:8000/bd/v1/Materia/";



const materiaSchema = Yup.object().shape({
    
  nombre: Yup.string()
    
    .required("Campo Requeridoo")
    .min(3, "Mínimo 3 caracteres")
    .max(35, "Máximo 25 caracteres"),
    //.matches(/^\s*([A-Za-z]+[0-9]*)\s$/gi ,"Letras , no digitos"),
    //.matches(/^\s*[A-Za-z]\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s*\s/, 'Nombre Completo'),
    
  
  descripcion: Yup.string()
    .required("Campo Requerido")
    .min(5, "Mínimo 5 caracteres")
    .max(40, "Máximo 40 caracteres"),
    //.matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi ,"Sólo caracteres latinos.")
    //.matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, 'Descripción Completa'),
});

const ValidacionMaterias = (props) => {
  const notify = ( msg ) => toast( msg )
  return (
    <>

      <Formik

        initialValues={{
          nombre: '',
          descripcion: ''
        }}

        
        validationSchema={materiaSchema}
        onSubmit={async(valores )=> {
          // same shape as initial values
          console.log(valores);
          await axios.post(url,valores).then(response => {
           
          }).catch(error => {
            //console.log(error.message);
            if( error.response === undefined ){
              notify( 'Comprueba todas las configuraciones!!' )
              alert("Favor de probar las configuraciones y Datos Error!")
             
            }
            if( error.response.status === 401 && error.response.headers['content-type'] === 'application/xml; charset=UTF-8' ){
              notify( 'usa la configuración correcta en el header' )
              alert ("Posible fallo en le configuracion de header")
             
            }
            if( error.response.status === 401 && error.response.headers['content-type'] === 'application/json' ){
             notify( error.response.data.message )
             alert("Error en servidor 401")
             }
             if( error.response.status === 401 && error.response.headers['content-type'] === 'application/xml; charset=UTF-8' ){
              notify( 'Please, use a correct authentication header' )
              alert("Error 401 posible problema de autenticación")
            }
            if( error.response.status === 500 && error.response.headers['content-type'] === 'text/html; charset=utf-8' ){
              notify("Error en los datos, posible datos repetido error 500" )
              alert("Posible Registro repetido error 500")
             }
          })
          
          props.mod({ modalInsertar:false});
         
        }} 

      >

        {({touched, errors}) => (

          <Form className="formulario">
            <div >
              <label htmlFor="nombre">Nombre</label>
              <Field
                type="text"
                name="nombre"
                placeholder="Nombre"
                id="nombre"
              />
             {touched.nombre && errors.nombre && <div className='error'>{errors.nombre}</div>}
              
            </div>

            <div >
              <label htmlFor="descripcion">Descripcion</label>
              <Field
                type="text"
                name="descripcion"
                placeholder="Agrega el nombre del titular de la materia"
                id="descripcion"
              />
              {touched.descripcion && errors.descripcion && <div className='error'>{errors.descripcion}</div>}
              
            </div>

            <button type="submit"  >Guardar</button>
          </Form>

        )}

      </Formik>


    </>

  );


}

export default ValidacionMaterias;