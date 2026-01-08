import React, { useState } from 'react';
import { Member } from '../types';
import { Icons } from '../constants';

interface ArchiveProps {
    members: Member[];
    onRestore: (member: Member) => void;
}

const Archive: React.FC<ArchiveProps> = ({ members, onRestore }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const archivedMembers = members.filter(m => m.isArchived);

    const filteredMembers = archivedMembers.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.phone.includes(searchTerm) ||
        m.seatNo.includes(searchTerm) ||
        m.id.includes(searchTerm)
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="relative w-96">
                    <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search Archive..."
                        className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none dark:text-white transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="bg-rose-50 dark:bg-rose-900/20 px-4 py-2 rounded-xl border border-rose-100 dark:border-rose-900/30">
                    <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Archive Vault: {archivedMembers.length} Students</p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden transition-colors">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-900/50">
                        <tr className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                            <th className="px-6 py-4">Student Info</th>
                            <th className="px-6 py-4">Former Seat</th>
                            <th className="px-6 py-4">Phone</th>
                            <th className="px-6 py-4 text-right pr-8">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {filteredMembers.map((member) => (
                            <tr key={member.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <p className="font-bold text-slate-800 dark:text-slate-200 text-xs uppercase">{member.name}</p>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">{member.id}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{member.seatNo}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-xs font-bold text-slate-600 dark:text-slate-400">{member.phone}</p>
                                </td>
                                <td className="px-6 py-4 text-right pr-8">
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={() => onRestore(member)}
                                            className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-emerald-100 transition-all active:scale-95"
                                        >
                                            Restore
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredMembers.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-20 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
                                    No students in archive vault.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Archive;
