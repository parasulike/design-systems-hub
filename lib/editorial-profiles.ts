export type EditorialLink = { label: string; href: string };

export type EditorialProfile = {
  visual: {
    heading: string;
    palette: { name: string; value: string }[];
    typeface: string;
    typeNote: string;
    density: string;
    densityNote: string;
  };
  components: { name: string; tag: string; note: string; href: string }[];
  patterns: { name: string; useWhen: string; learn: string; href: string }[];
  audience: {
    design: { title: string; description: string; facts: [string, string][]; links: EditorialLink[] };
    developer: { title: string; description: string; facts: [string, string][]; links: EditorialLink[]; packageName?: string };
  };
  decision: { choose: string; reconsider: string };
};

export const EDITORIAL_PROFILES: Record<string, EditorialProfile> = {
  radix: {
    visual: {
      heading: "Behavior-first primitives with no imposed visual language",
      palette: [{ name: "Neutral", value: "#111113" }, { name: "Canvas", value: "#FFFFFF" }, { name: "Violet", value: "#6E56CF" }, { name: "Muted", value: "#8B8D98" }],
      typeface: "Your product typeface",
      typeNote: "Radix Primitives are unstyled, so typography and brand expression remain yours.",
      density: "Composable by design",
      densityNote: "Small component parts expose behavior without locking teams into a surface style.",
    },
    components: [
      { name: "Dialog", tag: "Focus management", note: "Study modal and non-modal behavior, focus trapping, dismissal, and accessible labelling.", href: "https://www.radix-ui.com/primitives/docs/components/dialog" },
      { name: "Dropdown Menu", tag: "Composite navigation", note: "A strong reference for submenus, typeahead, keyboard movement, and collision handling.", href: "https://www.radix-ui.com/primitives/docs/components/dropdown-menu" },
      { name: "Select", tag: "Form control", note: "Useful for understanding custom selection without losing expected keyboard behavior.", href: "https://www.radix-ui.com/primitives/docs/components/select" },
      { name: "Tooltip", tag: "Context", note: "Shows how delayed hover, focus, portals, and positioning can work as a reusable primitive.", href: "https://www.radix-ui.com/primitives/docs/components/tooltip" },
    ],
    patterns: [
      { name: "Accessible interaction", useWhen: "You need custom controls with predictable keyboard and screen-reader behavior.", learn: "How WAI-ARIA semantics, focus management, labels, and keyboard navigation fit together.", href: "https://www.radix-ui.com/primitives/docs/overview/accessibility" },
      { name: "Component composition", useWhen: "Your design system needs to wrap primitives without losing control over rendered elements.", learn: "How open parts and asChild support flexible APIs instead of rigid component shells.", href: "https://www.radix-ui.com/primitives/docs/guides/composition" },
      { name: "Incremental adoption", useWhen: "A mature product cannot replace its component layer all at once.", learn: "How independently adoptable, tree-shakeable primitives can be introduced one workflow at a time.", href: "https://www.radix-ui.com/primitives/docs/overview/introduction" },
    ],
    audience: {
      design: { title: "Design on top of Radix", description: "Treat Radix as an interaction foundation, then define your own tokens, visual states, content rules, and brand expression.", facts: [["Visual system", "Not included"], ["Interaction states", "Documented"], ["Accessibility", "WAI-ARIA patterns"], ["Adoption", "Incremental"]], links: [{ label: "Accessibility", href: "https://www.radix-ui.com/primitives/docs/overview/accessibility" }, { label: "Styling guide", href: "https://www.radix-ui.com/primitives/docs/guides/styling" }] },
      developer: { title: "Build with Radix", description: "Use typed, unstyled React primitives as the behavior layer beneath product-specific components.", facts: [["Primary package", "radix-ui"], ["Framework", "React"], ["Control model", "Controlled or uncontrolled"], ["Distribution", "Tree-shakeable"]], links: [{ label: "Getting started", href: "https://www.radix-ui.com/primitives/docs/overview/getting-started" }, { label: "API overview", href: "https://www.radix-ui.com/primitives/docs/overview/introduction" }], packageName: "radix-ui" },
    },
    decision: { choose: "You need accessible behavior and composability while retaining complete control over styling and component APIs.", reconsider: "You need a finished visual system, product templates, or broad non-React implementation support out of the box." },
  },
  "fluent-ui": {
    visual: {
      heading: "A layered, adaptable language for Microsoft-scale products",
      palette: [{ name: "Brand", value: "#0F6CBD" }, { name: "Neutral 100", value: "#242424" }, { name: "Canvas", value: "#FFFFFF" }, { name: "Danger", value: "#D13438" }],
      typeface: "Segoe UI",
      typeNote: "A platform-aware type system prioritizes familiarity, hierarchy, and legibility.",
      density: "Adaptive and layered",
      densityNote: "Tokens support light, dark, high-contrast, and branded experiences across platforms.",
    },
    components: [
      { name: "Dialog", tag: "Focused tasks", note: "Detailed modal, non-modal, and alert guidance covers focus, dismissal, layout, and content.", href: "https://fluent2.microsoft.design/components/web/react/core/dialog/usage" },
      { name: "DataGrid", tag: "Structured data", note: "A useful reference for interactive tabular information, selection, focus, and keyboard navigation.", href: "https://fluent2.microsoft.design/components/web/react/core/datagrid/usage" },
      { name: "Field", tag: "Forms", note: "Study label, hint, validation, required, and disabled states around form controls.", href: "https://fluent2.microsoft.design/components/web/react/core/field/usage" },
      { name: "Toast", tag: "Feedback", note: "Guidance distinguishes passive updates from interruptions that require a decision.", href: "https://fluent2.microsoft.design/components/web/react/core/toast/usage" },
    ],
    patterns: [
      { name: "Inclusive foundations", useWhen: "Products must support keyboard, assistive technology, zoom, and high-contrast preferences.", learn: "How structure, focus, contrast, content, and responsive layouts work as one accessibility baseline.", href: "https://fluent2.microsoft.design/accessibility" },
      { name: "Semantic theming", useWhen: "One system must support multiple brands, modes, and operating contexts.", learn: "How global and alias token layers separate raw values from design intent.", href: "https://fluent2.microsoft.design/design-tokens" },
      { name: "Interaction states", useWhen: "Controls need consistent rest, hover, pressed, selected, and disabled treatment.", learn: "How color tokens and non-color indicators create predictable feedback.", href: "https://fluent2.microsoft.design/color" },
    ],
    audience: {
      design: { title: "Design with Fluent", description: "Use the Fluent 2 kits and token language to create accessible experiences that can adapt across Microsoft platforms and brands.", facts: [["Typeface", "Segoe UI"], ["Token layers", "Global and alias"], ["Modes", "Light, dark, high contrast"], ["Accessibility", "WCAG 2.1 AA baseline"]], links: [{ label: "Design tokens", href: "https://fluent2.microsoft.design/design-tokens" }, { label: "Accessibility", href: "https://fluent2.microsoft.design/accessibility" }] },
      developer: { title: "Build with Fluent", description: "Choose the current Fluent 2 implementation for your platform and use tokens rather than hard-coded visual values.", facts: [["Web", "React and Web Components"], ["Mobile", "iOS and Android"], ["Windows", "Platform implementation"], ["Theming", "Token driven"]], links: [{ label: "Developer guide", href: "https://fluent2.microsoft.design/get-started/develop" }, { label: "Component guidance", href: "https://fluent2.microsoft.design/components/web/react/core/" }] },
    },
    decision: { choose: "You are building Microsoft-aligned, cross-platform, enterprise software and need strong accessibility and theming foundations.", reconsider: "Your product needs a highly distinct visual identity or you cannot absorb platform-specific packages and migration work." },
  },
  "shadcn-ui": {
    visual: {
      heading: "Strong defaults delivered as source code you own",
      palette: [{ name: "Foreground", value: "#18181B" }, { name: "Background", value: "#FAFAFA" }, { name: "Muted", value: "#71717A" }, { name: "Border", value: "#E4E4E7" }],
      typeface: "Configurable",
      typeNote: "Themes, fonts, radius, spacing, and component structure can be rewritten by presets.",
      density: "Preset controlled",
      densityNote: "Styles range from roomy and soft to compact, dense, and sharply structured.",
    },
    components: [
      { name: "Data Table", tag: "Composition", note: "A practical example of assembling sorting, filtering, pagination, visibility, and row actions.", href: "https://ui.shadcn.com/docs/components/data-table" },
      { name: "Dialog", tag: "Overlay", note: "Source-owned dialog composition makes styling and behavior changes explicit in your codebase.", href: "https://ui.shadcn.com/docs/components/dialog" },
      { name: "Form", tag: "Validation", note: "Study accessible field composition with validation libraries, labels, descriptions, and errors.", href: "https://ui.shadcn.com/docs/components/form" },
      { name: "Command", tag: "Fast navigation", note: "A useful base for command menus, searchable actions, and keyboard-first selection.", href: "https://ui.shadcn.com/docs/components/command" },
    ],
    patterns: [
      { name: "Own the component source", useWhen: "Your team wants full control instead of adapting a sealed package API.", learn: "How registry-delivered source makes local composition and change explicit.", href: "https://ui.shadcn.com/docs" },
      { name: "Semantic theming", useWhen: "A product needs brand colors, dark mode, and adjustable radius without restyling every component.", learn: "How CSS variables connect semantic roles to component styling.", href: "https://ui.shadcn.com/docs/theming" },
      { name: "Product blocks", useWhen: "Teams need composed starting points for dashboards, authentication, sidebars, and forms.", learn: "How components combine into reusable product-level arrangements.", href: "https://ui.shadcn.com/blocks" },
    ],
    audience: {
      design: { title: "Shape your own Shadcn system", description: "Use the defaults as a starting point, then deliberately choose typography, radius, density, colors, and interaction tone.", facts: [["Theme model", "CSS variables or utilities"], ["Styles", "Multiple presets"], ["Dark mode", "Supported"], ["Ownership", "Local source"]], links: [{ label: "Theming", href: "https://ui.shadcn.com/docs/theming" }, { label: "Components", href: "https://ui.shadcn.com/docs/components" }] },
      developer: { title: "Build with Shadcn/ui", description: "Use the CLI or registry to add only the source you need, then maintain that code as part of your application.", facts: [["Distribution", "Copied source"], ["Styling", "Tailwind CSS"], ["Primitives", "Base UI or Radix"], ["Configuration", "components.json"]], links: [{ label: "Installation", href: "https://ui.shadcn.com/docs/installation" }, { label: "components.json", href: "https://ui.shadcn.com/docs/components-json" }] },
    },
    decision: { choose: "You want polished accessible starting points, Tailwind-based styling, and full ownership of component source.", reconsider: "You want centralized package upgrades, strict cross-product governance, or a component library your team does not maintain locally." },
  },
  "semrush-intergalactic-design-system": {
    visual: {
      heading: "A compact data-product language built around charts and tables",
      palette: [{ name: "Primary", value: "#8649E1" }, { name: "Accent", value: "#FF642D" }, { name: "Text", value: "#191B23" }, { name: "Surface", value: "#F4F5F9" }],
      typeface: "Inter",
      typeNote: "Readable 14px and 16px body sizes support dense analytical interfaces.",
      density: "Data first",
      densityNote: "A 12-column grid, compact controls, tables, and chart tokens prioritize scanning and comparison.",
    },
    components: [
      { name: "DataTable", tag: "Dense data", note: "A central reference for sortable, selectable, and stateful analytical tables.", href: "https://developer.semrush.com/intergalactic/table-group/data-table/data-table" },
      { name: "Card", tag: "Widget composition", note: "Guidance covers headers, descriptions, controls, chart content, and section spacing.", href: "https://developer.semrush.com/intergalactic/components/card/card" },
      { name: "Filter Search", tag: "Data filtering", note: "Shows dynamic and submitted search behavior inside complex filter workflows.", href: "https://developer.semrush.com/intergalactic/filter-group/filter-search/filter-search" },
      { name: "Feedback Form", tag: "Product feedback", note: "A composed pattern for collecting feedback with content, privacy, and action guidance.", href: "https://developer.semrush.com/intergalactic/components/feedback-form/feedback-form" },
    ],
    patterns: [
      { name: "Table states", useWhen: "Large datasets can be loading, empty, limited, partially unavailable, or fail.", learn: "How to keep layouts stable and explain loading, empty, locked, and error states in context.", href: "https://developer.semrush.com/intergalactic/table-group/table-states/table-states" },
      { name: "Design-token theming", useWhen: "Components and charts need consistent semantic color, spacing, radius, and motion values.", learn: "How base and semantic tokens support global themes and shared data visualization choices.", href: "https://developer.semrush.com/intergalactic/style/design-tokens/design-tokens" },
      { name: "Data-product layout", useWhen: "Desktop analytical tools need predictable grids, breakpoints, charts, and table controls.", learn: "How Intergalactic prioritizes usefulness, simplicity, and data over decorative UI.", href: "https://developer.semrush.com/intergalactic/get-started-guide/dis-starter-guide/dis-starter-guide" },
    ],
    audience: {
      design: { title: "Design analytical products", description: "Start with data, use the 12-column grid, and treat tables and charts as primary product surfaces.", facts: [["Typeface", "Inter"], ["Layout", "12 columns"], ["Core strength", "Data visualization"], ["Tokens", "Base and semantic"]], links: [{ label: "Designer guide", href: "https://developer.semrush.com/intergalactic/get-started-guide/dis-starter-guide/dis-starter-guide" }, { label: "Design tokens", href: "https://developer.semrush.com/intergalactic/style/design-tokens/design-tokens" }] },
      developer: { title: "Build with Intergalactic", description: "Use the React package, composable component parts, and semantic tokens for dense product interfaces.", facts: [["Framework", "React"], ["Components", "70+ documented"], ["Charts", "D3-based library"], ["Package", "intergalactic"]], links: [{ label: "Developer guide", href: "https://developer.semrush.com/intergalactic/get-started-guide/dev-starter-guide/dev-starter-guide" }, { label: "GitHub", href: "https://github.com/semrush/intergalactic" }] },
    },
    decision: { choose: "You are building dense analytical software and need mature tables, charts, filters, tokens, and data-state guidance.", reconsider: "Your product is content-led, mobile-first, or outside React and would use little of the system’s analytical depth." },
  },
  "siemens-ix": {
    visual: {
      heading: "An industrial interface language for complex operational work",
      palette: [{ name: "Siemens teal", value: "#009999" }, { name: "Deep blue", value: "#000028" }, { name: "Canvas", value: "#FFFFFF" }, { name: "Critical", value: "#E30030" }],
      typeface: "Siemens Sans",
      typeNote: "Clear hierarchy and legibility support long-running industrial and operational tasks.",
      density: "Structured and operational",
      densityNote: "Application frames, data grids, status signals, and compact controls support complex workflows.",
    },
    components: [
      { name: "Application frame", tag: "Product shell", note: "A modular structure for application identity, navigation, settings, and content hierarchy.", href: "https://ix.siemens.io/docs/components/overview" },
      { name: "Data Grid", tag: "Operational data", note: "AG Grid integration covers sorting, filtering, selection, editing, grouping, and responsive overflow.", href: "https://ix.siemens.io/docs/components/grid/guide" },
      { name: "Modal", tag: "Focused workflows", note: "Detailed sizing, overflow, focus, dismissal, and responsive guidance for complex tasks.", href: "https://ix.siemens.io/docs/components/modal/guide" },
      { name: "Date time picker", tag: "Industrial input", note: "Strong localization, range, keyboard, formatting, validation, and precision guidance.", href: "https://ix.siemens.io/docs/components/date-time-picker/guide" },
    ],
    patterns: [
      { name: "Industrial application shell", useWhen: "A product needs persistent identity, navigation, legal information, and operational content.", learn: "How application-level components establish a modular but consistent product frame.", href: "https://ix.siemens.io/docs/components/overview" },
      { name: "Accessible operations", useWhen: "Interfaces must remain usable across devices, abilities, and long-running workflows.", learn: "How baseline component support and product-level responsibility combine toward WCAG AA.", href: "https://ix.siemens.io/docs/guidelines/accessibility/overview" },
      { name: "Complex data interaction", useWhen: "Users need to compare, filter, select, edit, and inspect large datasets.", learn: "How to separate row selection, detail navigation, sorting, and secondary actions.", href: "https://ix.siemens.io/docs/components/grid/guide" },
    ],
    audience: {
      design: { title: "Design industrial experiences", description: "Use the maintained Figma assets, application structures, content guidance, and inclusive principles for operational products.", facts: [["Context", "Industrial products"], ["Design kit", "Figma"], ["Icon set", "500+ icons"], ["Accessibility", "WCAG AA goal"]], links: [{ label: "System overview", href: "https://ix.siemens.io/docs/introduction" }, { label: "Accessibility", href: "https://ix.siemens.io/docs/guidelines/accessibility/overview" }] },
      developer: { title: "Build with Siemens iX", description: "Use maintained packages across Angular, React, Web Components, and Vue with shared design tokens and Figma assets.", facts: [["Stable frameworks", "Angular, React, Web Components"], ["Vue", "Experimental"], ["Grid", "AG Grid integration"], ["Current generation", "Version 5"]], links: [{ label: "Components", href: "https://ix.siemens.io/docs/components/overview" }, { label: "GitHub", href: "https://github.com/siemens/ix" }] },
    },
    decision: { choose: "You are building industrial, operational, or engineering software and need application shells, data-heavy controls, and multiple framework packages.", reconsider: "Your product is a lightweight consumer experience or cannot accommodate a system with strong Siemens and industrial conventions." },
  },
};
