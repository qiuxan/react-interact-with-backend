import React, { Component } from "react";
import axios from "axios";
import "./App.css";

const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";

class App extends Component {
  state = {
    posts: []
  };

  handleAdd = async () => {
    const obj = { title: 't', body: 'b' };
    const { data: post } = await axios.post(apiEndpoint, obj);
    console.log(post);
    const posts = [post, ...this.state.posts]; //posts in state is an array
    this.setState({ posts })
  };

  handleUpdate = async post => {


    post.title = "UPDATED";


    // const { data } = await axios.put(apiEndpoint + "/" + post.id, post);
    await axios.patch(apiEndpoint + "/" + post.id, { title: post.title });

    // console.log(data);


    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };



    this.setState({ posts });

    // console.log("Update", post);
  };

  handleDelete = async post => {

    const originalPosts = this.state.posts;
    // console.log(originalPosts);
    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });

    try {
      await axios.delete(apiEndpoint + '/' + post.id);
      throw new Error('');
    } catch (ex) {
      alert('Fail to delete the post');
      // console.log(originalPosts);
      this.setState({ posts: originalPosts });
    }

    // console.log("Delete", post);
  };



  async componentDidMount() {
    const response = await axios.get(apiEndpoint);
    const { data } = response;
    // console.log(data);
    this.setState({ posts: data });

  }

  render() {
    // console.log(this.state);
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
