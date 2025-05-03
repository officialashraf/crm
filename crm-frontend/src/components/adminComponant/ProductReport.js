import React from 'react'
import BarChartReport from './BarChartReport'
import ProductChart from '../../assets/style/admincss/ProductChart.css'

const ProductReport = () => {
  return (
    <>
    <div className='container' id='ProductChart'>
      <div className='barChart'>
        <BarChartReport/>
      </div>
      <div className='QuotationChart'>
      <div class="container">
          <div class="row">
          <div class="d-flex flex-column flex-sm-row p-2 justify-content-between">
  <div >Total Product Sales</div>
  <div >5,50,000</div>
</div>
<div class="d-flex flex-column flex-sm-row p-2 justify-content-between">
  <div >Product A</div>
  <div >2,50,000</div>
</div>
<div class="d-flex flex-column flex-sm-row p-2 justify-content-between">
  <div >Product B</div>
  <div >2,50,000</div>
</div>
<div class="d-flex flex-column flex-sm-row p-2 justify-content-between">
  <div >Product C</div>
  <div >2,50,000</div>
</div>
<div class="d-flex flex-column flex-sm-row p-2 justify-content-between">
  <div >Product D</div>
  <div >2,50,000</div>
</div>

      </div>
      </div>
      </div>

    </div>
    
    </>
  )
}

export default ProductReport