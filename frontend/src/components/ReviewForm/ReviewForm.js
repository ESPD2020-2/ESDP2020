import React, {Component} from "react";
import Grid from '@material-ui/core/Grid';
import {connect} from "react-redux";
import {createCustomer} from "../../store/actions/customersActions";
import FormElement from '../UI/Form/FormElement';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ShowTo from '../../hoc/ShowTo';
import {withRouter} from 'react-router'

class ReviewForm extends Component {
  state = {
    name: '',
    surname: '',
    patronymic: '',
    phone: '',
    email: '',
    advantages: '',
    disadvantages: '',
    comment: '',
    rating: '',
  };

  submitFormHandler = async (event) => {
    event.preventDefault();
    const reviewData = {
      advantages: this.state.advantages,
      disadvantages: this.state.disadvantages,
      comment: this.state.comment,
    };

    if (this.props.user && this.props.user.role !== 'admin') { //добавить остальные роли
      reviewData.customerId = this.props.user.customer._id;
    } else {
      await this.props.createCustomer({
        name: this.state.name,
        surname: this.state.surname,
        patronymic: this.state.patronymic,
        phone: this.state.phone,
        email: this.state.email,
      });
      reviewData.customerId = this.props.id;
    }
    this.props.create(reviewData);
  };

  inputChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  getFieldError = fieldName => {
    try {
      return this.props.customerError.errors[fieldName].message;
    } catch (error) {
      return undefined;
    }
  };

  render() {
    return (
      <form onSubmit={this.submitFormHandler}>
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
                    <Typography variant='overline' component='h5'>Контактная информация</Typography>
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
          <Grid item container xs>
            <Box p={3} style={{width: '100%'}}>
              <Grid item container spacing={2} style=
                {{
                  border: '1px solid rgba(0, 0, 0, 0.23)',
                  borderRadius: '4px',
                  padding: '8px',
                  position: 'relative'
                }}>
                <Grid item xs={12}>
                  <FormElement
                    type="text"
                    propertyName="advantages"
                    title="Достоинства"
                    size='small'
                    value={this.state.advantages}
                    onChange={this.inputChangeHandler}
                    error={this.getFieldError('advantages')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormElement
                    type="text"
                    propertyName="disadvantages"
                    title="Недостатки"
                    size='small'
                    value={this.state.disadvantages}
                    onChange={this.inputChangeHandler}
                    error={this.getFieldError('disadvantages')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormElement
                    type="textarea"
                    propertyName="comment"
                    title="Комментарий"
                    size='small'
                    value={this.state.comment}
                    onChange={this.inputChangeHandler}
                    error={this.getFieldError('comment')}
                    required
                  />
                </Grid>
                <Grid item xs>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                  >
                    Отправить отзыв
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  id: state.customers.customerId,
  customerError: state.customers.error,
});

const mapDispatchToProps = dispatch => ({
  createCustomer: customerData => dispatch(createCustomer(customerData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ReviewForm));
