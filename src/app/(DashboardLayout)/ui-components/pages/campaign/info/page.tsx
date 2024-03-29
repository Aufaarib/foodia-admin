"use client";
import { Approvals } from "@/app/(DashboardLayout)/components/api/Approvals";
import {
  getCampaignDetail,
  postCampaignPayment,
} from "@/app/(DashboardLayout)/components/api/Campaign";
import { getWalletList } from "@/app/(DashboardLayout)/components/api/Wallet";
import Detonator from "@/app/(DashboardLayout)/components/campaign/Detonator";
import Donators from "@/app/(DashboardLayout)/components/campaign/Donators";
import Info from "@/app/(DashboardLayout)/components/campaign/Info";
import Maps from "@/app/(DashboardLayout)/components/campaign/Maps";
import Orders from "@/app/(DashboardLayout)/components/campaign/Orders";
import { useAppContext } from "@/app/(DashboardLayout)/components/shared/Context";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import {
  ModalPopupAddDonations,
  ModalPopupApprovals,
} from "@/app/(DashboardLayout)/components/shared/ModalPopup";
import {
  Box,
  Button,
  Grid,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { IconBan, IconCircleCheck, IconCirclePlus } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  id: number;
  event_name: string;
  event_date: string;
  event_type: string;
  event_time: string;
  description: string;
  note: string;
  donation_target: any;
  donation_collected: any;
  status: string;
  order_status: string;
  image_url: string;
  food_required: number;
  food_total: number;
  latitude: any;
  longitude: any;
  address: string;
  sub_district: string;
  city: string;
  province: string;
  postal_code: string;
  detonator: {
    id: number;
    status: string;
    self_photo: string;
    oauth: { fullname: string; email: string; phone: string };
  };
  orders: [
    {
      id: number;
      order_status: string;
      qty: string;
      merchant: { oauth: { fullname: string } };
      merchant_product: {
        id: number;
        name: string;
        price: string;
        images: [{ image_url: string }];
      };
    }
  ];
  products: {
    id: number;
    name: string;
    description: string;
    price: string;
    qty: number;
    status: string;
  }[];
};

