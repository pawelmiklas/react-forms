import React, { Component } from 'react';
import './App.css';
import Label from './components/Label';

class App extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    checkbox: false,
    showPopup: false,
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
    const  regExpUsername  =  /^[a-zA-Z0-9\\?]{3,20}$/;
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

    if(checkStatus.username && checkStatus.password && checkStatus.email && checkStatus.checkbox){
      return true;
    } else{
      return false;
    }
  }

  handleSubmitForm = (e) => {
    e.preventDefault();
    const result = this.handleCheckProperits();
    if(result){
      this.setState({
        showPopup: true
      })
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }
  
  render() {
    const {username, email, password, checkbox} = this.state.checkStatus;
    return (
      <main className="main">
        <form className="form" onSubmit={this.handleSubmitForm} noValidate>
        <Label
          id="username"
          class="input"
          type="text"
          value={this.state.username}
          change={this.handleChange}
          label={username}
          error='Enter correct name!'
        >Name</Label>

        <Label
          id="email"
          class="input"
          type="email"
          value={this.state.email}
          change={this.handleChange}
          label={email}
          error='Email must contain the @ symbol!'
        >Email</Label>

        <Label
          id="password"
          class="input"
          type="password"
          value={this.state.password}
          change={this.handleChange}
          label={password}
          error='Password must have minimum 8 letters, with at least a symbol, upper and lower case letters and a number!'
        >Password</Label>

        <label className="label-checkbox" htmlFor="checkbox"> 
          <input 
            className="input checkbox"
            type="checkbox"
            id="checkbox"
            value={this.state.checkbox}
            onChange={this.handleChange}
            checked={this.state.checkbox}
            />
          I agree to the Terms and Conditions
        </label>

        {!checkbox ? <p className="error error--checkbox">Checkbox is required!</p> : null}
        <input className="submit" type="submit" value="send"/>
        </form>
        {this.state.showPopup ? <div className="popup">The form has been sent</div> : null }
      </main>
    );
  }
}

export default App;
