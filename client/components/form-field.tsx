import React from "react";

interface Props {
  labelText: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  handleChange: (e: any) => void;
}

const FormField = ({
  labelText,
  name,
  type,
  placeholder,
  value,
  handleChange,
}: Props) => {
  return (
    <div>
      <div>
        <label htmlFor={name}>{labelText}</label>
      </div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default FormField;
