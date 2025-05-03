import React from 'react'

const SalesYear = () => {
  return (
    <>
   <div class="row">
{/* <!-- Frist box --> */}
  <div class="col-xl-3 col-md-6">
    <div class="card card-default shadow-sm rounded">
      <div class="d-flex p-5 justify-content-between">
        <div class="icon-md bg-secondary rounded mr-3">
          <i class="mdi mdi-account-group"></i>
        </div>
        <div class="text-right">
          <span class="h2 d-block">890</span>
          <p>Vendors</p>
        </div>
      </div>
    </div>
  </div>


  <div class="col-xl-3 col-md-6">
    <div class="card card-default shadow-sm rounded">
      <div class="d-flex p-5 justify-content-between">
        <div class="icon-md bg-success rounded mr-3">
          <i class="mdi mdi-account-check"></i>
        </div>
        <div class="text-right">
          <span class="h2 d-block">350</span>
          <p>Employees</p>
        </div>
      </div>
    </div>
  </div>

  
  <div class="col-xl-3 col-md-6">
    <div class="card card-default shadow-sm rounded">
      <div class="d-flex p-5 justify-content-between">
        <div class="icon-md bg-primary rounded mr-3">
          <i class="mdi mdi-baby-buggy"></i>
        </div>
        <div class="text-right">
          <span class="h2 d-block">1360</span>
          <p>Active</p>
        </div>
      </div>
    </div>
  </div>


  <div class="col-xl-3 col-md-6">
    <div class="card card-default shadow-sm rounded">
      <div class="d-flex p-5 justify-content-between">
        <div class="icon-md bg-info rounded mr-3">
          <i class="mdi mdi-check-circle-outline"></i>
        </div>
        <div class="text-right">
          <span class="h2 d-block">398</span>
          <p>Approvals</p>
        </div>
      </div>
    </div>
  </div>

</div>
    

    </>
  )
}

export default SalesYear