import { FaLeaf } from "react-icons/fa";

export default function LoadingSpinner({
  size = "md",
  message = "Loading...",
}) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-8">
      <div className={`animate-spin ${sizeClasses[size]}`}>
        <FaLeaf className="text-primary w-full h-full" />
      </div>
      {message && (
        <p className="text-gray-600 text-sm font-medium">{message}</p>
      )}
    </div>
  );
}
