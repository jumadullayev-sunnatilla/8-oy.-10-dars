import CreateCS from "@/components/create-cs/CreateCS";
import TableProduct from "@/components/tableProduct/TableProduct";
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
import { useState } from "react";
import LogOutDashbord from "@/pages/logOutDashbord/LogOutDashbord";
import { useQuery } from "@tanstack/react-query";

import { ProductData } from "@/types";
import { request } from "@/api";

const Product = () => {
  // select options
  const [limitSelect, setLimitSelect] = useState(3);

  const handleChangeLimit = (event: SelectChangeEvent) => {
    setLimitSelect(+event.target.value);
  };
  const [open, setOpen] = useState<null | string>(null);
  const [page, setPage] = useState(1);
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  // Ma'lumotlarni olish
  const { data, isLoading } = useQuery({
    queryKey: ["products", page], // Query kaliti
    queryFn: () => {
      return request
        .get("/get/products", {
          params: {
            skip: page,
            limit: limitSelect,
          },
        })
        .then((res) => res.data);
    },
  });
  const JamiPage = Math.floor(data?.totalCount / limitSelect);

  // Umumiy mahsulotlar soni va mahsulotlar ro'yxati
  const products: ProductData[] = data?.innerData || []; // Mahsulotlar ro'yxati

  return (
    <div>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: "20px" }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Seller
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
      <TableProduct data={products} loading={isLoading} />
      <div className="mx-auto w-[400px] mt-10">
        <Pagination count={JamiPage} color="primary" onChange={handleChange} />
      </div>
      <CreateCS open={open} close={() => setOpen(null)} />
    </div>
  );
};

export default Product;
