import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import userService from './utils/userService';
import { getAllPosts, createPost } from './utils/postService';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import LoginPage from './pages/LoginPage/LoginPage';
import PostContainer from './components/PostContainer';
import './App.css';

class App extends Component {
  state = {
    posts: [],
    newPost: {
      title: "",
      author: "",
      body: ""
    },
    user: userService.getUser()
  }

  async componentDidMount() {
    let posts = await getAllPosts();
    this.setState({ posts });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    createPost(this.state.newPost);
  }

  handleChange = (e) => {
    let newPost = { ...this.state.newPost }
    newPost[e.target.name] = e.target.value;

    this.setState({
      newPost
    })
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Bob Loblaw's Law Blog</h1>
          <p>
            { 
              this.state.user 
              ? `Welcome, ${this.state.user.name}`
              : 'Please Sign Up' 
            }
          </p>       
          
          { this.state.user
            ? <ul>
                <li><Link to="" onClick={this.handleLogout}>Logout</Link></li>
              </ul>
            : <ul>
                <li><Link to="/signup">Sign up</Link></li>
                <li><Link to="/login">Login</Link></li>
              </ul>
          }
        </header>


        <Switch>
          <Route exact path="/signup" render={({ history }) => 
            <SignUpPage 
              history={history} 
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          } />

          <Route exact path="/login" render={({ history }) => 
            <LoginPage 
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin} 
            />
          } />
        </Switch>


        <br />

        
        { this.state.user &&
          <form onSubmit={this.handleSubmit}>
            <div className="field-wrapper">
              <label>Title</label>
              <input 
                name="title" 
                type="text" 
                onChange={ this.handleChange }
                value={ this.state.newPost.title } />
            </div>
            <div className="field-wrapper">
              <label>Author</label>
              <input 
                name="author" 
                type="text" 
                onChange={ this.handleChange }
                value={ this.state.newPost.author } />
            </div>
            <div className="field-wrapper">
              <label>Body</label>
              <input 
                name="body" 
                type="text" 
                onChange={ this.handleChange }
                value={ this.state.newPost.body } />
            </div>
            
            <input type="submit" value="Submit" />
          </form>
        }
        { 
          this.state.posts.length
          ? <PostContainer posts={this.state.posts} />
          : <h3 style={{ textAlign: 'center' }}>Loading...</h3>
        }
      </div>
    );
  }
}

export default App;
