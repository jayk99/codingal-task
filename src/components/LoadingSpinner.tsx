import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center py-8">
    <Loader2 className="h-6 w-6 text-gray-400 animate-spin" />
  </div>
);

export default LoadingSpinner;