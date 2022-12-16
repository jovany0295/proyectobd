import React from 'react'
import Text from '../../../../components/Text'
import classes from './Greetings.module.css'
import { Grid, Container, Typography } from '@mui/material';

const Greetings = () => {
  
  
  return(
    <>
   
   <Typography variant="h5" sx={{ mb: 1 , marginLeft:10}}>
        
        </Typography>
        <div class="d-flex d-flex justify-content-center">
          <div class="welcome">
              <div class="content rounded-3 p-3">
                <h1 class="fs-3">Bienvenido a AlfaMaravilla</h1>
                <p class="mb-0">Hola Equipo, alfa buena maravilla onda dinamita escuadron lobo !</p>
              </div>
          </div>          
        </div>
    <section class="statistics mt-4">
      <div class="row">
        <div class="col-lg-4">
          <div class="box d-flex rounded-2 align-items-center mb-4 mb-lg-0 p-3">
            <i class="uil-envelope-shield fs-2 text-center bg-primary rounded-circle"></i>
            <div class="ms-3">
              <div class="d-flex align-items-center">
                <h3 class="mb-0">1,245</h3> <span class="d-block ms-2">Emails</span>
              </div>
              <p class="fs-normal mb-0">Lorem ipsum dolor sit amet</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="box d-flex rounded-2 align-items-center mb-4 mb-lg-0 p-3">
            <i class="uil-file fs-2 text-center bg-danger rounded-circle"></i>
            <div class="ms-3">
              <div class="d-flex align-items-center">
                <h3 class="mb-0">34</h3> <span class="d-block ms-2">Projects</span>
              </div>
              <p class="fs-normal mb-0">Lorem ipsum dolor sit amet</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="box d-flex rounded-2 align-items-center p-3">
            <i class="uil-users-alt fs-2 text-center bg-success rounded-circle"></i>
            <div class="ms-3">
              <div class="d-flex align-items-center">
                <h3 class="mb-0">5,245</h3> <span class="d-block ms-2">Users</span>
              </div>
              <p class="fs-normal mb-0">Lorem ipsum dolor sit amet</p>
            </div>
          </div>
        </div>
      </div>
    </section>

       
    </>

  )
}

export default Greetings