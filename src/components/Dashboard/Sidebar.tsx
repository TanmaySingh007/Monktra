import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { toggleSidebar } from '@/store/slices/userPreferencesSlice';
import {
    ChevronLeft,
    ChevronRight,
    Heart,
    Home,
    Package,
    Settings,
    Star,
    TrendingUp
} from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';

interface SidebarProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
  onSettingsClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeSection = 'dashboard',
  onSectionChange,
  onSettingsClick
}) => {
  const dispatch = useAppDispatch();
  const { sidebarCollapsed } = useAppSelector((state) => state.userPreferences);

  const menuItems = [
  { icon: Home, label: 'Dashboard', id: 'dashboard', color: 'text-blue-500' },
  { icon: TrendingUp, label: 'Trending', id: 'trending', color: 'text-red-500' },
  { icon: Heart, label: 'Favorites', id: 'favorites', color: 'text-pink-500' },
  { icon: Package, label: 'Orders', id: 'orders', color: 'text-amber-500' },
  { icon: Settings, label: 'Settings', id: 'settings', color: 'text-gray-500', onClick: onSettingsClick }];


  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleItemClick = (item: typeof menuItems[0]) => {
    if (item.onClick) {
      item.onClick();
    } else {
      onSectionChange?.(item.id);
    }
  };

  return (
    <motion.aside
      initial={false}
      animate={{
        width: sidebarCollapsed ? 64 : 256
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl z-10 flex flex-col border-r border-amber-200 dark:border-amber-800" data-id="8neizjjkc" data-path="src/components/Dashboard/Sidebar.tsx">

      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-amber-200 dark:border-amber-800" data-id="m3ezzw3d1" data-path="src/components/Dashboard/Sidebar.tsx">
        <motion.div
          initial={false}
          animate={{
            opacity: sidebarCollapsed ? 0 : 1,
            scale: sidebarCollapsed ? 0.8 : 1
          }}
          transition={{ duration: 0.2 }}
          className="flex items-center space-x-3" data-id="7f1za00c3" data-path="src/components/Dashboard/Sidebar.tsx">

          {!sidebarCollapsed &&
          <>
              <motion.div
              className="w-8 h-8 bg-gradient-to-br from-amber-600 to-red-700 rounded-lg flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }} data-id="omjiw0o27" data-path="src/components/Dashboard/Sidebar.tsx">

                <span className="text-white font-bold text-sm" data-id="0il2a9yzu" data-path="src/components/Dashboard/Sidebar.tsx">M</span>
              </motion.div>
              <motion.span
              className="font-bold text-lg bg-gradient-to-r from-amber-600 to-red-700 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }} data-id="l5q09za5n" data-path="src/components/Dashboard/Sidebar.tsx">

                Monktra
              </motion.span>
            </>
          }
        </motion.div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggleSidebar}
          className="p-1 h-8 w-8 hover:bg-amber-100 dark:hover:bg-amber-900/50" data-id="q20xrvbee" data-path="src/components/Dashboard/Sidebar.tsx">

          {sidebarCollapsed ?
          <ChevronRight className="h-4 w-4" data-id="78gnqxc0k" data-path="src/components/Dashboard/Sidebar.tsx" /> :
          <ChevronLeft className="h-4 w-4" data-id="thylyyena" data-path="src/components/Dashboard/Sidebar.tsx" />
          }
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6" data-id="oaztyyqxv" data-path="src/components/Dashboard/Sidebar.tsx">
        <ul className="space-y-2 px-3" data-id="f8nculjdw" data-path="src/components/Dashboard/Sidebar.tsx">
          {menuItems.map((item) =>
          <li key={item.id} data-id="wbn4rb5o5" data-path="src/components/Dashboard/Sidebar.tsx">
              <motion.button
              whileHover={{ scale: 1.02, x: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleItemClick(item)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 ${
              activeSection === item.id ?
              'bg-gradient-to-r from-amber-100 to-red-100 dark:from-amber-900/50 dark:to-red-900/50 text-amber-700 dark:text-amber-300 shadow-md border border-amber-200 dark:border-amber-700' :
              'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-amber-50 hover:to-red-50 dark:hover:from-amber-900/20 dark:hover:to-red-900/20'} ${

              sidebarCollapsed ? 'justify-center' : 'justify-start'}`
              } data-id="8zjfgwmtv" data-path="src/components/Dashboard/Sidebar.tsx">

                <motion.div
                whileHover={{ rotate: activeSection === item.id ? 360 : 0 }}
                transition={{ duration: 0.3 }} data-id="gmmqdcu8x" data-path="src/components/Dashboard/Sidebar.tsx">

                  <item.icon className={`h-5 w-5 flex-shrink-0 ${activeSection === item.id ? item.color : ''}`} data-id="vkgrqj39p" data-path="src/components/Dashboard/Sidebar.tsx" />
                </motion.div>
                <motion.span
                initial={false}
                animate={{
                  opacity: sidebarCollapsed ? 0 : 1,
                  width: sidebarCollapsed ? 0 : 'auto'
                }}
                transition={{ duration: 0.2 }}
                className="font-medium overflow-hidden whitespace-nowrap" data-id="667jyicte" data-path="src/components/Dashboard/Sidebar.tsx">

                  {item.label}
                </motion.span>
                {activeSection === item.id && !sidebarCollapsed &&
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }} data-id="xb8q741op" data-path="src/components/Dashboard/Sidebar.tsx">

                    <Star className="h-4 w-4 text-amber-500 fill-current ml-auto" data-id="2775x9rcy" data-path="src/components/Dashboard/Sidebar.tsx" />
                  </motion.div>
              }
              </motion.button>
            </li>
          )}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-amber-200 dark:border-amber-800" data-id="o52yf2zma" data-path="src/components/Dashboard/Sidebar.tsx">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: sidebarCollapsed ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="text-center" data-id="zls4hhjln" data-path="src/components/Dashboard/Sidebar.tsx">

          {!sidebarCollapsed &&
          <p className="text-xs text-gray-500 dark:text-gray-400" data-id="njqcqqypo" data-path="src/components/Dashboard/Sidebar.tsx">
              Red Dead Redemption Inspired
            </p>
          }
        </motion.div>
      </div>
    </motion.aside>);

};

export default Sidebar;