import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ICustomers } from "@/types";

// function createData(
//   fname: string,
//   lname: string,
//   phone_primary: string,
//   budget: number,
//   address: string
// ) {
//   return { fname, lname, phone_primary, budget, address };
// }

const BasicTable: React.FC<{ data: ICustomers[] }> = ({ data }) => {
  // const rows = [
  //   createData("John", "Doe", "+998 91 124 55 66", 5000, "New York. USA"),
  //   createData("John", "Doe", "+998 91 124 55 66", 5000, "New York. USA"),
  //   createData("John", "Doe", "+998 91 124 55 66", 5000, "New York. USA"),
  //   createData("John", "Doe", "+998 91 124 55 66", 5000, "New York. USA"),
  // ];
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>First name</TableCell>
              <TableCell align="right">Last name</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Budget</TableCell>
              <TableCell align="right">Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.slice(0, 5).map((row: ICustomers) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.fname}
                </TableCell>
                <TableCell align="right">{row.lname}</TableCell>
                <TableCell align="right">{row.phone_primary}</TableCell>
                <TableCell align="right">{row.budget}</TableCell>
                <TableCell align="right">{row.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BasicTable;
