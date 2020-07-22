import React from "react";
import ReconnectingWebSocket from 'reconnecting-websocket';
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import AppToolbar from "./components/UI/Toolbar/AppToolbar";
import Routes from "./routes/Routes";
import SocketContext from './socetContext';
import config from './config'


const App = () => {
  const user = useSelector(state => state.users.user)
  let ws;
  if (user && user.role !== 'user') {
  let url = `${config.wsURL}/webSocket?Token=${user&&user.token}`
  ws = new ReconnectingWebSocket(url,[],config.wsOptions)
  }
  return (
    <>
      <ToastContainer autoClose={3000} />
      <SocketContext.Provider value={ws}>
        <AppToolbar />
        <Routes />
      </SocketContext.Provider>
    </>
  );
};

export default App;
