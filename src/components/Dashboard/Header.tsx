import AuthModal from '@/components/Auth/AuthModal';
import NotificationCenter from '@/components/Notifications/NotificationCenter';
import ProfileModal from '@/components/Profile/ProfileModal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { useSearch } from '@/hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { toggleDarkMode } from '@/store/slices/userPreferencesSlice';
import {
    Bell,
    LogIn,
    LogOut,
    Menu,
    Moon,
    Search,
    Settings,
    Sun,
    UserPlus,
    X
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useState } from 'react';

interface HeaderProps {
  onSearchChange: (query: string) => void;
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
  onSettingsClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onSearchChange,
  onToggleSidebar,
  isSidebarCollapsed,
  onSettingsClick
}) => {
  const dispatch = useAppDispatch();
  const { darkMode } = useAppSelector((state) => state.userPreferences);
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  // Enhanced search with debouncing
  const {
    searchQuery,
    debouncedSearchQuery,
    isSearching,
    handleSearchChange: handleSearchInput,
    setSearchQuery
  } = useSearch('', 300);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Handle debounced search
  useEffect(() => {
    onSearchChange(debouncedSearchQuery);
  }, [debouncedSearchQuery, onSearchChange]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    handleSearchInput(query, onSearchChange);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearchChange('');
  };

  const handleAuthSuccess = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: "Logged out successfully",
      description: "See you on the frontier, partner!"
    });
  };

  const openAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <>
      <motion.header
        className="sticky top-0 z-40 w-full bg-gradient-to-r from-amber-900/95 to-red-900/95 backdrop-blur-xl border-b border-amber-600/30 leather-texture"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }} data-id="v39hyr9t8" data-path="src/components/Dashboard/Header.tsx">

        <div className="flex h-16 items-center px-6 gap-4" data-id="58priwx51" data-path="src/components/Dashboard/Header.tsx">
          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="md:hidden text-amber-300 hover:text-amber-100 hover:bg-amber-600/20" data-id="acyux0yj0" data-path="src/components/Dashboard/Header.tsx">

            <AnimatePresence mode="wait" data-id="mmvfokvj6" data-path="src/components/Dashboard/Header.tsx">
              {isSidebarCollapsed ?
              <motion.div
                key="menu"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }} data-id="q7h9dir1e" data-path="src/components/Dashboard/Header.tsx">

                  <Menu className="h-5 w-5" data-id="i5kxohprr" data-path="src/components/Dashboard/Header.tsx" />
                </motion.div> :

              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }} data-id="b4syrawoc" data-path="src/components/Dashboard/Header.tsx">

                  <X className="h-5 w-5" data-id="gzr05lf11" data-path="src/components/Dashboard/Header.tsx" />
                </motion.div>
              }
            </AnimatePresence>
          </Button>

          {/* Logo */}
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }} data-id="n5fs6bpxf" data-path="src/components/Dashboard/Header.tsx">

            <div className="text-3xl font-bold bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent western-title" data-id="286lyzq3f" data-path="src/components/Dashboard/Header.tsx">
              Monktra
            </div>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="text-2xl" data-id="6o8rh1zzs" data-path="src/components/Dashboard/Header.tsx">

              🤠
            </motion.div>
          </motion.div>

          {/* Enhanced Search Bar */}
          <motion.div
            className="flex-1 max-w-md mx-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }} data-id="qnkt5y7cv" data-path="src/components/Dashboard/Header.tsx">

            <div className="relative" data-id="3kcwc0x8p" data-path="src/components/Dashboard/Header.tsx">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 h-4 w-4" data-id="txo2594jf" data-path="src/components/Dashboard/Header.tsx" />
              <Input
                type="search"
                placeholder="Search the frontier..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10 pr-12 bg-black/30 border-amber-600/50 text-amber-100 placeholder:text-amber-400/70 focus:border-amber-500 focus:ring-amber-500/50 western-text" data-id="yydlg4drl" data-path="src/components/Dashboard/Header.tsx" />

              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1" data-id="nwt9s2p47" data-path="src/components/Dashboard/Header.tsx">
                {isSearching &&
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-3 h-3 border border-amber-400 border-t-transparent rounded-full animate-spin" data-id="4apxm9qob" data-path="src/components/Dashboard/Header.tsx" />

                }
                {searchQuery &&
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }} data-id="ygv0gbzm7" data-path="src/components/Dashboard/Header.tsx">

                    <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearSearch}
                    className="h-6 w-6 p-0 text-amber-400 hover:text-amber-200" data-id="dd558oujg" data-path="src/components/Dashboard/Header.tsx">

                      <X className="h-3 w-3" data-id="o0gtf06xd" data-path="src/components/Dashboard/Header.tsx" />
                    </Button>
                  </motion.div>
                }
              </div>
            </div>
          </motion.div>

          {/* Header Actions */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }} data-id="hs8dr7dnp" data-path="src/components/Dashboard/Header.tsx">

            {/* Dark Mode Toggle */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} data-id="ld4nb6cjr" data-path="src/components/Dashboard/Header.tsx">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dispatch(toggleDarkMode())}
                className="text-amber-300 hover:text-amber-100 hover:bg-amber-600/20" data-id="6l5gt287n" data-path="src/components/Dashboard/Header.tsx">

                <AnimatePresence mode="wait" data-id="m88dr4q33" data-path="src/components/Dashboard/Header.tsx">
                  {darkMode ?
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }} data-id="6bdcvk79z" data-path="src/components/Dashboard/Header.tsx">

                      <Sun className="h-5 w-5" data-id="t4ke7uai7" data-path="src/components/Dashboard/Header.tsx" />
                    </motion.div> :

                  <motion.div
                    key="moon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }} data-id="96quzkjlh" data-path="src/components/Dashboard/Header.tsx">

                      <Moon className="h-5 w-5" data-id="bwamtlxyk" data-path="src/components/Dashboard/Header.tsx" />
                    </motion.div>
                  }
                </AnimatePresence>
              </Button>
            </motion.div>

            {user ?
            <>
                {/* Notification Bell */}
                <motion.div className="relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} data-id="mwkpujp34" data-path="src/components/Dashboard/Header.tsx">
                  <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotifications(true)}
                  className="text-amber-300 hover:text-amber-100 hover:bg-amber-600/20 relative" data-id="22s5wlwi2" data-path="src/components/Dashboard/Header.tsx">

                    <motion.div
                    animate={notificationCount > 0 ? { rotate: [0, 15, -15, 0] } : {}}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }} data-id="rhmx2escg" data-path="src/components/Dashboard/Header.tsx">

                      <Bell className="h-5 w-5" data-id="l6rcthcwh" data-path="src/components/Dashboard/Header.tsx" />
                    </motion.div>
                    {notificationCount > 0 &&
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold" data-id="l0r6ir0c7" data-path="src/components/Dashboard/Header.tsx">

                        {notificationCount > 9 ? '9+' : notificationCount}
                      </motion.div>
                  }
                  </Button>
                </motion.div>

                {/* Settings */}
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} data-id="4nx7hfozy" data-path="src/components/Dashboard/Header.tsx">
                  <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSettingsClick}
                  className="text-amber-300 hover:text-amber-100 hover:bg-amber-600/20" data-id="uh4zeiwjs" data-path="src/components/Dashboard/Header.tsx">

                    <Settings className="h-5 w-5" data-id="af15qh6l5" data-path="src/components/Dashboard/Header.tsx" />
                  </Button>
                </motion.div>

                {/* User Avatar */}
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} data-id="8i36crdfi" data-path="src/components/Dashboard/Header.tsx">
                  <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowProfile(true)}
                  className="p-1 text-amber-300 hover:bg-amber-600/20" data-id="xfksfb07c" data-path="src/components/Dashboard/Header.tsx">

                    <Avatar className="h-8 w-8 border-2 border-amber-400/50" data-id="v56ua9ncb" data-path="src/components/Dashboard/Header.tsx">
                      <AvatarImage src={user?.avatar} alt={user?.name} data-id="7rr74rmzx" data-path="src/components/Dashboard/Header.tsx" />
                      <AvatarFallback className="bg-amber-600 text-white text-sm" data-id="8jp9qt2qr" data-path="src/components/Dashboard/Header.tsx">
                        {user?.name?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </motion.div>

                {/* Logout */}
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} data-id="9xmgt55j9" data-path="src/components/Dashboard/Header.tsx">
                  <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 hover:bg-red-600/20" data-id="fnw69xjvu" data-path="src/components/Dashboard/Header.tsx">

                    <LogOut className="h-5 w-5" data-id="p78v2gvmp" data-path="src/components/Dashboard/Header.tsx" />
                  </Button>
                </motion.div>
              </> :

            <>
                {/* Sign In */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} data-id="gosoxol2b" data-path="src/components/Dashboard/Header.tsx">
                  <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openAuth('signin')}
                  className="text-amber-300 hover:text-amber-100 hover:bg-amber-600/20 western-text" data-id="jaj6h7pox" data-path="src/components/Dashboard/Header.tsx">

                    <LogIn className="h-4 w-4 mr-2" data-id="t7gtli01a" data-path="src/components/Dashboard/Header.tsx" />
                    Sign In
                  </Button>
                </motion.div>

                {/* Sign Up */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} data-id="83lwy9x5t" data-path="src/components/Dashboard/Header.tsx">
                  <Button
                  size="sm"
                  onClick={() => openAuth('signup')}
                  className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-black font-bold western-button" data-id="i40hcxqwp" data-path="src/components/Dashboard/Header.tsx">

                    <UserPlus className="h-4 w-4 mr-2" data-id="ngzhd42wq" data-path="src/components/Dashboard/Header.tsx" />
                    Join Now
                  </Button>
                </motion.div>
              </>
            }
          </motion.div>
        </div>

        {/* Decorative border */}
        <motion.div
          className="h-1 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }} data-id="1o1nlui3d" data-path="src/components/Dashboard/Header.tsx" />

      </motion.header>

      {/* Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
        onSuccess={handleAuthSuccess} data-id="msdez26wn" data-path="src/components/Dashboard/Header.tsx" />


      <NotificationCenter
        isOpen={showNotifications}
        onClose={() => {
          setShowNotifications(false);
          setNotificationCount(0);
        }} data-id="3j1ibo14t" data-path="src/components/Dashboard/Header.tsx" />


      <ProfileModal
        isOpen={showProfile}
        onClose={() => setShowProfile(false)} data-id="5lrwdqib8" data-path="src/components/Dashboard/Header.tsx" />

    </>);

};

export default Header;