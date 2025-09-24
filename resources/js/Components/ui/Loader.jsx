export default function Loader({
    size = 5,
    color = "gray-300",
    borderTop = "white",
    className,
}) {
    return (
        <div
            className={`w-${size} h-${size} border-2 border-${color} border-t-${borderTop} rounded-full animate-spin ${className}`}
        ></div>
    );
}
