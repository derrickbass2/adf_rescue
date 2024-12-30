import { render, screen, fireEvent } from '@testing-library/react';
<<<<<<< HEAD
import HealthCheckQuiz from '/Users/dbass/Documents/GitHub/adf_rescue/app/src/components/HealthCheckQuiz.tsx'
import * as test from "node:test";
=======
import HealthCheckQuiz from './HealthCheckQuiz';
>>>>>>> 5020fce (Set up project structure and initialize key components)

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