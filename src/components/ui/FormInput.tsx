type FormInputProps = {
  label: string;
  type?: string;
  defaultValue: string;
};

export const FormInput = ({
  label,
  type = "text",
  defaultValue,
}: FormInputProps) => (
  <div className="w-full">
    <label className="block text-xl font-semibold text-black mb-2">
      {label}
    </label>
    <input
      type={type}
      defaultValue={defaultValue}
      className="w-full h-12 px-4 py-2 bg-white rounded-xl border border-solid border-[#99a1ae] text-black text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);
