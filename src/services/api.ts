const BASE_URL = "https://api.instantwebtools.net/v1";
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export interface ApiResponse<T> {
  data: T;
  error?: string;
  isLoading: boolean;
}

export const fetchPassengers = async (page: number, size: number = 10) => {
  try {
    const response = await fetch(
      `${BASE_URL}/passenger?page=${page}&size=${size}`
    );
    if (!response.ok) throw new Error("Failed to fetch passengers");
    return await response.json();
  } catch (error) {
    console.error("Error fetching passengers:", error);
    throw error;
  }
};

export const fetchPosts = async (page: number, limit: number = 10) => {
  try {
    const response = await fetch(`${POSTS_URL}?_page=${page}&_limit=${limit}`);
    if (!response.ok) throw new Error("Failed to fetch posts");
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
