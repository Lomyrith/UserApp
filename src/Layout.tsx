import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar";

export default function Layout() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Das Outlet tauscht den Inhalt je nach Route aus */}
        <Outlet />
      </Box>
    </Box>
  );
}
