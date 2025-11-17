type ButtonProps = {
  text: string;
  className?: string;
  property1: "default";
  onClick?: () => void;
};

export const Button = ({ text, className, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded font-semibold transition-opacity hover:opacity-90 ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
