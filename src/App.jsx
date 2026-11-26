import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DashboardSkeleton from './components/ui/DashboardSkeleton';
import ScrollToTop from './components/scrollToTop.js';
import { AppRoutes } from './routes/routes';
import { BrandColorProvider } from './theme/BrandColorProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 1,
      
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <Toaster position="top-center" richColors />
        <BrandColorProvider>
          <Suspense fallback={<DashboardSkeleton />}>
            <AppRoutes />
          </Suspense>
        </BrandColorProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
