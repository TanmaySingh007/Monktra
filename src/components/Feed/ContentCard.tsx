import React from 'react';
import { motion } from 'motion/react';
import { useAppDispatch } from '@/hooks/useRedux';
import { toggleFavorite, ContentItem } from '@/store/slices/feedSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Heart,
  ExternalLink,
  Star,
  TrendingUp,
  Clock,
  User,
  Eye,
  Share2,
  Bookmark } from
'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ContentCardProps {
  item: ContentItem;
}

const ContentCard: React.FC<ContentCardProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(toggleFavorite(item.id));
    toast({
      title: item.isFavorite ? "Removed from favorites" : "Added to favorites",
      description: item.title,
      duration: 2000
    });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description,
        url: item.url || window.location.href
      });
    } else {
      navigator.clipboard.writeText(item.url || window.location.href);
      toast({
        title: "Link copied!",
        description: "Content link copied to clipboard"
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      technology: '💻',
      movies: '🎬',
      music: '🎵',
      sports: '⚽',
      gaming: '🎮',
      travel: '✈️',
      food: '🍕',
      fashion: '👗',
      news: '📰',
      social: '👥'
    };
    return icons[category] || '📄';
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      technology: 'bg-blue-600/20 text-blue-300 border-blue-600/40',
      movies: 'bg-purple-600/20 text-purple-300 border-purple-600/40',
      music: 'bg-pink-600/20 text-pink-300 border-pink-600/40',
      sports: 'bg-green-600/20 text-green-300 border-green-600/40',
      gaming: 'bg-indigo-600/20 text-indigo-300 border-indigo-600/40',
      travel: 'bg-cyan-600/20 text-cyan-300 border-cyan-600/40',
      food: 'bg-orange-600/20 text-orange-300 border-orange-600/40',
      fashion: 'bg-rose-600/20 text-rose-300 border-rose-600/40'
    };
    return colors[category] || 'bg-amber-600/20 text-amber-300 border-amber-600/40';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="h-full" data-id="t53wejnzs" data-path="src/components/Feed/ContentCard.tsx">

      <Card className="h-full bg-gradient-to-br from-amber-900/40 to-red-900/40 border border-amber-600/30 backdrop-blur-sm hover:border-amber-500/50 transition-all duration-300 western-card group overflow-hidden" data-id="vehtvfu4b" data-path="src/components/Feed/ContentCard.tsx">
        {/* Image Section */}
        <div className="relative overflow-hidden" data-id="sx9wls46p" data-path="src/components/Feed/ContentCard.tsx">
          <motion.img
            src={item.image}
            alt={item.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            whileHover={{ scale: 1.1 }} data-id="2xxl904dq" data-path="src/components/Feed/ContentCard.tsx" />

          
          {/* Overlay with quick actions */}
          <motion.div
            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }} data-id="xm5xkor1o" data-path="src/components/Feed/ContentCard.tsx">

            <Button
              size="sm"
              variant="ghost"
              onClick={handleToggleFavorite}
              className={`text-white hover:bg-white/20 ${item.isFavorite ? 'text-red-400' : ''}`} data-id="w1e1yna6f" data-path="src/components/Feed/ContentCard.tsx">

              <Heart className={`w-4 h-4 ${item.isFavorite ? 'fill-current' : ''}`} data-id="xbhyilmcr" data-path="src/components/Feed/ContentCard.tsx" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleShare}
              className="text-white hover:bg-white/20" data-id="3zn4zcimv" data-path="src/components/Feed/ContentCard.tsx">

              <Share2 className="w-4 h-4" data-id="csdj9zyzc" data-path="src/components/Feed/ContentCard.tsx" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20" data-id="i42lb21x4" data-path="src/components/Feed/ContentCard.tsx">

              <Bookmark className="w-4 h-4" data-id="swi0qx48a" data-path="src/components/Feed/ContentCard.tsx" />
            </Button>
          </motion.div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3" data-id="pnq289tcw" data-path="src/components/Feed/ContentCard.tsx">
            <Badge className={`${getCategoryColor(item.category)} border text-xs font-medium`} data-id="0oxw5nfqb" data-path="src/components/Feed/ContentCard.tsx">
              <span className="mr-1" data-id="tm9l9lwov" data-path="src/components/Feed/ContentCard.tsx">{getCategoryIcon(item.category)}</span>
              {item.category}
            </Badge>
          </div>

          {/* Trending Badge */}
          {item.trending &&
          <motion.div
            className="absolute top-3 right-3"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }} data-id="p5rngrcu1" data-path="src/components/Feed/ContentCard.tsx">

              <Badge className="bg-orange-600/90 text-white border-orange-500" data-id="jzb60t0dt" data-path="src/components/Feed/ContentCard.tsx">
                <TrendingUp className="w-3 h-3 mr-1" data-id="lqokzzpjj" data-path="src/components/Feed/ContentCard.tsx" />
                Trending
              </Badge>
            </motion.div>
          }
        </div>