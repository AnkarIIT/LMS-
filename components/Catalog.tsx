
import React, { useState, useMemo, useEffect } from 'react';
import { Resource, AccessLog } from '../types';
import { Icons } from '../constants';

interface CatalogProps {
  resources: Resource[];
  accessLogs: AccessLog[];
  onAdd: (res: Omit<Resource, 'id'>) => void;
  onRemove: (id: string) => void;
  onAccess: (resId: string) => void;
}

// Major Exams that users want to "exclusively" focus on
const MAJOR_EXAMS = ['UPSC', 'SSC', 'NEET', 'JEE', 'BANKING', 'GATE'];
const OTHER_CATEGORIES = ['RAILWAYS', 'CBSE X', 'CBSE XII', 'BSEB X', 'BSEB XII', 'SKILLS'];
const ALL_CATEGORIES = ['ALL', ...MAJOR_EXAMS, ...OTHER_CATEGORIES];

const SUBJECT_MAP: Record<string, string[]> = {
  'UPSC': ['POLITY', 'HISTORY', 'ECONOMY', 'GEOGRAPHY', 'ETHICS', 'INTERNATIONAL RELATIONS', 'ENVIRONMENT'],
  'SSC': ['ENGLISH', 'QUANTS', 'REASONING', 'GENERAL AWARENESS'],
  'NEET': ['BIOLOGY', 'PHYSICS', 'CHEMISTRY'],
  'JEE': ['MATHS', 'PHYSICS', 'CHEMISTRY'],
  'BANKING': ['ENGLISH', 'REASONING', 'QUANTITATIVE APTITUDE', 'BANKING AWARENESS'],
  'RAILWAYS': ['GENERAL SCIENCE', 'GENERAL STUDIES', 'MATHS', 'REASONING'],
  'CBSE X': ['MATHS', 'SCIENCE', 'SOCIAL SCIENCE', 'HINDI', 'ENGLISH'],
  'CBSE XII': ['PHYSICS', 'CHEMISTRY', 'MATHS', 'BIOLOGY', 'ENGLISH'],
  'BSEB X': ['HINDI', 'SANSKRIT', 'MATHS', 'SCIENCE', 'SOCIAL SCIENCE'],
  'BSEB XII': ['PHYSICS', 'CHEMISTRY', 'MATHS', 'BIOLOGY', 'HINDI', 'ENGLISH'],
  'GATE': ['CORE SUBJECT', 'ENGINEERING MATHS', 'GENERAL APTITUDE'],
  'SKILLS': ['PROGRAMMING', 'OFFICE TOOLS', 'COMMUNICATION']
};

