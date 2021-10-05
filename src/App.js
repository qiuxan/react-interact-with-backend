import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import config from "./config.json";
import 'react-toastify/dist/ReactToastify.css';
import http from "./services/httpService";
import * as Sentry from "@sentry/react";




class App extends Component {
  state = {
    posts: []
  };

  handleAdd = async () => {
    const obj = { title: 't', body: 'b' };
    const { data: post } = await http.post(config.apiEndpoint, obj);
    console.log(post);
    const posts = [post, ...this.state.posts]; //posts in state is an array
    this.setState({ posts })
  };

  handleUpdate = async post => {


    post.title = "UPDATED";


    // const { data } = await http.put(config.apiEndpoint + "/" + post.id, post);
    await http.patch(config.apiEndpoint + "/" + post.id, { title: post.title });

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
      await http.delete(config.apiEndpoint + '/' + post.id);
      // throw new Error('');
    } catch (ex) {
      if (ex.request && ex.request === 404) {
        console.log('in handle delets');
        alert("This post has already been deleted.");
      }
      this.setState({ posts: originalPosts });
    }

    // console.log("Delete", post);
  };



  async componentDidMount() {
    const response = await http.get(config.apiEndpoint);
    const { data } = response;
    // console.log(data);
    this.setState({ posts: data });

  }

  render() {
    // console.log(this.state);
    return (
      <React.Fragment>
        <ToastContainer />
        {/* <button onClick={methodDoesNotExist}>Break the world</button> */}

        <button className="btn btn-primary" onClick={() => { throw Error("something is wrong") }}>wrong</button>

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

// export default App;
export default Sentry.withProfiler(App);

