import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SensorData } from "@/types";
import { AirVent, Volume2, Sun, Gauge, Wind } from "lucide-react";

interface SystemStatusProps {
  data: SensorData[];

  lastUpdated: Date | null;
}

const SystemStatus: React.FC<SystemStatusProps> = ({ data, lastUpdated }) => {
  const latestData = data && data.length > 0 ? data[data.length - 1] : null;

  // Define status thresholds
  const co2Warning = latestData && latestData.co2 > 1000;
  const noiseWarning = latestData && latestData.noise > 85;
  const pressureWarning =
    latestData && (latestData.pressure < 980 || latestData.pressure > 1020);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle>Estado del Sistema</CardTitle>
        <CardDescription>
          Última actualización:{" "}
          {lastUpdated ? lastUpdated.toLocaleString() : "N/A"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
          <SensorStatus
            name="CO2"
            value={latestData?.co2}
            unit="ppm"
            status={co2Warning ? "warning" : "normal"}
            icon={AirVent}
          />
          <SensorStatus
            name="Ruido"
            value={latestData?.noise}
            unit="dB"
            status={noiseWarning ? "warning" : "normal"}
            icon={Volume2}
          />
          <SensorStatus
            name="Luminosidad"
            value={latestData?.luminosity}
            unit="lux"
            status="normal"
            icon={Sun}
          />
          <SensorStatus
            name="Presión"
            value={latestData?.pressure}
            unit="hPa"
            status={pressureWarning ? "warning" : "normal"}
            icon={Gauge}
          />
          <SensorStatus
            name="Velocidad del Viento"
            value={latestData?.windSpeed}
            unit="km/h"
            status="normal"
            icon={Wind}
          />
        </div>
      </CardContent>
    </Card>
  );
};

interface SensorStatusProps {
  name: string;
  value: number | undefined;
  unit: string;
  status: "normal" | "warning" | "error";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
}

const SensorStatus: React.FC<SensorStatusProps> = ({
  name,
  value,
  unit,
  status,
  icon: Icon,
}) => {
  return (
    <div
      className={`p-2 border rounded-md ${
        status === "warning"
          ? "border-yellow-800 bg-yellow-500"
          : status === "error"
          ? "border-red-800 bg-red-500"
          : "border-muted"
      }`}
    >
      <div className="flex items-center gap-1.5 text-xs font-medium mb-1">
        <Icon className="h-6 w-6" />
        {name}
      </div>
      <div className="text-lg font-semibold">
        {value !== undefined ? `${value} ${unit}` : "N/A"}
      </div>
    </div>
  );
};

export default SystemStatus;
