type MenuItemCardProps = {
  title: string;
  imageSrc?: string | null;
  onClick: () => void;
};

export const MenuItemCard = ({
  title,
  imageSrc,
  onClick,
}: MenuItemCardProps) => {
  return (
    <div
      onClick={onClick}
      className="relative flex items-center justify-center h-60 w-full rounded-[30px] p-4 cursor-pointer transition-transform hover:scale-105 overflow-hidden shadow-lg group bg-[#004166]"
    >
      {imageSrc ? (
        <>
          <img
            src={imageSrc}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </>
      ) : (
        <div className="absolute inset-0 w-full h-full bg-[#004166]" />
      )}
      <h3 className="relative z-10 [font-family:'Montserrat-Bold',Helvetica] font-bold text-white text-3xl text-center">
        {title}
      </h3>
    </div>
  );
};
