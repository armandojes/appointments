/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { useState } from 'react';

const useForm = (initialState = {}, rules = {}) => {
  const [values, setValues] = useState(initialState);
  const [inputErrors, setInputErrors] = useState({});

  /**
   * update form state
   * @param {{}} event domEvent
   */
  const handleInputChange = ({ target }) => {
    setValues({ ...values, [target.name]: target.value });
  };

  /**
   * validate form and update inputErrors
   * @param {{}} scopedRules use scoped rules if exist before use global rules
   * @returns {{}} object of errors
   */
  const handleValidateForm = (scopedRules) => {
    const currentUssingRules = scopedRules || rules;
    const errors = {};
    for (const inputName in currentUssingRules) {
      const validator = currentUssingRules[inputName];
      const inputErrorMessage = validator(values[inputName], values);
      if (inputErrorMessage) errors[inputName] = inputErrorMessage;
    }
    setInputErrors(errors);
    return errors;
  };

  /**
   * remove error on list
   * @param {{}} event dom event
   */
  const handleRemoveError = ({ target }) => {
    const newErrors = { ...inputErrors };
    delete newErrors[target.name];
    setInputErrors(newErrors);
  };

  /**
   * validate single input and update inputErrors
   * @param {{}} event dom event
   */
  const handleValidateSingleInput = ({ target }) => {
    const validator = rules[target.name];
    if (validator) {
      const error = validator(values[target.name], values);
      setInputErrors({ ...inputErrors, [target.name]: error });
    }
  };

  const getInputProps = (name) => ({
    onChange: handleInputChange,
    value: (values[name] !== null && values[name] !== undefined) ? values[name] : '',
    onFocus: handleRemoveError,
    error: !!inputErrors[name],
    onBlur: handleValidateSingleInput,
    name,
  });

  return {
    getInputProps,
    handleValidateForm,
    values,
    setValues,
    errors: inputErrors,
  };
};

export default useForm;
