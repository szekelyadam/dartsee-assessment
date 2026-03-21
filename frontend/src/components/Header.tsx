import { TopNavigation } from "./TopNavigation";

export const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-[0_12px_40px_rgba(25,28,29,0.06)] flex items-center justify-between px-6 h-16 w-full">
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold tracking-tighter text-[#4441cc]">
          Dartsee
        </span>
      </div>
      <TopNavigation />
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-slate-50 rounded-full active:scale-95 transition-all">
          <span
            className="material-symbols-outlined text-on-surface-variant"
            data-icon="notifications"
          >
            notifications
          </span>
        </button>
        <button className="p-2 hover:bg-slate-50 rounded-full active:scale-95 transition-all">
          <span
            className="material-symbols-outlined text-on-surface-variant"
            data-icon="help"
          >
            help
          </span>
        </button>
        <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-white font-bold text-xs ml-2 overflow-hidden">
          <img
            alt="User profile avatar"
            className="w-full h-full object-cover"
            data-alt="User profile avatar image"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCIpZICf0na1BehGvw_-u1XiARhxwx_ihBBpF7KY_eqcrRX21n83FZMWrMDXN_Lwpg_p4L44e2ALjte3wgNXb9XtssZAxOoo6FL89ovA8a8xU7F7OKXCKqEez8FJ7-rL7J0T1KsEZRJ-Yj2oBEaqXIAtT9Y46NudrgCaKkl1FFxAr7Mex0tuMoEHaaTrSn9Nws59T29wngPGBReB96VUpMmkKkVLhdh7qxVlCIfuOZINXYUSAHf71XeH64EF_G_cUTQJi8NOwYmptV"
          />
        </div>
      </div>
    </header>
  );
};
