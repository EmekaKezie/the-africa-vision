import { IGraphRevenueOutflow } from "@/types/IGraph";
import { MoreVert } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type props = {
  data: IGraphRevenueOutflow[];
};

export default function GraphRevenueOutflow(props: props) {
  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Box flexGrow={1} padding="0.5rem 1rem 0 1rem">
          <Typography
            sx={{
              flexGrow: 1,
              color: "#333843",
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}>
            Statistics
          </Typography>
          <Typography
            sx={{
              flexGrow: 1,
              color: "#667085",
              fontSize: "0.8em",
            }}>
            Revenue and Outflow
          </Typography>
        </Box>
        <Box>
          <IconButton>
            <MoreVert />
          </IconButton>
        </Box>
      </Box>
      <br />
      <Box sx={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={props.data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5C59E8" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#5C59E8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOutflow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E46A11" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#E46A11" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Area
              name="Revenue"
              type="monotone"
              dataKey="revenue"
              stroke="#5C59E8"
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              name="Outflow"
              type="monotone"
              dataKey="outflow"
              stroke="#E46A11"
              fillOpacity={1}
              fill="url(#colorOutflow)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
