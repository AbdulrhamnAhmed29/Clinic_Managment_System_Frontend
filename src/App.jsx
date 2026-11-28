import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProgressState from './components/ui/ProgressState';
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
          <Suspense fallback={<ProgressState message="جارٍ تحميل التطبيق..." />}>
            <AppRoutes />
          </Suspense>
        </BrandColorProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
