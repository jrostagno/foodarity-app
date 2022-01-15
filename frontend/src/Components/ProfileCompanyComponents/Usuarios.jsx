import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import styles from './Usuarios.module.css';

const columns = [
  { id: 'lote', label: 'LOTE', minWidth: 170 },
  //   { id: 'empleado', label: 'Publicado', minWidth: 100 },
  {
    id: 'cantidad',
    label: 'CANTIDAD',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'precio',
    label: 'PRECIO PUBLICADO (ARS)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'fecha',
    label: 'FECHA PUBLICACION',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'empleado',
    label: 'Publicado por',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(lote, cantidad, precio, fecha, empleado) {
  // const density = population / size;
  return { lote, cantidad, precio, fecha, empleado };
}

const rows = [
  createData('Lote pre-pizzas', 2, 120, '12/06/2022', 'augusto'),
  createData('Lote facturas', '3', 400, '12/06/2022', 'augusto'),
  createData('Lote tortas', '1', 100, '12/06/2022', 'augusto'),
  createData('Lote panes', '4', 327, '12/06/2022', 'augusto'),
  createData('Lote pan Rayado', '4', 376, '12/06/2022', 'augusto'),
  createData(
    'Lote combo pasteleria/rotiseria',
    '6',
    2547,
    '12/06/2022',
    'augusto'
  ),
];

export default function Usuarios() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={styles.users} sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
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
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}