import React, { useState } from 'react';
import './healthCheckQuiz.css'; // Ensure the CSS file is properly included
import { sectionsConfig } from './sectionsConfig'; // Ensure sectionsConfig matches its expected structure

// Define the shape of the `sectionsConfig` for static typing
interface SectionConfig {
  title: string; // Section title
  metrics: string[]; // Array of metric category names
}

// This ensures `sectionsConfig` is an array of `SectionConfig` objects
const HealthCheckQuiz: React.FC = () => {
  // Validate that `sectionsConfig` exists and is properly formatted
  if (!sectionsConfig || !Array.isArray(sectionsConfig)) {
    console.error('Error: sectionsConfig is missing or improperly formatted.');
    return <div>Error loading quiz configuration.</div>;
  }

  // Calculate the total number of metrics and their maximum score
  const totalMetrics = sectionsConfig.reduce(
    (sum, section) => sum + section.metrics.length * 5,
    0
  );

  // State setup
  const [scores, setScores] = useState<number[]>(Array(totalMetrics).fill(0)); // Default scores set to 0
  const [totalScore, setTotalScore] = useState<number | null>(null); // Total score tracker
  const [recommendation, setRecommendation] = useState<string | null>(null); // Recommendation text
  const [error, setError] = useState<string | null>(null); // Error message for validation

  /**
   * Handles changes to score inputs
   * @param index Index in the scores array
   * @param value Input value
   */
  const handleScoreChange = (index: number, value: number) => {
    // Validate input value
    if (value < 1 || value > 5) {
      setError(`Scores must be between 1 and 5. Metric ${index + 1} is invalid.`);
      return;
    }
    setError(null);

    // Update scores immutably
    const updatedScores = [...scores];
    updatedScores[index] = value;
    setScores(updatedScores);
  };

  /**
   * Calculates the total score and sets a recommendation
   */
  const calculateResults = () => {
    const total = scores.reduce((acc, score) => acc + score, 0); // Sum all scores
    setTotalScore(total);

    // Recommendation logic based on the percentage of maximum score
    if (total >= totalMetrics * 0.75) {
      setRecommendation('Healthy implementation with minor adjustments needed.');
    } else if (total >= totalMetrics * 0.5) {
      setRecommendation('Implementation at risk - requires strategic intervention.');
    } else {
      setRecommendation('Critical intervention required - significant recovery needed.');
    }
  };

  return (
    <section className="health-check-quiz">
      <h2>AI Implementation Health Check</h2>

      {sectionsConfig.map((section: SectionConfig, sectionIndex: number) => (
        <div key={sectionIndex} className="quiz-section">
          <h3>{section.title}</h3>
          {section.metrics.map((metricCategory, metricIndex) => (
            <div key={metricIndex} className="metric-category">
              <h4>{metricCategory}</h4>

              {/* Render five metrics (1-5) for each category */}
              {[...Array(5)].map((_, questionIndex) => {
                const calculatedMetricIndex =
                  sectionIndex * 15 + metricIndex * 5 + questionIndex; // Calculate the metric index

                return (
                  <div key={questionIndex} className="metric-item">
                    <label
                      htmlFor={`metric-${sectionIndex}-${metricIndex}-${questionIndex}`}
                    >
                      Metric {calculatedMetricIndex + 1} (1-5):
                    </label>
                    <input
                      id={`metric-${sectionIndex}-${metricIndex}-${questionIndex}`}
                      type="number"
                      min="1"
                      max="5"
                      value={scores[calculatedMetricIndex] || ''} // Controlled input value
                      aria-label={`Metric ${metricCategory}`}
                      aria-describedby="error-message"
                      onChange={(e) =>
                        handleScoreChange(calculatedMetricIndex, parseInt(e.target.value) || 0)
                      }
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ))}

      {/* Display validation error */}
      {error && (
        <div id="error-message" className="error-message">
          {error}
        </div>
      )}

      <button onClick={calculateResults} className="calculate-btn">
        Calculate Results
      </button>

      {/* Display results and recommendations */}
      {totalScore !== null && (
        <div className="results">
          <h3>
            Total Score: {totalScore}/{totalMetrics * 5}
          </h3>
          <p>Recommendation: {recommendation}</p>
        </div>
      )}
    </section>
  );
};

export default HealthCheckQuiz;