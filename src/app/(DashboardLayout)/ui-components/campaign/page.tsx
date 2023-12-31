"use client";
import { Grid, Paper } from "@mui/material";
import CampaignData from "@/app/(DashboardLayout)/components/campaign/List";
import PageContainer from "../../components/container/PageContainer";

const CampaignManagement = () => {
  return (
    <PageContainer
      title="Campaign Management"
      description="this is campaign management"
    >
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <CampaignData />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default CampaignManagement;
