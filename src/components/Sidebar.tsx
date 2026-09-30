import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { NavLink } from "react-router";

const drawerWidth = 240;
//warum nicht useref?

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        //flexShrink: nicht schrumpfen?
        flexShrink: 0,
        //Was macht:
        "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          User Admin
        </Typography>
      </Toolbar>
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={NavLink} to="/">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="User-Übersicht" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={NavLink} to="/create">
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Neuen Benutzer" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