const Catalog: React.FC<CatalogProps> = ({ resources, accessLogs, onAdd, onRemove, onAccess }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeSubject, setActiveSubject] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingResource, setViewingResource] = useState<Resource | null>(null);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  
  const [newRes, setNewRes] = useState<Omit<Resource, 'id'>>({
    title: '', author: '', category: 'JEE', subject: '', type: 'PDF', accessUrl: '', description: '', thumbnail: ''
  });

  useEffect(() => {
    setActiveSubject('ALL');
  }, [activeCategory]);

  const availableSubjects = useMemo(() => {
    if (activeCategory === 'ALL') return [];
    return SUBJECT_MAP[activeCategory] || [];
  }, [activeCategory]);

  const filteredResources = useMemo(() => {
    return resources.filter(res => {
      const catMatch = activeCategory === 'ALL' || res.category === activeCategory;
      const subMatch = activeSubject === 'ALL' || res.subject === activeSubject;
      const searchMatch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          res.author.toLowerCase().includes(searchTerm.toLowerCase());
      return catMatch && subMatch && searchMatch;
    });
  }, [resources, activeCategory, activeSubject, searchTerm]);

  const handleOpenVault = (res: Resource) => {
    onAccess(res.id);
    setViewingResource(res);
  };

  const handleDownload = async (res: Resource) => {
    onAccess(res.id);
    
    if (res.type === 'PDF') {
      try {
        setIsDownloading(res.id);
        const response = await fetch(res.accessUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${res.title.replace(/\s+/g, '_')}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Direct download failed, falling back to new tab:", error);
        window.open(res.accessUrl, '_blank');
      } finally {
        setIsDownloading(null);
      }
    } else {
      window.open(res.accessUrl, '_blank');
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-700 pb-20">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight uppercase">Digital Repository</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 uppercase tracking-wider">Premium Academic Vault for Students</p>
          </div>
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="relative flex-grow md:w-80">
              <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by title or author..."
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#84cc16]/20 transition-all dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button onClick={() => setShowAdd(true)} className="bg-slate-900 dark:bg-slate-700 text-[#84cc16] px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl hover:bg-slate-800 dark:hover:bg-slate-600 transition-all shrink-0">
              <span>+ Add Entry</span>
            </button>
          </div>
        </div>

        {/* Exclusive Exam Focus Center */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-1.5 h-6 bg-[#84cc16] rounded-full"></div>
            <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Exam Focus Center</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('ALL')}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeCategory === 'ALL' 
                ? 'bg-slate-900 dark:bg-slate-600 text-[#84cc16] shadow-lg' 
                : 'bg-slate-50 dark:bg-slate-900 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              Show All
            </button>
            {MAJOR_EXAMS.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                  ? 'bg-[#84cc16] text-white shadow-lg shadow-[#84cc16]/20' 
                  : 'bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200 border border-slate-100 dark:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
            <div className="w-px h-10 bg-slate-100 dark:bg-slate-700 mx-2 hidden sm:block"></div>
            {OTHER_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                  ? 'bg-slate-800 dark:bg-slate-700 text-white shadow-lg' 
                  : 'bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {activeCategory !== 'ALL' && availableSubjects.length > 0 && (
            <div className="pt-6 border-t border-slate-50 dark:border-slate-700 animate-in slide-in-from-top-4 duration-500">
              <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Refine by Subject in {activeCategory}</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveSubject('ALL')}
                  className={`px-4 py-2 rounded-lg text-[9px] font-bold uppercase transition-all ${
                    activeSubject === 'ALL' 
                    ? 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200' 
                    : 'bg-white dark:bg-slate-900 text-slate-300 dark:text-slate-600 hover:text-slate-500 dark:hover:text-slate-400 border border-slate-100 dark:border-slate-700'
                  }`}
                >
                  All Subjects
                </button>
                {availableSubjects.map(sub => (
                  <button
                    key={sub}
                    onClick={() => setActiveSubject(sub)}
                    className={`px-4 py-2 rounded-lg text-[9px] font-bold uppercase transition-all ${
                      activeSubject === sub 
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 shadow-sm' 
                      : 'bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 border border-slate-100 dark:border-slate-700'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredResources.length > 0 ? filteredResources.map(res => (
          <div key={res.id} className="bg-white dark:bg-slate-800 p-0 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group flex flex-col h-full hover:border-[#84cc16]/30 overflow-hidden">
            {/* Thumbnail Header */}
            <div className="h-40 bg-slate-100 dark:bg-slate-900 relative overflow-hidden">
               {res.thumbnail ? (
                  <img src={res.thumbnail} alt={res.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icons.Inventory className="w-12 h-12 text-slate-200 dark:text-slate-800" />
                  </div>
               )}
               <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className={`px-2.5 py-1 rounded-md text-[8px] font-black uppercase tracking-wider shadow-sm ${
                    MAJOR_EXAMS.includes(res.category) ? 'bg-[#84cc16] text-white' : 'bg-slate-900/60 backdrop-blur-md text-white'
                  }`}>
                    {res.category}
                  </span>
               </div>
               <button onClick={() => onRemove(res.id)} className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 bg-white/10 hover:bg-rose-500 backdrop-blur-md text-white p-1.5 rounded-lg transition-all shadow-lg">
                  <Icons.Plus className="w-4 h-4 rotate-45" />
               </button>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                {res.subject && (
                  <span className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-900/30 rounded-md text-[8px] font-black text-indigo-400 dark:text-indigo-400 uppercase tracking-wider">
                    {res.subject}
                  </span>
                )}
                <span className="text-[8px] font-black text-slate-300 uppercase">{res.type}</span>
              </div>
              
              <h3 className="font-bold text-slate-800 dark:text-white text-sm mb-1 uppercase tracking-tight line-clamp-2 leading-snug">{res.title}</h3>
              <p className="text-[9px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">By {res.author}</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium leading-relaxed mb-6 flex-grow line-clamp-3">{res.description}</p>
              
              <div className="pt-5 border-t border-slate-50 dark:border-slate-700 space-y-2 mt-auto">
                <div className="flex gap-2">
                    <button 
                      onClick={() => handleOpenVault(res)}
                      className="flex-1 bg-slate-900 dark:bg-slate-700 text-[#84cc16] py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-800 dark:hover:bg-slate-600 transition-all flex items-center justify-center space-x-2"
                    >
                      <Icons.Inventory className="w-3 h-3" />
                      <span>Open Vault</span>
                    </button>
                    <a 
                      href={res.accessUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => onAccess(res.id)}
                      className="bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-600 w-11 h-11 rounded-xl flex items-center justify-center hover:bg-[#84cc16]/10 dark:hover:bg-[#84cc16]/20 hover:text-[#84cc16] transition-all border border-slate-100 dark:border-slate-700"
                      title="Open in Browser"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" />
                      </svg>
                    </a>
                </div>
                
                {/* Download Button */}
                <button 
                  onClick={() => handleDownload(res)}
                  disabled={isDownloading === res.id}
                  className="w-full bg-[#84cc16]/10 dark:bg-[#84cc16]/5 text-[#84cc16] py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#84cc16] hover:text-white transition-all flex items-center justify-center space-x-2 border border-[#84cc16]/20 disabled:opacity-50"
                >
                  {isDownloading === res.id ? (
                    <div className="w-3 h-3 border-2 border-[#84cc16] border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M7.5 12 12 16.5m0 0L16.5 12M12 16.5V3" />
                    </svg>
                  )}
                  <span>{res.type === 'PDF' ? (isDownloading === res.id ? 'Fetching...' : 'Download PDF') : 'Go to Source'}</span>
                </button>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-40 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 border-dashed">
             <div className="mb-6 opacity-5 dark:opacity-10 flex justify-center">
               <Icons.Inventory className="w-24 h-24 text-slate-900 dark:text-white" />
             </div>
             <p className="text-lg font-bold text-slate-300 dark:text-slate-600 uppercase tracking-[0.2em]">No Matches Found</p>
             <p className="text-slate-400 dark:text-slate-500 mt-2 font-medium text-[10px] uppercase tracking-widest">Adjust your filters or clear search to browse all books</p>
             <button onClick={() => {setActiveCategory('ALL'); setActiveSubject('ALL'); setSearchTerm('');}} className="mt-8 bg-slate-900 dark:bg-slate-700 text-[#84cc16] px-8 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-lg">Reset Hub</button>
          </div>
        )}
      </div>

      {/* Internal PDF Viewer Modal */}
      {viewingResource && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-7xl h-[92vh] rounded-[2.5rem] flex flex-col overflow-hidden shadow-4xl animate-in zoom-in-95 duration-300">
            <div className="px-8 py-6 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center shrink-0">
              <div className="flex items-center space-x-4">
                 <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl flex items-center justify-center border border-red-100 dark:border-red-900/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                 </div>
                 <div>
                    <h4 className="font-bold text-base text-slate-800 dark:text-white uppercase tracking-tight leading-none">{viewingResource.title}</h4>
                    <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1.5 flex items-center">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
                      Encrypted Connection • Internal Reader
                    </p>
                 </div>
              </div>
              <div className="flex items-center space-x-3">
                 <a 
                   href={viewingResource.accessUrl} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="bg-[#84cc16] text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-[#65a30d] transition-all"
                 >
                   If Blank, Click Here to Open Direct
                 </a>
                 <button onClick={() => setViewingResource(null)} className="bg-slate-900 dark:bg-slate-700 text-[#84cc16] w-12 h-12 rounded-xl flex items-center justify-center hover:rotate-90 transition-all shadow-xl">
                    <Icons.Plus className="w-6 h-6 rotate-45" />
                 </button>
              </div>
            </div>
            
            <div className="flex-1 bg-slate-200 dark:bg-slate-950 overflow-hidden relative">
               <div className="absolute inset-0 flex items-center justify-center z-0">
                  <div className="text-center p-12">
                     <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Establishing Secure Stream...</p>
                     <p className="text-[10px] text-slate-400 dark:text-slate-600 italic">Note: Some NCERT servers may block the internal reader. Use the "Direct Link" button above if the screen remains white.</p>
                  </div>
               </div>
               <iframe 
                 src={`${viewingResource.accessUrl}#toolbar=0&navpanes=0`} 
                 className="w-full h-full border-none bg-white dark:bg-slate-900 relative z-10"
                 title="Internal Reader"
               />
            </div>
            
            <div className="px-8 py-4 bg-slate-900 dark:bg-black text-white flex justify-between items-center shrink-0">
               <p className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-500">Authorized Academic Access Only</p>
               <span className="text-[9px] font-black text-[#84cc16] uppercase tracking-widest">Vidya Site Registry Node</span>
            </div>
          </div>
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[150] flex items-center justify-center p-6">
          <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-2xl p-10 shadow-2xl border border-white dark:border-slate-700 animate-in zoom-in-95 duration-500 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <h3 className="text-xl font-bold mb-8 text-slate-900 dark:text-white uppercase tracking-tight">New Asset Registration</h3>
            <form onSubmit={(e) => { e.preventDefault(); onAdd(newRes); setShowAdd(false); }} className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest ml-1">Asset Name</label>
                <input required className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl text-sm font-bold dark:text-white focus:ring-2 focus:ring-[#84cc16]/20 transition-all outline-none" value={newRes.title} onChange={e => setNewRes({...newRes, title: e.target.value.toUpperCase()})} placeholder="E.G. ORGANIC CHEMISTRY VOL 1" />
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest ml-1">Focus Category</label>
                  <select required className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl text-sm font-bold dark:text-white focus:ring-2 focus:ring-[#84cc16]/20 outline-none" value={newRes.category} onChange={e => setNewRes({...newRes, category: e.target.value})}>
                    {ALL_CATEGORIES.filter(c => c !== 'ALL').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest ml-1">Core Subject</label>
                  <select className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl text-sm font-bold dark:text-white focus:ring-2 focus:ring-[#84cc16]/20 outline-none" value={newRes.subject} onChange={e => setNewRes({...newRes, subject: e.target.value})}>
                    <option value="">None / Other</option>
                    {(SUBJECT_MAP[newRes.category] || []).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest ml-1">Resource Type</label>
                  <select className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl text-sm font-bold dark:text-white focus:ring-2 focus:ring-[#84cc16]/20 outline-none" value={newRes.type} onChange={e => setNewRes({...newRes, type: e.target.value as any})}>
                    <option value="PDF">PDF Document</option>
                    <option value="eBook">Digital eBook</option>
                    <option value="Video">Video Lecture</option>
                    <option value="Audiobook">Audio Resource</option>
                    <option value="Article">Research Article</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest ml-1">Author / Publisher</label>
                  <input required className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl text-sm font-bold dark:text-white focus:ring-2 focus:ring-[#84cc16]/20 outline-none" value={newRes.author} onChange={e => setNewRes({...newRes, author: e.target.value})} placeholder="E.G. HC VERMA" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest ml-1">Thumbnail URL (Optional)</label>
                <input type="url" className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl text-sm font-bold dark:text-white focus:ring-2 focus:ring-[#84cc16]/20 outline-none" value={newRes.thumbnail} onChange={e => setNewRes({...newRes, thumbnail: e.target.value})} placeholder="HTTPS://IMAGE.LINK/COVER.JPG" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest ml-1">Digital Access URL</label>
                <input required type="url" className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl text-sm font-bold dark:text-white focus:ring-2 focus:ring-[#84cc16]/20 outline-none" value={newRes.accessUrl} onChange={e => setNewRes({...newRes, accessUrl: e.target.value})} placeholder="HTTPS://PDF.LINK/..." />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest ml-1">Description</label>
                <textarea className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl text-sm font-bold dark:text-white focus:ring-2 focus:ring-[#84cc16]/20 outline-none min-h-[100px]" value={newRes.description} onChange={e => setNewRes({...newRes, description: e.target.value})} placeholder="BRIEF OVERVIEW OF THE RESOURCE..."></textarea>
              </div>

              <div className="flex space-x-4 pt-8">
                <button type="button" onClick={() => setShowAdd(false)} className="flex-1 py-4 text-slate-400 dark:text-slate-500 font-bold text-[10px] uppercase tracking-widest">Cancel</button>
                <button type="submit" className="flex-[2] bg-slate-900 dark:bg-slate-700 text-[#84cc16] py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">Publish Resource</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalog;
