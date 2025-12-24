import { FC, ReactNode } from "react";
import "./FormField.css";

interface IFormFieldProps {
  label: string; // Название поля
  children: ReactNode; // Поле ввода (input, textarea, select)
  errorMessage?: string; // отображение текста ошибки
}

export const FormField: FC<IFormFieldProps> = ({
  children,
  label,
  errorMessage,
}) => {
  return (
    <label className="form-field">
      <span className="form-field__label">{label}</span>
      {children}
      {errorMessage && (
        <span className="form-field__error-text">{errorMessage}</span>
      )}
    </label>
  );
};
