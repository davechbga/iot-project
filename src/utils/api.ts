import {
  SensorData,
  ThingSpeakResponse,
  ThingSpeakFieldResponse,
} from "../types";

// ThingSpeak API keys
const WRITE_API_KEY = "8PQPLX4KOED80FU5";
const READ_API_KEY = "9BUGGJ8NRHUPEZ77";
const CHANNEL_ID = "2934236";

// Base URL for ThingSpeak API
const BASE_URL = "https://api.thingspeak.com";

// Function to send sensor data to ThingSpeak
export const sendSensorData = async (data: SensorData): Promise<Response> => {
  const url = new URL(`${BASE_URL}/update`);

  // Add API key
  url.searchParams.append("api_key", WRITE_API_KEY);

  // Map sensor data to ThingSpeak fields
  url.searchParams.append("field1", data.co2.toString());
  url.searchParams.append("field2", data.noise.toString());
  url.searchParams.append("field3", data.luminosity.toString());
  url.searchParams.append("field4", data.pressure.toString());
  url.searchParams.append("field5", data.windSpeed.toString());

  return await fetch(url.toString());
};

// Function to fetch channel feed data
export const fetchChannelFeed = async (
  results: number = 10
): Promise<ThingSpeakResponse> => {
  const url = new URL(`${BASE_URL}/channels/${CHANNEL_ID}/feeds.json`);
  url.searchParams.append("api_key", READ_API_KEY);
  url.searchParams.append("results", results.toString());

  const response = await fetch(url.toString());
  return await response.json();
};

// Function to fetch specific field data
export const fetchFieldData = async (
  fieldNumber: number,
  results: number = 10
): Promise<ThingSpeakFieldResponse> => {
  const url = new URL(
    `${BASE_URL}/channels/${CHANNEL_ID}/fields/${fieldNumber}.json`
  );
  url.searchParams.append("api_key", READ_API_KEY);
  url.searchParams.append("results", results.toString());

  const response = await fetch(url.toString());
  return await response.json();
};

// Function to convert ThingSpeak response to SensorData array
export const convertResponseToSensorData = (
  response: ThingSpeakResponse
): SensorData[] => {
  return response.feeds.map((feed) => ({
    co2: parseFloat(feed.field1 || "0"),
    noise: parseFloat(feed.field2 || "0"),
    luminosity: parseFloat(feed.field3 || "0"),
    pressure: parseFloat(feed.field4 || "0"),
    windSpeed: parseFloat(feed.field5 || "0"),
    timestamp: feed.created_at,
  }));
};
