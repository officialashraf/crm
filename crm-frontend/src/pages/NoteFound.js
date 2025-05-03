import React from 'react'

const NoteFound = () => {
  return (
    <div class="bg-light-gray" id="body">
    <div class="container d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
    <div class="d-flex flex-column justify-content-between">
      <div class="row justify-content-center mt-5">
        <div class="text-center page-404">
          <h1 class="error-title d-block">404</h1>
          
          <p class="pt-4 pb-5 error-subtitle">Looks like something went wrong.</p>
          <a href="/" class=" btn-dark py-2 px-2 rounded">Back to Home</a>
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}

export default NoteFound