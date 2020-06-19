import React from "react";
import { NavLink } from "react-router-dom";
import {useDispatch} from "react-redux";
import {toggleDrawer} from "../../store/actions/mainActions";
import MainRoutes from '../../routes/MainRoutes';
import MainDrawerLayout from "../../components/UI/DrawerLayout/MainDrawerLayout";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import {links} from "../../constants";

const MainLayout = () => {
  const dispatch = useDispatch();
  const drawerContent = (
    <MenuList>
      {links.map(el => (
        <MenuItem key={el.name} onClick={() => dispatch(toggleDrawer())} activeClassName="Mui-selected" component={NavLink} to={el.path}>{el.name}</MenuItem>
      ))}
    </MenuList>
  );
  return (
    <>
      <MainDrawerLayout drawerContent={drawerContent}>
        <MainRoutes/>
      </MainDrawerLayout>
    </>
  );
};

export default MainLayout;


