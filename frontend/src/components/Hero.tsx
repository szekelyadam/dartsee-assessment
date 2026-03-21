export type HeroProps = {
  title: string;
  description: string;
};

export const Hero = ({ title, description }: HeroProps) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-12">
        <h1 className="text-[3.5rem] font-bold leading-tight tracking-tight text-on-surface mb-2 font-headline pl-0">
          {title}
        </h1>
        <p className="text-on-surface-variant text-lg pl-0 max-w-2xl">
          {description}
        </p>
      </div>
    </div>
  );
};
