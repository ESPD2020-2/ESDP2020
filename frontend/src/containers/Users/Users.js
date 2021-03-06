import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {getUsers, deleteUser} from '../../store/actions/usersActions';
import {tableIcons} from './TableIcons';
import axiosApi from "../../axiosApi";
import FormElement from '../../components/UI/Form/FormElement';
import { localization } from '../../constants';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Users = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const role = useSelector(state => state.users.user.role);
  const data = useSelector(state => state.users.users);
  const loading = useSelector(state => state.users.getUsersLoading)
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(getUsers())
  },[dispatch]);

  const getFieldError = fieldName => {
    try {
      return error.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  };

  const addUserHandler = (newData) => {
    const data = {};
    Object.keys(newData).forEach(key => {
      data[key] = newData[key];
    });
    return new Promise((resolve, reject) => {
      axiosApi.post('/users', data)
      .then(() => {
        resolve()
        dispatch(getUsers())
      })
      .catch(error => reject(setError(error.response&&error.response.data)))
    })
  };

  const editUserHandler = (newData) => {
    const data = {};
    Object.keys(newData).forEach(key => {
      data[key] = newData[key];
    });
    return new Promise((resolve, reject) => {
      axiosApi.patch(`/users/${newData._id}`, data)
      .then(() => {
        resolve()
        dispatch(getUsers())
      })
      .catch(error => reject(setError(error.response&&error.response.data)))
    })
  };

  const columns = [
    { title: 'Логин', field: 'username',
    editComponent: props => (
      <FormElement
        type="text"
        propertyName="username"
        value={props.value ? props.value : '' }
        placeholder="Введите логин"
        size="small"
        variant='standard'
        onChange={e => props.onChange(e.target.value)}
        error={getFieldError('username')}
      />
    )},
    { title: 'Пароль', field: 'password', emptyValue: '*******', 
    editComponent: props => (
      <FormElement
        type="password"
        propertyName="password"
        placeholder="Введите пароль"
        size="small"
        variant='standard'
        onChange={e => props.onChange(e.target.value)}
        error={getFieldError('password')}
      /> 
    )},
    { title: 'Имя', field: 'displayName', 
    editComponent: props => (
      <FormElement
        type="text"
        propertyName="displayName"
        value={props.value ? props.value : '' }
        placeholder="Введите имя"
        size="small"
        variant='standard'
        onChange={e => props.onChange(e.target.value)}
      /> 
    )},
    { title: 'Роль', field: 'role', initialEditValue: 'courier', lookup: { 'super_admin': 'super_admin', 'admin': 'admin', 'operator': 'operator', 'courier': 'courier' }},
  ];
  
  return (
    <>
      <Backdrop className={classes.backdrop} open={loading !== undefined&&loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <MaterialTable
        title="Сотрудники"
        icons={tableIcons}
        columns={columns}
        data={data}
        options={{
          actionsColumnIndex: -1,
        }}
        localization={localization}
        editable={['super_admin', 'admin'].includes(role) ? { 
          onRowAdd: newData => addUserHandler(newData),
          onRowUpdate: newData => editUserHandler(newData),
          onRowDelete: oldData => dispatch(deleteUser(oldData._id)),
        } : {
        }}
      />
    </>
  );
}

export default Users;