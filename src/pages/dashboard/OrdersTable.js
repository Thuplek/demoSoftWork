import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third-party
// import NumberFormat from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';

// function createData(trackingNo, name, fat, carbs, protein) {
//   return { trackingNo, name, fat, carbs, protein };
// }

// const rows = [
//   createData(84564564, 'Camera Lens', 40, 2, 40570),
//   createData(98764564, 'Laptop', 300, 0, 180139),
//   createData(98756325, 'Mobile', 355, 1, 90989),
//   createData(98652366, 'Handset', 50, 1, 10239),
//   createData(13286564, 'Computer Accessories', 100, 1, 83348),
//   createData(86739658, 'TV', 99, 0, 410780),
//   createData(13256498, 'Keyboard', 125, 2, 70999),
//   createData(98753263, 'Mouse', 89, 2, 10570),
//   createData(98753275, 'Desktop', 185, 1, 98063),
//   createData(98753291, 'Chair', 100, 0, 14001)
// ];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //
/* 
 {
    "status": "Em Preparação",
    "data": "2023-01-06",
    "cliente": "João",
    "nrProposta": 1,
    "elaborador": "Maria",
    "conceito": "Conceito 1",
    "assunto": "Assunto 1",
    "executivo": "Executivo 1",
    "equipe": "Equipe 1"
  },
*/
const headCells = [
  {
    id: 'executivo',
    align: 'center',
    disablePadding: false,
    label: 'Executivo'
  },
  {
    id: 'nrProposta',
    align: 'center',
    disablePadding: true,
    label: 'Proposta'
  },
  {
    id: 'data',
    align: 'center',
    disablePadding: false,
    label: 'Dt. elaboração'
  },
  {
    id: 'elaborador',
    align: 'center',
    disablePadding: false,

    label: 'Elaborador'
  },
  {
    id: 'cliente',
    align: 'center',
    disablePadding: false,
    label: 'Cliente'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy, setOrderBy, setOrder }) {
  const ordenar = (campo) => {
    setOrderBy(campo);
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            onClick={() => ordenar(headCell.id)}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 1:
      color = 'success';
      title = 'Approved';
      break;
    case 2:
      color = 'error';
      title = 'Rejected';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

OrderStatus.propTypes = {
  status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable({ dados }) {
  const [order, setOrder] = useState('asc');
  console.log('🚀 ~ file: OrdersTable.js:177 ~ OrderTable ~ order:', order);
  const [orderBy, setOrderBy] = useState('nrProposta');
  const [selected] = useState([]);

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            }
          }}
        >
          <OrderTableHead order={order} orderBy={orderBy} setOrderBy={setOrderBy} setOrder={setOrder} />
          <TableBody>
            {stableSort(dados, getComparator(order, orderBy)).map((row, index) => {
              const isItemSelected = isSelected(row.trackingNo);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.trackingNo}
                  selected={isItemSelected}
                >
                  <TableCell component="th" id={labelId} scope="row" align="center">
                    {row.executivo}
                  </TableCell>
                  <TableCell align="center">{row.nrProposta}</TableCell>
                  <TableCell align="center">{row.data}</TableCell>

                  <TableCell align="center">{row.elaborador}</TableCell>
                  <TableCell align="center">{row.cliente}</TableCell>
                  {/* <TableCell align="right">
                    <NumberFormat value={row.protein} displayType="text" thousandSeparator prefix="$" />
                  </TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
