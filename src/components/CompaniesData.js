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

const Companies = () => {
  const [companies, setCompanies] = useState([]); // State for companies data
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Fetch companies from the API
  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://my-elegant-backend-api.onrender.com/admin/companies",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      setCompanies(response.data || []); // Set companies data
    } catch (error) {
      console.error("Error fetching companies:", error.response?.data || error.message);
      alert("Failed to fetch companies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a company
  const handleDeleteCompany = async (id) => {
    if (!window.confirm("Are you sure you want to delete this company?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://my-elegant-backend-api.onrender.com/admin/companies/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCompanies(); // Refresh the list after deletion
      alert("Company deleted successfully.");
    } catch (error) {
      console.error("Error deleting company:", error.response?.data || error.message);
      alert("Failed to delete company. Please try again.");
    }
  };

  // Fetch companies data when the component mounts
  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Companies
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : companies.length === 0 ? (
        <Typography>No companies found.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company._id}</TableCell>
                <TableCell>{company.companyName}</TableCell>
                <TableCell>{company.companyEmail}</TableCell>
                <TableCell>{company.location}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDeleteCompany(company._id)}
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

export default Companies;
