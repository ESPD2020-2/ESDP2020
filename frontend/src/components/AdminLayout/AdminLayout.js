import React from "react";
import { useRouteMatch, NavLink } from "react-router-dom";
import AdminRoutes from "../../routes/AdminRoutes";
import DrawerLayout from "../UI/DrawerLayout/DrawerLayout";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";

const AdminLayout = () => {
  const { path, url } = useRouteMatch();
  const drawerContent = (
    <MenuList>
      <MenuItem
        component={NavLink}
        to={`${url}/orders/created`}
        activeClassName="Mui-selected"
      >
        Заказы
      </MenuItem>
      <MenuItem
        component={NavLink}
        to={`${url}/orders/published`}
        activeClassName="Mui-selected"
      >
        Курьеры
      </MenuItem>
    </MenuList>
  );
  return (
    <>
      <DrawerLayout drawerContent={drawerContent}>
        <AdminRoutes path={path}/>
      </DrawerLayout>
    </>
  );
};

export default AdminLayout;


