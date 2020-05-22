import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import FormElement from "../UI/Form/FormElement";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import ShowTo from "../../hoc/ShowTo";

class ReviewForm extends Component {
  state = {
    advantages: "",
    disadvantages: "",
    comment: "",
  };

  submitFormHandler = event => {
    event.preventDefault();

    const formData = new FormData();

    Object.keys(this.state).forEach(key => {
      formData.append(key, this.state[key]);
    });

    this.props.onSubmit(formData);
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitFormHandler}>
          <Grid container direction="column" alignItems='center'>
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
                        autoComplete="new-phone"
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
                        autoComplete="new-email"
                        required
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </ShowTo>
            <Grid item xs>
              <Typography variant='overline' component='h5'>Ваш отзыв</Typography>
            </Grid>
            <Grid item xs>
              <Box component="fieldset" mb={3} borderColor="transparent">
                <Rating name="pristine" value={null} />
              </Box>
            </Grid>
            <Grid item xs>
              <FormElement
                type="text"
                propertyName="advantages"
                title="Достоинства"
                placeholder="Что вам понравилось"
                onChange={this.inputChangeHandler}
                value={this.state.advantages}
              />
              <Grid item xs>
                <FormElement
                  type="text"
                  propertyName="disadvantages"
                  title="Недостатки"
                  placeholder="Что разочаровало"
                  onChange={this.inputChangeHandler}
                  value={this.state.disadvantages}
                />
              </Grid>
              <Grid item xs>
                <FormElement
                  type="textarea"
                  propertyName="comment"
                  title="Комментарий"
                  placeholder="Другие впечатления"
                  onChange={this.inputChangeHandler}
                  value={this.state.comment}
                />
              </Grid>
              <Grid item xs>
                <Button
                  onClick={this.submitFormHandler}
                  color="primary"
                  variant="contained"
                >
                  Оставить отзыв
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
  );
  }
}

export default ReviewForm;