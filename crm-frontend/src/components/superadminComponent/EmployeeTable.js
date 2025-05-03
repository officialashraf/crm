import React from "react";

const EmployeeTable = () => {
  return (
    <>
    <div className="row mb-6">
      <div className="card">
        {/* <div className="card-header"></div> */}
        <div className="card-body">

<h3>All Employees</h3>
          <table class="table table-striped text-center">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Name</th>
                <th scope="col">Plan</th>
                <th scope="col">BILLING</th>
                <th scope="col">START DATE</th>
                <th scope="col">END DATE</th>
                <th scope="col">STATUS</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row">1</td>
                <td>Lucia</td>
                <td>Christ</td>
                <td>@Lucia</td>
                <td>12/10/2024</td>
                <td>08/02/2025</td>
                <td>
                <button type="button" class="mb-1 btn btn-pill btn-sm px-0 btn-success">Active</button>

                </td>
                <td>
                  <button className="bg-primary text-light p-2 rounded">
                    
                    View Employees
                  </button>
                </td>
              </tr>
              <tr>
                <td scope="row">2</td>
                <td>Catrin</td>
                <td>Seidl</td>
                <td>@catrin</td>
                <td>12/10/2024</td>
                <td>08/02/2025</td>
                <td>
                <button type="button" class="mb-1 btn btn-pill btn-sm px-0 btn-success">Active</button>

                </td>
                <td>
                  <button className="bg-primary text-light p-2 rounded">
                    
                    View Employees
                  </button>
                </td>
              </tr>
              <tr>
                <td scope="row">3</td>
                <td>Lilli</td>
                <td>Kirsh</td>
                <td>@lilli</td>
                <td>12/10/2024</td>
                <td>08/02/2025</td>
                <td>
                <button type="button" class="mb-1 btn btn-pill btn-sm px-0 btn-danger">Deactivate</button>

                </td>
                <td>
                  <button className="bg-primary text-light p-2 rounded">
                    
                    View Employees
                  </button>
                </td>
              </tr>
              <tr>
                <td scope="row">4</td>
                <td>Else</td>
                <td>Voigt</td>
                <td>@voigt</td>
                <td>12/10/2024</td>
                <td>08/02/2025</td>
                <td><button type="button" class="mb-1 btn btn-pill btn-sm px-0 btn-warning">Pendding</button></td>
                <td>
                  <button className="bg-primary text-light p-2 rounded">
                
                    View Employees
                  </button>
                </td>
              </tr>
              <tr>
                <td scope="row">5</td>
                <td>Ursel</td>
                <td>Harms</td>
                <td>@ursel</td>
                <td>12/10/2024</td>
                <td>08/02/2025</td>
                <td>
                    <button type="button" class="mb-1 btn btn-pill btn-sm px-0 btn-success">Active</button>
                    </td>
                 <td>
                  <button className="bg-primary text-light p-2 rounded">
            
                    View Employees
                  </button>
                </td>
              </tr>
              <tr>
                <td scope="row">6</td>
                <td>Anke</td>
                <td>Sauter</td>
                <td>@Anke</td>
                <td>12/10/2024</td>
                <td>08/02/2025</td>
                <td> 
                <button type="button" class="mb-1 btn btn-pill btn-sm px-0 btn-warning">pendding</button>
                </td>
                <td>
                  <button className="bg-primary text-light p-2 rounded">   
                    
                    View Employees
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          {/* <div class="card card-default align-items-start"> */}
  {/* <div class="card-body"> */}

    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true" class="mdi mdi-chevron-left"></span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item active">
          <a class="page-link" href="#">1</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">2</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">3</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true" class="mdi mdi-chevron-right"></span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
 
        </div>
      </div>
      </div>
    </>
  );
};

export default EmployeeTable;
