import { useAppSelector } from "@/redux/useReduxHooks";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  ListItem,
  ListItemText,
} from "@mui/material";
import { IBankData } from "@/types/IBank";
import { ExpandMore } from "@mui/icons-material";

type props = {
  data: IBankData[];
  onRequestPayout: (item: IBankData) => void;
};

export default function PayoutBankAcounts(props: props) {
  const handleClick = (item: IBankData) => {
    if (props.onRequestPayout) props.onRequestPayout(item);
  };
  return (
    <Box>
      {props.data?.map((item: IBankData) => (
        <Accordion key={item.id} defaultExpanded={item.is_default}>
          <AccordionSummary
            expandIcon={
              <IconButton>
                <ExpandMore />
              </IconButton>
            }>
            {item.bank_name} - {item.account_number}
          </AccordionSummary>
          <AccordionDetails>
            <ListItem>
              <ListItemText
                primary={item.account_number}
                secondary={item.account_name}
              />
            </ListItem>
          </AccordionDetails>
          <AccordionActions>
            <Button
              sx={{
                textTransform: "none",
                color: "#A8518A",
              }}
              onClick={() => {
                handleClick(item);
              }}>
              Request Payout
            </Button>
          </AccordionActions>
        </Accordion>
      ))}
    </Box>
  );
}
