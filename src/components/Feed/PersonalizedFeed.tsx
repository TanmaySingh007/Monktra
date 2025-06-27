import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useSearch } from '@/hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import {
    fetchFeedItems,
    loadCustomOrder,
    reorderItems,
    resetFeed,
    saveCustomOrder,
    searchContent,
    setSearchQuery
} from '@/store/slices/feedSlice';
import { ChevronDown, ChevronUp, Filter, Lock, RefreshCw, Shuffle, Unlock } from 'lucide-react';
import { AnimatePresence, motion, Reorder } from 'motion/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ContentCard from './ContentCard';
import LoadingSpinner from './LoadingSpinner';

interface PersonalizedFeedProps {
  searchQuery?: string;
}

const PersonalizedFeed: React.FC<PersonalizedFeedProps> = ({ searchQuery = '' }) => {
  const dispatch = useAppDispatch();
  const {
    items,
    searchResults,
    loading,
    error,
    currentPage,
    hasMoreItems,
    searchQuery: currentSearchQuery,
    customOrder
  } = useAppSelector((state) => state.feed);
  const { selectedCategories } = useAppSelector((state) => state.userPreferences);

  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'trending' | 'rating'>('latest');
  const [isDragEnabled, setIsDragEnabled] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // Enhanced search with debouncing
  const {
    debouncedSearchQuery,
    isSearching,
    handleSearchChange
  } = useSearch(searchQuery, 500);

  // Handle search with debouncing
  useEffect(() => {
    if (debouncedSearchQuery !== currentSearchQuery) {
      dispatch(setSearchQuery(debouncedSearchQuery));
      if (debouncedSearchQuery.trim()) {
        dispatch(searchContent(debouncedSearchQuery));
      }
    }
  }, [debouncedSearchQuery, currentSearchQuery, dispatch]);

  // Load custom order on mount
  useEffect(() => {
    dispatch(loadCustomOrder());
  }, [dispatch]);

  // Initial load and category changes
  useEffect(() => {
    if (!debouncedSearchQuery.trim()) {
      dispatch(resetFeed());
      dispatch(fetchFeedItems({
        page: 1,
        category: selectedFilter === 'all' ? undefined : selectedFilter
      }));
    }
  }, [selectedFilter, dispatch, debouncedSearchQuery]);

  // Enable auto-load by default and ensure scrolling content
  const [enableAutoLoad, setEnableAutoLoad] = useState(true);

  useEffect(() => {
    if (enableAutoLoad && inView && !loading && hasMoreItems && !debouncedSearchQuery.trim() && currentPage < 10) {
      dispatch(fetchFeedItems({
        page: currentPage + 1,
        category: selectedFilter === 'all' ? undefined : selectedFilter
      }));
    }
  }, [enableAutoLoad, inView, loading, hasMoreItems, currentPage, selectedFilter, dispatch, debouncedSearchQuery]);

  // Automatically load initial content to ensure scrolling
  useEffect(() => {
    if (items.length === 0 && !loading && !debouncedSearchQuery.trim()) {
      dispatch(fetchFeedItems({
        page: 1,
        category: selectedFilter === 'all' ? undefined : selectedFilter
      }));
    }
  }, [items.length, loading, dispatch, selectedFilter, debouncedSearchQuery]);

  const handleRefresh = useCallback(() => {
    dispatch(resetFeed());
    dispatch(fetchFeedItems({
      page: 1,
      category: selectedFilter === 'all' ? undefined : selectedFilter
    }));
    toast({
      title: "Feed refreshed!",
      description: "Latest content has been loaded"
    });
  }, [dispatch, selectedFilter]);

  const handleReorder = useCallback((newOrder: any[]) => {
    const reorderedItems = newOrder.map((item, index) => ({
      ...item,
      order: index
    }));

    // Update the order in Redux
    const oldIndex = items.findIndex((item) => item.id === draggedItem);
    const newIndex = reorderedItems.findIndex((item) => item.id === draggedItem);

    if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
      dispatch(reorderItems({ fromIndex: oldIndex, toIndex: newIndex }));
      dispatch(saveCustomOrder(reorderedItems.map((item) => item.id)));

      toast({
        title: "Order saved!",
        description: "Your custom feed order has been saved"
      });
    }
  }, [dispatch, items, draggedItem]);

  const toggleDragMode = useCallback(() => {
    setIsDragEnabled(!isDragEnabled);
    toast({
      title: isDragEnabled ? "Drag mode disabled" : "Drag mode enabled",
      description: isDragEnabled ? "Items are now locked in place" : "You can now reorder items by dragging"
    });
  }, [isDragEnabled]);

  const displayItems = debouncedSearchQuery.trim() ? searchResults : items;

  const sortedItems = React.useMemo(() => {
    const itemsToSort = [...displayItems];

    switch (sortBy) {
      case 'trending':
        return itemsToSort.sort((a, b) => {
          if (a.trending && !b.trending) return -1;
          if (!a.trending && b.trending) return 1;
          return (b.rating || 0) - (a.rating || 0);
        });
      case 'rating':
        return itemsToSort.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      default:
        return itemsToSort.sort((a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
    }
  }, [displayItems, sortBy]);

  const categories = [
  { id: 'all', label: 'All Content', icon: '🌟' },
  { id: 'technology', label: 'Technology', icon: '💻' },
  { id: 'movies', label: 'Movies', icon: '🎬' },
  { id: 'music', label: 'Music', icon: '🎵' },
  { id: 'sports', label: 'Sports', icon: '⚽' },
  { id: 'gaming', label: 'Gaming', icon: '🎮' },
  { id: 'travel', label: 'Travel', icon: '✈️' },
  { id: 'food', label: 'Food', icon: '🍕' },
  { id: 'fashion', label: 'Fashion', icon: '👗' }];

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center p-8 text-center" data-id="87e90na5o" data-path="src/components/Feed/PersonalizedFeed.tsx">

        <div className="text-red-400 text-6xl mb-4" data-id="npp8woi4o" data-path="src/components/Feed/PersonalizedFeed.tsx">🤠💔</div>
        <h3 className="text-xl font-bold text-amber-100 mb-2" data-id="j5cdgcovc" data-path="src/components/Feed/PersonalizedFeed.tsx">Something went wrong, partner!</h3>
        <p className="text-amber-300 mb-4" data-id="l0khn2h8n" data-path="src/components/Feed/PersonalizedFeed.tsx">{error}</p>
        <Button onClick={handleRefresh} className="western-button" data-id="rb56nwnwd" data-path="src/components/Feed/PersonalizedFeed.tsx">
          <RefreshCw className="w-4 h-4 mr-2" data-id="o97ksjj4f" data-path="src/components/Feed/PersonalizedFeed.tsx" />
          Try Again
        </Button>
      </motion.div>);
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6" data-id="l1q5l4zci" data-path="src/components/Feed/PersonalizedFeed.tsx">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8" data-id="yrlg1yu35" data-path="src/components/Feed/PersonalizedFeed.tsx">

        <h1 className="text-4xl font-bold text-amber-100 western-title mb-2" data-id="mhtw5edx8" data-path="src/components/Feed/PersonalizedFeed.tsx">
          {debouncedSearchQuery ? `Search Results for "${debouncedSearchQuery}"` : 'Your Personalized Feed'}
        </h1>
        <p className="text-amber-300 western-text" data-id="v9f87e4et" data-path="src/components/Feed/PersonalizedFeed.tsx">
          {debouncedSearchQuery ?
          `Found ${sortedItems.length} result${sortedItems.length !== 1 ? 's' : ''}` :
          'Discover content tailored to your frontier spirit'
          }
          {isSearching &&
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-2 text-yellow-400" data-id="9rzcaz9mf" data-path="src/components/Feed/PersonalizedFeed.tsx">

              (Searching...)
            </motion.span>
          }
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap gap-2 justify-center mb-6" data-id="vks65w1ev" data-path="src/components/Feed/PersonalizedFeed.tsx">

        {categories.map((category) =>
        <motion.button
          key={category.id}
          onClick={() => setSelectedFilter(category.id)}
          className={`px-4 py-2 rounded-full transition-all duration-200 flex items-center gap-2 text-sm font-medium ${
          selectedFilter === category.id ?
          'bg-amber-600 text-black shadow-lg' :
          'bg-black/30 text-amber-300 hover:bg-amber-600/20 border border-amber-600/30'}`
          }
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }} data-id="q50wcfrga" data-path="src/components/Feed/PersonalizedFeed.tsx">

            <span data-id="17uxrvmk2" data-path="src/components/Feed/PersonalizedFeed.tsx">{category.icon}</span>
            {category.label}
          </motion.button>
        )}
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-6" data-id="ffql3zy7p" data-path="src/components/Feed/PersonalizedFeed.tsx">

        <div className="flex items-center gap-4" data-id="pe0stdu0g" data-path="src/components/Feed/PersonalizedFeed.tsx">
          <div className="flex items-center gap-2" data-id="xwmk9850n" data-path="src/components/Feed/PersonalizedFeed.tsx">
            <Filter className="w-5 h-5 text-amber-400" data-id="rpjj8iydj" data-path="src/components/Feed/PersonalizedFeed.tsx" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-black/30 border border-amber-600/50 text-amber-100 rounded-lg px-3 py-2 text-sm" data-id="qd9zaprwz" data-path="src/components/Feed/PersonalizedFeed.tsx">

              <option value="latest" data-id="59sz452ei" data-path="src/components/Feed/PersonalizedFeed.tsx">Latest</option>
              <option value="trending" data-id="cnc3bzhaz" data-path="src/components/Feed/PersonalizedFeed.tsx">Trending</option>
              <option value="rating" data-id="m35eo46y3" data-path="src/components/Feed/PersonalizedFeed.tsx">Highest Rated</option>
            </select>
          </div>
          
          {!debouncedSearchQuery &&
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} data-id="9txkur9mu" data-path="src/components/Feed/PersonalizedFeed.tsx">
              <Button
              onClick={toggleDragMode}
              variant="outline"
              size="sm"
              className={`border-amber-600/50 hover:bg-amber-600/10 ${
              isDragEnabled ? 'bg-amber-600/20 text-amber-200' : 'text-amber-300'}`
              } data-id="vi9efccya" data-path="src/components/Feed/PersonalizedFeed.tsx">
                {isDragEnabled ? <Unlock className="w-4 h-4 mr-2" data-id="xpurs7xwq" data-path="src/components/Feed/PersonalizedFeed.tsx" /> : <Lock className="w-4 h-4 mr-2" data-id="h9gub3yi5" data-path="src/components/Feed/PersonalizedFeed.tsx" />}
                {isDragEnabled ? 'Lock Order' : 'Reorder Mode'}
              </Button>
            </motion.div>
          }
        </div>

        <Button
          onClick={handleRefresh}
          variant="outline"
          size="sm"
          className="border-amber-600/50 text-amber-300 hover:bg-amber-600/10" data-id="wqbnac867" data-path="src/components/Feed/PersonalizedFeed.tsx">

          <RefreshCw className="w-4 h-4 mr-2" data-id="6g1fj1k26" data-path="src/components/Feed/PersonalizedFeed.tsx" />
          Refresh
        </Button>
      </motion.div>

      {/* Feed Content */}
      <AnimatePresence mode="wait" data-id="yaet0lrki" data-path="src/components/Feed/PersonalizedFeed.tsx">
        {loading && sortedItems.length === 0 ?
        <LoadingSpinner data-id="wvkcw7s47" data-path="src/components/Feed/PersonalizedFeed.tsx" /> :
        sortedItems.length === 0 ?
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center p-12 text-center" data-id="4j49hafe5" data-path="src/components/Feed/PersonalizedFeed.tsx">

            <div className="text-6xl mb-4" data-id="j6ckjyezf" data-path="src/components/Feed/PersonalizedFeed.tsx">🏜️</div>
            <h3 className="text-2xl font-bold text-amber-100 mb-2" data-id="kt0kwkgws" data-path="src/components/Feed/PersonalizedFeed.tsx">
              {debouncedSearchQuery ? 'No results found' : 'No content available'}
            </h3>
            <p className="text-amber-300 mb-6 max-w-md" data-id="nodc9w8vn" data-path="src/components/Feed/PersonalizedFeed.tsx">
              {debouncedSearchQuery ?
            'Try adjusting your search terms or explore different categories' :
            'Check back later for fresh content from the frontier'
            }
            </p>
            {debouncedSearchQuery &&
          <Button
            onClick={() => dispatch(setSearchQuery(''))}
            className="western-button" data-id="p3oqga2yx" data-path="src/components/Feed/PersonalizedFeed.tsx">

                Clear Search
              </Button>
          }
          </motion.div> :

        isDragEnabled && !debouncedSearchQuery ?
        <Reorder.Group
          axis="y"
          values={sortedItems}
          onReorder={handleReorder}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-id="fg5hfpwj2" data-path="src/components/Feed/PersonalizedFeed.tsx">

            <AnimatePresence data-id="wyls4w3r0" data-path="src/components/Feed/PersonalizedFeed.tsx">
              {sortedItems.map((item, index) =>
            <Reorder.Item
              key={item.id}
              value={item}
              onDragStart={() => setDraggedItem(item.id)}
              onDragEnd={() => setDraggedItem(null)}
              className="cursor-grab active:cursor-grabbing"
              whileDrag={{
                scale: 1.05,
                rotate: 2,
                zIndex: 999,
                boxShadow: "0 20px 30px rgba(0,0,0,0.3)"
              }}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }} data-id="vnaitdpr3" data-path="src/components/Feed/PersonalizedFeed.tsx">

                  <motion.div
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.03,
                  type: "spring",
                  stiffness: 100
                }}
                className={`relative ${draggedItem === item.id ? 'z-50' : ''}`} data-id="n5791uyqk" data-path="src/components/Feed/PersonalizedFeed.tsx">

                    <div className="absolute -top-2 -right-2 bg-amber-600 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold z-10" data-id="gz5bdo27z" data-path="src/components/Feed/PersonalizedFeed.tsx">
                      <Shuffle className="w-3 h-3" data-id="2g1bg2109" data-path="src/components/Feed/PersonalizedFeed.tsx" />
                    </div>
                    <ContentCard item={item} data-id="4k445bysw" data-path="src/components/Feed/PersonalizedFeed.tsx" />
                  </motion.div>
                </Reorder.Item>
            )}
            </AnimatePresence>
          </Reorder.Group> :

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-id="dwyfq7l2z" data-path="src/components/Feed/PersonalizedFeed.tsx">

            <AnimatePresence data-id="wnk9oqluw" data-path="src/components/Feed/PersonalizedFeed.tsx">
              {sortedItems.map((item, index) =>
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{
                duration: 0.4,
                delay: index * 0.03,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.2 }
              }} data-id="a7tdlkcp9" data-path="src/components/Feed/PersonalizedFeed.tsx">

                  <ContentCard item={item} data-id="rqrs0g2ud" data-path="src/components/Feed/PersonalizedFeed.tsx" />
                </motion.div>
            )}
            </AnimatePresence>
          </motion.div>
        }
      </AnimatePresence>

      {/* Load More Controls */}
      {!debouncedSearchQuery && sortedItems.length > 0 &&
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-4 py-8" data-id="bu8x88j70" data-path="src/components/Feed/PersonalizedFeed.tsx">

        <div className="flex items-center gap-4" data-id="049pye8dw" data-path="src/components/Feed/PersonalizedFeed.tsx">
          <Button
            onClick={() => setEnableAutoLoad(!enableAutoLoad)}
            variant="outline"
            size="sm"
            className="border-amber-600/50 text-amber-300 hover:bg-amber-600/10" data-id="tn0dl19jp" data-path="src/components/Feed/PersonalizedFeed.tsx">

            {enableAutoLoad ? <ChevronUp className="w-4 h-4 mr-2" data-id="6pcnsecx1" data-path="src/components/Feed/PersonalizedFeed.tsx" /> : <ChevronDown className="w-4 h-4 mr-2" data-id="32yp6i6ll" data-path="src/components/Feed/PersonalizedFeed.tsx" />}
            {enableAutoLoad ? 'Disable Auto-Load' : 'Enable Auto-Load'}
          </Button>
          
          {hasMoreItems &&
          <Button
            onClick={() => dispatch(fetchFeedItems({
              page: currentPage + 1,
              category: selectedFilter === 'all' ? undefined : selectedFilter
            }))}
            disabled={loading}
            className="western-button" data-id="r9e3bobwa" data-path="src/components/Feed/PersonalizedFeed.tsx">

              {loading ?
            <>
                  <div className="loading-spinner mr-2" data-id="t8c7utmt3" data-path="src/components/Feed/PersonalizedFeed.tsx" />
                  Loading...
                </> :

            <>
                  <RefreshCw className="w-4 h-4 mr-2" data-id="oxw07wd8w" data-path="src/components/Feed/PersonalizedFeed.tsx" />
                  Load More Content
                </>
            }
            </Button>
          }
        </div>
        
        <div className="text-center text-amber-300 text-sm" data-id="wposdm142" data-path="src/components/Feed/PersonalizedFeed.tsx">
          Showing {sortedItems.length} items • Page {currentPage}
          {hasMoreItems && ` • ${enableAutoLoad ? 'Auto-loading enabled' : 'Manual loading'}`}
        </div>

        {enableAutoLoad && hasMoreItems &&
        <div ref={loadMoreRef} className="h-4" data-id="atkh25wic" data-path="src/components/Feed/PersonalizedFeed.tsx" />
        }
      </motion.div>
      }

      {/* End of Feed Message */}
      {!debouncedSearchQuery && !hasMoreItems && sortedItems.length > 0 &&
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8" data-id="msu7nd6xn" data-path="src/components/Feed/PersonalizedFeed.tsx">

          <div className="text-4xl mb-2" data-id="se7407jiu" data-path="src/components/Feed/PersonalizedFeed.tsx">🌅</div>
          <p className="text-amber-300" data-id="fstqw2v7u" data-path="src/components/Feed/PersonalizedFeed.tsx">You've reached the end of the trail, partner!</p>
        </motion.div>
      }
    </div>);

};

export default PersonalizedFeed;