import { ICategory } from "@/types/ICategory";
import { Box, Chip, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";

type props = {
  data: ICategory[];
  onSelected?: (categoryIds: string[]) => void;
};

export default function StoryCategories(props: props) {
  const classes = useStyles();
  const [data, setData] = useState<ICategory[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    if (props?.data) setData(props?.data);
  }, [props]);

  useEffect(() => {
    if (!selectedIds.length) setSelectedIds(["all"]);
    if (props?.onSelected) props.onSelected(selectedIds);
  }, [selectedIds, props]);

  const handleSelect = (id: string) => {
    const index = selectedIds.indexOf("all");
    if (index !== -1) {
      selectedIds.splice(index, 1);
    }

    if (!selectedIds.includes(id)) {
      setSelectedIds((prevIds) => [...prevIds, id]);
    } else {
      const index = selectedIds.indexOf(id);

      if (index !== -1) {
        const newIds = [...selectedIds];
        newIds.splice(index, 1);
        setSelectedIds(newIds);
      }
    }
  };

  const isActive = (categoryId: string): boolean => {
    const active = selectedIds.find((x) => x === categoryId);
    if (active === categoryId) {
      return true;
    } else {
      return false;
    }
  };

  const renderContent = () => {
    return (
      <Stack direction="row" spacing={1}>
        <Chip
          key="all"
          label="All"
          onClick={() => handleSelect("all")}
          className={classes.main}
          disabled={!isActive("all")}
          style={{
            color: isActive("all") ? "#FFFFFF" : "#A9518B",
            background: isActive("all") ? "#A9518B" : "#FFFFFF",
          }}
        />
        {data.map((item: ICategory) => (
          <Chip
            key={item.id}
            label={item.name}
            onClick={() => handleSelect(item.id)}
            className={classes.main}
            style={{
              color: isActive(item.id) ? "#FFFFFF" : "#A9518B",
              background: isActive(item.id) ? "#A9518B" : "#FFFFFF",
            }}
          />
        ))}
      </Stack>
    );
  };

  return (
    <Box
      sx={{
        padding: "1rem 0",
      }}>
      {renderContent()}
    </Box>
  );
}

const useStyles = makeStyles(() => ({
  main: {
    border: "1px solid #A9518B",
    fontSize: "0.9em",
    "&:hover": {
      opacity: 0.8,
    },
  },
}));
