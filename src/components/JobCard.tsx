import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  time: string;
  experience: string;
  employmentType: string;
}

const JobCard: React.FC<JobCardProps> = ({
  title,
  company,
  location,
  time,
  experience,
  employmentType,
}) => {
  return (
    <Card sx={{ marginBottom: 2, maxWidth: 400 }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography color="text.secondary">
          {company} - {location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {time}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {experience} | {employmentType}
        </Typography>
        <Button variant="contained" color="primary" sx={{ marginTop: 1 }}>
          Apply
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobCard;
