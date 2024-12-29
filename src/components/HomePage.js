import React from "react";
import { Box, Typography } from "@mui/material";

const AdminHome = () => {
  // Check if the token exists in localStorage
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  return (
    <>
      {isLoggedIn ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Typography variant="h3">Welcome to the Admin Home Page!</Typography>
        </Box>
      ) : (
        <Box textAlign="center" mt={5}>
          <Typography variant="h4" gutterBottom>
            Welcome to the Admin-User Portal
          </Typography>
            <Typography variant="h4" gutterBottom>
              Please Register
            </Typography>
        </Box>
      )}
    </>
  );
};

export default AdminHome;
