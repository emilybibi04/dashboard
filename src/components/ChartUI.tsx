import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';

interface ChartUIProps {
  arrLabels?: string[];
  arrValues1?: number[];
  arrValues2?: number[];
}

export default function ChartUI(props: ChartUIProps) {
   return (
      <>
         <Typography variant="h5" component="div">
            Chart Time vs Temperature & Wind Speed
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: props.arrValues1, label: 'Temperature (2m)'},
               { data: props.arrValues2, label: 'Wind Speed (10m)' },
            ]}
            xAxis={[{ scaleType: 'point', data: props.arrLabels }]}
         />
      </>
   );
}