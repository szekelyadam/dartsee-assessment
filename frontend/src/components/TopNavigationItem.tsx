import { Link } from "@tanstack/react-router";

export type TopNavigationItemProps = {
  label: string;
  path: string;
};

export const TopNavigationItem = ({ label, path }: TopNavigationItemProps) => {
  return (
    <Link
      className={`h-full flex items-center px-1 text-sm font-medium tracking-tight transition-colors duration-200`}
      activeProps={{
        className: "text-primary font-semibold border-b-2 border-primary",
      }}
      inactiveProps={{ className: "text-slate-500 hover:text-slate-900" }}
      to={path}
    >
      {label}
    </Link>
  );
};
