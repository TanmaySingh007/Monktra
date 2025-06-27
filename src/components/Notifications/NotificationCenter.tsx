import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Bell, Check, Heart, MessageCircle, Star, TrendingUp, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React, { useState } from 'react';

interface Notification {
  id: string;
  type: 'trending' | 'favorite' | 'comment' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  avatar?: string;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
  {
    id: '1',
    type: 'trending',
    title: 'Breaking News!',
    message: 'New technological breakthrough in AI development is trending now',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
    avatar: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '2',
    type: 'favorite',
    title: 'New in Your Favorites',
    message: 'A new article matching your interests has been added',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    read: false
  },
  {
    id: '3',
    type: 'system',
    title: 'Welcome to Monktra!',
    message: 'Discover personalized content tailored just for you',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: true
  },
  {
    id: '4',
    type: 'comment',
    title: 'Trending Discussion',
    message: 'Join the conversation about the latest movie releases',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false
  }]
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'trending':return <TrendingUp className="w-5 h-5 text-orange-400" data-id="zzvt79lao" data-path="src/components/Notifications/NotificationCenter.tsx" />;
      case 'favorite':return <Heart className="w-5 h-5 text-red-400" data-id="8ssqvalhu" data-path="src/components/Notifications/NotificationCenter.tsx" />;
      case 'comment':return <MessageCircle className="w-5 h-5 text-blue-400" data-id="4tc9jyt0g" data-path="src/components/Notifications/NotificationCenter.tsx" />;
      default:return <Star className="w-5 h-5 text-amber-400" data-id="tzfazf3j1" data-path="src/components/Notifications/NotificationCenter.tsx" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
    prev.map((n) => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast({
      title: "All notifications marked as read",
      description: "Your notification center is now up to date"
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp.toLocaleDateString();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
      onClick={onClose} data-id="30vzcbib2" data-path="src/components/Notifications/NotificationCenter.tsx">

      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md mx-4" data-id="z4gvjz3js" data-path="src/components/Notifications/NotificationCenter.tsx">

        <Card className="bg-gradient-to-br from-amber-900/95 to-red-900/95 border border-amber-600/50 backdrop-blur-xl" data-id="ufdo6s6yq" data-path="src/components/Notifications/NotificationCenter.tsx">
          <div className="p-6" data-id="cs39toga6" data-path="src/components/Notifications/NotificationCenter.tsx">
            <div className="flex items-center justify-between mb-6" data-id="5z7iiajpr" data-path="src/components/Notifications/NotificationCenter.tsx">
              <div className="flex items-center gap-3" data-id="750rjpckw" data-path="src/components/Notifications/NotificationCenter.tsx">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }} data-id="17huzqi58" data-path="src/components/Notifications/NotificationCenter.tsx">

                  <Bell className="w-6 h-6 text-amber-400" data-id="b2a29n707" data-path="src/components/Notifications/NotificationCenter.tsx" />
                </motion.div>
                <h2 className="text-xl font-bold text-amber-100" data-id="p6v8dvplv" data-path="src/components/Notifications/NotificationCenter.tsx">Notifications</h2>
                {unreadCount > 0 &&
                <Badge className="bg-red-600 text-white" data-id="kgotq2z4j" data-path="src/components/Notifications/NotificationCenter.tsx">
                    {unreadCount}
                  </Badge>
                }
              </div>
              <div className="flex items-center gap-2" data-id="mrol98jz3" data-path="src/components/Notifications/NotificationCenter.tsx">
                {unreadCount > 0 &&
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-amber-300 hover:text-amber-200 text-xs" data-id="khi4r8c5x" data-path="src/components/Notifications/NotificationCenter.tsx">

                    <Check className="w-4 h-4 mr-1" data-id="kc88g110b" data-path="src/components/Notifications/NotificationCenter.tsx" />
                    Mark all read
                  </Button>
                }
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-amber-300 hover:text-amber-200" data-id="v6e077ort" data-path="src/components/Notifications/NotificationCenter.tsx">

                  <X className="w-4 h-4" data-id="cghqlaf3r" data-path="src/components/Notifications/NotificationCenter.tsx" />
                </Button>
              </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar" data-id="di1nn9kye" data-path="src/components/Notifications/NotificationCenter.tsx">
              <AnimatePresence data-id="zi9t1h0zw" data-path="src/components/Notifications/NotificationCenter.tsx">
                {notifications.map((notification) =>
                <motion.div
                  key={notification.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                  notification.read ?
                  'bg-black/20 border border-amber-600/20' :
                  'bg-amber-500/10 border border-amber-500/40 shadow-lg'}`
                  }
                  onClick={() => markAsRead(notification.id)}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(0, 0, 0, 0.3)' }} data-id="dd81yyjz7" data-path="src/components/Notifications/NotificationCenter.tsx">

                    <div className="flex items-start gap-3" data-id="29reni7bu" data-path="src/components/Notifications/NotificationCenter.tsx">
                      <div className="flex-shrink-0 mt-1" data-id="jgcm9ye86" data-path="src/components/Notifications/NotificationCenter.tsx">
                        {notification.avatar ?
                      <img
                        src={notification.avatar}
                        alt=""
                        className="w-8 h-8 rounded-full" data-id="noa5fzdk3" data-path="src/components/Notifications/NotificationCenter.tsx" /> :


                      getNotificationIcon(notification.type)
                      }
                      </div>
                      <div className="flex-1 min-w-0" data-id="g1mlzxbnt" data-path="src/components/Notifications/NotificationCenter.tsx">
                        <div className="flex items-start justify-between" data-id="zfg5dvy98" data-path="src/components/Notifications/NotificationCenter.tsx">
                          <h4 className={`font-semibold text-sm ${
                        notification.read ? 'text-amber-300' : 'text-amber-100'}`
                        } data-id="hi3smutb5" data-path="src/components/Notifications/NotificationCenter.tsx">
                            {notification.title}
                          </h4>
                          <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className="text-amber-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity" data-id="oh73i4e0r" data-path="src/components/Notifications/NotificationCenter.tsx">

                            <X className="w-3 h-3" data-id="tyb679sfe" data-path="src/components/Notifications/NotificationCenter.tsx" />
                          </Button>
                        </div>
                        <p className={`text-sm mt-1 ${
                      notification.read ? 'text-amber-400' : 'text-amber-200'}`
                      } data-id="f6y7wspax" data-path="src/components/Notifications/NotificationCenter.tsx">
                          {notification.message}
                        </p>
                        <p className="text-xs text-amber-500 mt-2" data-id="73dee5diu" data-path="src/components/Notifications/NotificationCenter.tsx">
                          {formatTime(notification.timestamp)}
                        </p>
                      </div>
                      {!notification.read &&
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0 mt-2" data-id="emt3hr32e" data-path="src/components/Notifications/NotificationCenter.tsx" />

                    }
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {notifications.length === 0 &&
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8" data-id="3bayuo2nd" data-path="src/components/Notifications/NotificationCenter.tsx">

                <Bell className="w-12 h-12 text-amber-600 mx-auto mb-4" data-id="u7l83caw1" data-path="src/components/Notifications/NotificationCenter.tsx" />
                <p className="text-amber-300" data-id="17v9vqzt6" data-path="src/components/Notifications/NotificationCenter.tsx">No notifications yet</p>
                <p className="text-amber-500 text-sm" data-id="gode424yw" data-path="src/components/Notifications/NotificationCenter.tsx">We'll notify you when something interesting happens</p>
              </motion.div>
            }
          </div>
        </Card>
      </motion.div>
    </motion.div>);

};

export default NotificationCenter;