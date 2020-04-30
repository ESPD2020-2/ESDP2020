import React from 'react';

const LocationForm = props => {
  return (
    <form className='pt-4' onSubmit={props.onSubmit}>

      <div className="form-group col-md-10">
        <label htmlFor="inputAddress">Откуда</label>
        <input type="text" className="form-control" id="inputAddress" placeholder="Откуда"/>
      </div>
      <div className="form-group col-md-10">
        <label htmlFor="inputAddress2">Куда</label>
        <input type="text" className="form-control" id="inputAddress2" placeholder="Куда"/>
      </div>

      <button type="submit" className="btn bg-warning text-light ml-3 mt-5">Следущий шаг &gt;</button>
    </form>
  );
};

export default LocationForm;