import styled from 'styled-components';
import { ErrorMessage, Field, Form } from 'formik';

export const PhonebookWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

export const Label = styled.label`
  display: flex;
  gap: 8px;
  color: red;
`;

export const Input = styled(Field)`
  border: 2px solid green;
`;

export const ButtonSubmit = styled.button`
  width: 120px;
  height: 24px;
  padding: 2px;
  cursor: pointer;
`;

export const ErrorMessageStyled = styled(ErrorMessage)`
  margin-right: 8px;
`;

export const FormStyled = styled(Form)`
  margin-bottom: 8px;
`;
