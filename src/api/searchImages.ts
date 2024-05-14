import axios, { AxiosError, AxiosResponse } from "axios";
import { UnsplashImage } from "../components/App/App.types";

interface SearchImagesResponse {
  results: UnsplashImage[];
  client_id: string;
  query: string;
  orientation: string;
  pageNum: number;
  per_page: number;
  total_pages: number;
}

async function searchImages(
  query: string,
  pageNum: number
): Promise<SearchImagesResponse> {
  try {
    const API_KEY: string = "X0sJ3fvNEVUnxb5PR6m8WyW7rOdzAD8SMCSzxAiJtgY";
    const params: UnsplashImage = {
      client_id: API_KEY,
      query: query,
      orientation: "landscape",
      page: pageNum,
      per_page: 12,
    };

    const response: AxiosResponse<SearchImagesResponse> = await axios.get<
      UnsplashImage,
      AxiosResponse<SearchImagesResponse>
    >(`https://api.unsplash.com/search/photos/`, {
      params: params,
      headers: {
        Authorization: `Client-ID ${API_KEY}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching images:", error);
    return error.status;
  }
}
export { searchImages };
