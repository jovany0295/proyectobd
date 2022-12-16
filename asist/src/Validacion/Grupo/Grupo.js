import React, { useState } from 'react';
import '../../Validacion/Grupo/Grupo.css';
import { Formik, Form, Field, ErrorMessage, setIn } from 'formik';
import Grupo from '../../pages/Grupo';
import axios from "axios";
import * as Yup from "yup";

const url = "http://127.0.0.1:8000/bd/v1/Grupo/";



const grupoSchema = Yup.object().shape({
    
  nombre: Yup.number()
    .integer("Ingresa números enteros")
    .positive("Ingresa un número mayor que 0"),  
  
});

const ValidacionGrupo = () => {
  

  return (

    <>

      <Formik

        initialValues={{
          id: '',
          nombre: '',
        }}

        
        validationSchema={grupoSchema}
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

        
      >

        {({touched, errors}) => (

          <Form className="formulario">
            <div >
              <label htmlFor="nombre">Nombre</label>
              <Field
                type="text"
                name="nombre"
                placeholder="Nombre del Grupo: eje 605"
                id="nombre"
              />
            {touched.nombre && errors.nombre && <div className='error'>{errors.nombre}</div>}
             
            </div>

            

            <button type="submit"  >Guardar</button>
          </Form>

        )}

      </Formik>


    </>

  );


}

export default ValidacionGrupo;