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
          {/* Renderizado condicional de los datos obtenidos */}

                 {dataFetcherOutput.loading && <p>Cargando datos...</p>}
                 {dataFetcherOutput.error && <p>Error: {dataFetcherOutput.error}</p>}
                 {dataFetcherOutput.data && (
                 <>

                     {/* Indicadores con datos obtenidos */}

                     <Grid size={{ xs: 12, md: 3 }} >
                         <IndicatorUI
                             title='Temperatura (2m)'
                             description={dataFetcherOutput.data.current.temperature_2m + " " + dataFetcherOutput.data.current.temperature_2m} />
                     </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                         <IndicatorUI
                             title='Temperatura aparente'
                             description={dataFetcherOutput.data.current.apparent_temperature + " " + dataFetcherOutput.data.current.apparent_temperature} />
                     </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                         <IndicatorUI
                             title='Velocidad del viento'
                             description={dataFetcherOutput.data.current.wind_speed_10m + " " + dataFetcherOutput.data.current.wind_speed_10m} />
                     </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                         <IndicatorUI
                             title='Humedad relativa'
                             description={dataFetcherOutput.data.current.relative_humidity_2m + " " + dataFetcherOutput.data.current.relative_humidity_2m} />
                     </Grid>

                 </>
                 )}
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