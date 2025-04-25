interface ButtonProps {
  content: string;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  icon?: React.JSX.Element;
  className?: string;
}

const Button = ({ content, type, onClick, icon, className }: ButtonProps) => {
  return (
    <div>
      <button
        onClick={onClick}
        type={type}
        className={`w-full items-center flex justify-center gap-4 text-white py-2 rounded-lg font-semibold hover:opacity-85 transition-colors ${className}`}
      >
        {icon ? icon : null}
        {content}
      </button>
    </div>
  );
};

export default Button;