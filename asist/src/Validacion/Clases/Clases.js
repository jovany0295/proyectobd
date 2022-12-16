import React, { useState } from 'react';
import '../../Validacion/Clases/Clases.css';
import { Formik, Form, Field, ErrorMessage, setIn } from 'formik';
import Clases from '../../pages/Clases';
import axios from "axios";
import * as Yup from "yup";
import {toast} from 'react-toastify';

const url = "http://127.0.0.1:8000/bd/v1/Clase/";

const clasesSchema = Yup.object().shape({
 
  nombre: Yup.string()
    
    .required("Campo Requeridoo")
    .min(3, "Mínimo 3 caracteres")
    .max(35, "Máximo 25 caracteres"),

  horario: Yup.string()
    .required("Campo Requerido")
    .min(5, "Mínimo 5 caracteres")
    //.matches(/^\s*([0-9--:]*)+\s/,"Sólo números guión y :"),
    
});

const ValidacionPeriodo = (props) => {
const notify = ( msg ) => toast( msg )
const maestrostate = props.maestrostate;
//console.log(props.mod)
  //console.log(props.mod2)
  return (
  
    <>
      <Formik
        initialValues={{
         nombre: '',
         horario: '',
         idCarrera: '',
         idMaestro: '',
         idPeriodo: '',
         idGrupo: '',
         idMateria: '',

        }}
        validationSchema={clasesSchema}
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
              <label htmlFor="nombre">Nombre</label>
              <Field
                type="text"
                name="nombre"
                placeholder="Agrega el nombre de la clase"
                id="nombre"
              />
              {touched.nombre && errors.nombre && <div className='error'>{errors.nombre}</div>}
              
            </div>
            <div>
              <label htmlFor="nombre">Horario</label>
              <Field
                type="text"
                name="horario"
                placeholder="Agrega el Horario de la clase"
                id="horario"
              />
              {touched.horario && errors.horario && <div className='error'>{errors.horario}</div>}
            </div>
            <div>
              <label htmlFor="nombre">Carrera</label>
              <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                    name="idCarrera" id="idCarrea" >
                    {
                    props.carrerastate.map(Carrera => (
                    <option key={Carrera.id} value={Carrera.id}>{Carrera.nombre}</option>))
                    }
                  </select>
              {touched.idCarrera && errors.idCarrera && <div className='error'>{errors.idCarrera}</div>}
            </div>

            <div>
              <label htmlFor="nombre">Maestro</label>
              <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                    name="idMaestro" id="idMaestro" >
                    {
                    props.maestrostate.map(mai => (
                    <option key={mai.id} value={mai.id}>{mai.nombre}</option>))
                    }
                  </select>
              {touched.idMaestro && errors.idMaestro && <div className='error'>{errors.idMaestro}</div>}
            </div>

            <div>
              <label htmlFor="nombre">Periodo</label>
              <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                    name="idPeriodo" id="idPeriodo" >
                    {
                    props.periodostate.map(per => (
                    <option key={per.id} value={per.id}>{per.Descripcion}</option>))
                    }
                  </select>
              {touched.idPeriodo && errors.idPeriodo && <div className='error'>{errors.idPeriodo}</div>}
            </div>
              
            <div>
              <label htmlFor="nombre">Materia</label>
              <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                    name="idMateria" id="idMateria" >
                    {
                    props.materiastate.map(per => (
                    <option key={per.id} value={per.id}>{per.nombre}</option>))
                    }
                  </select>
              {touched.idMateria && errors.idMateria && <div className='error'>{errors.idMateria}</div>}
            </div>
            <button type="submit" >Guardar</button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ValidacionPeriodo;