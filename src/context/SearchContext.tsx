import { createContext, useContext, useReducer, useCallback, useMemo, ReactNode, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Listing } from '../types';

export interface SearchFilters {
  location: string;
  dates: { start: Date | null; end: Date | null } | null;
  budget: { min: number; max: number } | null;
  category: string;
  sortBy: 'relevance' | 'price-low' | 'price-high' | 'rating' | 'newest';
  minRating: number;
  amenities: string[];
  propertyTypes: string[];
}

export interface SearchState {
  query: string;
  filters: SearchFilters;
  isActive: boolean;
  isSticky: boolean;
  activeDropdown: 'location' | 'dates' | 'budget' | 'general' | null;
  history: string[];
  suggestions: string[];
  recentSearches: string[];
  results: Listing[];
  isLoading: boolean;
  error: string | null;
  selectedResult: Listing | null;
}

export type SearchAction =
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'SET_FILTER'; payload: Partial<SearchFilters> }
  | { type: 'SET_FILTERS'; payload: SearchFilters }
  | { type: 'SET_ACTIVE'; payload: boolean }
  | { type: 'SET_STICKY'; payload: boolean }
  | { type: 'SET_ACTIVE_DROPDOWN'; payload: 'location' | 'dates' | 'budget' | 'general' | null }
  | { type: 'ADD_HISTORY'; payload: string }
  | { type: 'REMOVE_HISTORY'; payload: string }
  | { type: 'CLEAR_HISTORY' }
  | { type: 'SET_SUGGESTIONS'; payload: string[] }
  | { type: 'SET_RECENT_SEARCHES'; payload: string[] }
  | { type: 'SET_RESULTS'; payload: Listing[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SELECTED_RESULT'; payload: Listing | null }
  | { type: 'RESET' }
  | { type: 'HYDRATE'; payload: Partial<SearchState> };

const initialFilters: SearchFilters = {
  location: '',
  dates: null,
  budget: null,
  category: 'ALL',
  sortBy: 'relevance',
  minRating: 0,
  amenities: [],
  propertyTypes: [],
};

const initialState: SearchState = {
  query: '',
  filters: initialFilters,
  isActive: false,
  isSticky: false,
  activeDropdown: null,
  history: [],
  suggestions: [],
  recentSearches: [],
  results: [],
  isLoading: false,
  error: null,
  selectedResult: null,
};

function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.payload };
    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    case 'SET_ACTIVE':
      return { ...state, isActive: action.payload };
    case 'SET_STICKY':
      return { ...state, isSticky: action.payload };
    case 'SET_ACTIVE_DROPDOWN':
      return { ...state, activeDropdown: action.payload };
    case 'ADD_HISTORY': {
      const newHistory = [action.payload, ...state.history.filter(h => h !== action.payload)].slice(0, 10);
      return { ...state, history: newHistory };
    }
    case 'REMOVE_HISTORY':
      return { ...state, history: state.history.filter(h => h !== action.payload) };
    case 'CLEAR_HISTORY':
      return { ...state, history: [] };
    case 'SET_SUGGESTIONS':
      return { ...state, suggestions: action.payload };
    case 'SET_RECENT_SEARCHES':
      return { ...state, recentSearches: action.payload };
    case 'SET_RESULTS':
      return { ...state, results: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SELECTED_RESULT':
      return { ...state, selectedResult: action.payload };
    case 'RESET':
      return initialState;
    case 'HYDRATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

interface SearchContextValue {
  state: SearchState;
  dispatch: React.Dispatch<SearchAction>;
  setQuery: (query: string) => void;
  setFilter: (filter: Partial<SearchFilters>) => void;
  setFilters: (filters: SearchFilters) => void;
  setActive: (active: boolean) => void;
  setSticky: (sticky: boolean) => void;
  setActiveDropdown: (dropdown: 'location' | 'dates' | 'budget' | 'general' | null) => void;
  addHistory: (query: string) => void;
  removeHistory: (query: string) => void;
  clearHistory: () => void;
  setSuggestions: (suggestions: string[]) => void;
  setRecentSearches: (searches: string[]) => void;
  setResults: (results: Listing[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedResult: (result: Listing | null) => void;
  reset: () => void;
  hasActiveFilters: boolean;
  searchParams: URLSearchParams;
  updateUrl: (params: Partial<SearchFilters>) => void;
}

const SearchContext = createContext<SearchContextValue | null>(null);

interface SearchProviderProps {
  children: ReactNode;
  initialState?: Partial<SearchState>;
  syncWithUrl?: boolean;
}

export function SearchProvider({
  children,
  initialState = {},
  syncWithUrl = true,
}: SearchProviderProps) {
  const [state, dispatch] = useReducer(searchReducer, { ...initialState, ...initialState });
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!syncWithUrl) return;
    const savedHistory = localStorage.getItem('khubo_search_history');
    if (savedHistory) {
      try {
        dispatch({ type: 'HYDRATE', payload: { history: JSON.parse(savedHistory) } });
      } catch {}
    }
  }, [syncWithUrl]);

  useEffect(() => {
    if (!syncWithUrl) return;
    localStorage.setItem('khubo_search_history', JSON.stringify(state.history));
  }, [state.history, syncWithUrl]);

  useEffect(() => {
    if (!syncWithUrl) return;
    const params = new URLSearchParams();
    if (state.query) params.set('q', state.query);
    if (state.filters.location) params.set('location', state.filters.location);
    if (state.filters.dates?.start) params.set('checkin', state.filters.dates.start.toISOString().split('T')[0]);
    if (state.filters.dates?.end) params.set('checkout', state.filters.dates.end.toISOString().split('T')[0]);
    if (state.filters.budget?.min) params.set('minPrice', String(state.filters.budget.min));
    if (state.filters.budget?.max) params.set('maxPrice', String(state.filters.budget.max));
    if (state.filters.category !== 'ALL') params.set('category', state.filters.category);
    if (state.filters.sortBy !== 'relevance') params.set('sort', state.filters.sortBy);
    if (state.filters.minRating > 0) params.set('minRating', String(state.filters.minRating));
    setSearchParams(params, { replace: true });
  }, [state.query, state.filters, setSearchParams, syncWithUrl]);

  const setQuery = useCallback((query: string) => dispatch({ type: 'SET_QUERY', payload: query }), []);
  const setFilter = useCallback((filter: Partial<SearchFilters>) => dispatch({ type: 'SET_FILTER', payload: filter }), []);
  const setFilters = useCallback((filters: SearchFilters) => dispatch({ type: 'SET_FILTERS', payload: filters }), []);
  const setActive = useCallback((active: boolean) => dispatch({ type: 'SET_ACTIVE', payload: active }), []);
  const setSticky = useCallback((sticky: boolean) => dispatch({ type: 'SET_STICKY', payload: sticky }), []);
  const setActiveDropdown = useCallback((dropdown: 'location' | 'dates' | 'budget' | 'general' | null) =>
    dispatch({ type: 'SET_ACTIVE_DROPDOWN', payload: dropdown }), []);
  const addHistory = useCallback((query: string) => dispatch({ type: 'ADD_HISTORY', payload: query }), []);
  const removeHistory = useCallback((query: string) => dispatch({ type: 'REMOVE_HISTORY', payload: query }), []);
  const clearHistory = useCallback(() => dispatch({ type: 'CLEAR_HISTORY' }), []);
  const setSuggestions = useCallback((suggestions: string[]) => dispatch({ type: 'SET_SUGGESTIONS', payload: suggestions }), []);
  const setRecentSearches = useCallback((searches: string[]) => dispatch({ type: 'SET_RECENT_SEARCHES', payload: searches }), []);
  const setResults = useCallback((results: Listing[]) => dispatch({ type: 'SET_RESULTS', payload: results }), []);
  const setLoading = useCallback((loading: boolean) => dispatch({ type: 'SET_LOADING', payload: loading }), []);
  const setError = useCallback((error: string | null) => dispatch({ type: 'SET_ERROR', payload: error }), []);
  const setSelectedResult = useCallback((result: Listing | null) => dispatch({ type: 'SET_SELECTED_RESULT', payload: result }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  const updateUrl = useCallback((params: Partial<SearchFilters>) => {
    const newFilters = { ...state.filters, ...params };
    dispatch({ type: 'SET_FILTERS', payload: newFilters });
  }, [state.filters]);

  const hasActiveFilters = useMemo(() => {
    const f = state.filters;
    return !!(
      f.location ||
      f.dates ||
      f.budget ||
      f.category !== 'ALL' ||
      f.sortBy !== 'relevance' ||
      f.minRating > 0 ||
      f.amenities.length > 0 ||
      f.propertyTypes.length > 0
    );
  }, [state.filters]);

  const value = useMemo<SearchContextValue>(() => ({
    state,
    dispatch,
    setQuery,
    setFilter,
    setFilters,
    setActive,
    setSticky,
    setActiveDropdown,
    addHistory,
    removeHistory,
    clearHistory,
    setSuggestions,
    setRecentSearches,
    setResults,
    setLoading,
    setError,
    setSelectedResult,
    reset,
    hasActiveFilters,
    searchParams,
    updateUrl,
  }), [
    state,
    setQuery,
    setFilter,
    setFilters,
    setActive,
    setSticky,
    setActiveDropdown,
    addHistory,
    removeHistory,
    clearHistory,
    setSuggestions,
    setRecentSearches,
    setResults,
    setLoading,
    setError,
    setSelectedResult,
    reset,
    hasActiveFilters,
    searchParams,
    updateUrl,
  ]);

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearch(): SearchContextValue {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}

export function useSearchState<K extends keyof SearchState>(key: K): SearchState[K] {
  const { state } = useSearch();
  return state[key];
}

export function useSearchActions() {
  const {
    setQuery,
    setFilter,
    setFilters,
    setActive,
    setSticky,
    setActiveDropdown,
    addHistory,
    removeHistory,
    clearHistory,
    setSuggestions,
    setRecentSearches,
    setResults,
    setLoading,
    setError,
    setSelectedResult,
    reset,
    updateUrl,
  } = useSearch();

  return {
    setQuery,
    setFilter,
    setFilters,
    setActive,
    setSticky,
    setActiveDropdown,
    addHistory,
    removeHistory,
    clearHistory,
    setSuggestions,
    setRecentSearches,
    setResults,
    setLoading,
    setError,
    setSelectedResult,
    reset,
    updateUrl,
  };
}