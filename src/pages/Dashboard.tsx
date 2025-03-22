import React from "react";
import { Container, Typography, Grid2 } from "@mui/material";
import JobCard from "../components/JobCard";
import SortSelect from "../components/SortSelect";

const Dashboard: React.FC = () => {
  const jobsSample = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Sample Company",
      location: "New York, USA",
      time: "2 days ago",
      experience: "1-3 years",
      employmentType: "Full-time",
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "Sample Company",
      location: "New York, USA",
      time: "3 days ago",
      experience: "1-3 years",
      employmentType: "Full-time",
    },
    {
      id: 3,
      title: "Fullstack Developer",
      company: "Sample Company",
      location: "New York, USA",
      time: "4 days ago",
      experience: "1-3 years",
      employmentType: "Full-time",
    },
    {
      id: 4,
      title: "UI/UX Designer",
      company: "Sample Company",
      location: "New York, USA",
      time: "5 days ago",
      experience: "1-3 years",
      employmentType: "Full-time",
    },
    {
      id: 5,
      title: "Mobile Developer",
      company: "Sample Company",
      location: "New York, USA",
      time: "6 days ago",
      experience: "1-3 years",
      employmentType: "Full-time",
    },
    {
      id: 6,
      title: "Data Scientist",
      company: "Sample Company",
      location: "New York, USA",
      time: "7 days ago",
      experience: "1-3 years",
      employmentType: "Full-time",
    },
  ];

  return (
    <Container sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <SortSelect />
      <Grid2 container spacing={2}>
        {jobsSample.map((item) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
            <JobCard
              title={item.title}
              company="Sample Company"
              location="New York, USA"
              time="2 days ago"
              experience="1-3 years"
              employmentType="Full-time"
            />
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default Dashboard;
