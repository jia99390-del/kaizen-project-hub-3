import projects from "../data/projects.json";
import { saveProject } from "../lib/projects";
(async () => { for (const p of projects as any[]) await saveProject(p); console.log("Seeded", projects.length); process.exit(0); })();
