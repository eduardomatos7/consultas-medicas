import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
} from 'react';

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

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, id, required, error, className, ...rest }, ref) => {
    return (
      <FieldWrapper label={label} htmlFor={id || ''} required={required}>
        <input
          id={id}
          ref={ref}
          aria-invalid={!!error || undefined}
          required={required}
          className={`focus:border-textPink focus:ring-textPink rounded-md border bg-white px-3 py-2 text-sm shadow-sm transition placeholder:text-[#634DCA]/50 focus:ring-1 focus:outline-none ${error ? 'border-red-400' : 'border-[#D6D3F9]'} ${className || ''}`}
          {...rest}
        />
        {error && (
          <span className="mt-1 text-xs font-medium text-red-500" role="alert">
            {error}
          </span>
        )}
      </FieldWrapper>
    );
  }
);
TextField.displayName = 'TextField';

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
