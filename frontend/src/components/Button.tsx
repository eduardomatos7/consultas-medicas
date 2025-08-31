import { type ButtonHTMLAttributes } from 'react';
import { Link, type LinkProps } from 'react-router';

type Variant = 'primary' | 'primaryGhost' | 'secondary' | 'ghost';

interface BaseProps {
  variant?: Variant;
  full?: boolean;
  children: React.ReactNode;
  className?: string;
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonLinkProps = BaseProps & LinkProps & { to: string; as?: 'link' };

const variantMap: Record<Variant, string> = {
  primary:
    'bg-gradient-to-b from-[#674ac8] via-[#6a50a7] to-textPink hover:from-textPink hover:via-textPink hover:to-textPink transition ease-out duration-300 text-white shadow-md shadow-background-button/30 hover:shadow-lg',
  primaryGhost:
    'bg-background-button transition ease-out duration-300 hover:bg-[#4b339d] text-white shadow-md shadow-background-button/30 hover:shadow-none',
  secondary:
    'bg-[#D6D3F9] hover:bg-[#C4C1EE] transition ease-out duration-300 text-[#2d1b52] shadow-sm border border-background-button/20',
  ghost:
    'bg-transparent text-background-button transition ease-out duration-300 hover:bg-[#D6D3F9]/50 border border-background-button/30',
};

export function Button({ variant = 'primary', full, className, children, ...rest }: ButtonProps) {
  return (
    <button
      className={`focus:ring-background-button cursor-pointer rounded-md px-5 py-2 text-sm font-semibold tracking-wide transition ${variantMap[variant]} ${full ? 'w-full' : ''} ${className}`}
      {...rest}
      type={rest.type || 'button'}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = 'primary',
  full,
  className,
  children,
  to,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      to={to}
      className={`focus:ring-background-button inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold tracking-wide transition focus:ring-2 focus:ring-offset-2 focus:outline-none ${variantMap[variant]} ${full ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
