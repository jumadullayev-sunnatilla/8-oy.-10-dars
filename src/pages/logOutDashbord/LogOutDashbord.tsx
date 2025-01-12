import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/redux/slice/auth-slice";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

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

const LogOutDashbord = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>
        <ExitToAppIcon color="primary" />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Log Out
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Siz Accontni tark etmoqdasiz  
          </Typography>
          <div className="flex justify-end">
            <Button size="small" variant="contained" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default LogOutDashbord;
