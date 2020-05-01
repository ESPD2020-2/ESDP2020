import React from 'react';
import './FormOrder.css';

class FormOrder extends React.Component {
  state = {
    formType: 'pass'
  }


  render() {
    return (
      <div className="row" style={{marginTop: '10%'}}>
        <form className='w-100'>

          <div className="form-group">
            <label htmlFor="inputAddress font-weight-bold">Адрес отправителя</label>
            <input type="text" className="form-control" id="inputAddress"
                   placeholder="Начните вводить улицу отправителя, номер дома через пробел"/>
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress2 font-weight-bold">Адрес получателя</label>
            <input type="text" className="form-control" id="inputAddress2"
                   placeholder="Начните вводить улицу отправителя, номер дома через пробел"/>
          </div>

          <div className='pt-4 pb-4'>
          <p className='font-weight-bold'>Вес груза:</p>
          <div className="form-check form-check-inline">

            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1"
                   value="option1"/>
              <label className="form-check-label" htmlFor="inlineRadio1">до 2.5кг</label>
          </div>
          <div className="form-check form-check-inline pl-5 pr-5">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2"
                   value="option2"/>
              <label className="form-check-label" htmlFor="inlineRadio2">до 5кг</label>
          </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2"
                     value="option2"/>
              <label className="form-check-label" htmlFor="inlineRadio2">до 10кг</label>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="inputEmail4" className='font-weight-bold'>Номер телефона отправителя</label>
              <input type="tel" className="form-control" id="inputEmail4" placeholder='+996(___)__-__-__'/>
              <label htmlFor="exampleFormControlTextarea1" >Дополнительная информация</label>
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>

            <div className="form-group col-md-12">
              <label htmlFor="inputEmail5" className='font-weight-bold'>Номер телефона получателя</label>
              <input type="tel" className="form-control" id="inputEmail5" placeholder='+996(___)__-__-__'/>
              <label htmlFor="exampleFormControlTextarea2" >Дополнительная информация</label>
              <textarea className="form-control" id="exampleFormControlTextarea2" rows="3"></textarea>
            </div>


          </div>

          <button type="submit" className="btn btn-primary">Оформить заказ</button>
        </form>
      </div>
  );
  }
  }

  export default FormOrder;