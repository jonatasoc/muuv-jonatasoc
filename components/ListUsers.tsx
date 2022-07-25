import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Button, Card, Grid, IconButton, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { useFavorites } from "contexts/FavoritesContext";
import Link from "next/link";
import { Fragment, useCallback } from "react";
import { User } from "services/types";

interface ListUsersProps {
  users: User[];
  loadMore?: () => void;
  totalUsers?: number;
  showLoadMoreButton?: boolean;
}

export default function ListUsers({
  users,
  loadMore,
  totalUsers,
  showLoadMoreButton = true,
}: ListUsersProps) {
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
    <>
      <List sx={{ width: "100%" }}>
        {users?.map((user) => (
          <Fragment key={user.id}>
            <ListItem alignItems="flex-start">
              <Link href={String(user.id)}>
                <Card
                  sx={{
                    width: { xs: "100%", md: 600 },
                    minWidth: 322,
                    height: 84,
                    px: 2,
                    py: 1,
                    cursor: "pointer",
                  }}
                >
                  <Grid sx={{ display: "flex" }}>
                    <ListItemAvatar sx={{ margin: 0 }}>
                      <Avatar alt={user.avatar} src={user.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ margin: 0 }}
                      primary={
                        <Typography variant="body1" lineHeight={1}>
                          {`${user.first_name} ${user.last_name}`}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="caption"
                          color="primary"
                          fontWeight={700}
                          lineHeight={0}
                        >
                          {user.email}
                        </Typography>
                      }
                    />
                    <IconButton
                      aria-label="add to favorites"
                      onClick={(e) => handleFavorite(e, user)}
                    >
                      {isAlreadyFavorite(user.id) ? (
                        <Favorite />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </IconButton>
                  </Grid>
                </Card>
              </Link>
            </ListItem>
          </Fragment>
        ))}
      </List>
      {showLoadMoreButton && users?.length < totalUsers! && (
        <Button variant="outlined" sx={{ my: 2 }} onClick={loadMore}>
          Load More
        </Button>
      )}
    </>
  );
}
