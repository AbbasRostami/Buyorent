const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface FetchOptions {
  revalidate?: number;
  tags?: string[];
}

export const getServerData = async <T>(
  endpoint: string,
  options?: FetchOptions,
): Promise<T | null> => {
  const { revalidate, tags } = options || {};

  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      next: {
        ...(revalidate !== undefined && { revalidate }),
        ...(tags && { tags }),
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 404) {
      console.warn(`[API 404 Warning]: Endpoint not found -> ${endpoint}`);
      return null; // برگرداندن null برای اینکه کامپوننت بداند دیتایی پیدا نشده است
    }

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return (await res.json()) as T;
  } catch (error: any) {
    console.error(
      "[SSR Fetch Error]:",
      error?.message,
      "Endpoint:",
      `${API_URL}${endpoint}`,
    );

    // در صورت بروز ارور شبکه، به جای کرش صفحه، null برمی‌گردانیم
    return null;
  }
};
