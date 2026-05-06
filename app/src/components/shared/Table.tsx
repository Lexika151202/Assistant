import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from 'react';

export function Table({ children, className = '', ...rest }: HTMLAttributes<HTMLTableElement> & { children: ReactNode }) {
  return (
    <div className="w-full overflow-x-auto border border-[#e5e7eb] rounded-[10px] bg-white">
      <table className={`w-full text-[14px] ${className}`} {...rest}>
        {children}
      </table>
    </div>
  );
}

export function THead({ children }: { children: ReactNode }) {
  return <thead className="bg-[#f9fafb] text-[#364153] text-left">{children}</thead>;
}

export function TBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-[#e5e7eb]">{children}</tbody>;
}

export function TR({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <tr className={`hover:bg-[#f9fafb] ${className}`}>{children}</tr>;
}

export function TH({ children, className = '', ...rest }: ThHTMLAttributes<HTMLTableCellElement> & { children?: ReactNode }) {
  return (
    <th className={`px-4 py-3 font-semibold text-[12px] uppercase tracking-wide text-[#6a7282] ${className}`} {...rest}>
      {children}
    </th>
  );
}

export function TD({ children, className = '', ...rest }: TdHTMLAttributes<HTMLTableCellElement> & { children?: ReactNode }) {
  return (
    <td className={`px-4 py-3 text-[14px] text-[#0a0a0a] ${className}`} {...rest}>
      {children}
    </td>
  );
}
