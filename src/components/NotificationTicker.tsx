import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const notifications = [
  "New pension scheme registration starts from 15th April 2024",
  "Village development program meeting on 20th April 2024",
  "Free medical camp at Panchayat office on 25th April 2024",
  "Last date for property tax payment is 30th April 2024",
];

export const NotificationTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-amber-400 via-amber-500 to-[#DD4814] py-2 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-2">
          <span className="font-semibold whitespace-nowrap">Latest Updates:</span>
          <div className="overflow-hidden flex-1">
            <div className="animate-[slide_20s_linear_infinite]">
              <p className="flex items-center space-x-2">
                <ArrowRight className="h-4 w-4" />
                <span>{notifications[currentIndex]}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};