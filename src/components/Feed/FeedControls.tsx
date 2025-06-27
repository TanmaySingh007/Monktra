import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Filter, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';

interface FeedControlsProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  onRefresh: () => void;
  loading: boolean;
}

const FeedControls: React.FC<FeedControlsProps> = ({
  selectedCategories,
  onCategoryChange,
  onRefresh,
  loading
}) => {
  const availableCategories = [
  'technology',
  'business',
  'entertainment',
  'sports',
  'science',
  'health',
  'politics',
  'travel'];


  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border dark:border-gray-700" data-id="4j8srxpu4" data-path="src/components/Feed/FeedControls.tsx">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" data-id="f1d1ol7gy" data-path="src/components/Feed/FeedControls.tsx">
        {/* Category Filters */}
        <div className="flex-1" data-id="x0m7k61c6" data-path="src/components/Feed/FeedControls.tsx">
          <div className="flex items-center space-x-2 mb-3" data-id="kd3h78xkw" data-path="src/components/Feed/FeedControls.tsx">
            <Filter className="h-4 w-4 text-gray-500" data-id="gw1as9qaj" data-path="src/components/Feed/FeedControls.tsx" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300" data-id="gntbaf7pk" data-path="src/components/Feed/FeedControls.tsx">
              Categories:
            </span>
          </div>
          <div className="flex flex-wrap gap-2" data-id="lvu7q2mn7" data-path="src/components/Feed/FeedControls.tsx">
            {availableCategories.map((category) => {
              const isSelected = selectedCategories.includes(category);
              return (
                <motion.div
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }} data-id="ze0zwe958" data-path="src/components/Feed/FeedControls.tsx">

                  <Badge
                    variant={isSelected ? "default" : "outline"}
                    className={`cursor-pointer transition-colors capitalize ${
                    isSelected ?
                    'bg-blue-500 hover:bg-blue-600 text-white' :
                    'hover:bg-gray-100 dark:hover:bg-gray-700'}`
                    }
                    onClick={() => toggleCategory(category)} data-id="teawou95g" data-path="src/components/Feed/FeedControls.tsx">

                    {category}
                  </Badge>
                </motion.div>);

            })}
          </div>
        </div>

        {/* Refresh Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }} data-id="wjdgshrxq" data-path="src/components/Feed/FeedControls.tsx">

          <Button
            onClick={onRefresh}
            disabled={loading}
            variant="outline"
            className="flex items-center space-x-2 min-w-[120px]" data-id="7d54yuzx9" data-path="src/components/Feed/FeedControls.tsx">

            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} data-id="5tseneo83" data-path="src/components/Feed/FeedControls.tsx" />
            <span data-id="gs5t03pdt" data-path="src/components/Feed/FeedControls.tsx">{loading ? 'Loading...' : 'Refresh'}</span>
          </Button>
        </motion.div>
      </div>

      {/* Selected Categories Summary */}
      <div className="mt-3 pt-3 border-t dark:border-gray-700" data-id="1fth0do3b" data-path="src/components/Feed/FeedControls.tsx">
        <p className="text-sm text-gray-600 dark:text-gray-400" data-id="6sa9c6t37" data-path="src/components/Feed/FeedControls.tsx">
          Showing content from{' '}
          <span className="font-medium text-gray-900 dark:text-white" data-id="hnuf374af" data-path="src/components/Feed/FeedControls.tsx">
            {selectedCategories.length}
          </span>{' '}
          {selectedCategories.length === 1 ? 'category' : 'categories'}
          {selectedCategories.length > 0 &&
          <>
              :{' '}
              <span className="capitalize" data-id="m80i62ob7" data-path="src/components/Feed/FeedControls.tsx">
                {selectedCategories.join(', ')}
              </span>
            </>
          }
        </p>
      </div>
    </div>);

};

export default FeedControls;