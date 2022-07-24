import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Card } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { User } from "services/types";

interface ListUsersProps {
  users: User[];
}

export default function ListUsers({ users = [] }: ListUsersProps) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {users.map((user) => (
        <>
          <ListItem alignItems="flex-start">
            <Card sx={{ width: 327, height: 144, px: 2, py: 1 }}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={user.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={`${user.first_name} ${user.last_name}`}
                secondary={<React.Fragment>{user.email}</React.Fragment>}
              />
              <FavoriteBorder />
            </Card>
          </ListItem>
        </>
      ))}
    </List>
  );
}
