import React, {Component} from 'react';
import Toolbar from "./components/UI/Toolbar/Toolbar";
import RoutesAuthorization from "./RoutesAuthorization";
import MainSection from "./components/UI/MainSection/MainSection";
import BlueBlock from "./components/UI/BlueBlock/BlueBlock";

class App extends Component {
  render() {
    return (
      <>
        <div className='container-fluid' >
          <div className="row vh-100" >
            <div className="col-8">
              <Toolbar/>
              <MainSection/>
            </div>
            <div className="col-4 bg-primary" >
              <BlueBlock/>
            </div>
          </div>

        </div>
      </>
    );
  }
}

export default App;