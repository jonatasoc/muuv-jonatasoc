import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { GetStaticPaths, GetStaticProps } from "next";

import { api } from "services/api";
import { ReqResApiPaginatedResponse, User } from "services/types";

import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { AxiosResponse } from "axios";
import Layout from "components/Layout";
import { useFavorites } from "contexts/FavoritesContext";
import { ParsedUrlQuery } from "querystring";
import React, { useCallback, useState } from "react";

export interface UserProfileProps {
  user: User;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

export default function UserProfile(props: UserProfileProps) {
  const [user, setUser] = useState(props.user);

  const { isAlreadyFavorite, addFavorite, removeFavorite } = useFavorites();

  const handleFavorite = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, user: User) => {
      e.preventDefault();
      e.stopPropagation();

      const isFavorite = isAlreadyFavorite(user.id);

      if (!isFavorite) {
        addFavorite(user);
      } else {
        removeFavorite(user.id);
      }
    },
    [isAlreadyFavorite, addFavorite, removeFavorite]
  );

  return (
    <Layout>
      <Card sx={{ maxWidth: 345, height: "100%" }}>
        <CardHeader
          title={`${user.first_name} ${user.last_name}`}
          subheader={user.email}
        />
        <CardMedia
          component="img"
          height="194"
          image={user.avatar}
          alt={user.first_name}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Add <strong>{user.first_name}</strong> to your favorites, if you
            like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={(e) => handleFavorite(e, user)}
          >
            {isAlreadyFavorite(user.id) ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </CardActions>
      </Card>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: response } = await api.get<
    string,
    AxiosResponse<ReqResApiPaginatedResponse<User[]>>
  >("/users", {
    params: { page: 1, per_page: 100 },
  });

  const { data: users } = response;

  const paths = users.map((user) => ({
    params: {
      id: String(user.id),
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<UserProfileProps, Params> = async ({
  params,
}) => {
  const { id } = params!;

  try {
    const {
      data: { data: user },
    } = await api.get<AxiosResponse<User>>(`/users/${id}`);

    if (!user) {
      return {
        notFound: true,
        revalidate: 10,
      };
    }

    return {
      props: {
        user,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
      revalidate: 10,
    };
  }
};
