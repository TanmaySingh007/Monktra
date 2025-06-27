import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserPreferences {
  darkMode: boolean;
  selectedCategories: string[];
  sidebarCollapsed: boolean;
  language: string;
  favorites: string[]; // Array of content item IDs
}

const initialState: UserPreferences = {
  darkMode: false,
  selectedCategories: ['technology', 'business', 'entertainment'],
  sidebarCollapsed: false,
  language: 'en',
  favorites: []
};

// Load preferences from localStorage
const loadPreferences = (): UserPreferences => {
  try {
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
      return { ...initialState, ...JSON.parse(saved) };
    }
  } catch (error) {
    console.error('Failed to load user preferences:', error);
  }
  return initialState;
};

const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState: loadPreferences(),
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('userPreferences', JSON.stringify(state));
      // Apply dark mode to document
      if (state.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
      localStorage.setItem('userPreferences', JSON.stringify(state));
    },
    updateCategories: (state, action: PayloadAction<string[]>) => {
      state.selectedCategories = action.payload;
      localStorage.setItem('userPreferences', JSON.stringify(state));
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      localStorage.setItem('userPreferences', JSON.stringify(state));
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const index = state.favorites.indexOf(itemId);

      if (index > -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(itemId);
      }

      localStorage.setItem('userPreferences', JSON.stringify(state));
    },
    initializePreferences: (state) => {
      // Apply dark mode on initialization
      if (state.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
});

export const {
  toggleDarkMode,
  toggleSidebar,
  updateCategories,
  setLanguage,
  toggleFavorite,
  initializePreferences
} = userPreferencesSlice.actions;

export default userPreferencesSlice.reducer;