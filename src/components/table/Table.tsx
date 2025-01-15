import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import PushPin from "@mui/icons-material/PushPin";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import StarIcon from "@mui/icons-material/Star";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Input,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "@/api";
import { Toaster, toast } from "sonner";
import BodyPayment, { ICustomers } from "@/types";

interface BodySeller {
  sellerId: string;
  amount: number;
  comment: string;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BasicTable: React.FC<{ data: ICustomers[]; type: string }> = ({
  data,
  type,
}) => {
  // Mutatsiyalar
  const mutationCustomer = useMutation({
    mutationFn: ({ body }: { body: BodyPayment }) =>
      request
        .post(`/create/payment`, body)
        .then((res) => res)
        .finally(() => toast.success("siz muvaffaqiyatli tolov Qildingiz")),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [type] });
    },
  });

  const mutationSeller = useMutation({
    mutationFn: ({ body }: { body: BodySeller }) =>
      request
        .post(`/create/expense`, body)
        .then((res) => res)
        .finally(() => toast.success("siz muvaffaqiyatli tolov Qildingiz")),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [type] });
    },
  });

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [id, setId] = useState<null | string>(null);
  const open = Boolean(anchorEl);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleInputValue = (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);

    if (type === "customer") {
      const formJson: BodyPayment = {
        customerId: formData.get(`${type}Id`) as string,
        amount: Number(formData.get("amount")),
        comment: formData.get("comment") as string,
      };

      mutationCustomer.mutate({ body: formJson });
    } else if (type === "seller") {
      const formJson: BodySeller = {
        sellerId: formData.get(`${type}Id`) as string,
        amount: Number(formData.get("amount")),
        comment: formData.get("comment") as string,
      };

      mutationSeller.mutate({ body: formJson });
    }

    handleCloseModal();
    handleClose();
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, pin }: { id: string; pin: boolean }) =>
      request.patch(`/update/${type}/${id}`, { pin: !pin }).then((res) => res),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [type] });
    },
  });

  const handlePinUnpin = (id: string, pin: boolean) => {
    mutation.mutate({ id, pin });
    handleClose();
  };

  return (
    <>
      <Toaster position="top-right" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>First name</TableCell>
              <TableCell align="right">Last name</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Budget</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row: ICustomers) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.pin && (
                    <span>
                      <PushPin fontSize="small" className="rotate-45" />
                    </span>
                  )}
                  {row.fname}
                </TableCell>
                <TableCell align="right">{row.lname}</TableCell>
                <TableCell align="right">{row.phone_primary}</TableCell>
                <TableCell align="right">
                  {new Date().getTime() - new Date(row.isPaidToday).getTime() <
                  86_400_400 ? (
                    <StarIcon fontSize="small" />
                  ) : (
                    ""
                  )}{" "}
                  {row.budget}
                </TableCell>
                <TableCell align="right">{row.address}</TableCell>
                <TableCell align="right">
                  <Button
                    aria-controls={open ? "demo-positioned-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={(event) => handleClick(event, row._id)}
                  >
                    <MoreHorizIcon />
                  </Button>
                  {row._id === id && (
                    <Menu
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      <MenuItem
                        onClick={() => handlePinUnpin(row._id, row.pin)}
                      >
                        {row.pin ? "Unpin" : "Pin"}
                      </MenuItem>
                      <MenuItem onClick={handleOpenModal}>Payment</MenuItem>
                      <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={openModal}
                        onClose={handleCloseModal}
                        closeAfterTransition
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                          backdrop: {
                            timeout: 500,
                          },
                        }}
                      >
                        <Fade in={openModal}>
                          <Box sx={style}>
                            <Typography
                              id="modal-modal-title"
                              variant="h6"
                              component="h2"
                              color="primary"
                            >
                              {row.fname} payment
                            </Typography>
                            <form onSubmit={handleInputValue}>
                              <Stack spacing={1}>
                                <Input
                                  type="text"
                                  name={`${type}Id`}
                                  value={row._id}
                                  style={{ display: "none" }}
                                />
                                <Input
                                  placeholder="payment amount!"
                                  name="amount"
                                  type="number"
                                  required
                                />
                                <Input
                                  placeholder="comment write"
                                  name="comment"
                                  type="text"
                                />
                                <div className="flex justify-end">
                                  <Button
                                    onClick={() => {
                                      handleCloseModal();
                                      handleClose();
                                    }}
                                  >
                                    Close
                                  </Button>
                                  <Button type="submit" size="small">
                                    payment
                                  </Button>
                                </div>
                              </Stack>
                            </form>
                          </Box>
                        </Fade>
                      </Modal>
                    </Menu>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BasicTable;
