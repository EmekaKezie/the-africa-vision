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
  sn?: string;
  heading?: string | ReactNode;
  text?: string | ReactNode;
  body?: dataBodyProps[];
};

export default function PgAntiMoneyLaundry() {
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
        Anti-Money Laundering Policy and Procedure
      </Typography>
      <Typography sx={{ color: "gray", textAlign: "center" }}>
        TheAfrica Vision Info Technology Company Ltd. | RC No. 7240911
      </Typography>
      <Typography sx={{ color: "gray", textAlign: "center" }}>
        Last Updated: 30th April 2024
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
              <Box key={bodyItem?.sn}>
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
                    {`${bodyItem?.sn}.`}
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
    sn: "1",
    heading: "Introduction",
    text: (
      <Box>
        <Typography color="gray">
          {`TheAfrica Vision Info Technology Company Ltd (hereafter referred to as
          "TheAfrica Vision") recognizes the importance of preventing money
          laundering and terrorism financing. We are committed to the highest
          standards of Anti-Money Laundering (AML) and Combating the Financing
          of Terrorism (CFT) in line with global and local regulatory
          requirements.`}
        </Typography>
        <br />
        <Typography color="gray">
          {`As a digital platform specializing in crowdfunding and fundraising activities aimed at supporting 
          various projects and causes across Africa, TheAfrica Vision operates in compliance with 
          applicable legislation designed to prevent Money Laundering. This includes, but is not limited 
          to, the Terrorism Prevention Act 2013, the Money Laundering Prohibition Act 2011 (as 
          amended), and other relevant legislations. `}
        </Typography>
        <br />
        <Typography color="gray">
          {`To fulfill this commitment, TheAfrica Vision has established comprehensive internal policies 
            and procedures. These standards are designed to ensure that all employees, contractors, 
            creators, backers, and business partners observe and adhere to these regulations.  `}
        </Typography>
      </Box>
    ),
  },
  {
    sn: "2",
    heading: "Scope",
    text: `Money Laundering and Terrorism Financing pose significant risks within the digital crowdfunding 
    and fundraising sector. TheAfrica Vision's policy covers all activities and transactions facilitated 
    through our platform that could potentially`,
  },
  {
    sn: "3",
    heading: "Our Policy",
    body: [
      {
        sn: "a",
        heading: "Customer Due Diligence ",
        text: (
          <Box>
            <Typography>
              {`TheAfrica Vision will implement rigorous customer due diligence processes to identify and verify 
                  the identities of our users, both creators and backers. This will be done through: `}
            </Typography>
            <br />
            <ListItem>
              <ListItemText
                secondary={`• Documentation provided by the customer for verification. `}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                secondary={`• Independent and reliable sources to corroborate the information provided;`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                secondary={`• Adherence to TheAfrica Vision's business codes and ethical standards. `}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                secondary={`• Any unusual or suspicious activity identified during the due diligence process must be 
                  reported immediately to TheAfrica Vision's designated Chief Compliance Officer. `}
              />
            </ListItem>
          </Box>
        ),
      },
      {
        sn: "b",
        heading: "Risk-Based Approach ",
        text: `Given the diverse nature of crowdfunding projects and the geographical spread of our users, 
        TheAfrica Vision will employ a risk-based approach to assess and manage the risk of money 
        laundering and terrorist financing. Users will be classified based on risk levels, with specific 
        controls implemented to mitigate identified risks.`,
      },
      {
        sn: "c",
        heading: `High Risk Customers `,
        text: (
          <Box>
            <Typography>
              {`TheAfrica Vision will not engage with customers who:`}
            </Typography>
            <br />
            <ListItem>
              <ListItemText
                secondary={`• Are on any official sanction lists; 
                `}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                secondary={`• Show potential signs of involvement in criminal activities based on available 
                information; `}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                secondary={`• Conduct business in areas where the legitimacy of funds cannot be verified;  `}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                secondary={`• Refuse to provide necessary information or documentation; `}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                secondary={`• Have an opaque or undetermined ownership structure. `}
              />
            </ListItem>
          </Box>
        ),
      },
      {
        sn: "d",
        heading: "Record Keeping  ",
        text: `All customer documentation, whether submitted in physical or electronic form, will be securely 
        stored. Records will be maintained for at least five (5) years after the end of the customer 
        relationship, or longer if required by law. `,
      },
      {
        sn: "e",
        heading: `An AMLO will be designated and will be responsible for overseeing all aspects of TheAfrica 
        Vision's AML/CFT efforts. This includes reporting suspicions to authorities, training employees, 
        and maintaining robust AML processes.`,
      },
    ],
  },
  {
    sn: "4",
    heading: "Reporting Suspicious Activity",
    text: (
      <Box>
        {`It is the duty of all employees, contractors, creators, and backers to
        report any suspicious activities to TheAfrica Vision's AMLO immediately.
        Reports should be sent to`}{" "}
        <Link href="#" style={{ color: "blue" }}>
          info@theafricavision.com
        </Link>{" "}
        {` and reports should include as much detail as possible to facilitate
        proper assessment and action.`}
      </Box>
    ),
  },
  {
    sn: "5",
    heading: "Training",
    text: `All relevant personnel must undergo annual compliance training, with additional targeted 
    training provided to those directly involved in managing or overseeing crowdfunding and 
    fundraising activities. `,
  },
  {
    sn: "6",
    heading: "Policy Review and Audits",
    text: `TheAfrica Vision will regularly review and audit its AML/CFT policies and procedures to ensure 
    they remain effective and compliant with evolving regulations and best practices.`,
  },
  {
    sn: "7",
    heading: "Conclusion",
    text: `TheAfrica Vision Info Technology Company Ltd is dedicated to maintaining a secure and 
    compliant platform for all users. By adhering to these policies and procedures, we contribute to 
    the global fight against money laundering and terrorism financing, ensuring a safer environment 
    for crowdfunding and fundraising activities across Africa.`,
  },
];
