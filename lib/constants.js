export const MEALS = ['breakfast', 'lunch', 'dinner', 'snack'];

export const FOOD_CATS = [
  { id: 'Fruit', icon: '🍎' },
  { id: 'Vegetable', icon: '🥦' },
  { id: 'Grain', icon: '🍚' },
  { id: 'Protein', icon: '🥚' },
  { id: 'Dairy', icon: '🧀' },
  { id: 'Other', icon: '🍽️' },
];
export const catIcon = (c) => FOOD_CATS.find((f) => f.id === c)?.icon || '🍽️';

// Built-in foods use a key so they display in each person's language.
export const DEFAULT_FOODS = [
  { key: 'rice', category: 'Grain', icon: '🍚' },
  { key: 'porridge', category: 'Grain', icon: '🥣' },
  { key: 'noodles', category: 'Grain', icon: '🍜' },
  { key: 'bread', category: 'Grain', icon: '🍞' },
  { key: 'egg', category: 'Protein', icon: '🥚' },
  { key: 'chicken', category: 'Protein', icon: '🍗' },
  { key: 'fish', category: 'Protein', icon: '🐟' },
  { key: 'pork', category: 'Protein', icon: '🥩' },
  { key: 'tofu', category: 'Protein', icon: '🫘' },
  { key: 'banana', category: 'Fruit', icon: '🍌' },
  { key: 'apple', category: 'Fruit', icon: '🍎' },
  { key: 'blueberries', category: 'Fruit', icon: '🫐' },
  { key: 'broccoli', category: 'Vegetable', icon: '🥦' },
  { key: 'carrot', category: 'Vegetable', icon: '🥕' },
  { key: 'spinach', category: 'Vegetable', icon: '🥬' },
  { key: 'sweetpotato', category: 'Vegetable', icon: '🍠' },
  { key: 'yoghurt', category: 'Dairy', icon: '🥛' },
  { key: 'cheese', category: 'Dairy', icon: '🧀' },
];

export const foodIcon = (f) => DEFAULT_FOODS.find((d) => d.key === f.key)?.icon || catIcon(f.category);
export const foodName = (f, t) => (f.key ? t(`f_${f.key}`) : f.name);
export const foodId = (f) => (f.key ? `k:${f.key}` : `n:${(f.name || '').trim().toLowerCase()}`);

export const AMOUNTS = ['little', 'half', 'most', 'all'];

// 'dirty' and 'mixed' are kept as stored values for compatibility; shown as Poo / Wet + poo.
export const DIAPER_KINDS = ['wet', 'dirty', 'mixed', 'dry'];
export const DIAPER_LABEL = { wet: 'wet', dirty: 'poo', mixed: 'both', dry: 'dry' };
export const isPoo = (k) => k === 'dirty' || k === 'mixed';

export const CONSISTENCY = ['Runny', 'Soft', 'Solid', 'Hard'];
export const COLOURS = [
  { id: 'Yellow', hex: '#E9B930' },
  { id: 'Brown', hex: '#8A5A2B' },
  { id: 'Green', hex: '#6E8B3D' },
  { id: 'Black', hex: '#2A2A2A' },
  { id: 'Red', hex: '#B83A32' },
  { id: 'White', hex: '#F2EFE6' },
];
export const WARN_COLOURS = ['Red', 'Black', 'White'];

export const guessMeal = (d = new Date()) => {
  const h = d.getHours();
  if (h < 10) return 'breakfast';
  if (h >= 11 && h < 14) return 'lunch';
  if (h >= 17 && h < 20) return 'dinner';
  return 'snack';
};
