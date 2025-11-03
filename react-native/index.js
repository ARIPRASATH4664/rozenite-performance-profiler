// react-native/index.ts
import React, { useEffect, useRef } from 'react';
import { sendMessageToDevTools } from '@rozenite/runtime';

export function withPerformanceLogger(Wrapped, screenName = 'Unknown') {
  return function PerformanceLoggerHOC(props) {
    const start = useRef(Date.now());

    useEffect(() => {
      const mountTime = Date.now() - start.current;
      sendMessageToDevTools('performance-event', {
        screenName,
        type: 'mount',
        value: mountTime,
        timestamp: Date.now()
      });

      // Optionally wrap with React.Profiler for finer traces:
      // ...

      return () => {
        sendMessageToDevTools('performance-event', {
          screenName,
          type: 'unmount',
          value: Date.now(),
          timestamp: Date.now()
        });
      };
    }, []);

    return <Wrapped {...props} />;
  };
}
