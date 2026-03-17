import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { DebugPromptModal } from '../components/DebugPromptModal';
import { useTheme } from '../hooks/ThemeContext';
import { StarsBackground } from '../components/ui/stars-background';

export function DashboardLayout() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="flex flex-col h-[100dvh] w-screen bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-50 overflow-hidden font-sans transition-colors duration-300 relative">
      {isDark && (
        <StarsBackground className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
      )}
      <div className="relative z-10 flex flex-col h-full w-full">
        <Navbar />
        <main className="flex-1 overflow-hidden relative w-full h-full">
          <Outlet />
        </main>
      </div>
      <DebugPromptModal />
    </div>
  );
}
