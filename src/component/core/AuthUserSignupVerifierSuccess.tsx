import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Logo from "@/assets/tavlogo.png";
import ImageSuccessful from "@/assets/email-verification-successfull.png";
import PurpleButton from "../common/PurpleButton";
import Link from "next/link";

export default function AuthUserSignupVerifierSuccess() {
  return (
    <Box>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "0px solid gray",
        }}>
        <Box
          sx={{
            border: "0px solid red",
            width: { md: "50%", xs: "80%" },
            display: "flex",
            justifyContent: "center",
          }}>
          <Box>
            <Box textAlign="center">
              <Image src={Logo} alt="Logo" width={150} height={50} />
            </Box>
            <br />
            <br />
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "1.5em",
                color: "#120F0F",
                textAlign: "center",
              }}>
              Email Verification Successfull
            </Typography>
            <Box>
              <Image src={ImageSuccessful} alt="Verification Successfull" />
            </Box>
            <br />
            <br />
            <br />
            <Box>
              <Link href="../auth/login">
                <PurpleButton text="Login" fullWidth />
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
