import React, { Component } from 'react';
import AuthService from './auth-service';
import InputText from '../forms/InputText';


class Login extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '' };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.service.login(username, password)
    .then( response => {
        this.setState({ username: "", password: "" });
        // this.props.getUser(response)
    })
    .catch( error => console.log(error) )
  }
    
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
    
  render(){
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <InputText label="Username:" fieldName="username" placeHolder="Digite um username" value={this.state.username} handleChange={this.handleChange} />
          <InputText label="Password:" fieldName="password" placeHolder="Digite uma senha" value={this.state.password} handleChange={this.handleChange} />
          <button className="button is-info" type="submit" value="Login">Login</button>
        </form>
        <span>Forgot your password?</span>
        <p>Don't have an account? 
          <button onClick={this.props.handleSignup}> Signup</button>
        </p>
      </div>
    )
  }
}

export default Login;