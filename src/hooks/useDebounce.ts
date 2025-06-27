import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useSearch = (initialValue: string = '', delay: number = 300) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, delay);

  const debouncedSearch = useCallback(
    debounce((query: string, callback: (query: string) => void) => {
      setIsSearching(false);
      callback(query);
    }, delay),
    [delay]
  );

  const handleSearchChange = useCallback((query: string, onSearch: (query: string) => void) => {
    setSearchQuery(query);
    setIsSearching(true);
    debouncedSearch(query, onSearch);
  }, [debouncedSearch]);

  return {
    searchQuery,
    debouncedSearchQuery,
    isSearching,
    handleSearchChange,
    setSearchQuery
  };
};