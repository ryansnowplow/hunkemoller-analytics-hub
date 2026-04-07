import type { ChartType } from './types';

export const chartTypes: ChartType[] = [
  // ── Bar Chart ──
  {
    id: 'bar',
    name: 'Bar Chart',
    icon: 'BarChart3',
    bestFor: 'Comparing values across categories',
    whenToUse:
      'When you need to rank or compare discrete categories such as top campaigns, channels, or pages. Horizontal bars work well when category labels are long.',
    whenNotToUse:
      'When showing trends over time (use a line chart instead) or when there are too many categories (>20) which makes bars unreadable.',
    lookerSteps: [
      'Add a dimension (e.g. campaign, channel, page_urlpath) to Rows',
      'Add a measure (e.g. session_count, total_revenue) to Columns',
      'Set the row limit (e.g. 15 for Top 15)',
      'Sort by the measure descending',
      'In Visualization, select "Bar" chart type',
      'Optionally enable value labels for clarity',
    ],
    configYaml: `- title: "Sessions by Source/Medium"
  name: sessions_by_source_medium
  model: snowplow_unified_dashboards
  explore: web_sessions
  type: looker_bar_chart
  fields: [snowplow_web_sessions.mkt_source, snowplow_web_sessions.mkt_medium, snowplow_web_sessions.session_count]
  sorts: [snowplow_web_sessions.session_count desc]
  limit: 15
  series_colors:
    snowplow_web_sessions.session_count: "#E84393"
  show_value_labels: true
  label_density: 25`,
    realExample: {
      dashboard: 'Acquisition Overview',
      description:
        'Sessions by Source/Medium,top 15 traffic sources ranked by session count.',
    },
  },

  // ── Line Chart ──
  {
    id: 'line',
    name: 'Line Chart',
    icon: 'TrendingUp',
    bestFor: 'Showing trends over time',
    whenToUse:
      'When plotting metrics over a continuous time axis (daily, weekly). Ideal for spotting trends, seasonality, and anomalies. Supports dual-axis for comparing metrics at different scales.',
    whenNotToUse:
      'When comparing categories (use bar chart) or when there is no meaningful time dimension.',
    lookerSteps: [
      'Add a date dimension (e.g. start_tstamp_date) to Rows',
      'Add one or more measures to Columns',
      'In Visualization, select "Line" chart type',
      'For dual axis: click the gear icon on the second series and assign it to the right axis',
      'Enable point markers for small datasets',
    ],
    configYaml: `- title: "Users Over Time"
  name: users_over_time
  model: snowplow_unified_dashboards
  explore: web_sessions
  type: looker_line
  fields: [snowplow_web_sessions.start_tstamp_date, snowplow_web_sessions.user_count, snowplow_web_sessions.new_user_count, snowplow_web_sessions.returning_user_count]
  fill_fields: [snowplow_web_sessions.start_tstamp_date]
  sorts: [snowplow_web_sessions.start_tstamp_date]
  series_colors:
    snowplow_web_sessions.user_count: "#E84393"
    snowplow_web_sessions.new_user_count: "#00B894"
    snowplow_web_sessions.returning_user_count: "#6C5CE7"
  show_null_points: false
  interpolation: linear`,
    realExample: {
      dashboard: 'Acquisition Overview',
      description:
        'Users Over Time,daily user trend with new/returning split showing acquisition patterns.',
    },
  },

  // ── Pie Chart ──
  {
    id: 'pie',
    name: 'Pie Chart',
    icon: 'PieChart',
    bestFor: 'Showing proportions of a whole',
    whenToUse:
      'When showing the share or split of a total across 2-6 categories (e.g. device split, new vs returning, channel mix). Keep categories small for readability.',
    whenNotToUse:
      'When there are many categories (>6), when values are similar in size (hard to distinguish slices), or when precision matters (use a table instead).',
    lookerSteps: [
      'Add a dimension (e.g. device_category, user_type) to Rows',
      'Add a measure (e.g. session_count, user_count) to Columns',
      'In Visualization, select "Pie" chart type',
      'Enable percentage labels',
      'Optionally set a colour palette matching the brand',
    ],
    configYaml: `- title: "Sessions by Channel"
  name: sessions_by_channel
  model: snowplow_unified_dashboards
  explore: web_sessions
  type: looker_pie
  fields: [snowplow_web_sessions.default_channel_group, snowplow_web_sessions.session_count]
  sorts: [snowplow_web_sessions.session_count desc]
  value_labels: labels
  label_type: labPer
  series_colors:
    Organic Search: "#E84393"
    Direct: "#6C5CE7"
    Paid Social: "#00B894"
    Email: "#FDCB6E"`,
    realExample: {
      dashboard: 'Acquisition Overview',
      description:
        'Sessions by Channel,pie showing proportional channel mix for all sessions in the period.',
    },
  },

  // ── Single Value / KPI ──
  {
    id: 'single-value',
    name: 'Single Value / KPI',
    icon: 'Hash',
    bestFor: 'Highlighting a single key metric',
    whenToUse:
      'For headline KPIs at the top of a dashboard,total users, revenue, conversion rate. Supports comparison to a previous period.',
    whenNotToUse:
      'When you need to show a trend or comparison across multiple values. A single value tells you "what" but not "why".',
    lookerSteps: [
      'Add one measure (e.g. user_count, total_revenue) to the query',
      'In Visualization, select "Single Value" chart type',
      'Optionally add a comparison field for period-over-period',
      'Set custom formatting (e.g. currency, percentage)',
      'Choose a color theme for positive/negative indicators',
    ],
    configYaml: `- title: "Total Users"
  name: total_users
  model: snowplow_unified_dashboards
  explore: web_sessions
  type: single_value
  fields: [snowplow_web_sessions.user_count]
  single_value_title: Users
  value_format: "#,##0"
  font_size: large
  comparison_type: change
  comparison_reverse_colors: false`,
    realExample: {
      dashboard: 'Acquisition Overview',
      description:
        'Users KPI,single value showing total unique visitors with period comparison.',
    },
  },

  // ── Table ──
  {
    id: 'table',
    name: 'Table',
    icon: 'Table',
    bestFor: 'Detailed multi-metric breakdowns',
    whenToUse:
      'When showing multiple metrics per dimension (e.g. channel with sessions, engagement rate, bounce rate, avg time). Tables are the most flexible visualization for drill-down data.',
    whenNotToUse:
      'When the audience needs to quickly grasp a trend or comparison,tables require careful reading. Use charts for at-a-glance insights.',
    lookerSteps: [
      'Add dimensions to Rows (e.g. default_channel_group)',
      'Add multiple measures to Columns',
      'Set row limit and sorting',
      'In Visualization, select "Table" chart type',
      'Optionally add table calculations (e.g. Conversion Rate = conversions / sessions)',
      'Enable conditional formatting for key columns',
    ],
    configYaml: `- title: "Engagement by Channel"
  name: engagement_by_channel
  model: snowplow_unified_dashboards
  explore: web_sessions
  type: looker_grid
  fields: [snowplow_web_sessions.default_channel_group, snowplow_web_sessions.session_count, snowplow_web_sessions.engaged_session_count, snowplow_web_sessions.engagement_rate, snowplow_web_sessions.bounce_rate, snowplow_web_sessions.avg_engaged_time_in_sec, snowplow_web_sessions.page_views_per_user]
  sorts: [snowplow_web_sessions.session_count desc]
  show_row_numbers: true
  truncate_text: false
  conditional_formatting:
    - type: along a scale
      value:
      background_color:
      palette:
        name: Red to White to Green
      bold: false
      italic: false
      strikethrough: false
      fields: [snowplow_web_sessions.engagement_rate]`,
    realExample: {
      dashboard: 'Engagement Overview',
      description:
        'Engagement by Channel,table showing session count, engaged sessions, engagement rate, bounce rate, avg engaged time, and page views per user for each channel.',
    },
  },

  // ── Scatter Plot ──
  {
    id: 'scatter',
    name: 'Scatter Plot',
    icon: 'CircleDot',
    bestFor: 'Showing relationships between two metrics',
    whenToUse:
      'When exploring correlations,e.g. sessions vs engagement rate, revenue vs conversion rate. Useful for identifying outlier campaigns or pages.',
    whenNotToUse:
      'When showing trends over time or simple category comparisons. Scatter plots require two continuous axes.',
    lookerSteps: [
      'Add a dimension for point labels (e.g. campaign, page_urlpath)',
      'Add one measure to X-axis and another to Y-axis',
      'In Visualization, select "Scatter" chart type',
      'Optionally add a third measure as point size for bubble effect',
      'Enable point labels for key outliers',
    ],
    configYaml: `- title: "Sessions vs Engagement by Channel"
  name: sessions_vs_engagement
  model: snowplow_unified_dashboards
  explore: web_sessions
  type: looker_scatter
  fields: [snowplow_web_sessions.default_channel_group, snowplow_web_sessions.session_count, snowplow_web_sessions.engagement_rate]
  sorts: [snowplow_web_sessions.session_count desc]
  x_axis_label: Sessions
  y_axis_label: Engagement Rate
  point_style: filled
  series_colors:
    snowplow_web_sessions.engagement_rate: "#E84393"
  show_null_points: false`,
    realExample: {
      dashboard: 'Engagement Overview',
      description:
        'Sessions vs Engagement by Channel,scatter showing which channels have high volume and high engagement.',
    },
  },

  // ── Area Chart ──
  {
    id: 'area',
    name: 'Area Chart',
    icon: 'AreaChart',
    bestFor: 'Showing composition over time',
    whenToUse:
      'When showing how a total is composed of parts over time,e.g. sessions by channel over time (stacked), device mix trend. The filled area emphasizes volume.',
    whenNotToUse:
      'When the stacked areas make it hard to read individual series. If you need precision per series, use multiple line charts.',
    lookerSteps: [
      'Add a date dimension to Rows',
      'Add a measure to Columns',
      'Add a pivot dimension (e.g. default_channel_group, device_category)',
      'In Visualization, select "Area" chart type',
      'Enable stacking (normal or percentage)',
      'Set series colors for consistency',
    ],
    configYaml: `- title: "Sessions by Channel Over Time"
  name: sessions_by_channel_over_time
  model: snowplow_unified_dashboards
  explore: web_sessions
  type: looker_area
  fields: [snowplow_web_sessions.start_tstamp_date, snowplow_web_sessions.default_channel_group, snowplow_web_sessions.session_count]
  pivots: [snowplow_web_sessions.default_channel_group]
  fill_fields: [snowplow_web_sessions.start_tstamp_date]
  sorts: [snowplow_web_sessions.start_tstamp_date]
  stacking: normal
  series_colors:
    Organic Search: "#E84393"
    Direct: "#6C5CE7"
    Paid Social: "#00B894"`,
    realExample: {
      dashboard: 'Traffic Acquisition',
      description:
        'Sessions by Channel Over Time,stacked area showing how the traffic channel mix evolves daily.',
    },
  },

  // ── Funnel ──
  {
    id: 'funnel',
    name: 'Funnel',
    icon: 'Filter',
    bestFor: 'Showing drop-off through sequential stages',
    whenToUse:
      'When visualizing a conversion funnel with clear sequential stages,e.g. sessions -> cart -> checkout -> transaction. Highlights where users drop off.',
    whenNotToUse:
      'When stages are not sequential or when there are more than 5-6 stages (becomes hard to read).',
    lookerSteps: [
      'Query each funnel stage as a separate measure in the same explore',
      'In Visualization, select "Funnel" chart type (or use a custom visualization)',
      'Alternatively, use a bar chart with stages as categories',
      'Enable value and percentage labels',
      'Use conditional coloring to highlight the biggest drop-offs',
    ],
    configYaml: `- title: "Ecommerce Funnel"
  name: ecommerce_funnel
  model: snowplow_ecommerce_dashboards
  explore: ecommerce_sessions
  type: looker_funnel
  fields: [ecommerce_sessions.session_count, snowplow_ecommerce_cart_interactions.unique_sessions, snowplow_ecommerce_checkout_interactions.unique_checkout_sessions, snowplow_ecommerce_transactions.unique_sessions]
  label_type: labVal
  left_margin: 100
  series_colors:
    ecommerce_sessions.session_count: "#E84393"
    snowplow_ecommerce_cart_interactions.unique_sessions: "#6C5CE7"
    snowplow_ecommerce_checkout_interactions.unique_checkout_sessions: "#00B894"
    snowplow_ecommerce_transactions.unique_sessions: "#FDCB6E"`,
    realExample: {
      dashboard: 'Sessions (Ecommerce)',
      description:
        'Ecommerce Funnel,sessions flowing from Started Session -> Cart -> Checkout -> Transaction showing conversion drop-off at each stage.',
    },
  },

  // ── Donut Chart ──
  {
    id: 'donut',
    name: 'Donut Chart',
    icon: 'Circle',
    bestFor: 'Proportional split with a clean aesthetic',
    whenToUse:
      'Same use cases as pie chart but with a modern look. The center can display a total or label. Works well for binary or small-category splits.',
    whenNotToUse:
      'Same limitations as pie chart,avoid with many categories or similar-sized values.',
    lookerSteps: [
      'Add a dimension and measure (same as pie chart)',
      'In Visualization, select "Pie" chart type',
      'Enable the "Inner Radius" option to create the donut hole',
      'Set inner_radius to 50-60 for a typical donut',
      'Enable percentage labels',
    ],
    configYaml: `- title: "Member vs Non-Member"
  name: member_vs_non_member
  model: snowplow_ecommerce_dashboards
  explore: snowplow_ecommerce_transactions
  type: looker_pie
  fields: [snowplow_ecommerce_transactions.member_status, snowplow_ecommerce_transactions.total_transactions]
  sorts: [snowplow_ecommerce_transactions.total_transactions desc]
  value_labels: labels
  label_type: labPer
  inner_radius: 55
  series_colors:
    Member: "#E84393"
    Non-Member: "#DFE6E9"`,
    realExample: {
      dashboard: 'Transactions (Ecommerce)',
      description:
        'Member vs Non-Member,donut showing transaction share by membership status.',
    },
  },

  // ── Stacked Bar ──
  {
    id: 'stacked-bar',
    name: 'Stacked Bar',
    icon: 'BarChart',
    bestFor: 'Comparing composition across categories',
    whenToUse:
      'When comparing how a total is composed across categories,e.g. showing the four attribution models stacked to 100% per campaign. Good for proportional comparisons.',
    whenNotToUse:
      'When the individual segments are very small or numerous,stacked segments become hard to read. Use grouped bar if you need to compare segment values precisely.',
    lookerSteps: [
      'Add a dimension to Rows and a pivot dimension',
      'Add a measure to Columns',
      'In Visualization, select "Bar" chart type',
      'Enable stacking (set to "normal" or "percentage")',
      'For percentage mode, each bar sums to 100%',
    ],
    configYaml: `- title: "Attributed Revenue by Campaign,Stacked %"
  name: attributed_revenue_stacked
  model: snowplow_attribution
  explore: campaign_attribution
  type: looker_bar_chart
  fields: [snowplow_attribution_campaign_attributions.campaign, snowplow_attribution_campaign_attributions.first_touch_attribution, snowplow_attribution_campaign_attributions.last_touch_attribution, snowplow_attribution_campaign_attributions.linear_attribution, snowplow_attribution_campaign_attributions.position_based_attribution]
  sorts: [snowplow_attribution_campaign_attributions.first_touch_attribution desc]
  limit: 10
  stacking: percent
  series_colors:
    snowplow_attribution_campaign_attributions.first_touch_attribution: "#E84393"
    snowplow_attribution_campaign_attributions.last_touch_attribution: "#6C5CE7"
    snowplow_attribution_campaign_attributions.linear_attribution: "#00B894"
    snowplow_attribution_campaign_attributions.position_based_attribution: "#FDCB6E"`,
    realExample: {
      dashboard: 'Model Comparison (Attribution)',
      description:
        'Attributed Revenue by Campaign Stacked %,each campaign bar stacked to 100% showing how the four attribution models allocate revenue differently.',
    },
  },

  // ── Grouped Bar ──
  {
    id: 'grouped-bar',
    name: 'Grouped Bar',
    icon: 'BarChart2',
    bestFor: 'Comparing multiple metrics per category',
    whenToUse:
      'When comparing specific values of multiple series side by side per category,e.g. showing First Touch vs Last Touch vs Linear vs Position Based revenue per campaign.',
    whenNotToUse:
      'When there are many series (>4) or many categories,the bars become too thin. Use a table for high-density data.',
    lookerSteps: [
      'Add a dimension to Rows',
      'Add multiple measures (or one measure with a pivot)',
      'In Visualization, select "Column" or "Bar" chart type',
      'Ensure stacking is set to "none" (grouped mode)',
      'Assign distinct colors to each series',
    ],
    configYaml: `- title: "Attributed Revenue by Campaign,Grouped"
  name: attributed_revenue_grouped
  model: snowplow_attribution
  explore: campaign_attribution
  type: looker_column
  fields: [snowplow_attribution_campaign_attributions.campaign, snowplow_attribution_campaign_attributions.first_touch_attribution, snowplow_attribution_campaign_attributions.last_touch_attribution, snowplow_attribution_campaign_attributions.linear_attribution, snowplow_attribution_campaign_attributions.position_based_attribution]
  sorts: [snowplow_attribution_campaign_attributions.first_touch_attribution desc]
  limit: 10
  stacking: ""
  series_colors:
    snowplow_attribution_campaign_attributions.first_touch_attribution: "#E84393"
    snowplow_attribution_campaign_attributions.last_touch_attribution: "#6C5CE7"
    snowplow_attribution_campaign_attributions.linear_attribution: "#00B894"
    snowplow_attribution_campaign_attributions.position_based_attribution: "#FDCB6E"
  show_value_labels: false
  label_density: 25`,
    realExample: {
      dashboard: 'Model Comparison (Attribution)',
      description:
        'Attributed Revenue by Campaign Grouped,top 10 campaigns with all four attribution models shown as side-by-side columns.',
    },
  },

  // ── Column Chart ──
  {
    id: 'column',
    name: 'Column Chart',
    icon: 'BarChart3',
    bestFor: 'Comparing values with vertical bars',
    whenToUse:
      'When comparing categories with short labels. Column charts (vertical bars) feel natural for time-based categories (e.g. revenue by month) and smaller category sets.',
    whenNotToUse:
      'When category labels are long,they get truncated or overlap on the x-axis. Use a horizontal bar chart instead.',
    lookerSteps: [
      'Add a dimension to Rows (e.g. ecommerce_order_currency)',
      'Add a measure to Columns (e.g. total_revenue)',
      'In Visualization, select "Column" chart type',
      'Sort by the measure descending',
      'Enable value labels if there are few bars',
    ],
    configYaml: `- title: "Revenue by Currency"
  name: revenue_by_currency
  model: snowplow_ecommerce_dashboards
  explore: snowplow_ecommerce_transactions
  type: looker_column
  fields: [snowplow_ecommerce_transactions.ecommerce_order_currency, snowplow_ecommerce_transactions.total_revenue]
  sorts: [snowplow_ecommerce_transactions.total_revenue desc]
  show_value_labels: true
  series_colors:
    snowplow_ecommerce_transactions.total_revenue: "#6A0438"`,
    realExample: {
      dashboard: 'Transactions (Ecommerce)',
      description:
        'Revenue by Currency,column chart showing total revenue broken down by original order currency.',
    },
  },

  // ── Boxplot ──
  {
    id: 'boxplot',
    name: 'Boxplot',
    icon: 'BarChart2',
    bestFor: 'Showing statistical distribution of values',
    whenToUse:
      'When you need to show the spread of a numeric value,median, quartiles, and outliers. Great for comparing distributions across categories (e.g. AOV distribution by market).',
    whenNotToUse:
      'When your audience is not comfortable reading boxplots,they require statistical literacy. For simpler summaries, use a table with min/max/avg.',
    lookerSteps: [
      'Add a category dimension to Rows (e.g. market)',
      'Add a numeric dimension or measure that represents individual values',
      'In Visualization, select "Boxplot" chart type',
      'Looker calculates min, Q1, median, Q3, max automatically',
      'Hover to see the quartile values',
    ],
    configYaml: `- title: "Order Value Distribution by Market"
  name: aov_distribution_by_market
  model: snowplow_ecommerce_dashboards
  explore: snowplow_ecommerce_transactions
  type: looker_boxplot
  fields: [snowplow_ecommerce_transactions.market, snowplow_ecommerce_transactions.ecommerce_order_revenue_amount]
  sorts: [snowplow_ecommerce_transactions.market]`,
    realExample: {
      dashboard: 'Transactions (Ecommerce)',
      description:
        'Order Value Distribution by Market,boxplot showing the range and median of order values across Hunkemöller markets.',
    },
  },

  // ── Waterfall ──
  {
    id: 'waterfall',
    name: 'Waterfall',
    icon: 'BarChart3',
    bestFor: 'Showing cumulative impact of sequential values',
    whenToUse:
      'When breaking down how components add up to a total,e.g. revenue breakdown (gross - discounts - tax + shipping = net), or showing how each channel contributes to total conversions.',
    whenNotToUse:
      'When values don\'t naturally build on each other sequentially. If there\'s no running total narrative, use a standard bar chart.',
    lookerSteps: [
      'Add dimension labels for each component',
      'Add measures for each step',
      'In Visualization, select "Waterfall" chart type',
      'Looker handles the rising/falling bars automatically',
      'Set up total and subtotal columns as needed',
    ],
    configYaml: `- title: "Revenue Breakdown"
  name: revenue_breakdown
  model: snowplow_ecommerce_dashboards
  explore: snowplow_ecommerce_transactions
  type: looker_waterfall
  fields: [snowplow_ecommerce_transactions.total_revenue, snowplow_ecommerce_transactions.total_discounts, snowplow_ecommerce_transactions.total_tax, snowplow_ecommerce_transactions.total_shipping]
  up_color: "#4A7C59"
  down_color: "#6A0438"
  total_color: "#CCB497"`,
    realExample: {
      dashboard: 'Purchases (Ecommerce)',
      description:
        'Revenue Breakdown,waterfall showing gross revenue minus discounts minus tax plus shipping to reach net total.',
    },
  },

  // ── Donut Multiples ──
  {
    id: 'donut-multiples',
    name: 'Donut Multiples',
    icon: 'Circle',
    bestFor: 'Comparing proportions across multiple groups',
    whenToUse:
      'When you want to compare the proportional breakdown of a metric across several groups at once,e.g. device split for each market, or channel mix per platform.',
    whenNotToUse:
      'When you have too many groups (>6) or too many slices per donut,it becomes a wall of unreadable rings.',
    lookerSteps: [
      'Add a dimension for the donut grouping (e.g. market) to Rows',
      'Add a dimension for slices (e.g. device_category) as a Pivot',
      'Add a measure (e.g. session_count) to Columns',
      'In Visualization, select "Donut Multiples" chart type',
      'Each group gets its own donut ring',
    ],
    configYaml: `- title: "Device Mix by Market"
  name: device_mix_by_market
  model: snowplow_unified_dashboards
  explore: web_sessions
  type: looker_donut_multiples
  fields: [snowplow_web_sessions.geo_country, snowplow_web_sessions.device_category, snowplow_web_sessions.session_count]
  pivots: [snowplow_web_sessions.device_category]
  sorts: [snowplow_web_sessions.session_count desc]
  show_value_labels: true`,
    realExample: {
      dashboard: 'Technology Overview (Unified)',
      description:
        'Device Mix by Market,multiple donuts showing desktop/mobile/tablet split for each country.',
    },
  },

  // ── Timeline ──
  {
    id: 'timeline',
    name: 'Timeline',
    icon: 'TrendingUp',
    bestFor: 'Showing events along a time axis',
    whenToUse:
      'When displaying discrete events or milestones over time,e.g. campaign launches, incidents, or release dates. Good for contextualizing when things happened.',
    whenNotToUse:
      'When showing continuous metric trends (use line chart) or when events are too densely packed to distinguish.',
    lookerSteps: [
      'Add a timestamp/date dimension to Rows',
      'Add a label dimension (e.g. event name, campaign name)',
      'In Visualization, select "Timeline" chart type',
      'Each event appears as a point or block on the timeline',
      'Hover for event details',
    ],
    configYaml: `- title: "Campaign Launch Timeline"
  name: campaign_launches
  model: snowplow_attribution
  explore: campaign_attribution
  type: looker_timeline
  fields: [snowplow_attribution_campaign_attributions.cv_tstamp_date, snowplow_attribution_campaign_attributions.campaign]
  sorts: [snowplow_attribution_campaign_attributions.cv_tstamp_date]`,
    realExample: {
      dashboard: 'Attribution Overview',
      description:
        'Campaign Launch Timeline,timeline view of when each campaign first generated a conversion.',
    },
  },

  // ── Single Record ──
  {
    id: 'single-record',
    name: 'Single Record',
    icon: 'Hash',
    bestFor: 'Displaying one record in detail',
    whenToUse:
      'When showing a detail view of a single row,e.g. a specific order, user profile, or campaign summary. Displays each field as a label-value pair.',
    whenNotToUse:
      'When comparing multiple records,use a table instead.',
    lookerSteps: [
      'Build a query that returns a single row (use a filter to isolate it)',
      'Add all dimensions and measures you want to display',
      'In Visualization, select "Single Record" chart type',
      'Fields are displayed as label: value pairs vertically',
    ],
    configYaml: `- title: "Order Detail"
  name: order_detail
  model: snowplow_ecommerce_dashboards
  explore: snowplow_ecommerce_transactions
  type: single_record
  fields: [snowplow_ecommerce_transactions.ecommerce_order_natural_key, snowplow_ecommerce_transactions.total_revenue, snowplow_ecommerce_transactions.ecommerce_order_currency, snowplow_ecommerce_transactions.member_status, snowplow_ecommerce_transactions.ecommerce_order_payment_method]
  limit: 1`,
    realExample: {
      dashboard: 'Transactions (Ecommerce)',
      description:
        'Order Detail,single record view showing all fields for one specific order when drilling down from the transactions table.',
    },
  },

  // ── Word Cloud ──
  {
    id: 'word-cloud',
    name: 'Word Cloud',
    icon: 'Hash',
    bestFor: 'Showing frequency of text values visually',
    whenToUse:
      'When displaying relative frequency of text categories,e.g. most common page titles, UTM campaigns, or event names. Size of each word reflects its count.',
    whenNotToUse:
      'When precise comparisons matter,word clouds are approximate and impressionistic. Use a bar chart or table for exact rankings.',
    lookerSteps: [
      'Add a text dimension to Rows (e.g. page_title, event_name)',
      'Add a count measure to Columns',
      'In Visualization, select "Word Cloud" chart type',
      'Set the maximum number of words (default 50)',
      'Choose a color palette',
    ],
    configYaml: `- title: "Top Page Titles"
  name: top_page_titles
  model: snowplow_unified_dashboards
  explore: web_page_views
  type: looker_wordcloud
  fields: [snowplow_web_page_views.page_title, snowplow_web_page_views.total_page_views]
  sorts: [snowplow_web_page_views.total_page_views desc]
  limit: 50
  color_range: ["#F2E3E3", "#B0798E", "#6A0438"]`,
    realExample: {
      dashboard: 'Page Analytics (Unified)',
      description:
        'Top Page Titles,word cloud showing the most viewed page titles, with size reflecting view count.',
    },
  },

  // ── Google Maps ──
  {
    id: 'google-maps',
    name: 'Google Maps',
    icon: 'Map',
    bestFor: 'Interactive map with pins and clustering',
    whenToUse:
      'When you need an interactive map with zoom, pan, and point clustering,e.g. showing store locations, user locations by city. Supports street-level detail.',
    whenNotToUse:
      'When showing country or region-level aggregates,use a Static Map (Regions) instead for cleaner choropleth visualization.',
    lookerSteps: [
      'Add a latitude and longitude dimension pair, or a location dimension',
      'Add a measure for point sizing or color',
      'In Visualization, select "Google Maps" chart type',
      'Points auto-cluster at low zoom levels',
      'Click a cluster to zoom in and see individual points',
    ],
    configYaml: `- title: "User Locations"
  name: user_locations
  model: snowplow_unified_dashboards
  explore: web_sessions
  type: looker_google_map
  fields: [snowplow_web_sessions.geo_city, snowplow_web_sessions.geo_latitude, snowplow_web_sessions.geo_longitude, snowplow_web_sessions.user_count]
  sorts: [snowplow_web_sessions.user_count desc]
  map_plot_mode: points
  map_pannable: true
  map_zoomable: true`,
    realExample: {
      dashboard: 'User Demographics (Unified)',
      description:
        'User Locations,Google Maps view showing user concentration by city with interactive zoom.',
    },
  },

  // ── Static Map (Regions) ──
  {
    id: 'static-map-regions',
    name: 'Static Map (Regions)',
    icon: 'Map',
    bestFor: 'Choropleth maps for country/region data',
    whenToUse:
      'When showing aggregated data by country or region as a filled/choropleth map. Color intensity represents the metric value. Clean and simple for geographic distribution.',
    whenNotToUse:
      'When you need interactive pan/zoom or point-level data,use Google Maps. When regions are too small to see (e.g. small European countries).',
    lookerSteps: [
      'Add a geographic dimension (geo_country_name, geo_region) to Rows',
      'Add a measure to Columns',
      'In Visualization, select "Static Map (Regions)" chart type',
      'Choose the map scope (World, Europe, etc.)',
      'Set the color gradient range',
    ],
    configYaml: `- title: "Users by Country"
  name: users_by_country_static
  model: snowplow_unified_dashboards
  explore: web_sessions
  type: looker_geo_choropleth
  fields: [snowplow_web_sessions.geo_country_name, snowplow_web_sessions.user_count]
  sorts: [snowplow_web_sessions.user_count desc]
  map: auto
  colors: ["#F2E3E3", "#B0798E", "#6A0438"]`,
    realExample: {
      dashboard: 'User Demographics (Unified)',
      description:
        'Users by Country,static region map with color intensity showing user concentration per country.',
    },
  },

  // ── Static Map (Points) ──
  {
    id: 'static-map-points',
    name: 'Static Map (Points)',
    icon: 'Map',
    bestFor: 'Plotting individual locations on a map',
    whenToUse:
      'When plotting specific locations as points,e.g. city-level user data, store locations. Point size or color can encode a metric value.',
    whenNotToUse:
      'When showing aggregated country-level data (use Regions). When there are too many overlapping points (use Google Maps with clustering).',
    lookerSteps: [
      'Add latitude/longitude dimensions or a location dimension to Rows',
      'Add a measure for point size/color',
      'In Visualization, select "Static Map (Points)" chart type',
      'Configure point size and color scales',
      'Set map extent to focus on relevant geography',
    ],
    configYaml: `- title: "Sessions by City"
  name: sessions_by_city
  model: snowplow_unified_dashboards
  explore: web_sessions
  type: looker_geo_coordinates
  fields: [snowplow_web_sessions.geo_city, snowplow_web_sessions.geo_latitude, snowplow_web_sessions.geo_longitude, snowplow_web_sessions.session_count]
  sorts: [snowplow_web_sessions.session_count desc]
  limit: 100
  map_plot_mode: points
  map_tile_provider: light
  point_color: "#6A0438"`,
    realExample: {
      dashboard: 'User Demographics (Unified)',
      description:
        'Sessions by City,points on a map showing session volume per city, sized by count.',
    },
  },

  // ══════════════════════════════════════════
  // Chart Config Editor Charts
  // (require can_override_vis_config permission)
  // ══════════════════════════════════════════

  // ── Bullet Chart ──
  {
    id: 'bullet',
    name: 'Bullet Chart',
    icon: 'BarChart3',
    requiresConfigEditor: true,
    bestFor: 'Showing progress towards a target',
    whenToUse:
      'When comparing an actual value against a target or benchmark,e.g. revenue vs target, conversion rate vs goal. A compact alternative to gauges.',
    whenNotToUse:
      'When there is no meaningful target to compare against. If you just want to show a single number, use Single Value.',
    lookerSteps: [
      'Add a measure for the actual value',
      'Add a measure or constant for the target value',
      'In Visualization, open the Chart Config Editor (requires can_override_vis_config)',
      'Set type to "bullet" in the config',
      'Configure target marker and range bands',
    ],
    configYaml: `# Requires Chart Config Editor permission
- title: "Revenue vs Target"
  name: revenue_vs_target
  type: bullet
  fields: [snowplow_ecommerce_transactions.total_revenue]
  # target and ranges configured in chart config editor
  config:
    target: 100000
    ranges: [50000, 75000, 100000]`,
    realExample: {
      dashboard: 'Purchases (Ecommerce)',
      description:
        'Revenue vs Target,bullet chart showing actual revenue against the quarterly target with performance bands.',
    },
  },

  // ── Solid Gauge ──
  {
    id: 'solid-gauge',
    name: 'Solid Gauge',
    icon: 'CircleDot',
    requiresConfigEditor: true,
    bestFor: 'Showing a percentage or rate visually',
    whenToUse:
      'When displaying a rate or percentage with a visual progress indicator,e.g. checkout conversion rate, engagement rate. The arc fills proportionally.',
    whenNotToUse:
      'When comparing multiple gauges side by side (hard to compare arcs precisely). When the metric isn\'t a rate or percentage.',
    lookerSteps: [
      'Add a rate or percentage measure',
      'In Visualization, open the Chart Config Editor',
      'Set type to "solidgauge" in the config',
      'Configure min/max values and color thresholds',
      'Set the display format (e.g. percentage)',
    ],
    configYaml: `# Requires Chart Config Editor permission
- title: "Checkout Conversion Rate"
  name: checkout_conversion_gauge
  type: solidgauge
  fields: [snowplow_ecommerce_checkout_interactions.checkout_conversion_rate]
  config:
    min: 0
    max: 100
    color_stops:
      - [0, "#6A0438"]
      - [50, "#CCB497"]
      - [80, "#4A7C59"]`,
    realExample: {
      dashboard: 'Checkout (Ecommerce)',
      description:
        'Checkout Conversion Rate,solid gauge showing the percentage of checkout sessions that completed a purchase.',
    },
  },

  // ── Treemap ──
  {
    id: 'treemap',
    name: 'Treemap',
    icon: 'BarChart2',
    requiresConfigEditor: true,
    bestFor: 'Showing hierarchical data as nested rectangles',
    whenToUse:
      'When showing part-to-whole relationships with hierarchical structure,e.g. revenue by market then by product category. Rectangle size represents the metric.',
    whenNotToUse:
      'When categories are similar in size (hard to distinguish). When there is no hierarchy to show.',
    lookerSteps: [
      'Add hierarchical dimensions (e.g. market, product_category)',
      'Add a measure for rectangle sizing',
      'Open the Chart Config Editor',
      'Set type to "treemap"',
      'Rectangles auto-nest by dimension hierarchy',
    ],
    configYaml: `# Requires Chart Config Editor permission
- title: "Revenue by Market and Currency"
  name: revenue_treemap
  type: treemap
  fields: [snowplow_ecommerce_transactions.market, snowplow_ecommerce_transactions.ecommerce_order_currency, snowplow_ecommerce_transactions.total_revenue]
  sorts: [snowplow_ecommerce_transactions.total_revenue desc]`,
    realExample: {
      dashboard: 'Transactions (Ecommerce)',
      description:
        'Revenue by Market and Currency,treemap with market as outer rectangles and currency as inner, sized by revenue.',
    },
  },

  // ── Sankey ──
  {
    id: 'sankey',
    name: 'Sankey Diagram',
    icon: 'BarChart3',
    requiresConfigEditor: true,
    bestFor: 'Showing flow between stages or categories',
    whenToUse:
      'When showing how values flow from one category to another,e.g. channel paths to conversion, user journey stages. Width of flows represents volume.',
    whenNotToUse:
      'When there are too many nodes and connections,becomes spaghetti. When the flow direction isn\'t meaningful.',
    lookerSteps: [
      'Add source and destination dimensions',
      'Add a measure for flow width',
      'Open the Chart Config Editor',
      'Set type to "sankey"',
      'Configure node colors and labels',
    ],
    configYaml: `# Requires Chart Config Editor permission
- title: "Channel Path Flow"
  name: channel_path_flow
  type: sankey
  fields: [snowplow_attribution_paths_to_conversion.channel_transformed_path, snowplow_attribution_paths_to_conversion.total_conversions]
  sorts: [snowplow_attribution_paths_to_conversion.total_conversions desc]
  limit: 20`,
    realExample: {
      dashboard: 'Path Summary (Attribution)',
      description:
        'Channel Path Flow,Sankey showing how users flow through marketing channels on their path to conversion.',
    },
  },

  // ── Sunburst ──
  {
    id: 'sunburst',
    name: 'Sunburst',
    icon: 'CircleDot',
    requiresConfigEditor: true,
    bestFor: 'Showing hierarchical proportions as concentric rings',
    whenToUse:
      'When showing nested categories as expanding rings from center outward,e.g. channel > source > campaign breakdown. A hierarchical alternative to pie charts.',
    whenNotToUse:
      'When there are too many levels or segments,becomes unreadable. When a simple bar chart would suffice.',
    lookerSteps: [
      'Add multiple hierarchical dimensions',
      'Add a measure',
      'Open the Chart Config Editor',
      'Set type to "sunburst"',
      'Inner rings are parent categories, outer rings are children',
    ],
    configYaml: `# Requires Chart Config Editor permission
- title: "Traffic Source Hierarchy"
  name: traffic_sunburst
  type: sunburst
  fields: [snowplow_web_sessions.default_channel_group, snowplow_web_sessions.mkt_source, snowplow_web_sessions.session_count]
  sorts: [snowplow_web_sessions.session_count desc]`,
    realExample: {
      dashboard: 'Traffic Acquisition (Unified)',
      description:
        'Traffic Source Hierarchy,sunburst showing channel group as inner ring, marketing source as outer ring, sized by sessions.',
    },
  },

  // ── Map (existing, renamed) ──
  {
    id: 'map',
    name: 'Map',
    icon: 'Map',
    bestFor: 'Geographic data visualization',
    whenToUse:
      'When showing data by country, region, or city. Filled maps (choropleths) work well for country-level metrics like user count or sessions by geography.',
    whenNotToUse:
      'When geographic precision is not important or when the data is not geographic. Maps can be hard to read for countries with small areas.',
    lookerSteps: [
      'Add a geographic dimension (e.g. geo_country, geo_region_name) to Rows',
      'Add a measure to Columns',
      'In Visualization, select "Map" chart type',
      'Choose "Filled Map" (choropleth) for country-level data',
      'Set color scale and legend position',
      'Optionally set map zoom and center',
    ],
    configYaml: `- title: "Users by Country"
  name: users_by_country
  model: snowplow_unified_dashboards
  explore: web_sessions
  type: looker_geo_choropleth
  fields: [snowplow_web_sessions.geo_country, snowplow_web_sessions.user_count]
  sorts: [snowplow_web_sessions.user_count desc]
  map: world
  map_plot_mode: points
  heatmap_gridlines: false
  heatmap_gridlines_empty: false
  heatmap_opacity: 0.5
  show_region_field: true
  map_pannable: true
  map_zoomable: true
  quantize_map_value_colors: false
  colors: ["#FFF5F7", "#E84393"]`,
    realExample: {
      dashboard: 'Acquisition Overview',
      description:
        'Users by Country,choropleth map showing geographic distribution of unique visitors across countries.',
    },
  },
];
