import { MarketData, OrderBook, HyperliquidMarket } from '@/types';

export class HyperliquidClient {
  private readonly API_BASE = process.env.NEXT_PUBLIC_HYPERLIQUID_API_URL || 'https://api.hyperliquid.xyz/info';
  private readonly WS_URL = process.env.NEXT_PUBLIC_HYPERLIQUID_WS_URL || 'wss://api.hyperliquid.xyz/ws';
  private wsConnection: WebSocket | null = null;

  /**
   * Get current HYPE token price
   */
  async getCurrentPrice(): Promise<number> {
    try {
      const response = await fetch(this.API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'allMids' })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const hypePrice = data.HYPE;
      
      if (!hypePrice) {
        throw new Error('HYPE price not found in response');
      }

      return parseFloat(hypePrice);
    } catch (error) {
      console.error('Error fetching HYPE price:', error);
      throw error;
    }
  }

  /**
   * Get all market mid prices
   */
  async getAllMidPrices(): Promise<Record<string, number>> {
    try {
      const response = await fetch(this.API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'allMids' })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Convert string prices to numbers
      const prices: Record<string, number> = {};
      for (const [symbol, price] of Object.entries(data)) {
        if (typeof price === 'string') {
          prices[symbol] = parseFloat(price);
        }
      }

      return prices;
    } catch (error) {
      console.error('Error fetching mid prices:', error);
      throw error;
    }
  }

  /**
   * Get order book for a specific market
   */
  async getOrderBook(coin: string): Promise<OrderBook> {
    try {
      const response = await fetch(this.API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: 'l2Book',
          coin: coin
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        bids: data.levels?.map((level: any) => [parseFloat(level.px), parseFloat(level.sz)]).filter((level: any) => level[1] > 0) || [],
        asks: data.levels?.map((level: any) => [parseFloat(level.px), parseFloat(level.sz)]).filter((level: any) => level[1] < 0).map((level: any) => [level[0], Math.abs(level[1])]) || [],
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Error fetching order book:', error);
      throw error;
    }
  }

  /**
   * Get market metadata
   */
  async getMarketMeta(): Promise<HyperliquidMarket[]> {
    try {
      const response = await fetch(this.API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'meta' })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.universe || [];
    } catch (error) {
      console.error('Error fetching market meta:', error);
      throw error;
    }
  }

  /**
   * Subscribe to real-time price updates via WebSocket
   */
  subscribeToUpdates(callback: (data: MarketData) => void): void {
    try {
      this.wsConnection = new WebSocket(this.WS_URL);

      this.wsConnection.onopen = () => {
        console.log('Connected to Hyperliquid WebSocket');
        
        // Subscribe to all mids updates
        if (this.wsConnection) {
          this.wsConnection.send(JSON.stringify({
            method: 'subscribe',
            subscription: {
              type: 'allMids'
            }
          }));
        }
      };

      this.wsConnection.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          
          if (message.channel === 'allMids' && message.data) {
            // Convert to MarketData format
            for (const [symbol, price] of Object.entries(message.data)) {
              if (typeof price === 'string') {
                const marketData: MarketData = {
                  symbol,
                  price: parseFloat(price),
                  volume24h: 0, // Would need separate API call
                  change24h: 0, // Would need separate API call
                  high24h: 0,   // Would need separate API call
                  low24h: 0,    // Would need separate API call
                  timestamp: Date.now()
                };
                callback(marketData);
              }
            }
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.wsConnection.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      this.wsConnection.onclose = () => {
        console.log('Disconnected from Hyperliquid WebSocket');
        // Attempt to reconnect after 5 seconds
        setTimeout(() => {
          this.subscribeToUpdates(callback);
        }, 5000);
      };

    } catch (error) {
      console.error('Error setting up WebSocket connection:', error);
    }
  }

  /**
   * Disconnect WebSocket connection
   */
  disconnect(): void {
    if (this.wsConnection) {
      this.wsConnection.close();
      this.wsConnection = null;
    }
  }

  /**
   * Check if WebSocket is connected
   */
  isConnected(): boolean {
    return this.wsConnection?.readyState === WebSocket.OPEN;
  }
}
