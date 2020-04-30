import React from 'react';

const ClientForm = () => {
  return (
    <form className='pt-4'>

      <div className="form-group col-md-10">
        <label htmlFor="inputAddress">Номер тел</label>
        <input type="text" className="form-control" id="inputAddress" placeholder="Номер тел"/>
      </div>
      <div className="form-group col-md-10">
        <label htmlFor="inputAddress2">Имя получателя</label>
        <input type="text" className="form-control" id="inputAddress2" placeholder="Имя получателя"/>
      </div>

      <button type="submit" className="btn bg-warning text-light ml-3 mt-5">Отправить</button>
    </form>
  );
};

export default ClientForm;