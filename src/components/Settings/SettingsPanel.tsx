import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { resetFeed } from '@/store/slices/feedSlice';
import { toggleDarkMode, updateCategories } from '@/store/slices/userPreferencesSlice';
import { Bell, Globe, Palette, Settings } from 'lucide-react';
import { motion } from 'motion/react';

const AVAILABLE_CATEGORIES = [
{ id: 'technology', label: 'Technology', icon: '💻' },
{ id: 'business', label: 'Business', icon: '💼' },
{ id: 'entertainment', label: 'Entertainment', icon: '🎬' },
{ id: 'sports', label: 'Sports', icon: '⚽' },
{ id: 'science', label: 'Science', icon: '🔬' },
{ id: 'health', label: 'Health', icon: '🏥' },
{ id: 'gaming', label: 'Gaming', icon: '🎮' },
{ id: 'music', label: 'Music', icon: '🎵' },
{ id: 'food', label: 'Food', icon: '🍜' },
{ id: 'travel', label: 'Travel', icon: '✈️' }];


const SettingsPanel = () => {
  const dispatch = useAppDispatch();
  const { darkMode, selectedCategories } = useAppSelector((state) => state.userPreferences);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    let newCategories: string[];

    if (checked) {
      newCategories = [...selectedCategories, categoryId];
    } else {
      newCategories = selectedCategories.filter((id) => id !== categoryId);
    }

    // Ensure at least one category is selected
    if (newCategories.length === 0) {
      toast({
        title: "Invalid Selection",
        description: "Please select at least one category.",
        variant: "destructive"
      });
      return;
    }

    dispatch(updateCategories(newCategories));
    dispatch(resetFeed()); // Clear feed to refresh with new categories

    toast({
      title: "Preferences Updated",
      description: "Your category preferences have been saved."
    });
  };

  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
    toast({
      title: "Theme Updated",
      description: `Switched to ${!darkMode ? 'dark' : 'light'} mode.`
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6" data-id="zltdgnyhv" data-path="src/components/Settings/SettingsPanel.tsx">

      <div className="flex items-center gap-3 mb-6" data-id="bpnboz39n" data-path="src/components/Settings/SettingsPanel.tsx">
        <Settings className="h-6 w-6 text-primary" data-id="km4or6en6" data-path="src/components/Settings/SettingsPanel.tsx" />
        <h1 className="text-2xl font-bold" data-id="4we20fxgq" data-path="src/components/Settings/SettingsPanel.tsx">Settings</h1>
      </div>

      {/* Appearance Settings */}
      <Card data-id="1r2yk0pwd" data-path="src/components/Settings/SettingsPanel.tsx">
        <CardHeader data-id="mnh7bhzm0" data-path="src/components/Settings/SettingsPanel.tsx">
          <CardTitle className="flex items-center gap-2" data-id="v7jazqnjf" data-path="src/components/Settings/SettingsPanel.tsx">
            <Palette className="h-5 w-5" data-id="mnucppvx3" data-path="src/components/Settings/SettingsPanel.tsx" />
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4" data-id="mm93l6ikx" data-path="src/components/Settings/SettingsPanel.tsx">
          <div className="flex items-center justify-between" data-id="klbgx6n70" data-path="src/components/Settings/SettingsPanel.tsx">
            <div className="space-y-0.5" data-id="bn1olvwau" data-path="src/components/Settings/SettingsPanel.tsx">
              <Label className="text-base" data-id="kytstixw5" data-path="src/components/Settings/SettingsPanel.tsx">Dark Mode</Label>
              <p className="text-sm text-muted-foreground" data-id="xuh2is0ar" data-path="src/components/Settings/SettingsPanel.tsx">
                Toggle between light and dark themes
              </p>
            </div>
            <Switch
              checked={darkMode}
              onCheckedChange={handleDarkModeToggle} data-id="mgxou8vfm" data-path="src/components/Settings/SettingsPanel.tsx" />

          </div>
        </CardContent>
      </Card>

      {/* Content Preferences */}
      <Card data-id="hmidp2fq1" data-path="src/components/Settings/SettingsPanel.tsx">
        <CardHeader data-id="qzj4sdggz" data-path="src/components/Settings/SettingsPanel.tsx">
          <CardTitle className="flex items-center gap-2" data-id="5l4szbxxb" data-path="src/components/Settings/SettingsPanel.tsx">
            <Globe className="h-5 w-5" data-id="fbet063a1" data-path="src/components/Settings/SettingsPanel.tsx" />
            Content Preferences
          </CardTitle>
        </CardHeader>
        <CardContent data-id="jqvsvgtb4" data-path="src/components/Settings/SettingsPanel.tsx">
          <div className="space-y-3" data-id="5o1ft31kp" data-path="src/components/Settings/SettingsPanel.tsx">
            <div className="space-y-0.5" data-id="9dbt9ftui" data-path="src/components/Settings/SettingsPanel.tsx">
              <Label className="text-base" data-id="0dh7drqsq" data-path="src/components/Settings/SettingsPanel.tsx">Favorite Categories</Label>
              <p className="text-sm text-muted-foreground" data-id="6z8mj6lfv" data-path="src/components/Settings/SettingsPanel.tsx">
                Select categories you're interested in to personalize your feed
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4" data-id="1vl8uhw61" data-path="src/components/Settings/SettingsPanel.tsx">
              {AVAILABLE_CATEGORIES.map((category) =>
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }} data-id="2u7o1f6ye" data-path="src/components/Settings/SettingsPanel.tsx">

                  <Label
                  htmlFor={category.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors hover:bg-accent ${
                  selectedCategories.includes(category.id) ?
                  'bg-primary/10 border-primary' :
                  'border-border'}`
                  } data-id="cuc2gkiml" data-path="src/components/Settings/SettingsPanel.tsx">

                    <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) =>
                    handleCategoryChange(category.id, checked as boolean)
                    } data-id="tdk5znikd" data-path="src/components/Settings/SettingsPanel.tsx" />

                    <span className="text-lg" data-id="nn4icb0cn" data-path="src/components/Settings/SettingsPanel.tsx">{category.icon}</span>
                    <span className="text-sm font-medium" data-id="zkl3kllbv" data-path="src/components/Settings/SettingsPanel.tsx">{category.label}</span>
                  </Label>
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card data-id="mofrswbrm" data-path="src/components/Settings/SettingsPanel.tsx">
        <CardHeader data-id="quabtrdsd" data-path="src/components/Settings/SettingsPanel.tsx">
          <CardTitle className="flex items-center gap-2" data-id="38bbtsu74" data-path="src/components/Settings/SettingsPanel.tsx">
            <Bell className="h-5 w-5" data-id="ovh6kaund" data-path="src/components/Settings/SettingsPanel.tsx" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent data-id="vvy98wdwt" data-path="src/components/Settings/SettingsPanel.tsx">
          <div className="space-y-4" data-id="ii5qwp69u" data-path="src/components/Settings/SettingsPanel.tsx">
            <div className="flex items-center justify-between" data-id="xqksakq53" data-path="src/components/Settings/SettingsPanel.tsx">
              <div className="space-y-0.5" data-id="3bkqona6x" data-path="src/components/Settings/SettingsPanel.tsx">
                <Label className="text-base" data-id="nnux8yuzt" data-path="src/components/Settings/SettingsPanel.tsx">Push Notifications</Label>
                <p className="text-sm text-muted-foreground" data-id="g4f3z5lo7" data-path="src/components/Settings/SettingsPanel.tsx">
                  Get notified about trending content
                </p>
              </div>
              <Switch defaultChecked data-id="31krj7czf" data-path="src/components/Settings/SettingsPanel.tsx" />
            </div>
            
            <div className="flex items-center justify-between" data-id="a03jshqfj" data-path="src/components/Settings/SettingsPanel.tsx">
              <div className="space-y-0.5" data-id="bh3xgeq6g" data-path="src/components/Settings/SettingsPanel.tsx">
                <Label className="text-base" data-id="r21yrre8m" data-path="src/components/Settings/SettingsPanel.tsx">Email Updates</Label>
                <p className="text-sm text-muted-foreground" data-id="rr7gfoh07" data-path="src/components/Settings/SettingsPanel.tsx">
                  Receive weekly digest emails
                </p>
              </div>
              <Switch data-id="qdw5fn8mu" data-path="src/components/Settings/SettingsPanel.tsx" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }} data-id="o0v8d7xvn" data-path="src/components/Settings/SettingsPanel.tsx">

        <Button
          size="lg"
          className="w-full"
          onClick={() => {
            toast({
              title: "Settings Saved",
              description: "All your preferences have been saved successfully."
            });
          }} data-id="wcdizssvl" data-path="src/components/Settings/SettingsPanel.tsx">

          Save All Changes
        </Button>
      </motion.div>
    </motion.div>);

};

export default SettingsPanel;