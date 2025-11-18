import image1 from "../../assets/down.svg";

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
      className="flex justify-between items-center w-full h-28 bg-[#ECF1F4] rounded-[30px] shadow-lg p-8 cursor-pointer hover:bg-opacity-90 transition-all"
    >
      <h2 className="[font-family:'Inter-ExtraBold',Helvetica] font-extrabold text-[#0E0E2C] text-[40px] text-center">
        {title}
      </h2>
      <img
        src={image1}
        alt="Expandir"
        className="w-10 h-10 transform rotate-180"
      />
    </div>
  );
};
