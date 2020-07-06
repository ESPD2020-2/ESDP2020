import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {withRouter} from "react-router-dom";

import NotFoundImg from '../../assets/images/NotFound.svg';

class NotFound extends Component {

    goBack = () => {
      if (this.props.type === 'adm') {
          this.props.history.push('/adm');
      } else {
          this.props.history.push('/');
      }
    };

    render() {
        return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                style={{
                    width: '37%',
                    margin: '6% auto',
                }}
            >
                <Grid item xs>
                    <img src={NotFoundImg}
                         alt="Не найдено"
                         style={{
                             width: '100%',
                         }}
                    />
                </Grid>
                <Grid item xs style={{marginTop: '8%'}}>
                    <Button variant="outlined" color="primary" onClick={this.goBack}>
                        Вернуться
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(NotFound);