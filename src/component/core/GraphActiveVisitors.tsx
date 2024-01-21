import { IGraphActiveVisitors } from "@/types/IGraph";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { Bar, ComposedChart, ResponsiveContainer, Tooltip } from "recharts";

type props = {
  height?: number;
  color?: string;
  data: IGraphActiveVisitors;
};

export default function GraphActiveVisitors(props: props) {
  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Box flexGrow={1} padding="0.5rem 1rem 0 1rem">
          <Typography
            sx={{
              flexGrow: 1,
              color: "#667085",
              fontSize: "0.8em",
            }}>
            Active Visitors
          </Typography>
          <Typography
            sx={{
              flexGrow: 1,
              color: "#333843",
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}>
            {props.data.totalVisitors.toLocaleString("en-US")}
          </Typography>
        </Box>
        <Box display="flex">
          {props.data.isIncrease ? (
            <ArrowUpward sx={{ color: "#0FAF62", fontSize: "0.9em" }} />
          ) : (
            <ArrowDownward sx={{ color: "#E84646", fontSize: "0.9em" }} />
          )}

          <Typography
            sx={{
              color: props.data.isIncrease ? "#0FAF62" : "#E84646",
              fontSize: "0.7em",
            }}>
            {props.data.percentage}%{" "}
            {props.data.isIncrease ? "Increase" : "Decrease "}
          </Typography>
        </Box>
      </Box>
      <br />
      <Box sx={{ width: "100%", height: props.height ?? 150 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={props.data.analytics}>
            {/* <XAxis dataKey="name" /> */}
            <Tooltip />
            {/* <Bar dataKey={"count"} barSize={20} fill={props.color} /> */}
            <Bar
              dataKey={"count"}
              barSize={20}
              fill={props.color}
              shape={<rect rx={5} ry={5} width={10}/>}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
