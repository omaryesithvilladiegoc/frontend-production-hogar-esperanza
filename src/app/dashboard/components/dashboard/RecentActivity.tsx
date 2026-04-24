"use client"
import { motion } from 'framer-motion';
import { FileText, UserPlus, CreditCard, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockActivities } from '../../data/mockData';

const activityConfig = {
  post: {
    icon: FileText,
    bgColor: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
  },
  user: {
    icon: UserPlus,
    bgColor: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500',
  },
  plan: {
    icon: CreditCard,
    bgColor: 'bg-[#D4A03A]/10',
    iconColor: 'text-[#D4A03A]',
  },
};

function formatTimeAgo(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

  if (diffInMinutes < 1) return 'Hace un momento';
  if (diffInMinutes < 60) return `Hace ${diffInMinutes} min`;
  if (diffInMinutes < 1440) return `Hace ${Math.floor(diffInMinutes / 60)} h`;
  return `Hace ${Math.floor(diffInMinutes / 1440)} d`;
}

export function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-[#111111]">Actividad Reciente</h3>
          <p className="text-sm text-[#6E6E6E] mt-1">Últimas acciones en la plataforma</p>
        </div>
        <button className="text-sm text-[#D4A03A] hover:text-[#B88A2F] font-medium transition-colors">
          Ver todo
        </button>
      </div>

      <div className="space-y-4">
        {mockActivities.map((activity, index) => {
          const config = activityConfig[activity.type];
          const Icon = config.icon;

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                  config.bgColor
                )}
              >
                <Icon className={cn('w-5 h-5', config.iconColor)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#111111] font-medium truncate">
                  {activity.description}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-3 h-3 text-[#6E6E6E]" />
                  <span className="text-xs text-[#6E6E6E]">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
