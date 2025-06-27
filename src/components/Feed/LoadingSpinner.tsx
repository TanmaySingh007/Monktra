import { motion } from 'motion/react';
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-2" data-id="idgd5570c" data-path="src/components/Feed/LoadingSpinner.tsx">
      <motion.div
        className="w-2 h-2 bg-blue-500 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: 0
        }} data-id="ic82zqwpr" data-path="src/components/Feed/LoadingSpinner.tsx" />

      <motion.div
        className="w-2 h-2 bg-blue-500 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: 0.2
        }} data-id="p1nybv6bh" data-path="src/components/Feed/LoadingSpinner.tsx" />

      <motion.div
        className="w-2 h-2 bg-blue-500 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: 0.4
        }} data-id="uw80juw8d" data-path="src/components/Feed/LoadingSpinner.tsx" />

      <span className="ml-3 text-sm text-gray-600 dark:text-gray-400" data-id="v5u4d0abj" data-path="src/components/Feed/LoadingSpinner.tsx">
        Loading content...
      </span>
    </div>);

};

export default LoadingSpinner;