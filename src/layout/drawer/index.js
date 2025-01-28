import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Toolbar,
  CssBaseline,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import PowerSettingsNew from "@mui/icons-material/PowerSettingsNew";
import { AppBar, Drawer, DrawerHeader } from "../styledLayout";
import { IoMdContact } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../auth/useAuthContext";
import useMenu from "../../hooks/useMenu";
import { NavSectionVertical } from "../../muiComponents/nav-section";
import { MdMenuOpen } from "react-icons/md";

const MuiDrawer = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const { navConfigMenu } = useMenu();

  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const openDropDown = Boolean(anchorEl);

  // Handle responsive initial state
  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth >= 600);
    };
    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDrawerToggle = () => {
    setOpen((prevState) => !prevState);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    logout();
    setAnchorEl(null);
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="inherit">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" spacing={3} alignItems="center">
            <IconButton
              color="inherit"
              onClick={handleDrawerToggle}
              edge="start"
              aria-label="toggle sidebar"
            >
              {open ? <MdMenuOpen /> : <MenuIcon />}
            </IconButton>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton onClick={handleMenuClick} size="small">
              <IoMdContact size={50} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={openDropDown}
              onClose={handleMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  mt: 1.5,
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleLogOut}>
                <PowerSettingsNew fontSize="small" sx={{ color: "#ff7534" }} />
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader />
        <NavSectionVertical data={navConfigMenu} />
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, background: "#F5F7FF", mt: 4 }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            background: "#F5F7FF",
            zIndex: -1,
          }}
        />
        {children}
      </Box>
    </Box>
  );
};

export default MuiDrawer;
