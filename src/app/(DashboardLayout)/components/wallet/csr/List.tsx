import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  getCsrWalletBallance,
  getCsrWalletCampaign,
  getCsrWalletCurrent,
  getCsrWalletTrx,
} from "../../api/CsrWallet";
import { useAppContext } from "../../shared/Context";
import DashboardCard from "../../shared/DashboardCard";
import DataTableComponent from "./DataTable";

type ballance = {
  wallet_name: string;
  total_balance: number;
};

const List = () => {
  const [ballanceWalletData, setBallanceWalletData] = useState<ballance>();
  const [currentWalletData, setCurrentWalletData] = useState([]);
  const [currentWalletMeta, setCurrentWalletMeta] = useState({
    page: 0,
    per_page: 0,
    page_count: 0,
    total: 0,
  });
  const [transactionListData, setTransactionListData] = useState([]);
  const [transactionListMeta, setTransactionListMeta] = useState({
    page: 1,
    per_page: 5,
    page_count: 2,
    total: 10,
  });
  const [campaignListData, setCampaignListData] = useState([]);
  const [campaignListMeta, setCampaignListMeta] = useState({
    page: 1,
    per_page: 5,
    page_count: 2,
    total: 10,
  });
  const [page, setPage] = useState(1);
  const { isLoading, setIsLoading } = useAppContext();

  const handleChangePageWalletCurrent = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    getCsrWalletCurrent(
      setCurrentWalletData,
      setCurrentWalletMeta,
      value,
      setIsLoading
    );
  };

  const handleChangePageWalletTrx = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    getCsrWalletTrx(
      setTransactionListData,
      setTransactionListMeta,
      value,
      setIsLoading
    );
  };

  const handleChangePageWalletCampaign = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    getCsrWalletCampaign(
      setCampaignListData,
      setCampaignListMeta,
      value,
      setIsLoading
    );
  };

  const breadcrumbs = [
    <Typography fontSize="13px" key="3" color="#999" fontWeight={400}>
      CSR Wallet List
    </Typography>,
  ];

  useEffect(() => {
    getCsrWalletBallance(setBallanceWalletData, setIsLoading);
    getCsrWalletCurrent(
      setCurrentWalletData,
      setCurrentWalletMeta,
      page,
      setIsLoading
    );
    getCsrWalletTrx(
      setTransactionListData,
      setTransactionListMeta,
      page,
      setIsLoading
    );
    getCsrWalletCampaign(
      setCampaignListData,
      setCampaignListMeta,
      page,
      setIsLoading
    );
  }, []);

  return (
    <>
      <DashboardCard
        title="CSR Wallet"
        breadcrumb={breadcrumbs}
        currentBalance={ballanceWalletData?.total_balance}
      >
        <Box sx={{ paddingX: "40px" }}>
          <DataTableComponent
            currentWalletMeta={currentWalletMeta}
            currentWalletData={currentWalletData}
            onChangePageWalletCurrent={handleChangePageWalletCurrent}
            onChangePageWalletTrx={handleChangePageWalletTrx}
            campaignListData={campaignListData}
            campaignListMeta={campaignListMeta}
            onChangePageWalletCampaign={handleChangePageWalletCampaign}
            transactionListData={transactionListData}
            transactionListMeta={transactionListMeta}
          />
        </Box>
      </DashboardCard>
    </>
  );
};

export default List;
