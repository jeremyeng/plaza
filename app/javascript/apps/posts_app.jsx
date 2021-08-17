import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
  useHistory,
  Link,
} from "react-router-dom";

import { Post } from "models/post";
import { PostForm } from "components/post_form";
import { EditPostForm } from "components/edit_post_form";
import Dropdown from "components/dropdown";

export function PostsApp(props) {
  const [posts, setPosts] = useState([]);

  function fetchPosts() {
    Post.order({ created_at: "desc" })
      .all()
      .then(function ({ data }) {
        setPosts(data);
      });
  }

  function createPost(newPost) {
    setPosts([newPost, ...posts]);
  }

  function updatePost(updatedPost) {
    const newPosts = posts.map((post) => {
      if (post.id === updatedPost.id) {
        return updatedPost;
      }

      return post;
    });

    setPosts(newPosts);
  }

  function deletePost(deletedPostId) {
    const newPosts = posts.filter((post) => post.id != deletedPostId);

    setPosts(newPosts);
  }

  useEffect(fetchPosts, []);

  return (
    <Router>
      <div className="grid grid-cols-sidebar h-screen flex flex-col w-full">
        <div className="sidebar overflow-y-scroll">
          <div>
            <Link to="/posts/create">
              <button className="btn-primary-sm">New Post</button>
            </Link>
          </div>
          {posts ? posts.map((post) => <PostPreview post={post} key={post.id} />) : null}
        </div>
        <div className="bg-cool-gray-050">
          <Switch>
            <Route path="/posts/create">
              <PostForm onCreate={createPost} />
            </Route>
            <Route path="/posts/edit/:postId">
              <EditPostForm onEdit={updatePost} />
            </Route>
            <Route path="/posts/:postId">
              <PostFull onDelete={deletePost} />
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
  return (
    <Link to={`/posts/${post.id}`} key={post.id}>
      <div className="border-b border-gray-200 pt-1 pb-1 pl-2 pr-2 hover:bg-gray-100">
        <h3 className="text-sm truncate font-medium">{post.title}</h3>
        <p className="text-sm leading-tight text-gray-500">{post.body}</p>
      </div>
    </Link>
  );
}

function PostFull(props) {
  let { postId } = useParams();
  const history = useHistory();
  const [post, setPost] = useState(props.post);

  useEffect(() => {
    Post.find(postId).then(function ({ data }) {
      setPost(data);
    });
  }, [postId]);

  function handleEdit() {
    history.push(`/posts/edit/${postId}`);
  }

  function handleDelete() {
    const deletedPostId = post.id;
    post.destroy().then(() => {
      history.push(`/posts`);
    });
    props.onDelete(deletedPostId);
  }

  const dropdownItems = [
    {
      label: "Edit",
      handleClick: handleEdit,
    },
    {
      label: "Delete",
      handleClick: handleDelete,
    },
  ];

  if (post) {
    return (
      <div className="card m-auto w-128 mt-4">
        <h1 className="text-xl font-medium">{post.title}</h1>
        <p className="leading-snug mt-6 mb-2">{post.body}</p>
        <Dropdown label="Actions" menuItems={dropdownItems} />
      </div>
    );
  } else {
    return null;
  }
}
