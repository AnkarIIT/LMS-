
import React from 'react';
import { View, UserRole } from '../types';
import { Icons } from '../constants';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  userRole: UserRole;
  onLogout: () => void;
  studentName?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, userRole, onLogout, studentName }) => {
  const adminItems = [
    { id: 'dashboard', label: 'Registry Overview', icon: Icons.Dashboard },
    { id: 'attendance', label: 'Live Entry Log', icon: Icons.Batch },
    { id: 'catalog', label: 'Asset Library', icon: Icons.Inventory },
    { id: 'members', label: 'Student Roster', icon: Icons.Members },
    { id: 'archive', label: 'Archive Console', icon: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25-2.25M12 13.875V9m-9.75-1.5h19.5a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25z" /></svg> },
    { id: 'progress', label: 'Performance Hub', icon: Icons.Progress },
    { id: 'batch', label: 'Floor Matrix', icon: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg> },
    { id: 'replacements', label: 'Replacement Hub', icon: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg> },
    { id: 'payments', label: 'Financials', icon: Icons.Payments },
    { id: 'chat', label: 'Community Hub', icon: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.303.025-.607.047-.912.066a48.623 48.623 0 0 1-6.7 1.033c-.76.04-1.53-.105-2.203-.51l-2.203-1.323a2.25 2.25 0 0 1-1.026-1.58L5.75 12m14.5-3.489a48.29 48.29 0 0 0-14.5 0M5.75 12c-1.136-.093-1.98-.985-1.98-2.112V8.98a4.5 4.5 0 0 1 4.5-4.5h7.5c1.136 0 2.1.847 2.193 1.98v.631a4.5 4.5 0 0 1-2.193 4.192z" /></svg> },
    { id: 'ai-assistant', label: 'Vidya AI', icon: Icons.AI },
  ];

  const studentItems = [
    { id: 'student-home', label: 'Home Board', icon: Icons.Dashboard },
    { id: 'catalog', label: 'Academic Vault', icon: Icons.Inventory },
    { id: 'replacements', label: 'Modifications', icon: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg> },
    { id: 'my-performance', label: 'My Growth', icon: Icons.Progress },
    { id: 'my-attendance', label: 'Attendance', icon: Icons.Batch },
    { id: 'chat', label: 'Community Hub', icon: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.303.025-.607.047-.912.066a48.623 48.623 0 0 1-6.7 1.033c-.76.04-1.53-.105-2.203-.51l-2.203-1.323a2.25 2.25 0 0 1-1.026-1.58L5.75 12m14.5-3.489a48.29 48.29 0 0 0-14.5 0M5.75 12c-1.136-.093-1.98-.985-1.98-2.112V8.98a4.5 4.5 0 0 1 4.5-4.5h7.5c1.136 0 2.1.847 2.193 1.98v.631a4.5 4.5 0 0 1-2.193 4.192z" /></svg> },
    { id: 'ai-assistant', label: 'Study Assistant', icon: Icons.AI },
  ];

  const menuItems = userRole === 'admin' ? adminItems : studentItems;

  return (
    <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-100 dark:border-slate-700 flex flex-col shrink-0 z-50 transition-colors h-full overflow-hidden">
      <div className="p-8 flex flex-col h-full">
        <div className="flex items-center space-x-3 mb-10 px-1">
          <img
            src="https://image2url.com/r2/default/images/1767537268702-ace32085-6e35-4209-afed-54ffee4bfb6b.jpeg"
            alt="Vidya Library Logo"
            className="w-10 h-10 rounded-xl object-cover shadow-sm ring-1 ring-[#84cc16]"
          />
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white uppercase leading-none">Vidya</span>
            <span className="text-[9px] font-black text-[#84cc16] uppercase tracking-widest mt-1">{userRole === 'admin' ? 'Admin' : 'Student'}</span>
          </div>
        </div>

        <nav className="space-y-1 flex-grow overflow-y-auto pr-2 custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as View)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${currentView === item.id
                ? 'bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-semibold'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
            >
              <item.icon className={`w-5 h-5 ${currentView === item.id ? 'text-[#84cc16]' : 'text-slate-400 dark:text-slate-500'}`} />
              <span className="text-sm tracking-tight">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-slate-50 dark:border-slate-700 space-y-2">
          <button
            onClick={() => onViewChange('settings')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${currentView === 'settings'
              ? 'bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-semibold'
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50/50 dark:hover:bg-slate-900/50'
              }`}
          >
            <span className="text-slate-400 text-sm">⚙️</span>
            <span className="text-sm tracking-tight">Settings</span>
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20"
          >
            <span className="text-sm">🚪</span>
            <span className="text-sm tracking-tight font-bold uppercase">Exit Portal</span>
          </button>
          <div className="px-4 pt-4">
            <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Logged in as</p>
            <p className="text-xs font-black text-slate-900 dark:text-slate-200 uppercase truncate">{userRole === 'admin' ? 'Head Librarian' : studentName}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
