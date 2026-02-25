import { Outlet } from 'react-router';
import { QuickNav } from '../components/QuickNav';
import { LanguageToggle } from '../components/LanguageToggle';

export function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-4 right-4 z-50">
        <LanguageToggle />
      </div>
      <Outlet />
      <QuickNav />
    </div>
  );
}