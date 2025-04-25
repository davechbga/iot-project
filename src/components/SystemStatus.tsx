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
import { Skeleton } from "@/components/ui/skeleton";

interface SystemStatusProps {
  data: SensorData[];
  lastUpdated: Date | null;
  loading?: boolean;
}

const SystemStatus: React.FC<SystemStatusProps> = ({
  data,
  lastUpdated,
  loading = false,
}) => {
  const latestData = data && data.length > 0 ? data[data.length - 1] : null;

  // Define status thresholds
  const co2Warning = latestData && latestData.co2 > 1000;
  const noiseWarning = latestData && latestData.noise > 85;
  const pressureWarning =
    latestData && (latestData.pressure < 980 || latestData.pressure > 1020);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Estado del Sistema</CardTitle>
        <CardDescription>
          Última actualización:{" "}
          {loading ? (
            <Skeleton className="inline-block h-4 w-32" />
          ) : lastUpdated ? (
            lastUpdated.toLocaleString()
          ) : (
            "N/A"
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {loading ? (
            <>
              <SensorStatusSkeleton name="CO2" icon={AirVent} />
              <SensorStatusSkeleton name="Ruido" icon={Volume2} />
              <SensorStatusSkeleton name="Luminosidad" icon={Sun} />
              <SensorStatusSkeleton name="Presión" icon={Gauge} />
              <SensorStatusSkeleton name="Viento" icon={Wind} />
            </>
          ) : (
            <>
              <SensorStatus
                name="CO2"
                value={latestData?.co2}
                unit="ppm"
                status={co2Warning ? "warning" : "normal"}
                icon={AirVent}
                description="Nivel de dióxido de carbono"
              />
              <SensorStatus
                name="Ruido"
                value={latestData?.noise}
                unit="dB"
                status={noiseWarning ? "warning" : "normal"}
                icon={Volume2}
                description="Nivel de ruido ambiental"
              />
              <SensorStatus
                name="Luminosidad"
                value={latestData?.luminosity}
                unit="lux"
                status="normal"
                icon={Sun}
                description="Nivel de iluminación"
              />
              <SensorStatus
                name="Presión"
                value={latestData?.pressure}
                unit="hPa"
                status={pressureWarning ? "warning" : "normal"}
                icon={Gauge}
                description="Presión atmosférica"
              />
              <SensorStatus
                name="Viento"
                value={latestData?.windSpeed}
                unit="km/h"
                status="normal"
                icon={Wind}
                description="Velocidad del viento"
              />
            </>
          )}
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
  description: string;
}

const SensorStatus: React.FC<SensorStatusProps> = ({
  name,
  value,
  unit,
  status,
  icon: Icon,
  description,
}) => {
  return (
    <div
      className={`p-4 border rounded-md transition-colors ${
        status === "warning"
          ? "border-yellow-500 bg-yellow-50 "
          : status === "error"
          ? "border-red-500 bg-red-50 "
          : "border-muted bg-muted/30"
      }`}
    >
      <div className="flex items-center gap-2 text-sm font-medium mb-1">
        <Icon className="h-4 w-4" />
        {name}
      </div>
      <div className="text-xl font-semibold mb-1">
        {value !== undefined ? `${value} ${unit}` : "N/A"}
      </div>
      <div className="text-xs text-muted-foreground">{description}</div>
    </div>
  );
};

interface SensorStatusSkeletonProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
}

const SensorStatusSkeleton: React.FC<SensorStatusSkeletonProps> = ({
  name,
  icon: Icon,
}) => {
  return (
    <div className="p-4 border rounded-md border-muted bg-muted/30">
      <div className="flex items-center gap-2 text-sm font-medium mb-1">
        <Icon className="h-4 w-4" />
        {name}
      </div>
      <Skeleton className="h-6 w-20 mb-1" />
      <Skeleton className="h-3 w-24" />
    </div>
  );
};

export default SystemStatus;
