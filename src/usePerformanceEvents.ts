// src/usePerformanceEvents.ts (optional abstraction)
import { useRozeniteDevToolsClient } from '@rozenite/devtools-bridge';
import { useEffect } from 'react';
import { PerformanceEvent } from './PerformancePanel';

export function usePerformanceEvents(handler: (event: PerformanceEvent) => void) {
  const client = useRozeniteDevToolsClient({ pluginId: 'my-performance-plugin' });
  useEffect(() => {
    client.onMessage('performance-event', handler);
    return () => client.close();
  }, []);
}
