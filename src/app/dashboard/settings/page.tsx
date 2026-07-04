import SettingsManager from '@/components/SettingsManager';

export const metadata = {
  title: 'Settings - Genesis Admin',
  description: 'Manage global settings for Genesis by Preethy',
};

export default function SettingsPage() {
  return (
    <div className="p-6">
      <SettingsManager />
    </div>
  );
}
