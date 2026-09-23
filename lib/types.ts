export type Tier = "budget" | "standard" | "premium";
export type Difficulty = "Easy" | "Medium" | "Hard";
export interface Material { name: string; qty: string; purpose: string; cost: number }
export interface Step { title: string; text: string; image?: string; safety?: string; tip?: string }
export interface Version {
  tier: Tier; materials: Material[]; extraCost: number; // tools/consumables not in the list
  pros: string[]; cons: string[]; durability: string; difficulty: Difficulty; time: string; steps: Step[];
}
export interface Project {
  slug: string; title: string; description: string; category: string; image: string;
  difficulty: Difficulty; time: string; tools: string[]; safety: string[]; mistakes: string[];
  alternatives: string[]; tips: string[]; versions: Version[]; createdAt: string; featured?: boolean; gallery?: string[];
}
export const materialsTotal = (v: Version) => v.materials.reduce((s, m) => s + m.cost, 0);
export const projectTotal = (v: Version) => materialsTotal(v) + v.extraCost;
export const startingCost = (p: Project) => Math.min(...p.versions.map(projectTotal));
export const money = (n: number) => `$${n.toFixed(2)}`;
export const maxCost = (p: Project) => Math.max(...p.versions.map(projectTotal));
export const costRange = (p: Project) => `${money(startingCost(p))} – ${money(maxCost(p))}`;
