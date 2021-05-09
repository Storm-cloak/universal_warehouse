import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Card, CardContent, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      borderRight: "1px solid rgba(128,128,128, 0.5)",
      "& span": {
        color: "black",
      },
    },
  })
);

interface IProps {
  image?: string;
  name: string;
  info: number | string;
  currency?: string;
}

export default function OverallInfoCard({
  name,
  info,
  currency,
  image,
}: IProps) {
  const classes = useStyles();

  return (
    <Card elevation={0} square className={classes.root}>
      <CardContent>
        <Typography color="textSecondary" variant="h6" component="p">
          {name}
          <br />
        </Typography>
        <Typography variant="h5" component="p">
          {info} {currency}
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}
