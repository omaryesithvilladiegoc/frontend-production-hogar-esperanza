"use client"
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: number;
  change?: number;
  changeLabel?: string;
  icon: React.ElementType;
  color?: 'gold' | 'blue' | 'green' | 'purple';
  delay?: number;
}

const colorVariants = {
  gold: {
    bg: 'bg-[#D4A03A]/10',
    icon: 'text-[#D4A03A]',
    border: 'border-[#D4A03A]/20',
  },
  blue: {
    bg: 'bg-blue-500/10',
    icon: 'text-blue-500',
    border: 'border-blue-500/20',
  },
  green: {
    bg: 'bg-emerald-500/10',
    icon: 'text-emerald-500',
    border: 'border-emerald-500/20',
  },
  purple: {
    bg: 'bg-purple-500/10',
    icon: 'text-purple-500',
    border: 'border-purple-500/20',
  },
};

export function StatsCard({
  title,
  value,
  change,
  changeLabel = 'vs mes anterior',
  icon: Icon,
  color = 'gold',
  delay = 0,
}: StatsCardProps) {
  const colors = colorVariants[color];
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;
  const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        'bg-white rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow duration-300',
        colors.border
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[#6E6E6E] text-sm font-medium">{title}</p>
          <h3 className="text-3xl font-bold text-[#111111] mt-2">{value}</h3>
          {change !== undefined && (
            <div className="flex items-center gap-2 mt-3">
              <span
                className={cn(
                  'inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full',
                  isPositive && 'bg-emerald-50 text-emerald-600',
                  isNegative && 'bg-red-50 text-red-600',
                  !isPositive && !isNegative && 'bg-gray-100 text-gray-600'
                )}
              >
                <TrendIcon className="w-3 h-3" />
                {isPositive ? '+' : ''}
                {change}%
              </span>
              <span className="text-xs text-[#6E6E6E]">{changeLabel}</span>
            </div>
          )}
        </div>
        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', colors.bg)}>
          <Icon className={cn('w-6 h-6', colors.icon)} />
        </div>
      </div>
    </motion.div>
  );
}
