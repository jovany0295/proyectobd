import React, { useState } from 'react';
import '../../Validacion/Periodos/Periodos.css';
import { Formik, Form, Field, ErrorMessage, setIn } from 'formik';
import Periodos from '../../pages/Periodos';
import axios from "axios";
import * as Yup from "yup";

const url = "http://127.0.0.1:8000/bd/v1/Periodo/";

const periodoSchema = Yup.object().shape({
    
  
  
  Descripcion: Yup.string()
    .required("Campo Requerido")
    .min(5, "Mínimo 5 caracteres")
    //.matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi ,"Sólo caracteres latinos.")
    .matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, 'Periodo completo'),
});

const ValidacionPeriodo = () => {
  
  
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
            //Materias2.modalInsertar();
           // Materias2.peticionGet(); 
          }).catch(error => {
            console.log(error.message);
          })
        }}
        
      >

        {({touched, errors}) => (

          <Form className="formulario">
            

            <div>
              <label htmlFor="descripcion">Descripcion</label>
              <Field
                type="text"
                name="descripcion"
                placeholder="Agrega periodo EJEMPLO: Agosoto 2019 -Junio 2020"
                id="descripcion"
              />
              {touched.Descripcion && errors.Descripcion && <div className='error'>{errors.Descripcion}</div>}
              <ErrorMessage name="descripcion" component="div" />
            </div>

            <button type="submit" >Guardar</button>
          </Form>

        )}

      </Formik>


    </>

  );


}

export default ValidacionPeriodo;