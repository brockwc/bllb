import React, { Component } from 'react';
import userService from '../../utils/userService';

class LoginPage extends Component {
  state = {
    email: '',
    pw: ''
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.login(this.state);

      this.props.handleSignupOrLogin();
      this.props.history.push('/')
    } catch (err) {
      // Invalid user data (probably duplicate email)
      this.props.updateMessage('Invalid Credentials');
    }
  }

  render() {
    return (
      <div>
        <form action="" onSubmit={this.handleSubmit}>

          <div>
            <input
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
            />            
          </div>
          <div>
            <input
              name="pw"
              type="password"
              onChange={this.handleChange}
              value={this.state.pw}
            />
          </div>

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default LoginPage;