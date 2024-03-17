import {
  Box,
  Step,
  StepIconProps,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { IconBan, IconCircleCheck, IconClock } from "@tabler/icons-react";
import { uniqueId } from "lodash";
import DetailCard from "../shared/DetailCard";

interface ChildProps {
  data: {
    id: number;
    ktp_number: string;
    merchant_name: string;
    status: string;
    no_link_aja: string;
    province: string;
    city: string;
    sub_district: string;
    postal_code: string;
    address: string;
    oauth: { fullname: string; email: string; phone: string };
  };
}

interface CustomStepIconProps extends StepIconProps {
  stepNumber: number;
}

export const Field = ({ value, label }: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "10px",
          width: "25%",
          color: "#999",
        }}
      >
        <Typography width="130px">{label}</Typography>
        <Typography>:</Typography>
      </Box>
      <Box sx={{ paddingLeft: "40px" }}>{value}</Box>
    </Box>
  );
};

const Info: React.FC<ChildProps> = ({ data }) => {
  const steps = ["Waiting", "Rejected", "Approved"];

  const activeStep = () => {
    if (data.status === "warning") {
      return 0;
    } else if (data.status === "rejected") {
      return 1;
    } else if (data.status === "approved") {
      return 2;
    }
  };

  const CustomStepIcon: React.FC<CustomStepIconProps> = ({
    active,
    stepNumber,
  }) => {
    // Customize each step's icon individually
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingX="20px"
        color="white"
        zIndex={1}
      >
        {stepNumber === 1 ? (
          <Typography
            display="flex"
            flexDirection="row"
            sx={
              active
                ? {
                    borderRadius: "15px",
                    paddingX: "10px",
                    backgroundColor: "warning.main",
                  }
                : {
                    borderRadius: "15px",
                    paddingX: "10px",
                    backgroundColor: "grey",
                  }
            }
          >
            Waiting <IconClock />
          </Typography>
        ) : stepNumber === 2 ? (
          <Typography
            display="flex"
            flexDirection="row"
            sx={
              active
                ? {
                    borderRadius: "15px",
                    paddingX: "10px",
                    backgroundColor: "error.main",
                  }
                : {
                    borderRadius: "15px",
                    paddingX: "10px",
                    backgroundColor: "grey",
                  }
            }
          >
            Rejected <IconBan />
          </Typography>
        ) : (
          stepNumber === 3 && (
            <Typography
              display="flex"
              flexDirection="row"
              sx={
                active
                  ? {
                      borderRadius: "15px",
                      paddingX: "10px",
                      backgroundColor: "success.main",
                    }
                  : {
                      borderRadius: "15px",
                      paddingX: "10px",
                      backgroundColor: "grey",
                    }
              }
            >
              Approved <IconCircleCheck />
            </Typography>
          )
        )}
      </Box>
    );
  };

  const status = [
    <Stepper key={uniqueId()} activeStep={activeStep()} alternativeLabel>
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel
            StepIconComponent={(props) => (
              <CustomStepIcon stepNumber={index + 1} {...props} />
            )}
          >
            {/* {label} */}
          </StepLabel>
        </Step>
      ))}
    </Stepper>,
  ];

  return (
    <>
      <DetailCard title="Merchant Information">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: "10px",
            width: "100%",
          }}
        >
          <Field label="Fullname" value={data.oauth.fullname} />
          <Field label="Store Name" value={data.merchant_name} />
          <Field label="KTP Number" value={data.ktp_number} />
          <Field label="Phone Number" value={data.oauth.phone} />
          <Field label="Link Aja Number" value={data.no_link_aja} />
          <Field label="Email" value={data.oauth.email} />
          <Field
            label="Address"
            value={`${data.address}, ${data.sub_district}, ${data.city}, ${data.province}, ${data.postal_code}`}
          />
        </Box>
        <Box>{status}</Box>
      </DetailCard>
    </>
  );
};

export default Info;
