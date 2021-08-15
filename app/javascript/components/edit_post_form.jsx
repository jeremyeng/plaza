import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

export const EditPostForm = (props) => {
  const history = useHistory();
  const [post, setPost] = useState({});
  const { postId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/posts/${postId}.json`).then((res) => {
      setPost(res.data);
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
          axios
            .patch(
              `/api/v1/posts/${post.id}`,
              {
                ...values,
              },
              { headers: { "X-CSRF-TOKEN": props.authToken } }
            )
            .then((response) => {
              console.log("SUCCESS");
              console.log(response.data.id);
              setSubmitting(false);
              history.push(`/posts/${response.data.id}`);
            })
            .catch(() => {
              console.log("ERROR");
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
