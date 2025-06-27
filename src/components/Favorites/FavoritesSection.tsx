import ContentCard from '@/components/Feed/ContentCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/hooks/useRedux';
import { BookmarkPlus, Filter, Heart } from 'lucide-react';
import { motion } from 'motion/react';

const FavoritesSection = () => {
  const { favorites } = useAppSelector((state) => state.userPreferences);
  const { items, trendingItems, searchResults } = useAppSelector((state) => state.feed);

  // Get all items from different sources
  const allItems = [...items, ...trendingItems, ...searchResults];

  // Filter favorites from all available items
  const favoriteItems = allItems.filter((item) => favorites.includes(item.id));

  // Remove duplicates based on ID
  const uniqueFavorites = favoriteItems.filter((item, index, self) =>
  index === self.findIndex((t) => t.id === item.id)
  );

  // Group favorites by type
  const favoritesByType = uniqueFavorites.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, typeof uniqueFavorites>);

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
      className="space-y-6" data-id="3p8p5e4op" data-path="src/components/Favorites/FavoritesSection.tsx">

      {/* Header */}
      <div className="flex items-center justify-between" data-id="9ed2a1wzs" data-path="src/components/Favorites/FavoritesSection.tsx">
        <div className="flex items-center gap-3" data-id="qy9du6ayg" data-path="src/components/Favorites/FavoritesSection.tsx">
          <Heart className="h-6 w-6 text-red-500 fill-current" data-id="lpit95kzm" data-path="src/components/Favorites/FavoritesSection.tsx" />
          <h1 className="text-2xl font-bold" data-id="ra3fc1khz" data-path="src/components/Favorites/FavoritesSection.tsx">My Favorites</h1>
          <Badge variant="secondary" data-id="ir8vsulk1" data-path="src/components/Favorites/FavoritesSection.tsx">
            {uniqueFavorites.length} items
          </Badge>
        </div>
        
        <Button variant="outline" size="sm" data-id="gk2xci4re" data-path="src/components/Favorites/FavoritesSection.tsx">
          <Filter className="h-4 w-4 mr-2" data-id="c83m8jfyv" data-path="src/components/Favorites/FavoritesSection.tsx" />
          Filter
        </Button>
      </div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4" data-id="0uezotv97" data-path="src/components/Favorites/FavoritesSection.tsx">

        {Object.entries(favoritesByType).map(([type, items]) =>
        <div
          key={type}
          className={`rounded-lg p-4 text-white ${typeColors[type as keyof typeof typeColors]}`} data-id="buueqg772" data-path="src/components/Favorites/FavoritesSection.tsx">

            <div className="flex items-center justify-between" data-id="jyqrdrgx9" data-path="src/components/Favorites/FavoritesSection.tsx">
              <div data-id="xbuc32g32" data-path="src/components/Favorites/FavoritesSection.tsx">
                <p className="text-sm opacity-90 capitalize" data-id="3y8e7c6es" data-path="src/components/Favorites/FavoritesSection.tsx">{type}</p>
                <p className="text-xl font-bold" data-id="chmtrx49p" data-path="src/components/Favorites/FavoritesSection.tsx">{items.length}</p>
              </div>
              <span className="text-2xl opacity-80" data-id="ggxicc7cx" data-path="src/components/Favorites/FavoritesSection.tsx">
                {typeIcons[type as keyof typeof typeIcons]}
              </span>
            </div>
          </div>
        )}
      </motion.div>

      {/* Favorites Content */}
      {uniqueFavorites.length === 0 ?
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center py-16" data-id="qo90xsd5o" data-path="src/components/Favorites/FavoritesSection.tsx">

          <BookmarkPlus className="h-16 w-16 text-muted-foreground mx-auto mb-4" data-id="j033lywqu" data-path="src/components/Favorites/FavoritesSection.tsx" />
          <h3 className="text-xl font-semibold mb-2" data-id="619hlcq56" data-path="src/components/Favorites/FavoritesSection.tsx">No favorites yet</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto" data-id="54cjz40ef" data-path="src/components/Favorites/FavoritesSection.tsx">
            Start exploring content and click the heart icon to save your favorite items here.
          </p>
          <Button data-id="nfxjj3dur" data-path="src/components/Favorites/FavoritesSection.tsx">
            Explore Content
          </Button>
        </motion.div> :

      <div className="space-y-8" data-id="aiuc4dc3q" data-path="src/components/Favorites/FavoritesSection.tsx">
          {/* Grouped by type */}
          {Object.entries(favoritesByType).map(([type, items]) =>
        <motion.div
          key={type}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }} data-id="1pm38jxda" data-path="src/components/Favorites/FavoritesSection.tsx">

              <div className="flex items-center gap-3 mb-4" data-id="61h4rwjx0" data-path="src/components/Favorites/FavoritesSection.tsx">
                <span className="text-2xl" data-id="34ttrgcje" data-path="src/components/Favorites/FavoritesSection.tsx">{typeIcons[type as keyof typeof typeIcons]}</span>
                <h2 className="text-lg font-semibold capitalize" data-id="wltx6z3dg" data-path="src/components/Favorites/FavoritesSection.tsx">{type}</h2>
                <Badge variant="outline" data-id="mwvy0y9rl" data-path="src/components/Favorites/FavoritesSection.tsx">
                  {items.length} items
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-id="5mvrfzlze" data-path="src/components/Favorites/FavoritesSection.tsx">
                {items.map((item, index) =>
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }} data-id="u1myj9ggv" data-path="src/components/Favorites/FavoritesSection.tsx">

                    <ContentCard
                item={item}
                showFavoriteButton={true} data-id="7nmoge62k" data-path="src/components/Favorites/FavoritesSection.tsx" />

                  </motion.div>
            )}
              </div>
            </motion.div>
        )}
        </div>
      }
    </motion.div>);

};

export default FavoritesSection;