"use client";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  text?: string;
  fullScreen?: boolean;
}

export default function Loader({ size = "medium", text = "Загрузка...", fullScreen = false }: LoaderProps) {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-200 border-t-blue-600`}
      ></div>
      {text && <p className="mt-3 text-gray-600 text-sm font-medium">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">{spinner}</div>;
  }

  return <div className="flex items-center justify-center py-8">{spinner}</div>;
}
