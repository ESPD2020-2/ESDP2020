import React from 'react';

const GruzForm = props => {
  return (
    <form className='pt-4' onSubmit={props.onSubmit}>

      <div className="form-group col-md-10">
        <label htmlFor="inputAddress">Вес</label>
        <input type="text" className="form-control" id="inputAddress" placeholder="Вес"/>
      </div>
      <div className="form-group col-md-10">
        <label htmlFor="inputAddress2">Размер</label>
        <input type="text" className="form-control" id="inputAddress2" placeholder="Размер"/>
      </div>

      <button type="submit" className="btn bg-warning text-light ml-3 mt-5">Следущий шаг &gt;</button>
    </form>
  );
};

export default GruzForm;