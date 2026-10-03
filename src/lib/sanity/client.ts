import { createClient } from "@sanity/client";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET;

console.log("Sanity env:", {
  projectId,
  dataset,
});

if (!projectId || !dataset) {
  throw new Error("Sanity environment variables are not configured");
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2026-10-01",
  useCdn: false,
});

export function getSanityWriteClient() {
  const token = import.meta.env.SANITY_WRITE_TOKEN;

  if (!token) {
    throw new Error("SANITY_WRITE_TOKEN is not configured");
  }

  return sanityClient.withConfig({
    token,
    useCdn: false,
  });
}
