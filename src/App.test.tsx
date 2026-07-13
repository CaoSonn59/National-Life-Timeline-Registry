import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from './App';
import { campaignCopy } from './data/campaignCopy';

// Mock window matchMedia and scrollTo
beforeEach(() => {
  window.scrollTo = vi.fn();
});

describe('National Life Timeline Registry Campaign Flow', () => {
  
  it('renders landing page with correct fake system identity', () => {
    render(<App />);
    expect(screen.getByText(campaignCopy.landing.systemName)).toBeInTheDocument();
    expect(screen.getByText(campaignCopy.landing.heading)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: campaignCopy.landing.cta })).toBeInTheDocument();
  });

  it('navigates to form when CHECK MY STATUS is clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: campaignCopy.landing.cta }));
    expect(screen.getByText('Demographic Profile')).toBeInTheDocument();
    expect(screen.getByLabelText(campaignCopy.form.ageLabel)).toBeInTheDocument();
  });

  it('validates form on missing inputs', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: campaignCopy.landing.cta }));
    
    // Form screen
    fireEvent.submit(screen.getByTestId('assessment-form'));
    expect(screen.getByRole('alert')).toHaveTextContent('Please enter a valid age between 18 and 100.');
  });

  it('validates form on incorrect age', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: campaignCopy.landing.cta }));
    
    // Form screen
    const ageInput = screen.getByLabelText(campaignCopy.form.ageLabel);
    fireEvent.change(ageInput, { target: { value: '15' } });
    
    fireEvent.submit(screen.getByTestId('assessment-form'));
    expect(screen.getByRole('alert')).toHaveTextContent('Please enter a valid age between 18 and 100.');
  });

});
