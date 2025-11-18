type FormTextareaProps = {
  label: string;
  defaultValue: string;
};

export const FormTextarea = ({ label, defaultValue }: FormTextareaProps) => (
  <div className="w-full">
    <label className="block text-xl font-semibold text-black mb-2">
      {label}
    </label>
    <textarea
      defaultValue={defaultValue}
      rows={4}
      className="w-full p-4 bg-white rounded-xl border border-solid border-[#99a1ae] text-[#495565] text-base resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);
