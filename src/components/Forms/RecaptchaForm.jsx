import React, { useRef, useState } from 'react';
import Reaptcha from 'reaptcha';
import { Formik } from 'formik';

const RecaptchaForm = () => {
  const recaptchaRef = useRef(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const submitForm = (values, token, setSubmitting) => {
    const payload = {...values, recaptcha: token }

    alert(JSON.stringify(payload, null, 2));
    setSubmitting(false);
    setFormSubmitted(true);
  };

  if (formSubmitted) return <div>Submitted</div>;

  return (
    <Formik
      initialValues={{ email: '', recaptcha: '' }}
      validateOnChange={false}
      validate={values => {
        return {}
        // return recaptchaRef.current.execute().then(() => {
        //   const errors = {};
        //   if (!values.email) {
        //     errors.email = 'Required';
        //   }
        //   console.log("CALLED THEEEEEEEN");

        //   // recaptchaRef.current.execute();

        //   return errors;
        // })
      }}
      onSubmit={values => {
        recaptchaRef.current.getResponse().then((token) => { console.log("TOKEN IS", token) });
        console.log("HOPE THIS IS CALLED LATER");
        // recaptchaRef.current.execute();
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setSubmitting,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
          </label>
          {errors.email && touched.email && errors.email}
          <Reaptcha
            ref={recaptchaRef}
            size="invisible"
            name="recaptcha"
            sitekey=""
            onVerify={(token) => {
              console.log("GOT CALLED!", token);
              // submitForm(values, token, setSubmitting)
            }}
          />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  )
};

export default RecaptchaForm;
