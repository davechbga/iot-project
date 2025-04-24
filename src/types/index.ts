export interface SensorData {
  co2: number;
  noise: number;
  luminosity: number;
  pressure: number;
  windSpeed: number;
  timestamp?: string;
}

export interface ThingSpeakResponse {
  channel: {
    id: number;
    name: string;
    description: string;
    latitude: string;
    longitude: string;
    field1: string;
    field2: string;
    field3: string;
    field4: string;
    field5: string;
    created_at: string;
    updated_at: string;
    last_entry_id: number;
  };
  feeds: {
    created_at: string;
    entry_id: number;
    field1?: string;
    field2?: string;
    field3?: string;
    field4?: string;
    field5?: string;
  }[];
}

export interface ThingSpeakFieldResponse {
  channel: {
    id: number;
    name: string;
    field1: string;
  };
  feeds: {
    created_at: string;
    entry_id: number;
    field1?: string;
  }[];
}
