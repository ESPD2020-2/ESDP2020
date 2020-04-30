import React from 'react';
import LocationForm from "../../components/UI/OrderFormCategory/LocationForm";
import GruzForm from "../../components/UI/OrderFormCategory/GruzForm";
import ClientForm from "../../components/UI/OrderFormCategory/ClientForm";
import './FormOrder.css';

class FormOrder extends React.Component {
  state ={
    formType: 'pass'
  }

  formTypeChangeHandler = event => {
    this.setState({
      formType: event.target.name
    })
  }

  onSubmitHandler = event => {
    event.preventDefault();
    const types = ['pass', 'weight', 'clientData'];
    for (let i = 0; i < types.length; i++) {
      if (this.state.formType === types[i]) {
        this.setState({formType: types[i + 1]})
      }
    }
  }


  activeChangeHandler = event => {
    if (event.target.name === this.state.formType) {
      return "active"
    } else return ''
  }
  render() {
    let form;

    if (this.state.formType === 'pass') {
      form = <LocationForm onSubmit={this.onSubmitHandler}/>
    } else if (this.state.formType === 'weight') {
      form = <GruzForm onSubmit={this.onSubmitHandler}/>
    } else if (this.state.formType === 'clientData') {
      form = <ClientForm/>
    }
    return (
      <>
        <div style={{marginTop: '30%'}}/>
        <h3 className='text-light font-weight-bolder text-uppercase ml-3'>Расчитайте стоимость доставки</h3>
        <ul className="list-group list-group-horizontal ">
          <li className="list-group-item bg-transparent border-0">
            <a onClick={this.formTypeChangeHandler} name='pass' href='#' className='text-light text-uppercase' >маршрут</a>
          </li>
          <li className="list-group-item bg-transparent border-0">
            <a onClick={this.formTypeChangeHandler} name='weight' href='#' className='text-light text-uppercase'>грузе</a>
          </li>
          <li className="list-group-item bg-transparent border-0">
            <a onClick={this.formTypeChangeHandler} name='clientData' href='#' className='text-light text-uppercase'>контакты</a>
          </li>
        </ul>
        {form}
      </>
    );
  }
}

export default FormOrder;