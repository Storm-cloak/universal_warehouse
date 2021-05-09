import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { IconButton, Box } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonGroups: {
      background: theme.palette.secondary.main,
      borderLeft: "1px solid rgba(128,128,128, 0.5)",
      "& div:first-child": {
        borderBottom: "1px solid rgba(128,128,128, 0.5)",
      },
      "& > div": {
        height: "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    carouselDefault: {
      "& li": {
        width: 250,
      },
    },
  })
);

interface IProps {
  children: React.ReactNode;
}

const CarouselComponent = (props: IProps) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
      // paritialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
      // paritialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
      // paritialVisibilityGutter: 30,
    },
  };
  const classes = useStyles();
  const CustomButtonGroupAsArrows = ({ next, previous }: any) => {
    return (
      <Box className={classes.buttonGroups}>
        <Box>
          <IconButton onClick={previous}>
            <ArrowBackIosIcon color="primary" fontSize="small" />
          </IconButton>
        </Box>
        <Box>
          <IconButton onClick={next}>
            <ArrowForwardIosIcon color="primary" fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    );
  };
  return (
    <Carousel
      containerClass="carousel-container"
      itemClass="carousel-item"
      className={classes.carouselDefault}
      responsive={responsive}
      autoPlaySpeed={700}
      keyBoardControl={true}
      transitionDuration={500}
      removeArrowOnDeviceType={["tablet", "mobile"]}
      customButtonGroup={<CustomButtonGroupAsArrows />}
      renderButtonGroupOutside
      arrows={false}
    >
      {props.children}
    </Carousel>
  );
};

export default CarouselComponent;
