export default function Loader({
    size = 24,
    color = "border-gray-500",
    background = "border-gray-200",
    className = "",
}) {
    return (
        <div
            className={`relative inline-block ${className}`}
            style={{ width: size, height: size }}
        >
            {/* Background circle */}
            <div
                className={`absolute inset-0 rounded-full border-2 ${background}`}
            ></div>

            {/* Spinning arc */}
            <div
                className={`absolute inset-0 rounded-full border-2 ${color} border-t-transparent animate-spin`}
            ></div>
        </div>
    );
}
