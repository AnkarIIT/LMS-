
import React, { useState } from 'react';
import { Icons } from '../constants';

interface SettingsProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isDarkMode, onToggleDarkMode }) => {
  const [notifications, setNotifications] = useState({
    sound: true,
    entryAlerts: true,
    systemNotices: true
  });

  const [autoBackup, setAutoBackup] = useState(true);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">System Settings</h2>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.2em] mt-1.5">Configure your Vidya Node experience & Cloud Preferences</p>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-[#84cc16]/10 border border-[#84cc16]/20 rounded-xl">
          <span className="w-2 h-2 bg-[#84cc16] rounded-full animate-pulse"></span>
          <span className="text-[10px] font-black text-[#84cc16] uppercase tracking-widest">v4.2.1 Stable</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: General & Notifications */}
        <div className="lg:col-span-2 space-y-8">

          {/* Appearance Section */}
          <section className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-xl transition-all">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center">
              <span className="w-8 h-[1px] bg-slate-200 dark:bg-slate-700 mr-3"></span>
              Appearance & Interface
            </h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-5">
                <div className="w-14 h-14 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                  {isDarkMode ? '🌙' : '☀️'}
                </div>
                <div>
                  <h3 className="font-black text-slate-800 dark:text-white uppercase text-sm">Dark Mode Energy</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Toggle between cinematic dark & vivid light themes</p>
                </div>
              </div>
              <button
                onClick={onToggleDarkMode}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all focus:outline-none ring-offset-2 ring-transparent focus:ring-[#84cc16] ${isDarkMode ? 'bg-[#84cc16]' : 'bg-slate-100 dark:bg-slate-700'
                  }`}
              >
                <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform ${isDarkMode ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>
          </section>

          {/* Notifications Section */}
          <section className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-xl transition-all">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center">
              <span className="w-8 h-[1px] bg-slate-200 dark:bg-slate-700 mr-3"></span>
              Notification Center
            </h4>
            <div className="space-y-6">
              {[
                { id: 'sound', label: 'Auditory Feedback', desc: 'Enable sound effects for check-ins & check-outs', state: notifications.sound },
                { id: 'entryAlerts', label: 'Entry Alerts', desc: 'Display pop-up notifications for live entries', state: notifications.entryAlerts },
                { id: 'systemNotices', label: 'Cloud Synchronicity', desc: 'Notify when background data syncs with cloud node', state: notifications.systemNotices },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between group">
                  <div>
                    <h3 className="font-black text-slate-800 dark:text-white uppercase text-xs tracking-tight group-hover:text-[#84cc16] transition-colors">{item.label}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, [item.id]: !prev[item.id as keyof typeof notifications] }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all ${item.state ? 'bg-[#84cc16]' : 'bg-slate-100 dark:bg-slate-700'
                      }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${item.state ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Data Management */}
          <section className="bg-slate-900 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center">
                <span className="w-8 h-[1px] bg-slate-700 mr-3"></span>
                Data Vault & Backups
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                  <div className="text-2xl mb-3 group-hover:scale-110 transition-transform">📤</div>
                  <h5 className="text-white font-black uppercase text-xs">Export Core Registry</h5>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">Download encrypted JSON state</p>
                </div>
                <div className="p-6 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer group" onClick={() => setAutoBackup(!autoBackup)}>
                  <div className="flex justify-between items-start">
                    <div className="text-2xl mb-3 group-hover:scale-110 transition-transform">☁️</div>
                    <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${autoBackup ? 'bg-[#84cc16] text-black' : 'bg-slate-700 text-slate-400'}`}>
                      {autoBackup ? 'Active' : 'Disabled'}
                    </div>
                  </div>
                  <h5 className="text-white font-black uppercase text-xs">Auto-Sync to Cloud</h5>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">Real-time Supabase integration</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Profile & Security */}
        <div className="space-y-8">
          {/* Identity Card */}
          <section className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-xl transition-all">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 rounded-3xl flex items-center justify-center text-3xl mb-4 shadow-xl ring-4 ring-[#84cc16]/20">
                🏛️
              </div>
              <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tighter text-lg">Vidya Library</h3>
              <p className="text-[10px] text-[#84cc16] font-black uppercase tracking-[0.2em] mt-1">Mohanpur Bazar Branch</p>

              <div className="w-full mt-8 pt-8 border-t border-slate-50 dark:border-slate-700 space-y-4">
                <div className="flex justify-between items-center text-left">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Administrator</span>
                  <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase">Head Librarian</span>
                </div>
                <div className="flex justify-between items-center text-left">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Cloud Access</span>
                  <span className="text-[10px] font-bold text-emerald-500 uppercase flex items-center">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></span>
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Security Summary */}
          <section className="bg-[#84cc16] p-8 rounded-[2.5rem] shadow-xl shadow-[#84cc16]/20">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-xl">
                🛡️
              </div>
              <div>
                <h4 className="font-black text-black uppercase text-sm tracking-tight">Security Node</h4>
                <p className="text-[9px] text-black/60 font-black uppercase tracking-widest">End-to-End Encrypted</p>
              </div>
            </div>
            <button className="w-full bg-black text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-all">
              Change Admin Password
            </button>
            <p className="text-[8px] text-black/50 text-center mt-4 font-bold uppercase tracking-widest">Last changed: 4 days ago</p>
          </section>

          {/* About Widget */}
          <div className="p-6 text-center">
            <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Developed by</p>
            <p className="text-xs font-black text-slate-900 dark:text-slate-200 uppercase tracking-tighter italic">DeepMind Advanced Coding</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
