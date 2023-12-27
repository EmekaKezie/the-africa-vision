import { ITransaction } from "@/types/ITransaction";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";

type props = {
  startAt?: number;
  stopAt?: number;
  data: ITransaction[];
};

export default function Transactions(props: props) {
  const [data, setData] = useState<ITransaction[]>([]);

  const offset: number = !props.startAt ? 0 : props.startAt;
  const limit: number = !props.stopAt ? data.length : props.stopAt;

  useEffect(() => {
    if (props?.data) setData(props?.data);
    // eslint-disable-next-line
  }, [props]);


  const columns = [
    {
        name:"donorFullname",
        label:"Name",
    }
  ]

  return <Box>
    <MUIDataTable
    title="Transactions"
    data={data}
    columns={columns}
    />
  </Box>;
}
