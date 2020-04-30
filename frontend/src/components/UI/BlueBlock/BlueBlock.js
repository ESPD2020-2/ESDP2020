import React from 'react';
import Routes from "../../../Routes";

const BlueBlock = () => {
  return (
    <>
      <div className='d-flex mt-2'>
        <i className="fas fa-phone-alt bg-white p-3 mt-3 rounded-circle" style={{color:'blue', width:'50px',height:'50px'}}/>
      <p className="p-3 text-light font-weight-bold" style={{fontSize:'18px'}}>
        +996 700 555 555 <br/>
        <span className='font-weight-normal' style={{fontSize:'14px'}}>звонок оператору</span>
      </p>
      </div>

      <Routes/>

    </>
  );
};

export default BlueBlock;