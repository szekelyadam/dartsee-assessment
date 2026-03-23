export type HeroProps = {
  title: string;
  description: string;
  label?: string;
};

export const Hero = ({ title, description, label }: HeroProps) => {
  return (
    <header className="mb-12 text-center md:text-left">
      {label && (
        <div className="mb-2 flex flex-col justify-center gap-3 md:flex-row md:items-center md:justify-start">
          <span className="bg-secondary-container text-on-secondary-container inline-block w-fit rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
            {label}
          </span>
        </div>
      )}
      <h1 className="text-on-surface mb-4 text-5xl font-bold tracking-tight md:text-6xl">
        {title}
      </h1>
      <p className="text-on-surface-variant mx-auto max-w-2xl text-lg leading-relaxed md:mx-0">
        {description}
      </p>
    </header>
  );
};
