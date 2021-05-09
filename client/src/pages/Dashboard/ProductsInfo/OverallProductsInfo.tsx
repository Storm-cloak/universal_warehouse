//======================================================================================\\
//                                 IMPORTS                                              \\
//======================================================================================\\
import { Typography, Grid, Button } from "@material-ui/core";
import RecentlyAddedCard from "../../../components/Cards/RecentlyAddedCard";
import OverallInfoCard from "../../../components/Cards/OverallInfoCard";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import PieChart from "../../../components/Charts/PieChart";
import CarouselComponent from "../../../components/Carousel/Carousel";
import { Link } from "react-router-dom";

//======================================================================================\\
//                                 STYLES                                               \\
//======================================================================================\\
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      backgroundColor: "#E5E5E5",
      height: "calc(100vh - 40px)",
      overflowY: "auto",
      "& > div": {
        margin: "1.5rem auto",
      },
      "& a": {
        marginRight: "1rem",
      },
    },
    KostilGrid: {
      display: "grid",
      gridTemplateColumns: "auto 40px",
      border: "1px solid rgba(128,128,128, 0.5)",
    },
    pieCharts: {
      background: "#FFFFFF",
      borderLeft: "1px solid rgba(128,128,128, 0.5)",
      borderBottom: "1px solid rgba(128,128,128, 0.5)",
      borderRight: "1px solid rgba(128,128,128, 0.5)",
      "& canvas": {
        margin: "0 auto",
      },
    },
  })
);

//======================================================================================\\
//                                 ROUTES AND INFO                                      \\
//======================================================================================\\
const bottomCarouselCards = [
  "Məhsulların qalan hissəsi",
  "Anbarın ümumi dəyəri",
  "Katerogiya sayı",
  "Anbarın ümumi satışları",
  "Ümumi mayə dəyəri",
  "Nisyə verilib",
];

const fastTransitionPageButtons = [
  { name: "Mədaxil", pageURL: "/warehouseincome" },
  { name: "Məxaric", pageURL: "/" },
  { name: "Transfer", pageURL: "/" },
  { name: "Silinmə", pageURL: "/" },
  { name: "Inventarizasiya", pageURL: "/" },
  { name: "Musteriler", pageURL: "/" },
  { name: "Anbarlar", pageURL: "/" },
];

//======================================================================================\\
//                                 MAIN LOGIC OF PAGE                                   \\
//======================================================================================\\
const OverallProductsInfo = () => {
  const classes = useStyles();
  return (
    <Grid className={classes.container}>
      <Grid item xs={11}>
        <Typography gutterBottom variant="h5">
          Tez keçidlər
        </Typography>
        {fastTransitionPageButtons.map((button, index) => (
          <Button
            key={index}
            component={Link}
            to={button.pageURL}
            size="large"
            variant="contained"
            color="primary"
          >
            {button.name}
          </Button>
        ))}
      </Grid>
      <Grid item xs={11}>
        <Typography gutterBottom variant="h5">
          Recently added
        </Typography>
        <div className={classes.KostilGrid}>
          <CarouselComponent>
            <RecentlyAddedCard
              date="20.03.2020"
              productName="Cisco corporate phoneasd CS-211"
              unitPrice={50}
              totalPrice={2000}
              quantity={400}
              currency="AZN"
            />
            <RecentlyAddedCard
              date="20.03.2020"
              productName="Cisco corporate phoneasdasd CS-211"
              unitPrice={50}
              totalPrice={2000}
              quantity={400}
              currency="AZN"
            />
            <RecentlyAddedCard
              date="20.03.2020"
              productName="Cisco corporate phone CS-211"
              unitPrice={50}
              totalPrice={2000}
              quantity={400}
              currency="AZN"
            />
            <RecentlyAddedCard
              date="20.03.2020"
              productName="Cisco corporate phone CS-211"
              unitPrice={50}
              totalPrice={2000}
              quantity={400}
              currency="AZN"
            />
            <RecentlyAddedCard
              date="20.03.2020"
              productName="Cisco corporate phone CS-211"
              unitPrice={50}
              totalPrice={2000}
              quantity={400}
              currency="AZN"
            />
          </CarouselComponent>
        </div>
      </Grid>
      <Grid item xs={11}>
        <Typography gutterBottom variant="h5">
          Statistika
        </Typography>
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
        <Grid container direction="row" className={classes.pieCharts}>
          <PieChart
            labels={["Köçürmə", "Nisyə"]}
            data={[60, 40]}
            color={["#254ECA", "rgb(16,33,81)"]}
          />
          <PieChart
            labels={["Köçürmə", "Nisyə", "Satilib"]}
            data={[60, 40, 20]}
            color={["#254ECA", "rgb(16,33,81)", "grey"]}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OverallProductsInfo;
