import React from 'react';

// material-ui
import { Grid, Typography } from '@mui/material';

// project import

import MainCard from 'components/MainCard';
import DonutChart from 'components/Graficos/Donut';
// assets

import mock from '../../utils/MOCK/Contrato/contratos.json';
import {
  contarTarefasPorStatus,
  filtrarPropostasDoUltimoMes,
  filtrarPropostasDosUltimos15Dias,
  filtrarPropostasDosUltimos3meses
} from './functions/graficos';
import DataTable from 'components/DataTable/index';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const [contentDialog, setContentDialog] = React.useState({ open: false, content: '', title: '' });

  const handleClickOpen = ({ content, title }) => {
    console.log('teste');
    setContentDialog({ content, title, open: true });
  };

  const handleClose = () => {
    setContentDialog({ open: false, content: '', title: '' });
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <MainCard>
          <Typography variant="h6" color="textSecondary">
            {'Status de propostas nos ultimos 15 dias'}
          </Typography>
          <DonutChart
            legendClick={(__context, item) => console.log(item)}
            data={contarTarefasPorStatus(filtrarPropostasDosUltimos15Dias(mock))}
            total={filtrarPropostasDosUltimos15Dias(mock).length}
          />
          <Typography align="right" variant="h6" color="textSecondary">
            {'Total: ' + filtrarPropostasDosUltimos15Dias(mock).length}
          </Typography>
          <Grid container justifyContent="flex-end" gap={3}>
            <Grid
              item
              onClick={() =>
                handleClickOpen({
                  content: <DataTable pageSize={10} dados={filtrarPropostasDosUltimos15Dias(mock)} />,
                  title: 'Status de propostas nos ultimos 15 dias'
                })
              }
            >
              <Typography variant="h5">Visualizar</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">Grade</Typography>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={4}>
        <MainCard>
          <Typography variant="h6" color="textSecondary">
            {'Status de propostas do ultimo mes'}
          </Typography>
          <DonutChart data={contarTarefasPorStatus(filtrarPropostasDoUltimoMes(mock))} total={filtrarPropostasDoUltimoMes(mock).length} />
          <Typography align="right" variant="h6" color="textSecondary">
            {'Total: ' + filtrarPropostasDoUltimoMes(mock).length}
          </Typography>
          <Grid container justifyContent="flex-end" gap={3}>
            <Grid
              item
              onClick={() =>
                handleClickOpen({
                  content: <DataTable pageSize={10} dados={filtrarPropostasDoUltimoMes(mock)} />,
                  title: 'Status de propostas do ultimo mes'
                })
              }
            >
              <Typography variant="h5">Visualizar</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">Grade</Typography>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <MainCard>
          <Typography align="center" variant="h6" color="textSecondary">
            {'Status de propostas dos ultimos 3 meses'}
          </Typography>
          <DonutChart
            data={contarTarefasPorStatus(filtrarPropostasDosUltimos3meses(mock))}
            total={filtrarPropostasDosUltimos3meses(mock).length}
          />
          <Typography align="right" variant="h6" color="textSecondary">
            {'Total: ' + filtrarPropostasDosUltimos3meses(mock).length}
          </Typography>
          <Grid container justifyContent="flex-end" gap={3}>
            <Grid
              item
              onClick={() =>
                handleClickOpen({
                  content: <DataTable pageSize={10} dados={filtrarPropostasDosUltimos3meses(mock)} />,
                  title: 'Status de propostas dos ultimos 3 meses'
                })
              }
            >
              <Typography variant="h5">Visualizar</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">Grade</Typography>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      <Grid item xs={12} md={7} lg={12}>
        <MainCard sx={{ mt: 2 }} content={false}>
          <DataTable dados={mock} />
        </MainCard>
      </Grid>
      <Dialog open={contentDialog?.open} keepMounted fullWidth onClose={handleClose} aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{contentDialog?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">{contentDialog?.content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default DashboardDefault;
