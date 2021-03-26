import React, { Component } from 'react';

class MainMenu extends Component {
  state = {
    loggedIn: false,
    user: null,
    error: null
  }

  componentDidMount() {
    fetch('http://localhost:4000/auth/spotify', {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(res => {
        if(res.status === 200) return res.json();
        throw new Error('failed to authenticate user');
      })
      .then(res => {
        this.setState({ loggedIn: true, user: res.user });
        console.log(res);
      })
      .catch(err => {
        this.setState({
          loggedIn: false,
          error: "failed to authenticate user"
        })
      })
  }

  render() {
    return (
      <div>
        <div>
          {!this.loggedIn ? (
            <h1>Welcome!</h1>
          ) : (
            <div>
              <h1>You have login succcessfully!</h1>
              <h2>Welcome {this.state.user.name}!</h2>
            </div>
          )}
        </div>
      </div>

    );
  }
}

export default MainMenu;
