import type { ModelArea } from './types';

export const attributionModel: ModelArea = {
  id: 'attribution',
  name: 'Attribution',
  tagline: 'Marketing attribution,campaigns, channels, and conversion paths',
  description:
    'The Attribution model provides dashboards for marketing attribution analysis. It answers the question: which campaigns and channels are driving conversions, and how should revenue credit be distributed across touchpoints? All revenue fields use EUR-converted amounts (_amount columns). The model supports four attribution models: First Touch, Last Touch, Linear, and Position Based.',
  icon: 'GitBranch',
  connection: 'bq-looker-pdt-sa-pj-hkm-data-marts-prod',
  dataset: 'snowplow_attribution',
  dashboardCount: 3,
  viewCount: 3,
  explores: [
    {
      name: 'Campaign Attribution',
      description:
        'Campaign-level attribution analysis.',
      joins:
        'Campaign Attributions joined to Paths to Conversion on Conversion ID (many-to-one). Lets you see path details alongside campaign attribution data.',
    },
    {
      name: 'Channel Attribution',
      description: 'Channel-level attribution analysis.',
      joins:
        'Channel Attributions joined to Paths to Conversion on Conversion ID (many-to-one).',
    },
    {
      name: 'Paths to Conversion',
      description:
        'Conversion path analysis. Standalone,no joins.',
    },
  ],
  views: [
    // ── 1. Campaign Attributions ──
    {
      id: 'snowplow_attribution_campaign_attributions',
      name: 'snowplow_attribution_campaign_attributions',
      displayName: 'Campaign Attributions',
      sourceTable: 'snowplow_attribution_campaign_attributions',
      description:
        'Each row is one touchpoint for one conversion, broken out by campaign. If a conversion had a path of 3 campaigns, there are 3 rows for that conversion.',
      dimensions: [
        {
          name: 'composite_key',
          displayName: 'Composite Key',
          type: 'dimension',
          fieldType: 'string',
          description:
            'Primary key,combination of conversion ID + campaign name + source index.',
        },
        {
          name: 'cv_id',
          displayName: 'Conversion ID',
          type: 'dimension',
          fieldType: 'string',
          description: 'Links to the specific conversion event.',
        },
        {
          name: 'customer_id',
          displayName: 'Customer ID',
          type: 'dimension',
          fieldType: 'string',
          description: 'The user who converted.',
        },
        {
          name: 'cv_tstamp',
          displayName: 'Conversion Timestamp',
          type: 'dimension',
          fieldType: 'date',
          description: 'When the conversion happened.',
        },
        {
          name: 'cv_type',
          displayName: 'Conversion Type',
          type: 'dimension',
          fieldType: 'string',
          description: 'Type of conversion event.',
        },
        {
          name: 'conversion_revenue_amount',
          displayName: 'Conversion Revenue (EUR)',
          type: 'dimension',
          fieldType: 'number',
          description:
            'The total revenue for this conversion. Hidden dimension used by measures.',
        },
        {
          name: 'campaign',
          displayName: 'Campaign',
          type: 'dimension',
          fieldType: 'string',
          description: 'The campaign name for this touchpoint.',
        },
        {
          name: 'campaign_path',
          displayName: 'Campaign Path',
          type: 'dimension',
          fieldType: 'string',
          description:
            'The full transformed campaign path leading to conversion.',
        },
        {
          name: 'source_index',
          displayName: 'Source Index',
          type: 'dimension',
          fieldType: 'number',
          description:
            'Position of this touchpoint in the path (0 = first).',
        },
        {
          name: 'path_length',
          displayName: 'Path Length',
          type: 'dimension',
          fieldType: 'number',
          description:
            'Total number of touchpoints in the conversion path.',
        },
      ],
      measures: [
        {
          name: 'total_conversions',
          displayName: 'Total Conversions',
          type: 'measure',
          fieldType: 'number',
          description:
            'Count of distinct cv_id,each conversion counted once regardless of touchpoint count.',
          sql: 'COUNT(DISTINCT cv_id)',
        },
        {
          name: 'attributed_conversions',
          displayName: 'Attributed Conversions',
          type: 'measure',
          fieldType: 'number',
          description:
            'Count of all rows,each touchpoint is counted. A conversion with 3 campaign touchpoints counts as 3.',
          sql: 'COUNT(*)',
        },
        {
          name: 'total_revenue',
          displayName: 'Total Revenue (EUR)',
          type: 'measure',
          fieldType: 'number',
          description:
            'Sum of cv_total_revenue across all rows. Because a conversion appears per touchpoint, the same revenue sums multiple times. Used for per-campaign views with filters.',
          sql: 'SUM(conversion_revenue_amount)',
        },
        {
          name: 'average_revenue_per_conversion',
          displayName: 'Avg Revenue per Conversion',
          type: 'measure',
          fieldType: 'number',
          description:
            'Average of cv_total_revenue across rows.',
          sql: 'AVG(conversion_revenue_amount)',
        },
        {
          name: 'first_touch_attribution',
          displayName: 'First Touch Attribution (EUR)',
          type: 'measure',
          fieldType: 'number',
          description:
            'Sum of first_touch_attribution_amount,pre-calculated revenue credit under the first-touch model. 100% of revenue goes to the first touchpoint.',
          sql: 'SUM(first_touch_attribution_amount)',
        },
        {
          name: 'last_touch_attribution',
          displayName: 'Last Touch Attribution (EUR)',
          type: 'measure',
          fieldType: 'number',
          description:
            'Sum of last_touch_attribution_amount,pre-calculated revenue credit under the last-touch model. 100% of revenue goes to the last touchpoint before conversion.',
          sql: 'SUM(last_touch_attribution_amount)',
        },
        {
          name: 'linear_attribution',
          displayName: 'Linear Attribution (EUR)',
          type: 'measure',
          fieldType: 'number',
          description:
            'Sum of linear_attribution_amount,revenue split equally across all touchpoints. With 3 touchpoints, each gets 33.3%.',
          sql: 'SUM(linear_attribution_amount)',
        },
        {
          name: 'position_based_attribution',
          displayName: 'Position Based Attribution (EUR)',
          type: 'measure',
          fieldType: 'number',
          description:
            'Sum of position_based_attribution_amount,first and last touchpoints each get 40%, remaining 20% split among middle touchpoints.',
          sql: 'SUM(position_based_attribution_amount)',
        },
        {
          name: 'average_path_length',
          displayName: 'Avg Path Length',
          type: 'measure',
          fieldType: 'number',
          description: 'Average of path_length across rows.',
          sql: 'AVG(path_length)',
        },
        {
          name: 'percentage_of_total_conversions',
          displayName: '% of Total Conversions',
          type: 'measure',
          fieldType: 'number',
          description:
            'attributed_conversions for each campaign as a percentage of total attributed_conversions.',
          sql: 'attributed_conversions / SUM(attributed_conversions) OVER ()',
        },
        {
          name: 'return_on_ad_spend',
          displayName: 'Return on Ad Spend (not active)',
          type: 'measure',
          fieldType: 'number',
          description:
            'total_revenue / placeholder_spend. Not currently active, spend data is not yet integrated. Will be enabled when spend data becomes available.',
          sql: 'total_revenue / placeholder_spend',
        },
      ],
    },

    // ── 2. Channel Attributions ──
    {
      id: 'snowplow_attribution_channel_attributions',
      name: 'snowplow_attribution_channel_attributions',
      displayName: 'Channel Attributions',
      sourceTable: 'snowplow_attribution_channel_attributions',
      description:
        'Identical structure to Campaign Attributions but grouped by marketing channel (e.g. Organic Search, Paid Social, Direct) instead of campaign name.',
      dimensions: [
        {
          name: 'composite_key',
          displayName: 'Composite Key',
          type: 'dimension',
          fieldType: 'string',
          description:
            'Primary key,combination of conversion ID + channel + source index.',
        },
        {
          name: 'cv_id',
          displayName: 'Conversion ID',
          type: 'dimension',
          fieldType: 'string',
          description: 'Links to the specific conversion event.',
        },
        {
          name: 'customer_id',
          displayName: 'Customer ID',
          type: 'dimension',
          fieldType: 'string',
          description: 'The user who converted.',
        },
        {
          name: 'cv_tstamp',
          displayName: 'Conversion Timestamp',
          type: 'dimension',
          fieldType: 'date',
          description: 'When the conversion happened.',
        },
        {
          name: 'cv_type',
          displayName: 'Conversion Type',
          type: 'dimension',
          fieldType: 'string',
          description: 'Type of conversion event.',
        },
        {
          name: 'conversion_revenue_amount',
          displayName: 'Conversion Revenue (EUR)',
          type: 'dimension',
          fieldType: 'number',
          description:
            'The total revenue for this conversion. Hidden dimension used by measures.',
        },
        {
          name: 'channel',
          displayName: 'Channel',
          type: 'dimension',
          fieldType: 'string',
          description:
            'The marketing channel for this touchpoint (replaces Campaign).',
        },
        {
          name: 'channel_path',
          displayName: 'Channel Path',
          type: 'dimension',
          fieldType: 'string',
          description:
            'The full transformed channel path (replaces Campaign Path).',
        },
        {
          name: 'source_index',
          displayName: 'Source Index',
          type: 'dimension',
          fieldType: 'number',
          description:
            'Position of this touchpoint in the path (0 = first).',
        },
        {
          name: 'path_length',
          displayName: 'Path Length',
          type: 'dimension',
          fieldType: 'number',
          description:
            'Total number of touchpoints in the conversion path.',
        },
      ],
      measures: [
        {
          name: 'total_conversions',
          displayName: 'Total Conversions',
          type: 'measure',
          fieldType: 'number',
          description:
            'Count of distinct cv_id,each conversion counted once.',
          sql: 'COUNT(DISTINCT cv_id)',
        },
        {
          name: 'attributed_conversions',
          displayName: 'Attributed Conversions',
          type: 'measure',
          fieldType: 'number',
          description:
            'Count of all rows,each touchpoint counted.',
          sql: 'COUNT(*)',
        },
        {
          name: 'total_revenue',
          displayName: 'Total Revenue (EUR)',
          type: 'measure',
          fieldType: 'number',
          description:
            'Sum of conversion_revenue_amount across all rows.',
          sql: 'SUM(conversion_revenue_amount)',
        },
        {
          name: 'average_revenue_per_conversion',
          displayName: 'Avg Revenue per Conversion',
          type: 'measure',
          fieldType: 'number',
          description: 'Average of conversion_revenue_amount.',
          sql: 'AVG(conversion_revenue_amount)',
        },
        {
          name: 'first_touch_attribution',
          displayName: 'First Touch Attribution (EUR)',
          type: 'measure',
          fieldType: 'number',
          description:
            'Sum of first_touch_attribution_amount,100% credit to the first touchpoint.',
          sql: 'SUM(first_touch_attribution_amount)',
        },
        {
          name: 'last_touch_attribution',
          displayName: 'Last Touch Attribution (EUR)',
          type: 'measure',
          fieldType: 'number',
          description:
            'Sum of last_touch_attribution_amount,100% credit to the last touchpoint.',
          sql: 'SUM(last_touch_attribution_amount)',
        },
        {
          name: 'linear_attribution',
          displayName: 'Linear Attribution (EUR)',
          type: 'measure',
          fieldType: 'number',
          description:
            'Sum of linear_attribution_amount,revenue split equally across all touchpoints.',
          sql: 'SUM(linear_attribution_amount)',
        },
        {
          name: 'position_based_attribution',
          displayName: 'Position Based Attribution (EUR)',
          type: 'measure',
          fieldType: 'number',
          description:
            'Sum of position_based_attribution_amount,40% first, 40% last, 20% split among middle.',
          sql: 'SUM(position_based_attribution_amount)',
        },
        {
          name: 'average_path_length',
          displayName: 'Avg Path Length',
          type: 'measure',
          fieldType: 'number',
          description: 'Average of path_length across rows.',
          sql: 'AVG(path_length)',
        },
        {
          name: 'percentage_of_total_conversions',
          displayName: '% of Total Conversions',
          type: 'measure',
          fieldType: 'number',
          description:
            'attributed_conversions for each channel as a percentage of total.',
          sql: 'attributed_conversions / SUM(attributed_conversions) OVER ()',
        },
      ],
    },

    // ── 3. Paths to Conversion ──
    {
      id: 'snowplow_attribution_paths_to_conversion',
      name: 'snowplow_attribution_paths_to_conversion',
      displayName: 'Paths to Conversion',
      sourceTable: 'snowplow_attribution_paths_to_conversion',
      description:
        'Each row is one conversion event with its full path information. Unlike campaign/channel views, this is one row per conversion (not per touchpoint).',
      dimensions: [
        {
          name: 'cv_id',
          displayName: 'Conversion ID',
          type: 'dimension',
          fieldType: 'string',
          description:
            'Primary key,unique conversion identifier.',
        },
        {
          name: 'customer_id',
          displayName: 'Customer ID',
          type: 'dimension',
          fieldType: 'string',
          description: 'The user who converted.',
        },
        {
          name: 'cv_tstamp',
          displayName: 'Conversion Timestamp',
          type: 'dimension',
          fieldType: 'date',
          description: 'When the conversion happened.',
        },
        {
          name: 'cv_path_start_tstamp',
          displayName: 'Path Start Timestamp',
          type: 'dimension',
          fieldType: 'date',
          description:
            'When the first touchpoint in the path occurred.',
        },
        {
          name: 'cv_type',
          displayName: 'Conversion Type',
          type: 'dimension',
          fieldType: 'string',
          description: 'Type of conversion.',
        },
        {
          name: 'revenue_amount',
          displayName: 'Revenue (EUR)',
          type: 'dimension',
          fieldType: 'number',
          description:
            'The conversion revenue (revenue_amount). Hidden dimension used by measures.',
        },
        {
          name: 'channel_path',
          displayName: 'Channel Path',
          type: 'dimension',
          fieldType: 'string',
          description:
            'Full channel path, e.g. "Organic Search > Direct > Paid Social".',
        },
        {
          name: 'channel_transformed_path',
          displayName: 'Channel Transformed Path',
          type: 'dimension',
          fieldType: 'string',
          description:
            'Simplified/transformed version of the channel path.',
        },
        {
          name: 'campaign_path',
          displayName: 'Campaign Path',
          type: 'dimension',
          fieldType: 'string',
          description: 'Full campaign path.',
        },
        {
          name: 'campaign_transformed_path',
          displayName: 'Campaign Transformed Path',
          type: 'dimension',
          fieldType: 'string',
          description:
            'Simplified/transformed version of the campaign path.',
        },
        {
          name: 'days_to_conversion',
          displayName: 'Days to Conversion',
          type: 'dimension',
          fieldType: 'number',
          description:
            'Timestamp difference in days between Path Start and Conversion. Shows how long the customer journey took.',
          sql: 'TIMESTAMP_DIFF(cv_tstamp, cv_path_start_tstamp, DAY)',
        },
        {
          name: 'hours_to_conversion',
          displayName: 'Hours to Conversion',
          type: 'dimension',
          fieldType: 'number',
          description:
            'Same calculation but in hours.',
          sql: 'TIMESTAMP_DIFF(cv_tstamp, cv_path_start_tstamp, HOUR)',
        },
        {
          name: 'path_length_tier',
          displayName: 'Path Length Tier',
          type: 'dimension',
          fieldType: 'string',
          description:
            'Groups paths into tiers based on step count: 1, 2, 3, 5, or 10+. Calculated by counting " > " separators in the campaign path.',
        },
      ],
      measures: [
        {
          name: 'total_conversions',
          displayName: 'Total Conversions',
          type: 'measure',
          fieldType: 'number',
          description: 'Count of distinct cv_id.',
          sql: 'COUNT(DISTINCT cv_id)',
        },
        {
          name: 'total_customers',
          displayName: 'Total Customers',
          type: 'measure',
          fieldType: 'number',
          description: 'Count of distinct customer_id.',
          sql: 'COUNT(DISTINCT customer_id)',
        },
        {
          name: 'total_revenue',
          displayName: 'Total Revenue (EUR)',
          type: 'measure',
          fieldType: 'number',
          description:
            'Sum of revenue (revenue_amount) across all conversions.',
          sql: 'SUM(revenue_amount)',
        },
        {
          name: 'average_revenue_per_conversion',
          displayName: 'Avg Revenue per Conversion',
          type: 'measure',
          fieldType: 'number',
          description: 'Average of revenue across all conversions.',
          sql: 'AVG(revenue_amount)',
        },
        {
          name: 'min_revenue',
          displayName: 'Min Revenue',
          type: 'measure',
          fieldType: 'number',
          description: 'Minimum single-conversion revenue value.',
          sql: 'MIN(revenue_amount)',
        },
        {
          name: 'max_revenue',
          displayName: 'Max Revenue',
          type: 'measure',
          fieldType: 'number',
          description: 'Maximum single-conversion revenue value.',
          sql: 'MAX(revenue_amount)',
        },
        {
          name: 'average_days_to_conversion',
          displayName: 'Avg Days to Conversion',
          type: 'measure',
          fieldType: 'number',
          description:
            'Average of path_to_conversion_days,TIMESTAMP_DIFF(cv_tstamp, cv_path_start_tstamp, DAY).',
          sql: 'AVG(TIMESTAMP_DIFF(cv_tstamp, cv_path_start_tstamp, DAY))',
        },
        {
          name: 'average_hours_to_conversion',
          displayName: 'Avg Hours to Conversion',
          type: 'measure',
          fieldType: 'number',
          description:
            'Average of path_to_conversion_hours,TIMESTAMP_DIFF(cv_tstamp, cv_path_start_tstamp, HOUR).',
          sql: 'AVG(TIMESTAMP_DIFF(cv_tstamp, cv_path_start_tstamp, HOUR))',
        },
        {
          name: 'unique_campaign_paths',
          displayName: 'Unique Campaign Paths',
          type: 'measure',
          fieldType: 'number',
          description:
            'Count of distinct campaign_transformed_path.',
          sql: 'COUNT(DISTINCT campaign_transformed_path)',
        },
        {
          name: 'unique_channel_paths',
          displayName: 'Unique Channel Paths',
          type: 'measure',
          fieldType: 'number',
          description:
            'Count of distinct channel_transformed_path.',
          sql: 'COUNT(DISTINCT channel_transformed_path)',
        },
      ],
    },
  ],

  dashboards: [
    // ── 1. Attribution Overview ──
    {
      id: 'attribution-overview',
      name: 'Attribution Overview',
      purpose:
        'Top-level view of campaign attribution, conversions, revenue, and conversion path metrics.',
      filters: [
        { name: 'Date Range', default: '30 days' },
        { name: 'Campaign' },
      ],
      tiles: [
        {
          name: 'Conversions',
          type: 'kpi',
          description: 'Total unique conversions.',
          calculation:
            'total_conversions: count of distinct cv_id.',
        },
        {
          name: 'Revenue',
          type: 'kpi',
          description: 'Total conversion revenue (EUR).',
          calculation:
            'total_revenue: sum of conversion_revenue_amount.',
        },
        {
          name: 'Avg Revenue per Conversion',
          type: 'kpi',
          description: 'Average revenue per conversion (EUR).',
          calculation:
            'average_revenue_per_conversion: average of conversion_revenue_amount across rows.',
        },
        {
          name: 'Avg Path Length',
          type: 'kpi',
          description: 'Average number of touchpoints in a conversion path.',
          calculation:
            'average_path_length: average of path_length across rows.',
        },
        {
          name: 'Attributed Conversions by Campaign',
          type: 'bar',
          description: 'Top 10 campaigns by touchpoint count.',
          calculation:
            'attributed_conversions per campaign, sorted descending.',
        },
        {
          name: 'Attributed Revenue by Campaign',
          type: 'bar',
          description: 'Top 10 campaigns by revenue.',
          calculation:
            'total_revenue per campaign, sorted descending.',
        },
        {
          name: 'Avg Revenue per Conversion by Campaign',
          type: 'bar',
          description: 'Top 10 campaigns by average revenue per conversion.',
          calculation:
            'average_revenue_per_conversion per campaign, sorted descending.',
        },
        {
          name: '% of Total Conversions by Campaign',
          type: 'bar',
          description: 'Top 10 campaigns by share of total conversions.',
          calculation:
            'percentage_of_total_conversions_calculated per campaign, sorted descending.',
        },
        {
          name: 'Conversions Over Time',
          type: 'line',
          description: 'Daily conversion trend.',
          calculation:
            'total_conversions by cv_tstamp_date.',
        },
        {
          name: 'Revenue Over Time',
          type: 'line',
          description: 'Daily revenue trend.',
          calculation: 'total_revenue by cv_tstamp_date.',
        },
        {
          name: 'Campaign Attribution Metrics',
          type: 'table',
          description: 'Full campaign breakdown.',
          calculation:
            'campaign with attributed_conversions, percentage_of_total_conversions_calculated, total_revenue, average_revenue_per_conversion.',
        },
      ],
    },

    // ── 2. Model Comparison ──
    {
      id: 'model-comparison',
      name: 'Model Comparison',
      purpose:
        'Side-by-side comparison of the four attribution models to see how credit allocation differs.',
      filters: [
        { name: 'Date Range', default: '30 days' },
        { name: 'Campaign' },
        { name: 'Channel' },
      ],
      howToRead:
        'If First Touch Attribution is much higher than Last Touch for a campaign, that campaign is good at introducing users (top of funnel) but those users tend to convert via a different campaign. If Last Touch is higher, the campaign is a strong closer.',
      tiles: [
        {
          name: 'Attributed Revenue by Campaign,Grouped',
          type: 'column',
          description:
            'Top 10 campaigns with all 4 models side by side. Useful for seeing which campaigns are valued differently by different models.',
          calculation:
            'campaign with sum_of_first_touch_attribution, sum_of_last_touch_attribution, sum_of_linear_attribution, sum_of_position_based_attribution.',
        },
        {
          name: 'Attributed Revenue by Campaign,Stacked %',
          type: 'bar',
          description:
            'Same data as percentage distribution, stacked to 100%. Shows proportional difference between models.',
          calculation:
            'Same 4 fields per campaign, stacked to 100%.',
        },
        {
          name: 'Campaign Attribution Model Table',
          type: 'table',
          description: 'Full campaign data with all 4 attribution models.',
          calculation:
            'campaign with sum_of_first_touch_attribution, sum_of_last_touch_attribution, sum_of_linear_attribution, sum_of_position_based_attribution.',
        },
        {
          name: 'Channel Attribution Model Table',
          type: 'table',
          description: 'Full channel data with all 4 attribution models.',
          calculation:
            'channel with sum_of_first_touch_attribution, sum_of_last_touch_attribution, sum_of_linear_attribution, sum_of_position_based_attribution.',
        },
      ],
    },

    // ── 3. Path Summary ──
    {
      id: 'path-summary',
      name: 'Path Summary',
      purpose:
        'What are the most common and most valuable customer journeys.',
      filters: [
        { name: 'Date Range', default: '30 days' },
        { name: 'Conversion Type' },
      ],
      howToRead:
        'Look for the paths that generate the most revenue,these are your highest-value customer journeys. Compare with the most-common paths to see if high-volume paths are also high-value, or if there are niche paths that punch above their weight.',
      tiles: [
        {
          name: 'Highest Revenue Campaign Paths',
          type: 'bar',
          description:
            'Top 10 campaign paths by revenue. A path looks like "Google Ads > Email > Direct".',
          calculation:
            'total_revenue per campaign_transformed_path, sorted descending.',
        },
        {
          name: 'Campaign Paths with Most Conversions',
          type: 'bar',
          description: 'Top 10 campaign paths by conversion count.',
          calculation:
            'total_conversions per campaign_transformed_path.',
        },
        {
          name: 'Highest Revenue Channel Paths',
          type: 'bar',
          description:
            'Top 10 channel paths by revenue, e.g. "Paid Search > Organic > Direct".',
          calculation:
            'total_revenue per channel_transformed_path, sorted descending.',
        },
        {
          name: 'Channel Paths with Most Conversions',
          type: 'bar',
          description: 'Top 10 channel paths by conversion count.',
          calculation:
            'total_conversions per channel_transformed_path.',
        },
      ],
    },
  ],
};
