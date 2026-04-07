import type { ModelArea } from './types';

export const unifiedModel: ModelArea = {
  id: 'unified',
  name: 'Unified',
  tagline: 'Web analytics,sessions, page views, users, engagement, technology, and conversions',
  description:
    'The Unified model provides dashboards for web analytics built on Snowplow\'s dbt unified data model. It covers acquisition, engagement, conversions, page performance, technology, event tracking, and user retention. Revenue fields use cv__all_total and cv_transaction_total from the sessions table. These do not yet have the _amount / _amount_local currency conversion treatment,the format has been set to EUR but the underlying values may still be in mixed local currencies until the dbt model is updated.',
  icon: 'Globe',
  connection: 'bq-looker-pdt-sa-pj-hkm-data-marts-prod',
  dataset: 'snowplow_unified_dashboards',
  cache: 'Refreshes daily, max 1 hour cache',
  dashboardCount: 14,
  viewCount: 6,
  explores: [
    {
      name: 'Web Sessions',
      description: 'Session-level analysis with all session dimensions and measures.',
    },
    {
      name: 'Web Page Views',
      description: 'Page-view-level analysis with page-specific dimensions and engagement metrics.',
    },
    {
      name: 'Web Users',
      description: 'User-level lifetime analysis with aggregated metrics per unique user.',
    },
  ],
  views: [
    // ── 1. Web Sessions ──
    {
      id: 'snowplow_web_sessions',
      name: 'snowplow_web_sessions',
      displayName: 'Web Sessions',
      sourceTable:
        '@{snowplow_gcp_project}.@{snowplow_schema}.@{snowplow_web_sessions_table}',
      description:
        'Each row is a single user session. This is the primary view used across most unified dashboards.',
      dimensions: [
        {
          name: 'session_id',
          displayName: 'Session ID',
          type: 'dimension',
          fieldType: 'string',
          description: 'Unique session identifier (primary key).',
        },
        {
          name: 'domain_userid',
          displayName: 'Domain User ID',
          type: 'dimension',
          fieldType: 'string',
          description: 'Cookie-based user identifier.',
        },
        {
          name: 'user_type',
          displayName: 'User Type',
          type: 'dimension',
          fieldType: 'string',
          description:
            'Calculated: if this is the user\'s first session (device_session_index = 1) then "New", otherwise "Returning".',
        },
        {
          name: 'default_channel_group',
          displayName: 'Default Channel Group',
          type: 'dimension',
          fieldType: 'string',
          description:
            'Marketing channel classification (e.g. Organic Search, Direct, Paid Social).',
        },
        {
          name: 'device_category',
          displayName: 'Device Category',
          type: 'dimension',
          fieldType: 'string',
          description: 'Device type (desktop, mobile, tablet).',
        },
        {
          name: 'is_engaged',
          displayName: 'Is Engaged',
          type: 'dimension',
          fieldType: 'yesno',
          description:
            'Yes/No flag from the dbt model indicating whether the session met engagement criteria.',
        },
        {
          name: 'first_page_url',
          displayName: 'First Page URL',
          type: 'dimension',
          fieldType: 'string',
          description: 'The entry page URL for the session.',
        },
        {
          name: 'first_page_urlpath',
          displayName: 'First Page URL Path',
          type: 'dimension',
          fieldType: 'string',
          description: 'The entry page path for the session.',
        },
        {
          name: 'last_page_url',
          displayName: 'Last Page URL',
          type: 'dimension',
          fieldType: 'string',
          description: 'The exit page URL for the session.',
        },
        {
          name: 'last_page_urlpath',
          displayName: 'Last Page URL Path',
          type: 'dimension',
          fieldType: 'string',
          description: 'The exit page path for the session.',
        },
        {
          name: 'geo_country',
          displayName: 'Geo Country',
          type: 'dimension',
          fieldType: 'string',
          description: 'Geographic country based on IP.',
        },
        {
          name: 'geo_region_name',
          displayName: 'Geo Region',
          type: 'dimension',
          fieldType: 'string',
          description: 'Geographic region based on IP.',
        },
        {
          name: 'geo_city',
          displayName: 'Geo City',
          type: 'dimension',
          fieldType: 'string',
          description: 'Geographic city based on IP.',
        },
        {
          name: 'mkt_source',
          displayName: 'Marketing Source',
          type: 'dimension',
          fieldType: 'string',
          description: 'UTM source parameter.',
        },
        {
          name: 'mkt_medium',
          displayName: 'Marketing Medium',
          type: 'dimension',
          fieldType: 'string',
          description: 'UTM medium parameter.',
        },
        {
          name: 'mkt_campaign',
          displayName: 'Marketing Campaign',
          type: 'dimension',
          fieldType: 'string',
          description: 'UTM campaign parameter.',
        },
        {
          name: 'mkt_content',
          displayName: 'Marketing Content',
          type: 'dimension',
          fieldType: 'string',
          description: 'UTM content parameter.',
        },
        {
          name: 'mkt_term',
          displayName: 'Marketing Term',
          type: 'dimension',
          fieldType: 'string',
          description: 'UTM term parameter.',
        },
        {
          name: 'agent_name',
          displayName: 'Browser Name',
          type: 'dimension',
          fieldType: 'string',
          description: 'Browser name from YAUAA enrichment.',
        },
        {
          name: 'os_name',
          displayName: 'Operating System',
          type: 'dimension',
          fieldType: 'string',
          description: 'Operating system name from YAUAA enrichment.',
        },
        {
          name: 'device_brand',
          displayName: 'Device Brand',
          type: 'dimension',
          fieldType: 'string',
          description: 'Device brand from YAUAA enrichment.',
        },
        {
          name: 'screen_resolution',
          displayName: 'Screen Resolution',
          type: 'dimension',
          fieldType: 'string',
          description: 'Screen resolution of the device.',
        },
        {
          name: 'start_tstamp',
          displayName: 'Session Start',
          type: 'dimension',
          fieldType: 'date',
          description: 'Timestamp when the session started.',
        },
        {
          name: 'refr_urlhost',
          displayName: 'Referrer Host',
          type: 'dimension',
          fieldType: 'string',
          description: 'Referring domain host.',
        },
        {
          name: 'refr_medium',
          displayName: 'Referrer Medium',
          type: 'dimension',
          fieldType: 'string',
          description: 'Referrer medium classification.',
        },
        {
          name: 'geo_country_name',
          displayName: 'Country Name',
          type: 'dimension',
          fieldType: 'string',
          description: 'Full country name derived from geo_country code.',
        },
        {
          name: 'browser_language',
          displayName: 'Browser Language',
          type: 'dimension',
          fieldType: 'string',
          description: 'Language setting of the browser.',
        },
      ],
      measures: [
        {
          name: 'session_count',
          displayName: 'Sessions',
          type: 'measure',
          fieldType: 'number',
          description: 'Total visits.',
          sql: 'COUNT(DISTINCT domain_sessionid)',
        },
        {
          name: 'user_count',
          displayName: 'Users',
          type: 'measure',
          fieldType: 'number',
          description: 'Total unique visitors.',
          sql: 'COUNT(DISTINCT domain_userid)',
        },
        {
          name: 'new_user_count',
          displayName: 'New Users',
          type: 'measure',
          fieldType: 'number',
          description:
            'First-time visitors (domain_sessionidx = 1).',
          sql: 'COUNT(DISTINCT domain_userid) WHERE user_type = "New"',
        },
        {
          name: 'returning_user_count',
          displayName: 'Returning Users',
          type: 'measure',
          fieldType: 'number',
          description:
            'Repeat visitors (domain_sessionidx > 1).',
          sql: 'COUNT(DISTINCT domain_userid) WHERE user_type = "Returning"',
        },
        {
          name: 'page_view_count',
          displayName: 'Page Views',
          type: 'measure',
          fieldType: 'number',
          description: 'Total pages viewed across all sessions.',
          sql: 'SUM(views)',
        },
        {
          name: 'page_views_per_user',
          displayName: 'Page Views per User',
          type: 'measure',
          fieldType: 'number',
          description: 'Pages per visitor.',
          sql: 'page_view_count / user_count',
        },
        {
          name: 'engaged_session_count',
          displayName: 'Engaged Sessions',
          type: 'measure',
          fieldType: 'number',
          description: 'Sessions that met the engagement criteria.',
          sql: 'COUNT(DISTINCT domain_sessionid) WHERE is_engaged = Yes',
        },
        {
          name: 'engagement_rate',
          displayName: 'Engagement Rate',
          type: 'measure',
          fieldType: 'number',
          description:
            'Percentage of sessions that were engaged. Example: 7,000 engaged sessions out of 10,000 total = 70%.',
          sql: 'engaged_session_count / session_count',
        },
        {
          name: 'bounce_rate',
          displayName: 'Bounce Rate',
          type: 'measure',
          fieldType: 'number',
          description:
            'Percentage of sessions that were NOT engaged. If Engagement Rate is 70%, Bounce Rate is 30%.',
          sql: '1 - (engaged_session_count / session_count)',
        },
        {
          name: 'avg_engaged_time_in_sec',
          displayName: 'Avg Engaged Time (sec)',
          type: 'measure',
          fieldType: 'number',
          description: 'Average seconds spent actively on site.',
          sql: 'AVG(engaged_time_in_s)',
        },
        {
          name: 'engaged_sessions_per_user',
          displayName: 'Engaged Sessions per User',
          type: 'measure',
          fieldType: 'number',
          description: 'Average engaged sessions per unique visitor.',
          sql: 'engaged_session_count / user_count',
        },
        {
          name: 'events',
          displayName: 'Events',
          type: 'measure',
          fieldType: 'number',
          description: 'Total events across all sessions.',
          sql: 'SUM(total_events)',
        },
        {
          name: 'conversions',
          displayName: 'Conversions',
          type: 'measure',
          fieldType: 'number',
          description:
            'Count of all conversion events per session, summed.',
          sql: 'SUM(cv__all_volume)',
        },
        {
          name: 'transaction_conversions',
          displayName: 'Transaction Conversions',
          type: 'measure',
          fieldType: 'number',
          description:
            'Count of transaction-type conversions per session, summed.',
          sql: 'SUM(cv_transaction_volume)',
        },
        {
          name: 'total_revenue',
          displayName: 'Total Revenue',
          type: 'measure',
          fieldType: 'number',
          description:
            'Total conversion value per session, summed. Formatted as EUR.',
          sql: 'SUM(cv__all_total)',
        },
      ],
    },

    // ── 2. Web Page Views ──
    {
      id: 'snowplow_web_page_views',
      name: 'snowplow_web_page_views',
      displayName: 'Web Page Views',
      sourceTable:
        '@{snowplow_gcp_project}.@{snowplow_schema}.@{snowplow_web_page_views_table}',
      description: 'Each row is a single page view event.',
      dimensions: [
        {
          name: 'page_view_id',
          displayName: 'Page View ID',
          type: 'dimension',
          fieldType: 'string',
          description: 'Unique page view identifier (primary key).',
        },
        {
          name: 'page_url',
          displayName: 'Page URL',
          type: 'dimension',
          fieldType: 'string',
          description: 'The full URL of the page viewed.',
        },
        {
          name: 'page_urlpath',
          displayName: 'Page URL Path',
          type: 'dimension',
          fieldType: 'string',
          description: 'The path portion of the page URL.',
        },
        {
          name: 'page_title',
          displayName: 'Page Title',
          type: 'dimension',
          fieldType: 'string',
          description: 'The HTML title of the page.',
        },
        {
          name: 'page_view_in_session_index',
          displayName: 'Page View in Session Index',
          type: 'dimension',
          fieldType: 'number',
          description:
            'Which page view this was within the session (1st, 2nd, etc.).',
        },
        {
          name: 'engaged_time_in_s',
          displayName: 'Engaged Time in Seconds',
          type: 'dimension',
          fieldType: 'number',
          description: 'Time the user actively spent on this page.',
        },
        {
          name: 'horizontal_pixels_scrolled',
          displayName: 'Horizontal Pixels Scrolled',
          type: 'dimension',
          fieldType: 'number',
          description: 'Number of horizontal pixels scrolled.',
        },
        {
          name: 'vertical_pixels_scrolled',
          displayName: 'Vertical Pixels Scrolled',
          type: 'dimension',
          fieldType: 'number',
          description: 'Number of vertical pixels scrolled.',
        },
        {
          name: 'horizontal_percentage_scrolled',
          displayName: 'Horizontal Percentage Scrolled',
          type: 'dimension',
          fieldType: 'number',
          description: 'Percentage of page scrolled horizontally.',
        },
        {
          name: 'vertical_percentage_scrolled',
          displayName: 'Vertical Percentage Scrolled',
          type: 'dimension',
          fieldType: 'number',
          description: 'Percentage of page scrolled vertically.',
        },
        {
          name: 'start_tstamp',
          displayName: 'Page View Start',
          type: 'dimension',
          fieldType: 'date',
          description: 'Timestamp of the page view.',
        },
      ],
      measures: [
        {
          name: 'total_page_views',
          displayName: 'Page Views',
          type: 'measure',
          fieldType: 'number',
          description: 'Count of distinct page views.',
          sql: 'COUNT(DISTINCT page_view_id)',
        },
        {
          name: 'total_users',
          displayName: 'Users',
          type: 'measure',
          fieldType: 'number',
          description: 'Count of distinct users.',
          sql: 'COUNT(DISTINCT domain_userid)',
        },
        {
          name: 'page_views_per_user',
          displayName: 'Page Views per User',
          type: 'measure',
          fieldType: 'number',
          description: 'Pages per visitor.',
          sql: 'total_page_views / total_users',
        },
        {
          name: 'avg_engaged_time_in_sec',
          displayName: 'Avg Engaged Time (sec)',
          type: 'measure',
          fieldType: 'number',
          description:
            'Average time actively spent on a page across all page views.',
          sql: 'AVG(engaged_time_in_s)',
        },
      ],
    },

    // ── 3. Web Users ──
    {
      id: 'snowplow_web_users',
      name: 'snowplow_web_users',
      displayName: 'Web Users',
      sourceTable:
        '@{snowplow_gcp_project}.@{snowplow_schema}.@{snowplow_web_users_table}',
      description:
        'Each row is a unique user with aggregated lifetime metrics.',
      dimensions: [
        {
          name: 'domain_userid',
          displayName: 'Domain User ID',
          type: 'dimension',
          fieldType: 'string',
          description: 'Cookie-based user identifier (primary key).',
        },
        {
          name: 'sessions',
          displayName: 'Sessions',
          type: 'dimension',
          fieldType: 'number',
          description: 'Total number of sessions for this user.',
        },
        {
          name: 'page_views',
          displayName: 'Page Views',
          type: 'dimension',
          fieldType: 'number',
          description: 'Total page views for this user.',
        },
        {
          name: 'active_days',
          displayName: 'Active Days',
          type: 'dimension',
          fieldType: 'number',
          description: 'Number of distinct days the user was active.',
        },
        {
          name: 'first_geo_country_name',
          displayName: 'First Country',
          type: 'dimension',
          fieldType: 'string',
          description: 'Country at first visit.',
        },
        {
          name: 'last_geo_country_name',
          displayName: 'Last Country',
          type: 'dimension',
          fieldType: 'string',
          description: 'Country at most recent visit.',
        },
        {
          name: 'first_mkt_source',
          displayName: 'First Marketing Source',
          type: 'dimension',
          fieldType: 'string',
          description: 'First-touch UTM source.',
        },
        {
          name: 'first_mkt_medium',
          displayName: 'First Marketing Medium',
          type: 'dimension',
          fieldType: 'string',
          description: 'First-touch UTM medium.',
        },
        {
          name: 'first_mkt_campaign',
          displayName: 'First Marketing Campaign',
          type: 'dimension',
          fieldType: 'string',
          description: 'First-touch UTM campaign.',
        },
        {
          name: 'default_channel_group',
          displayName: 'Default Channel Group',
          type: 'dimension',
          fieldType: 'string',
          description: 'First-touch channel group.',
        },
        {
          name: 'start_tstamp',
          displayName: 'First Session Start',
          type: 'dimension',
          fieldType: 'date',
          description: 'Timestamp of the user\'s first session.',
        },
      ],
      measures: [
        {
          name: 'user_count',
          displayName: 'Users',
          type: 'measure',
          fieldType: 'number',
          description: 'Count of distinct users.',
          sql: 'COUNT(DISTINCT domain_userid)',
        },
        {
          name: 'avg_sessions_per_user',
          displayName: 'Avg Sessions per User',
          type: 'measure',
          fieldType: 'number',
          description: 'Average sessions across all users.',
          sql: 'AVG(sessions)',
        },
        {
          name: 'avg_page_views_per_user',
          displayName: 'Avg Page Views per User',
          type: 'measure',
          fieldType: 'number',
          description: 'Average page views across all users.',
          sql: 'AVG(page_views)',
        },
        {
          name: 'avg_engaged_time_in_s',
          displayName: 'Avg Engaged Time (sec)',
          type: 'measure',
          fieldType: 'number',
          description: 'Average engaged seconds across all users.',
          sql: 'AVG(engaged_time_in_s)',
        },
        {
          name: 'avg_active_days',
          displayName: 'Avg Active Days',
          type: 'measure',
          fieldType: 'number',
          description: 'Average distinct active days across all users.',
          sql: 'AVG(active_days)',
        },
        {
          name: 'total_sessions',
          displayName: 'Total Sessions',
          type: 'measure',
          fieldType: 'number',
          description: 'Sum of sessions across all users.',
          sql: 'SUM(sessions)',
        },
        {
          name: 'total_page_views',
          displayName: 'Total Page Views',
          type: 'measure',
          fieldType: 'number',
          description: 'Sum of page views across all users.',
          sql: 'SUM(page_views)',
        },
      ],
    },

    // ── 4. AU Ratios (Derived) ──
    {
      id: 'dbt_web_sessions_au_ratios',
      name: 'dbt_web_sessions_au_ratios',
      displayName: 'AU Ratios',
      sourceTable: 'Looker PDT (derived SQL)',
      description:
        'Persistent Derived Table that calculates Daily, Weekly, and Monthly Active Users and their ratios. Used for stickiness metrics.',
      dimensions: [
        {
          name: 'date',
          displayName: 'Date',
          type: 'dimension',
          fieldType: 'date',
          description: 'The date for the active user calculation.',
        },
      ],
      measures: [
        {
          name: 'dau',
          displayName: 'DAU',
          type: 'measure',
          fieldType: 'number',
          description: 'Daily Active Users,sum of daily active user counts.',
          sql: 'SUM(dau)',
        },
        {
          name: 'wau',
          displayName: 'WAU',
          type: 'measure',
          fieldType: 'number',
          description:
            'Weekly Active Users,sum of 7-day active user counts.',
          sql: 'SUM(wau)',
        },
        {
          name: 'mau',
          displayName: 'MAU',
          type: 'measure',
          fieldType: 'number',
          description:
            'Monthly Active Users,sum of 30-day active user counts.',
          sql: 'SUM(mau)',
        },
        {
          name: 'dau_mau',
          displayName: 'DAU/MAU',
          type: 'measure',
          fieldType: 'number',
          description:
            'Daily Active Users divided by Monthly Active Users,a "stickiness" metric.',
          sql: 'dau / mau',
        },
        {
          name: 'dau_wau',
          displayName: 'DAU/WAU',
          type: 'measure',
          fieldType: 'number',
          description: 'Daily Active Users divided by Weekly Active Users.',
          sql: 'dau / wau',
        },
        {
          name: 'wau_mau',
          displayName: 'WAU/MAU',
          type: 'measure',
          fieldType: 'number',
          description: 'Weekly Active Users divided by Monthly Active Users.',
          sql: 'wau / mau',
        },
      ],
    },

    // ── 5. Event Counts (Derived) ──
    {
      id: 'dbt_web_sessions_event_counts',
      name: 'dbt_web_sessions_event_counts',
      displayName: 'Event Counts',
      sourceTable: 'Looker PDT (derived SQL)',
      description:
        'Persistent Derived Table that aggregates events from the sessions table by date and event name.',
      dimensions: [
        {
          name: 'event_name',
          displayName: 'Event Name',
          type: 'dimension',
          fieldType: 'string',
          description: 'The name of the tracked event.',
        },
        {
          name: 'date',
          displayName: 'Date',
          type: 'dimension',
          fieldType: 'date',
          description: 'Date of the event aggregation.',
        },
      ],
      measures: [
        {
          name: 'total_event_count',
          displayName: 'Total Event Count',
          type: 'measure',
          fieldType: 'number',
          description: 'Sum of event counts.',
          sql: 'SUM(event_count)',
        },
        {
          name: 'total_users',
          displayName: 'Total Users',
          type: 'measure',
          fieldType: 'number',
          description: 'Sum of user counts.',
          sql: 'SUM(user_count)',
        },
        {
          name: 'events_per_user',
          displayName: 'Events per User',
          type: 'measure',
          fieldType: 'number',
          description: 'Total Event Count divided by Total Users.',
          sql: 'total_event_count / total_users',
        },
      ],
    },

    // ── 6. Retention (Derived) ──
    {
      id: 'dbt_web_sessions_retention',
      name: 'dbt_web_sessions_retention',
      displayName: 'Retention',
      sourceTable: 'Looker PDT (derived SQL)',
      description:
        'Persistent Derived Table that tracks user return behaviour after their first session.',
      dimensions: [
        {
          name: 'day_number',
          displayName: 'Day Number',
          type: 'dimension',
          fieldType: 'number',
          description:
            'Number of days after the user\'s first visit (0-30).',
        },
        {
          name: 'first_start_week',
          displayName: 'First Start Week',
          type: 'dimension',
          fieldType: 'date',
          description: 'The week of the user\'s first visit, used for cohort grouping.',
        },
      ],
      measures: [
        {
          name: 'user_count',
          displayName: 'User Count',
          type: 'measure',
          fieldType: 'number',
          description:
            'Count of distinct users active on a given day number after first visit.',
          sql: 'COUNT(DISTINCT domain_userid)',
        },
        {
          name: 'avg_engaged_time_mins',
          displayName: 'Avg Engaged Time (mins)',
          type: 'measure',
          fieldType: 'number',
          description: 'Average engaged time in minutes.',
          sql: 'AVG(engaged_time_in_s / 60)',
        },
        {
          name: 'avg_retention_engaged_time_sec',
          displayName: 'Avg Retention Engaged Time (sec)',
          type: 'measure',
          fieldType: 'number',
          description:
            'Average cumulative engaged time up to that day.',
          sql: 'AVG(cumulative_engaged_time_in_s)',
        },
      ],
    },
  ],

  dashboards: [
    // ── 1. Acquisition Overview ──
    {
      id: 'acquisition-overview',
      name: 'Acquisition Overview',
      purpose: 'Top-level view of how users are arriving at the site.',
      filters: [{ name: 'Date', default: '30 days' }],
      tiles: [
        {
          name: 'Users',
          type: 'kpi',
          description: 'Total unique visitors.',
          calculation:
            'user_count: count of distinct domain_userid.',
        },
        {
          name: 'Sessions',
          type: 'kpi',
          description: 'Total visits.',
          calculation:
            'session_count: count of distinct domain_sessionid.',
        },
        {
          name: 'Page Views',
          type: 'kpi',
          description: 'Total pages viewed.',
          calculation:
            'page_view_count: sum of page_views per session.',
        },
        {
          name: 'Engagement Rate',
          type: 'kpi',
          description: 'Percentage of sessions that were engaged.',
          calculation:
            'engagement_rate_calculated: engaged_session_count / session_count.',
        },
        {
          name: 'Users Over Time',
          type: 'line',
          description:
            'Daily user trend with new/returning split.',
          calculation:
            'user_count, new_user_count, returning_user_count by start_tstamp_date.',
        },
        {
          name: 'Sessions by Channel',
          type: 'pie',
          description: 'Channel mix.',
          calculation:
            'session_count per default_channel_group.',
        },
        {
          name: 'Sessions by Source/Medium',
          type: 'bar',
          description: 'Top 15 traffic sources.',
          calculation:
            'session_count per mkt_source + mkt_medium.',
        },
        {
          name: 'Sessions by Campaign',
          type: 'bar',
          description: 'Top 15 campaigns.',
          calculation: 'session_count per mkt_campaign.',
        },
        {
          name: 'New vs Returning Users',
          type: 'pie',
          description: 'User type split.',
          calculation: 'user_count by user_type.',
        },
        {
          name: 'Users by Country',
          type: 'map',
          description: 'Geographic distribution.',
          calculation:
            'user_count per geo_country, shown on a map.',
        },
      ],
    },

    // ── 2. Engagement Overview ──
    {
      id: 'engagement-overview',
      name: 'Engagement Overview',
      purpose: 'How engaged are visitors once they arrive.',
      filters: [{ name: 'Date', default: '30 days' }],
      tiles: [
        {
          name: 'Engagement Rate',
          type: 'kpi',
          description: 'Percentage of engaged sessions.',
          calculation:
            'engagement_rate_calculated: engaged_session_count / session_count.',
        },
        {
          name: 'Bounce Rate',
          type: 'kpi',
          description: 'Percentage of non-engaged sessions.',
          calculation:
            'bounce_rate: 1 - (engaged_session_count / session_count).',
        },
        {
          name: 'Avg Engaged Time',
          type: 'kpi',
          description: 'Average seconds spent actively on site.',
          calculation:
            'avg_engaged_time_in_sec: average of engaged_time_in_s.',
        },
        {
          name: 'Page Views per User',
          type: 'kpi',
          description: 'Pages per visitor.',
          calculation:
            'page_views_per_user: page_view_count / user_count.',
        },
        {
          name: 'Engagement Over Time',
          type: 'line',
          description: 'Daily engagement and bounce rates.',
          calculation:
            'engagement_rate_calculated and bounce_rate by start_tstamp_date.',
        },
        {
          name: 'Avg Engaged Time Over Time',
          type: 'line',
          description: 'Daily average engaged time.',
          calculation:
            'avg_engaged_time_in_sec by start_tstamp_date.',
        },
        {
          name: 'Engagement by Channel',
          type: 'table',
          description: 'Channel breakdown with all engagement metrics.',
          calculation:
            'default_channel_group with session_count, engaged_session_count, engagement_rate_calculated, bounce_rate, avg_engaged_time_in_sec, page_views_per_user.',
        },
        {
          name: 'Engagement by Device',
          type: 'table',
          description: 'Device breakdown with engagement metrics.',
          calculation:
            'device_category with session_count, engagement_rate_calculated, bounce_rate, avg_engaged_time_in_sec, page_views_per_user.',
        },
      ],
    },

    // ── 3. Conversions ──
    {
      id: 'conversions',
      name: 'Conversions',
      purpose:
        'Conversion performance across channels and sources.',
      filters: [{ name: 'Date', default: '30 days' }],
      tiles: [
        {
          name: 'Total Conversions',
          type: 'kpi',
          description: 'All conversion events.',
          calculation: 'conversions: sum of cv__all_volume.',
        },
        {
          name: 'Transaction Conversions',
          type: 'kpi',
          description: 'Purchase conversions only.',
          calculation:
            'transaction_conversions: sum of cv_transaction_volume.',
        },
        {
          name: 'Total Revenue',
          type: 'kpi',
          description: 'Conversion revenue (EUR).',
          calculation:
            'total_revenue: sum of cv__all_total.',
        },
        {
          name: 'Sessions',
          type: 'kpi',
          description: 'Total sessions for context.',
          calculation:
            'session_count: count of distinct domain_sessionid.',
        },
        {
          name: 'Conversions Over Time',
          type: 'line',
          description:
            'Daily conversions and revenue (dual axis).',
          calculation:
            'conversions on left axis, total_revenue on right axis, by start_tstamp_date.',
        },
        {
          name: 'Conversions by Channel',
          type: 'table',
          description:
            'Channel performance with conversion rate.',
          calculation:
            'default_channel_group with session_count, conversions, transaction_conversions, total_revenue. Table Calculation: Conversion Rate = conversions / session_count.',
        },
        {
          name: 'Conversions by Source/Medium',
          type: 'table',
          description:
            'Top 20 source/medium combos with conversion rate.',
          calculation:
            'mkt_source, mkt_medium with session_count, conversions, transaction_conversions, total_revenue, Conversion Rate.',
        },
      ],
    },

    // ── 4. Page Engagement ──
    {
      id: 'page-engagement',
      name: 'Page Engagement',
      purpose: 'Which pages are users spending time on.',
      filters: [{ name: 'Date', default: '30 days' }],
      tiles: [
        {
          name: 'Page Views Over Time',
          type: 'line',
          description:
            'Daily page views and engaged time (dual axis).',
          calculation:
            'total_page_views on left axis, avg_engaged_time_in_sec on right axis, by start_tstamp_date.',
        },
        {
          name: 'Most Engaging Pages',
          type: 'bar',
          description: 'Top 15 pages by time spent.',
          calculation:
            'avg_engaged_time_in_sec per page_urlpath.',
        },
        {
          name: 'Most Viewed Pages',
          type: 'bar',
          description: 'Top 15 pages by views.',
          calculation: 'total_page_views per page_urlpath.',
        },
        {
          name: 'Page Performance Detail',
          type: 'table',
          description: 'Full page metrics table.',
          calculation:
            'page_urlpath, page_title, total_page_views, total_users, avg_engaged_time_in_sec, page_views_per_user.',
        },
      ],
    },

    // ── 5. Page Analytics ──
    {
      id: 'page-analytics',
      name: 'Page Analytics',
      purpose: 'Page-level view and user metrics.',
      filters: [{ name: 'Date', default: '30 days' }],
      tiles: [
        {
          name: 'Total Page Views',
          type: 'kpi',
          description: 'Distinct page views.',
          calculation:
            'total_page_views: count of distinct page_view_id.',
        },
        {
          name: 'Total Users',
          type: 'kpi',
          description: 'Unique visitors.',
          calculation:
            'total_users: count of distinct domain_userid.',
        },
        {
          name: 'Views per User',
          type: 'kpi',
          description: 'Pages per visitor.',
          calculation:
            'page_views_per_user: total_page_views / total_users.',
        },
        {
          name: 'Avg Engaged Time',
          type: 'kpi',
          description: 'Average time on page.',
          calculation:
            'avg_engaged_time_in_sec: average of engaged_time_in_s.',
        },
        {
          name: 'Page Views Over Time',
          type: 'line',
          description: 'Daily views and users (dual axis).',
          calculation:
            'total_page_views left axis, total_users right axis, by start_tstamp_date.',
        },
        {
          name: 'Top Pages by Views',
          type: 'table',
          description: 'Top 20 pages.',
          calculation:
            'page_urlpath with total_page_views, total_users, avg_engaged_time_in_sec.',
        },
        {
          name: 'Top Page Titles',
          type: 'table',
          description: 'Top 20 page titles.',
          calculation:
            'page_title with total_page_views, total_users, avg_engaged_time_in_sec.',
        },
      ],
    },

    // ── 6. Entrance and Exit Points ──
    {
      id: 'entrance-exit-points',
      name: 'Entrance and Exit Points',
      purpose: 'Where do users enter and leave the site.',
      filters: [{ name: 'Date', default: '30 days' }],
      tiles: [
        {
          name: 'Top Entry Pages',
          type: 'bar',
          description: 'Top 15 landing pages.',
          calculation:
            'session_count per first_page_urlpath.',
        },
        {
          name: 'Top Exit Pages',
          type: 'bar',
          description: 'Top 15 exit pages.',
          calculation:
            'session_count per last_page_urlpath.',
        },
        {
          name: 'Entry Page Performance',
          type: 'table',
          description: 'Landing page metrics.',
          calculation:
            'first_page_urlpath with session_count, user_count, engagement_rate_calculated, bounce_rate, avg_engaged_time_in_sec.',
        },
        {
          name: 'Exit Page Performance',
          type: 'table',
          description: 'Exit page metrics.',
          calculation:
            'last_page_urlpath with session_count, user_count, page_view_count, avg_engaged_time_in_sec.',
        },
      ],
    },

    // ── 7. Traffic Acquisition ──
    {
      id: 'traffic-acquisition',
      name: 'Traffic Acquisition',
      purpose: 'Detailed traffic source analysis.',
      filters: [{ name: 'Date', default: '30 days' }],
      tiles: [
        {
          name: 'Sessions by Channel Over Time',
          type: 'area',
          description: 'Channel mix trend (stacked area).',
          calculation:
            'session_count pivoted by default_channel_group over start_tstamp_date.',
        },
        {
          name: 'Channel Performance',
          type: 'table',
          description: 'Channel metrics.',
          calculation:
            'default_channel_group with user_count, session_count, page_view_count, engagement_rate_calculated, avg_engaged_time_in_sec.',
        },
        {
          name: 'Source/Medium Performance',
          type: 'table',
          description: 'Top 20 source/medium pairs.',
          calculation:
            'mkt_source, mkt_medium with user_count, session_count, page_view_count, engagement_rate_calculated.',
        },
        {
          name: 'Referrer Performance',
          type: 'table',
          description: 'Top 20 referring domains.',
          calculation:
            'refr_urlhost, refr_medium with user_count, session_count, engagement_rate_calculated.',
        },
      ],
    },

    // ── 8. User Acquisition ──
    {
      id: 'user-acquisition',
      name: 'User Acquisition',
      purpose: 'How new and returning users are acquired.',
      filters: [{ name: 'Date', default: '30 days' }],
      tiles: [
        {
          name: 'Total Users',
          type: 'kpi',
          description: 'All unique visitors.',
          calculation:
            'user_count: count of distinct domain_userid.',
        },
        {
          name: 'New Users',
          type: 'kpi',
          description: 'First-time visitors.',
          calculation:
            'new_user_count: count of distinct domain_userid filtered where device_session_index = 1.',
        },
        {
          name: 'Returning Users',
          type: 'kpi',
          description: 'Repeat visitors.',
          calculation:
            'returning_user_count: count of distinct domain_userid filtered where device_session_index > 1.',
        },
        {
          name: 'Avg Sessions per User',
          type: 'kpi',
          description: 'Visit frequency.',
          calculation:
            'Table Calculation: session_count / user_count.',
        },
        {
          name: 'New vs Returning Over Time',
          type: 'area',
          description: 'Daily user type trend (stacked area).',
          calculation:
            'user_count pivoted by user_type over start_tstamp_date.',
        },
        {
          name: 'New vs Returning Split',
          type: 'pie',
          description: 'Overall new/returning split.',
          calculation: 'user_count by user_type.',
        },
        {
          name: 'User Acquisition by Channel',
          type: 'table',
          description: 'Channel breakdown.',
          calculation:
            'default_channel_group with user_count, new_user_count, returning_user_count, session_count, engaged_sessions_per_user.',
        },
        {
          name: 'Users by Country',
          type: 'table',
          description: 'Top 20 countries.',
          calculation:
            'geo_country_name with user_count, session_count, page_view_count, engagement_rate_calculated.',
        },
      ],
    },

    // ── 9. Users Overview ──
    {
      id: 'users-overview',
      name: 'Users Overview',
      purpose: 'User-level lifetime metrics.',
      filters: [{ name: 'Start Date', default: '30 days' }],
      tiles: [
        {
          name: 'Total Users',
          type: 'kpi',
          description: 'Unique users.',
          calculation:
            'user_count: count of distinct domain_userid.',
        },
        {
          name: 'Avg Sessions per User',
          type: 'kpi',
          description: 'Visit frequency.',
          calculation:
            'avg_sessions_per_user: average of sessions per user.',
        },
        {
          name: 'Avg Page Views per User',
          type: 'kpi',
          description: 'Content consumption.',
          calculation:
            'avg_page_views_per_user: average of page_views per user.',
        },
        {
          name: 'Avg Active Days',
          type: 'kpi',
          description: 'Loyalty indicator.',
          calculation:
            'avg_active_days: average of active_days per user.',
        },
        {
          name: 'New Users Over Time',
          type: 'line',
          description: 'Daily new user trend.',
          calculation: 'user_count by start_tstamp_date.',
        },
        {
          name: 'Users by Channel',
          type: 'table',
          description: 'Channel breakdown.',
          calculation:
            'default_channel_group with user_count, total_sessions, total_page_views, avg_sessions_per_user, avg_active_days.',
        },
        {
          name: 'Users by Country',
          type: 'table',
          description: 'Top 20 countries.',
          calculation:
            'first_geo_country_name with user_count, total_sessions, avg_sessions_per_user, avg_active_days.',
        },
      ],
    },

    // ── 10. User Demographics ──
    {
      id: 'user-demographics',
      name: 'User Demographics',
      purpose: 'Geographic breakdown of users.',
      filters: [{ name: 'Start Date', default: '30 days' }],
      tiles: [
        {
          name: 'Users by Country',
          type: 'map',
          description: 'Geographic distribution on a world map.',
          calculation: 'User count per country shown on a world map.',
        },
        {
          name: 'Users by Country Detail',
          type: 'table',
          description: 'Top 20 countries.',
          calculation:
            'Country with users, sessions, page views, avg sessions per user.',
        },
        {
          name: 'Users by Region',
          type: 'table',
          description: 'Top 20 regions.',
          calculation:
            'Region with users, sessions, avg sessions per user.',
        },
        {
          name: 'Users by City',
          type: 'table',
          description: 'Top 20 cities.',
          calculation: 'City, country, users, sessions.',
        },
        {
          name: 'Users by Language',
          type: 'table',
          description: 'Top 20 languages.',
          calculation: 'Browser language with users and sessions.',
        },
      ],
    },

    // ── 11. Technology Overview ──
    {
      id: 'technology-overview',
      name: 'Technology Overview',
      purpose: 'Device, browser, and OS breakdown.',
      filters: [{ name: 'Date', default: '30 days' }],
      tiles: [
        {
          name: 'Sessions by Device',
          type: 'pie',
          description: 'Device category split.',
          calculation: 'Sessions per device_category.',
        },
        {
          name: 'Sessions by OS',
          type: 'pie',
          description: 'Top 10 operating systems.',
          calculation: 'Sessions per os_name.',
        },
        {
          name: 'Sessions by Browser',
          type: 'pie',
          description: 'Top 10 browsers.',
          calculation: 'Sessions per agent_name.',
        },
        {
          name: 'Device Over Time',
          type: 'area',
          description:
            'Device mix trend (stacked area, percentage).',
          calculation:
            'session_count pivoted by device_category, shown as percentage over start_tstamp_date.',
        },
        {
          name: 'Device Performance',
          type: 'table',
          description: 'Device metrics.',
          calculation:
            'device_category with user_count, session_count, page_view_count, engagement_rate_calculated, avg_engaged_time_in_sec.',
        },
        {
          name: 'Browser Performance',
          type: 'table',
          description: 'Top 15 browsers.',
          calculation:
            'agent_name with user_count, session_count, page_view_count, engagement_rate_calculated, avg_engaged_time_in_sec.',
        },
        {
          name: 'OS Performance',
          type: 'table',
          description: 'Top 15 operating systems.',
          calculation:
            'os_name with user_count, session_count, page_view_count, engagement_rate_calculated, avg_engaged_time_in_sec.',
        },
      ],
    },

    // ── 12. Technology Details ──
    {
      id: 'technology-details',
      name: 'Technology Details',
      purpose: 'Granular tech breakdown with version info.',
      filters: [
        { name: 'Date', default: '30 days' },
        { name: 'Device Category' },
      ],
      tiles: [
        {
          name: 'Browser Version Details',
          type: 'table',
          description: 'Top 30 browser versions.',
          calculation:
            'Browser + version with users, sessions, engagement rate.',
        },
        {
          name: 'OS Version Details',
          type: 'table',
          description: 'Top 30 OS versions.',
          calculation:
            'OS + version with users, sessions, engagement rate.',
        },
        {
          name: 'Screen Resolution',
          type: 'table',
          description: 'Top 20 resolutions.',
          calculation:
            'Resolution with users, sessions, engagement rate.',
        },
        {
          name: 'Device Brand',
          type: 'table',
          description: 'Top 20 device brands.',
          calculation:
            'Brand with users, sessions, engagement rate.',
        },
      ],
    },

    // ── 13. Event Engagement ──
    {
      id: 'event-engagement',
      name: 'Event Engagement',
      purpose: 'What events are users triggering.',
      filters: [{ name: 'Date', default: '30 days' }],
      tiles: [
        {
          name: 'Total Events',
          type: 'kpi',
          description: 'All events fired.',
          calculation:
            'Sum of event counts from derived table.',
        },
        {
          name: 'Total Sessions',
          type: 'kpi',
          description: 'Sessions for context.',
          calculation: 'Count of distinct Session IDs.',
        },
        {
          name: 'Total Users',
          type: 'kpi',
          description: 'Users for context.',
          calculation: 'Count of distinct Domain User IDs.',
        },
        {
          name: 'Events Over Time',
          type: 'line',
          description: 'Daily event volume.',
          calculation: 'Total event count by date.',
        },
        {
          name: 'Top Events',
          type: 'bar',
          description: 'Top 15 events by volume.',
          calculation: 'Event count per event name.',
        },
        {
          name: 'Events by Users',
          type: 'bar',
          description: 'Top 15 events by unique users.',
          calculation: 'User count per event name.',
        },
        {
          name: 'Event Performance Detail',
          type: 'table',
          description: 'Top 30 events.',
          calculation:
            'Event name with event count, users, and events per user.',
        },
      ],
    },

    // ── 14. User Retention ──
    {
      id: 'user-retention',
      name: 'User Retention',
      purpose:
        'How well users are retained after their first visit.',
      filters: [
        { name: 'First Start Date', default: '90 days' },
      ],
      tiles: [
        {
          name: 'Total Users',
          type: 'kpi',
          description: 'Users in the cohort.',
          calculation:
            'Count of distinct users from retention derived table.',
        },
        {
          name: 'Avg Engaged Time (mins)',
          type: 'kpi',
          description: 'Average engaged minutes.',
          calculation:
            'Average of engaged time converted to minutes.',
        },
        {
          name: 'Avg Retention Engaged Time',
          type: 'kpi',
          description: 'Cumulative engagement.',
          calculation:
            'Average cumulative engaged time in seconds.',
        },
        {
          name: 'User Retention by Day',
          type: 'line',
          description: 'Retention curve.',
          calculation:
            'User count on each day number (0-30) after first visit.',
        },
        {
          name: 'Retention Cohort by Week',
          type: 'table',
          description:
            'Cohort retention table,users grouped by first-visit week, pivoted by day number (0-30). Shows how many users from each weekly cohort returned on each subsequent day.',
          calculation:
            'User count grouped by first_start_week, pivoted by day_number.',
        },
        {
          name: 'Cumulative Engaged Time by Day',
          type: 'line',
          description: 'Engagement growth over retention days.',
          calculation:
            'Average cumulative engaged time plotted by day number.',
        },
      ],
    },
  ],
};
