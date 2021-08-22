import React from "react";
import { Link } from "react-router-dom";

export function PostsList({ posts }) {
  return (
    <ul role="list" className="divide-y divide-gray-200">
      {posts.map((post) => (
        <li
          key={post.id}
          className="relative bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
        >
          <Link to={`/posts/${post.id}`} key={post.id}>
            <div className="flex justify-between space-x-3">
              <div className="min-w-0 flex-1">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900 truncate">{post.title}</p>
              </div>
            </div>
            <div className="mt-1">
              <p className="line-clamp-3 text-sm text-gray-600">{post.body}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
