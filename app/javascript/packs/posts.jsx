import { mountComponentWithDataProps } from "utils/react_mount";

import { PostsApp } from "apps/posts_app";

const props = {
  authToken: document.querySelector("[name=csrf-token]").content,
};

mountComponentWithDataProps("#posts-app", PostsApp, props);
