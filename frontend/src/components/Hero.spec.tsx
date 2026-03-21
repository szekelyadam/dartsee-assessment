import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Hero } from './Hero';

describe('Hero Component', () => {
  it('should gracefully render the parsed title and description strings into the DOM', () => {
    render(<Hero title="Experimental Header" description="Cutting edge info provided here" />);
    
    expect(screen.getByText('Experimental Header')).toBeInTheDocument();
    expect(screen.getByText('Cutting edge info provided here')).toBeInTheDocument();
  });
});
