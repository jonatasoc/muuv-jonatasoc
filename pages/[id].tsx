import { GetStaticPaths, GetStaticProps } from "next";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import { api } from "services/api";
import { ReqResApiPaginatedResponse, User } from "services/types";

import React, { useState } from "react";
import { FavoriteBorder } from "@mui/icons-material";
import { AxiosResponse } from "axios";
import { ParsedUrlQuery } from "querystring";
import Layout from "components/Layout";

export interface UserProfileProps {
  user: User;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

export default function UserProfile(props: UserProfileProps) {
  const [user, setUser] = useState(props.user);

  return (
    <Layout>
      <Card sx={{ maxWidth: 345 }}>
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
          <IconButton aria-label="add to favorites">
            <FavoriteBorder />
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
