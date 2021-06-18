import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { FieldsType, ValidateType } from 'src/utils/formValidationRules';

export const useForm = (
  initialValues: FieldsType,
  callback: () => void,
  validate: ValidateType,
) => {
  const [values, setValues] = useState<FieldsType>(initialValues);
  const [errors, setErrors] = useState<FieldsType>({});
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting && isSent) {
      callback();
    }
  }, [errors]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
    setIsSent(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();

    setIsSubmitting(false);
    const newValues = { ...values, [event.target.name]: event.target.value };
    isSent && setErrors(validate(newValues));
    setValues(() => newValues);
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};

export type UseFormReturnType = ReturnType<typeof useForm>;
