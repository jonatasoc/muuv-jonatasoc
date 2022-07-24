import { Skeleton } from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";

export default function ListUsersSkeleton() {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {Array.from({ length: 10 }).map((user) => (
        <>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Skeleton variant="circular" width={40} height={40} />
            </ListItemAvatar>
            <ListItemText>
              <Skeleton variant="text" width={270} height={24} />
              <Skeleton variant="text" width={272} height={20} />
            </ListItemText>
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      ))}
    </List>
  );
}
