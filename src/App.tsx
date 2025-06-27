import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import CustomCursor from './components/Effects/CustomCursor';
import NotFound from './pages/NotFound';
import { store } from './store';

const queryClient = new QueryClient();

// Dust particles effect
const DustParticles: React.FC = () => {
  React.useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'dust-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 5 + 's';
      particle.style.animationDuration = 10 + Math.random() * 10 + 's';
      document.body.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 20000);
    };

    const interval = setInterval(createParticle, 3000);
    return () => clearInterval(interval);
  }, []);

  return null;
};

function App() {
  return (
    <Provider store={store} data-id="d8addz56d" data-path="src/App.tsx">
      <QueryClientProvider client={queryClient} data-id="tp9x2wwqb" data-path="src/App.tsx">
        <TooltipProvider data-id="awqcm8x1n" data-path="src/App.tsx">
          <Router data-id="tozdtmwic" data-path="src/App.tsx">
            <div className="min-h-screen bg-gradient-to-br from-amber-950 via-red-950 to-amber-950 leather-texture" data-id="34m2x06gs" data-path="src/App.tsx">
              <CustomCursor data-id="ry7aebfyc" data-path="src/App.tsx" />
              <DustParticles data-id="lknm48ckp" data-path="src/App.tsx" />
              
              <Routes data-id="m43b80f02" data-path="src/App.tsx">
                <Route path="/" element={<DashboardLayout data-id="czyzber5d" data-path="src/App.tsx" />} data-id="ln9ksqxx9" data-path="src/App.tsx" />
                <Route path="*" element={<NotFound data-id="i3ox3261b" data-path="src/App.tsx" />} data-id="o8nuvmrfe" data-path="src/App.tsx" />
              </Routes>
              
              <Toaster data-id="8iogp0n9k" data-path="src/App.tsx" />
            </div>
          </Router>
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>);

}

export default App;