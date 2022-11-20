import React, { useState, useEffect } from 'react'
import useAPI from '../useAPI'

const apiRequests = () => {
  const { getRequest } = useAPI()
  const [groups, setGroups] = useState([])

  /**
   * TODO: Hacer cambios para realizar accion si la respuesta devuelve un error ej. 400, 404, 403, etc
   */
  const loadGroups = async () => {
    let response = await getRequest('http://localhost:8080/grupos')
    if ( response.status === 200 )
      setGroups( response.data )
  }

  useEffect( () => {
    loadGroups()
  }, [] )

  return {
    groups
  }
}

export default apiRequests