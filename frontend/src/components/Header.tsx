import { TopNavigation } from "./TopNavigation";

export const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-[0_12px_40px_rgba(25,28,29,0.06)] flex items-center justify-start px-6 h-16 w-full">
      <div className="flex items-center gap-4 mr-6">
        <span className="text-xl font-bold tracking-tighter text-[#4441cc]">
          Dartsee
        </span>
      </div>
      <TopNavigation />
    </header>
  );
};
