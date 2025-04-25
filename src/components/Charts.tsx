import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SensorData } from "@/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ChartsProps {
  data: SensorData[];
  loading: boolean;
}

const Charts: React.FC<ChartsProps> = ({ data, loading }) => {
  const chartData = [...data].map((item) => ({
    name: item.timestamp
      ? new Date(item.timestamp).toLocaleTimeString()
      : "N/A",
    co2: item.co2,
    noise: item.noise,
    luminosity: item.luminosity,
    pressure: item.pressure,
    windSpeed: item.windSpeed,
  }));

  return (
    <Card >
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between">
          <span>Gráficos de Sensores</span>
          {loading && (
            <span className="text-sm text-muted-foreground animate-pulse">
              Cargando...
            </span>
          )}
        </CardTitle>
        <CardDescription>
          Visualización de datos de sensores en tiempo real
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="co2" className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-4">
            <TabsTrigger value="co2">CO2</TabsTrigger>
            <TabsTrigger value="noise">Ruido</TabsTrigger>
            <TabsTrigger value="luminosity">Luminosidad</TabsTrigger>
            <TabsTrigger value="pressure">Presión</TabsTrigger>
            <TabsTrigger value="wind">Viento</TabsTrigger>
          </TabsList>

          <TabsContent value="co2">
            <ChartCard
              title="CO2"
              dataKey="co2"
              data={chartData}
              color="#f87171"
              unit="ppm"
              loading={loading}
              description="Nivel de dióxido de carbono en el ambiente"
            />
          </TabsContent>

          <TabsContent value="noise">
            <ChartCard
              title="Ruido"
              dataKey="noise"
              data={chartData}
              color="#60a5fa"
              unit="dB"
              loading={loading}
              description="Nivel de ruido ambiental"
            />
          </TabsContent>

          <TabsContent value="luminosity">
            <ChartCard
              title="Luminosidad"
              dataKey="luminosity"
              data={chartData}
              color="#fbbf24"
              unit="lux"
              loading={loading}
              description="Nivel de iluminación ambiental"
            />
          </TabsContent>

          <TabsContent value="pressure">
            <ChartCard
              title="Presión Atmosférica"
              dataKey="pressure"
              data={chartData}
              color="#a78bfa"
              unit="hPa"
              loading={loading}
              description="Presión atmosférica actual"
            />
          </TabsContent>

          <TabsContent value="wind">
            <ChartCard
              title="Velocidad del Viento"
              dataKey="windSpeed"
              data={chartData}
              color="#34d399"
              unit="km/h"
              loading={loading}
              description="Velocidad actual del viento"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

interface ChartCardProps {
  title: string;
  dataKey: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  color: string;
  unit: string;
  loading: boolean;
  description: string;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  dataKey,
  data,
  color,
  unit,
  loading,
  description,
}) => {
  return (
    <div className="space-y-2">
      <div className="text-sm text-muted-foreground">
        {description}
      </div>
      <div className="w-full h-[300px] bg-muted/30 rounded-md p-4">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-sm text-muted-foreground">Cargando datos...</p>
            </div>
          </div>
        ) : data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            No hay datos disponibles
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 25,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={60}
                fontSize={12}
              />
              <YAxis unit={unit} />
              <Tooltip
                formatter={(value) => [`${value} ${unit}`, title]}
                labelFormatter={(label) => `Tiempo: ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={2}
                dot={{ fill: color }}
                activeDot={{ r: 6 }}
                name={title}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default Charts;
