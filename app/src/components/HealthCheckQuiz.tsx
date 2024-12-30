import React, { useState } from 'react';
import './healthCheckQuiz.css';
import { sectionsConfig } from './sectionsConfig';

const HealthCheckQuiz = () => {
  const totalMetrics = sectionsConfig.reduce(
    (sum, section) => sum + section.metrics.length * 5,
    0
  );

  const [scores, setScores] = useState<number[]>(Array(totalMetrics).fill(0));
  const [totalScore, setTotalScore] = useState<number | null>(null);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScoreChange = (index: number, value: number) => {
    if (value < 1 || value > 5) {
      setError('Please enter a value between 1 and 5.');
      return;
    }
    setError(null);

    const newScores = [...scores];
    newScores[index] = value;
    setScores(newScores);
  };

  const calculateResults = () => {
    const total = scores.reduce((acc, score) => acc + score, 0);
    setTotalScore(total);

    if (total >= 75) {
      setRecommendation('Healthy implementation with minor adjustments needed.');
    } else if (total >= 50) {
      setRecommendation('Implementation at risk - requires strategic intervention.');
    } else {
      setRecommendation('Critical intervention required - significant recovery needed.');
    }
  };

  return (
    <section className="health-check-quiz">
      <h2>AI Implementation Health Check</h2>
      {sectionsConfig.map((section, sectionIndex) => (
        <div key={sectionIndex} className="quiz-section">
          <h3>{section.title}</h3>
          {section.metrics.map((metricCategory, metricIndex) => (
            <div key={metricIndex} className="metric-category">
              <h4>{metricCategory}</h4>
              {[...Array(5)].map((_, questionIndex) => (
                <div key={questionIndex} className="metric-item">
                  <label htmlFor={`metric-${sectionIndex}-${metricIndex}-${questionIndex}`}>
                    Metric {metricIndex * 5 + questionIndex + 1} (1-5):{' '}
                  </label>
                  <input
                    id={`metric-${sectionIndex}-${metricIndex}-${questionIndex}`}
                    type="number"
                    min="1"
                    max="5"
                    aria-label={`Metric ${metricCategory}`}
                    value={scores[sectionIndex * 15 + metricIndex * 5 + questionIndex] || ''}
                    onChange={(e) =>
                      handleScoreChange(
                        sectionIndex * 15 + metricIndex * 5 + questionIndex,
                        parseInt(e.target.value) || 0
                      )
                    }
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
      {error && <div className="error-message">{error}</div>}
      <button onClick={calculateResults} className="calculate-btn">
        Calculate Results
      </button>
      {totalScore !== null && (
        <div className="results">
          <h3>Total Score: {totalScore}/{totalMetrics * 5}</h3>
          <p>Recommendation: {recommendation}</p>
        </div>
      )}
    </section>
  );
};

export default HealthCheckQuiz;