const ShowTo = ({  children, role, user }) => {
  if (!user || user.role === role) {
    return children;
  }
  return null;
};

export default ShowTo;
