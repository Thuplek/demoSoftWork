import * as React from 'react';
import { DataGrid, ptBR } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const columns = [
  { field: 'executivo', headerName: 'Executivo', flex: 1 },
  { field: 'nrProposta', headerName: 'Proposta', type: 'number', flex: 1 },
  { field: 'conceito', headerName: 'Conceito', flex: 1 },
  { field: 'equipe', headerName: 'Equipe', flex: 1 },
  { field: 'status', headerName: 'Status', flex: 1 },
  { field: 'assunto', headerName: 'Assunto', flex: 1 },
  {
    field: 'data',
    headerName: 'Dt. elaboração',
    type: 'date',
    valueGetter: (params) => new Date(params.row.data),
    flex: 1
  },
  {
    field: 'elaborador',
    headerName: 'Elaborador',
    flex: 1
  },
  {
    field: 'cliente',
    headerName: 'Cliente',
    // description: 'This column has a value getter and is not sortable.',
    flex: 1
  }
];

const filterData = (params, dados = []) => {
  console.log('🚀 ~ file: index.js:40 ~ filterData ~ params, dados:', params, dados);
  const { field, value } = params;
  return dados.filter((item) => item[field] === value);
};

const handleEvent = (params, event, details, { dados, setContentDialog, pageSize = 10 }) => {
  const data = filterData(params, dados);
  const { field, value } = params;

  setContentDialog({
    open: true,
    title: `Propostas com ${field} = ${value} `,
    content: (
      <DataGrid
        // onCellDoubleClick={cellDoubleClick}
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        rows={data}
        columns={columns.filter((item) => item.field !== field)}
        getRowId={(row) => row.nrProposta}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize }
          }
        }}
        pageSizeOptions={[5, 10]}
      />
    )
  });
};

export default function DataTable({ dados, pageSize = 5, cellDoubleClick }) {
  const [contentDialog, setContentDialog] = React.useState({ open: false, title: '', content: '' });
  const event = (params, event, details) => handleEvent(params, event, details, { dados, setContentDialog });
  let doubleClick = cellDoubleClick || event;

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        onCellDoubleClick={doubleClick}
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        rows={dados}
        columns={columns}
        getRowId={(row) => row.nrProposta}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize }
          }
        }}
        pageSizeOptions={[5, 10]}
      />
      <Dialog
        open={contentDialog?.open}
        keepMounted
        fullWidth
        onClose={() => setContentDialog({ open: false, title: '', content: '' })}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{contentDialog?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">{contentDialog?.content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setContentDialog({ open: false, title: '', content: '' })}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
