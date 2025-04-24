import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { SensorData } from "@/types";
import { sendSensorData } from "@/utils/api";
import { Volume2, Cloud, Sun, Thermometer, Wind } from "lucide-react";

interface SensorFormProps {
  onDataSent: () => void;
}

const SensorForm: React.FC<SensorFormProps> = ({ onDataSent }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<SensorData>({
    co2: 400,
    noise: 45,
    luminosity: 500,
    pressure: 1013.25,
    windSpeed: 10,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: parseFloat(value),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await sendSensorData(formData);

      if (response.ok) {
        toast("Datos enviados correctamente", {
          description: "Los datos del sensor se han enviado a ThingSpeak",
        });
        onDataSent();
      } else {
        toast("Error al enviar datos", {
          description: `Error: ${response.status} - ${response.statusText}`,
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast("Error de conexión", {
        description: "No se pudo conectar con el servidor de ThingSpeak",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRandomize = () => {
    setFormData({
      co2: Math.floor(Math.random() * (2000 - 300) + 300),
      noise: parseFloat((Math.random() * 100).toFixed(1)),
      luminosity: parseFloat((Math.random() * 1000).toFixed(1)),
      pressure: parseFloat((1000 + Math.random() * 30).toFixed(2)),
      windSpeed: parseFloat((Math.random() * 100).toFixed(1)),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Simulador de Sensores</CardTitle>
        <CardDescription>
          Ingrese datos de sensores para enviar a ThingSpeak
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Cloud className="w-4 h-4" />
                <Label htmlFor="co2">CO2 (ppm)</Label>
              </div>
              <Input
                id="co2"
                name="co2"
                type="number"
                step="1"
                min="300"
                max="5000"
                value={formData.co2}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                <Label htmlFor="noise">Ruido (dB)</Label>
              </div>
              <Input
                id="noise"
                name="noise"
                type="number"
                step="0.1"
                min="0"
                max="120"
                value={formData.noise}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4" />
                <Label htmlFor="luminosity">Luminosidad (lux)</Label>
              </div>
              <Input
                id="luminosity"
                name="luminosity"
                type="number"
                step="0.1"
                min="0"
                value={formData.luminosity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4" />
                <Label htmlFor="pressure">Presión Atmosférica (hPa)</Label>
              </div>
              <Input
                id="pressure"
                name="pressure"
                type="number"
                step="0.01"
                min="900"
                max="1100"
                value={formData.pressure}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4" />
                <Label htmlFor="windSpeed">Velocidad del Viento (km/h)</Label>
              </div>
              <Input
                id="windSpeed"
                name="windSpeed"
                type="number"
                step="0.1"
                min="0"
                max="200"
                value={formData.windSpeed}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" type="button" onClick={handleRandomize}>
          Aleatorio
        </Button>
        <Button disabled={loading} onClick={handleSubmit}>
          {loading ? "Enviando..." : "Enviar Datos"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SensorForm;
