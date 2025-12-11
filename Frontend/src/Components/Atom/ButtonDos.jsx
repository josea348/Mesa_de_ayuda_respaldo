export const Button = ({ children, onClick, variant = "primary" }) => {
    const baseStyle =
        "px-4 py-2 rounded-lg font-medium transition duration-200";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    };

    return (
        <button onClick={onClick} className={`${baseStyle} ${variants[variant]}`}>
            {children}
        </button>
    );
};
