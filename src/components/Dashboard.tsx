import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { fetchChannelFeed, convertResponseToSensorData } from "@/utils/api";
import { SensorData } from "@/types";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import SensorForm from "./SensorForm";
import DataDisplay from "./DataDisplay";
import Charts from "./Charts";
import SystemStatus from "./SystemStatus";

const Dashboard: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch channel feed data
      const feedResponse = await fetchChannelFeed(10);
      const sensorDataArray = convertResponseToSensorData(feedResponse);
      setSensorData(sensorDataArray);

      // Update last fetched timestamp
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching data:", error);
      toast("Error de conexión", {
        description: "No se pudo obtener datos del servidor",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchData();

    // Optional: Set up polling for data updates every 30 seconds
    const intervalId = setInterval(fetchData, 30000);

    return () => clearInterval(intervalId);
  }, [fetchData]);

  const handleRefresh = () => {
    fetchData();
  };

  const handleDataSent = () => {
    // Refetch data after sending new data to see the update
    setTimeout(fetchData, 1000);
  };

  return (
    <div className="space-y-6 mb-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Panel de Control de Sensores
        </h1>

        <Button
          onClick={handleRefresh}
          variant="outline"
          disabled={loading}
          className="flex items-center gap-2"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Actualizar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        <div className="md:col-span-2 ">
          <SystemStatus data={sensorData} lastUpdated={lastUpdated} />
        </div>
        <div className="md:col-span-1">
          <SensorForm onDataSent={handleDataSent} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
        <Charts data={sensorData} loading={loading} />
        <DataDisplay data={sensorData} loading={loading} />
      </div>
    </div>
  );
};

export default Dashboard;
