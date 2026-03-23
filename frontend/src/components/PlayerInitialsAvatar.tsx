import { getInitials, getRandomPlayerColor } from "../helpers";

export const PlayerInitialsAvatar = ({
  name,
  size = "sm",
}: {
  name: string;
  size?: "sm" | "lg";
}) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    lg: "w-12 h-12 text-base",
  };

  return (
    <div
      className={`rounded-full border-2 border-white flex items-center justify-center font-bold ${getRandomPlayerColor()} ${sizeClasses[size]}`}
    >
      {getInitials(name)}
    </div>
  );
};
