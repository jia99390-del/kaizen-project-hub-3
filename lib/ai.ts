import type { Project } from "./types";
/** Future AI hook: analyze an uploaded photo and draft a full project (materials, costs, steps per tier). */
export interface ProjectAnalyzer {
  analyze(image: { bytes: Uint8Array; mimeType: string }, hint?: string): Promise<Partial<Project>>;
}
/** Placeholder. Replace with a vision-model implementation and call it from the admin API route. */
export const analyzer: ProjectAnalyzer = {
  async analyze() { throw new Error("AI analysis not configured yet"); },
};
