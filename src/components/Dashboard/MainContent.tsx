import { AnimatePresence, motion } from 'motion/react';
import React, { useState } from 'react';
import FavoritesSection from '../Favorites/FavoritesSection';
import PersonalizedFeed from '../Feed/PersonalizedFeed';
import OrdersSection from '../Orders/OrdersSection';
import SearchResults from '../Search/SearchResults';
import TrendingSection from '../Trending/TrendingSection';

interface MainContentProps {
  searchQuery?: string;
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  searchQuery = '',
  activeSection = 'dashboard',
  onSectionChange
}) => {
  const [currentSection, setCurrentSection] = useState(activeSection);

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
    onSectionChange?.(section);
  };

  const renderSectionContent = () => {
    // If there's a search query, show search results
    if (searchQuery.trim()) {
      return (
        <motion.div
          key="search"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }} data-id="uynb0bnn2" data-path="src/components/Dashboard/MainContent.tsx">

          <div className="mb-6" data-id="edhon3ozw" data-path="src/components/Dashboard/MainContent.tsx">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2" data-id="o426hd5xj" data-path="src/components/Dashboard/MainContent.tsx">
              Search Results
            </h1>
            <p className="text-gray-600 dark:text-gray-400" data-id="a4bs20ayn" data-path="src/components/Dashboard/MainContent.tsx">
              Found results for "{searchQuery}"
            </p>
          </div>
          <SearchResults data-id="fdykn2u8s" data-path="src/components/Dashboard/MainContent.tsx" />
        </motion.div>);

    }

    switch (currentSection) {
      case 'trending':
        return (
          <motion.div
            key="trending"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }} data-id="qb4qrgzd4" data-path="src/components/Dashboard/MainContent.tsx">

            <div className="mb-6" data-id="c4x3cv8yo" data-path="src/components/Dashboard/MainContent.tsx">
              <motion.h1
                className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }} data-id="n9c40ja55" data-path="src/components/Dashboard/MainContent.tsx">

                🔥 Trending Now
              </motion.h1>
              <motion.p
                className="text-gray-600 dark:text-gray-400"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }} data-id="ur4td0bqs" data-path="src/components/Dashboard/MainContent.tsx">

                Discover what's hot and trending across all categories.
              </motion.p>
            </div>
            <TrendingSection data-id="vzfp7j6wn" data-path="src/components/Dashboard/MainContent.tsx" />
          </motion.div>);


      case 'favorites':
        return (
          <motion.div
            key="favorites"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }} data-id="s2jbq8woh" data-path="src/components/Dashboard/MainContent.tsx">

            <div className="mb-6" data-id="m5a05cq7z" data-path="src/components/Dashboard/MainContent.tsx">
              <motion.h1
                className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }} data-id="rqe43pcf0" data-path="src/components/Dashboard/MainContent.tsx">

                ❤️ Your Favorites
              </motion.h1>
              <motion.p
                className="text-gray-600 dark:text-gray-400"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }} data-id="l28y43rhu" data-path="src/components/Dashboard/MainContent.tsx">

                All the content you've saved and loved.
              </motion.p>
            </div>
            <FavoritesSection data-id="0l0h6jte2" data-path="src/components/Dashboard/MainContent.tsx" />
          </motion.div>);


      case 'orders':
        return (
          <motion.div
            key="orders"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }} data-id="cjz6tpb8e" data-path="src/components/Dashboard/MainContent.tsx">

            <div className="mb-6" data-id="k8nlv09ci" data-path="src/components/Dashboard/MainContent.tsx">
              <motion.h1
                className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }} data-id="cxlihjz2q" data-path="src/components/Dashboard/MainContent.tsx">

                📦 Custom Order
              </motion.h1>
              <motion.p
                className="text-gray-600 dark:text-gray-400"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }} data-id="9zdftjytg" data-path="src/components/Dashboard/MainContent.tsx">

                Your personalized content arrangement from drag and drop reordering.
              </motion.p>
            </div>
            <OrdersSection data-id="5j9rixpjl" data-path="src/components/Dashboard/MainContent.tsx" />
          </motion.div>);


      default:
        return (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }} data-id="qxvsvo34e" data-path="src/components/Dashboard/MainContent.tsx">

            <div className="mb-6" data-id="78cvi842s" data-path="src/components/Dashboard/MainContent.tsx">
              <motion.h1
                className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }} data-id="1mkrq9adk" data-path="src/components/Dashboard/MainContent.tsx">

                🏠 Welcome to Monktra
              </motion.h1>
              <motion.p
                className="text-gray-600 dark:text-gray-400"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }} data-id="t0lvbpe8o" data-path="src/components/Dashboard/MainContent.tsx">

                Discover the latest news, movies, music, and social content tailored just for you.
              </motion.p>
            </div>
            <PersonalizedFeed data-id="o61vadyrd" data-path="src/components/Dashboard/MainContent.tsx" />
          </motion.div>);

    }
  };

  return (
    <main className="flex-1" data-id="uq6v9d7vd" data-path="src/components/Dashboard/MainContent.tsx">
      <div className="min-h-screen p-6" data-id="nt58vsg4o" data-path="src/components/Dashboard/MainContent.tsx">
        <AnimatePresence mode="wait" data-id="pp4wnhblc" data-path="src/components/Dashboard/MainContent.tsx">
          {renderSectionContent()}
        </AnimatePresence>
      </div>
    </main>);

};

export default MainContent;