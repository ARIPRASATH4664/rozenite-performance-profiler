// src/usePerformanceEvents.ts (optional abstraction)
import { useRozeniteDevToolsClient } from '@rozenite/plugin-bridge';
import { useEffect } from 'react';
import { PerformanceEvent } from './PerformancePanel';

export function usePerformanceEvents(handler: (event: unknown) => void) {
  const client = useRozeniteDevToolsClient({ pluginId: 'my-performance-plugin' });
  useEffect(() => {
    if(!client) return;
    client.onMessage('performance-event', handler);
    return () => client.close();
  }, []);
}
