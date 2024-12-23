const BASE_URL = "https://api.instantwebtools.net/v1";
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export interface ApiResponse<T> {
  data: T;
  error?: string;
  isLoading: boolean;
}

const fetchWithTimeout = async (url: string, timeout = 5000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};

export const fetchPassengers = async (page: number, size: number = 10) => {
  const sanitizedPage = Math.max(1, Math.floor(page));
  const sanitizedSize = Math.min(50, Math.max(1, Math.floor(size)));

  try {
    const response = await fetchWithTimeout(
      `${BASE_URL}/passenger?page=${sanitizedPage}&size=${sanitizedSize}`
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch passengers");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching passengers:", error);
    throw error instanceof Error ? error : new Error("Unknown error occurred");
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
