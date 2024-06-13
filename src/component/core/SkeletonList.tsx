import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Skeleton,
} from "@mui/material";

type cardTypes = "type1" | "type2" | "type3";

type props = {
  itemcount: number;
  cardType?: cardTypes;
};

export default function SkeletonList(props: props) {
  const skeletons: any[] = Array(props.itemcount).fill("");

  const renderCard = () => {
    switch (props.cardType) {
      case "type1":
        return renderType1();
      case "type2":
        return renderType2();
      case "type3":
        return renderType3();
      default:
        return renderType1();
    }
  };

  const renderType1 = () => {
    return (
      <Box
        sx={{
          paddingBottom: "1rem",
        }}>
        <Grid container spacing={2}>
          {skeletons?.map((item, index) => (
            <Grid item lg={4} md={4} sm={6} xs={12} key={index}>
              <Card>
                <CardHeader
                  avatar={
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width={40}
                      height={40}
                    />
                  }
                  title={
                    <Skeleton
                      animation="wave"
                      height={10}
                      width="80%"
                      style={{ marginBottom: 6 }}
                    />
                  }
                  subheader={
                    <Skeleton animation="wave" height={10} width="40%" />
                  }
                />
                <Skeleton
                  sx={{ height: 190 }}
                  animation="wave"
                  variant="rectangular"
                />
                <CardContent>
                  <Skeleton
                    animation="wave"
                    height={10}
                    style={{ marginBottom: 6 }}
                  />
                  <Skeleton animation="wave" height={10} width="80%" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const renderType2 = () => {
    return (
      <Box
        sx={{
          paddingBottom: "0.5rem",
        }}>
        <Grid container spacing={4}>
          {skeletons?.map((item, index) => (
            <Grid item lg={12} md={12} sm={12} xs={12} key={index}>
              <Skeleton
                sx={{ height: "50px", borderRadius: "10px" }}
                animation="wave"
                variant="rectangular"
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const renderType3 = () => {
    return (
      <Box
        sx={{
          paddingBottom: "1rem",
        }}>
        <Card>
          <CardHeader
            avatar={
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            }
            title={
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            }
            subheader={<Skeleton animation="wave" height={10} width="40%" />}
          />
          <Skeleton
            sx={{ height: 190 }}
            animation="wave"
            variant="rectangular"
          />
          <CardContent>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </CardContent>
        </Card>
      </Box>
    );
  };

  const renderContent = () => {
    return renderCard();
  };

  return renderContent();
}
