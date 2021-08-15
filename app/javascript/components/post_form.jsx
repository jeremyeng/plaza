import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

export const PostForm = (props) => {
  const history = useHistory();

  return (
    <Formik
      initialValues={{ title: "", body: "" }}
      validationSchema={Yup.object({
        title: Yup.string().max(100, "Must be 100 characters or less").required("Required"),
        body: Yup.string().required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        axios
          .post(
            "/api/v1/posts",
            {
              ...values,
            },
            { headers: { "X-CSRF-TOKEN": props.authToken } }
          )
          .then((response) => {
            setSubmitting(false);
            history.push(`/posts/${response.data.id}`);
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

        <button type="submit" className="btn">
          Submit
        </button>
      </Form>
    </Formik>
  );
};
