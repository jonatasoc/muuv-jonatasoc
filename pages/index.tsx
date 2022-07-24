import { Grid, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import Layout from "components/Layout";
import ListUsers from "components/ListUsers";
import ListUsersSkeleton from "components/skeleton/ListUsersSkeleton";
import { useFavorites } from "contexts/FavoritesContext";
import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { api } from "services/api";
import { ReqResApiPaginatedResponse, User } from "services/types";

const LIMIT_PER_PAGE = 6;

const Home: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const { userFavorites } = useFavorites();

  const fetchUsers = useCallback(
    async (page: number) => {
      try {
        const { data: response } = await api.get<
          string,
          AxiosResponse<ReqResApiPaginatedResponse<User[]>>
        >("/users", {
          params: {
            page,
            per_page: LIMIT_PER_PAGE,
          },
        });

        const { data: newUsers } = response;
        setTotal(response.total);

        setUsers([...users, ...newUsers]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [users]
  );

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleMore = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  return (
    <>
      <Head>
        <title>MUUV LABS - Challenge</title>
        <meta name="description" content="Challenge to MUUV LABS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Grid sx={{ maxWidth: 640, margin: "0 auto" }}>
          <Typography
            variant="h4"
            color="primary"
            sx={{ mb: 2, textAlign: "center" }}
          >
            Our Users
          </Typography>
          <Grid container justifyContent="center" sx={{ m: 1 }}>
            {loading ? (
              <ListUsersSkeleton />
            ) : (
              <ListUsers
                users={users}
                loadMore={handleMore}
                totalUsers={total}
              />
            )}
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="center"
          flexDirection="column"
          sx={{
            backgroundColor: "#f6f7fb",
            p: 2,
            width: "calc(100vw - 18px)",
          }}
        >
          <Typography
            variant="h4"
            color="primary"
            sx={{ mb: 2, textAlign: "center" }}
          >
            Your favorites
          </Typography>
          <Grid
            container
            justifyContent="center"
            sx={{ m: 1, maxWidth: 640, margin: "0 auto" }}
          >
            {loading ? (
              <ListUsersSkeleton />
            ) : (
              <ListUsers users={userFavorites} />
            )}
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default Home;
