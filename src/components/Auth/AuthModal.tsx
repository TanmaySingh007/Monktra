import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff, Lock, LogIn, Mail, User, UserPlus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React, { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signin' | 'signup';
  onModeChange: (mode: 'signin' | 'signup') => void;
  onSuccess?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  mode,
  onModeChange,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Name validation for signup
    if (mode === 'signup') {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      } else if (formData.name.length < 2) {
        newErrors.name = 'Name must be at least 2 characters';
      }

      // Confirm password validation
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock user data
      const userData = {
        id: Date.now().toString(),
        name: mode === 'signup' ? formData.name : 'John Cowboy',
        email: formData.email,
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face`,
        joinDate: new Date().toISOString(),
        preferences: {
          theme: 'western',
          notifications: true,
          language: 'en'
        }
      };

      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(userData));

      toast({
        title: mode === 'signup' ? "Welcome to Monktra!" : "Welcome back, partner!",
        description: mode === 'signup' ?
        "Your account has been created successfully" :
        "You've successfully signed in"
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

      onSuccess?.();
      onClose();
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "Please check your credentials and try again",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    onModeChange(mode === 'signin' ? 'signup' : 'signin');
    setErrors({});
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} data-id="uw2789t1l" data-path="src/components/Auth/AuthModal.tsx">
      <DialogContent className="sm:max-w-md bg-gradient-to-b from-amber-900/95 to-red-900/95 border border-amber-600/50 text-amber-100" data-id="8dd326nfu" data-path="src/components/Auth/AuthModal.tsx">
        <DialogHeader data-id="ca3wdvrw3" data-path="src/components/Auth/AuthModal.tsx">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-2" data-id="ucu9drdf4" data-path="src/components/Auth/AuthModal.tsx">

            <div className="text-4xl mb-2" data-id="8tfrr8xgi" data-path="src/components/Auth/AuthModal.tsx">🤠</div>
            <DialogTitle className="text-2xl font-bold text-amber-200 western-title" data-id="gpmgqhheo" data-path="src/components/Auth/AuthModal.tsx">
              {mode === 'signin' ? 'Welcome Back' : 'Join the Frontier'}
            </DialogTitle>
            <DialogDescription className="text-amber-300 western-text" data-id="3rzh8l5j3" data-path="src/components/Auth/AuthModal.tsx">
              {mode === 'signin' ?
              'Sign in to continue your adventure' :
              'Create your account and explore the frontier'
              }
            </DialogDescription>
          </motion.div>
        </DialogHeader>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-4" data-id="805yaadav" data-path="src/components/Auth/AuthModal.tsx">

          <AnimatePresence mode="wait" data-id="v9prorlk1" data-path="src/components/Auth/AuthModal.tsx">
            {mode === 'signup' &&
            <motion.div
              key="name"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-2" data-id="yusrl7dqm" data-path="src/components/Auth/AuthModal.tsx">

                <Label htmlFor="name" className="text-amber-200 western-text" data-id="r6gltr5bm" data-path="src/components/Auth/AuthModal.tsx">
                  <User className="w-4 h-4 inline mr-2" data-id="heouwtlir" data-path="src/components/Auth/AuthModal.tsx" />
                  Full Name
                </Label>
                <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="bg-black/30 border-amber-600/50 text-amber-100 placeholder:text-amber-400/70 focus:border-amber-500" data-id="gze7ufag8" data-path="src/components/Auth/AuthModal.tsx" />

                {errors.name &&
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm" data-id="6u2lj45a4" data-path="src/components/Auth/AuthModal.tsx">

                    {errors.name}
                  </motion.p>
              }
              </motion.div>
            }
          </AnimatePresence>

          <div className="space-y-2" data-id="qtnlpw0sn" data-path="src/components/Auth/AuthModal.tsx">
            <Label htmlFor="email" className="text-amber-200 western-text" data-id="iuf6h31rz" data-path="src/components/Auth/AuthModal.tsx">
              <Mail className="w-4 h-4 inline mr-2" data-id="60whgsv8j" data-path="src/components/Auth/AuthModal.tsx" />
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="bg-black/30 border-amber-600/50 text-amber-100 placeholder:text-amber-400/70 focus:border-amber-500" data-id="nbn7xu8gg" data-path="src/components/Auth/AuthModal.tsx" />

            {errors.email &&
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm" data-id="2w7wgmxmh" data-path="src/components/Auth/AuthModal.tsx">

                {errors.email}
              </motion.p>
            }
          </div>

          <div className="space-y-2" data-id="9dpn8fqi6" data-path="src/components/Auth/AuthModal.tsx">
            <Label htmlFor="password" className="text-amber-200 western-text" data-id="lyouby8vj" data-path="src/components/Auth/AuthModal.tsx">
              <Lock className="w-4 h-4 inline mr-2" data-id="xc8t2l9zr" data-path="src/components/Auth/AuthModal.tsx" />
              Password
            </Label>
            <div className="relative" data-id="b2h7il3uu" data-path="src/components/Auth/AuthModal.tsx">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="bg-black/30 border-amber-600/50 text-amber-100 placeholder:text-amber-400/70 focus:border-amber-500 pr-10" data-id="1yhndgfk2" data-path="src/components/Auth/AuthModal.tsx" />

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-amber-400 hover:text-amber-200" data-id="ta8obukow" data-path="src/components/Auth/AuthModal.tsx">

                {showPassword ? <EyeOff className="h-4 w-4" data-id="w0s4whdf5" data-path="src/components/Auth/AuthModal.tsx" /> : <Eye className="h-4 w-4" data-id="twguon9ei" data-path="src/components/Auth/AuthModal.tsx" />}
              </Button>
            </div>
            {errors.password &&
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm" data-id="2w9gjkyk1" data-path="src/components/Auth/AuthModal.tsx">

                {errors.password}
              </motion.p>
            }
          </div>

          <AnimatePresence mode="wait" data-id="fbi1uyxmq" data-path="src/components/Auth/AuthModal.tsx">
            {mode === 'signup' &&
            <motion.div
              key="confirmPassword"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-2" data-id="zzn7zj7cm" data-path="src/components/Auth/AuthModal.tsx">

                <Label htmlFor="confirmPassword" className="text-amber-200 western-text" data-id="dz9dtggv7" data-path="src/components/Auth/AuthModal.tsx">
                  <Lock className="w-4 h-4 inline mr-2" data-id="lpqqp8me8" data-path="src/components/Auth/AuthModal.tsx" />
                  Confirm Password
                </Label>
                <div className="relative" data-id="y1c84eii6" data-path="src/components/Auth/AuthModal.tsx">
                  <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="bg-black/30 border-amber-600/50 text-amber-100 placeholder:text-amber-400/70 focus:border-amber-500 pr-10" data-id="rvc8qvy59" data-path="src/components/Auth/AuthModal.tsx" />

                  <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-amber-400 hover:text-amber-200" data-id="m893vvkep" data-path="src/components/Auth/AuthModal.tsx">

                    {showConfirmPassword ? <EyeOff className="h-4 w-4" data-id="zz1gj17ek" data-path="src/components/Auth/AuthModal.tsx" /> : <Eye className="h-4 w-4" data-id="cx9gj74iv" data-path="src/components/Auth/AuthModal.tsx" />}
                  </Button>
                </div>
                {errors.confirmPassword &&
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm" data-id="7kwhtn4ya" data-path="src/components/Auth/AuthModal.tsx">

                    {errors.confirmPassword}
                  </motion.p>
              }
              </motion.div>
            }
          </AnimatePresence>

          <div className="flex flex-col gap-3 pt-4" data-id="edfl5i6pi" data-path="src/components/Auth/AuthModal.tsx">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} data-id="k4h9rjl6e" data-path="src/components/Auth/AuthModal.tsx">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-black font-bold western-button" data-id="wx474cy7c" data-path="src/components/Auth/AuthModal.tsx">

                {loading ?
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-black border-t-transparent rounded-full mr-2" data-id="i357dj69u" data-path="src/components/Auth/AuthModal.tsx" /> :

                mode === 'signin' ?
                <LogIn className="w-4 h-4 mr-2" data-id="8ewb7tukb" data-path="src/components/Auth/AuthModal.tsx" /> :

                <UserPlus className="w-4 h-4 mr-2" data-id="nhpg0ke65" data-path="src/components/Auth/AuthModal.tsx" />
                }
                {loading ?
                'Processing...' :
                mode === 'signin' ?
                'Sign In' :
                'Create Account'
                }
              </Button>
            </motion.div>

            <div className="text-center" data-id="is4y5d9km" data-path="src/components/Auth/AuthModal.tsx">
              <p className="text-amber-300 text-sm western-text" data-id="dum3w0dp7" data-path="src/components/Auth/AuthModal.tsx">
                {mode === 'signin' ? "Don't have an account?" : "Already have an account?"}
              </p>
              <Button
                type="button"
                variant="ghost"
                onClick={switchMode}
                className="text-amber-200 hover:text-amber-100 hover:bg-amber-600/20 western-text font-medium" data-id="f3x0d9qrg" data-path="src/components/Auth/AuthModal.tsx">

                {mode === 'signin' ? 'Join the frontier' : 'Sign in instead'}
              </Button>
            </div>
          </div>
        </motion.form>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute top-4 right-4 text-amber-400/30 text-xl" data-id="3esl3s6oh" data-path="src/components/Auth/AuthModal.tsx">

          ⭐
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-4 left-4 text-amber-400/30 text-lg" data-id="8e22zebjh" data-path="src/components/Auth/AuthModal.tsx">

          🌵
        </motion.div>
      </DialogContent>
    </Dialog>);

};

export default AuthModal;