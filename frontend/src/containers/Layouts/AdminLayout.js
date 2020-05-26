import React from "react";
import { useRouteMatch, NavLink } from "react-router-dom";
import {useDispatch} from "react-redux";
import {closeDrawer} from "../../store/actions/mainActions";
import AdminRoutes from "../../routes/AdminRoutes";
import AdmDrawerLayout from "../../components/UI/DrawerLayout/AdmDrawerLayout";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import {admLinks} from "../../constants";

const AdminLayout = () => {
  const { path, url } = useRouteMatch();
  const dispatch = useDispatch();
  const drawerContent = (
    <MenuList>
      {admLinks.map(el => (
        <MenuItem key={el.name} onClick={() => dispatch(closeDrawer())} activeClassName="Mui-selected" component={NavLink} to={url + el.path}>{el.name}</MenuItem>
      ))}
    </MenuList>
  );
  return (
    <>
      <AdmDrawerLayout drawerContent={drawerContent}>
        <AdminRoutes path={path}/>
      </AdmDrawerLayout>
    </>
  );
};

export default AdminLayout;


