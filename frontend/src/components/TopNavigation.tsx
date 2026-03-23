import { TopNavigationItem } from "./TopNavigationItem";

export const TopNavigation = () => {
  return (
    <nav className="flex items-center gap-8 h-full">
      <TopNavigationItem label="Games" path="/games" />
      <TopNavigationItem label="Analytics" path="/analytics" />
      <TopNavigationItem label="Leaderboard" path="/players/leaderboard" />
    </nav>
  );
};
