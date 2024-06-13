import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";

type dataBodyProps = {
  sn?: string;
  heading?: string | ReactNode;
  text?: string | ReactNode;
};

type dataProps = {
  sn: number;
  heading?: string | ReactNode;
  text?: string | ReactNode;
  body?: dataBodyProps[];
};

export default function PgPrivacy() {
  return (
    <Box
      sx={{
        padding: { md: "0 15rem", sx: "0 1rem" },
      }}>
      <Typography
        sx={{
          fontSize: "1.5em",
          fontWeight: "bold",
          color: "black",
          textAlign: "center",
        }}>
        Privacy
      </Typography>
      <Typography sx={{ color: "gray", textAlign: "center" }}>
        Privacy Statement for TheAfrica Vision Info Technology Company Ltd
      </Typography>
      <Typography sx={{ color: "gray", textAlign: "center" }}>
        Last Updated: 30th April 2024
      </Typography>
      <br />
      {data?.map((item: dataProps, index:number) => (
        <Box key={index}>
          <ListItem
            sx={{
              display: "flex",
              alignItems: "flex-start",
            }}>
            <ListItemIcon
              sx={{
                marginTop: "10px",
                color: "black",
              }}>
              {`${item.sn}.`}
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  sx={{
                    color: "black",
                  }}>
                  {item.heading}
                </Typography>
              }
              secondary={
                <Typography
                  sx={{
                    color: "gray",
                  }}>
                  {item.text}
                </Typography>
              }
            />
          </ListItem>
          <Box
            sx={{
              border: "0px solid gray",
              margin: "0 5%",
            }}>
            {item.body?.map((bodyItem: dataBodyProps, index2:number) => (
              <Box key={index2}>
                <ListItem
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                  }}>
                  <ListItemIcon
                    sx={{
                      marginTop: "10px",
                      color: "black",
                    }}>
                    {`${bodyItem.sn}.`}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          color: "black",
                        }}>
                        {bodyItem.heading}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        sx={{
                          color: "gray",
                        }}>
                        {bodyItem.text}
                      </Typography>
                    }
                  />
                </ListItem>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

const data: dataProps[] = [
  {
    sn: 1,
    heading: "Introduction",
    text: "TheAfrica Vision Info Technology Company Ltd is committed to protecting the privacy and security of your personal information. This privacy statement outlines our practices regarding the collection, use, and protection of personal information we receive from users of our services.",
  },
  {
    sn: 2,
    heading: "Information Collection",
    text: "We collect information from our users, including personal details such as names, contact information, and financial information, primarily to facilitate crowdfunding and fundraising activities. This information collection is integral to providing our services effectively and complying with our Anti-Money Laundering (AML) and Combating the Financing of Terrorism (CFT) policies.",
  },
  {
    sn: 3,
    heading: "Use of Information",
    text: "The information we collect is used to:",
    body: [
      {
        sn: "a",
        text: "Verify the identity of our users as part of our customer due diligence process.",
      },
      {
        sn: "b",
        text: "Facilitate the operation of crowdfunding and fundraising activities.",
      },
      {
        sn: "c",
        text: "Communicate with users about their accounts and our services.",
      },
      {
        sn: "d",
        text: "Improve our services and user experience.",
      },
      {
        sn: "e",
        text: "Comply with legal and regulatory requirements, including AML and CFT compliance.",
      },
    ],
  },
  {
    sn: 4,
    heading: "Information Sharing and Disclosure",
    text: "We do not sell or rent user information to third parties. However, information may be shared with:",
    body: [
      {
        sn: "a",
        text: "Regulatory authorities and law enforcement agencies, as required by law or in response to legal processes.",
      },
      {
        sn: "b",
        text: "Service providers and partners who assist in the operation of our platform and services, under confidentiality agreements.",
      },
      {
        sn: "c",
        text: "Parties involved in the prevention and detection of fraud, money laundering, and other financial crimes, in accordance with our AML/CFT policies.",
      },
    ],
  },
  {
    sn: 5,
    heading: "Data Security",
    text: "We implement appropriate technical and organizational measures to protect the personal information we collect and store. Despite our efforts, no security measures are completely impervious. We cannot guarantee the security of user information, but we strive to protect it to the best of our ability.",
  },
  {
    sn: 6,
    heading: "Data Retention",
    text: "Personal information is retained for as long as necessary to fulfill the purposes for which it was collected, comply with our legal obligations, resolve disputes, and enforce our agreements. In line with our AML/CFT policies, records are maintained for at least five (5) years after the end of the customer relationship or longer if required by law.",
  },
  {
    sn: 7,
    heading: "Your Rights",
    text: "You have the right to access, correct, or delete your personal information held by us. You may also have rights to object to certain processing activities or request limitations on the use of your personal information. Requests related to your rights can be directed to our contact details provided below.",
  },
  {
    sn: 8,
    heading: "Changes to This Privacy Statement",
    text: "We may update this privacy statement from time to time. We will notify users of any changes by posting the new privacy statement on our website. We encourage users to review this statement periodically for any updates.",
  },
  {
    sn: 9,
    heading: "Contact Us",
    text: "If you have any questions or concerns about this privacy statement or our privacy practices, please contact us at:",
    body: [
      {
        sn: "a",
        heading: "Email",
        text: "info@theafricavision.com",
      },
      {
        sn: "b",
        heading: "Address",
        text: "109 Alabi, Oyo, Bucknor, Lagos, Nigeria",
      },
      {
        sn: "c",
        heading: "Website",
        text: "www.theafricavision.com",
      },
    ],
  },
];
