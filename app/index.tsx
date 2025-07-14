import React from 'react';
import { EstimateProvider } from '@/src/estimate/context';
import EstimateScreen from '@/src/estimate/EstimateScreen';
import { ErrorBoundary } from '@/src/common/components/ErrorBoundary';
import { ThemeProvider } from '@/src/common/components/ThemeProvider';

export default function Index(): JSX.Element {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <EstimateProvider>
          <EstimateScreen />
        </EstimateProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
