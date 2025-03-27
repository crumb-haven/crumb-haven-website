import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function handleResponse(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
  return res;
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  return await handleResponse(res);
}

// Enhanced query function with better error handling and retries
export const getQueryFn: <T>(options?: {
  on401?: "returnNull" | "throw";
  maxRetries?: number;
}) => QueryFunction<T> =
  (options = { on401: "throw", maxRetries: 2 }) =>
  async ({ queryKey }) => {
    const url = queryKey[0] as string;
    let retries = 0;
    
    while (retries <= (options.maxRetries || 2)) {
      try {
        const res = await fetch(url, {
          credentials: "include",
          // Add cache busting for retries
          headers: retries > 0 ? { 'Cache-Control': 'no-cache' } : {},
        });

        if (options.on401 === "returnNull" && res.status === 401) {
          return null;
        }

        if (!res.ok) {
          // If not a server error, don't retry
          if (res.status < 500 && res.status !== 0) {
            const text = await res.text();
            throw new Error(`${res.status}: ${text || res.statusText}`);
          }
          
          // For server errors, try again if we have retries left
          if (retries < (options.maxRetries || 2)) {
            retries++;
            // Exponential backoff
            await new Promise(r => setTimeout(r, retries * 500));
            continue;
          }
          
          // Out of retries
          const text = await res.text();
          throw new Error(`${res.status}: ${text || res.statusText}`);
        }

        return await res.json();
      } catch (error) {
        // Handle network errors (may be offline/CORS)
        if (error instanceof TypeError && retries < (options.maxRetries || 2)) {
          retries++;
          // Exponential backoff
          await new Promise(r => setTimeout(r, retries * 500));
          continue;
        }
        throw error;
      }
    }
    
    // This should never be reached due to the throw in the loop
    throw new Error(`Failed after ${options.maxRetries} retries`);
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw", maxRetries: 2 }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000, // 1 minute instead of Infinity for better refresh
      retry: 2, // Enable retries at the QueryClient level too
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    },
    mutations: {
      retry: 1, // Add a single retry for mutations
    },
  },
});
