// @context: Authentication modal — login/signup with email and password
// @purpose: Modal for sign in and sign up flows; supports toggle between login/register; calls AuthContext.signIn
// @behavior: Mock auth with setTimeout delay; shows loading/error states; password visibility toggle
// @dependencies: useAuth (AuthContext), motion, lucide-react, createPortal

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { X, Mail, Eye, EyeOff, Lock } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { OnboardingModal } from './OnboardingModal';
import { useToast } from './ToastProvider';

export function AuthModal({ isOpen, onClose, onLogin, onSignUp }: { isOpen: boolean; onClose: () => void, onLogin?: () => void, onSignUp?: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();
  const { showToast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isLogin) {
      // Bypass inputs for demo — open onboarding
      signIn(email);
      if (onSignUp) onSignUp();
      setShowOnboarding(true);
      return;
    }

    setIsLoading(true);

    // Mock authentication
    setTimeout(() => {
      setIsLoading(false);
      signIn(email);
      if (onLogin) onLogin();
      onClose();
    }, 1000);
  };

  const modalContent = (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        <div
           onClick={onClose}
           className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <div
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
              <h2 className="text-2xl font-bold font-display text-[#17294F] mb-2">{isLogin ? "Welcome back" : "Create an account"}</h2>
              <p className="text-sm text-neutral-500 font-medium">
                {isLogin ? "Sign in to access your properties." : "Sign up to start finding properties."}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
               {error && (
                 <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">
                   {error}
                 </div>
               )}
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
                      type={showPassword ? "text" : "password"} 
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
                     aria-label={showPassword ? "Hide password" : "Show password"}
                   >
                     {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                   </button>
                 </div>
               </div>
               
               <button 
                 type="submit"
                 disabled={isLoading}
                 className="w-full bg-[#2252D6] text-white py-3 rounded-xl font-bold text-sm tracking-wide mt-2 hover:bg-[#1a41aa] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
               >
                 {isLoading ? 'Processing...' : (isLogin ? 'Sign in to dashboard' : 'Create account')}
               </button>
            </form>
          </div>
          
          <div className="bg-neutral-50/50 p-6 flex flex-col items-center justify-center gap-2 text-sm text-neutral-500 font-medium">
            <div className="flex items-center gap-2">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                 onClick={() => {
                   setIsLogin(!isLogin);
                   setError(null);
                 }}
                 className="font-bold text-[#2252D6] hover:underline"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </div>
          </div>
        </div>
      </div>
  );

  if (showOnboarding) {
    return (
      <OnboardingModal
        isOpen={true}
        onClose={() => { setShowOnboarding(false); onClose(); }}
        onComplete={() => {
          showToast('Welcome to Khubo! Your profile has been created.');
          setShowOnboarding(false);
          onClose();
        }}
      />
    );
  }

  return mounted && typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
}
