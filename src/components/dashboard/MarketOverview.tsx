'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HyperliquidClient } from '@/lib/hyperliquid/client';
import { BorosClient } from '@/lib/boros/client';
import { MarketData } from '@/types';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface MarketOverviewProps {
  className?: string;
}

export function MarketOverview({ className }: MarketOverviewProps) {
  const [hypePrice, setHypePrice] = useState<number | null>(null);
  const [fundingRates, setFundingRates] = useState<Record<string, number>>({});
  const [marketData, setMarketData] = useState<Record<string, MarketData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hyperliquidClient = new HyperliquidClient();
  const borosClient = new BorosClient();

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch HYPE price from Hyperliquid
        const price = await hyperliquidClient.getCurrentPrice();
        setHypePrice(price);

        // Fetch funding rates from Boros
        const rates = await borosClient.getFundingRates();
        setFundingRates(rates);

        // Subscribe to real-time updates
        hyperliquidClient.subscribeToUpdates((data: MarketData) => {
          setMarketData(prev => ({
            ...prev,
            [data.symbol]: data
          }));
          
          if (data.symbol === 'HYPE') {
            setHypePrice(data.price);
          }
        });

      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();

    // Cleanup WebSocket connection on unmount
    return () => {
      hyperliquidClient.disconnect();
    };
  }, []);

  const formatPrice = (price: number | null) => {
    if (price === null) return '--';
    return `$${price.toFixed(4)}`;
  };

  const formatRate = (rate: number) => {
    return `${(rate * 100).toFixed(4)}%`;
  };

  const formatChange = (change: number) => {
    const isPositive = change >= 0;
    return (
      <span className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
        {Math.abs(change).toFixed(2)}%
      </span>
    );
  };

  if (loading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className={`border-red-200 ${className}`}>
        <CardContent className="pt-6">
          <div className="text-center text-red-600">
            <Activity className="w-8 h-8 mx-auto mb-2" />
            <p>Error loading market data: {error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      {/* HYPE Token Price */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">HYPE Token</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatPrice(hypePrice)}</div>
          {marketData.HYPE && (
            <div className="text-sm mt-1">
              {formatChange(marketData.HYPE.change24h)}
            </div>
          )}
          <p className="text-xs text-gray-500 mt-2">Hyperliquid DEX</p>
        </CardContent>
      </Card>

      {/* BTC Funding Rate */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">BTC Funding Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatRate(fundingRates.BTC || 0)}</div>
          <div className="text-sm mt-1">
            <span className="text-gray-500">8h Rate</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Via Boros</p>
        </CardContent>
      </Card>

      {/* ETH Funding Rate */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">ETH Funding Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatRate(fundingRates.ETH || 0)}</div>
          <div className="text-sm mt-1">
            <span className="text-gray-500">8h Rate</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Via Boros</p>
        </CardContent>
      </Card>
    </div>
  );
}
