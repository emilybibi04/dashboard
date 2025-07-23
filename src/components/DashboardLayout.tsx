import { Box, Paper, Grid } from "@mui/material";
import HeaderUI from "./HeaderUI";
import SelectorUI from "./SelectorUI";
import AlertUI from "./AlertUI";
import IndicatorUI from "./IndicatorUI";
import ChartUI from "./ChartUI";
import TableUI from "./TableUI";
import DataFetcher from "../functions/DataFetcher";
import { useState } from "react";

export default function DashboardLayout() {
  const [city, setCity] = useState("guayaquil");
  const { data, loading, error } = DataFetcher({ city });

  return (
    <Box sx={{ p: 3, background: "#f4f6f8", minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <HeaderUI />
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3} {...({} as any)}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <SelectorUI onCityChange={setCity} />
          </Paper>
          <Box mt={2}>
            {error
              ? <AlertUI description={error} severity="error" />
              : <AlertUI description="No se prevén lluvias" severity="info" />}
          </Box>
        </Grid>

        <Grid item xs={12} md={9} {...({} as any)}>
          {loading ? (
            <p>Cargando datos...</p>
          ) : (
            <>
              <Grid container spacing={2}>
                <Grid item xs={6} md={3} {...({} as any)}>
                  <IndicatorUI
                    title="Temp. (2m)"
                    description={data?.current.temperature_2m + " " + data?.current_units.temperature_2m}
                  />
                </Grid>
                <Grid item xs={6} md={3} {...({} as any)}>
                  <IndicatorUI
                    title="Sensación"
                    description={data?.current.apparent_temperature + " " + data?.current_units.apparent_temperature}
                  />
                </Grid>
                <Grid item xs={6} md={3} {...({} as any)}>
                  <IndicatorUI
                    title="Humedad"
                    description={data?.current.relative_humidity_2m + " " + data?.current_units.relative_humidity_2m}
                  />
                </Grid>
                <Grid item xs={6} md={3} {...({} as any)}>
                  <IndicatorUI
                    title="Viento"
                    description={data?.current.wind_speed_10m + " " + data?.current_units.wind_speed_10m}
                  />
                </Grid>
              </Grid>

              <Box mt={4}>
                <ChartUI
                  arrLabels={data?.hourly.time}
                  arrValues1={data?.hourly.temperature_2m}
                  arrValues2={data?.hourly.wind_speed_10m}
                />
              </Box>

              <Box mt={4}>
                <TableUI
                  arrLabels={data?.hourly.time}
                  arrValues1={data?.hourly.temperature_2m}
                  arrValues2={data?.hourly.wind_speed_10m}
                />
              </Box>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
