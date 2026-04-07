import type { ModelArea } from './types';

export const ecommerceModel: ModelArea = {
  id: 'ecommerce',
  name: 'Ecommerce',
  tagline: 'Online shopping behaviour,sessions, carts, checkout, and transactions',
  description:
    'The Ecommerce model provides dashboards and views for analysing online shopping behaviour across Hunkemoller\'s markets. It covers the full purchase funnel: sessions, cart interactions, checkout interactions, and completed transactions. All revenue measures use EUR-converted amounts (_amount fields). Local currency values (_amount_local fields) are available as dimensions for drill-down but are not aggregated into measures.',
  icon: 'ShoppingCart',
  connection: 'bq-looker-pdt-sa-pj-hkm-data-marts-prod',
  dataset: 'snowplow_ecommerce_dashboards',
  cache: 'Refreshes daily, max 1 hour cache',
  dashboardCount: 4,
  viewCount: 4,
  explores: [
    {
      name: 'Ecommerce Sessions',
      description:
        'Joined explore starting with unified web sessions, left-joining cart interactions, checkout interactions, and transactions on Session ID.',
      joins:
        'Web Sessions -> Cart Interactions (on session_id), Checkout Interactions (on session_id), Transactions (on session_id)',
    },
  ],
  views: [
    // ── 1. Transactions ──
    {
      id: 'snowplow_ecommerce_transactions',
      name: 'snowplow_ecommerce_transactions',
      displayName: 'Transactions',
      sourceTable: 'snowplow_ecommerce_transactions',
      description:
        'Completed purchase events. Each row is a transaction event tied to an order.',
      dimensions: [
        {
          name: 'market',
          displayName: 'Market',
          type: 'dimension',
          fieldType: 'string',
          description:
            'Derived from app_id. Maps domain prefixes to country names (e.g. hunkemoller.de = Germany, hunkemoller.nl = Netherlands).',
        },
        {
          name: 'platform',
          displayName: 'Platform',
          type: 'dimension',
          fieldType: 'string',
          description:
            'Derived from app_id. If the app ID ends with -ios-prod it\'s iOS, -android-prod it\'s Android, otherwise Web.',
        },
        {
          name: 'member_status',
          displayName: 'Member Status',
          type: 'dimension',
          fieldType: 'string',
          description:
            'If the customer has a membercard ID, they are "Member", otherwise "Non-Member".',
        },
        {
          name: 'ecommerce_order_revenue_amount',
          displayName: 'Order Revenue (EUR)',
          type: 'dimension',
          fieldType: 'number',
          description: 'The converted EUR value of the order.',
        },
        {
          name: 'ecommerce_order_currency',
          displayName: 'Order Currency',
          type: 'dimension',
          fieldType: 'string',
          description: 'The original local currency of the order.',
        },
        {
          name: 'ecommerce_order_payment_method',
          displayName: 'Payment Method',
          type: 'dimension',
          fieldType: 'string',
          description: 'How the customer paid.',
        },
        {
          name: 'ecommerce_order_discount_code',
          displayName: 'Discount Code',
          type: 'dimension',
          fieldType: 'string',
          description: 'Any discount code applied.',
        },
        {
          name: 'ecommerce_order_natural_key',
          displayName: 'Order ID',
          type: 'dimension',
          fieldType: 'string',
          description: 'Unique order identifier used for deduplication.',
        },
        {
          name: 'domain_userid',
          displayName: 'Domain User ID',
          type: 'dimension',
          fieldType: 'string',
          description: 'Cookie-based user identifier.',
        },
        {
          name: 'domain_sessionid',
          displayName: 'Session ID',
          type: 'dimension',
          fieldType: 'string',
          description: 'Session in which the transaction occurred.',
        },
        {
          name: 'derived_tstamp',
          displayName: 'Transaction Timestamp',
          type: 'dimension',
          fieldType: 'date',
          description: 'When the transaction was recorded.',
        },
      ],
      measures: [
        {
          name: 'total_transactions',
          displayName: 'Number of Transactions',
          type: 'measure',
          fieldType: 'number',
          description: 'Count of all transaction event rows.',
          sql: 'COUNT(*)',
        },
        {
          name: 'unique_orders',
          displayName: 'Unique Orders',
          type: 'measure',
          fieldType: 'number',
          description:
            'Count of distinct ecommerce_order_natural_key. One order with multiple product rows counts once.',
          sql: 'COUNT(DISTINCT ecommerce_order_natural_key)',
        },
        {
          name: 'total_revenue',
          displayName: 'Total Revenue (EUR)',
          type: 'measure',
          fieldType: 'number',
          description:
            'Sum of ecommerce_order_revenue_amount across all rows.',
          sql: 'SUM(ecommerce_order_revenue_amount)',
        },
        {
          name: 'average_order_value',
          displayName: 'Average Order Value (EUR)',
          type: 'measure',
          fieldType: 'number',
          description:
            'Average of ecommerce_order_revenue_amount across all rows.',
          sql: 'AVG(ecommerce_order_revenue_amount)',
        },
        {
          name: 'total_quantity',
          displayName: 'Total Quantity',
          type: 'measure',
          fieldType: 'number',
          description: 'Sum of product_quantity across all rows.',
          sql: 'SUM(product_quantity)',
        },
        {
          name: 'total_shipping',
          displayName: 'Total Shipping (EUR)',
          type: 'measure',
          fieldType: 'number',
          description:
            'Sum of ecommerce_order_shipping_amount across all rows.',
          sql: 'SUM(ecommerce_order_shipping_amount)',
        },
        {
          name: 'total_tax',
          displayName: 'Total Tax (EUR)',
          type: 'measure',
          fieldType: 'number',
          description:
            'Sum of ecommerce_order_tax_amount across all rows.',
          sql: 'SUM(ecommerce_order_tax_amount)',
        },
        {
          name: 'total_discounts',
          displayName: 'Total Discounts (EUR)',
          type: 'measure',
          fieldType: 'number',
          description:
            'Sum of ecommerce_order_discount_amount across all rows.',
          sql: 'SUM(ecommerce_order_discount_amount)',
        },
        {
          name: 'unique_customers',
          displayName: 'Unique Customers',
          type: 'measure',
          fieldType: 'number',
          description: 'Count of distinct domain_userid.',
          sql: 'COUNT(DISTINCT domain_userid)',
        },
        {
          name: 'unique_sessions',
          displayName: 'Sessions with Transaction',
          type: 'measure',
          fieldType: 'number',
          description: 'Count of distinct domain_sessionid.',
          sql: 'COUNT(DISTINCT domain_sessionid)',
        },
      ],
    },

    // ── 2. Cart Interactions ──
    {
      id: 'snowplow_ecommerce_cart_interactions',
      name: 'snowplow_ecommerce_cart_interactions',
      displayName: 'Cart Interactions',
      sourceTable: 'snowplow_ecommerce_cart_interactions',
      description:
        'Add-to-cart and cart-related events. Each row is a cart interaction event.',
      dimensions: [
        {
          name: 'market',
          displayName: 'Market',
          type: 'dimension',
          fieldType: 'string',
          description:
            'Derived from app_id. Maps domain prefixes to country names.',
        },
        {
          name: 'platform',
          displayName: 'Platform',
          type: 'dimension',
          fieldType: 'string',
          description:
            'Derived from app_id. iOS, Android, or Web.',
        },
        {
          name: 'action_type',
          displayName: 'Action Type',
          type: 'dimension',
          fieldType: 'string',
          description:
            'The type of cart action (e.g. add, remove).',
        },
        {
          name: 'cart_transacted',
          displayName: 'Cart Transacted',
          type: 'dimension',
          fieldType: 'yesno',
          description:
            'Whether this cart interaction ultimately led to a completed transaction.',
        },
        {
          name: 'product_value_amount',
          displayName: 'Product Value (EUR)',
          type: 'dimension',
          fieldType: 'number',
          description:
            'The EUR-converted value of the product in the cart.',
        },
        {
          name: 'domain_userid',
          displayName: 'Domain User ID',
          type: 'dimension',
          fieldType: 'string',
          description: 'Cookie-based user identifier.',
        },
        {
          name: 'domain_sessionid',
          displayName: 'Session ID',
          type: 'dimension',
          fieldType: 'string',
          description: 'Session in which the cart interaction occurred.',
        },
        {
          name: 'ecommerce_order_natural_key',
          displayName: 'Order ID',
          type: 'dimension',
          fieldType: 'string',
          description: 'Associated order identifier.',
        },
        {
          name: 'derived_tstamp',
          displayName: 'Event Timestamp',
          type: 'dimension',
          fieldType: 'date',
          description: 'When the cart interaction was recorded.',
        },
      ],
      measures: [
        {
          name: 'total_cart_events',
          displayName: 'Cart Events',
          type: 'measure',
          fieldType: 'number',
          description: 'Count of all cart interaction rows.',
          sql: 'COUNT(*)',
        },
        {
          name: 'unique_sessions',
          displayName: 'Sessions with Cart Activity',
          type: 'measure',
          fieldType: 'number',
          description: 'Count of distinct domain_sessionid.',
          sql: 'COUNT(DISTINCT domain_sessionid)',
        },
        {
          name: 'unique_orders',
          displayName: 'Unique Orders',
          type: 'measure',
          fieldType: 'number',
          description: 'Count of distinct ecommerce_order_natural_key.',
          sql: 'COUNT(DISTINCT ecommerce_order_natural_key)',
        },
        {
          name: 'transacted_orders',
          displayName: 'Transacted Orders',
          type: 'measure',
          fieldType: 'number',
          description:
            'Count of distinct ecommerce_order_natural_key where cart_transacted is true,orders that made it to purchase.',
          sql: 'COUNT(DISTINCT ecommerce_order_natural_key) WHERE cart_transacted = true',
        },
        {
          name: 'cart_conversion_rate',
          displayName: 'Cart Conversion Rate',
          type: 'measure',
          fieldType: 'number',
          description:
            'transacted_orders / unique_orders. Example: 50 orders in cart, 30 completed = 60%.',
          sql: 'transacted_orders / unique_orders',
        },
        {
          name: 'total_product_value',
          displayName: 'Total Product Value (EUR)',
          type: 'measure',
          fieldType: 'number',
          description: 'Sum of product_value_amount.',
          sql: 'SUM(product_value_amount)',
        },
        {
          name: 'total_order_revenue',
          displayName: 'Total Order Revenue (EUR)',
          type: 'measure',
          fieldType: 'number',
          description: 'Sum of ecommerce_order_revenue_amount.',
          sql: 'SUM(ecommerce_order_revenue_amount)',
        },
        {
          name: 'total_quantity',
          displayName: 'Total Quantity',
          type: 'measure',
          fieldType: 'number',
          description: 'Sum of product_quantity.',
          sql: 'SUM(product_quantity)',
        },
        {
          name: 'total_discount',
          displayName: 'Total Discount (EUR)',
          type: 'measure',
          fieldType: 'number',
          description: 'Sum of ecommerce_order_discount_amount.',
          sql: 'SUM(ecommerce_order_discount_amount)',
        },
        {
          name: 'total_shipping',
          displayName: 'Total Shipping (EUR)',
          type: 'measure',
          fieldType: 'number',
          description: 'Sum of ecommerce_order_shipping_amount.',
          sql: 'SUM(ecommerce_order_shipping_amount)',
        },
        {
          name: 'total_tax',
          displayName: 'Total Tax (EUR)',
          type: 'measure',
          fieldType: 'number',
          description: 'Sum of ecommerce_order_tax_amount.',
          sql: 'SUM(ecommerce_order_tax_amount)',
        },
        {
          name: 'unique_customers',
          displayName: 'Unique Customers',
          type: 'measure',
          fieldType: 'number',
          description: 'Count of distinct domain_userid.',
          sql: 'COUNT(DISTINCT domain_userid)',
        },
      ],
    },

    // ── 3. Checkout Interactions ──
    {
      id: 'snowplow_ecommerce_checkout_interactions',
      name: 'snowplow_ecommerce_checkout_interactions',
      displayName: 'Checkout Interactions',
      sourceTable: 'snowplow_ecommerce_checkout_interactions',
      description:
        'Checkout-step events. Each row is a checkout interaction.',
      dimensions: [
        {
          name: 'market',
          displayName: 'Market',
          type: 'dimension',
          fieldType: 'string',
          description:
            'Derived from app_id. Maps domain prefixes to country names.',
        },
        {
          name: 'platform',
          displayName: 'Platform',
          type: 'dimension',
          fieldType: 'string',
          description:
            'Derived from app_id. iOS, Android, or Web.',
        },
        {
          name: 'checkout_succeeded',
          displayName: 'Checkout Succeeded',
          type: 'dimension',
          fieldType: 'yesno',
          description:
            'Whether this checkout session resulted in a completed transaction.',
        },
        {
          name: 'cart_transacted',
          displayName: 'Cart Transacted',
          type: 'dimension',
          fieldType: 'yesno',
          description:
            'Whether the associated cart interaction led to a completed transaction.',
        },
        {
          name: 'domain_userid',
          displayName: 'Domain User ID',
          type: 'dimension',
          fieldType: 'string',
          description: 'Cookie-based user identifier.',
        },
        {
          name: 'domain_sessionid',
          displayName: 'Session ID',
          type: 'dimension',
          fieldType: 'string',
          description: 'Session in which the checkout occurred.',
        },
        {
          name: 'ecommerce_order_natural_key',
          displayName: 'Order ID',
          type: 'dimension',
          fieldType: 'string',
          description: 'Associated order identifier.',
        },
        {
          name: 'ecommerce_order_currency',
          displayName: 'Order Currency',
          type: 'dimension',
          fieldType: 'string',
          description: 'Original local currency of the order.',
        },
        {
          name: 'derived_tstamp',
          displayName: 'Event Timestamp',
          type: 'dimension',
          fieldType: 'date',
          description: 'When the checkout interaction was recorded.',
        },
      ],
      measures: [
        {
          name: 'total_checkout_events',
          displayName: 'Checkout Events',
          type: 'measure',
          fieldType: 'number',
          description: 'Count of all checkout interaction rows.',
          sql: 'COUNT(*)',
        },
        {
          name: 'unique_checkout_sessions',
          displayName: 'Checkout Sessions',
          type: 'measure',
          fieldType: 'number',
          description: 'Count of distinct domain_sessionid.',
          sql: 'COUNT(DISTINCT domain_sessionid)',
        },
        {
          name: 'successful_checkouts',
          displayName: 'Successful Checkouts',
          type: 'measure',
          fieldType: 'number',
          description:
            'Count of distinct domain_sessionid where cart_transacted is true,sessions that completed the purchase.',
          sql: 'COUNT(DISTINCT domain_sessionid) WHERE cart_transacted = true',
        },
        {
          name: 'checkout_conversion_rate',
          displayName: 'Checkout Conversion Rate',
          type: 'measure',
          fieldType: 'number',
          description:
            'successful_checkouts / unique_checkout_sessions. Example: 200 sessions entered checkout, 150 completed = 75%.',
          sql: 'successful_checkouts / unique_checkout_sessions',
        },
        {
          name: 'total_order_revenue',
          displayName: 'Total Order Revenue (EUR)',
          type: 'measure',
          fieldType: 'number',
          description: 'Sum of ecommerce_order_revenue_amount.',
          sql: 'SUM(ecommerce_order_revenue_amount)',
        },
        {
          name: 'total_product_value',
          displayName: 'Total Product Value (EUR)',
          type: 'measure',
          fieldType: 'number',
          description: 'Sum of product_value_amount.',
          sql: 'SUM(product_value_amount)',
        },
        {
          name: 'total_quantity',
          displayName: 'Total Quantity',
          type: 'measure',
          fieldType: 'number',
          description: 'Sum of product_quantity.',
          sql: 'SUM(product_quantity)',
        },
        {
          name: 'unique_customers',
          displayName: 'Unique Customers',
          type: 'measure',
          fieldType: 'number',
          description: 'Count of distinct domain_userid.',
          sql: 'COUNT(DISTINCT domain_userid)',
        },
        {
          name: 'unique_orders',
          displayName: 'Unique Orders',
          type: 'measure',
          fieldType: 'number',
          description: 'Count of distinct ecommerce_order_natural_key.',
          sql: 'COUNT(DISTINCT ecommerce_order_natural_key)',
        },
      ],
    },

    // ── 4. Promotion Interactions ──
    {
      id: 'snowplow_ecommerce_promotion_interaction',
      name: 'snowplow_ecommerce_promotion_interaction',
      displayName: 'Promotion Interactions',
      sourceTable: 'snowplow_ecommerce_promotion_interaction',
      description:
        'Interactions with on-site promotions (banners, creative slots, etc.).',
      dimensions: [
        {
          name: 'promotion_id',
          displayName: 'Promotion ID',
          type: 'dimension',
          fieldType: 'string',
          description: 'Unique identifier for the promotion.',
        },
        {
          name: 'promotion_name',
          displayName: 'Promotion Name',
          type: 'dimension',
          fieldType: 'string',
          description: 'Human-readable promotion name.',
        },
        {
          name: 'creative_name',
          displayName: 'Creative Name',
          type: 'dimension',
          fieldType: 'string',
          description: 'The creative/banner name shown.',
        },
        {
          name: 'creative_slot',
          displayName: 'Creative Slot',
          type: 'dimension',
          fieldType: 'string',
          description: 'Where the creative was placed on the page.',
        },
        {
          name: 'promotion_location',
          displayName: 'Promotion Location',
          type: 'dimension',
          fieldType: 'string',
          description:
            'Page or section where the promotion appeared.',
        },
        {
          name: 'action_type',
          displayName: 'Action Type',
          type: 'dimension',
          fieldType: 'string',
          description: 'Type of interaction (e.g. view, click).',
        },
        {
          name: 'domain_userid',
          displayName: 'Domain User ID',
          type: 'dimension',
          fieldType: 'string',
          description: 'Cookie-based user identifier.',
        },
        {
          name: 'domain_sessionid',
          displayName: 'Session ID',
          type: 'dimension',
          fieldType: 'string',
          description: 'Session in which the promotion interaction occurred.',
        },
      ],
      measures: [
        {
          name: 'total_promotion_events',
          displayName: 'Promotion Events',
          type: 'measure',
          fieldType: 'number',
          description: 'Count of all promotion interaction rows.',
          sql: 'COUNT(*)',
        },
        {
          name: 'unique_promotions',
          displayName: 'Unique Promotions',
          type: 'measure',
          fieldType: 'number',
          description: 'Count of distinct promotion_natural_key.',
          sql: 'COUNT(DISTINCT promotion_natural_key)',
        },
        {
          name: 'unique_sessions',
          displayName: 'Sessions with Promotion Interaction',
          type: 'measure',
          fieldType: 'number',
          description: 'Count of distinct domain_sessionid.',
          sql: 'COUNT(DISTINCT domain_sessionid)',
        },
        {
          name: 'unique_customers',
          displayName: 'Unique Customers',
          type: 'measure',
          fieldType: 'number',
          description: 'Count of distinct domain_userid.',
          sql: 'COUNT(DISTINCT domain_userid)',
        },
      ],
    },
  ],

  dashboards: [
    // ── 1. Sessions ──
    {
      id: 'ecommerce-sessions',
      name: 'Sessions',
      purpose:
        'Full ecommerce funnel from session start through to transaction completion.',
      exploreName: 'ecommerce_sessions',
      filters: [{ name: 'Date Range', default: '30 days' }],
      tiles: [
        {
          name: 'Started Session',
          type: 'kpi',
          description: 'Total number of web sessions.',
          calculation:
            'ecommerce_sessions.session_count: count of distinct Session IDs from the sessions table.',
        },
        {
          name: 'Sessions with Cart',
          type: 'kpi',
          description:
            'Sessions where the user interacted with a cart.',
          calculation:
            'snowplow_ecommerce_cart_interactions.unique_sessions: count of distinct Session IDs from the cart interactions table.',
        },
        {
          name: 'Sessions with Checkout',
          type: 'kpi',
          description: 'Sessions where the user entered checkout.',
          calculation:
            'snowplow_ecommerce_checkout_interactions.unique_checkout_sessions: count of distinct Session IDs from the checkout interactions table.',
        },
        {
          name: 'Sessions with Transaction',
          type: 'kpi',
          description:
            'Sessions where the user completed a purchase.',
          calculation:
            'snowplow_ecommerce_transactions.unique_sessions: count of distinct Session IDs from the transactions table.',
        },
        {
          name: 'Funnel Over Time',
          type: 'line',
          description: 'Daily trend of all four funnel stages.',
          calculation:
            'All four session counts plotted by ecommerce_sessions.start_tstamp_date.',
        },
        {
          name: 'Sessions Funnel Detail',
          type: 'table',
          description: 'Weekly breakdown with revenue.',
          calculation:
            'Four session counts grouped by ecommerce_sessions.start_tstamp_week, plus snowplow_ecommerce_transactions.total_revenue.',
        },
      ],
    },

    // ── 2. Purchases ──
    {
      id: 'ecommerce-purchases',
      name: 'Purchases',
      purpose:
        'Overview of purchase activity,revenue, customers, AOV, and cart conversion trends.',
      filters: [{ name: 'Date Range', default: '30 days' }],
      tiles: [
        {
          name: 'Total Revenue',
          type: 'kpi',
          description: 'Total EUR revenue from transactions.',
          calculation:
            'snowplow_ecommerce_transactions.total_revenue: sum of ecommerce_order_revenue_amount.',
        },
        {
          name: 'Total Customers',
          type: 'kpi',
          description: 'Unique customers who purchased.',
          calculation:
            'snowplow_ecommerce_transactions.unique_customers: count of distinct domain_userid.',
        },
        {
          name: 'Average Order Value',
          type: 'kpi',
          description: 'Average revenue per transaction row.',
          calculation:
            'snowplow_ecommerce_transactions.average_order_value: average of ecommerce_order_revenue_amount.',
        },
        {
          name: 'Revenue per Day',
          type: 'line',
          description: 'Daily revenue trend.',
          calculation:
            'total_revenue plotted by derived_tstamp_date.',
        },
        {
          name: 'Unique Customers per Day',
          type: 'line',
          description: 'Daily unique customer trend.',
          calculation:
            'unique_customers plotted by derived_tstamp_date.',
        },
        {
          name: 'Average Order Value per Day',
          type: 'line',
          description: 'Daily AOV trend.',
          calculation:
            'average_order_value plotted by derived_tstamp_date.',
        },
        {
          name: 'Cart Activity per Day',
          type: 'line',
          description: 'Daily cart orders vs transacted orders.',
          calculation:
            'snowplow_ecommerce_cart_interactions.unique_orders and transacted_orders plotted by derived_tstamp_date.',
        },
        {
          name: 'Cart Conversion Rate per Day',
          type: 'line',
          description: 'Daily cart-to-purchase rate.',
          calculation:
            'snowplow_ecommerce_cart_interactions.cart_conversion_rate (transacted_orders / unique_orders) plotted by derived_tstamp_date.',
        },
        {
          name: 'Transaction Details',
          type: 'table',
          description: 'Breakdown by payment method.',
          calculation:
            'ecommerce_order_payment_method with total_transactions, total_revenue, average_order_value, total_quantity, total_discounts.',
        },
      ],
    },

    // ── 3. Checkout ──
    {
      id: 'ecommerce-checkout',
      name: 'Checkout',
      purpose:
        'Checkout funnel analysis by market, platform, and currency.',
      filters: [
        { name: 'Date Range', default: '30 days' },
        { name: 'Market' },
        { name: 'Platform' },
      ],
      tiles: [
        {
          name: 'Checkout Conversion Rate',
          type: 'kpi',
          description: 'Overall checkout-to-purchase rate.',
          calculation:
            'checkout_conversion_rate: successful_checkouts / unique_checkout_sessions.',
        },
        {
          name: 'Checkout Sessions',
          type: 'kpi',
          description: 'Total sessions that entered checkout.',
          calculation:
            'unique_checkout_sessions: count of distinct domain_sessionid.',
        },
        {
          name: 'Successful Checkouts',
          type: 'kpi',
          description: 'Sessions that completed purchase.',
          calculation:
            'successful_checkouts: count of distinct domain_sessionid where cart_transacted is true.',
        },
        {
          name: 'Checkout Sessions Over Time',
          type: 'line',
          description:
            'Daily checkout sessions and successful checkouts.',
          calculation:
            'unique_checkout_sessions and successful_checkouts plotted by derived_tstamp_date.',
        },
        {
          name: 'Checkout by Market',
          type: 'bar',
          description:
            'Checkout sessions and successes by country.',
          calculation:
            'unique_checkout_sessions and successful_checkouts grouped by market.',
        },
        {
          name: 'Checkout by Platform',
          type: 'pie',
          description: 'Checkout session share by platform.',
          calculation:
            'unique_checkout_sessions grouped by platform.',
        },
        {
          name: 'Checkout by Currency',
          type: 'table',
          description:
            'Currency breakdown with percentage of sessions.',
          calculation:
            'ecommerce_order_currency with unique_checkout_sessions, total_order_revenue, total_quantity. Table calculation: unique_checkout_sessions for each currency / sum of all unique_checkout_sessions = % share.',
        },
        {
          name: 'Market Detail',
          type: 'table',
          description: 'Full market metrics.',
          calculation:
            'market with unique_checkout_sessions, successful_checkouts, checkout_conversion_rate, total_order_revenue, total_quantity.',
        },
      ],
    },

    // ── 4. Transactions ──
    {
      id: 'ecommerce-transactions',
      name: 'Transactions',
      purpose:
        'Transaction-level analysis including revenue, currency breakdown, and member vs non-member purchasing.',
      filters: [
        { name: 'Date Range', default: '30 days' },
        { name: 'Currency' },
        { name: 'Market' },
        { name: 'Platform' },
      ],
      tiles: [
        {
          name: 'Total Revenue',
          type: 'kpi',
          description: 'Total EUR revenue.',
          calculation:
            'total_revenue: sum of ecommerce_order_revenue_amount.',
        },
        {
          name: 'Number of Transactions',
          type: 'kpi',
          description: 'Total transaction count.',
          calculation:
            'total_transactions: count of all transaction rows.',
        },
        {
          name: 'Average Order Value',
          type: 'kpi',
          description: 'Revenue per transaction.',
          calculation:
            'average_order_value: average of ecommerce_order_revenue_amount.',
        },
        {
          name: 'Unique Customers',
          type: 'kpi',
          description: 'Distinct purchasers.',
          calculation:
            'unique_customers: count of distinct domain_userid.',
        },
        {
          name: 'Transactions Over Time',
          type: 'line',
          description:
            'Daily transactions and revenue (dual axis).',
          calculation:
            'total_transactions on left axis, total_revenue on right axis, both by derived_tstamp_date.',
        },
        {
          name: 'Revenue by Currency',
          type: 'bar',
          description:
            'Transactions, revenue, and AOV by original currency.',
          calculation:
            'total_transactions, total_revenue, average_order_value grouped by ecommerce_order_currency.',
        },
        {
          name: 'Member vs Non-Member',
          type: 'pie',
          description: 'Transaction share by membership.',
          calculation:
            'total_transactions grouped by member_status.',
        },
        {
          name: 'Transaction Details by Currency',
          type: 'table',
          description: 'Full currency breakdown.',
          calculation:
            'ecommerce_order_currency with total_transactions, total_revenue, average_order_value, total_quantity, total_discounts, unique_customers.',
        },
        {
          name: 'Member vs Non-Member Detail',
          type: 'table',
          description: 'Member comparison.',
          calculation:
            'member_status with total_transactions, total_revenue, average_order_value, unique_customers.',
        },
      ],
    },
  ],
};
