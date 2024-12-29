import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]); // Ensure users is an array
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://my-elegant-backend-api.onrender.com/admin/users",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data); // Debug API response structure
      setUsers(response.data|| []); // Fallback to an empty array if users is undefined
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://my-elegant-backend-api.onrender.com/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error.response?.data || error.message);
      alert("Failed to delete user. Please try again.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : !Array.isArray(users) || users.length === 0 ? (
        <Typography>No users found.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.fullname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDelete(user._id)}
                    color="secondary"
                    variant="outlined"
                    size="small"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
};

export default Users;
