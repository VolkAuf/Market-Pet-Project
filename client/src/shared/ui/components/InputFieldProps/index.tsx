import { ChangeEvent } from "react";

type InputFieldProps = {
  id: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  label: string;
  required?: boolean;
};

export const InputField = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  label,
  required = false,
}: InputFieldProps) => {
  const errorStyle = "text-errorColor border border-errorColor";

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        type={type}
        className={`gray-container ${error ? errorStyle : ""}`}
      />
      {error && <p className="text-sm text-errorColor mt-1">{error}</p>}
    </div>
  );
};
