import SettingsPanel from '@/components/Settings/SettingsPanel';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { initializePreferences, toggleSidebar } from '@/store/slices/userPreferencesSlice';
import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import MainContent from './MainContent';
import Sidebar from './Sidebar';

const DashboardLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sidebarCollapsed, darkMode } = useAppSelector((state) => state.userPreferences);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(false);

  // Handle mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize preferences and apply dark mode globally
  useEffect(() => {
    dispatch(initializePreferences());
  }, [dispatch]);

  // Apply dark mode class globally to html and body
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (darkMode) {
      html.classList.add('dark');
      body.classList.add('dark');
      body.style.backgroundColor = '#0f0f0f';
      body.style.color = '#ffffff';
    } else {
      html.classList.remove('dark');
      body.classList.remove('dark');
      body.style.backgroundColor = '#fefefe';
      body.style.color = '#000000';
    }

    // Apply to all elements
    const rootStyle = html.style;
    rootStyle.colorScheme = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // If searching, stay on current section but show search results
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    // Clear search when changing sections
    setSearchQuery('');
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  const handleSettingsClose = () => {
    setShowSettings(false);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-amber-50 via-red-50 to-orange-50 dark:from-gray-900 dark:via-amber-950 dark:to-red-950 western-bg relative overflow-hidden transition-colors duration-300`} data-id="uxt35r8ka" data-path="src/components/Dashboard/DashboardLayout.tsx">
      {/* Background texture and effects */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20" data-id="y3svbrwqy" data-path="src/components/Dashboard/DashboardLayout.tsx">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-200/20 via-transparent to-red-200/20 dark:from-amber-900/20 dark:to-red-900/20" data-id="2ad91r92y" data-path="src/components/Dashboard/DashboardLayout.tsx" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-amber-100/10 to-transparent dark:via-amber-950/10" data-id="mvtn98in8" data-path="src/components/Dashboard/DashboardLayout.tsx" />
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" data-id="htslw06uz" data-path="src/components/Dashboard/DashboardLayout.tsx">
        {[...Array(8)].map((_, i) =>
        <motion.div
          key={i}
          className="absolute text-amber-400/10 dark:text-amber-600/20 text-4xl"
          initial={{
            x: -100,
            y: Math.random() * window.innerHeight,
            rotate: 0,
            scale: 0.5 + Math.random() * 0.5
          }}
          animate={{
            x: window.innerWidth + 100,
            rotate: 360,
            scale: 0.8 + Math.random() * 0.4
          }}
          transition={{
            duration: 25 + Math.random() * 15,
            repeat: Infinity,
            ease: "linear",
            delay: i * 4
          }} data-id="xghbnvevk" data-path="src/components/Dashboard/DashboardLayout.tsx">

            {['🤠', '⭐', '🏔️', '🔥', '💎', '🌵', '🐎', '⚡'][i] || '🤠'}
          </motion.div>
        )}
      </div>

      <div className="relative flex h-screen" data-id="s4lp7z23o" data-path="src/components/Dashboard/DashboardLayout.tsx">
        {/* Sidebar */}
        <AnimatePresence mode="wait" data-id="niyrjahb8" data-path="src/components/Dashboard/DashboardLayout.tsx">
          {(!isMobile || !sidebarCollapsed) &&
          <motion.div
            initial={isMobile ? { x: -300 } : { width: 0 }}
            animate={isMobile ? { x: 0 } : { width: sidebarCollapsed ? 80 : 280 }}
            exit={isMobile ? { x: -300 } : { width: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`${isMobile ? 'fixed inset-y-0 left-0 z-50' : 'relative'} flex-shrink-0`} data-id="5cwxn9qf9" data-path="src/components/Dashboard/DashboardLayout.tsx">

              <Sidebar
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
              onSettingsClick={handleSettingsClick} data-id="ncw8e35yg" data-path="src/components/Dashboard/DashboardLayout.tsx" />

            </motion.div>
          }
        </AnimatePresence>

        {/* Mobile overlay */}
        {isMobile && !sidebarCollapsed &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40"
          onClick={handleToggleSidebar} data-id="pso6wqrq3" data-path="src/components/Dashboard/DashboardLayout.tsx" />

        }

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-w-0" data-id="9rgmens6e" data-path="src/components/Dashboard/DashboardLayout.tsx">
          <Header
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onToggleSidebar={handleToggleSidebar}
            isSidebarCollapsed={sidebarCollapsed}
            onSettingsClick={handleSettingsClick} data-id="itl452s67" data-path="src/components/Dashboard/DashboardLayout.tsx" />


          <motion.main
            className="flex-1 overflow-y-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }} data-id="ts2dvutnv" data-path="src/components/Dashboard/DashboardLayout.tsx">

            <MainContent
              searchQuery={searchQuery}
              activeSection={activeSection}
              onSectionChange={handleSectionChange} data-id="1h3q3f599" data-path="src/components/Dashboard/DashboardLayout.tsx" />

          </motion.main>
        </div>
      </div>

      {/* Settings Panel */}
      <AnimatePresence data-id="42p7znrig" data-path="src/components/Dashboard/DashboardLayout.tsx">
        {showSettings &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleSettingsClose} data-id="sgy3rmdct" data-path="src/components/Dashboard/DashboardLayout.tsx">

            <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[90vh] overflow-auto" data-id="9vi35sqp8" data-path="src/components/Dashboard/DashboardLayout.tsx">

              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-amber-200 dark:border-amber-800 p-6" data-id="vgcfuhyfd" data-path="src/components/Dashboard/DashboardLayout.tsx">
                <SettingsPanel onClose={handleSettingsClose} data-id="02nhlhf61" data-path="src/components/Dashboard/DashboardLayout.tsx" />
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>

      {/* Floating western elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-6 right-6 pointer-events-none" data-id="yj7sh7mzj" data-path="src/components/Dashboard/DashboardLayout.tsx">

        <motion.div
          className="text-amber-500/30 dark:text-amber-400/40 text-4xl"
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }} data-id="ldl9f19bg" data-path="src/components/Dashboard/DashboardLayout.tsx">

          ⭐
        </motion.div>
      </motion.div>

      {/* Corner accent */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
        className="fixed top-6 right-6 pointer-events-none" data-id="y7ho11q9j" data-path="src/components/Dashboard/DashboardLayout.tsx">

        <div className="text-amber-400/20 dark:text-amber-500/30 text-2xl" data-id="6wrni2oom" data-path="src/components/Dashboard/DashboardLayout.tsx">
          🤠
        </div>
      </motion.div>
    </div>);

};

export default DashboardLayout;