import { TopNavigationItem } from "./TopNavigationItem";

export const TopNavigation = () => {
  return (
    <nav className="hidden md:flex items-center gap-8 h-full">
      <TopNavigationItem label="Games" path="/games" />
      <TopNavigationItem label="Player Stats" path="/player-stats" />
    </nav>
  );
};
