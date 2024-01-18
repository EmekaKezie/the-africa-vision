import { IStory } from "@/types/IStory";
import { Box, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type props = {
  startAt?: number;
  stopAt?: number;
  data: IStory[];
};

export default function StoryImages(props: props) {
  const [data, setData] = useState<IStory[]>([]);

  useEffect(() => {
    if (props?.data) setData(props?.data);
  }, [props]);

  const offset: number = !props.startAt ? 0 : props.startAt;
  const limit: number = !props.stopAt ? data.length : props.stopAt;

  const renderContent = () => {
    return (
      <Box
        sx={{
          paddingBottom: "1rem",
        }}>
        {/* <ImageList variant="quilted" cols={8} rowHeight={120}>
          {data?.slice(offset, limit)?.map((item) => (
            <ImageListItem
              key={item.id}
              cols={!item.image.col ? 2 : item.image.col}
              rows={!item.image.row ? 2 : item.image.row}>
              <img
                srcSet={`${item.image.src.src}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={<Link href={item.url!}>{item.title}</Link>}
              />
            </ImageListItem>
          ))}
        </ImageList> */}
      </Box>
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
