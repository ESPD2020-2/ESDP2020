import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import {createCustomer, editCustomer} from "../../store/actions/customersActions";
import {getOrder} from '../../store/actions/ordersActions';
import AddressFormElement from "../AddressFormElement/AddressFormElement";
import FormElement from '../UI/Form/FormElement';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ShowTo from '../../hoc/ShowTo';
import { withRouter } from 'react-router'

class OrderForm extends Component {
  state = {
    name: '',
    surname: '',
    patronymic: '',
    phone: '',
    email: '',
    pickupStreet: null,
    pickupApartment: "",
    deliveryStreet: null,
    deliveryApartment: "",
    pickupAddress: [],
    deliveryAddress: [],
    paymentAmount: 50,
    pickupError: null,
    deliveryError: null,
  };

  componentDidMount() {
    if (this.props.history.location.pathname !== '/add-order'){
      this.props.getOrder(this.props.match.params.id);
    } 
  }

  componentDidUpdate(prevProps) {
    if(this.props.order !== prevProps.order) {
      const customer = {};
      const order = this.props.order;
      Object.keys(this.props.order.customer).map(el => customer[el] = this.props.order.customer[el]);
      this.setState({...customer, pickupAddress: order.pickupAddress, deliveryAddress: order.deliveryAddress});
      }
  }

  submitFormHandler = async (event) => {
    event.preventDefault();
    const orderData = {
      pickupAddress: this.state.pickupAddress,
      deliveryAddress: this.state.deliveryAddress,
      paymentAmount: this.state.paymentAmount,
    }
    if (this.props.user && this.props.user.role !== 'admin') {
     orderData.customerId = this.props.user.customer._id
    } else {
     await this.props.createCustomer({
        name: this.state.name,
        surname: this.state.surname,
        patronymic: this.state.patronymic,
        phone: this.state.phone,
        email: this.state.email,
      });
      orderData.customerId = this.props.id
    }
    if (orderData.pickupAddress.length < 1 && orderData.deliveryAddress.length < 1 ) {
      this.setState({ pickupError: "Необходимо заполнить", deliveryError: "Необходимо заполнить"  });
    } else if (orderData.pickupAddress.length < 1) {
      this.setState({ pickupError: "Необходимо заполнить"})
    } else if (orderData.deliveryAddress.length < 1) {
      this.setState({ deliveryError: "Необходимо заполнить"})
    } else {
      this.props.create(orderData);
    }
  };

  editFormHandler = async (event) => {
    event.preventDefault();
    const orderData = {
      pickupAddress: this.state.pickupAddress,
      deliveryAddress: this.state.deliveryAddress,
    };
    const customerData = {
      name: this.state.name,
      surname: this.state.surname,
      patronymic: this.state.patronymic,
      phone: this.state.phone,
      email: this.state.email,
    };

   await this.props.editCustomer(this.props.order.customer._id, customerData);
    
    if (orderData.pickupAddress.length < 1 && orderData.deliveryAddress.length < 1 ) {
      this.setState({ pickupError: "Необходимо заполнить", deliveryError: "Необходимо заполнить"  });
    } else if (orderData.pickupAddress.length < 1) {
      this.setState({ pickupError: "Необходимо заполнить"})
    } else if (orderData.deliveryAddress.length < 1) {
      this.setState({ deliveryError: "Необходимо заполнить"})
    } else {
      this.props.edit(this.props.order._id, orderData);
    }
  }

  addressChangeHandler = (e, val, kind) => {
    if (kind === 'pickup') {
      this.setState({pickupStreet: val, pickupError: null})
    } else {
      this.setState({deliveryStreet: val, deliveryError: null})
    }
  };

  inputChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      pickupError: null,
      deliveryError: null
    });
  };

  removeAdressHandler = (index, kind) => {
    if (kind === 'pickup') {
      const pickupAddress = [...this.state.pickupAddress];
      pickupAddress.splice(index, 1);
      this.setState({ pickupAddress, paymentAmount: this.state.paymentAmount - 50 });
    } else {
      const deliveryAddress = [...this.state.deliveryAddress];
      deliveryAddress.splice(index, 1);
      this.setState({ deliveryAddress, paymentAmount: this.state.paymentAmount - 50 });
    }
  };
  
  addPickupAddressHandler = () => {
    if (!this.state.pickupStreet === "") {
      this.setState({ pickupError: "Необходимо заполнить" });
    } 
    else {
      this.setState({
        pickupAddress: [...this.state.pickupAddress, {
          street: this.state.pickupStreet,
          apartment: this.state.pickupApartment
        }],
        paymentAmount: this.state.paymentAmount + 50,
        pickupStreet: null,
        pickupApartment: '',
      });
    }
  };

  addDeliveryAddressHandler = () => {
    if (!this.state.deliveryStreet === "") {
      this.setState({ deliveryError: "Необходимо заполнить" });
    } 
    else {

      this.setState({
        deliveryAddress: [...this.state.deliveryAddress, {
          street: this.state.deliveryStreet,
          apartment: this.state.deliveryApartment
        }],
        paymentAmount: this.state.paymentAmount + 50,
        deliveryStreet: null,
        deliveryApartment: ''
      });
    }
  };

  getFieldError = fieldName => {
    try {
      return this.props.customerError.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  };
    
  render() {
    const path = this.props.history.location.pathname;
    return (
     <form onSubmit={this.submitFormHandler} >
        <Grid container direction='column' alignItems='center'>
          <ShowTo user={this.props.user} role='admin'>
            <Grid item container xs>
              <Box p={3} style={{width: '100%'}}>
                <Grid item container spacing={2} style=
                {{
                  border: '1px solid rgba(0, 0, 0, 0.23)',
                  borderRadius: '4px',
                  padding: '8px',
                  position: 'relative'
                }}>
                  <Box 
                    style={{
                      position: 'absolute',
                      top: '-17px',
                      left: '8%',
                      backgroundColor: '#fff',
                    }}
                    px={1}
                  >
                    <Typography variant='overline' component='h5'>Информация о заказчике</Typography>
                  </Box>
                  <Grid item xs={12} sm={4}>
                    <FormElement
                      type="text"
                      size='small'
                      propertyName='surname'
                      title="Фамилия"
                      onChange={this.inputChangeHandler}
                      error={this.getFieldError('surname')}
                      value={this.state.surname}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormElement
                      type="text"
                      size='small'
                      propertyName='name'
                      title="Имя"
                      onChange={this.inputChangeHandler}
                      error={this.getFieldError('name')}
                      value={this.state.name}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormElement
                      type="text"
                      size='small'
                      propertyName='patronymic'
                      title="Отчество"
                      onChange={this.inputChangeHandler}
                      error={this.getFieldError('patronymic')}
                      value={this.state.patronymic}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormElement
                      propertyName="phone"
                      title="Телефон"
                      type="tel"
                      size='small'
                      value={this.state.phone}
                      onChange={this.inputChangeHandler}
                      error={this.getFieldError('phone')}
                      placeholder='Например 0312 55-55-55'
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormElement
                      propertyName="email"
                      title="Электронная почта"
                      type='email'
                      size='small'
                      value={this.state.email}
                      onChange={this.inputChangeHandler}
                      error={this.getFieldError('email')}
                      required
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </ShowTo>
          <AddressFormElement
            addressChange={this.addressChangeHandler}
            inputChangeHandler={this.inputChangeHandler}
            addAddress={this.addPickupAddressHandler}
            removeAdress={this.removeAdressHandler}
            address={this.state.pickupAddress}
            street={this.state.pickupStreet}
            apartment={this.state.pickupApartment}
            error={this.state.pickupError}
            kind='pickup'
          />
          <AddressFormElement
            addressChange={this.addressChangeHandler}
            inputChangeHandler={this.inputChangeHandler}
            addAddress={this.addDeliveryAddressHandler}
            removeAdress={this.removeAdressHandler}
            address={this.state.deliveryAddress}
            street={this.state.deliveryStreet}
            apartment={this.state.deliveryApartment}
            error={this.state.deliveryError}
            kind='delivery'
          />
          <Grid item xs>
           <Button
              onClick={path === '/add-order' ? this.submitFormHandler : this.editFormHandler}
              color="primary"
              variant="contained"
            >
              {path === '/add-order' ? 'Создать' : 'Редактировать'}
            </Button>

            {path !== '/add-order' && (
              <Button
                onClick={() => this.props.history.goBack()}
                color="secondary"
                variant="contained"
                id="sendOrder"
                style={{marginLeft: '15px'}}
              >
                Отмена
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    );
  }
};

const mapStateToProps = state => ({
  id: state.customers.customerId,
  customerError: state.customers.error,
  order: state.ord.order,
});

const mapDispatchToProps = dispatch => ({
  createCustomer: customerData => dispatch(createCustomer(customerData)),
  editCustomer: (id, data) => dispatch(editCustomer(id, data)),
  getOrder: id => dispatch(getOrder(id)),
});

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(OrderForm));
       