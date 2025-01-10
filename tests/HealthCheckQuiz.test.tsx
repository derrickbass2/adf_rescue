import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';
expect.extend({ toBeInTheDocument });
import HealthCheckQuiz from '../app/src/components/HealthCheckQuiz';
import { test, expect } from '@jest/globals';

test('renders the quiz with all sections', () => {
  render(<HealthCheckQuiz />);
  expect(screen.getByText(/AI Implementation Health Check/i)).toBeInTheDocument();
});

test('calculates the correct score and recommendation', () => {
  render(<HealthCheckQuiz />);
  const input = screen.getAllByRole('spinbutton')[0];
  fireEvent.change(input, { target: { value: '5' } });

  const calculateButton = screen.getByText(/Calculate Results/i);
  fireEvent.click(calculateButton);

  expect(screen.getByText(/Total Score:/i)).toBeInTheDocument();
  expect(screen.getByText(/Recommendation:/i)).toBeInTheDocument();
});