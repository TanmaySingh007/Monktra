import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Calendar, Edit3, Heart, Mail, MapPin, Star, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import React, { useEffect, useState } from 'react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    bio: '',
    location: ''
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setEditData({
        name: parsedUser.name || '',
        bio: parsedUser.bio || '',
        location: parsedUser.location || ''
      });
    }
  }, [isOpen]);

  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...editData,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);

    toast({
      title: "Profile updated!",
      description: "Your changes have been saved successfully"
    });
  };

  const stats = [
  { label: 'Favorites', value: 42, icon: Heart, color: 'text-red-400' },
  { label: 'Following', value: 18, icon: Star, color: 'text-amber-400' },
  { label: 'Trending Views', value: 156, icon: TrendingUp, color: 'text-green-400' }];


  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose} data-id="ba0jipkdd" data-path="src/components/Profile/ProfileModal.tsx">
      <DialogContent className="sm:max-w-2xl bg-gradient-to-br from-amber-900/95 to-red-900/95 border border-amber-600/50 backdrop-blur-xl" data-id="nxtv2jev1" data-path="src/components/Profile/ProfileModal.tsx">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }} data-id="6rbgtnabs" data-path="src/components/Profile/ProfileModal.tsx">

          <DialogHeader className="text-center pb-6" data-id="bzebjqhea" data-path="src/components/Profile/ProfileModal.tsx">
            <DialogTitle className="text-2xl font-bold text-amber-100" data-id="9kcirog6l" data-path="src/components/Profile/ProfileModal.tsx">
              Profile
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6" data-id="ex0uv91wc" data-path="src/components/Profile/ProfileModal.tsx">
            {/* Profile Header */}
            <motion.div
              className="flex flex-col items-center text-center space-y-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }} data-id="pvscfb4wz" data-path="src/components/Profile/ProfileModal.tsx">

              <div className="relative" data-id="c6943zeql" data-path="src/components/Profile/ProfileModal.tsx">
                <Avatar className="w-24 h-24 border-4 border-amber-400/50" data-id="05p6x2t9t" data-path="src/components/Profile/ProfileModal.tsx">
                  <AvatarImage src={user.avatar} alt={user.name} data-id="6npc2qtto" data-path="src/components/Profile/ProfileModal.tsx" />
                  <AvatarFallback className="bg-amber-600 text-white text-2xl" data-id="5xyskb6v2" data-path="src/components/Profile/ProfileModal.tsx">
                    {user.name?.charAt(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <motion.div
                  className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }} data-id="dxu2fcx3a" data-path="src/components/Profile/ProfileModal.tsx" />

              </div>

              {isEditing ?
              <div className="space-y-3 w-full max-w-sm" data-id="j8lg4z5e9" data-path="src/components/Profile/ProfileModal.tsx">
                  <Input
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="bg-black/30 border-amber-600/50 text-amber-100 text-center text-xl font-bold"
                  placeholder="Your name" data-id="jdp24a4iz" data-path="src/components/Profile/ProfileModal.tsx" />

                  <Input
                  value={editData.location}
                  onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                  className="bg-black/30 border-amber-600/50 text-amber-300 text-center"
                  placeholder="Your location" data-id="1ng0i0n8f" data-path="src/components/Profile/ProfileModal.tsx" />

                  <Textarea
                  value={editData.bio}
                  onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                  className="bg-black/30 border-amber-600/50 text-amber-200 resize-none"
                  placeholder="Tell us about yourself..."
                  rows={3} data-id="6qsk17a3c" data-path="src/components/Profile/ProfileModal.tsx" />

                </div> :

              <>
                  <div data-id="jbyog091i" data-path="src/components/Profile/ProfileModal.tsx">
                    <h2 className="text-2xl font-bold text-amber-100" data-id="j9laogtq1" data-path="src/components/Profile/ProfileModal.tsx">{user.name}</h2>
                    <div className="flex items-center justify-center gap-2 mt-2 text-amber-300" data-id="xh7agqn2v" data-path="src/components/Profile/ProfileModal.tsx">
                      <Mail className="w-4 h-4" data-id="evmeqv3a2" data-path="src/components/Profile/ProfileModal.tsx" />
                      <span className="text-sm" data-id="p5ipnye5k" data-path="src/components/Profile/ProfileModal.tsx">{user.email}</span>
                    </div>
                    {user.location &&
                  <div className="flex items-center justify-center gap-2 mt-1 text-amber-300" data-id="m4id4wr8r" data-path="src/components/Profile/ProfileModal.tsx">
                        <MapPin className="w-4 h-4" data-id="4piazj6o5" data-path="src/components/Profile/ProfileModal.tsx" />
                        <span className="text-sm" data-id="3y74kvo9i" data-path="src/components/Profile/ProfileModal.tsx">{user.location}</span>
                      </div>
                  }
                  </div>
                  
                  {user.bio &&
                <p className="text-amber-200 max-w-md" data-id="c6wq1st7r" data-path="src/components/Profile/ProfileModal.tsx">{user.bio}</p>
                }
                </>
              }

              <div className="flex items-center gap-2 text-amber-400 text-sm" data-id="3ohmiyo8x" data-path="src/components/Profile/ProfileModal.tsx">
                <Calendar className="w-4 h-4" data-id="wxx1mbtyg" data-path="src/components/Profile/ProfileModal.tsx" />
                <span data-id="yzqu7nl18" data-path="src/components/Profile/ProfileModal.tsx">Joined {new Date(user.createdAt || Date.now()).toLocaleDateString()}</span>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }} data-id="e5iq9ta0l" data-path="src/components/Profile/ProfileModal.tsx">

              {stats.map((stat, index) =>
              <motion.div
                key={stat.label}
                className="bg-black/30 rounded-lg p-4 text-center border border-amber-600/20"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }} data-id="8czt3pfm5" data-path="src/components/Profile/ProfileModal.tsx">

                  <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} data-id="wsjpze5w1" data-path="src/components/Profile/ProfileModal.tsx" />
                  <div className="text-2xl font-bold text-amber-100" data-id="9rpofdzl3" data-path="src/components/Profile/ProfileModal.tsx">{stat.value}</div>
                  <div className="text-sm text-amber-300" data-id="ntj7hgspb" data-path="src/components/Profile/ProfileModal.tsx">{stat.label}</div>
                </motion.div>
              )}
            </motion.div>

            {/* Interests */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }} data-id="zkipdv1cu" data-path="src/components/Profile/ProfileModal.tsx">

              <h3 className="text-lg font-semibold text-amber-100 mb-3" data-id="608vsk6qi" data-path="src/components/Profile/ProfileModal.tsx">Interests</h3>
              <div className="flex flex-wrap gap-2" data-id="518uq2i1x" data-path="src/components/Profile/ProfileModal.tsx">
                {['Technology', 'Movies', 'Sports', 'Music', 'Travel', 'Gaming'].map((interest) =>
                <Badge
                  key={interest}
                  className="bg-amber-600/20 text-amber-200 border-amber-600/40 hover:bg-amber-600/30" data-id="areej0t28" data-path="src/components/Profile/ProfileModal.tsx">

                    {interest}
                  </Badge>
                )}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex gap-3 pt-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }} data-id="hu7or74i1" data-path="src/components/Profile/ProfileModal.tsx">

              {isEditing ?
              <>
                  <Button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white" data-id="euq6apq19" data-path="src/components/Profile/ProfileModal.tsx">

                    Save Changes
                  </Button>
                  <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 border-amber-600/50 text-amber-300 hover:bg-amber-600/10" data-id="era2opoov" data-path="src/components/Profile/ProfileModal.tsx">

                    Cancel
                  </Button>
                </> :

              <>
                  <Button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-black font-bold" data-id="0jznf7hic" data-path="src/components/Profile/ProfileModal.tsx">

                    <Edit3 className="w-4 h-4 mr-2" data-id="t69p4xnvc" data-path="src/components/Profile/ProfileModal.tsx" />
                    Edit Profile
                  </Button>
                  <Button
                  variant="outline"
                  onClick={onClose}
                  className="border-amber-600/50 text-amber-300 hover:bg-amber-600/10" data-id="8cil2ejqi" data-path="src/components/Profile/ProfileModal.tsx">

                    Close
                  </Button>
                </>
              }
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>);

};

export default ProfileModal;