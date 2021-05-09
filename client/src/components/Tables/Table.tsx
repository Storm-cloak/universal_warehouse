import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Typography } from "@material-ui/core/";

interface Column {
  id:
    | "quantity"
    | "unit"
    | "unitPrice"
    | "currency"
    | "expDate"
    | "action"
    | "cellNum";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "quantity", label: "K-yyət", minWidth: 100, align: "center" },
  { id: "unit", label: "Ölçu vahidi", minWidth: 100, align: "center" },
  {
    id: "unitPrice",
    label: "Vahid qiyməti",
    minWidth: 100,
    align: "center",
  },
  {
    id: "currency",
    label: "Valyuta",
    minWidth: 100,
    align: "center",
  },
  {
    id: "expDate",
    label: "Yararlılıq müddəti",
    minWidth: 100,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "action",
    label: "Fəaliyyət",
    minWidth: 100,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "cellNum",
    label: "Hücrə",
    minWidth: 100,
    align: "center",
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "50vh",
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "rgb(16,33,81)", //dark blue
                  }}
                >
                  <Typography variant="h6" color="secondary">
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

//MOCK DATA
const rows = [
  {
    quantity: 200,
    unitPrice: 1500,
    unit: "Ədəd",
    currency: "AZN",
    expDate: "10.12.2022",
    action: "Medaxil",
    cellNum: "50",
  },
  {
    quantity: 200,
    unitPrice: 1500,
    unit: "Ədəd",
    currency: "AZN",
    expDate: "10.12.2022",
    action: "Medaxil",
    cellNum: "50",
  },
  {
    quantity: 200,
    unitPrice: 1500,
    unit: "Ədəd",
    currency: "AZN",
    expDate: "10.12.2022",
    action: "Medaxil",
    cellNum: "50",
  },
  {
    quantity: 200,
    unitPrice: 1500,
    unit: "Ədəd",
    currency: "AZN",
    expDate: "10.12.2022",
    action: "Medaxil",
    cellNum: "50",
  },
  {
    quantity: 200,
    unitPrice: 1500,
    unit: "Ədəd",
    currency: "AZN",
    expDate: "10.12.2022",
    action: "Medaxil",
    cellNum: "50",
  },
  {
    quantity: 200,
    unitPrice: 1500,
    unit: "Ədəd",
    currency: "AZN",
    expDate: "10.12.2022",
    action: "Medaxil",
    cellNum: "50",
  },
  {
    quantity: 200,
    unitPrice: 1500,
    unit: "Ədəd",
    currency: "AZN",
    expDate: "10.12.2022",
    action: "Medaxil",
    cellNum: "50",
  },
  {
    quantity: 200,
    unitPrice: 1500,
    unit: "Ədəd",
    currency: "AZN",
    expDate: "10.12.2022",
    action: "Medaxil",
    cellNum: "50",
  },
  {
    quantity: 200,
    unitPrice: 1500,
    unit: "Ədəd",
    currency: "AZN",
    expDate: "10.12.2022",
    action: "Medaxil",
    cellNum: "50",
  },
  {
    quantity: 200,
    unitPrice: 1500,
    unit: "Ədəd",
    currency: "AZN",
    expDate: "10.12.2022",
    action: "Medaxil",
    cellNum: "50",
  },
  {
    quantity: 200,
    unitPrice: 1500,
    unit: "Ədəd",
    currency: "AZN",
    expDate: "10.12.2022",
    action: "Medaxil",
    cellNum: "50",
  },
  {
    quantity: 200,
    unitPrice: 1500,
    unit: "Ədəd",
    currency: "AZN",
    expDate: "10.12.2022",
    action: "Medaxil",
    cellNum: "50",
  },
  {
    quantity: 200,
    unitPrice: 1500,
    unit: "Ədəd",
    currency: "AZN",
    expDate: "10.12.2022",
    action: "Medaxil",
    cellNum: "50",
  },
  {
    quantity: 200,
    unitPrice: 1500,
    unit: "Ədəd",
    currency: "AZN",
    expDate: "10.12.2022",
    action: "Medaxil",
    cellNum: "50",
  },
  {
    quantity: 200,
    unitPrice: 1500,
    unit: "Ədəd",
    currency: "AZN",
    expDate: "10.12.2022",
    action: "Medaxil",
    cellNum: "50",
  },
  {
    quantity: 200,
    unitPrice: 1500,
    unit: "Ədəd",
    currency: "AZN",
    expDate: "10.12.2022",
    action: "Medaxil",
    cellNum: "50",
  },
  {
    quantity: 200,
    unitPrice: 1500,
    unit: "Ədəd",
    currency: "AZN",
    expDate: "10.12.2022",
    action: "Medaxil",
    cellNum: "50",
  },
  {
    quantity: 200,
    unitPrice: 1500,
    unit: "Ədəd",
    currency: "AZN",
    expDate: "10.12.2022",
    action: "Medaxil",
    cellNum: "50",
  },
  {
    quantity: 200,
    unitPrice: 1500,
    unit: "Ədəd",
    currency: "AZN",
    expDate: "10.12.2022",
    action: "Medaxil",
    cellNum: "50",
  },
  {
    quantity: 200,
    unitPrice: 1500,
    unit: "Ədəd",
    currency: "AZN",
    expDate: "10.12.2022",
    action: "Medaxil",
    cellNum: "50",
  },
];
