import React, {Component} from "react";
import Grid from '@material-ui/core/Grid';
// import {connect} from "react-redux";
// import {createCustomer} from "../../store/actions/customersActions";
import FormElement from '../UI/Form/FormElement';
import Box from '@material-ui/core/Box';
// import Button from '@material-ui/core/Button';
// import {withRouter} from 'react-router'

class ReviewForm extends Component {
  state = {
    advantages: '',
    disadvantages: '',
    comment: '',
    rating: '',
  };

  submitFormHandler = event => {
    event.preventDefault();

    const formData = new FormData();

    Object.keys(this.state).forEach(key => {
      formData.append(key, this.state[key]);
    });

    console.log(formData);

    this.props.onSubmit(formData);
  };

  inputChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <form id="reviewForm" onSubmit={this.submitFormHandler}>
        <Grid container direction='column' alignItems='center'>
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormElement
                    multiline
                    rows={6}
                    type="textarea"
                    propertyName="comment"
                    title="Комментарий"
                    size='small'
                    value={this.state.comment}
                    onChange={this.inputChangeHandler}
                    required
                  />
                </Grid>
                {/*<Grid item xs>*/}
                {/*  <Button*/}
                {/*    type="submit"*/}
                {/*    color="primary"*/}
                {/*    variant="contained"*/}
                {/*  >*/}
                {/*    Отправить отзыв*/}
                {/*  </Button>*/}
                {/*</Grid>*/}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default ReviewForm;
