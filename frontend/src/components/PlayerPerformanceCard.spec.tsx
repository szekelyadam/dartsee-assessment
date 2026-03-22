import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PlayerPerformanceCard } from './PlayerPerformanceCard';

const mockPlayer = {
  id: "p1",
  name: "Marcus Thorne",
  averageScorePerRound: 84.2,
  missCount: 3
};

describe('PlayerPerformanceCard Component', () => {
  it('should render detailed player performance statistics correctly', () => {
    render(<PlayerPerformanceCard player={mockPlayer} />);
    
    // Validates Name 
    expect(screen.getByText('Marcus Thorne')).toBeInTheDocument();
    
    // Validates dynamically generated Initials
    expect(screen.getByText('MT')).toBeInTheDocument();
    
    // Validates Average Score formatting
    expect(screen.getByText('Avg. Score Per Round')).toBeInTheDocument();
    expect(screen.getByText('84.2')).toBeInTheDocument();
    
    // Validates Miss Count formatting
    expect(screen.getByText('Misses')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
