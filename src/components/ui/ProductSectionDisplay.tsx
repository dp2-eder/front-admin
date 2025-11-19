import { type ProductSection } from "../../types/types";

type ProductSectionDisplayProps = {
  section: ProductSection;
};

export const ProductSectionDisplay = ({
  section,
}: ProductSectionDisplayProps) => {
  return (
    <div className="w-full bg-white rounded-xl border border-solid border-[#99a1ae] p-4">
      <h3 className="text-lg font-semibold mb-3 text-[#0E0E2C]">
        {section.title}
      </h3>
      <div className="max-h-60 overflow-y-auto">
        {section.options.map((option) => (
          <div
            key={option.id}
            className="flex justify-between items-center py-2 border-b border-solid border-[#d0d5db] last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <input
                type={section.type}
                name={`section-${section.id}`}
                id={option.id}
                className="h-4 w-4 border-gray-400 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor={option.id} className="text-sm text-black">
                {option.name}
              </label>
            </div>
            <span className="text-sm text-gray-600">{option.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
