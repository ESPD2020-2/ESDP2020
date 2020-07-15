import React from "react";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import MainRoutes from "../../routes/MainRoutes";
import MainDrawerLayout from "../../components/UI/DrawerLayout/MainDrawerLayout";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import {toggleDrawer} from "../../store/actions/mainActions";
import {links} from "../../constants";
import Footer from "../../components/Footer/Footer";

const MainLayout = () => {
  const dispatch = useDispatch();
  const drawerContent = (
    <MenuList>
      {links.map((el) => (
        <MenuItem
          key={el.name}
          onClick={() => dispatch(toggleDrawer())}
          activeClassName="Mui-selected"
          component={NavLink}
          to={el.path}
        >
          {el.name}
        </MenuItem>
      ))}
    </MenuList>
  );

  return (
    <>
      <MainDrawerLayout drawerContent={drawerContent}>
        <MainRoutes/>
      </MainDrawerLayout>
      <Footer/>
    </>
  );
};

export default MainLayout;
