// Market Data Types
export interface MarketData {
  symbol: string;
  price: number;
  volume24h: number;
  change24h: number;
  high24h: number;
  low24h: number;
  timestamp: number;
}

export interface OrderBook {
  bids: [number, number][]; // [price, size]
  asks: [number, number][];
  timestamp: number;
}

// Boros/Pendle Types
export interface YieldUnit {
  id: string;
  asset: string;
  maturity: Date;
  currentRate: number;
  impliedRate: number;
  price: number;
  volume: number;
}

export interface BorosPosition {
  id: string;
  asset: string;
  side: 'LONG' | 'SHORT';
  size: number;
  entryRate: number;
  currentPnL: number;
  margin: number;
  marginType: 'CROSS' | 'ISOLATED';
}

// Hyperliquid Types
export interface HyperliquidMarket {
  coin: string;
  szDecimals: number;
  maxLeverage: number;
  onlyIsolated: boolean;
}

export interface HypePosition {
  coin: string;
  side: 'LONG' | 'SHORT';
  size: number;
  entryPx: number;
  positionValue: number;
  unrealizedPnl: number;
  marginUsed: number;
}

// Strategy Types
export interface HedgingStrategy {
  id: string;
  name: string;
  description: string;
  type: 'FUNDING_RATE' | 'DELTA_NEUTRAL' | 'ARBITRAGE' | 'GRID';
  positions: (BorosPosition | HypePosition)[];
  totalPnL: number;
  riskMetrics: RiskMetrics;
  isActive: boolean;
}

export interface RiskMetrics {
  maxDrawdown: number;
  sharpeRatio: number;
  volatility: number;
  var95: number; // Value at Risk 95%
  expectedReturn: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number;
}

// WebSocket Message Types
export interface WSMessage {
  channel: string;
  data: any;
  timestamp: number;
}

// Chart Data Types
export interface ChartDataPoint {
  timestamp: number;
  value: number;
  label?: string;
}

export interface PnLDataPoint {
  spotPrice: number;
  pnl: number;
  strategy: string;
}

// UI State Types
export interface DashboardState {
  selectedStrategy: string | null;
  activeTab: string;
  isConnected: boolean;
  marketData: Record<string, MarketData>;
  positions: (BorosPosition | HypePosition)[];
}
