import assert from "node:assert/strict";
import { getCatalog } from "../lib/catalog";
import { matchesFilters, sortSystems, type CatalogFilters } from "../lib/catalog-filters";

const systems = getCatalog();
const filters: CatalogFilters = { query: "", resources: ["figma"], technology: ["React"], guidance: ["accessibility"], bestFor: ["enterprise"], sort: "recommended" };

assert.equal(matchesFilters(systems.find((system) => system.id === "carbon")!, filters), true);
assert.equal(sortSystems(systems, "name")[0].name, [...systems].sort((a, b) => a.name.localeCompare(b.name))[0].name);
assert.equal(sortSystems(systems, "recommended")[0].name, "Shopify Polaris");
assert.equal(systems.filter((system) => system.recommended_rank !== undefined).length, 47);
assert.equal(systems.some((system) => system.name === "Audi UI Kit"), false);
