import { IStory } from "@/types/IStory";
import {
  Delete,
  Edit,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { convertToCurrency, convertToReadableDate, convertToReadableTime, formatNumberWithSuffix } from "../common/helpers";
import MUIDataTable from "mui-datatables";
import PurpleButton from "../common/PurpleButton";

type variationTypes = "swipeable" | "grid" | "pinned" | "tabular";

type props = {
  variation: variationTypes;
  swipeButtons?: boolean;
  startAt?: number;
  stopAt?: number;
  data: IStory[];
};

export default function StoryCampaign(props: props) {
  const [data, setData] = useState<IStory[]>([]);

  useEffect(() => {
    if (props?.data) setData(props?.data);
  }, [props]);

  const offset: number = !props.startAt ? 0 : props.startAt;
  const limit: number = !props.stopAt ? data.length : props.stopAt;

  const renderCard = (item: IStory) => {
    return (
      <Card elevation={1}>
        <CardMedia component="img" height="150px" image={item.image.src.src} />
        <CardContent>
          <Typography
            sx={{
              color: "#A9518B",
              fontWeight: "bold",
              letterSpacing: "-1px",
            }}>
            {item.categoryName}
          </Typography>
          <br />
          <Typography
            component="div"
            variant="body1"
            sx={{
              color: "#0F111D",
              fontSize: "1.1em",
              fontWeight: "bold",
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
            }}>
            {item.title}
          </Typography>
          <br />
          <Typography
            component="div"
            variant="body2"
            sx={{
              color: "#7B7D8C",
              fontSize: "0.9em",
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
            }}>
            {item.content}
          </Typography>
          <br />
          <Box>
            <Stack direction="row" marginBottom="0.3rem">
              <Typography
                component="div"
                sx={{
                  justifyContent: "start",
                  flexGrow: 1,
                  fontSize: "0.7em",
                }}>
                Donation
              </Typography>
              <Typography
                component="div"
                sx={{
                  justifyContent: "end",
                  fontSize: "0.7em",
                }}>
                {!item?.analytics?.percentage ? 0 : item?.analytics?.percentage}
                %
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={
                !item?.analytics?.percentage ? 0 : item?.analytics?.percentage
              }
              sx={{
                padding: "0.2rem",
                borderRadius: "5px",
                backgroundColor: "#C7E7DF",
                "&>.MuiLinearProgress-bar": {
                  background: "#A9518B",
                },
              }}
            />
            <Stack direction="row" marginTop="0.3rem">
              <Typography
                component="div"
                sx={{
                  justifyContent: "start",
                  flexGrow: 1,
                  fontSize: "0.7em",
                }}>
                Raised: {item.analytics?.currency}
                {formatNumberWithSuffix(
                  !item?.analytics?.attanied ? 0 : item?.analytics?.attanied
                )}
              </Typography>
              <Typography
                component="div"
                sx={{
                  justifyContent: "end",
                  fontSize: "0.7em",
                }}>
                Goal: {item.analytics?.currency}
                {formatNumberWithSuffix(
                  !item?.analytics?.goal ? 0 : item?.analytics?.goal
                )}
              </Typography>
            </Stack>
          </Box>
        </CardContent>
        <CardActions sx={{ padding: "1rem" }}>
          <Link href={item?.url!}>
            <PurpleButton
              text="Donate"
              size="small"
              style={{ width: "150px" }}
              shade="white"
            />
          </Link>
        </CardActions>
      </Card>
    );
  };

  const renderSwipeableVariation = () => {
    return (
      <Box>
        {props.swipeButtons && (
          <Stack direction="row" spacing={1} justifyContent="end">
            <IconButton sx={{ backgroundColor: "#FFE1F5" }}>
              <KeyboardArrowLeft />
            </IconButton>
            <span style={{ marginLeft: "10px" }}></span>
            <IconButton sx={{ backgroundColor: "#FFE1F5" }}>
              <KeyboardArrowRight />
            </IconButton>
          </Stack>
        )}
        <br />
        <Box
          sx={{
            overflowX: "auto",
            display: "flex",
            gap: { xs: 2, md: 5 },
            padding: "0.1rem",
            "&::-webkit-scrollbar": {
              backgroundColor: "transparent",
            },
          }}>
          {data?.slice(offset, limit)?.map((item: IStory) => (
            <Box
              key={item.id}
              sx={{
                minWidth: "280px",
                minHeight: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              {renderCard(item)}
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  const renderGridVariation = () => {
    return (
      <Box
        sx={{
          paddingBottom: "1rem",
        }}>
        <Grid container spacing={7}>
          {data?.slice(offset, limit)?.map((item: IStory) => (
            <Grid item lg={4} md={4} sm={6} xs={12} key={item.id}>
              <Box>{renderCard(item)}</Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const renderPinnedVariation = () => {
    return <Box>Pinned Variation {"->"} Work in Progress</Box>;
  };

  const renderTabularVariation = () => {
    const flattenedData = (data: IStory[]): any => {
      return data?.map((item: IStory) => ({
        title: item.title,
        location: item.location,
        amount: item.analytics?.goal,
        date: item.startDate,
      }));
    };

    const columns = [
      {
        name: "title",
        options: {
          customHeadLabelRender: (i: any) => {
            return (
              <Typography
                sx={{
                  textTransform: "capitalize",
                  color: "#898989",
                  fontSize: "0.9em",
                  fontWeight: "bold",
                }}>
                Project Name
              </Typography>
            );
          },
          customBodyRenderLite: (index: number) => {
            return (
              <Typography
                sx={{
                  color: "#101828",
                  fontSize: "0.95em",
                }}>
                {data[index].title}
              </Typography>
            );
          },
        },
      },
      {
        name: "location",
        options: {
          customHeadLabelRender: (i: any) => {
            return (
              <Typography
                sx={{
                  textTransform: "capitalize",
                  color: "#898989",
                  fontSize: "0.9em",
                  fontWeight: "bold",
                }}>
                Location
              </Typography>
            );
          },
          customBodyRenderLite: (index: number) => {
            return (
              <Typography
                sx={{
                  color: "#667085",
                  fontSize: "0.95em",
                }}>
                {data[index].location}
              </Typography>
            );
          },
        },
      },
      {
        name: "amount",
        options: {
          customHeadLabelRender: (i: any) => {
            return (
              <Typography
                sx={{
                  textTransform: "capitalize",
                  color: "#898989",
                  fontSize: "0.9em",
                  fontWeight: "bold",
                }}>
                Project Amount
              </Typography>
            );
          },
          customBodyRenderLite: (index: number) => {
            return (
              <Typography
                sx={{
                  color: "#101828",
                  fontSize: "0.95em",
                  fontWeight: "bold",
                }}>
                {data[index].analytics?.goal &&
                  convertToCurrency(
                    data[index].analytics?.goal!,
                    data[index].analytics?.currency!
                  )}
              </Typography>
            );
          },
        },
      },
      {
        name: "date",
        options: {
          customHeadLabelRender: (i: any) => {
            return (
              <Typography
                sx={{
                  textTransform: "capitalize",
                  color: "#898989",
                  fontSize: "0.9em",
                  fontWeight: "bold",
                }}>
                Date
              </Typography>
            );
          },
          customBodyRenderLite: (index: number) => {
            return (
              <Typography
                sx={{
                  color: "#667085",
                  fontSize: "0.95em",
                }}>
                {convertToReadableDate(data[index].startDate!)}, {convertToReadableTime(data[index].startDate!)}
              </Typography>
            );
          },
        },
      },
      {
        name: "",
        options: {
          customBodyRenderLite: (index: number) => {
            return (
              <Stack direction="row" spacing={1}>
                <Tooltip title="Delete">
                  <IconButton size="small">
                    <Delete sx={{ fontSize: "1em" }} />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Edit">
                  <IconButton size="small">
                    <Edit sx={{ fontSize: "1em" }} />
                  </IconButton>
                </Tooltip>
              </Stack>
            );
          },
        },
      },
    ];

    return (
      <Box>
        <MUIDataTable
          title={
            <Box>
              <Typography
                sx={{
                  color: "#120F0F",
                  fontWeight: "bold",
                  fontSize: "1.1em",
                }}>
                Recent Campaign
              </Typography>
            </Box>
          }
          //data={data?.slice(offset, limit)}
          data={flattenedData(data?.slice(offset, limit))}
          columns={columns}
          options={{
            filter: "false",
            download: "true",
            downloadOptions: {
              filterOptions: {
                useDisplayedColumnsOnly: true,
                useDisplayedRowsOnly: true,
              },
            },
            print: "true",
            viewColumns: "false",
            elevation: 0,
            responsive: "standard",
            selectableRows: "none",
          }}
        />
      </Box>
    );
  };

  const renderContent = () => {
    switch (props.variation) {
      case "swipeable":
        return renderSwipeableVariation();
        break;
      case "grid":
        return renderGridVariation();
        break;
      case "pinned":
        return renderPinnedVariation();
        break;
      case "tabular":
        return renderTabularVariation();
        break;
      default:
        return renderGridVariation();
        break;
    }
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
