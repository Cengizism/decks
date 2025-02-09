'use client';

import Error from '@/components/error/error';
import React from 'react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error, reset }) => {
  return <Error error={error} reset={reset} />;
};

export default ErrorPage;
