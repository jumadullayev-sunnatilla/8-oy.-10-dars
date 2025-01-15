import { request } from "@/api";
import CreateCS from "@/components/create-cs/CreateCS";
import Table from "@/components/table/Table";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LogOutDashbord from "@/pages/logOutDashbord/LogOutDashbord";

const Customer = () => {
  // select options
  const [limitSelect, setLimitSelect] = useState(3);

  const handleChangeLimit = (event: SelectChangeEvent) => {
    setLimitSelect(+event.target.value);
  };
  const [page, setPage] = useState(1);
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const [open, setOpen] = useState<null | string>(null);
  // data fetching
  const { data } = useQuery({
    queryKey: ["customer", page, limitSelect],
    queryFn: () => {
      return request
        .get("/get/customers", {
          params: {
            skip: page - 1,
            limit: limitSelect,
          },
        })
        .then((res) => res.data);
    },
  });
  const JamiPage = Math.floor(data?.totalCount / limitSelect);

  return (
    <div>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: "20px" }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Customer
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            mb: "20px",
            alignItems: "center",
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Limit</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={limitSelect.toString()}
              label="Age"
              onChange={handleChangeLimit}
              color="primary"
            >
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={() => setOpen("customer")}>Create</Button>
          <LogOutDashbord />
        </Box>
      </Box>
      <Table data={data?.innerData} type={"customer"} />
      <div className="mx-auto w-[400px] mt-10">
        <Pagination count={JamiPage} color="primary" onChange={handleChange} />
      </div>
      <CreateCS open={open} close={() => setOpen(null)} />
    </div>
  );
};

export default Customer;
