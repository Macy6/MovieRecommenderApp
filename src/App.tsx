import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { SearchResultsPage } from './components/SearchResultsPage';
import { DetailPage } from './components/DetailPage';
import { WatchlistPage } from './components/WatchlistPage';
import { WatchlistProvider } from './components/WatchlistContext';
import { AllMoviesPage } from './components/AllMoviesPage';

export default function App() {
  return (
    <WatchlistProvider>
      <Router basename="/">
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
          <Routes>
            <Route path="*" element={<HomePage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/movie/:id" element={<DetailPage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
            <Route path="/movies" element={<AllMoviesPage />} />
          </Routes>
        </div>
      </Router>
    </WatchlistProvider>
  );
}