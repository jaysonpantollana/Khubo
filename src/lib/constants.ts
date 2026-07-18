export const BUDGET_RANGES = [
  { min: 1000, max: 2000, label: '₱1k - ₱2k' },
  { min: 2000, max: 3000, label: '₱2k - ₱3k' },
  { min: 3000, max: 4000, label: '₱3k - ₱4k' },
  { min: 4000, max: 5000, label: '₱4k - ₱5k' },
  { min: 5000, max: 6000, label: '₱5k - ₱6k' },
  { min: 6000, max: 7000, label: '₱6k - ₱7k' },
  { min: 7000, max: 8000, label: '₱7k - ₱8k' },
  { min: 8000, max: 9000, label: '₱8k - ₱9k' },
  { min: 9000, max: 10000, label: '₱9k - ₱10k' },
  { min: 10000, max: Infinity, label: '₱10k+' },
];

/** Parse a budget range string like "P2500-P3000" or "₱2,500 - ₱3,000" into min/max numbers. */
export function parseBudgetRange(range: string): { min: number; max: number } | null {
  const cleaned = range.replace(/₱/g, '').replace(/P/gi, '').replace(/,/g, '');
  const parts = cleaned.split('-').map(s => parseInt(s.trim(), 10));
  if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
    return { min: parts[0], max: parts[1] };
  }
  if (parts.length === 1 && !isNaN(parts[0])) {
    return { min: parts[0], max: parts[0] };
  }
  return null;
}

export const BARANGAY_LOCATIONS = [
  'Abuno', 'Acmac', 'Bagong Silang', 'Bonbonon', 'Bunawan', 'Buru-un',
  'Dalipuga', 'Del Carmen', 'Digkilaan', 'Ditucalan', 'Dulag',
  'Hinaplanon', 'Hindang', 'Kabacsanan', 'Kalilangan', 'Kiwalan',
  'Lanipao', 'Luinab', 'Mahayahay', 'Mainit', 'Mandulog',
  'Maria Cristina', 'Palao', 'Panoroganan', 'Poblacion', 'Puga-an',
  'Rogongon', 'San Miguel', 'San Roque', 'Santa Elena', 'Santa Filomena',
  'Santiago', 'Santo Rosario', 'Saray', 'Suarez', 'Tambacan', 'Tibanga',
  'Tipanoy', 'Tomas L. Cabili', 'Tubod', 'Ubaldo Laya',
  'Upper Hinaplanon', 'Upper Tominobo', 'Villa Verde'
];

export const DEFAULT_FILTERS = {
  minPrice: 0,
  maxPrice: 50000,
  minRating: 0,
  sortBy: 'relevance' as const,
};
