export const getLabelThemeClasses = (index: number): string => {
  const themes = [
    "bg-emerald-100 text-emerald-700 border-emerald-200",
    "bg-indigo-100 text-indigo-700 border-indigo-200",
    "bg-rose-100 text-rose-700 border-rose-200",
    "bg-amber-100 text-amber-800 border-amber-300",
    "bg-purple-100 text-purple-700 border-purple-200",
    "bg-cyan-100 text-cyan-700 border-cyan-200",
    "bg-slate-200 text-slate-700 border-slate-300",
    "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200",
    "bg-teal-100 text-teal-700 border-teal-200",
    "bg-orange-100 text-orange-700 border-orange-200",
  ];

  return themes[index % themes.length];
};

export const getInitials = (name: string): string => {
  return name
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .filter((n) => n.length > 0)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export const getRandomPlayerColor = (): string => {
  const colors = [
    "bg-primary text-white",
    "bg-indigo-100",
    "bg-purple-100",
    "bg-slate-100",
    "bg-slate-200",
    "bg-slate-300",
    "bg-slate-400 text-white",
    "bg-indigo-500 text-white",
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};
