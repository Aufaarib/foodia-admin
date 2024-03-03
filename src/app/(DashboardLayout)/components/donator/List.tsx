import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getCorporation } from "../api/Corporation";
import { useAppContext } from "../shared/Context";
import DashboardCard from "../shared/DashboardCard";
import DataTableComponent from "./DataTable";

interface Meta {
  page: number;
  per_page: number;
  page_count: number;
  total: number;
}

const List = () => {
  // const { detonatorData } = useAppContext();
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({
    page: 0,
    per_page: 0,
    page_count: 0,
    total: 0,
  });
  const { setIsUnapprovedDetonator } = useAppContext();
  const [page, setPage] = useState(1);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    getCorporation(setData, setMeta, value);
  };

  useEffect(() => {
    getCorporation(setData, setMeta, page);
  }, []);

  const breadcrumbs = [
    <Typography fontSize="13px" key="3" color="#999" fontWeight={400}>
      Corporation Donators
    </Typography>,
  ];

  return (
    <>
      <DashboardCard
        title="Corporation Donators Management"
        breadcrumb={breadcrumbs}
      >
        <Box sx={{ paddingX: "40px" }}>
          <DataTableComponent
            data={data}
            meta={meta}
            handleChangePage={handleChangePage}
          />
        </Box>
      </DashboardCard>
    </>
  );
};

export default List;
