export async function fetchWithAuth(url: string, options = {}) {
    let res = await fetch(url, { ...options, credentials: "include" });
    if (res.status === 401) {
      await fetch("/auth/refresh", { method: "POST", credentials: "include", type });
      res = await fetch(url, { ...options, credentials: "include" });
    }
    return res;
  }