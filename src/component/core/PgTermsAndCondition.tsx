import config from "@/config";
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
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

export default function PgTermsAndCondition() {
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
        Terms and Conditions
      </Typography>
      <br />
      {data?.map((item: dataProps) => (
        <Box key={item.sn}>
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
            {item.body?.map((bodyItem: dataBodyProps) => (
              <Box key={bodyItem.sn}>
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
    text: "Welcome to TheAfrica Vision Info Technology Company Ltd. These Terms and Conditions govern your use of our website and services related to crowdfunding and fundraising. By accessing, browsing, or using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms.",
  },
  {
    sn: 2,
    heading: "Services Description",
    text: "The Company specializes in providing digital platforms for crowdfunding and fundraising activities aimed at supporting various projects and causes across Africa. Our Services are designed to connect project creators with potential donors and investors to facilitate the collection of financial contributions.",
  },
  {
    sn: 3,
    heading: "User Obligations",
    body: [
      {
        sn: "a",
        heading: "Account Registration",
        text: "Users may be required to create an account to access certain features of our Services. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.",
      },
      {
        sn: "b",
        heading: "Compliance",
        text: "You agree to comply with all applicable laws and regulations in connection with your use of the Services, including but not limited to those related to fundraising, money laundering, and financial transactions.",
      },
      {
        sn: "c",
        heading: "Content Responsibility",
        text: "You are solely responsible for the content and information you post or share on or through the Services, including but not limited to descriptions of campaigns, projects, or events, and any photos, videos, or other materials.",
      },
    ],
  },
  {
    sn: 4,
    heading: "Prohibited Activities",
    text: "In using the Services, you shall not:",
    body: [
      {
        sn: "a",
        text: "Engage in any activities that are unlawful, fraudulent, misleading, or discriminatory.",
      },
      {
        sn: "b",
        text: "Offer or promote illegal or prohibited items.",
      },
      {
        sn: "c",
        text: "Infringe upon or violate the intellectual property rights of the Company or others.",
      },
      {
        sn: "d",
        text: "Harvest or collect information about users without their consent.",
      },
    ],
  },
  {
    sn: 5,
    heading: "Intellectual Property Rights",
    text: "All intellectual property rights in the Services, including the website design, text, graphics, content, and all software and source codes connected with the Services, are owned by or licensed to the Company. You may not copy, modify, distribute, sell, or lease any part of our Services or included software, nor may you reverse engineer or attempt to extract the source code of that software.",
  },
  {
    sn: 6,
    heading: "Donations and Transactions",
    body: [
      {
        sn: "a",
        heading: "Processing",
        text: "The Company facilitates the processing of donations to campaigns hosted on our platform. We are not responsible for the performance or fairness of any fundraising campaign.",
      },
      {
        sn: "b",
        heading: "Refunds",
        text: "Contributions made through the Services are at the discretion of the donor. The Company does not offer refunds for donations made via our platform unless explicitly stated in specific campaign terms.",
      },
    ],
  },
  {
    sn: 7,
    heading: "Limitation of Liability",
    text: "The Company shall not be liable for any indirect, special, incidental, consequential, or exemplary damages arising from your use of the Services or any interaction with any third party through the Services.",
  },
  {
    sn: 8,
    heading: "Indemnification",
    text: "You agree to indemnify, defend, and hold harmless the Company, its affiliates, officers, directors, employees, agents, and licensors from and against any claims, liabilities, damages, losses, and expenses, including without limitation, reasonable attorney’s fees and costs, arising out of or in any way connected with your access to or use of the Services, your violation of these Terms, or your violation of any rights of another.",
  },
  {
    sn: 9,
    heading: "Changes to Terms",
    text: "The Company reserves the right, at its sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Services after those revisions become effective, you agree to be bound by the revised terms.",
  },
  {
    sn: 10,
    heading: "Governing Law",
    text: "These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the Company is registered, without regard to its conflict of law provisions.",
  },
  {
    sn: 11,
    heading: "Contact Us",
    text: (
      <span>
        If you have any questions about these Terms, please contact us at{" "}
        <a href="#" style={{ color: "blue" }}>
          accounts@theafricavision.com
        </a>
      </span>
    ),
    body: [
      {
        sn: "a",
        text: config.baseContact.address,
      },
      {
        sn: "b",
        text: (
          <span>
            Welcome{" "}
            <Typography
              sx={{
                color: "#A9518B",
                display: "inline",
                "&:hover": { opacity: 0.8 },
              }}>
              <Link href="/">{config.baseContact.website}</Link>
            </Typography>
          </span>
        ),
      },
    ],
  },
];
