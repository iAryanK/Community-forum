import React from "react";

const StatCard = ({
  title,
  description,
  statValue,
  icon,
}: {
  title: string;
  description: string;
  statValue: number | undefined;
  icon: React.ReactNode;
}) => {
  return (
    <div className="notification bg-secondary w-full">
      <div className="notiglow"></div>
      <div className="notiborderglow"></div>
      <div className="flex">
        <div className="notititle flex items-center justify-between w-full">
          {title}
          {icon}
        </div>
      </div>

      <div className="notibody">
        <p className="text-white text-2xl">{statValue && statValue}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default StatCard;
