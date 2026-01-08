
import React, { useState } from 'react';
import { ReplacementRequest, Member, UserRole } from '../types';
import { Icons, OFFICIAL_PLANS } from '../constants';

interface ReplacementsProps {
  role: UserRole;
  members: Member[];
  requests: ReplacementRequest[];
  currentStudent?: Member;
  onAddRequest: (request: Omit<ReplacementRequest, 'id' | 'status' | 'date' | 'studentName' | 'currentSeat' | 'currentBatch'>) => void;
  onUpdateStatus: (id: string, status: 'Approved' | 'Rejected') => void;
}

const Replacements: React.FC<ReplacementsProps> = ({ role, members, requests, currentStudent, onAddRequest, onUpdateStatus }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ requestedSeat: '', requestedBatch: '', reason: '' });

  const studentRequests = role === 'student' 
    ? requests.filter(r => r.memberId === currentStudent?.id) 
    : requests;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddRequest(formData);
    setShowForm(false);
    setFormData({ requestedSeat: '', requestedBatch: '', reason: '' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Replacement Center</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-1">
            {role === 'admin' ? 'Manage Seat & Batch Change Requests' : 'Request Seat or Shift Modifications'}
          </p>
        </div>
        {role === 'student' && (
          <button 
            onClick={() => setShowForm(true)}
            className="bg-[#84cc16] text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-[#65a30d] transition-all active:scale-95 flex items-center space-x-2"
          >
            <Icons.Plus className="w-4 h-4" />
            <span>New Request</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden transition-colors">
          <div className="p-8 border-b border-slate-50 dark:border-slate-700 flex justify-between items-center">
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Requests Registry</h3>
             <div className="flex space-x-4">
               <div className="flex items-center space-x-1.5">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Pending</span>
               </div>
               <div className="flex items-center space-x-1.5">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Approved</span>
               </div>
             </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-900/50">
                <tr className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  <th className="px-8 py-5">Date</th>
                  <th className="px-8 py-5">Student Info</th>
                  <th className="px-8 py-5">Change Details</th>
                  <th className="px-8 py-5">Reason</th>
                  <th className="px-8 py-5">Status</th>
                  {role === 'admin' && <th className="px-8 py-5 text-right">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {studentRequests.slice().reverse().map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors group">
                    <td className="px-8 py-6">
                      <p className="text-xs font-bold text-slate-400">{req.date}</p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-bold text-slate-800 dark:text-slate-200 text-sm uppercase">{req.studentName}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">ID: {req.memberId}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-2">
                        {req.requestedSeat && (
                          <div className="flex items-center space-x-2">
                            <span className="text-[9px] font-black text-slate-400 uppercase">Seat:</span>
                            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">{req.currentSeat}</span>
                            <span className="text-slate-300">→</span>
                            <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded">{req.requestedSeat}</span>
                          </div>
                        )}
                        {req.requestedBatch && (
                          <div className="flex items-center space-x-2">
                            <span className="text-[9px] font-black text-slate-400 uppercase">Batch:</span>
                            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 truncate max-w-[80px]">{req.currentBatch}</span>
                            <span className="text-slate-300">→</span>
                            <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded truncate max-w-[80px]">{req.requestedBatch}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-xs text-slate-500 dark:text-slate-400 italic max-w-[200px] line-clamp-2 leading-relaxed">"{req.reason}"</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest ${
                        req.status === 'Approved' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' :
                        req.status === 'Rejected' ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-600' :
                        'bg-amber-50 dark:bg-amber-900/20 text-amber-600 animate-pulse'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    {role === 'admin' && (
                      <td className="px-8 py-6 text-right">
                        {req.status === 'Pending' && (
                          <div className="flex justify-end space-x-2">
                            <button 
                              onClick={() => onUpdateStatus(req.id, 'Approved')}
                              className="p-2.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all"
                              title="Approve Change"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </button>
                            <button 
                              onClick={() => onUpdateStatus(req.id, 'Rejected')}
                              className="p-2.5 bg-rose-50 dark:bg-rose-900/30 text-rose-600 rounded-xl hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-all"
                              title="Reject Request"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
                {studentRequests.length === 0 && (
                  <tr>
                    <td colSpan={role === 'admin' ? 6 : 5} className="px-8 py-20 text-center text-slate-300 dark:text-slate-600 font-bold uppercase text-[10px] tracking-widest">
                      No replacement records found in registry.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="bg-white dark:bg-slate-800 rounded-[3rem] w-full max-w-xl shadow-4xl overflow-hidden border border-white dark:border-slate-700 animate-in zoom-in-95 duration-300">
            <div className="p-10 bg-slate-900 text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black uppercase tracking-tighter">Modification Request</h3>
                <p className="text-[10px] font-black text-[#84cc16] uppercase tracking-[0.2em] mt-1">Student Portal Hub</p>
              </div>
              <button onClick={() => setShowForm(false)} className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all"><Icons.Plus className="w-5 h-5 rotate-45 text-white" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Desired Seat No.</label>
                  <input 
                    type="text" 
                    placeholder="E.G. 42 (OPTIONAL)"
                    className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-2xl text-xs font-bold dark:text-white outline-none focus:ring-2 focus:ring-[#84cc16]/20 transition-all"
                    value={formData.requestedSeat}
                    onChange={e => setFormData({ ...formData, requestedSeat: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Desired Shift</label>
                  <select 
                    className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-2xl text-xs font-bold dark:text-white outline-none focus:ring-2 focus:ring-[#84cc16]/20 transition-all"
                    value={formData.requestedBatch}
                    onChange={e => setFormData({ ...formData, requestedBatch: e.target.value })}
                  >
                    <option value="">Stay in current shift...</option>
                    {OFFICIAL_PLANS.map(p => <option key={p.id} value={p.time}>{p.name} ({p.time})</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Reason for Change</label>
                <textarea 
                  required
                  placeholder="Tell us why you need this change beta..."
                  className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-2xl text-xs font-bold dark:text-white outline-none focus:ring-2 focus:ring-[#84cc16]/20 transition-all min-h-[120px]"
                  value={formData.reason}
                  onChange={e => setFormData({ ...formData, reason: e.target.value })}
                />
              </div>

              <div className="pt-4 flex flex-col items-center">
                <button 
                  type="submit"
                  className="w-full bg-slate-900 text-[#84cc16] py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-all active:scale-95"
                >
                  Submit to Registry
                </button>
                <p className="text-[9px] text-slate-400 font-bold uppercase mt-4 italic tracking-widest">Administrator will review and update your profile</p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Replacements;
