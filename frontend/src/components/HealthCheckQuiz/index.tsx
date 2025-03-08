import React, { useState } from 'react';
import './index.css';
import sectionsConfig from '../../components/sectionsConfig';
import MetricItem from './MetricItem';

interface SectionConfig {
  title: string;
  metrics: string[];
}

// This ensures `sectionsConfig` is an array of `SectionConfig` objects
const HealthCheckQuiz: React.FC = () => {
  // Calculate the total number of metrics and their maximum score
  const totalMetrics = sectionsConfig.reduce(
    (sum: number, section: SectionConfig) => sum + section.metrics.length * 5,
    0
  );

  // State setup
  const [scores, setScores] = useState<number[]>(Array(totalMetrics).fill(0)); // Default scores set to 0
  const [totalScore, setTotalScore] = useState<number | null>(null); // Total score tracker
  const [recommendation, setRecommendation] = useState<string | null>(null); // Recommendation text
  const [error, setError] = useState<string | null>(null); // Error message for validation

  // Validate that `sectionsConfig` exists and is properly formatted
  if (!sectionsConfig || !Array.isArray(sectionsConfig)) {
    console.error('Error: sectionsConfig is missing or improperly formatted.');
    return <div>Error loading quiz configuration.</div>;
  }

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
        <div key={`section-${section.title}`} className="quiz-section">
          <h3>{section.title}</h3>
          {section.metrics.map((metricCategory, metricIndex) => (
            <div key={`metric-${section.title}-${metricCategory}`} className="metric-category">
              <h4>{metricCategory}</h4>
              {[...Array(5)].map((_, questionIndex) => {
                const calculatedMetricIndex = sectionIndex * 15 + metricIndex * 5 + questionIndex;
                return (
                  <MetricItem
                    key={`question-${section.title}-${metricCategory}-${questionIndex}`}
                    calculatedMetricIndex={calculatedMetricIndex}
                    score={scores[calculatedMetricIndex]}
                    onScoreChange={handleScoreChange} />
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