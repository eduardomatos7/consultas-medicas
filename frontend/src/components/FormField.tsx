import { type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from 'react';

interface FieldWrapperProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}

function FieldWrapper({ label, htmlFor, children, required }: FieldWrapperProps) {
  return (
    <div className="group flex flex-col gap-1">
      <label
        htmlFor={htmlFor}
        className="group-focus-within:text-textPink text-sm font-medium text-[#2d1b52]"
      >
        {label} {required && <span className="text-textPink">*</span>}
      </label>
      {children}
    </div>
  );
}

export function TextField(props: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, id, required, ...rest } = props;
  return (
    <FieldWrapper label={label} htmlFor={id || ''} required={required}>
      <input
        id={id}
        required={required}
        className="focus:border-textPink focus:ring-textPink rounded-md border border-[#D6D3F9] bg-white px-3 py-2 text-sm shadow-sm transition placeholder:text-[#634DCA]/50 focus:ring-1 focus:outline-none"
        {...rest}
      />
    </FieldWrapper>
  );
}

export function SelectField(props: SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
  const { label, id, required, children, ...rest } = props;
  return (
    <FieldWrapper label={label} htmlFor={id || ''} required={required}>
      <select
        id={id}
        required={required}
        className="focus:border-textPink focus:ring-textPink rounded-md border border-[#D6D3F9] bg-white px-3 py-2 text-sm shadow-sm transition focus:ring-1 focus:outline-none"
        {...rest}
      >
        {children}
      </select>
    </FieldWrapper>
  );
}
