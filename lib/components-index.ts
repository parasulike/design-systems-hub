import { getCatalog } from "@/lib/catalog";
import { EDITORIAL_PROFILES } from "@/lib/editorial-profiles";

export type ComponentExample = {
  systemId: string;
  systemName: string;
  company: string;
  logoPath?: string;
  localName: string;
  tag: string;
  note: string;
  href: string;
};

export type ComponentEntry = {
  slug: string;
  name: string;
  aliases: string[];
  description: string;
  examples: ComponentExample[];
};

/** Canonical component types + aliases (inspired by component.gallery). */
const COMPONENT_TYPES: {
  slug: string;
  name: string;
  aliases: string[];
  description: string;
}[] = [
  {
    slug: "accordion",
    name: "Accordion",
    aliases: ["arrow toggle", "collapse", "collapsible", "disclosure", "expandable", "expander", "details"],
    description:
      "A vertical stack of interactive headings used to toggle the display of further information.",
  },
  {
    slug: "alert",
    name: "Alert",
    aliases: ["notification", "feedback", "message", "banner", "callout", "notification banner"],
    description: "A way of informing the user of important changes in a prominent way.",
  },
  {
    slug: "avatar",
    name: "Avatar",
    aliases: [],
    description: "A graphical representation of a user: usually a photo, illustration, or initial.",
  },
  {
    slug: "badge",
    name: "Badge",
    aliases: ["tag", "label", "chip", "status"],
    description:
      "A small label representing a status, property, or metadata, usually near a larger interface element.",
  },
  {
    slug: "breadcrumb",
    name: "Breadcrumbs",
    aliases: ["breadcrumb", "breadcrumb trail"],
    description: "A list of links showing the location of the current page in the navigational hierarchy.",
  },
  {
    slug: "button",
    name: "Button",
    aliases: ["action button", "cta"],
    description: "Buttons trigger an action such as submitting a form or showing/hiding an interface component.",
  },
  {
    slug: "button-group",
    name: "Button group",
    aliases: ["toolbar", "action bar"],
    description: "A wrapper for multiple related buttons or contextual actions.",
  },
  {
    slug: "card",
    name: "Card",
    aliases: ["tile", "tiles", "cards"],
    description: "A container for content representing a single entity, such as an article, contact, or task.",
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    aliases: [],
    description: "An input for choosing one or more predefined options.",
  },
  {
    slug: "combobox",
    name: "Combobox",
    aliases: ["autocomplete", "autosuggest", "combo box", "combo-box"],
    description: "An input that behaves like a select, with free text to filter options.",
  },
  {
    slug: "command",
    name: "Command",
    aliases: ["command menu", "command palette"],
    description: "A keyboard-first interface for searching and running actions.",
  },
  {
    slug: "date-picker",
    name: "Date picker",
    aliases: ["datepicker", "calendar", "datetime picker", "date input"],
    description: "A visual way to choose a date, often with a calendar view.",
  },
  {
    slug: "dialog",
    name: "Dialog",
    aliases: ["modal", "popup", "modal window"],
    description: "An interface element that appears over other content and usually requires a decision before returning.",
  },
  {
    slug: "drawer",
    name: "Drawer",
    aliases: ["tray", "flyout", "sheet", "bottom sheet", "side panel"],
    description: "A panel that slides out from the edge of the screen.",
  },
  {
    slug: "dropdown-menu",
    name: "Dropdown menu",
    aliases: ["dropdown", "menu", "select menu"],
    description: "A menu of actions or navigation options revealed by interacting with a button.",
  },
  {
    slug: "empty-state",
    name: "Empty state",
    aliases: ["empty states"],
    description: "An indication that there is no data to display, often with a useful next action.",
  },
  {
    slug: "file-upload",
    name: "File upload",
    aliases: ["file input", "file uploader", "dropzone"],
    description: "An input that lets users upload a file from their device.",
  },
  {
    slug: "form",
    name: "Form",
    aliases: ["forms", "form controls", "form fields", "field", "fieldset"],
    description: "A grouping of input controls that allow a user to submit information.",
  },
  {
    slug: "header",
    name: "Header",
    aliases: ["navbar", "app bar", "top bar"],
    description: "An element across the top of pages, usually containing the product name and main navigation.",
  },
  {
    slug: "link",
    name: "Link",
    aliases: ["anchor", "hyperlink"],
    description: "A reference to another resource, page, or location in the current document.",
  },
  {
    slug: "list",
    name: "List",
    aliases: ["data list"],
    description: "A grouping of related items for scanning and selection.",
  },
  {
    slug: "navigation",
    name: "Navigation",
    aliases: ["nav", "side navigation", "sidebar"],
    description: "A container for navigation links across pages or within the current page.",
  },
  {
    slug: "pagination",
    name: "Pagination",
    aliases: [],
    description: "Controls for splitting information across pages and moving between them.",
  },
  {
    slug: "popover",
    name: "Popover",
    aliases: [],
    description: "An element that pops up from another element and can contain interactive content.",
  },
  {
    slug: "progress",
    name: "Progress",
    aliases: ["progress bar", "progress indicator", "progress tracker", "stepper", "steps", "timeline", "meter"],
    description: "A representation of progress through a continuous task or a series of discrete steps.",
  },
  {
    slug: "radio",
    name: "Radio button",
    aliases: ["radio", "radio group"],
    description: "An input that lets a user select a single option from a predefined list.",
  },
  {
    slug: "search",
    name: "Search input",
    aliases: ["search", "search field"],
    description: "An input that lets users find content by entering a search term.",
  },
  {
    slug: "segmented-control",
    name: "Segmented control",
    aliases: ["toggle button group"],
    description: "A control for switching between related options or views.",
  },
  {
    slug: "select",
    name: "Select",
    aliases: ["dropdown select", "select input", "picker"],
    description: "A form input for choosing a value from a scrollable list of predefined options.",
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    aliases: ["skeleton loader"],
    description: "A placeholder layout for content that has not finished loading.",
  },
  {
    slug: "slider",
    name: "Slider",
    aliases: ["range input"],
    description: "A form control for choosing a value within a preset range.",
  },
  {
    slug: "spinner",
    name: "Spinner",
    aliases: ["loader", "loading"],
    description: "A visual indicator that a process is happening in the background.",
  },
  {
    slug: "table",
    name: "Table",
    aliases: ["data table", "datatable", "data grid", "datagrid", "tables"],
    description:
      "A component for displaying large amounts of data in rows and columns, often with sorting and filtering.",
  },
  {
    slug: "tabs",
    name: "Tabs",
    aliases: ["tabbed interface"],
    description: "A way of navigating between multiple panels in a constrained space.",
  },
  {
    slug: "text-input",
    name: "Text input",
    aliases: ["text field", "input", "textarea", "textbox", "text box"],
    description: "A form control for editing single-line or multi-line text.",
  },
  {
    slug: "toast",
    name: "Toast",
    aliases: ["snackbar"],
    description: "A transient alert that appears above other content, similar to a push notification.",
  },
  {
    slug: "toggle",
    name: "Toggle",
    aliases: ["switch", "toggle button"],
    description: "A control used to switch between two states, often on or off.",
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    aliases: ["toggletip"],
    description: "Extra information about an element, usually shown on hover, focus, or tap.",
  },
  {
    slug: "tree-view",
    name: "Tree view",
    aliases: ["tree"],
    description: "A component for displaying nested hierarchical information.",
  },
  {
    slug: "wizard",
    name: "Wizard",
    aliases: ["task list"],
    description: "A multi-step flow that guides people through a longer task one stage at a time.",
  },
];

