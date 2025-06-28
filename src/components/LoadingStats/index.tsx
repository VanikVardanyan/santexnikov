"use client";

interface LoadingStatsProps {
  current: number;
  total: number;
  text?: string;
}

export default function LoadingStats({ current, total, text = "Загружено" }: LoadingStatsProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="text-center py-4">
      <div className="mb-2">
        <div className="text-sm text-gray-600">
          {text}: {current} из {total} ({percentage}%)
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
