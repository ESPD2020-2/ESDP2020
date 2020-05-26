import { useSelector} from 'react-redux';

const ShowToAdmin = ({  children, roles, path }) => {
  const currentUser = useSelector(state => state.users.user);
  if (roles.includes(currentUser.role) && path==="/adm/orders/created") {
    return children;
  }
  return null;
};

export default ShowToAdmin;
