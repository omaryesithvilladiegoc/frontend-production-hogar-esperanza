import { DashboardHeader } from '../dashboard/DashboardHeader';
import { SettingsForm } from './SettingsForm';

export function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#F6F5F2]">
      <DashboardHeader
        title="Configuración"
        subtitle="Gestiona la configuración de la plataforma"
      />

      <main className="p-6 lg:p-8">
        <div className="max-w-4xl">
          <SettingsForm />
        </div>
      </main>
    </div>
  );
}
