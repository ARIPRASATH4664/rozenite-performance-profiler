// src/PerformancePanel.tsx
import React, { useEffect } from 'react';
import { PerformanceProvider, usePerformanceContext, PerformanceEvent } from './PerformanceContext';
import { useRozeniteDevToolsClient } from '@rozenite/plugin-bridge';

export type PerformanceEvent = {
  screenName: string;
  type: string;
  value: number;
  timestamp: number;
};

function isPerformanceEvent(obj: any): obj is PerformanceEvent {
  return (
    obj &&
    typeof obj.screenName === "string" &&
    typeof obj.type === "string" &&
    typeof obj.value === "number" &&
    typeof obj.timestamp === "number"
  );
}



const PerformanceDisplay: React.FC = () => {
  const { events, addEvent, clearEvents } = usePerformanceContext();

  useEffect(() => {
    // Subscribe to incoming messages from Rozenite
    const client = useRozeniteDevToolsClient({ pluginId: 'performance-plugin' });
    if(!client) return;
    client.onMessage('performance-event', (payload: unknown) => {
      if (isPerformanceEvent(payload)) addEvent(payload);
    });
    return () => client.close();
  }, [addEvent]);

  return (
    <div>
      <button onClick={clearEvents}>Clear Events</button>
      <table>
        <thead>
          <tr>
            <th>Screen</th>
            <th>Type</th>
            <th>Value (ms)</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e, i) => (
            <tr key={i}>
              <td>{e.screenName}</td>
              <td>{e.type}</td>
              <td>{e.value}</td>
              <td>{new Date(e.timestamp).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Wrap your main panel:
const PerformancePanel: React.FC = () => (
  <PerformanceProvider>
    <PerformanceDisplay />
  </PerformanceProvider>
);

export default PerformancePanel;
