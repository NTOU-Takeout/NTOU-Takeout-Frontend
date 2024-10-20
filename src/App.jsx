import { StrictMode } from 'react';
import Home from './pages/Home';
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
const queryClient = new QueryClient()
function App() {
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <Home/>
            </QueryClientProvider>
        </StrictMode>
    )
}
export default App;