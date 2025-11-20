import React from "react";

type FormTextareaProps = {
  label: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
};

export const FormTextarea = ({
  label,
  name,
  value,
  defaultValue,
  onChange,
  placeholder,
  rows = 4,
}: FormTextareaProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <textarea
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
      />
    </div>
  );
};
