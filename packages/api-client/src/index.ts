import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import urlcat from "urlcat";
class AxiosSetup {
  private axiosInstance: AxiosInstance;
  private baseUrl: string;
  constructor() {
    this.baseUrl = process.env.NEXT_APP_API_URL;
    this.axiosInstance = axios.create({
      baseURL: urlcat(this.baseUrl, "/api"),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  public request = async (config: AxiosRequestConfig) => {
    // !TODO: implement request
  };
}
