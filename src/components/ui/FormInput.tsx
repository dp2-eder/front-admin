import React from "react";

type FormInputProps = {
  label: string;
  name?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
};

export const FormInput = ({
  label,
  name,
  value,
  defaultValue,
  onChange,
  type = "text",
  placeholder,
  disabled,
}: FormInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
      />
    </div>
  );
};
