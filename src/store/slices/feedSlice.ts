import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  type: 'news' | 'movie' | 'music' | 'social' | 'gaming' | 'sports' | 'technology' | 'travel' | 'food' | 'fashion';
  url?: string;
  author?: string;
  publishedAt: string;
  isFavorite: boolean;
  trending?: boolean;
  rating?: number;
  tags?: string[];
  order?: number; // Add order field for drag-and-drop
}

interface FeedState {
  items: ContentItem[];
  trendingItems: ContentItem[];
  searchResults: ContentItem[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  hasMoreItems: boolean;
  searchQuery: string;
  customOrder: string[]; // Store custom order of items
}

const initialState: FeedState = {
  items: [],
  trendingItems: [],
  searchResults: [],
  loading: false,
  error: null,
  currentPage: 1,
  hasMoreItems: true,
  searchQuery: '',
  customOrder: []
};

// Enhanced mock data with much more content
const generateMockContent = (page: number = 1, category?: string, query?: string): ContentItem[] => {
  const categories = ['technology', 'sports', 'movies', 'music', 'gaming', 'travel', 'food', 'fashion'];
  const types: ContentItem['type'][] = ['news', 'movie', 'music', 'social', 'gaming', 'sports', 'technology', 'travel', 'food', 'fashion'];

  const baseMockItems: ContentItem[] = [
  // Technology
  {
    id: `tech-${page}-1`,
    title: 'Revolutionary AI Breakthrough Changes Everything',
    description: 'Scientists have developed a new AI system that can understand and generate human emotions with unprecedented accuracy.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
    category: 'technology',
    type: 'technology',
    author: 'Dr. Sarah Chen',
    publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    isFavorite: Math.random() > 0.7,
    trending: Math.random() > 0.6,
    rating: 4.5 + Math.random() * 0.5,
    tags: ['AI', 'Innovation', 'Future'],
    order: 0
  },
  {
    id: `tech-${page}-2`,
    title: 'Quantum Computing Reaches New Milestone',
    description: 'Researchers achieve quantum supremacy in solving complex mathematical problems that would take classical computers centuries.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop',
    category: 'technology',
    type: 'technology',
    author: 'Prof. Michael Rodriguez',
    publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    isFavorite: Math.random() > 0.7,
    trending: Math.random() > 0.6,
    rating: 4.7 + Math.random() * 0.3,
    tags: ['Quantum', 'Computing', 'Science'],
    order: 1
  },
  {
    id: `tech-${page}-3`,
    title: 'Breakthrough in Neural Interface Technology',
    description: 'New brain-computer interface allows paralyzed patients to control devices with thought alone.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
    category: 'technology',
    type: 'technology',
    author: 'Dr. Emily Watson',
    publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    isFavorite: Math.random() > 0.7,
    trending: Math.random() > 0.8,
    rating: 4.9 + Math.random() * 0.1,
    tags: ['Neural', 'Interface', 'Medical'],
    order: 2
  },
  // Movies
  {
    id: `movie-${page}-1`,
    title: 'Epic Western Saga Dominates Box Office',
    description: 'A new western film featuring stunning cinematography and compelling storytelling breaks opening weekend records.',
    image: 'https://images.unsplash.com/photo-1489599735756-1baabae0724d?w=400&h=250&fit=crop',
    category: 'movies',
    type: 'movie',
    author: 'Entertainment Weekly',
    publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    isFavorite: Math.random() > 0.7,
    trending: Math.random() > 0.5,
    rating: 4.3 + Math.random() * 0.7,
    tags: ['Western', 'Drama', 'Action'],
    order: 3
  },
  {
    id: `movie-${page}-2`,
    title: 'Acclaimed Director Announces New Project',
    description: 'Award-winning filmmaker reveals details about their upcoming sci-fi thriller set in the near future.',
    image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=250&fit=crop',
    category: 'movies',
    type: 'movie',
    author: 'Hollywood Reporter',
    publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    isFavorite: Math.random() > 0.7,
    trending: Math.random() > 0.5,
    rating: 4.6 + Math.random() * 0.4,
    tags: ['Sci-Fi', 'Thriller', 'Future'],
    order: 4
  },
  {
    id: `movie-${page}-3`,
    title: 'Independent Film Festival Winners Announced',
    description: 'Celebrating innovative storytelling and diverse voices in cinema from around the world.',
    image: 'https://images.unsplash.com/photo-1478720568477-b0ac8db7c8c8?w=400&h=250&fit=crop',
    category: 'movies',
    type: 'movie',
    author: 'Film Festival Daily',
    publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    isFavorite: Math.random() > 0.7,
    trending: Math.random() > 0.4,
    rating: 4.2 + Math.random() * 0.8,
    tags: ['Independent', 'Festival', 'Awards'],
    order: 5
  },
  // Music
  {
    id: `music-${page}-1`,
    title: 'Country Legend Releases Surprise Album',
    description: 'Beloved country artist drops unexpected album featuring collaborations with contemporary stars.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop',
    category: 'music',
    type: 'music',
    author: 'Music News Daily',
    publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    isFavorite: Math.random() > 0.7,
    trending: Math.random() > 0.6,
    rating: 4.4 + Math.random() * 0.6,
    tags: ['Country', 'Album', 'Collaboration'],
    order: 6
  },
  {
    id: `music-${page}-2`,
    title: 'Electronic Music Festival Breaks Attendance Records',
    description: 'Thousands gather for the biggest electronic music celebration of the year with world-class DJs.',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=250&fit=crop',
    category: 'music',
    type: 'music',
    author: 'EDM Weekly',
    publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    isFavorite: Math.random() > 0.7,
    trending: Math.random() > 0.8,
    rating: 4.6 + Math.random() * 0.4,
    tags: ['Electronic', 'Festival', 'DJs'],
    order: 7
  },
  // Sports
  {
    id: `sports-${page}-1`,
    title: 'Underdog Team Wins Championship',
    description: 'Against all odds, the rookie-filled team defeats the defending champions in a thrilling finale.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=250&fit=crop',
    category: 'sports',
    type: 'sports',
    author: 'Sports Central',
    publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    isFavorite: Math.random() > 0.7,
    trending: Math.random() > 0.7,
    rating: 4.8 + Math.random() * 0.2,
    tags: ['Championship', 'Underdog', 'Victory'],
    order: 8
  },
  {
    id: `sports-${page}-2`,
    title: 'Olympic Records Shattered in Swimming',
    description: 'Multiple world records broken as swimmers push the boundaries of human performance.',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=250&fit=crop',
    category: 'sports',
    type: 'sports',
    author: 'Olympic News',
    publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    isFavorite: Math.random() > 0.7,
    trending: Math.random() > 0.9,
    rating: 4.9 + Math.random() * 0.1,
    tags: ['Olympics', 'Swimming', 'Records'],
    order: 9
  },
  // Gaming
  {
    id: `gaming-${page}-1`,
    title: 'Open-World Adventure Game Sets New Standards',
    description: 'Latest release combines stunning visuals with innovative gameplay mechanics, earning universal praise.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop',
    category: 'gaming',
    type: 'gaming',
    author: 'GameSpot',
    publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    isFavorite: Math.random() > 0.7,
    trending: Math.random() > 0.6,
    rating: 4.7 + Math.random() * 0.3,
    tags: ['Open-World', 'Adventure', 'Innovation'],
    order: 10
  },
  {
    id: `gaming-${page}-2`,
    title: 'Esports Tournament Draws Record Viewership',
    description: 'Professional gaming championship attracts millions of viewers worldwide, setting new industry benchmarks.',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=250&fit=crop',
    category: 'gaming',
    type: 'gaming',
    author: 'Esports Daily',
    publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    isFavorite: Math.random() > 0.7,
    trending: Math.random() > 0.8,
    rating: 4.5 + Math.random() * 0.5,
    tags: ['Esports', 'Tournament', 'Championship'],
    order: 11
  },
  // Travel
  {
    id: `travel-${page}-1`,
    title: 'Hidden Gems: Remote Western Towns Worth Visiting',
    description: 'Discover charming frontier towns that preserve the spirit of the Old West with modern amenities.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
    category: 'travel',
    type: 'travel',
    author: 'Travel & Leisure',
    publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    isFavorite: Math.random() > 0.7,
    trending: Math.random() > 0.5,
    rating: 4.2 + Math.random() * 0.8,
    tags: ['Western', 'Towns', 'Hidden Gems'],
    order: 12
  },
  {
    id: `travel-${page}-2`,
    title: 'Adventure Tourism Booms in Mountain Regions',
    description: 'Rock climbing, hiking, and extreme sports attract thrill-seekers to remote mountain destinations.',
    image: 'https://images.unsplash.com/photo-1464822759844-d150baec4ba5?w=400&h=250&fit=crop',
    category: 'travel',
    type: 'travel',
    author: 'Adventure Travel Magazine',
    publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    isFavorite: Math.random() > 0.7,
    trending: Math.random() > 0.6,
    rating: 4.4 + Math.random() * 0.6,
    tags: ['Adventure', 'Mountains', 'Extreme Sports'],
    order: 13
  },
  // Food
  {
    id: `food-${page}-1`,
    title: 'Authentic Cowboy Cuisine Makes a Comeback',
    description: 'Traditional recipes from the frontier are being revived in modern restaurants across the country.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=250&fit=crop',
    category: 'food',
    type: 'food',
    author: 'Food Network',
    publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    isFavorite: Math.random() > 0.7,
    trending: Math.random() > 0.5,
    rating: 4.3 + Math.random() * 0.7,
    tags: ['Cowboy', 'Traditional', 'Revival'],
    order: 14
  },
  {
    id: `food-${page}-2`,
    title: 'Farm-to-Table Movement Grows in Rural Areas',
    description: 'Local farmers partner with restaurants to provide fresh, sustainable ingredients for innovative dishes.',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop',
    category: 'food',
    type: 'food',
    author: 'Sustainable Food Today',
    publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    isFavorite: Math.random() > 0.7,
    trending: Math.random() > 0.7,
    rating: 4.6 + Math.random() * 0.4,
    tags: ['Farm-to-Table', 'Sustainable', 'Local'],
    order: 15
  },
  // Fashion
  {
    id: `fashion-${page}-1`,
    title: 'Western Wear Trends Dominate Fashion Week',
    description: 'Designers showcase modern interpretations of classic western attire, from boots to bandanas.',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=250&fit=crop',
    category: 'fashion',
    type: 'fashion',
    author: 'Vogue',
    publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    isFavorite: Math.random() > 0.7,
    trending: Math.random() > 0.6,
    rating: 4.1 + Math.random() * 0.9,
    tags: ['Western', 'Fashion Week', 'Trends'],
    order: 16
  },
  {
    id: `fashion-${page}-2`,
    title: 'Sustainable Fashion Revolution Takes Hold',
    description: 'Eco-friendly materials and ethical production methods reshape the fashion industry landscape.',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=250&fit=crop',
    category: 'fashion',
    type: 'fashion',
    author: 'Sustainable Style',
    publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    isFavorite: Math.random() > 0.7,
    trending: Math.random() > 0.8,
    rating: 4.5 + Math.random() * 0.5,
    tags: ['Sustainable', 'Eco-Friendly', 'Ethical'],
    order: 17
  }];

  // Generate even more content by creating variations
  const extendedItems = [];
  for (let i = 0; i < 5; i++) {
    baseMockItems.forEach((item, index) => {
      const variations = [
      'Latest Update', 'Breaking News', 'Exclusive Report', 'Deep Dive', 'Analysis',
      'Behind the Scenes', 'Expert Opinion', 'Trending Now', 'Must Read', 'Hot Topic'];

      const variation = variations[Math.floor(Math.random() * variations.length)];

      extendedItems.push({
        ...item,
        id: `${item.id}-v${i}-${index}`,
        title: `${variation}: ${item.title}`,
        description: `${item.description} This comprehensive coverage brings you the latest insights and developments.`,
        publishedAt: new Date(Date.now() - Math.random() * 86400000 * (i + 1)).toISOString(),
        order: index + i * baseMockItems.length
      });
    });
  }

  let allItems = [...baseMockItems, ...extendedItems];

  // Filter by category
  if (category && category !== 'all') {
    allItems = allItems.filter((item) => item.category === category);
  }

  // Filter by search query
  if (query) {
    const lowercaseQuery = query.toLowerCase();
    allItems = allItems.filter((item) =>
    item.title.toLowerCase().includes(lowercaseQuery) ||
    item.description.toLowerCase().includes(lowercaseQuery) ||
    item.tags?.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  // Return paginated results (20 items per page)
  const startIndex = (page - 1) * 20;
  return allItems.slice(startIndex, startIndex + 20);
};

export const fetchFeedItems = createAsyncThunk(
  'feed/fetchFeedItems',
  async ({ page = 1, category }: {page?: number;category?: string;} = {}) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const items = generateMockContent(page, category);
    return {
      items,
      hasMore: page < 25, // Simulate having 25 pages of content
      page
    };
  }
);

export const fetchTrendingItems = createAsyncThunk(
  'feed/fetchTrendingItems',
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const allItems = generateMockContent(1);
    const trendingItems = allItems.
    filter((item) => item.trending).
    sort((a, b) => (b.rating || 0) - (a.rating || 0)).
    slice(0, 12);

    return trendingItems;
  }
);

export const searchContent = createAsyncThunk(
  'feed/searchContent',
  async (query: string) => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (!query.trim()) return [];

    // Search across multiple "pages" for more comprehensive results
    const searchResults = [];
    for (let page = 1; page <= 5; page++) {
      const pageResults = generateMockContent(page, undefined, query);
      searchResults.push(...pageResults);
    }

    return searchResults.slice(0, 50); // Limit to 50 search results
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;

      // Update in main items
      const mainItem = state.items.find((item) => item.id === itemId);
      if (mainItem) {
        mainItem.isFavorite = !mainItem.isFavorite;
      }

      // Update in trending items
      const trendingItem = state.trendingItems.find((item) => item.id === itemId);
      if (trendingItem) {
        trendingItem.isFavorite = !trendingItem.isFavorite;
      }

      // Update in search results
      const searchItem = state.searchResults.find((item) => item.id === itemId);
      if (searchItem) {
        searchItem.isFavorite = !searchItem.isFavorite;
      }
    },
    clearSearch: (state) => {
      state.searchResults = [];
      state.searchQuery = '';
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    resetFeed: (state) => {
      state.items = [];
      state.currentPage = 1;
      state.hasMoreItems = true;
    },
    clearFeed: (state) => {
      state.items = [];
      state.trendingItems = [];
      state.searchResults = [];
      state.currentPage = 1;
      state.hasMoreItems = true;
      state.searchQuery = '';
      state.customOrder = [];
    },
    // New reducers for drag-and-drop functionality
    reorderItems: (state, action: PayloadAction<{fromIndex: number;toIndex: number;}>) => {
      const { fromIndex, toIndex } = action.payload;
      const item = state.items[fromIndex];

      // Remove item from original position
      state.items.splice(fromIndex, 1);
      // Insert item at new position
      state.items.splice(toIndex, 0, item);

      // Update custom order
      state.customOrder = state.items.map((item) => item.id);
    },
    saveCustomOrder: (state, action: PayloadAction<string[]>) => {
      state.customOrder = action.payload;
      // Save to localStorage
      localStorage.setItem('monktra_custom_order', JSON.stringify(action.payload));
    },
    loadCustomOrder: (state) => {
      const savedOrder = localStorage.getItem('monktra_custom_order');
      if (savedOrder) {
        state.customOrder = JSON.parse(savedOrder);
      }
    }
  },
  extraReducers: (builder) => {
    builder
    // Fetch feed items
    .addCase(fetchFeedItems.pending, (state) => {
      state.loading = true;
      state.error = null;
    }).
    addCase(fetchFeedItems.fulfilled, (state, action) => {
      state.loading = false;
      const { items, hasMore, page } = action.payload;

      if (page === 1) {
        state.items = items;
      } else {
        state.items = [...state.items, ...items];
      }

      state.currentPage = page;
      state.hasMoreItems = hasMore;
    }).
    addCase(fetchFeedItems.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch feed items';
    })

    // Fetch trending items
    .addCase(fetchTrendingItems.pending, (state) => {
      state.loading = true;
    }).
    addCase(fetchTrendingItems.fulfilled, (state, action) => {
      state.loading = false;
      state.trendingItems = action.payload;
    }).
    addCase(fetchTrendingItems.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch trending items';
    })

    // Search content
    .addCase(searchContent.pending, (state) => {
      state.loading = true;
    }).
    addCase(searchContent.fulfilled, (state, action) => {
      state.loading = false;
      state.searchResults = action.payload;
    }).
    addCase(searchContent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Search failed';
    });
  }
});

export const {
  toggleFavorite,
  clearSearch,
  setSearchQuery,
  resetFeed,
  reorderItems,
  saveCustomOrder,
  loadCustomOrder,
  clearFeed
} = feedSlice.actions;
export default feedSlice.reducer;