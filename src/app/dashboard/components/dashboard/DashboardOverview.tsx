"use client"
import { Users, FileText, CreditCard, TrendingUp } from 'lucide-react';
import { ActivityChart } from '../charts/ActivityChart';
import { DashboardHeader } from './DashboardHeader';
import { StatsCard } from './StatsCard';
import { dashboardStats } from '../../data/mockData';
import { RecentActivity } from './RecentActivity';

export function DashboardOverview() {
  return (
    <div className="min-h-screen bg-[#F6F5F2]">
      <DashboardHeader
        title="Dashboard"
        subtitle="Bienvenido de vuelta, Admin"
        onSearch={(query: any) => console.log('Search:', query)}
      />

      <main className="p-6 lg:p-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <StatsCard
            title="Total Usuarios"
            value={Number(dashboardStats.totalUsers)}
            change={12.5}
            icon={Users}
            color="blue"
            delay={0}
          />
          <StatsCard
            title="Total Posts"
            value={Number(dashboardStats.totalPosts)}
            change={8.2}  
            icon={FileText}
            color="gold"
            delay={0.1}
          />
          <StatsCard
            title="Planes Activos"
            value={Number(dashboardStats.activePlans)}
            change={5.7}
            icon={CreditCard}
            color="green"
            delay={0.2}
          />
          <StatsCard
            title="Ingresos Mensuales"
            value={Number(dashboardStats.monthlyRevenue)}
            change={18.3}
            icon={TrendingUp}
            color="purple"
            delay={0.3}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Chart - Takes 2 columns on large screens */}
          <div className="xl:col-span-2">
            
          </div>

          {/* Recent Activity */}
          <div className="xl:col-span-1">
            <RecentActivity />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickActionCard
            title="Gestionar Posts"
            description="Crear, editar o eliminar publicaciones"
            action="Ver Posts"
            onClick={() => {}}
          />
          <QuickActionCard
            title="Gestionar Usuarios"
            description="Administrar usuarios y permisos"
            action="Ver Usuarios"
            onClick={() => {}}
          />
          <QuickActionCard
            title="Configurar Planes"
            description="Modificar planes de suscripción"
            action="Ver Planes"
            onClick={() => {}}
          />
        </div>
      </main>
    </div>
  );
}

interface QuickActionCardProps {
  title: string;
  description: string;
  action: string;
  onClick: () => void;
}

function QuickActionCard({ title, description, action, onClick }: QuickActionCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <h4 className="font-semibold text-[#111111]">{title}</h4>
      <p className="text-sm text-[#6E6E6E] mt-1">{description}</p>
      <button
        onClick={onClick}
        className="mt-4 text-sm font-medium text-[#D4A03A] hover:text-[#B88A2F] transition-colors"
      >
        {action} →
      </button>
    </div>
  );
}
