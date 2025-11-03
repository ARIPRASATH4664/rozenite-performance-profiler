import * as React from 'react';

export function withPerformanceLogger<P>(
  Component: React.ComponentType<P>,
  screenName?: string
): React.FC<P>;

export const PerformanceProvider: React.FC<{ children: React.ReactNode }>;