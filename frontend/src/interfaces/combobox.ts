export interface ComboOption {
  value: string;
  label: string;
}

export interface ComboFieldProps {
  label: string;
  id: string;
  required?: boolean;
  options: ComboOption[];
  value?: string | null;
  onChange?: (value: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  noOptionsMessage?: string;
}
