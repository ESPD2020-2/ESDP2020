import React from 'react';
import {NavLink} from "react-router-dom";
import pic from "../../assets/img/Group.svg";

const MainPage = () => {
  return (
    <div className="row" style={{marginTop: '20%'}}>
      <div className="col-4">
        <h1>Доставка грузов по Бишкеку</h1>
        <p className='pt-3 pb-3'>Курьерская доставка посылок частным лицам, прежде всего, подразумевает, что объект будет доставлен в
          неповрежденном виде точно в срок.</p>
        <NavLink to='/cargoform' className="btn btn-primary" type="submit">Подробнее</NavLink>
      </div>

      <div className="col-8">
        <div >
          <img src={pic} alt="pic1" style={{width:'100%'}}/>
        </div>
      </div>
    </div>
  );
};

export default MainPage;