# HYPE Arbitrage Engine

A comprehensive hedging and arbitrage platform for HYPE token and crypto assets, built with Next.js and deployed on Vercel.

## Features

### 🚀 Core Capabilities
- **Funding Rate Trading** via Boros (Pendle) - BTC/ETH markets
- **HYPE Token Integration** via Hyperliquid DEX
- **Real-time Market Data** and pricing feeds
- **Advanced Hedging Strategies** with risk management
- **Interactive Strategy Builder** with P&L visualization

### 📊 Supported Strategies

**Funding Rate Strategies (Boros):**
- Long/Short funding rate positions
- Leveraged trading with cross/isolated margin
- Funding rate arbitrage opportunities
- Volatility hedging through rate swaps

**HYPE Direct Hedging (Hyperliquid):**
- Delta-neutral spot/perpetual strategies
- Basis trading (spot vs futures spread)
- Grid trading with hedged exposure
- Mean reversion strategies

**Future Expansions:**
- Full options strategies when Rysk V12 adds selling capabilities
- HYPE funding rate trading when Boros adds support

## Tech Stack

- **Frontend**: Next.js 14+ with TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts for strategy visualization
- **State Management**: Zustand
- **APIs**: 
  - Boros (Pendle) for funding rate data
  - Hyperliquid DEX for HYPE token data
  - WebSocket connections for real-time updates

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/wau-zz/hype-arb-engine.git
cd hype-arb-engine

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Environment Variables

Create a `.env.local` file:

```bash
# Hyperliquid API (public endpoints - no auth required)
NEXT_PUBLIC_HYPERLIQUID_API_URL=https://api.hyperliquid.xyz/info
NEXT_PUBLIC_HYPERLIQUID_WS_URL=wss://api.hyperliquid.xyz/ws

# Boros/Pendle API endpoints
NEXT_PUBLIC_BOROS_API_URL=https://api.pendle.finance/core/v1
```

## Architecture

```
src/
├── app/                    # Next.js app router
├── components/
│   ├── ui/                # Reusable UI components
│   ├── charts/            # Chart components for strategy visualization
│   ├── strategies/        # Hedging strategy components
│   └── dashboard/         # Main dashboard components
├── lib/
│   ├── boros/            # Boros API integration
│   ├── hyperliquid/      # Hyperliquid DEX integration
│   ├── strategies/       # Strategy calculation engines
│   └── utils/            # Utility functions
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
└── constants/            # App constants and configurations
```

## API Integration

### Hyperliquid DEX
- **Base URL**: `https://api.hyperliquid.xyz/info`
- **WebSocket**: `wss://api.hyperliquid.xyz/ws`
- **Authentication**: None required for market data

### Boros (Pendle)
- **Supported Assets**: BTC, ETH funding rates
- **Features**: Yield Units (YUs) trading, leveraged positions
- **Margin**: Cross-margin and isolated margin support

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Disclaimer

This application is for educational and informational purposes only. Trading and arbitrage involve significant risk and may result in substantial losses. Always conduct thorough research and consider consulting with financial advisors before making trading decisions.