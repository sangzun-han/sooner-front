interface PromiseHeaderProps {
  title: string | React.ReactNode;
  description: string;
  subtitle?: string;
}

export default function PromiseHeader({ title, description, subtitle }: PromiseHeaderProps) {
  return (
    <div className="flex flex-col items-start justify-start gap-1">
      <h1 className="text-xl font-bold leading-snug text-primary">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      {subtitle && (
        <p className="mt-2 text-sm bg-primary/80 text-primary-foreground inline-block px-2 py-1 rounded-md">
          {subtitle}
        </p>
      )}
    </div>
  );
}
