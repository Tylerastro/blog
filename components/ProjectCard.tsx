import React from "react";
import { Clock, Calendar } from "lucide-react";

interface ProjectCardProps {
  name: string;
  status: "ongoing" | "pending";
  startDate: string;
  endDate: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  status,
  startDate,
  endDate,
}) => {
  const isOngoing = status === "ongoing";

  return (
    <div
      className={`relative w-full max-w-sm mx-auto ${
        isOngoing ? "bg-emerald-50" : "bg-amber-50"
      } rounded-lg overflow-hidden shadow-md`}
    >
      {/* Reflection effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute h-full w-[20%] animate-card-reflection bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12" />
      </div>
      {/* Ticket edge effect */}
      <div className="absolute top-0 left-0 w-full h-4 flex justify-between px-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full -mt-1 ${
              isOngoing ? "bg-emerald-200" : "bg-amber-200"
            }`}
          />
        ))}
      </div>

      <div className="p-6 pt-8">
        <div
          className={`text-xs font-semibold ${
            isOngoing ? " text-emerald-600" : "text-amber-600"
          } mb-2`}
        >
          {status.toUpperCase()}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">{name}</h3>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">{startDate}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">{endDate}</span>
          </div>
        </div>

        <div
          className={`w-full h-2 ${
            isOngoing ? "bg-emerald-200" : "bg-amber-200"
          } rounded-full overflow-hidden`}
        >
          <div
            className={`h-full ${
              isOngoing ? "bg-emerald-500" : "bg-amber-500"
            } rounded-full`}
            style={{ width: isOngoing ? "60%" : "0%" }}
          />
        </div>
      </div>

      {/* Bottom ticket edge effect */}
      <div className="absolute bottom-0 left-0 w-full h-4 flex justify-between px-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full -mb-1 ${
              isOngoing ? "bg-emerald-200" : "bg-amber-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
