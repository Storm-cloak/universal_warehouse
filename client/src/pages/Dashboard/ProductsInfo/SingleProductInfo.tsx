import React from "react";
import { Typography, Grid, Box, Button } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import OverallInfoCard from "../../../components/Cards/OverallInfoCard";
import StickyHeadTable from "../../../components/Tables/Table";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import CarouselComponent from "../../../components/Carousel/Carousel";

//======================================================================================\\
//                                 STYLES                                               \\
//======================================================================================\\

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      backgroundColor: "#E5E5E5",
    },
    topPart: {
      margin: "20px auto",
    },
    bottomPart: {
      margin: "20px auto",
    },
    productImage: {
      float: "left",
      "& img": {
        height: 100,
        border: "1px solid rgba(128,128,128, 0.5)",
      },
    },
    KostilGrid: {
      display: "grid",
      gridTemplateColumns: "auto 40px",
      border: "1px solid rgba(128,128,128, 0.5)",
    },
  })
);

//======================================================================================\\
//                                 ROUTES AND INFO                                      \\
//======================================================================================\\

const bottomCarouselCards = [
  "Məhsulun kodu",
  "Ümumi daxil olunan miqdar",
  "Ümumi satılan miqdar",
  "Yararlılıq müddəti",
  "Orta alış qiyməti",
  "Orta satış qiyməti",
  "Qalıq",
  "Hücrə nömrəsi",
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

//======================================================================================\\
//                                 INTERFACES                                           \\
//======================================================================================\\
interface IProps {
  productId: number;
  handleClick: (id: number) => void;
}

//======================================================================================\\
//                                 MAIN LOGIC OF PAGE                                   \\
//======================================================================================\\
const SingleProductInfo = ({ productId, handleClick }: IProps) => {
  const classes = useStyles();

  return (
    <Grid className={classes.container}>
      <Grid className={classes.topPart} item xs={11}>
        <IconButton color="inherit" aria-label="goBack">
          <ArrowBackRoundedIcon
            fontSize="large"
            onClick={() => handleClick(0)}
          ></ArrowBackRoundedIcon>
        </IconButton>
        <Typography gutterBottom variant="h5">
          Lenovo-ideapad-330
        </Typography>
        <Box className={classes.productImage}>
          <img src="https://cdn.megamart.az/products/72781-128552-thickbox.jpg"></img>
        </Box>
        <div className={classes.KostilGrid}>
          <CarouselComponent>
            {bottomCarouselCards.map((name, index) => (
              <OverallInfoCard
                key={index}
                name={name}
                info="2141"
                currency=""
              />
            ))}
          </CarouselComponent>
        </div>
      </Grid>
      <Grid className={classes.bottomPart} item xs={11}>
        <StickyHeadTable />
      </Grid>
    </Grid>
  );
};

export default SingleProductInfo;
