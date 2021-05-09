import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Card, CardContent, Typography, CardMedia } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      borderRight: "1px solid rgba(128,128,128, 0.5)",
      "& span": {
        color: "black",
      },
    },
    media: {
      height: 96,
      width: 120,
      margin: theme.spacing(1, 2),
    },
  })
);

interface IProps {
  image?: string;
  productName: string;
  date: string;
  unitPrice: number;
  totalPrice: number;
  quantity: number;
  currency: string;
}

export default function RecentlyAddedCard({
  image,
  productName,
  date,
  unitPrice,
  totalPrice,
  quantity,
  currency,
}: IProps) {
  const classes = useStyles();

  return (
    <Card elevation={0} square className={classes.root}>
      <CardContent>
        <CardMedia
          className={classes.media}
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqnVdC0g-M-4D5pAj8OTzkqYs4Mx_qok1lQA&usqp=CAU"
          title={productName}
        />
        <Typography variant="h5" component="p">
          {productName}
          <br />
        </Typography>
        <Typography
          gutterBottom
          color="textSecondary"
          variant="body1"
          component="p"
        >
          Tarix: <span>{date}</span>
          <br />
        </Typography>
        <Typography
          gutterBottom
          color="textSecondary"
          variant="body1"
          component="p"
        >
          Vahid qiymət:{" "}
          <span>
            {unitPrice} {currency}
          </span>
          <br />
        </Typography>
        <Typography
          gutterBottom
          color="textSecondary"
          variant="body1"
          component="p"
        >
          Miqdar: <span>{quantity}</span>
          <br />
        </Typography>
        <Typography
          gutterBottom
          color="textSecondary"
          variant="body1"
          component="p"
        >
          Ümumi qiymət:
          <span>
            {totalPrice} {currency}
          </span>
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}
