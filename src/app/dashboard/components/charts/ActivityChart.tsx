"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { mockChartData, mockRevenueData } from '../../data/mockData';
import { cn } from '../../lib/utils';

type ChartType = 'activity' | 'revenue';

export function ActivityChart() {
  const [activeChart, setActiveChart] = useState<ChartType>('activity');

  const chartData = activeChart === 'activity' ? mockChartData : mockRevenueData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-[#111111]">Actividad de la Plataforma</h3>
          <p className="text-sm text-[#6E6E6E] mt-1">
            {activeChart === 'activity'
              ? 'Publicaciones y usuarios por día'
              : 'Ingresos mensuales'}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveChart('activity')}
            className={cn(
              'px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
              activeChart === 'activity'
                ? 'bg-[#D4A03A] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            Actividad
          </button>
          <button
            onClick={() => setActiveChart('revenue')}
            className={cn(
              'px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
              activeChart === 'revenue'
                ? 'bg-[#D4A03A] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            Ingresos
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer>
          {activeChart === 'activity' ? (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPosts" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4A03A" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#D4A03A" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6E6E6E', fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6E6E6E', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111111',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px',
                  color: '#fff',
                }}
                itemStyle={{ color: '#fff' }}
                labelStyle={{ color: '#9CA3AF', marginBottom: '4px' }}
              />
              <Area
                type="monotone"
                dataKey="posts"
                name="Publicaciones"
                stroke="#D4A03A"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPosts)"
              />
              <Area
                type="monotone"
                dataKey="users"
                name="Usuarios"
                stroke="#3B82F6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorUsers)"
              />
            </AreaChart>
          ) : (
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4A03A" stopOpacity={1} />
                  <stop offset="95%" stopColor="#B88A2F" stopOpacity={1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6E6E6E', fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6E6E6E', fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Bar
                dataKey="value"
                name="Ingresos"
                fill="url(#colorRevenue)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      {activeChart === 'activity' && (
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#D4A03A]" />
            <span className="text-sm text-[#6E6E6E]">Publicaciones</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm text-[#6E6E6E]">Usuarios</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
