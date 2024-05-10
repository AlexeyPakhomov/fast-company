import { useState } from 'react';
import TextArea from '../../common/form/TextArea';
import Button from '../../common/Button';
import { validator } from '../../../utils/validator';

const FormNewComment = ({ onSubmit }) => {
  const [newComment, setNewComment] = useState({ content: '' });
  const [errors, setErrors] = useState({});

  const validatorConfig = {
    content: {
      isRequired: { message: 'Напишите ваш комментарий' },
    },
  };

  function validate() {
    const errors = validator(newComment, validatorConfig);
    setErrors(errors);
    return Object.values(errors).length === 0;
  }

  function handleChange(e) {
    const { name, value } = e;
    setNewComment((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(newComment);
    setNewComment({ content: '' });
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit}>
      {' '}
      <TextArea
        name="content"
        label="Сообщение"
        value={newComment.content}
        onChange={handleChange}
        error={errors.content}
        rows="3"
      />
      <Button
        onClick={handleSubmit}
        btnText="Опубликовать"
        cssDiv="d-flex flex-row-reverse"
        cssBtn="btn btn-warning btn-sm mt-2"
        //disabled={isValid}
      />
    </form>
  );
};

export default FormNewComment;
