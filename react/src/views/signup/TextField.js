import React from "react";
import { ErrorMessage, useField } from "formik";
import styles from "./error.module.css";

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <label className={styles.errorLabel} htmlFor={field.name}>
        {label}
      </label>
      <input {...field} {...props} autoComplete="off" />
      동의
      <ErrorMessage
        component="div"
        name={field.name}
        className={styles.error}
      />
    </div>
  );
};
