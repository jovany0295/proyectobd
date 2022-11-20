import React from 'react'
import axios from 'axios'

const useAPI = () => {

  /**
   * TODO ! Verficar la respuesta si es necesario utilizar solo response o agregar el response.json 
   */
  const getRequest = async ( URL ) => {
    try {
      let response = await axios.get( URL )
      return response
    } catch ( error ) {
      console.log( 'Error', error )
    }
  }

  // const postRequest = () => {}

  return { getRequest }

}

export default useAPI