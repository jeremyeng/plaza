import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";

import { Post } from "models/post";

export const EditPostForm = (props) => {
  const history = useHistory();
  const [post, setPost] = useState({});
  const { postId } = useParams();

  useEffect(() => {
    Post.find(postId).then(function ({ data }) {
      setPost(data);
    });
  }, [postId]);

  if (post.id) {
    return (
      <Formik
        initialValues={{ title: post.title, body: post.body }}
        validationSchema={Yup.object({
          title: Yup.string().max(100, "Must be 100 characters or less").required("Required"),
          body: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          post.title = values.title;
          post.body = values.body;
          post
            .save()
            .then(() => {
              setSubmitting(false);
              props.onEdit(post);
              history.push(`/posts/${post.id}`);
            })
            .catch(() => {
              setSubmitting(false);
            });
        }}
      >
        <Form className="flex flex-col w-128 m-auto">
          <div className="flex flex-col w-full mb-8">
            <label htmlFor="title" className="font-medium">
              Title
            </label>
            <Field
              name="title"
              type="text"
              className="rounded focus:border-light-blue-vivid-100 focus:ring-light-blue-vivid-200"
            />
            <ErrorMessage name="title">
              {(msg) => (
                <span className="text-red-vivid-600" className="text-red-vivid-600">
                  {msg}
                </span>
              )}
            </ErrorMessage>
          </div>

          <div className="flex flex-col w-full mb-8">
            <label htmlFor="body" className="font-medium">
              Body
            </label>
            <Field
              name="body"
              as="textarea"
              className="rounded focus:border-light-blue-vivid-100 focus:ring-light-blue-vivid-200"
            />
            <ErrorMessage name="body">
              {(msg) => (
                <span className="text-red-vivid-600" className="text-red-vivid-600">
                  {msg}
                </span>
              )}
            </ErrorMessage>
          </div>

          <button type="submit" className="btn-primary">
            Submit
          </button>
        </Form>
      </Formik>
    );
  } else {
    return null;
  }
};
