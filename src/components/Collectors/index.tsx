// /Users/dbass/Documents/GitHub/adf_rescue/src/components/Collectors/index.tsx
import React, { useState } from 'react';
import './index.css';

interface DataCollectorProps {
  title: string;
  dataPrefix: string;
}

const DataCollectorComponent = ({ title, dataPrefix }: DataCollectorProps) => {
  const [data, setData] = useState<string[]>([]);

  const collectData = () => {
    setData([...data, `${dataPrefix} data point ${data.length + 1}`]);
  };

  return (
    <div className={`${dataPrefix.toLowerCase()}-data-collector`}>
      <h2>{title}</h2>
      <button onClick={collectData}>Collect {title}</button>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

interface DataCollectorInterface {
  collect(organizationId: string): Promise<any>;
}

export class UsageDataCollector implements DataCollectorInterface {
  collect(): Promise<void> {
    return new Promise((resolve) => {
      resolve(undefined);
    });
  }
}

export class AdoptionDataCollector implements DataCollectorInterface {
  collect(): Promise<any> {
    return new Promise((resolve) => {
      resolve(undefined);
    });
  }
}

export class ResistanceDataCollector implements DataCollectorInterface {
  collect(): Promise<any> {
    return new Promise((resolve) => {
      resolve(undefined);
    });
  }
}

export class SuccessDataCollector implements DataCollectorInterface {
  collect(): Promise<any> {
    return new Promise((resolve) => {
      resolve(undefined);
    });
  }
}

export const UsageDataCollectorComponent = () => (
  <DataCollectorComponent title="Usage Data Collector" dataPrefix="Usage" />
);

export const AdoptionDataCollectorComponent = () => (
  <DataCollectorComponent title="Adoption Data Collector" dataPrefix="Adoption" />
);

export const ResistanceDataCollectorComponent = () => (
  <DataCollectorComponent title="Resistance Data Collector" dataPrefix="Resistance" />
);

export const SuccessDataCollectorComponent = () => (
  <DataCollectorComponent title="Success Data Collector" dataPrefix="Success" />
);

// Main Collectors component that combines all collectors
const Collectors: React.FC = () => {
  return (
    <div className="collectors-container">
      <h1>Data Collectors</h1>
      <div className="collectors-grid">
        <UsageDataCollectorComponent />
        <AdoptionDataCollectorComponent />
        <ResistanceDataCollectorComponent />
        <SuccessDataCollectorComponent />
      </div>
    </div>
  );
};

export default Collectors;