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
  patternfly: {
    visual: {
      heading: "An enterprise language built for dense, operational products",
      palette: [{ name: "Brand blue", value: "#0066CC" }, { name: "Text", value: "#151515" }, { name: "Canvas", value: "#FFFFFF" }, { name: "Danger", value: "#C9190B" }],
      typeface: "Red Hat Text",
      typeNote: "A practical type scale supports compact controls, long-form guidance, and information-heavy screens.",
      density: "Dense and structured",
      densityNote: "Layouts, tables, navigation, and status treatments are tuned for enterprise administration workflows.",
    },
    components: [
      { name: "Table", tag: "Structured data", note: "Study sortable columns, selection, expansion, responsive behavior, and accessibility in data-heavy views.", href: "https://www.patternfly.org/components/table" },
      { name: "Wizard", tag: "Guided workflows", note: "A mature reference for multi-step tasks, progress, navigation, validation, and responsive layouts.", href: "https://www.patternfly.org/components/wizard" },
      { name: "Empty state", tag: "Recovery", note: "Shows how status, explanation, primary action, and supporting links form a useful blank state.", href: "https://www.patternfly.org/components/empty-state" },
      { name: "Page", tag: "Application shell", note: "Combines masthead, navigation, sidebars, sticky regions, and accessible main-content focus.", href: "https://www.patternfly.org/components/page" },
    ],
    patterns: [
      { name: "Primary-detail", useWhen: "Users need to browse a collection while retaining context for the selected item.", learn: "How list and detail panes coordinate selection, responsive behavior, and information hierarchy.", href: "https://www.patternfly.org/patterns/primary-detail" },
      { name: "Dashboard", useWhen: "An enterprise product needs an overview of status, activity, and key metrics.", learn: "How cards, charts, filters, and responsive layouts combine without losing scanability.", href: "https://www.patternfly.org/patterns/dashboard" },
      { name: "Status and severity", useWhen: "Operational products must communicate health, risk, and urgency consistently.", learn: "How labels, icons, color, and language reinforce meaning without relying on color alone.", href: "https://www.patternfly.org/patterns/status-and-severity" },
    ],
    audience: {
      design: { title: "Design enterprise products", description: "Use the PatternFly 6 Figma kit, tokens, foundations, patterns, and content guidance for complex product workflows.", facts: [["Current generation", "PatternFly 6"], ["Design kit", "Public Figma library"], ["Core strength", "Enterprise workflows"], ["Content guidance", "Included"]], links: [{ label: "Design with PatternFly", href: "https://www.patternfly.org/get-started/design" }, { label: "Patterns", href: "https://www.patternfly.org/patterns/overview" }] },
      developer: { title: "Build with PatternFly", description: "Use the React library or HTML/CSS implementation with shared tokens, layouts, extensions, and migration guidance.", facts: [["Primary framework", "React"], ["Foundation", "HTML and CSS"], ["Package", "@patternfly/react-core"], ["License", "MIT"]], links: [{ label: "Develop with PatternFly", href: "https://www.patternfly.org/get-started/develop" }, { label: "Upgrade guide", href: "https://www.patternfly.org/get-started/upgrade" }], packageName: "@patternfly/react-core" },
    },
    decision: { choose: "You are building a complex enterprise or developer product and need strong data, navigation, workflow, accessibility, and content guidance.", reconsider: "You need a lightweight consumer aesthetic or a system whose visual language can be radically changed with little adaptation." },
  },
  "sumup-circuit": {
    visual: {
      heading: "A friendly commerce language grounded in accessible defaults",
      palette: [{ name: "Brand", value: "#306CFE" }, { name: "Text", value: "#0F131A" }, { name: "Canvas", value: "#FFFFFF" }, { name: "Success", value: "#018850" }],
      typeface: "Roobert",
      typeNote: "Large, direct headings and highly legible body styles give payment flows a confident, approachable tone.",
      density: "Touch-friendly",
      densityNote: "Generous controls, clear hierarchy, and responsive layouts support commerce across desktop and mobile.",
    },
    components: [
      { name: "Input", tag: "Forms", note: "A useful reference for labels, validation, help text, prefixes, suffixes, and constrained financial input.", href: "https://circuit.sumup.com/?path=/docs/forms-input--docs" },
      { name: "Modal", tag: "Focused tasks", note: "Shows accessible focus handling and responsive presentation for short transactional decisions.", href: "https://circuit.sumup.com/?path=/docs/components-modal--docs" },
      { name: "Notification", tag: "Feedback", note: "Communicates neutral, success, warning, and error states with clear hierarchy and actions.", href: "https://circuit.sumup.com/?path=/docs/components-notification--docs" },
      { name: "Table", tag: "Commerce data", note: "A practical structure for comparing transactions and business records in compact views.", href: "https://circuit.sumup.com/?path=/docs/components-table--docs" },
    ],
    patterns: [
      { name: "Payment and commerce forms", useWhen: "Users must enter sensitive business or payment information with low error rates.", learn: "How clear labels, validation, input constraints, and action hierarchy support completion.", href: "https://circuit.sumup.com/" },
      { name: "Responsive product surfaces", useWhen: "The same workflow must work across handheld and desktop business contexts.", learn: "How responsive tokens and touch-friendly components preserve hierarchy at different widths.", href: "https://circuit.sumup.com/" },
      { name: "Multi-brand theming", useWhen: "Shared product behavior must support distinct brands or merchant contexts.", learn: "How token themes separate semantic intent from visual values.", href: "https://github.com/sumup-oss/circuit-ui/tree/main/packages/design-tokens" },
    ],
    audience: {
      design: { title: "Design inclusive commerce", description: "Use Circuit’s foundations and component assets to make payment and business tasks feel clear, friendly, and trustworthy.", facts: [["Context", "Payments and commerce"], ["Design assets", "Maintained by SumUp"], ["Accessibility", "Core requirement"], ["Themes", "Token based"]], links: [{ label: "Component library", href: "https://circuit.sumup.com/" }, { label: "Design tokens", href: "https://github.com/sumup-oss/circuit-ui/tree/main/packages/design-tokens" }] },
      developer: { title: "Build with Circuit", description: "Use typed React components, icons, tokens, themes, and testing guidance maintained in a single open repository.", facts: [["Framework", "React"], ["Language", "TypeScript"], ["Package", "@sumup-oss/circuit-ui"], ["License", "Apache 2.0"]], links: [{ label: "Documentation", href: "https://circuit.sumup.com/" }, { label: "GitHub", href: "https://github.com/sumup-oss/circuit-ui" }], packageName: "@sumup-oss/circuit-ui" },
    },
    decision: { choose: "You are building accessible commerce, payments, or small-business products in React and value friendly, mobile-ready defaults.", reconsider: "You need broad framework coverage, deep public content guidance, or a visual language far removed from SumUp’s brand." },
  },
  "salesforce-lightning-design-system": {
    visual: {
      heading: "A high-density enterprise language for Salesforce workflows",
      palette: [{ name: "Salesforce blue", value: "#0176D3" }, { name: "Text", value: "#181818" }, { name: "Canvas", value: "#FFFFFF" }, { name: "Error", value: "#BA0517" }],
      typeface: "Salesforce Sans",
      typeNote: "Compact, neutral typography keeps records, forms, and administrative workflows easy to scan.",
      density: "Information dense",
      densityNote: "Grids, record layouts, utility bars, and compact controls support long-running enterprise tasks.",
    },
    components: [
      { name: "Data Table", tag: "Records", note: "A central Salesforce reference for sorting, selection, inline actions, and large record sets.", href: "https://www.lightningdesignsystem.com/components/data-tables/" },
      { name: "Modal", tag: "Focused workflow", note: "Defines clear header, body, footer, focus, dismissal, and sizing conventions.", href: "https://www.lightningdesignsystem.com/components/modals/" },
      { name: "Path", tag: "Process status", note: "Makes a staged business process visible while exposing current and completed states.", href: "https://www.lightningdesignsystem.com/components/path/" },
      { name: "Global Header", tag: "Product shell", note: "Shows how identity, navigation, search, utilities, and account actions coexist at platform scale.", href: "https://www.lightningdesignsystem.com/components/global-header/" },
    ],
    patterns: [
      { name: "Record management", useWhen: "Users inspect and update many related business objects.", learn: "How tables, tabs, activity, related lists, and actions establish a predictable record workspace.", href: "https://www.lightningdesignsystem.com/components/data-tables/" },
      { name: "Progressive disclosure", useWhen: "Enterprise tasks contain more fields and actions than should appear at once.", learn: "How tabs, accordions, modals, and contextual actions reduce cognitive load.", href: "https://www.lightningdesignsystem.com/" },
      { name: "Semantic design tokens", useWhen: "A platform needs consistent styling that can evolve without rewriting every component.", learn: "How global styling hooks and component hooks express design intent.", href: "https://www.lightningdesignsystem.com/design-tokens/" },
    ],
    audience: {
      design: { title: "Design for Salesforce", description: "Use the current SLDS guidance and official Components for Web Figma kit for Salesforce-aligned enterprise experiences.", facts: [["Current direction", "SLDS 2"], ["Design kit", "Components for Web"], ["Core context", "Salesforce platform"], ["Density", "Enterprise"]], links: [{ label: "System documentation", href: "https://www.lightningdesignsystem.com/" }, { label: "Design tokens", href: "https://www.lightningdesignsystem.com/design-tokens/" }] },
      developer: { title: "Build with Lightning", description: "Use Lightning base components when working inside Salesforce, or the SLDS package for platform-aligned HTML and styling.", facts: [["Preferred platform UI", "Lightning base components"], ["Web framework", "Lightning Web Components"], ["CSS package", "@salesforce-ux/design-system"], ["Tokens", "Styling hooks"]], links: [{ label: "Developer guide", href: "https://developer.salesforce.com/docs/platform/lwc/guide/base-components-all.html" }, { label: "GitHub", href: "https://github.com/salesforce-ux/design-system" }], packageName: "@salesforce-ux/design-system" },
    },
    decision: { choose: "You are building on Salesforce or need its proven patterns for records, business processes, administrative data, and platform navigation.", reconsider: "You are outside the Salesforce ecosystem and need an independently branded, framework-native component library." },
  },
  "google-material-design": {
    visual: {
      heading: "An expressive, adaptive language spanning screens and platforms",
      palette: [{ name: "Primary", value: "#6750A4" }, { name: "On surface", value: "#1D1B20" }, { name: "Surface", value: "#FFFBFE" }, { name: "Error", value: "#B3261E" }],
      typeface: "Roboto",
      typeNote: "A role-based type scale pairs readable body styles with expressive display treatments.",
      density: "Adaptive",
      densityNote: "Window size classes, dynamic color, shape, and motion let the language respond across device categories.",
    },
    components: [
      { name: "Navigation suite", tag: "Adaptive navigation", note: "Compare bar, rail, and drawer behavior across compact, medium, and expanded windows.", href: "https://m3.material.io/components/navigation-bar/overview" },
      { name: "Button", tag: "Action hierarchy", note: "A strong reference for filled, tonal, outlined, elevated, and text action emphasis.", href: "https://m3.material.io/components/buttons/overview" },
      { name: "Text field", tag: "Forms", note: "Covers labels, supporting text, validation, icons, state layers, and accessible touch targets.", href: "https://m3.material.io/components/text-fields/overview" },
      { name: "Bottom sheet", tag: "Mobile disclosure", note: "Shows how supplementary actions and content can remain contextual on small screens.", href: "https://m3.material.io/components/bottom-sheets/overview" },
    ],
    patterns: [
      { name: "Adaptive layouts", useWhen: "One product spans phones, tablets, foldables, and large screens.", learn: "How window size classes and canonical layouts change composition rather than merely scale it.", href: "https://m3.material.io/foundations/layout" },
      { name: "Dynamic color", useWhen: "An experience should personalize its palette while preserving semantic roles and contrast.", learn: "How source colors generate coordinated light and dark color schemes.", href: "https://m3.material.io/styles/color/dynamic-color/overview" },
      { name: "Purposeful motion", useWhen: "Transitions need to explain hierarchy, continuity, and user action.", learn: "How easing, duration, spatial effects, and expressive motion create understandable change.", href: "https://m3.material.io/styles/motion/overview" },
    ],
    audience: {
      design: { title: "Design with Material 3", description: "Use the official Material 3 UI kit, Theme Builder, adaptive guidance, and expressive foundations to define a coherent cross-platform experience.", facts: [["Current generation", "Material 3"], ["Design kit", "Official Figma UI kit"], ["Color", "Dynamic schemes"], ["Layout", "Window size classes"]], links: [{ label: "Foundations", href: "https://m3.material.io/foundations" }, { label: "Material Theme Builder", href: "https://material-foundation.github.io/material-theme-builder/" }] },
      developer: { title: "Build with Material", description: "Choose the maintained implementation for Android, Jetpack Compose, Flutter, or Web Components rather than treating Material as one universal package.", facts: [["Android", "Views and Compose"], ["Cross-platform", "Flutter"], ["Web", "Material Web Components"], ["Tokens", "Material roles"]], links: [{ label: "Develop overview", href: "https://m3.material.io/develop" }, { label: "Material Web", href: "https://github.com/material-components/material-web" }], packageName: "@material/web" },
    },
    decision: { choose: "You need a deeply documented, adaptive cross-platform language with strong mobile patterns, theming, accessibility, and implementation options.", reconsider: "Your product needs a highly proprietary visual identity or a single web library with identical maturity across every framework." },
  },
  "telef-nica-m-stica": {
    visual: {
      heading: "A semantic multi-brand system for Telefónica’s digital products",
      palette: [{ name: "Movistar blue", value: "#019BE1" }, { name: "Text", value: "#0B2739" }, { name: "Canvas", value: "#FFFFFF" }, { name: "Error", value: "#B71C1C" }],
      typeface: "On Air Var",
      typeNote: "Brand skins can supply their own type choices while preserving shared semantic text roles.",
      density: "Mobile-led",
      densityNote: "Responsive layouts, generous targets, and native counterparts keep cross-platform consumer journeys aligned.",
    },
    components: [
      { name: "Text Field", tag: "Input", note: "A cross-platform form reference with semantic states, validation, formatting, and accessible labels.", href: "https://github.com/Telefonica/mistica-web/blob/master/doc/components.md" },
      { name: "Sheet", tag: "Mobile workflow", note: "Provides a responsive, focus-managed surface for choices and contextual tasks.", href: "https://github.com/Telefonica/mistica-web/blob/master/doc/sheet.md" },
      { name: "Card", tag: "Content grouping", note: "Shows composable, token-driven surfaces that adapt across brands and interaction contexts.", href: "https://github.com/Telefonica/mistica-web/blob/master/doc/patterns.md" },
      { name: "Navigation Bar", tag: "Product navigation", note: "A mobile-oriented reference for hierarchy, identity, actions, and safe-area behavior.", href: "https://github.com/Telefonica/mistica-web/blob/master/doc/components.md" },
    ],
    patterns: [
      { name: "Multi-brand skinning", useWhen: "One product foundation must serve Movistar, O2, Vivo, and other brands.", learn: "How semantic skin variables preserve component behavior while changing visual identity.", href: "https://github.com/Telefonica/mistica-web/blob/master/doc/theme-config.md" },
      { name: "Responsive composition", useWhen: "Journeys must remain coherent across web and native mobile applications.", learn: "How shared layout concepts and platform libraries align without forcing identical implementation.", href: "https://github.com/Telefonica/mistica-web/blob/master/doc/layout.md" },
      { name: "Form flows", useWhen: "Consumer account and telecom journeys require reliable, localized data entry.", learn: "How fields, validation, spacing, and fixed actions combine into complete forms.", href: "https://github.com/Telefonica/mistica-web/blob/master/doc/forms.md" },
    ],
    audience: {
      design: { title: "Design across Telefónica brands", description: "Use Mística’s shared foundations, semantic tokens, and component libraries to create coherent experiences without erasing individual brands.", facts: [["Brands", "Movistar, O2, Vivo and more"], ["Platforms", "Web, iOS, Android"], ["Theme model", "Semantic skins"], ["Direction", "Mobile led"]], links: [{ label: "Mística overview", href: "https://github.com/Telefonica/mistica" }, { label: "Design source", href: "https://github.com/Telefonica/mistica-design" }] },
      developer: { title: "Build with Mística", description: "Choose the maintained React, iOS, or Android implementation and configure the correct brand skin and localization.", facts: [["Web", "React"], ["Native", "iOS and Android"], ["Package", "@telefonica/mistica"], ["License", "Apache 2.0"]], links: [{ label: "Web documentation", href: "https://github.com/Telefonica/mistica-web/tree/master/doc" }, { label: "Components reference", href: "https://github.com/Telefonica/mistica-web/blob/master/doc/components.md" }], packageName: "@telefonica/mistica" },
    },
    decision: { choose: "You are building a Telefónica-family product or studying a mature multi-brand system shared across web, iOS, and Android.", reconsider: "You need a brand-neutral public system or a design kit and guidance that are fully accessible without Telefónica context." },
  },
  "twilio-paste": {
    visual: {
      heading: "An inclusive, composable language for communication products",
      palette: [{ name: "Twilio red", value: "#F22F46" }, { name: "Text", value: "#121C2D" }, { name: "Canvas", value: "#FFFFFF" }, { name: "Link", value: "#0263E0" }],
      typeface: "Whitney",
      typeNote: "A clear product type scale supports dense technical information while retaining Twilio’s approachable voice.",
      density: "Composable",
      densityNote: "Tokens, primitives, components, patterns, and full-page templates form an explicit hierarchy.",
    },
    components: [
      { name: "Combobox", tag: "Complex selection", note: "A strong accessible reference for search, asynchronous results, multi-select, and keyboard interaction.", href: "https://paste.twilio.design/components/combobox" },
      { name: "Data Grid", tag: "Structured data", note: "Composes table semantics with interactive controls for dense customer and operational data.", href: "https://paste.twilio.design/components/data-grid" },
      { name: "Modal", tag: "Focused tasks", note: "Uses accessible primitives for focus, labelling, dismissal, and action hierarchy.", href: "https://paste.twilio.design/components/modal" },
      { name: "Chat Composer", tag: "Communication", note: "A distinctive product component for message input, attachments, actions, and accessible composition.", href: "https://paste.twilio.design/components/chat-composer" },
    ],
    patterns: [
      { name: "Empty state", useWhen: "A product area has no content, no search matches, or cannot yet be used.", learn: "How illustration, explanation, recovery, and action hierarchy change by empty-state cause.", href: "https://paste.twilio.design/patterns/empty-state" },
      { name: "Notifications and feedback", useWhen: "Users need confirmation, status, warning, or error information at different levels of urgency.", learn: "How to select among alerts, toasts, inline messages, and dialogs.", href: "https://paste.twilio.design/patterns/notifications-and-feedback" },
      { name: "Object details", useWhen: "Users inspect and manage a technical resource with metadata, status, and related activity.", learn: "How a full-page template brings navigation, actions, tabs, and details into one reusable structure.", href: "https://paste.twilio.design/page-templates/object-details" },
    ],
    audience: {
      design: { title: "Design with Paste", description: "Use the public Figma libraries whose tokens, themes, components, and templates map directly to the React implementation.", facts: [["Design/code parity", "1-to-1 libraries"], ["Figma", "Public community files"], ["Accessibility target", "WCAG 2.1 AA"], ["Themes", "Variable modes"]], links: [{ label: "Design guidelines", href: "https://paste.twilio.design/introduction/for-designers/design-guidelines" }, { label: "Patterns", href: "https://paste.twilio.design/patterns" }] },
      developer: { title: "Build with Paste", description: "Compose typed React components and functional primitives under a semantic theme, then use patterns and templates for product-level consistency.", facts: [["Framework", "React"], ["Language", "TypeScript"], ["Package", "@twilio-paste/core"], ["Styling", "Token and theme driven"]], links: [{ label: "Engineer quick start", href: "https://paste.twilio.design/introduction/for-engineers/quickstart" }, { label: "GitHub", href: "https://github.com/twilio-labs/paste" }], packageName: "@twilio-paste/core" },
    },
    decision: { choose: "You are building an accessible React product with technical workflows and want components, primitives, patterns, templates, and matching Figma assets.", reconsider: "You need non-React implementations or a documentation host guaranteed to remain unchanged after Paste’s announced site retirement." },
  },
  "shopify-polaris": {
    visual: {
      heading: "A calm commerce language designed around merchant work",
      palette: [{ name: "Shopify green", value: "#008060" }, { name: "Text", value: "#202223" }, { name: "Canvas", value: "#F6F6F7" }, { name: "Critical", value: "#D72C0D" }],
      typeface: "Inter",
      typeNote: "Compact, practical typography prioritizes product names, values, statuses, and task-oriented content.",
      density: "Task focused",
      densityNote: "Cards, lists, forms, filters, and contextual actions support daily commerce administration.",
    },
    components: [
      { name: "Index table", tag: "Resource management", note: "A defining Polaris reference for selecting, sorting, filtering, and acting on merchant resources.", href: "https://polaris-react.shopify.com/components/tables/index-table" },
      { name: "Resource list", tag: "Browsable content", note: "Combines identity, metadata, status, and bulk selection in a responsive list.", href: "https://polaris-react.shopify.com/components/lists/resource-list" },
      { name: "Form layout", tag: "Forms", note: "Establishes readable widths, field grouping, help, and vertical rhythm for administrative input.", href: "https://polaris-react.shopify.com/components" },
      { name: "Contextual save bar", tag: "Unsaved changes", note: "Keeps save and discard actions visible when edits affect the current resource.", href: "https://polaris-react.shopify.com/components" },
    ],
    patterns: [
      { name: "Resource administration", useWhen: "Merchants browse, filter, select, and update products, orders, or customers.", learn: "How pages, index tables, filters, bulk actions, and status badges form a repeatable workflow.", href: "https://polaris.shopify.com/patterns" },
      { name: "Actionable content", useWhen: "Interface copy must help merchants make confident business decisions.", learn: "How plain language, sentence case, labels, errors, and calls to action reduce ambiguity.", href: "https://polaris.shopify.com/content" },
      { name: "Embedded app structure", useWhen: "A third-party app should feel coherent inside Shopify Admin.", learn: "How page structure, navigation, actions, and App Bridge align an app with the host platform.", href: "https://shopify.dev/docs/api/app-home/polaris-web-components" },
    ],
    audience: {
      design: { title: "Design for merchants", description: "Use Polaris foundations and commerce patterns to keep complex business tasks understandable, efficient, and consistent with Shopify.", facts: [["Primary context", "Commerce administration"], ["Content standards", "Extensive"], ["Core workflow", "Resource management"], ["Brand", "Shopify aligned"]], links: [{ label: "Foundations", href: "https://polaris.shopify.com/foundations" }, { label: "Patterns", href: "https://polaris.shopify.com/patterns" }] },
      developer: { title: "Build Shopify experiences", description: "For current Shopify apps, follow Shopify’s platform guidance and Polaris web components; treat the archived React docs as a reference where appropriate.", facts: [["Current app UI", "Polaris web components"], ["Legacy library", "Polaris React"], ["Host integration", "Shopify App Bridge"], ["Context", "Shopify Admin"]], links: [{ label: "App Home UI", href: "https://shopify.dev/docs/api/app-home" }, { label: "Polaris repository", href: "https://github.com/Shopify/polaris" }] },
    },
    decision: { choose: "You are building Shopify or commerce administration experiences and need mature resource-management, form, content, and workflow conventions.", reconsider: "You are building an unrelated consumer product or need a framework-neutral library that is independent of Shopify’s evolving app platform." },
  },
  "u-s-web-design-standards": {
    visual: {
      heading: "A trustworthy, accessible language for U.S. public services",
      palette: [{ name: "Primary", value: "#005EA8" }, { name: "Ink", value: "#1B1B1B" }, { name: "Canvas", value: "#FFFFFF" }, { name: "Emergency", value: "#9C3D10" }],
      typeface: "Public Sans",
      typeNote: "A broad, legible family supports government content across devices, languages, and reading conditions.",
      density: "Content forward",
      densityNote: "Plain layouts, strong focus, generous targets, and progressive enhancement prioritize resilient access.",
    },
    components: [
      { name: "Banner", tag: "Trust", note: "A distinctive pattern that helps people identify official government sites and secure connections.", href: "https://designsystem.digital.gov/components/banner/" },
      { name: "Step indicator", tag: "Long services", note: "Makes progress and position clear across complex government applications.", href: "https://designsystem.digital.gov/components/step-indicator/" },
      { name: "Combo box", tag: "Large selection", note: "Supports searchable choice while preserving keyboard and assistive-technology behavior.", href: "https://designsystem.digital.gov/components/combo-box/" },
      { name: "Identifier", tag: "Site identity", note: "Standardizes agency identity, required links, and public-service context at the page footer.", href: "https://designsystem.digital.gov/components/identifier/" },
    ],
    patterns: [
      { name: "Complete a complex form", useWhen: "A public service asks for substantial personal or eligibility information.", learn: "How to structure steps, explain requirements, validate input, and preserve trust.", href: "https://designsystem.digital.gov/patterns/complete-a-complex-form/" },
      { name: "Select a language", useWhen: "People need to access essential services in their preferred language.", learn: "How placement, naming, native-language labels, and persistence support multilingual access.", href: "https://designsystem.digital.gov/patterns/select-a-language/" },
      { name: "Create a user profile", useWhen: "A service needs identity or account information while minimizing unnecessary collection.", learn: "How to explain purpose, request only necessary data, and protect privacy.", href: "https://designsystem.digital.gov/patterns/create-a-user-profile/" },
    ],
    audience: {
      design: { title: "Design inclusive public services", description: "Use evidence-based components and patterns, accessibility guidance, and configurable tokens while preserving the identity of each agency.", facts: [["Primary context", "U.S. federal services"], ["Accessibility", "Section 508 and WCAG informed"], ["Approach", "Mobile friendly"], ["Research", "Pattern guidance"]], links: [{ label: "Design principles", href: "https://designsystem.digital.gov/design-principles/" }, { label: "Patterns", href: "https://designsystem.digital.gov/patterns/" }] },
      developer: { title: "Build with USWDS", description: "Start with semantic HTML, add Sass and JavaScript progressively, and configure tokens and packages for the service rather than editing library files.", facts: [["Foundation", "HTML"], ["Styling", "Sass and CSS"], ["Behavior", "Progressive JavaScript"], ["Package", "@uswds/uswds"]], links: [{ label: "Developer documentation", href: "https://designsystem.digital.gov/documentation/developers/" }, { label: "Packages", href: "https://designsystem.digital.gov/components/packages/" }], packageName: "@uswds/uswds" },
    },
    decision: { choose: "You are building a U.S. government or public-service website and need resilient, accessible components plus task-level guidance.", reconsider: "You need an application framework, native-mobile components, or a visual language intended for entertainment or premium consumer branding." },
  },
  "vmware-clarity-design-system": {
    visual: {
      heading: "A pragmatic enterprise language for technical products",
      palette: [{ name: "Action blue", value: "#0072A3" }, { name: "Text", value: "#1B2A32" }, { name: "Canvas", value: "#FFFFFF" }, { name: "Danger", value: "#C92100" }],
      typeface: "Metropolis",
      typeNote: "Clear hierarchy and compact labels support technical terminology and long-running administrative tasks.",
      density: "Enterprise compact",
      densityNote: "Data grids, trees, vertical navigation, and layered forms favor information density and scanability.",
    },
    components: [
      { name: "Datagrid", tag: "Structured data", note: "Clarity’s signature reference for sorting, filtering, pagination, selection, expansion, and server-driven data.", href: "https://clarity.design/documentation/datagrid" },
      { name: "Wizard", tag: "Complex setup", note: "Structures long configuration tasks with progress, validation, cancellation, and responsive behavior.", href: "https://clarity.design/documentation/wizards" },
      { name: "Vertical Nav", tag: "Application shell", note: "A compact model for hierarchical navigation, icons, grouping, collapse, and active state.", href: "https://clarity.design/documentation/vertical-nav" },
      { name: "Tree View", tag: "Hierarchy", note: "Represents nested technical objects with expansion, selection, and accessible structure.", href: "https://clarity.design/documentation/tree-view" },
    ],
    patterns: [
      { name: "Data-heavy administration", useWhen: "Users manage infrastructure, permissions, resources, or other large technical datasets.", learn: "How grids, filters, pagination, detail panes, and batch actions support efficient operation.", href: "https://clarity.design/documentation/datagrid" },
      { name: "Platform navigation", useWhen: "A product contains many technical areas and nested destinations.", learn: "How headers, vertical navigation, sub-navigation, and content regions establish location.", href: "https://clarity.design/documentation/app-layout" },
      { name: "Theme through tokens", useWhen: "Products need light, dark, or brand-specific visual values without changing component structure.", learn: "How design tokens and CSS custom properties separate semantics from implementation.", href: "https://clarity.design/documentation/design-tokens" },
    ],
    audience: {
      design: { title: "Design technical enterprise tools", description: "Use Clarity’s foundations and behavioral guidance for dense workflows, configuration, navigation, and data management.", facts: [["Core strength", "Enterprise data"], ["Themes", "Light and dark"], ["Icons", "Clarity Icons"], ["Design assets", "Public resources"]], links: [{ label: "Design foundations", href: "https://clarity.design/foundation" }, { label: "Components", href: "https://clarity.design/documentation" }] },
      developer: { title: "Build with Clarity", description: "Choose framework-neutral Core web components or the Angular implementation, and consume tokens for controlled customization.", facts: [["Core", "Web Components"], ["Framework package", "Angular"], ["Interoperability", "React and Vue wrappers possible"], ["Package", "@cds/core"]], links: [{ label: "Getting started", href: "https://clarity.design/get-started" }, { label: "GitHub", href: "https://github.com/vmware-clarity/core" }], packageName: "@cds/core" },
    },
    decision: { choose: "You are building a dense technical or enterprise product and need strong data grids, navigation, forms, icons, and framework-neutral components.", reconsider: "You need a consumer-first visual style, native-mobile libraries, or extensive public product-pattern documentation." },
  },
  "contentful-forma-36": {
    visual: {
      heading: "A crisp system for building and extending content products",
      palette: [{ name: "Primary", value: "#0059C8" }, { name: "Text", value: "#111B2B" }, { name: "Canvas", value: "#FFFFFF" }, { name: "Negative", value: "#DA294A" }],
      typeface: "System UI",
      typeNote: "Platform-native fonts load quickly, cover broad character sets, and feel familiar in content-management workflows.",
      density: "Editorial and operational",
      densityNote: "Compact entities, tables, forms, and editor controls support structured-content work without visual noise.",
    },
    components: [
      { name: "Entity List", tag: "Content records", note: "A purpose-built reference for displaying content entities, metadata, status, and actions.", href: "https://f36.contentful.com/components/entity-list" },
      { name: "Autocomplete", tag: "Large selection", note: "Supports searchable and asynchronous choices with accessible keyboard interaction.", href: "https://f36.contentful.com/components/autocomplete" },
      { name: "Modal", tag: "Focused tasks", note: "Provides predictable sizing, focus, content regions, and actions for content operations.", href: "https://f36.contentful.com/components/modal" },
      { name: "Workbench", tag: "Product shell", note: "Structures Contentful extensions with headers, sidebars, content, and responsive constraints.", href: "https://f36.contentful.com/components/workbench" },
    ],
    patterns: [
      { name: "Content entity management", useWhen: "Users browse, inspect, edit, and relate structured content objects.", learn: "How entity lists, cards, status, menus, and metadata support content operations.", href: "https://f36.contentful.com/components/entity-list" },
      { name: "Accessible extension UI", useWhen: "An app or extension must feel native inside the Contentful product.", learn: "How shared components, tokens, assets, and App Framework conventions reduce interface drift.", href: "https://f36.contentful.com/introduction/getting-started" },
      { name: "Lifecycle-aware adoption", useWhen: "Production teams need to understand whether a component is experimental or safe to adopt.", learn: "How alpha, beta, stable, and deprecated labels communicate component maturity.", href: "https://f36.contentful.com/guidelines/component-statuses" },
    ],
    audience: {
      design: { title: "Design Contentful extensions", description: "Use the official Forma 36 Components, Tokens, and Assets Figma libraries to prototype interfaces that map to production React components.", facts: [["Figma libraries", "Components, Tokens, Assets"], ["Primary context", "Contentful products"], ["Typography", "System UI"], ["Accessibility", "Documented"]], links: [{ label: "Figma libraries", href: "https://www.figma.com/@contentful" }, { label: "Component statuses", href: "https://f36.contentful.com/guidelines/component-statuses" }] },
      developer: { title: "Build with Forma 36", description: "Use the tree-shakeable React package, separate icon package, tokens, and App Framework guidance for Contentful integrations.", facts: [["Framework", "React"], ["Package", "@contentful/f36-components"], ["Icons", "@contentful/f36-icons"], ["License", "MIT"]], links: [{ label: "Getting started", href: "https://f36.contentful.com/introduction/getting-started" }, { label: "GitHub", href: "https://github.com/contentful/forma-36" }], packageName: "@contentful/f36-components" },
    },
    decision: { choose: "You are building a Contentful app, extension, or content-heavy React product and want aligned Figma assets, components, tokens, and status guidance.", reconsider: "You need non-React implementations, broad consumer patterns, or a brand-neutral system independent of Contentful conventions." },
  },
};
