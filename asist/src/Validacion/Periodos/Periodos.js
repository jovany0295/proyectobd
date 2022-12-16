import React, { useState } from 'react';
import '../../Validacion/Periodos/Periodos.css';
import { Formik, Form, Field, ErrorMessage, setIn } from 'formik';
import Periodos from '../../pages/Periodos';
import axios from "axios";
import * as Yup from "yup";
import {toast} from 'react-toastify';

const url = "http://127.0.0.1:8000/bd/v1/Periodo/";

const periodoSchema = Yup.object().shape({
 
  Descripcion: Yup.string()
    .required("Campo Requerido")
    .min(5, "Mínimo 5 caracteres")
    .matches(/^([a-zA-Z_0-9-]*)+\s/ ,"Sólo caracteres latinos.")
    //.matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, 'Periodo completo'),
});

const ValidacionPeriodo = (props) => {
const notify = ( msg ) => toast( msg )
//console.log(props.mod)
  //console.log(props.mod2)
  return (
  
    <>
      <Formik
        initialValues={{
         Descripcion: ''
        }}
        validationSchema={periodoSchema}
        onSubmit={async(valores )=> {
          // same shape as initial values
          console.log(valores);
          await axios.post(url,valores).then(response => {
            
          }).catch(error => {
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
           
          props.mod2({ modalInsertar:false});
        
        }}      
      >
        {({touched, errors}) => (

          <Form className="formulario">
            <div>
              <label htmlFor="descripcion">Descripcion</label>
              <Field
                type="text"
                name="Descripcion"
                placeholder="Periodo EJEMPLO: Agosoto 2019 Junio 2020"
                id="Descripcion"
              />
              {touched.Descripcion && errors.Descripcion && <div className='error'>{errors.Descripcion}</div>}
              
            </div>

            <button type="submit" >Guardar</button>
          </Form>

        )}

      </Formik>
    </>

  );


}

export default ValidacionPeriodo;