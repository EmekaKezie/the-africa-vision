import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
    EmailIcon,
    EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

type props = {
  url: string;
};

export default function SocialShare(props: props) {
  const classes = useStyles();
  return (
    <Card elevation={2}>
      <CardContent>
        <Box component={"h3"}>
          Share
        </Box>
        <br />
        <Box component={"div"} className={classes.socialIconBox}>
          <Box>
            <FacebookShareButton url={props.url}>
              <Typography className={classes.socialIconContainer}>
                <FacebookIcon className={classes.socialIcon} />
              </Typography>
            </FacebookShareButton>
          </Box>

          <Box>
            <TwitterShareButton url={props.url}>
              <Typography className={classes.socialIconContainer}>
                <TwitterIcon className={classes.socialIcon} />
              </Typography>
            </TwitterShareButton>
          </Box>

          <Box>
            <WhatsappShareButton url={props.url}>
              <Typography className={classes.socialIconContainer}>
                <WhatsappIcon className={classes.socialIcon} />
              </Typography>
            </WhatsappShareButton>
          </Box>

          <Box>
            <LinkedinShareButton url={props.url}>
              <Typography className={classes.socialIconContainer}>
                <LinkedinIcon className={classes.socialIcon} />
              </Typography>
            </LinkedinShareButton>
          </Box>

          <Box>
            <EmailShareButton url={props.url}>
              <Typography className={classes.socialIconContainer}>
                <EmailIcon className={classes.socialIcon} />
              </Typography>
            </EmailShareButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

const useStyles = makeStyles(() => ({
 
  container: {
    border: "",
  },
  socialIconBox: {
    display: "flex",
    gap: 10,
    textAlign:"center"
  },

  socialIconContainer: {
    "&:hover": {
      opacity: 0.8,
    },
  },

  socialIcon: {
    borderRadius: "50%",
    width: "30px",
    height: "30px",
  },
}));
