import PerformancePanel from './src/PerformancePanel';

export default {
  name: 'performance-plugin',
  title: 'Performance Tracker',
  panels: [
    {
      id: 'performance-panel',
      label: 'Performance Tracker',
      component: PerformancePanel,
    },
  ],
};
