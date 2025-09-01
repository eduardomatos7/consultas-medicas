export function formatCpfInput(raw: string): { formatted: string; digits: string } {
  const digits = raw.replace(/\D/g, '').slice(0, 11);
  let formatted = digits;
  if (digits.length > 3) {
    formatted = digits.slice(0, 3) + '.' + digits.slice(3);
  }
  if (digits.length > 6) {
    formatted = formatted.slice(0, 7) + '.' + digits.slice(6);
  }
  if (digits.length > 9) {
    formatted = formatted.slice(0, 11) + '-' + digits.slice(9);
  }
  return { formatted, digits };
}

export function unmaskCpf(masked: string): string {
  return masked.replace(/\D/g, '').slice(0, 11);
}
