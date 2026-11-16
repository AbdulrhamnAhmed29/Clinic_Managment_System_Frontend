import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DashboardSkeleton from './components/ui/DashboardSkeleton';
import { AppRoutes } from './routes/routes';

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
        <Toaster position="top-center" richColors />
        <Suspense fallback={<DashboardSkeleton />}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
