import { Box, Divider, Grid, List, MenuItem, Typography } from "@mui/material";
import Logo from "@/assets/tavlogo.png";
import Image from "next/image";
import {
  Email,
  Facebook,
  Instagram,
  Language,
  LinkedIn,
  Phone,
  Twitter,
  WhatsApp,
} from "@mui/icons-material";
import Link from "next/link";
import { makeStyles } from "@mui/styles";

type contactProps = {
  icon: JSX.Element;
  text: string;
};

type contactDataProps = {
  id: string;
  icon: any;
  text: string;
};

type linkDataProps = {
  id: string;
  url: string;
  name: string;
};

type followUsDataProps = {
  id: string;
  url: string;
  icon: any;
};

export default function PgFooter() {
  const classes = useStyles();
  return (
    <Box
      component="footer"
      sx={{
        padding: "4rem 0",
      }}>
      <Grid container spacing={4}>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Box
            sx={{
              width: "150px",
              height: "40px",
            }}>
            <Image
              src={Logo}
              alt="Logo"
              style={{
                objectFit: "fill",
                width: "100%",
                height: "100%",
              }}
            />
          </Box>
          <br />
          <Typography
            sx={{
              color: "#4B5563",
              fontSize: "0.9em",
              lineHeight: "30px",
            }}>
            We pride ourselves to be a catalyst for change, innovation, and
            cultural preservation in Africa.
          </Typography>
          <Box>
            {contactData?.map((item: contactDataProps) => (
              <Box key={item.id}>
                <br />
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {item.icon}
                  <Typography
                    sx={{
                      fontSize: "0.9em",
                      color: "#4B5563",
                    }}>
                    {item.text}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>

        <Grid item lg={8} md={8} sm={12} xs={12}>
          <Box
            style={{
              height: "100%",
            }}>
            <Box>
              <Grid container spacing={4}>
                <Grid item lg={4} md={4} sm={6} xs={6}>
                  <Box>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Quick Links
                    </Typography>
                    <br />
                    {quickLinksData?.map((item: linkDataProps) => (
                      <Box key={item.id}>
                        <br />
                        <Link href={item.url} className={classes.link}>
                          {item.name}
                        </Link>
                      </Box>
                    ))}
                  </Box>
                </Grid>

                <Grid item lg={4} md={4} sm={6} xs={6}>
                  <Box>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Get In Touch
                    </Typography>
                    <br />
                    {contactUsData?.map((item: linkDataProps) => (
                      <Box key={item.id}>
                        <br />
                        <Link href={item.url} className={classes.link}>
                          {item.name}
                        </Link>
                      </Box>
                    ))}
                  </Box>
                </Grid>

                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <Box>
                    <Typography sx={{ fontWeight: "bold" }}>Address</Typography>
                    <br />
                    <br />
                    <Typography
                      style={{
                        fontSize: "0.9em",
                        color: "#4B5563",
                      }}>
                      2464 Surulere, Lagos State, <br />
                      Nigeria.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                height: "25%",
                display: "flex",
                alignItems: "end",
                justifyContent: "end",
              }}>
              <Box>
                <Typography sx={{ fontWeight: "bold" }}>Follow us</Typography>
                <br />
                <Box sx={{ display: "flex", gap: 3 }}>
                  {followUsData?.map((item: followUsDataProps) => (
                    <Link
                      href={item.url}
                      key={item.id}
                      className={classes.link}>
                      {item.icon}
                    </Link>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <br />
      <Divider />
      <br />
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexGrow: 1,
            color: "#888888",
            fontSize: "0.7em",
          }}>
          Copyrighted&#169; TheAfrica Vison as {new Date().getFullYear()}. All
          Rights Reserved
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          {privacyLink?.map((item: linkDataProps) => (
            <Link key={item.id} href={item.url} className={classes.link2}>
              {item.name}
            </Link>
          ))}
        </Box>
      </Box>

      <Box
        sx={{ display: { xs: "flex", md: "none" }, flexDirection: "column" }}>
        <Box
          sx={{
            textAlign: "center",
            color: "#888888",
            fontSize: "0.7em",
          }}>
          Copyrighted&#169; TheAfrica Vison as {new Date().getFullYear()}. All
          Rights Reserved
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {privacyLink?.map((item: linkDataProps) => (
            <Link key={item.id} href={item.url} className={classes.link2}>
              {item.name}
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles(() => ({
  contacts: {
    marginRight: "10px",
    color: "#A8518A",
  },
  link: {
    fontSize: "0.9em",
    color: "#4B5563",
    "&:hover": {
      color: "#A8518A",
    },
  },
  link2: {
    fontSize: "0.7em",
    color: "#888888",
    marginLeft:"5px",
    "&:hover": {
      color: "#A8518A",
    },
  },
}));

const contactData: contactDataProps[] = [
  {
    id: "1",
    icon: <WhatsApp sx={{ marginRight: "10px", color: "#A8518A" }} />,
    text: "+(234) 912 879 8369",
  },
  {
    id: "2",
    icon: <Email sx={{ marginRight: "10px", color: "#A8518A" }} />,
    text: " Growth@theafricavision.com",
  },
  {
    id: "3",
    icon: <Phone sx={{ marginRight: "10px", color: "#A8518A" }} />,
    text: "+(234) 912 879 8369",
  },
  {
    id: "4",
    icon: <Language sx={{ marginRight: "10px", color: "#A8518A" }} />,
    text: "www.theafricavision.com",
  },
];

const quickLinksData: linkDataProps[] = [
  {
    id: "1",
    url: "/",
    name: "Home",
  },
  {
    id: "2",
    url: "/",
    name: "Donate",
  },
  {
    id: "3",
    url: "/",
    name: "Blog Post",
  },
  {
    id: "4",
    url: "/",
    name: "Campaign",
  },
];

const contactUsData: linkDataProps[] = [
  {
    id: "1",
    url: "/",
    name: "Contact Us",
  },
  {
    id: "2",
    url: "/",
    name: "Our Services",
  },
];

const followUsData: followUsDataProps[] = [
  {
    id: "1",
    url: "/",
    icon: <Twitter sx={{ color: "#A9518B" }} />,
  },
  {
    id: "2",
    url: "/",
    icon: <Instagram sx={{ color: "#A9518B" }} />,
  },
  {
    id: "3",
    url: "/",
    icon: <Facebook sx={{ color: "#A9518B" }} />,
  },
  {
    id: "4",
    url: "/",
    icon: <LinkedIn sx={{ color: "#A9518B" }} />,
  },
];

const privacyLink = [
  {
    id: "1",
    url: "/",
    name: "Terms",
  },
  {
    id: "2",
    url: "/",
    name: "Privacy",
  },
  {
    id: "3",
    url: "/",
    name: "Cookies",
  },
];
