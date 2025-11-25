import axios from "axios";

const scrapperService = axios.create({
  baseURL: import.meta.env.SCRAPPER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const syncPlatos = async () => {
  try {
    const response = await scrapperService.post('/sync/platos');
    return response.data;
  } catch (error) {
    console.error("Error in syncPlatos: ", error);
    throw error;
  }
};

export const syncMesas = async () => {
    try {
        const response = await scrapperService.get('/sync/mesas');
        return response.data;
    } catch (error) {
        console.error("Error in syncMesas: ", error);
        throw error;
    }
}