const CampaignInfo = () => {
  const searchParams = useSearchParams();
  const { isLoading, setIsLoading } = useAppContext();
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAddDonation, setIsOpenAddDonation] = useState(false);
  const [ids, setId] = useState<number>(0);
  const [status, setStatus] = useState("");
  const [valueWalletType, setValueWalletType] = useState("default");
  const [selectedWallet, setSelectedWallet] = useState("default");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [data, setData] = useState<Props>({
    id: 0,
    event_name: "",
    event_date: "",
    event_type: "",
    event_time: "",
    description: "",
    note: "",
    donation_target: "",
    donation_collected: "",
    status: "",
    order_status: "",
    image_url: "",
    food_required: 0,
    food_total: 0,
    latitude: "",
    longitude: "",
    address: "",
    sub_district: "",
    city: "",
    province: "",
    postal_code: "",
    detonator: {
      id: 0,
      status: "",
      self_photo: "",
      oauth: { fullname: "", email: "", phone: "" },
    },
    orders: [
      {
        id: 0,
        order_status: "",
        qty: "",
        merchant: { oauth: { fullname: "" } },
        merchant_product: {
          id: 0,
          name: "",
          price: "",
          images: [{ image_url: "" }],
        },
      },
    ],
    products: [
      {
        id: 0,
        name: "",
        description: "",
        price: "",
        qty: 0,
        status: "",
      },
    ],
  });
  const [walletList, setWalletList] = useState([]);
  const [fieldsCsrWalletSelection, setFields] = useState([""]); // Initial state with one empty field

  // const handleChange = (index: any, value: any) => {
  //   const newFields = [...fieldsCsrWalletSelection];
  //   newFields[index] = value;
  //   setFields(newFields);
  // };

  // const addField = () => {
  //   setFields([...fieldsCsrWalletSelection, ""]);
  // };

  // const removeField = (index: any) => {
  //   const newFields = [...fieldsCsrWalletSelection];
  //   newFields.splice(index, 1);
  //   setFields(newFields);
  // };

  const onChangeWalletType = (event: SelectChangeEvent) => {
    setValueWalletType(event.target.value);
    setSelectedWallet("default");
    getWalletList(setWalletList, event.target.value, setIsLoading);
  };

  const onChangeAddDonationAmount = (event: SelectChangeEvent) => {
    let inputVal = event.target.value;
    inputVal = inputVal.replace(/\D/g, ""); // Remove all non-numeric characters
    inputVal = inputVal.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Add dots every 3 digits
    setAmount(inputVal);
  };

  const onChangeSelectedWallet = (event: SelectChangeEvent) => {
    setSelectedWallet(event.target.value);
  };

  const handleOpenAddDonation = () => {
    setIsOpenAddDonation(true);
  };

  const handleCloseAddDonation = () => {
    setIsOpenAddDonation(false);
  };

  const handleAddDonation = (id: any, selectedWallet: any, amount: any) => {
    const addAmount = parseInt(amount.replace(/\./g, ""), 10);
    const onSuccess = () => {
      handleCloseAddDonation();
      location.reload();
    };
    postCampaignPayment(id, selectedWallet, addAmount, onSuccess());
  };

  const handleOpen = (id: number, status: string, name: string) => {
    setIsOpen(true);
    setName(name);
    setId(id);
    setStatus(status);
  };

  const handleClose = () => {
    setIsOpen(false);
    // setValueEventTypeSelect("default");
  };

  useEffect(() => {
    getCampaignDetail(searchParams.get("id"), setData, setIsLoading);
  }, []);

  const breadcrumbs = [
    <Button
      key={0}
      sx={{
        p: 0,
        fontSize: "13px",
        color: "#000",
        fontWeight: 400,
        ":hover": { color: "blue" },
      }}
      href="/ui-components/pages/campaign"
    >
      Campaign List
    </Button>,
    <Typography fontSize="13px" key="3" color="#999" fontWeight={400}>
      Campaign Detail
    </Typography>,
  ];

  return (
    <>
      <DashboardCard title="Campaign Detail" breadcrumb={breadcrumbs}>
        <>
          <Grid container spacing={3}>
            <Grid item xs={6} lg={6}>
              <Info data={data} />
              <Donators data={data.products} />
            </Grid>
            <Grid item xs={6} lg={6}>
              <Orders data={data} />
              <Detonator data={data} />
              <Maps data={data} />
              {/* <Attachment data={data} /> */}
            </Grid>
          </Grid>
          <Box
            paddingBottom="70px"
            paddingTop="20px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="10px"
          >
            <Stack spacing={1} direction="row">
              <Button
                variant="contained"
                size="large"
                color="success"
                disabled={
                  data.donation_collected >= data.donation_target ||
                  data.status !== "approved"
                }
                onClick={() => handleOpenAddDonation()}
              >
                <IconCirclePlus size={18} /> Add Donation
              </Button>
              <Button
                variant="contained"
                size="large"
                color="success"
                disabled={data.status === "approved"}
                onClick={() => handleOpen(data.id, "approved", data.event_name)}
              >
                <IconCircleCheck size={18} /> Approve
              </Button>
              <Button
                variant="contained"
                size="large"
                color="error"
                disabled={data.status === "rejected"}
                onClick={() => handleOpen(data.id, "rejected", data.event_name)}
              >
                <IconBan size={16} /> Reject
              </Button>
            </Stack>
          </Box>
        </>
      </DashboardCard>

      <ModalPopupAddDonations
        open={isOpenAddDonation}
        handleClose={handleCloseAddDonation}
        campaign_name={data.event_name}
        required_donation={data.donation_target}
        collected_donation={data.donation_collected}
        valueWalletType={valueWalletType}
        onChangeWalletType={onChangeWalletType}
        walletList={walletList}
        selectedWallet={selectedWallet}
        onChangeSelectedWallet={onChangeSelectedWallet}
        onChangeAddDonationAmount={onChangeAddDonationAmount}
        valueDonationAmount={amount}
        handleAddDonation={() =>
          handleAddDonation(data.id, selectedWallet, amount)
        }
        fieldsCsrWalletSelection={fieldsCsrWalletSelection}
      />

      <ModalPopupApprovals
        isLoading={isLoadingModal}
        open={isOpen}
        handleClose={handleClose}
        status={status}
        name={name}
        note={note}
        onChange={(e: any) => setNote(e.target.value)}
        handleSubmit={() => {
          setIsLoadingModal(true);
          Approvals(
            ids,
            status,
            note,
            setIsOpen,
            "campaign",
            setIsLoadingModal
            // valueEventTypeSelect
          );
        }}
        // valueEventTypeSelect={valueEventTypeSelect}
        // onChangeEventType={onChangeValueEventTypeSelect}
        // disableApprove={valueEventTypeSelect === "default"}
      />
    </>
  );
};

export default CampaignInfo;
