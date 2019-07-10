import React, { Component } from 'react';
import PostContainer from './components/PostContainer';
import './App.css';

class App extends Component {
  state = {
    posts: [],
    newPost: {
      title: "",
      author: "",
      body: ""
    }
  }

  async componentDidMount() {
    let posts = await fetch('/api/posts').then(res => res.json());
    this.setState({ posts });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/posts', 
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.newPost)
    })
  }

  handleChange = (e) => {
    let newPost = { ...this.state.newPost }
    newPost[e.target.name] = e.target.value;

    this.setState({
      newPost
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Bob Loblaw's Law Blog</h1>

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
        </header>

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
