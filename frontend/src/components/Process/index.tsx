import { useState } from 'react';
import './index.css';

const Process = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    { title: 'Week 1: Assessment', details: 'Analyzing organizational needs and challenges in AI adoption.' },
    { title: 'Week 2: Implementation', details: 'Developing tailored AI strategies and training plans.' },
    { title: 'Week 3: Optimization', details: 'Ensuring sustainable integration and measurable outcomes.' },
  ];

  return (
    <section className="process">
      <h2>Our 3-Week Rescue Plan</h2>
      <div className="steps">
        {steps.map((step, index) => (
          <button
            key={step.title}
            className={`step ${activeStep === index ? 'active' : ''}`}
            onClick={() => setActiveStep(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setActiveStep(index);
              }
            }}
            type="button"
            aria-expanded={activeStep === index}
          >
            <h3>{step.title}</h3>
            {activeStep === index && <p>{step.details}</p>}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Process;