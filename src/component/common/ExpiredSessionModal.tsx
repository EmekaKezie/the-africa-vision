import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import PurpleButton from "./PurpleButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

type props = {
  canClose?: boolean;
};

export default function ExpiredSessionModal(props: props) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setLoading(true);
    //if (props.onToggle) props.onToggle(!props.open)
    router.push("/auth/logout");
  };

  const handleClose = () => {
    if (props.canClose) setOpen(false);
  };

  return (
    <Dialog open={open} maxWidth="xs" onClick={handleClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>{`You have to be logged to continue. It's either you have not logged or your session has expired`}</DialogContent>
      <DialogActions sx={{ padding: "0.5rem 1rem" }}>
        <PurpleButton
          text="Login"
          onClick={handleClick}
          disabled={loading}
          loading={loading}
          style={{
            width: "100px",
          }}
        />
      </DialogActions>
    </Dialog>
  );
}
