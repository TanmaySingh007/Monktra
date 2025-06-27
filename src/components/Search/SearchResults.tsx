import ContentCard from '@/components/Feed/ContentCard';
import LoadingSpinner from '@/components/Feed/LoadingSpinner';
import { Badge } from '@/components/ui/badge';
import { useAppSelector } from '@/hooks/useRedux';
import { Clock, FileText, Search } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';

interface SearchResultsProps {
  query: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query }) => {
  const { searchResults, searchLoading, searchError } = useAppSelector((state) => state.feed);

  if (searchLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12" data-id="lkwgwyfxn" data-path="src/components/Search/SearchResults.tsx">
        <LoadingSpinner data-id="9i9f2tmcy" data-path="src/components/Search/SearchResults.tsx" />
        <p className="mt-4 text-muted-foreground" data-id="383jv3v77" data-path="src/components/Search/SearchResults.tsx">Searching for "{query}"...</p>
      </div>);

  }

  if (searchError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12" data-id="d34th59zx" data-path="src/components/Search/SearchResults.tsx">

        <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" data-id="zrp9t906y" data-path="src/components/Search/SearchResults.tsx" />
        <h3 className="text-lg font-semibold mb-2" data-id="blby7pt76" data-path="src/components/Search/SearchResults.tsx">Search Error</h3>
        <p className="text-red-500" data-id="zgrvrd0xs" data-path="src/components/Search/SearchResults.tsx">{searchError}</p>
      </motion.div>);

  }

  if (!query.trim()) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16" data-id="l6bbjh7hf" data-path="src/components/Search/SearchResults.tsx">

        <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" data-id="20m2max4e" data-path="src/components/Search/SearchResults.tsx" />
        <h3 className="text-xl font-semibold mb-2" data-id="g6u17zr2e" data-path="src/components/Search/SearchResults.tsx">Start Searching</h3>
        <p className="text-muted-foreground" data-id="9402ccuqt" data-path="src/components/Search/SearchResults.tsx">
          Enter a search term to find content across all categories
        </p>
      </motion.div>);

  }

  // Group results by type
  const resultsByType = searchResults.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, typeof searchResults>);

  const typeColors = {
    news: 'bg-blue-500',
    movie: 'bg-purple-500',
    music: 'bg-green-500',
    social: 'bg-orange-500'
  };

  const typeIcons = {
    news: '📰',
    movie: '🎬',
    music: '🎵',
    social: '📱'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6" data-id="ytt2a1oix" data-path="src/components/Search/SearchResults.tsx">

      {/* Search Header */}
      <div className="space-y-2" data-id="8a6ydywau" data-path="src/components/Search/SearchResults.tsx">
        <div className="flex items-center gap-3" data-id="f7yhw4d53" data-path="src/components/Search/SearchResults.tsx">
          <Search className="h-6 w-6 text-primary" data-id="xiufmhc7s" data-path="src/components/Search/SearchResults.tsx" />
          <h1 className="text-2xl font-bold" data-id="cwtrf4t15" data-path="src/components/Search/SearchResults.tsx">Search Results</h1>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground" data-id="l0jbh5rnx" data-path="src/components/Search/SearchResults.tsx">
          <FileText className="h-4 w-4" data-id="j8jlkenmt" data-path="src/components/Search/SearchResults.tsx" />
          <span data-id="arcenmcro" data-path="src/components/Search/SearchResults.tsx">
            {searchResults.length} results for "{query}"
          </span>
          <Badge variant="outline" className="ml-2" data-id="icwyxnf78" data-path="src/components/Search/SearchResults.tsx">
            <Clock className="h-3 w-3 mr-1" data-id="asaivold9" data-path="src/components/Search/SearchResults.tsx" />
            Just now
          </Badge>
        </div>
      </div>

      {/* Results Summary */}
      {Object.keys(resultsByType).length > 0 &&
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-2 mb-6" data-id="aw7xmef87" data-path="src/components/Search/SearchResults.tsx">

          {Object.entries(resultsByType).map(([type, items]) =>
        <Badge
          key={type}
          variant="secondary"
          className={`${typeColors[type as keyof typeof typeColors]} text-white capitalize`} data-id="7ts3xgmwr" data-path="src/components/Search/SearchResults.tsx">

              <span className="mr-1" data-id="1tjpi6bbv" data-path="src/components/Search/SearchResults.tsx">{typeIcons[type as keyof typeof typeIcons]}</span>
              {type} ({items.length})
            </Badge>
        )}
        </motion.div>
      }

      {/* Search Results */}
      {searchResults.length === 0 ?
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center py-16" data-id="tfev5naza" data-path="src/components/Search/SearchResults.tsx">

          <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" data-id="aa19t28up" data-path="src/components/Search/SearchResults.tsx" />
          <h3 className="text-xl font-semibold mb-2" data-id="p2pe559iu" data-path="src/components/Search/SearchResults.tsx">No results found</h3>
          <p className="text-muted-foreground mb-4" data-id="o8fa45uvr" data-path="src/components/Search/SearchResults.tsx">
            Try adjusting your search terms or check the spelling
          </p>
          <div className="flex flex-wrap justify-center gap-2" data-id="s57mlvwge" data-path="src/components/Search/SearchResults.tsx">
            <Badge variant="outline" data-id="fvan3fbjj" data-path="src/components/Search/SearchResults.tsx">Try: "technology"</Badge>
            <Badge variant="outline" data-id="x5ghkr5ko" data-path="src/components/Search/SearchResults.tsx">Try: "entertainment"</Badge>
            <Badge variant="outline" data-id="chob97xua" data-path="src/components/Search/SearchResults.tsx">Try: "sports"</Badge>
          </div>
        </motion.div> :

      <div className="space-y-8" data-id="1ws3vyvjo" data-path="src/components/Search/SearchResults.tsx">
          {/* All Results Grid */}
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-id="8zdj65ovc" data-path="src/components/Search/SearchResults.tsx">

            {searchResults.map((item, index) =>
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }} data-id="a3chltz4u" data-path="src/components/Search/SearchResults.tsx">

                <ContentCard
              item={item}
              showSearchHighlight={true}
              searchQuery={query} data-id="ov7qpuv2e" data-path="src/components/Search/SearchResults.tsx" />

              </motion.div>
          )}
          </motion.div>

          {/* Grouped Results */}
          {Object.keys(resultsByType).length > 1 &&
        <div className="space-y-8 mt-12" data-id="ybb233ehi" data-path="src/components/Search/SearchResults.tsx">
              <h2 className="text-xl font-semibold" data-id="gyp8bqjkk" data-path="src/components/Search/SearchResults.tsx">Results by Category</h2>
              {Object.entries(resultsByType).map(([type, items]) =>
          <motion.div
            key={type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }} data-id="s9jj0v906" data-path="src/components/Search/SearchResults.tsx">

                  <div className="flex items-center gap-3 mb-4" data-id="7ev0kzikm" data-path="src/components/Search/SearchResults.tsx">
                    <span className="text-2xl" data-id="m0qvgen44" data-path="src/components/Search/SearchResults.tsx">{typeIcons[type as keyof typeof typeIcons]}</span>
                    <h3 className="text-lg font-semibold capitalize" data-id="ifzelhvzs" data-path="src/components/Search/SearchResults.tsx">{type}</h3>
                    <Badge variant="outline" data-id="vcihbx2zo" data-path="src/components/Search/SearchResults.tsx">
                      {items.length} results
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-id="x3846v57e" data-path="src/components/Search/SearchResults.tsx">
                    {items.slice(0, 3).map((item, index) =>
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }} data-id="zcouw0mls" data-path="src/components/Search/SearchResults.tsx">

                        <ContentCard
                  item={item}
                  showSearchHighlight={true}
                  searchQuery={query} data-id="dbwaxvs3g" data-path="src/components/Search/SearchResults.tsx" />

                      </motion.div>
              )}
                  </div>
                </motion.div>
          )}
            </div>
        }
        </div>
      }
    </motion.div>);

};

export default SearchResults;