export const fetchWithTimeout = async (
  url: string, 
  options: RequestInit = {}, 
  timeout = 5000
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(String(error));
  }
};

export const fetchWithRetry = async (
  url: string,
  options: RequestInit = {},
  retries = 2,
  timeout = 5000
): Promise<Response> => {
  for (let i = 0; i <= retries; i++) {
    try {
      return await fetchWithTimeout(url, options, timeout);
    } catch (error) {
      if (i === retries) throw error;
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.log(`Retry ${i + 1} for ${url}:`, errorMessage);
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw new Error('All retries failed');
};