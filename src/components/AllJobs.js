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

const Jobs = () => {
  const [jobs, setJobs] = useState([]); // State for jobs data
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Fetch jobs from the API
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://my-elegant-backend-api.onrender.com/admin/jobs",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      setJobs(response.data || []); // Set jobs data
    } catch (error) {
      console.error("Error fetching jobs:", error.response?.data || error.message);
      alert("Failed to fetch jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch jobs data when the component mounts
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Jobs
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : jobs.length === 0 ? (
        <Typography>No jobs found.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Company Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job._id}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job?.company?.companyName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
};

export default Jobs;
