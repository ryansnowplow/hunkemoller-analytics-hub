export interface GuideSection {
  id: string;
  title: string;
  icon: string;
  steps: GuideStep[];
}

export interface GuideStep {
  title: string;
  description: string;
  substeps?: string[];
  tip?: string;
}

export const dashboardGuideSections: GuideSection[] = [
  {
    id: 'creating',
    title: 'Creating a New Dashboard',
    icon: 'PlusCircle',
    steps: [
      {
        title: 'From the Create button',
        description: 'The most common way to create a dashboard.',
        substeps: [
          'Click the Create button in the left navigation panel',
          'Select Dashboard from the menu',
          'Enter a dashboard name in the Name field',
          'Navigate to and select the desired folder (or create a new one)',
          'Click Create Dashboard',
        ],
      },
      {
        title: 'From a folder',
        description: 'Create a dashboard directly inside a specific folder.',
        substeps: [
          'Navigate to your target folder',
          'Click the New button (top right)',
          'Select Dashboard',
          'Enter a name and click Create Dashboard',
        ],
      },
      {
        title: 'From an Explore or Look',
        description: 'Convert your current query into a new dashboard.',
        substeps: [
          'Open a Look or Explore with the data you want',
          'Click Save from the actions menu',
          'Select "As new dashboard"',
          'Enter a title for both the tile and dashboard',
          'Choose your folder and filter preferences',
          'Click Save',
        ],
      },
      {
        title: 'Permissions required',
        description: 'You need "Manage Access, Edit" folder permissions, save_content and see_user_dashboards permissions, plus access to the relevant LookML models.',
        tip: 'If you cannot see the Create button, ask your Looker admin to check your permissions.',
      },
    ],
  },
  {
    id: 'tiles',
    title: 'Adding Tiles',
    icon: 'LayoutGrid',
    steps: [
      {
        title: 'Add a visualisation tile (query tile)',
        description: 'Build a chart or table directly inside the dashboard.',
        substeps: [
          'Enter edit mode on the dashboard',
          'Click Add then Visualization',
          'Select an Explore from the list',
          'Enter a tile name',
          'Use the field picker to select dimensions and measures',
          'Configure your visualization type and options',
          'Click Run to preview, then Save',
        ],
        tip: 'Query tiles are independent, so changes only affect this dashboard. Use these instead of Look-linked tiles unless you need the same query on multiple dashboards.',
      },
      {
        title: 'Add a tile from an Explore',
        description: 'Save your current Explore query to an existing dashboard.',
        substeps: [
          'Open an Explore and build your query',
          'Click Save then "Add to Dashboard"',
          'Enter a title, select the folder and dashboard',
          'Click "Save to Dashboard"',
        ],
      },
      {
        title: 'Add a Look-linked tile',
        description: 'Link a saved Look to the dashboard. The tile stays in sync with the Look.',
        substeps: [
          'Make sure the Look and dashboard are in the same folder',
          'Open the Look',
          'Click Save then "To an existing dashboard"',
          'Click "Add Look to Dashboard" (not "Save to Dashboard")',
        ],
        tip: 'If you update the Look later, all linked tiles on all dashboards will update automatically.',
      },
      {
        title: 'Add a text tile',
        description: 'Add headings, descriptions, or context to your dashboard.',
        substeps: [
          'Click Add then Text',
          'Type your content and use the formatting toolbar for styling',
          'Click Save',
        ],
      },
      {
        title: 'Add a Markdown tile',
        description: 'Add rich content using Markdown and limited HTML.',
        substeps: [
          'Click Add then Markdown',
          'Add an optional title, subtitle, and body text',
          'The body supports a limited Markdown subset',
          'Click Save',
        ],
      },
      {
        title: 'Add a button',
        description: 'Add a clickable button that links to an internal or external URL.',
        substeps: [
          'Click Add then Button',
          'In the Content tab, enter the button label and link URL',
          'Add an optional hover description',
          'Toggle "Open in new browser tab" if needed',
          'In the Design tab, customise style (Filled, Outlined, Transparent), colour, size, and alignment',
          'Click Save',
        ],
      },
      {
        title: 'Layout tips',
        description: 'How tiles are arranged on the dashboard.',
        substeps: [
          'The first tile you add spans the full dashboard width',
          'Additional tiles default to one-third width',
          'Tiles auto-stack as you add more',
          'You can manually resize and reposition all tiles by dragging',
        ],
        tip: 'More tiles means more browser resources and slower rendering. Consider splitting heavy dashboards into multiple smaller ones.',
      },
    ],
  },
  {
    id: 'editing',
    title: 'Editing Dashboards',
    icon: 'Pencil',
    steps: [
      {
        title: 'Enter edit mode',
        description: 'Click "Edit dashboard" from the three-dot menu on the dashboard, or click the Edit Dashboard button in the centre of a blank dashboard.',
      },
      {
        title: 'Rearrange and resize tiles',
        description: 'Drag tiles to reposition them. Resize by dragging tile edges. The dashboard automatically reflows content around your changes.',
      },
      {
        title: 'Edit a query tile',
        description: 'Click the tile to open edit options. You can modify the visualization type, query fields, filters, and formatting. Changes only apply to that specific tile.',
      },
      {
        title: 'Edit text and button tiles',
        description: 'Click the text or button to open the edit panel. Modify content, styling, and links, then save.',
      },
      {
        title: 'Delete a tile',
        description: 'Hover over the tile, click the three-dot menu, and select Remove. The tile is removed immediately.',
        tip: 'Removing a Look-linked tile does not delete the underlying Look.',
      },
    ],
  },
  {
    id: 'filters',
    title: 'Dashboard Filters',
    icon: 'SlidersHorizontal',
    steps: [
      {
        title: 'Add a filter',
        description: 'Filters let users narrow dashboard data without editing tiles.',
        substeps: [
          'Make sure the dashboard has at least one query or Look-linked tile',
          'Enter edit mode',
          'Click the Filters button (filter icon) in the toolbar',
          'Choose a field to filter on',
          'Configure the filter type (dropdown, date picker, text input, etc.)',
          'Map the filter to one or more tiles',
          'Set a default value if needed',
          'Save the dashboard',
        ],
        tip: 'In tabbed dashboards, filters appear on all tabs during editing but only show on tabs where they are applied to at least one tile after saving.',
      },
      {
        title: 'Cross-filtering',
        description: 'Enable cross-filtering so clicking a value in one tile filters the rest of the dashboard. This is configured in the dashboard settings and works with compatible visualization types.',
      },
      {
        title: 'Filter best practices',
        description: 'Common patterns for effective dashboard filters.',
        substeps: [
          'Always set sensible defaults (e.g. "Last 30 days" for date filters)',
          'Use "Date Range" filters for consistency across tiles',
          'Limit dropdown filters to high-cardinality fields only when a search box is enabled',
          'Name filters clearly so users know what they control',
        ],
      },
    ],
  },
  {
    id: 'settings',
    title: 'Dashboard Settings',
    icon: 'Settings',
    steps: [
      {
        title: 'Access settings',
        description: 'Settings are available from the blue toolbar when in edit mode. Click the gear icon to open the settings panel.',
      },
      {
        title: 'Run on load',
        description: 'When enabled (default), all tile queries execute automatically when the dashboard loads. Disable this for very heavy dashboards where you want users to set filters first.',
      },
      {
        title: 'Timezone',
        description: 'By default, each tile uses its own timezone. You can override this to use a single timezone across all tiles for consistency.',
      },
      {
        title: 'Default filters view',
        description: 'Controls whether filters are expanded (visible) or collapsed when the dashboard loads. Default is expanded.',
      },
      {
        title: 'Add a description',
        description: 'Give your dashboard context for other users.',
        substeps: [
          'Enter edit mode',
          'Select "Show dashboard details" from the three-dot menu',
          'Fill in the Description field',
          'Click Save',
        ],
      },
      {
        title: 'Apply a theme',
        description: 'Change the visual style of the dashboard.',
        substeps: [
          'In edit mode, click Style',
          'Select a theme from the Theme dropdown',
          'Click Save',
        ],
        tip: 'Theming requires your admin to enable the "Internal Dashboard Theming" preview feature.',
      },
    ],
  },
  {
    id: 'performance',
    title: 'Performance Tips',
    icon: 'Zap',
    steps: [
      {
        title: 'Keep dashboards focused',
        description: 'More tiles means more browser resources and longer rendering times. Aim for 10-15 tiles max per dashboard. Split large dashboards into multiple focused ones.',
      },
      {
        title: 'Use query tiles over Look-linked tiles',
        description: 'Query tiles are simpler and avoid extra folder clutter. Only use Look-linked tiles when you need the same query shared across multiple dashboards.',
      },
      {
        title: 'Set appropriate row limits',
        description: 'Large result sets slow down rendering. Set row limits on tables and charts (e.g. Top 15 instead of Top 500).',
      },
      {
        title: 'Use caching effectively',
        description: 'Looker caches query results. Avoid unnecessary cache-busting by keeping filter defaults consistent. The HKM dashboards use a 1-hour cache with daily refresh.',
      },
      {
        title: 'Consider aggregate tables',
        description: 'LookML developers can create aggregate tables to speed up common queries. Access aggregate table LookML through Dashboard actions then Get LookML.',
      },
      {
        title: 'Use tabs for organisation',
        description: 'For dashboards with many related views, use tabs to organise content. This reduces the number of tiles loaded at once.',
      },
    ],
  },
];
