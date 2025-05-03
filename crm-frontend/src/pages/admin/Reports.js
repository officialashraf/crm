import React from 'react'
import CallingReports from '../../components/adminComponant/CallingReports'
import ProductReport from '../../components/adminComponant/ProductReport'
import QuotationReport from '../../components/adminComponant/QuotationReport'

const Reports = () => {
  return (
    <>
    <>
    <div className='container'>
      <CallingReports/>
      {/* <ProductReport/> */}
      <QuotationReport/>
    </div>
    </>
    </>
  )
}

export default Reports