import PocketBase from "pocketbase";

const pocketBaseUrl =
  process.env.NEXT_PUBLIC_POCKETBASE_URL ??
  (typeof window !== "undefined"
    ? `http://${window.location.hostname}:8090`
    : "http://127.0.0.1:8090");

export const pb = new PocketBase(pocketBaseUrl);
