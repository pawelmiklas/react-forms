import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    checkbox: false,
    checkStatus: {
      username: true,
      email: true,
      password: true,
      checkbox: true,
    }
  }

  handleChange = (e) => {
    const value = e.target.value;
    const type = e.target.type;
    const name = e.target.id;
    if(type === 'checkbox'){
      this.setState({
        [name]: !this.state.checkbox
      })
    } else {
      this.setState({
        [name]: value
      })
    }
  }

  handleCheckProperits = () => {
    const {username, email, password, checkbox} = this.state;
    let checkStatus = this.state.checkStatus;
    const  regExpUsername  =  /^[a-zA-Z0-9\*\!\\?\(\)]{3,20}$/;
    const  regExpEmail  =  /\S+@\S+\.\S+/;
    const  regExpPassword  =  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    // check username
    if(regExpUsername.test(username)){
      checkStatus.username = true;
    } else {
      checkStatus.username = false;
    }

    // check email
    if(regExpEmail.test(email)){
      checkStatus.email = true;
    } else {
      checkStatus.email = false;
    }

    // check password
    if(regExpPassword.test(password)){
      checkStatus.password = true;
    } else {
      checkStatus.password = false;
    }

    // check checkbox
    if(checkbox){
      checkStatus.checkbox = true;
    } else {
      checkStatus.checkbox = false;
    }

    this.setState({
      checkStatus
    })
  }

  handleSubmitForm = (e) => {
    e.preventDefault();
    const result = this.handleCheckProperits();
    
    
  }
  
  render() {
    const {username, email, password, checkbox} = this.state.checkStatus;
    return (
      <main className="main">
        <form className="form" onSubmit={this.handleSubmitForm} noValidate>
          <label htmlFor="username">Your name
            <input
              className="input"
              type="text"
              id="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            {!username ? <p className="error">Enter correct name!</p> : null}
          </label>

          <label htmlFor="email">Your email
            <input 
              className="input"
              type="email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
              />
              {!email ? <p className="error">Email must contain the @ symbol!</p> : null}
          </label>

          <label htmlFor="password">Your password
            <input 
              className="input"
              type="password"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
              />
              {!password ? <p className="error">Password must have minimum 8 letters, with at least a symbol, upper and lower case letters and a number!</p> : null}
          </label>

          <label className="label-checkbox" htmlFor="checkbox"> 
            <input 
              className="input checkbox"
              type="checkbox"
              id="checkbox"
              value={this.state.terms}
              onChange={this.handleChange}
              checked={this.state.checkbox}
              />
            I agree to the Terms and Conditions
          </label>
              {!checkbox ? <p className="error error--checkbox">Checkbox is required!</p> : null}

          <input className="submit" type="submit" value="send"/>
        </form>
      </main>
    );
  }
}

export default App;
