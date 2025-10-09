import { useEffect, useState, useCallback } from "react";
import {
  getFavoriteIds,
  toggleFavorite as _toggle,
  addFavorite as _add,
  removeFavorite as _remove,
  clearFavorites as _clear,
} from "./favorites";


export function useFavorites() {
  const [ids, setIds] = useState<string[]>([]); // start empty; hydrate on mount

  useEffect(() => {
    // initial hydrate
    setIds(getFavoriteIds());

    
    const refresh = () => setIds(getFavoriteIds());
    window.addEventListener("favorites:changed", refresh as EventListener);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener("favorites:changed", refresh as EventListener);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const isFav = useCallback((id: string | number) => ids.includes(String(id)), [ids]);

  const toggle = useCallback((id: string | number) => _toggle(id), []);
  const add    = useCallback((id: string | number) => _add(id), []);
  const remove = useCallback((id: string | number) => _remove(id), []);
  const clear  = useCallback(() => _clear(), []);

  return { ids, isFav, toggle, add, remove, clear };
}


