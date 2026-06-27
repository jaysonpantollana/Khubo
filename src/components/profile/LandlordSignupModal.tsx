// @context: Landlord signup/login modal — separated from Profile.tsx
// @purpose: Email/password form for landlord registration or login
// @behavior: Toggle between login and signup modes; validates email/password; shows toast on errors
// @side-effects: Shows toast messages
// @dependencies: useToast, motion, lucide-react

import { useState } from 'react';

import { X, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useToast } from '../ToastProvider';
import { FocusTrap } from '../ui/FocusTrap';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function LandlordSignupModal({ isOpen, onClose, onSuccess }: Props) {
  const { showToast } = useToast();
  const [isLandlordLogin, setIsLandlordLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningUp(true);

    try {
      if (isLandlordLogin) {
        // Mock login - always succeeds
        showToast('Hey there! Thanks for choosing Khubo!', 'success');
        onSuccess();
        onClose();
      } else {
        // Mock signup - always succeeds
        showToast('Account created successfully!', 'success');
        onSuccess();
        onClose();
      }
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : 'An error occurred', 'error');
    }

    setIsSigningUp(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <FocusTrap
        onClose={onClose}
        ariaLabel="Landlord Sign Up"
        className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl z-10"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-neutral-100 rounded-full transition-colors z-20"
        >
          <X size={20} className="text-neutral-500" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold font-display text-[#17294F] mb-2">
              {isLandlordLogin ? 'Welcome back' : 'Create Landlord Account'}
            </h2>
            <p className="text-sm text-neutral-500 font-medium">
              {isLandlordLogin ? 'Sign in to manage your properties.' : 'Sign up to start listing properties.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                  <Mail size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#17294F] focus:border-transparent transition-all bg-neutral-50 hover:bg-neutral-100 focus:bg-white text-sm font-medium"
                />
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#17294F] focus:border-transparent transition-all bg-neutral-50 hover:bg-neutral-100 focus:bg-white text-sm font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 focus:outline-none p-1"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSigningUp}
              className="w-full bg-[#2252D6] text-white py-3 rounded-xl font-bold text-sm tracking-wide mt-2 hover:bg-[#1a41aa] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              {isSigningUp ? 'Processing...' : isLandlordLogin ? 'Login' : 'Create account'}
            </button>
          </form>
        </div>

        <div className="bg-neutral-50/50 p-6 flex flex-col items-center justify-center gap-2 text-sm text-neutral-500 font-medium border-t border-neutral-100">
          <div className="flex items-center gap-2">
            {isLandlordLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={() => setIsLandlordLogin(!isLandlordLogin)}
              className="font-bold text-[#2252D6] hover:underline"
            >
              {isLandlordLogin ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </div>
      </FocusTrap>
    </div>
  );
}
