import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Card, Grid, IconButton, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import * as React from "react";
import { User } from "services/types";

interface ListUsersProps {
  users: User[];
}

export default function ListUsers({ users = [] }: ListUsersProps) {
  return (
    <List sx={{ width: "100%" }}>
      {users.map((user) => (
        <React.Fragment key={user.id}>
          <ListItem alignItems="flex-start">
            <Link href={String(user.id)}>
              <Card
                sx={{
                  width: { sm: "100%", md: 600 },
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
                      <Typography variant="body1" lineHeight="8px">
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
                  <IconButton aria-label="add to favorites">
                    <FavoriteBorder />
                  </IconButton>
                </Grid>
              </Card>
            </Link>
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );
}
