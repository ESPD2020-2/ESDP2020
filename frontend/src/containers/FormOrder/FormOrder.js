import React from 'react';

const FormOrder = () => {
  return (
    <>
      <div style={{marginTop: '40%'}}/>
      <h3 className='text-light font-weight-bolder text-uppercase ml-3'>Расчитайте стоимость доставки</h3>
      <ul className="list-group list-group-horizontal ">
        <li className="list-group-item bg-transparent border-0">
          <a href='#' className='text-light text-uppercase'>маршрут</a>
        </li>
        <li className="list-group-item bg-transparent border-0">
          <a href='#' className='text-light text-uppercase'>грузе</a>
        </li>
        <li className="list-group-item bg-transparent border-0">
          <a href='#' className='text-light text-uppercase'>контакты</a>
        </li>
      </ul>
      <form className='pt-4'>

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
    </>
  );
};

export default FormOrder;