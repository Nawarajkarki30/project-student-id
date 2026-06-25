import { useEffect, useCallback, useState } from "react";
import { useIdCardStore } from "../store/idCardStore";

// Custom hook: handles fetching + searching the admin's ID card list.
// Demonstrates useEffect (initial load) and useCallback (stable search handler).
export function useIdCards() {
  const idCards = useIdCardStore((state) => state.idCards);
  const isLoading = useIdCardStore((state) => state.isLoading);
  const error = useIdCardStore((state) => state.error);
  const fetchAllIdCards = useIdCardStore((state) => state.fetchAllIdCards);

  const [searchTerm, setSearchTerm] = useState("");

  // Load all cards once when the dashboard mounts
  useEffect(() => {
    fetchAllIdCards();
  }, [fetchAllIdCards]);

  // useCallback so this function reference stays stable across re-renders
  // (useful if passed down to a debounced SearchBar component)
  const handleSearch = useCallback(
    (term) => {
      setSearchTerm(term);
      fetchAllIdCards(term);
    },
    [fetchAllIdCards]
  );

  return { idCards, isLoading, error, searchTerm, handleSearch };
}