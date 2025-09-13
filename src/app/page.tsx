import { MarketOverview } from '@/components/dashboard/MarketOverview';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            HYPE Arbitrage Engine
          </h1>
          <p className="text-xl text-gray-600">
            Advanced hedging strategies for HYPE token and crypto assets
          </p>
        </div>

        {/* Market Overview */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Market Overview</h2>
          <MarketOverview />
        </section>

        {/* Coming Soon Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Strategies Section */}
          <section className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Hedging Strategies</h3>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-700">Funding Rate Arbitrage</h4>
                <p className="text-sm text-gray-500 mt-1">Long/Short funding rates via Boros (BTC/ETH)</p>
                <span className="inline-block mt-2 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                  Coming Soon
                </span>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-700">Delta-Neutral HYPE</h4>
                <p className="text-sm text-gray-500 mt-1">Spot + perpetual hedging on Hyperliquid</p>
                <span className="inline-block mt-2 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                  Coming Soon
                </span>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-700">Grid Trading</h4>
                <p className="text-sm text-gray-500 mt-1">Automated grid strategies with hedged exposure</p>
                <span className="inline-block mt-2 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                  Coming Soon
                </span>
              </div>
            </div>
          </section>

          {/* Portfolio Section */}
          <section className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Portfolio Management</h3>
            <div className="space-y-4">
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <h4 className="font-medium text-gray-700 mb-2">Connect Your Wallet</h4>
                <p className="text-sm text-gray-500 mb-4">
                  Connect your wallet to view positions and execute strategies
                </p>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  disabled
                >
                  Connect Wallet (Coming Soon)
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>
            Built with Next.js, TypeScript, and Tailwind CSS | 
            Integrates with Hyperliquid DEX and Boros (Pendle)
          </p>
          <p className="mt-1">
            ⚠️ For educational purposes only. Trading involves significant risk.
          </p>
        </footer>
      </div>
    </main>
  );
}