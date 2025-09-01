import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { useState, type ReactNode } from 'react';
import { FiChevronDown, FiX, FiCheck } from 'react-icons/fi';

import type { ComboFieldProps } from '../interfaces/combobox';

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

export function ComboField({
  label,
  id,
  required,
  options,
  value,
  onChange,
  placeholder,
  disabled,
  clearable = true,
  noOptionsMessage = 'Nenhuma opção',
}: ComboFieldProps) {
  const [query, setQuery] = useState('');
  const [forceOpen, setForceOpen] = useState(false);

  const filtered =
    query === ''
      ? options
      : options.filter(o => o.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <FieldWrapper label={label} htmlFor={id} required={required}>
      <Combobox
        value={value}
        onChange={(v: string | null) => {
          onChange?.(v);
          // Reset filtro para mostrar lista completa na próxima abertura
          setQuery('');
          setForceOpen(false);
        }}
        disabled={disabled}
      >
        {({ open }) => (
          <div className="relative">
            <ComboboxInput
              id={id}
              required={required}
              className="focus:border-textPink focus:ring-textPink w-full rounded-md border border-[#D6D3F9] bg-white px-3 py-2 pr-16 text-sm shadow-sm transition outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-60"
              displayValue={(val: unknown) => {
                if (typeof val === 'string') {
                  return options.find(o => o.value === val)?.label || '';
                }
                return '';
              }}
              onChange={e => {
                const text = e.target.value;
                setQuery(text);
                // Se já havia seleção e o usuário digitou algo novo, limpamos a seleção
                if (value != null && value !== '') {
                  onChange?.(null);
                }
              }}
              placeholder={placeholder}
              onFocus={() => setForceOpen(true)}
              onClick={() => setForceOpen(true)}
              onBlur={() => setTimeout(() => setForceOpen(false), 120)}
            />
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center gap-1 text-[#6b628a]">
              <FiChevronDown
                aria-hidden
                className={`h-4 w-4 transition-transform ${open || forceOpen ? 'rotate-180' : ''}`}
              />
            </div>
            {clearable && !disabled && value != null && value !== '' && (
              <button
                type="button"
                onClick={() => {
                  onChange?.(null);
                  setQuery(''); // limpa filtro
                  setForceOpen(true); // mantém lista aberta para nova seleção
                }}
                className="hover:text-textPink absolute inset-y-0 right-8 my-auto h-5 w-5 rounded-full text-[#6b628a] focus:outline-none"
                aria-label="Limpar seleção"
              >
                <FiX className="h-4 w-4" aria-hidden />
              </button>
            )}
            <ComboboxOptions
              static
              className={`${open || forceOpen ? '' : 'hidden'} absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-md border border-[#E4E0FA] bg-white py-1 text-sm shadow-lg focus:outline-none`}
            >
              {filtered.length === 0 && (
                <div className="px-3 py-2 text-[#6b628a]">{noOptionsMessage}</div>
              )}
              {filtered.map(opt => (
                <ComboboxOption
                  key={opt.value}
                  value={opt.value}
                  className={({ active, selected }) =>
                    `cursor-pointer px-3 py-2 transition ${
                      active ? 'bg-textPink/10 text-textPink' : 'text-[#2d1b52]'
                    } ${selected ? 'font-medium' : ''}`
                  }
                >
                  {({ selected }) => (
                    <div className="flex items-center justify-between gap-2">
                      <span>{opt.label}</span>
                      {selected && <FiCheck className="text-textPink h-4 w-4" aria-hidden />}
                    </div>
                  )}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          </div>
        )}
      </Combobox>
    </FieldWrapper>
  );
}

export default ComboField;
