import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, NavLink, Switch, useParams, Link } from "react-router-dom";
import axios from "axios";

import { PostForm } from "components/post_form";
import { EditPostForm } from "components/edit_post_form";

export function PostsApp(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/posts`).then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <Router>
      <div className="grid grid-cols-sidebar h-screen flex flex-col w-full">
        <div className="sidebar overflow-y-scroll">
          <div>
            <Link to="/posts/create">
              <button className="btn">New Post</button>
            </Link>
          </div>
          {posts ? posts.map((post) => <PostPreview post={post} key={post.id} />) : null}
        </div>
        <div className="bg-cool-gray-050">
          <Switch>
            <Route path="/posts/create">
              <PostForm authToken={props.authToken} />
            </Route>
            <Route path="/posts/edit/:postId">
              <EditPostForm authToken={props.authToken} />
            </Route>
            <Route path="/posts/:postId">
              <PostFull />
            </Route>
            <Route
              path="/posts"
              render={() => {
                <h1>Hello, please select a post to view</h1>;
              }}
            ></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

function PostPreview({ post }) {
  // let { id } = useParams();

  return (
    <Link to={`/posts/${post.id}`} key={post.id}>
      <div className="border-b border-gray-200 pt-1 pb-1 pl-2 pr-2 hover:bg-gray-100">
        <h3 className="text-sm truncate font-medium">{post.title}</h3>
        <p className="text-sm leading-tight text-gray-500">{post.snippet}</p>
      </div>
    </Link>
  );
}

function PostFull() {
  let { postId } = useParams();

  const [post, setPost] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/posts/${postId}.json`).then((res) => {
      setPost(res.data);
    });
  }, [postId]);

  if (post) {
    return (
      <div className="card m-auto w-128 mt-4">
        <h1 className="text-xl font-medium mb-2">{post.title}</h1>
        <p className="leading-snug">{post.body}</p>
        <Link to={`/posts/edit/${postId}`}>
          <button className="btn">Edit</button>
        </Link>
      </div>
    );
  } else {
    return null;
  }
}
