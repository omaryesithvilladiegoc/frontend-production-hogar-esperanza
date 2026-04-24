import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, CreditCard, Bell, Save, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

type TabType = 'platform' | 'payment' | 'notifications';

export function SettingsForm() {
  const [activeTab, setActiveTab] = useState<TabType>('platform');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: 'platform' as TabType, label: 'Plataforma', icon: Building2 },
    { id: 'payment' as TabType, label: 'Pagos', icon: CreditCard },
    { id: 'notifications' as TabType, label: 'Notificaciones', icon: Bell },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
    >
      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors relative',
                activeTab === tab.id
                  ? 'text-[#D4A03A]'
                  : 'text-[#6E6E6E] hover:text-[#111111]'
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4A03A]"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'platform' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="orgName">Nombre de la Organización</Label>
                <Input
                  id="orgName"
                  defaultValue="Hogar Esperanza"
                  className="focus-visible:ring-[#D4A03A]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orgEmail">Email de Contacto</Label>
                <Input
                  id="orgEmail"
                  type="email"
                  defaultValue="contacto@hogaresperanza.org"
                  className="focus-visible:ring-[#D4A03A]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orgPhone">Teléfono</Label>
                <Input
                  id="orgPhone"
                  defaultValue="+54 11 1234 5678"
                  className="focus-visible:ring-[#D4A03A]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orgAddress">Dirección</Label>
                <Input
                  id="orgAddress"
                  defaultValue="Av. Esperanza 1234, CABA"
                  className="focus-visible:ring-[#D4A03A]"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium text-[#111111]">Configuración General</h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#111111]">Registro Abierto</p>
                  <p className="text-xs text-[#6E6E6E]">Permitir nuevos usuarios registrarse</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#111111]">Mantenimiento</p>
                  <p className="text-xs text-[#6E6E6E]">Modo mantenimiento del sitio</p>
                </div>
                <Switch />
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'payment' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="currency">Moneda Principal</Label>
                <Select defaultValue="ars">
                  <SelectTrigger className="focus:ring-[#D4A03A]">
                    <SelectValue placeholder="Seleccionar moneda" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ars">ARS - Peso Argentino</SelectItem>
                    <SelectItem value="usd">USD - Dólar Estadounidense</SelectItem>
                    <SelectItem value="eur">EUR - Euro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxRate">Tasa de Impuestos (%)</Label>
                <Input
                  id="taxRate"
                  type="number"
                  defaultValue="21"
                  className="focus-visible:ring-[#D4A03A]"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium text-[#111111]">Métodos de Pago</h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#111111]">Tarjetas de Crédito</p>
                  <p className="text-xs text-[#6E6E6E]">Visa, Mastercard, Amex</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#111111]">MercadoPago</p>
                  <p className="text-xs text-[#6E6E6E]">Pagos con MercadoPago</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#111111]">Transferencia Bancaria</p>
                  <p className="text-xs text-[#6E6E6E]">Pagos por transferencia</p>
                </div>
                <Switch />
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'notifications' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h4 className="font-medium text-[#111111]">Notificaciones por Email</h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#111111]">Nuevos Usuarios</p>
                  <p className="text-xs text-[#6E6E6E]">Notificar cuando un usuario se registra</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#111111]">Nuevas Donaciones</p>
                  <p className="text-xs text-[#6E6E6E]">Notificar cuando se recibe una donación</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#111111]">Reportes Semanales</p>
                  <p className="text-xs text-[#6E6E6E]">Enviar resumen semanal por email</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium text-[#111111]">Notificaciones en la Plataforma</h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#111111]">Menciones</p>
                  <p className="text-xs text-[#6E6E6E]">Notificar cuando te mencionan</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#111111]">Actualizaciones del Sistema</p>
                  <p className="text-xs text-[#6E6E6E]">Notificar sobre actualizaciones</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
        <Button
          onClick={handleSave}
          className={cn(
            'gap-2 transition-all duration-300',
            saved
              ? 'bg-emerald-500 hover:bg-emerald-600'
              : 'bg-[#D4A03A] hover:bg-[#B88A2F]'
          )}
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              Guardado
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Guardar Cambios
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
