import { useSelector } from "react-redux";

const ShowTo = ({  children, role }) => {
  const user = useSelector((state) => state.users.user);
  if (!user || user.role === role) {
    return children;
  }

  return null;
};

export default ShowTo;
