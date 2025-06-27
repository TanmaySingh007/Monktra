import ContentCard from '@/components/Feed/ContentCard';
import LoadingSpinner from '@/components/Feed/LoadingSpinner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { fetchTrendingItems } from '@/store/slices/feedSlice';
import { Flame, Star, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect } from 'react';

const TrendingSection = () => {
  const dispatch = useAppDispatch();
  const { trendingItems, trendingLoading, error } = useAppSelector((state) => state.feed);
  const { selectedCategories } = useAppSelector((state) => state.userPreferences);

  useEffect(() => {
    console.log('TrendingSection: Fetching trending items for categories:', selectedCategories);
    dispatch(fetchTrendingItems(selectedCategories));
  }, [dispatch, selectedCategories]);

  const handleRefresh = () => {
    dispatch(fetchTrendingItems(selectedCategories));
  };

  if (trendingLoading) {
    return (
      <div className="flex justify-center items-center h-64" data-id="34gpgnzr5" data-path="src/components/Trending/TrendingSection.tsx">
        <LoadingSpinner data-id="d9d1idd2u" data-path="src/components/Trending/TrendingSection.tsx" />
      </div>);

  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12" data-id="pfkj41sfw" data-path="src/components/Trending/TrendingSection.tsx">

        <p className="text-red-500 mb-4" data-id="ed88cvoi5" data-path="src/components/Trending/TrendingSection.tsx">Failed to load trending content</p>
        <Button onClick={handleRefresh} variant="outline" data-id="yot9gbvp9" data-path="src/components/Trending/TrendingSection.tsx">
          Try Again
        </Button>
      </motion.div>);

  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6" data-id="x9ksfh6md" data-path="src/components/Trending/TrendingSection.tsx">

      {/* Header */}
      <div className="flex items-center justify-between" data-id="7cxbhh648" data-path="src/components/Trending/TrendingSection.tsx">
        <div className="flex items-center gap-3" data-id="j514n1610" data-path="src/components/Trending/TrendingSection.tsx">
          <div className="flex items-center gap-2" data-id="ygjle9a96" data-path="src/components/Trending/TrendingSection.tsx">
            <TrendingUp className="h-6 w-6 text-primary" data-id="f6tubu29s" data-path="src/components/Trending/TrendingSection.tsx" />
            <h1 className="text-2xl font-bold" data-id="zssxrfoeo" data-path="src/components/Trending/TrendingSection.tsx">Trending Now</h1>
          </div>
          <Badge variant="secondary" className="bg-gradient-to-r from-orange-500 to-red-500 text-white" data-id="zlqpg1oy6" data-path="src/components/Trending/TrendingSection.tsx">
            <Flame className="h-3 w-3 mr-1" data-id="jg4fwbski" data-path="src/components/Trending/TrendingSection.tsx" />
            Hot
          </Badge>
        </div>
        
        <Button onClick={handleRefresh} variant="outline" size="sm" data-id="amrpjwpjl" data-path="src/components/Trending/TrendingSection.tsx">
          <Zap className="h-4 w-4 mr-2" data-id="pfqbn3uwz" data-path="src/components/Trending/TrendingSection.tsx" />
          Refresh
        </Button>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2" data-id="7yrvqqcxm" data-path="src/components/Trending/TrendingSection.tsx">
        {selectedCategories.map((category) =>
        <Badge key={category} variant="outline" className="capitalize" data-id="i5ye45rso" data-path="src/components/Trending/TrendingSection.tsx">
            {category}
          </Badge>
        )}
      </div>

      {/* Trending Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" data-id="n80kumpfm" data-path="src/components/Trending/TrendingSection.tsx">

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white" data-id="ts8731g87" data-path="src/components/Trending/TrendingSection.tsx">
          <div className="flex items-center justify-between" data-id="ramphros2" data-path="src/components/Trending/TrendingSection.tsx">
            <div data-id="nggb3qs8j" data-path="src/components/Trending/TrendingSection.tsx">
              <p className="text-sm opacity-90" data-id="eup2zpdt4" data-path="src/components/Trending/TrendingSection.tsx">Total Trending</p>
              <p className="text-2xl font-bold" data-id="743w5ptnb" data-path="src/components/Trending/TrendingSection.tsx">{trendingItems.length}</p>
            </div>
            <TrendingUp className="h-8 w-8 opacity-80" data-id="24tuda18d" data-path="src/components/Trending/TrendingSection.tsx" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-4 text-white" data-id="y75ss8pky" data-path="src/components/Trending/TrendingSection.tsx">
          <div className="flex items-center justify-between" data-id="cnfdu9jxv" data-path="src/components/Trending/TrendingSection.tsx">
            <div data-id="4m73n5hcx" data-path="src/components/Trending/TrendingSection.tsx">
              <p className="text-sm opacity-90" data-id="b12ugqkig" data-path="src/components/Trending/TrendingSection.tsx">Categories</p>
              <p className="text-2xl font-bold" data-id="ojvoxybpb" data-path="src/components/Trending/TrendingSection.tsx">{selectedCategories.length}</p>
            </div>
            <Star className="h-8 w-8 opacity-80" data-id="1acgj0f79" data-path="src/components/Trending/TrendingSection.tsx" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-4 text-white" data-id="a4hh5jke7" data-path="src/components/Trending/TrendingSection.tsx">
          <div className="flex items-center justify-between" data-id="00baiq1q4" data-path="src/components/Trending/TrendingSection.tsx">
            <div data-id="o7omy7auw" data-path="src/components/Trending/TrendingSection.tsx">
              <p className="text-sm opacity-90" data-id="i5g904vq6" data-path="src/components/Trending/TrendingSection.tsx">Hot Topics</p>
              <p className="text-2xl font-bold" data-id="9uiy3s0ul" data-path="src/components/Trending/TrendingSection.tsx">{Math.floor(trendingItems.length * 0.7)}</p>
            </div>
            <Flame className="h-8 w-8 opacity-80" data-id="p1urk37br" data-path="src/components/Trending/TrendingSection.tsx" />
          </div>
        </div>
      </motion.div>

      {/* Trending Content */}
      {trendingItems.length === 0 ?
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center py-12" data-id="l5v8bj1ll" data-path="src/components/Trending/TrendingSection.tsx">

          <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" data-id="r27lerif6" data-path="src/components/Trending/TrendingSection.tsx" />
          <h3 className="text-lg font-semibold mb-2" data-id="idx9ip4mk" data-path="src/components/Trending/TrendingSection.tsx">No trending content available</h3>
          <p className="text-muted-foreground mb-4" data-id="lrt837gk2" data-path="src/components/Trending/TrendingSection.tsx">
            Try adjusting your category preferences or refresh the page
          </p>
          <Button onClick={handleRefresh} variant="outline" data-id="4s6eitcqo" data-path="src/components/Trending/TrendingSection.tsx">
            Refresh Trending
          </Button>
        </motion.div> :

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-id="94fmh3vqg" data-path="src/components/Trending/TrendingSection.tsx">

          {trendingItems.map((item, index) =>
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }} data-id="r7mqhdtve" data-path="src/components/Trending/TrendingSection.tsx">

              <ContentCard
            item={item}
            showTrendingBadge={true} data-id="7fdikllkc" data-path="src/components/Trending/TrendingSection.tsx" />

            </motion.div>
        )}
        </motion.div>
      }
    </motion.div>);

};

export default TrendingSection;