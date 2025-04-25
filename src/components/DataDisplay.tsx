import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SensorData } from "@/types";
import { AirVent, Volume2, Sun, Gauge, Wind } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface DataDisplayProps {
  data: SensorData[];
  loading: boolean;
}

const DataDisplay: React.FC<DataDisplayProps> = ({ data, loading }) => {
  const [activeTab, setActiveTab] = useState<string>("table");
  const latestData = data.length > 0 ? data[0] : null;

  const formatTimestamp = (timestamp?: string) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleString();
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between">
          <span>Datos de Sensores</span>
          {loading && (
            <span className="text-sm text-muted-foreground animate-pulse">
              Cargando...
            </span>
          )}
        </CardTitle>
        <CardDescription>
          Últimos datos registrados en ThingSpeak
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="table">Tabla</TabsTrigger>
            <TabsTrigger value="json">JSON</TabsTrigger>
          </TabsList>

          <TabsContent value="table" className="space-y-4">
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sensor</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Unidad</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <>
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <AirVent className="h-4 w-4" />
                            <Skeleton className="h-4 w-16" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-12" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-8" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Volume2 className="h-4 w-4" />
                            <Skeleton className="h-4 w-16" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-12" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-8" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Sun className="h-4 w-4" />
                            <Skeleton className="h-4 w-16" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-12" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-8" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Gauge className="h-4 w-4" />
                            <Skeleton className="h-4 w-16" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-12" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-8" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Wind className="h-4 w-4" />
                            <Skeleton className="h-4 w-16" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-12" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-8" />
                        </TableCell>
                      </TableRow>
                    </>
                  ) : latestData ? (
                    <>
                      <TableRow>
                        <TableCell className="flex items-center gap-2">
                          <AirVent className="h-4 w-4" />
                          CO2
                        </TableCell>
                        <TableCell>{latestData.co2}</TableCell>
                        <TableCell>ppm</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="flex items-center gap-2">
                          <Volume2 className="h-4 w-4" />
                          Ruido
                        </TableCell>
                        <TableCell>{latestData.noise}</TableCell>
                        <TableCell>dB</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="flex items-center gap-2">
                          <Sun className="h-4 w-4" />
                          Luminosidad
                        </TableCell>
                        <TableCell>{latestData.luminosity}</TableCell>
                        <TableCell>lux</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="flex items-center gap-2">
                          <Gauge className="h-4 w-4" />
                          Presión Atmosférica
                        </TableCell>
                        <TableCell>{latestData.pressure}</TableCell>
                        <TableCell>hPa</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="flex items-center gap-2">
                          <Wind className="h-4 w-4" />
                          Velocidad del Viento
                        </TableCell>
                        <TableCell>{latestData.windSpeed}</TableCell>
                        <TableCell>km/h</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Fecha y hora</TableCell>
                        <TableCell colSpan={2}>
                          {formatTimestamp(latestData.timestamp)}
                        </TableCell>
                      </TableRow>
                    </>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center">
                        No hay datos disponibles
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {data.length > 1 && (
              <div>
                <h4 className="text-sm font-medium mb-2">
                  Histórico ({data.length} registros)
                </h4>
                <div className="border rounded-md overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fecha</TableHead>
                        <TableHead>CO2</TableHead>
                        <TableHead>Ruido</TableHead>
                        <TableHead>Luminosidad</TableHead>
                        <TableHead>Presión</TableHead>
                        <TableHead>Viento</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        <>
                          {[...Array(3)].map((_, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <Skeleton className="h-4 w-32" />
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-4 w-12" />
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-4 w-12" />
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-4 w-12" />
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-4 w-12" />
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-4 w-12" />
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      ) : (
                        data.slice(0, 5).map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              {formatTimestamp(item.timestamp)}
                            </TableCell>
                            <TableCell>{item.co2} ppm</TableCell>
                            <TableCell>{item.noise} dB</TableCell>
                            <TableCell>{item.luminosity} lux</TableCell>
                            <TableCell>{item.pressure} hPa</TableCell>
                            <TableCell>{item.windSpeed} km/h</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="json">
            <div className="text-sm text-muted-foreground mb-2">
              Datos en formato JSON para desarrollo y depuración
            </div>
            {loading ? (
              <div className="bg-muted/30 p-4 rounded-md overflow-auto max-h-[300px]">
                <Skeleton className="h-[250px] w-full" />
              </div>
            ) : (
              <pre className="bg-muted/30 p-4 rounded-md overflow-auto max-h-[300px] text-xs">
                {JSON.stringify(data, null, 2)}
              </pre>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DataDisplay;
