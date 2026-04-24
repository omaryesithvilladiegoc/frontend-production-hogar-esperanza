"use client"
import { Bell, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  onSearch?: (query: string) => void;
  onCreate?: () => void;
  createButtonLabel?: string;
}

export function DashboardHeader({
  title,
  subtitle,
  onSearch,
  onCreate,
  createButtonLabel = 'Crear Nuevo',
}: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 lg:px-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Title Section */}
        <div>
          <h1 className="text-2xl font-bold text-[#111111]">{title}</h1>
          {subtitle && <p className="text-[#6E6E6E] text-sm mt-1">{subtitle}</p>}
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-3">
          {/* Search */}
          {onSearch && (
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar..."
                onChange={(e) => onSearch(e.target.value)}
                className="pl-10 w-64 bg-gray-50 border-gray-200 focus:bg-white focus:border-[#D4A03A] focus:ring-[#D4A03A]/20"
              />
            </div>
          )}

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="relative border-gray-200 hover:bg-gray-50"
              >
                <Bell className="w-4 h-4 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4A03A] text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Nuevo usuario registrado</span>
                  <span className="text-xs text-gray-500">Hace 5 minutos</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Post publicado</span>
                  <span className="text-xs text-gray-500">Hace 1 hora</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Actualización de plan</span>
                  <span className="text-xs text-gray-500">Hace 2 horas</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Create Button */}
          {onCreate && (
            <Button
              onClick={onCreate}
              className="bg-[#D4A03A] hover:bg-[#B88A2F] text-white gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">{createButtonLabel}</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
