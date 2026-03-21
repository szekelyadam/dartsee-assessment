import { describe, it, expect } from 'vitest';
import { getInitials, getLabelThemeClasses, getRandomPlayerColor } from './helpers';

describe('helpers methods', () => {
  it('should get proper initials without special characters', () => {
    expect(getInitials('Alex "Eagle" V.')).toBe('AEV');
    expect(getInitials('John D.')).toBe('JD');
  });

  it('should successfully loop and distribute cyclical theme classes', () => {
    expect(getLabelThemeClasses(0)).toBe('bg-emerald-100 text-emerald-700 border-emerald-200');
    expect(getLabelThemeClasses(10)).toBe('bg-emerald-100 text-emerald-700 border-emerald-200'); // Checking modulo wraps correctly
    expect(getLabelThemeClasses(1)).toBe('bg-indigo-100 text-indigo-700 border-indigo-200');
  });

  it('should get a random player color strictly from the tailored array pool', () => {
    const color = getRandomPlayerColor();
    expect(typeof color).toBe('string');
    expect(color.length).toBeGreaterThan(0);
    expect(color).toContain('bg-');
  });
});
