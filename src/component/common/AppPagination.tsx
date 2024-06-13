import { Pagination } from "@mui/material";

type props = {
  total: number;
  pageNumber: number;
  pageSize: number;
  onChange: (e: any, pageNumber: number) => void;
};

export default function AppPagination(props: props) {
  return (
    <Pagination
      count={Math.ceil(props.total / props.pageSize)}
      onChange={props.onChange}
      page={props.pageNumber}
    />
  );
}
