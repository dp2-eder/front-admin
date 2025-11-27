import upIcon from "../../assets/down.svg";

type MenuCategoryHeaderProps = {
  title: string;
  onClick: () => void;
  onEditClick?: () => void;
};

export const MenuCategoryHeader = ({
  title,
  onClick,
  onEditClick,
}: MenuCategoryHeaderProps) => {
  return (
    <div className="w-full h-[100px] bg-white rounded-[30px] shadow-md flex justify-between items-center px-8 hover:bg-gray-50 transition-colors">
      <div onClick={onClick} className="flex-1 cursor-pointer flex items-center">
        <h2 className="font-extrabold text-[#0E0E2C] text-[40px] text-center">
          {title}
        </h2>
      </div>
      <div className="flex items-center gap-4">
        {onEditClick && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEditClick();
            }}
            className="px-4 py-2 bg-[#004166] text-white rounded-lg text-sm font-semibold hover:bg-[#002f4a] transition-colors"
          >
            Editar Categoría
          </button>
        )}
        <img
          onClick={onClick}
          src={upIcon}
          alt="Expandir"
          className="w-10 h-10 transform -rotate-90 cursor-pointer"
        />
      </div>
    </div>
  );
};
