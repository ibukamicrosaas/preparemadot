import { cn } from '@/lib/utils';

type Props = {
  label?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
  className?: string;
};

export default function SectionHeader({ label, title, subtitle, center = true, light = false, className }: Props) {
  return (
    <div className={cn('space-y-3', center && 'text-center', className)}>
      {label && (
        <span className={cn(
          'inline-block text-xs font-semibold tracking-widest uppercase',
          light ? 'text-or/80' : 'text-or'
        )}>
          {label}
        </span>
      )}
      <h2 className={cn(
        'font-serif text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight',
        light ? 'text-ivoire' : 'text-bordeaux-dark'
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'text-base md:text-lg leading-relaxed max-w-2xl',
          center && 'mx-auto',
          light ? 'text-beige/70' : 'text-brun-light'
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
