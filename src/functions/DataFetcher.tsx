import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface DataFetcherOutput {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}
interface DataFetcherProps {
    city: string;
}

const cityCoords: Record<string, { lat: number; lon: number }> = {
    guayaquil: { "lat": -2.19616, "lon": -79.88621 },
    quito:     { "lat": -0.1806532, "lon": -78.4678382 },
    manta:     { "lat": -0.96212, "lon": -80.71271 },
    cuenca:    { "lat": -2.90055, "lon": -79.00453 }
};

export default function DataFetcher({ city }: DataFetcherProps) : DataFetcherOutput {

    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    //verificación de datos que tengan 10 min de antiguedad; vigencia
    const CACHE_DURATION = 10 * 60 * 1000;

    useEffect(() => {
        if (!city || !cityCoords[city]) {
            setData(null);
            setLoading(false);
            setError(null);
            return;
        }

        const { lat, lon } = cityCoords[city];
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m`;

        const storageKey = `weatherData_${city}`;
        const timestampKey = `weatherDataTimestamp_${city}`;

        const storedData = localStorage.getItem(storageKey);
        const storedTimestamp = localStorage.getItem(timestampKey);

        const now = new Date().getTime();
        //evito hacer fetch; eficiencia
        if (storedData && storedTimestamp) {
            const age = now - parseInt(storedTimestamp);
            if (age < CACHE_DURATION) {
                setData(JSON.parse(storedData));
                setLoading(false);
                return;
            }
        }

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
                }
                const result: OpenMeteoResponse = await response.json();
                setData(result);
                localStorage.setItem(storageKey, JSON.stringify(result));
                localStorage.setItem(timestampKey, now.toString());
            } catch (err: any) {
                if (err instanceof Error) {
                    //intenta recuperar los datos anteriormente almacenados; resiliencia
                    if (storedData) {
                        setData(JSON.parse(storedData));
                        setError("Error de red. Mostrando datos almacenados.");
                    } else {
                        setError(err.message);
                    }
                } else {
                    setError("Ocurrió un error desconocido al obtener los datos.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [city]); // El array vacío asegura que el efecto se ejecute solo una vez después del primer renderizado

    return { data, loading, error };

}