const CARBON_COMPONENTS = [
  {
    name: "Data table",
    note: "A strong reference for sorting, selection, expansion, batch actions, and dense enterprise data.",
    href: "https://carbondesignsystem.com/components/data-table/usage/",
    tag: "Dense data",
  },
  {
    name: "Notification",
    note: "Clear severity, placement, and dismissal guidance across inline and toast feedback.",
    href: "https://carbondesignsystem.com/components/notification/usage/",
    tag: "Feedback",
  },
  {
    name: "Date picker",
    note: "Worth studying for input states, range selection, formatting, and validation behavior.",
    href: "https://carbondesignsystem.com/components/date-picker/usage/",
    tag: "Input",
  },
  {
    name: "Tile",
    note: "A flexible surface with clickable, selectable, expandable, and contained variants.",
    href: "https://carbondesignsystem.com/components/tile/usage/",
    tag: "Composition",
  },
];

function normalizeKey(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function slugify(value: string) {
  return normalizeKey(value).replace(/\s+/g, "-");
}

function buildLookup() {
  const lookup = new Map<string, string>();
  for (const type of COMPONENT_TYPES) {
    lookup.set(normalizeKey(type.name), type.slug);
    for (const alias of type.aliases) {
      lookup.set(normalizeKey(alias), type.slug);
    }
  }
  return lookup;
}

const LOOKUP = buildLookup();

function resolveType(localName: string) {
  const key = normalizeKey(localName);
  const known = LOOKUP.get(key);
  if (known) {
    return COMPONENT_TYPES.find((type) => type.slug === known)!;
  }

  // Prefer matching longer aliases contained in the name (e.g. "Data table").
  const contained = [...LOOKUP.entries()]
    .filter(([alias]) => alias.length >= 4 && (key.includes(alias) || alias.includes(key)))
    .sort((a, b) => b[0].length - a[0].length)[0];

  if (contained) {
    return COMPONENT_TYPES.find((type) => type.slug === contained[1])!;
  }

  return {
    slug: slugify(localName),
    name: localName.replace(/\b\w/g, (char) => char.toUpperCase()),
    aliases: [] as string[],
    description: `Curated references for ${localName} across public design systems.`,
  };
}

function collectRawExamples() {
  const catalog = new Map(getCatalog().map((system) => [system.id, system]));
  const examples: {
    systemId: string;
    localName: string;
    tag: string;
    note: string;
    href: string;
  }[] = [];

  for (const [systemId, profile] of Object.entries(EDITORIAL_PROFILES)) {
    for (const component of profile.components) {
      examples.push({
        systemId,
        localName: component.name,
        tag: component.tag,
        note: component.note,
        href: component.href,
      });
    }
  }

  // Carbon uses a hard-coded standout list on its detail page.
  for (const component of CARBON_COMPONENTS) {
    examples.push({
      systemId: "carbon",
      localName: component.name,
      tag: component.tag,
      note: component.note,
      href: component.href,
    });
  }

  return examples.flatMap((example) => {
    const system = catalog.get(example.systemId);
    if (!system || !example.href) return [];
    const mapped: ComponentExample = {
      systemId: system.id,
      systemName: system.name,
      company: system.company,
      logoPath: system.logo_path,
      localName: example.localName,
      tag: example.tag,
      note: example.note,
      href: example.href,
    };
    return [mapped];
  });
}

let cachedIndex: ComponentEntry[] | null = null;

export function getComponentsIndex(): ComponentEntry[] {
  if (cachedIndex) return cachedIndex;

  const bySlug = new Map<string, ComponentEntry>();

  for (const type of COMPONENT_TYPES) {
    bySlug.set(type.slug, {
      slug: type.slug,
      name: type.name,
      aliases: type.aliases,
      description: type.description,
      examples: [],
    });
  }

  for (const example of collectRawExamples()) {
    const type = resolveType(example.localName);
    const existing = bySlug.get(type.slug);
    if (existing) {
      // Keep one example per system per component type.
      if (!existing.examples.some((item) => item.systemId === example.systemId)) {
        existing.examples.push(example);
      }
      if (
        example.localName &&
        normalizeKey(example.localName) !== normalizeKey(existing.name) &&
        !existing.aliases.some((alias) => normalizeKey(alias) === normalizeKey(example.localName))
      ) {
        existing.aliases.push(example.localName);
      }
    } else {
      bySlug.set(type.slug, {
        slug: type.slug,
        name: type.name,
        aliases: type.aliases,
        description: type.description,
        examples: [example],
      });
    }
  }

  cachedIndex = [...bySlug.values()]
    .filter((entry) => entry.examples.length > 0)
    .map((entry) => ({
      ...entry,
      aliases: [...new Set(entry.aliases.map((alias) => alias.trim()).filter(Boolean))].sort((a, b) =>
        a.localeCompare(b),
      ),
      examples: entry.examples.sort((a, b) => a.systemName.localeCompare(b.systemName)),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return cachedIndex;
}

export function getComponentBySlug(slug: string) {
  return getComponentsIndex().find((entry) => entry.slug === slug) ?? null;
}
