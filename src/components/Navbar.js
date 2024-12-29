
import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  // Check if user is logged in by looking for the token in localStorage
  const isLoggedIn = !!localStorage.getItem("token");

  // Links for public users (before login)
  const publicLinks = [
    { label: "Home", path: "/" },
    { label: "Register", path: "/admin/register" },
    { label: "Login", path: "/admin/login" },
  ];

  // Links for logged-in admins (after login)
  const adminLinks = [
    { label: "Home", path: "/" },
    { label: "All Users", path: "/admin/users" },
    { label: "All Companies", path: "/admin/companies" },
    { label: "All Jobs", path: "/admin/jobs" },
  ];

  // Handle menu open and close
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    handleMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Elegant
        </Typography>
        {isLoggedIn ? (
          <>
            {adminLinks.map((link) => (
              <Button
                key={link.path}
                color="inherit"
                onClick={() => navigate(link.path)}
                sx={{ marginLeft: 2 }}
              >
                {link.label}
              </Button>
            ))}
            <Button
              color="inherit"
              onClick={handleMenuOpen}
              sx={{ marginLeft: 2 }}
            >
              Profile
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => { navigate("/admin/profile"); handleMenuClose(); }}>
                View Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          publicLinks.map((link) => (
            <Button
              key={link.path}
              color="inherit"
              onClick={() => navigate(link.path)}
              sx={{ marginLeft: 2 }}
            >
              {link.label}
            </Button>
          ))
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
