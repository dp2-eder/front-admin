import upIcon from "../../assets/down.svg";

type MenuCategoryHeaderProps = {
  title: string;
  onClick: () => void;
};

export const MenuCategoryHeader = ({
  title,
  onClick,
}: MenuCategoryHeaderProps) => {
  return (
    <div
      onClick={onClick}
      className="w-full h-[100px] bg-white rounded-[30px] shadow-md flex justify-between items-center px-8 cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <h2 className="font-extrabold text-[#0E0E2C] text-[40px] text-center">
        {title}
      </h2>
      <img
        src={upIcon}
        alt="Expandir"
        className="w-10 h-10 transform -rotate-90"
      />
    </div>
  );
};
