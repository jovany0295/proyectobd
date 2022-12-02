import React, { useState } from 'react';
import '../../Validacion/Materias/Materias.css';
import { Formik, Form, Field, ErrorMessage, setIn } from 'formik';
import Materias2 from '../../pages/Materias';
import axios from "axios";
import * as Yup from "yup";

const url = "http://127.0.0.1:8000/bd/v1/Materia/";



const materiaSchema = Yup.object().shape({
    
  nombre: Yup.string()
    
    .required("Campo Requeridoo")
    .min(3, "Mínimo 3 caracteres")
    .max(25, "Máximo 25 caracteres"),
    //.matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi ,"Sólo caracteres latinos.")
    //.matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, 'Nombre Completo'),
    
  
  descripcion: Yup.string()
    .required("Campo Requerido")
    .min(5, "Mínimo 5 caracteres")
    //.matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi ,"Sólo caracteres latinos.")
    .matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, 'Descripción Completa'),
});

const ValidacionMaterias = () => {
  

  return (

    <>

      <Formik

        initialValues={{
          nombre: '',
          descripcion: ''
        }}

        /*validate={(valores)=>{

          let errores = {};

          if(!valores.nombre){
            errores.nombre = 'Campo de nombre requerido'
          }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)){
            errores.nombre = 'El nombre solo puede contener letras y espacios'
          }
          
          if(!valores.descripcion){
            errores.descripcion = 'Campo de correo requerido'
          }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.descripcion)){
            errores.descripcion = 'formato de correo invalido'
          }

          return errores;

        }}*/
        validationSchema={materiaSchema}
        onSubmit={async(valores )=> {
          // same shape as initial values
          console.log(valores);
          await axios.post(url,valores).then(response => {
            //handleClose();
            //Materias2.modalInsertar.setState({ modalInsertar: !this.state.modalInsertar });
              
          }).catch(error => {
            console.log(error.message);
          })
        }}
        /*onSubmit={async(valores,error)  => {
          console.log(valores);

          await axios.post(url,valores).then(response => {
            this.modalInsertar();
            this.peticionGet();
          }).catch(error => {
            console.log(error.message);
          })
        
        }}*/
      >

        {({touched, errors}) => (

          <Form className="formulario">
            <div>
              <label htmlFor="nombre">Nombre</label>
              <Field
                type="text"
                name="nombre"
                placeholder="Nombre"
                id="nombre"
              />
              {touched.nombre && errors.nombre && <div className='error'>{errors.nombre}</div>}
              <ErrorMessage name="nombre" component="div" />
            </div>

            <div>
              <label htmlFor="descripcion">Descripcion</label>
              <Field
                type="text"
                name="descripcion"
                placeholder="Agrega el nombre del titular de la materia"
                id="descripcion"
              />
              {touched.descripcion && errors.descripcion && <div className='error'>{errors.descripcion}</div>}
              <ErrorMessage name="nombre" component="div" />
            </div>

            <button type="submit"  >Guardar</button>
          </Form>

        )}

      </Formik>


    </>

  );


}

export default ValidacionMaterias;