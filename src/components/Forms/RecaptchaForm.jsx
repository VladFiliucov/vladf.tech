import React from 'react';
import Reaptcha from 'reaptcha';
import { Formik } from 'formik';

const TextField = () => (
  <label>
    Name
    <input type="text" />
  </label>
);

const RecaptchaForm = () => (
    <TextField />
  );

export default RecaptchaForm;
