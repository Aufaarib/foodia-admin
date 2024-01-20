import axios from "axios";
import { useEffect, useState } from "react";
import BaseCard from "../shared/DashboardCard";
import DataTableComponent from "./DataTable";
import { useAppContext } from "../shared/Context";
import { getMerchant } from "../api/Merchant";

const List = () => {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({
    page: 0,
    per_page: 0,
    page_count: 0,
    total: 0,
  });
  const { setIsUnapprovedMerchant } = useAppContext();

  useEffect(() => {
    getMerchant(setData, setMeta);
  }, []);

  return (
    <>
      <BaseCard title="Merchant Management">
        <DataTableComponent data={data} meta={meta} />
      </BaseCard>
    </>
  );
};

export default List;
