import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'green' | 'gray' | 'orange' | 'red';
  className?: string;
}

export default function Badge({ children, variant = 'blue', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide',
        {
          'bg-blue-100 text-blue-800': variant === 'blue',
          'bg-green-100 text-green-800': variant === 'green',
          'bg-gray-100 text-gray-800': variant === 'gray',
          'bg-orange-100 text-orange-800': variant === 'orange',
          'bg-red-100 text-red-800': variant === 'red',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
