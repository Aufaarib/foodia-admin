import { SelectChangeEvent, Stack } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { ButtonAction, Status } from "../shared/Buttons";
import DataTables from "../shared/DataTables";
import { useAppContext } from "../shared/Context";
import { getMerchant } from "../api/Merchant";

interface Meta {
  page: number;
  per_page: number;
  page_count: number;
  total: number;
}

interface Data {
  id: number;
  status: string;
  created_at: string;
  oauth: { fullname: string; email: string; phone: string };
}

interface Props {
  data: Data[];
  meta: Meta;
  handleChangePage: any;
}

const columns = [
  {
    name: "No",
    selector: (_row: any, i: any) => i + 1,
    // sortable: true,
    width: "70px",
    // style: {
    //   paddingLeft: "30px",
    // },
  },
  {
    name: "User Name",
    cell: (row: any) => <div>{row.oauth.fullname}</div>,
    // sortable: true,
  },
  {
    name: "Merchant Name",
    cell: (row: any) => <div>{row.merchant_name}</div>,
    // sortable: true,
  },
  {
    name: "Email",
    cell: (row: any) => <div>{row.oauth.email}</div>,
    // sortable: true,
    width: "200px",
  },
  {
    name: "Phone number",
    cell: (row: any) => <div>{row.oauth.phone}</div>,
    // sortable: true,
  },
  {
    name: "Registered at",
    cell: (row: any) => (
      <div>{moment(row.created_at).format("DD/MM/YYYY")}</div>
    ),
    // sortable: true,
  },
  {
    name: "Status",
    cell: (row: any) => <Status row={row} />,
    // sortable: true,
  },
  {
    name: "Action",
    cell: (row: any) => (
      <Stack spacing={1} direction="row">
        <Link
          href={{
            pathname: "/ui-components/pages/merchant/info",
            query: {
              id: row.id,
            },
          }}
        >
          <ButtonAction label="View" />
        </Link>
      </Stack>
    ),
    width: "auto",
    // sortable: true,
  },
  // Add more columns as needed
];

const DataTableComponent = () => {
  const [filterText, setFilterText] = useState<string>("waiting");
  const [searchBy, setSearchBy] = useState<string>("fullname");
  const [searchText, setSearchText] = useState<string>("");
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({
    page: 0,
    per_page: 0,
    page_count: 0,
    total: 0,
  });
  const [page, setPage] = useState(1);
  const { isLoading, setIsLoading } = useAppContext();
  const [typingTimeout, setTypingTimeout] = useState<
    NodeJS.Timeout | undefined
  >(undefined);

  useEffect(() => {
    localStorage.setItem("FilterStatus", filterText);
    getMerchant(setData, setMeta, page, setIsLoading, filterText);
  }, []);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    setIsLoading(true);
    getMerchant(setData, setMeta, value, setIsLoading, filterText);
  };

  useEffect(() => {
    localStorage.setItem("SearchBy", searchBy);
    localStorage.setItem("SearchText", searchText);
  }, []);

  const handleChangeSearchBy = (event: SelectChangeEvent) => {
    setSearchBy(event.target.value);
    localStorage.setItem("SearchBy", event.target.value);
    setIsLoading(true);
    getMerchant(setData, setMeta, page, setIsLoading, filterText);
  };

  const handleChangeFilterText = (event: SelectChangeEvent) => {
    setIsLoading(true);
    localStorage.setItem("FilterStatus", event.target.value);
    setFilterText(event.target.value);
    getMerchant(setData, setMeta, page, setIsLoading, event.target.value);
  };

  const handleChangeSearch = (event: SelectChangeEvent) => {
    setSearchText(event.target.value);
    localStorage.setItem("SearchText", event.target.value);
  };

  const handleKeyUp = () => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    const timeout = setTimeout(() => {
      setIsLoading(true);
      getMerchant(setData, setMeta, page, setIsLoading, filterText);
      // Add your logic here
    }, 500); // Adjust the delay as needed (in milliseconds)
    setTypingTimeout(timeout);
  };

  // let filteredItems: any;
  // if (filterText === "unapproved") {
  //   filteredItems = data.filter(
  //     (data) =>
  //       data.status.toLowerCase() !== "approved" &&
  //       (searchBy === "fullname"
  //         ? data.oauth.fullname.toLowerCase().includes(searchText.toLowerCase())
  //         : searchBy === "email"
  //         ? data.oauth.email.toLowerCase().includes(searchText.toLowerCase())
  //         : data.oauth.phone.toLowerCase().includes(searchText.toLowerCase()))
  //   );
  // } else {
  //   filteredItems = data.filter(
  //     (data) =>
  //       data.status.toLowerCase() === "approved" &&
  //       (searchBy === "fullname"
  //         ? data.oauth.fullname.toLowerCase().includes(searchText.toLowerCase())
  //         : searchBy === "email"
  //         ? data.oauth.email.toLowerCase().includes(searchText.toLowerCase())
  //         : data.oauth.phone.toLowerCase().includes(searchText.toLowerCase()))
  //   );
  // }

  const searchOption = [
    {
      id: 1,
      value: "fullname",
      label: "User Name",
    },
    {
      id: 2,
      value: "email",
      label: "Email",
    },
    {
      id: 3,
      value: "phone",
      label: "Phone Number",
    },
  ];

  const filterOptions = [
    {
      id: 1,
      value: "waiting",
      label: "Waiting",
    },
    {
      id: 2,
      value: "rejected",
      label: "Rejected",
    },
    {
      id: 3,
      value: "approved",
      label: "Approved",
    },
  ];

  return (
    <>
      <DataTables
        value={filterText}
        searchOption={searchOption}
        valueSearchBy={searchBy}
        onChangeFilterText={handleChangeFilterText}
        onKeyUpSearch={handleKeyUp}
        filterText={filterOptions}
        onChange={handleChangePage}
        onChangeSearch={handleChangeSearch}
        onChangeSearchBy={handleChangeSearchBy}
        pageItems={data.length}
        meta={meta}
        columns={columns}
        data={data}
        pagination={true}
      />
    </>
  );
};

export default DataTableComponent;
