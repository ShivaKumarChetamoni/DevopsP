import React from 'react'
import {useRouteError} from 'react-router-dom'

function ErrorPage() {
    let routingError=useRouteError()
    // console.log(routingError)
  return (
    <div>
      <h1>{routingError.status}-{routingError.data}</h1>
    </div>
  )
}

export default ErrorPage
