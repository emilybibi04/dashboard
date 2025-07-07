import './App.css'
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import DataFetcher from './functions/DataFetcher';
function App() {
  const dataFetcherOutput = DataFetcher();
  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center">
         {/* Encabezado */}
         <Grid size={{ xs: 12, md: 12 }} sx={{ display: { xs: "none", md: "block"} }}>Elemento: Encabezado</Grid>
         <HeaderUI/>

         {/* Alertas */}
         <Grid container justifyContent="right" alignItems="center">Elemento: Alertas</Grid>
         <AlertUI description="No se preveen lluvias"/>

         {/* Selector */}
         <Grid size={{ xs: 12, md: 3  }}>Elemento: Selector</Grid>
         <SelectorUI/>

         {/* Indicadores */}
         <Grid size={{ xs: 12, md: 9 }}>
          <Grid size={{ xs: 12, md: 3 }}>
            <IndicatorUI title='Temperatura (2m)' description='XX°C' />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
                <IndicatorUI title='Temperatura aparente' description='YY°C' />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
                <IndicatorUI title='Velocidad del viento' description='ZZkm/h' />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
                <IndicatorUI title='Humedad relativa' description='NN%' />
            </Grid>
            
         </Grid>


         {/* Gráfico */}
         <Grid sx={{ display: { xs: "none", md: "block"} }}>Elemento: Gráfico
         </Grid>

         {/* Tabla */}
         <Grid sx={{ display: { xs: "none", md: "block" } }}>Elemento: Tabla</Grid>

         {/* Información adicional */}
         <Grid>Elemento: Información adicional</Grid>

      </Grid>
  );
}
export default App