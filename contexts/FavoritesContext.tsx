import { useLocalStorage } from "hooks/useLocalStorage";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { User } from "services/types";

interface FavoritesContextData {
  userFavorites: User[];
  addFavorite: (favorite: User) => void;
  removeFavorite: (favoriteId: number) => void;
  isAlreadyFavorite: (favoriteId: number) => boolean;
}

interface FavoritesProviderProps {
  children: ReactNode;
}

const FavoritesContext = createContext<FavoritesContextData>(
  {} as FavoritesContextData
);

const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [userFavorites, setUserFavorites] = useLocalStorage<User[]>(
    "userFavorites",
    null
  );

  const addFavorite = (favorite: User) => {
    setUserFavorites((prevFavorites) => [...(prevFavorites || []), favorite]);
  };

  const removeFavorite = (favoriteId: number) => {
    setUserFavorites(
      userFavorites.filter((favorite) => favorite.id !== favoriteId)
    );
  };

  const isAlreadyFavorite = useCallback(
    (id: number) => {
      const findUser = userFavorites?.find((favorite) => favorite.id === id);

      return Boolean(findUser);
    },
    [userFavorites]
  );

  return (
    <FavoritesContext.Provider
      value={{
        userFavorites,
        addFavorite,
        removeFavorite,
        isAlreadyFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used inside a FavoritesProvides ");
  }

  return context;
};

export { useFavorites, FavoritesProvider };
