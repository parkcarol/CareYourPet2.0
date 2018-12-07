import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthService from "./components/auth/auth-service";
import ProtectedRoute from "./components/auth/protected-route";
import HomeDes from "./components/HomeDes";
import HomeLog from "./components/HomeLog";
import Signup from "./components/auth/Signup";
import NavbarNotLoggedIn from "./components/navbar/NavbarNotLoggedIn";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: "", serverResponse: false };
    this.service = new AuthService();
    this.fetchUser = this.fetchUser.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  fetchUser = () => {
    this.service
      .loggedin()
      .then(response => {
        console.log("fetchUser", response.data);
        this.setState({
          loggedInUser: response.data,
          serverResponse: true
        });
      })
      .catch(err => {
        this.setState({
          loggedInUser: false
        });
      });
  };

  setUser = userObj => {
    this.setState({
      loggedInUser: userObj
    });
  };

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    console.log("######", this.state.loggedInUser);
    if (this.state.loggedInUser) {
      return (
        <div className="App">
          <BrowserRouter>
            <Switch>
              <ProtectedRoute
                fetchUser={this.fetchUser}
                user={this.state.loggedInUser}
                path="/home"
                component={HomeLog}
              />
              {/* <ProtectedRoute user={this.state.loggedInUser} path='./components/user/Profile.jsx' component={Profile} />
              <ProtectedRoute user={this.state.loggedInUser} path='./components/user/Pets.jsx' component={Pets} />
              <ProtectedRoute user={this.state.loggedInUser} path='./components/establishments/MyEstablishments.jsx' component={MyEstablishments} /> */}
            </Switch>
          </BrowserRouter>
        </div>
      );
    } else {
      console.log("AQUIII");
      return (
        <div className="App">
          <NavbarNotLoggedIn />
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path="/"
                render={() => <HomeDes fetchUser={this.fetchUser} />}
              />
              <Route exact path="/signup" component={Signup} />
            </Switch>
          </BrowserRouter>
        </div>
      );
    }
  }
}

export default App;
