import type { ComboOption } from '../interfaces/combobox';

export async function fetchEspecialidades(
  apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3000'
): Promise<ComboOption[]> {
  const res = await fetch(`${apiBase}/specialties`);
  if (!res.ok) return [];
  const data: { value: string; label: string }[] = await res.json();
  return data;
}
