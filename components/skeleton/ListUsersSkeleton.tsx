import { Card, Grid, Skeleton } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { Fragment } from "react";

export default function ListUsersSkeleton() {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {Array.from({ length: 6 }).map((user, index) => (
        <Fragment key={index}>
          <ListItem alignItems="flex-start">
            <Card
              sx={{
                width: { sm: "100%", md: 600 },
                height: 84,
                px: 2,
                py: 1,
              }}
            >
              <Grid sx={{ display: "flex" }}>
                <ListItemAvatar sx={{ margin: 0 }}>
                  <Skeleton variant="circular" width={40} height={40} />
                </ListItemAvatar>
                <ListItemText>
                  <Skeleton variant="text" width={270} height={24} />
                  <Skeleton variant="text" width={272} height={20} />
                </ListItemText>
                <Skeleton variant="circular" width={16} height={16} />
              </Grid>
            </Card>
          </ListItem>
        </Fragment>
      ))}
    </List>
  );
}
