import { createContext, useContext, useState, ReactNode } from 'react';

interface WatchlistItem {
  id: number;
  status: 'want' | 'watched';
}

interface WatchlistContextType {
  watchlist: WatchlistItem[];
  addToWatchlist: (id: number, status: 'want' | 'watched') => void;
  removeFromWatchlist: (id: number) => void;
  moveToWatched: (id: number) => void;
  isInWatchlist: (id: number) => boolean;
  getStatus: (id: number) => 'want' | 'watched' | null;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);

  const addToWatchlist = (id: number, status: 'want' | 'watched') => {
    setWatchlist(prev => {
      const exists = prev.find(item => item.id === id);
      if (exists) {
        return prev.map(item => item.id === id ? { ...item, status } : item);
      }
      return [...prev, { id, status }];
    });
  };

  const removeFromWatchlist = (id: number) => {
    setWatchlist(prev => prev.filter(item => item.id !== id));
  };

  const moveToWatched = (id: number) => {
    setWatchlist(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'watched' as const } : item
    ));
  };

  const isInWatchlist = (id: number) => {
    return watchlist.some(item => item.id === id);
  };

  const getStatus = (id: number) => {
    const item = watchlist.find(item => item.id === id);
    return item ? item.status : null;
  };

  return (
    <WatchlistContext.Provider value={{
      watchlist,
      addToWatchlist,
      removeFromWatchlist,
      moveToWatched,
      isInWatchlist,
      getStatus
    }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within WatchlistProvider');
  }
  return context;
}
