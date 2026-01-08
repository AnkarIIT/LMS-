
import React, { useState } from 'react';
import { Member } from '../types';

interface LoginProps {
  onLogin: (role: 'admin' | 'student', student?: Member) => void;
  members: Member[];
}

const ADMIN_CONFIG = {
  id: 'admin@vidyalibrary.com',
  password: 'vidyaadmin#2024',
  email: 'ankarranjan3@gmail.com'
};

const Login: React.FC<LoginProps> = ({ onLogin, members }) => {
  const [mode, setMode] = useState<'selection' | 'student-login' | 'admin-login'>('selection');
  const [uuid, setUuid] = useState('');
  const [password, setPassword] = useState('');
  const [adminId, setAdminId] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const student = members.find(m => 
      m.id.toLowerCase() === uuid.trim().toLowerCase() && 
      (m.password === password || (!m.password && password === 'vidya123'))
    );
    
    if (student) {
      onLogin('student', student);
    } else {
      setError('Access Denied: Invalid Student UUID or Password.');
    }
  };

  const handleAdminCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminId === ADMIN_CONFIG.id && adminPass === ADMIN_CONFIG.password) {
      setError('');
      setIsLoading(true);
      
      // Simulate slight authentication delay for security feel
      setTimeout(() => {
        setIsLoading(false);
        onLogin('admin');
      }, 800);
    } else {
      setError('Invalid Admin Credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-slate-800 rounded-[3rem] shadow-4xl overflow-hidden border border-slate-100 dark:border-slate-700">
        <div className="p-12 bg-slate-900 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-8">
              <img 
                src="https://image2url.com/r2/default/images/1767537268702-ace32085-6e35-4209-afed-54ffee4bfb6b.jpeg" 
                alt="Vidya" 
                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-[#84cc16]"
              />
              <h1 className="text-2xl font-black uppercase tracking-tighter text-white">Vidya Library</h1>
            </div>
            <h2 className="text-4xl font-black leading-tight uppercase tracking-tighter mb-4 italic">
              {mode.startsWith('admin') ? 'Administrator' : 'Academic'} <span className="text-[#84cc16]">Portal.</span>
            </h2>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              {mode.startsWith('admin') 
                ? 'Central management node. Control library assets, membership registry, and financial logs from a single interface.' 
                : 'Access premium resources, track your growth, and study in a distraction-free environment.'}
            </p>
          </div>
          <div className="pt-8 border-t border-white/10 relative z-10">
            <p className="text-[10px] font-black text-[#84cc16] uppercase tracking-[0.3em]">Central Registry Node</p>
            <p className="text-xs text-slate-500 font-bold uppercase">Sitamarhi, Bihar</p>
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#84cc16]/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="p-12 flex flex-col justify-center">
          {mode === 'selection' ? (
            <div className="space-y-6">
              <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Select Portal</h3>
              <button 
                onClick={() => setMode('admin-login')}
                className="w-full group p-6 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-[2rem] text-left hover:border-[#84cc16] transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-black text-slate-800 dark:text-white uppercase text-sm">Library Administrator</p>
                    <p className="text-xs text-slate-400 font-medium">Full Registry Control</p>
                  </div>
                  <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center group-hover:bg-[#84cc16] group-hover:text-white transition-all shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2V7a5 5 0 00-5-5zM7 7a3 3 0 116 0v2H7V7z" />
                    </svg>
                  </div>
                </div>
              </button>
              <button 
                onClick={() => setMode('student-login')}
                className="w-full group p-6 bg-[#84cc16]/5 border border-[#84cc16]/20 rounded-[2rem] text-left hover:border-[#84cc16] transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-black text-[#84cc16] uppercase text-sm">Student Member</p>
                    <p className="text-xs text-[#84cc16]/60 font-medium">Access your studies & hub</p>
                  </div>
                  <div className="w-10 h-10 bg-[#84cc16] rounded-xl flex items-center justify-center text-white transition-all shadow-lg shadow-[#84cc16]/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          ) : mode === 'student-login' ? (
            <div className="space-y-6">
              <button onClick={() => {setMode('selection'); setError('');}} className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Go Back
              </button>
              <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Student Digital Key</h3>
              <form onSubmit={handleStudentLogin} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Student UUID</label>
                  <input required type="text" placeholder="Enter UUID" className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-[#84cc16]/20 transition-all" value={uuid} onChange={e => setUuid(e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Secure Password</label>
                  <input required type="password" placeholder="••••••••" className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-[#84cc16]/20 transition-all" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                {error && <p className="text-rose-500 text-[10px] font-bold uppercase ml-1 animate-pulse">{error}</p>}
                <button type="submit" className="w-full bg-slate-900 text-[#84cc16] py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-all active:scale-95 mt-4"> Authenticate </button>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              <button onClick={() => {setMode('selection'); setError('');}} className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Main Gate
              </button>
              <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Admin Vault Entry</h3>
              <form onSubmit={handleAdminCredentials} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Administrator ID</label>
                  <input required type="email" placeholder="admin@vidyalibrary.com" className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-[#84cc16]/20 transition-all" value={adminId} onChange={e => setAdminId(e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Master Password</label>
                  <input required type="password" placeholder="••••••••" className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-bold dark:text-white outline-none focus:ring-2 focus:ring-[#84cc16]/20 transition-all" value={adminPass} onChange={e => setAdminPass(e.target.value)} />
                </div>
                {error && <p className="text-rose-500 text-[10px] font-bold uppercase ml-1">{error}</p>}
                <button 
                  disabled={isLoading}
                  type="submit" 
                  className="w-full bg-slate-900 text-[#84cc16] py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-all active:scale-95 mt-4 disabled:opacity-50"
                > 
                  {isLoading ? 'Verifying...' : 'Authenticate'} 
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
