import React, { useState } from 'react';
import { Translation, PriorityRule } from '../types';
import { Plus, X, GripVertical, ArrowLeft } from 'lucide-react';

interface Props {
  t: Translation['tuning'];
  initialRules: PriorityRule[];
  onComplete: (rules: PriorityRule[]) => void;
  onBack: () => void;
  isSettingsMode?: boolean;
}

const PriorityTuning: React.FC<Props> = ({ t, initialRules, onComplete, onBack, isSettingsMode = false }) => {
  const [rules, setRules] = useState<PriorityRule[]>(initialRules);
  const [newKeywordInput, setNewKeywordInput] = useState<{ id: string; val: string } | null>(null);
  
  // Drag State
  const [draggedItem, setDraggedItem] = useState<{ ruleId: string; keyword: string } | null>(null);
  const [dragOverRuleId, setDragOverRuleId] = useState<string | null>(null);

  const removeKeyword = (ruleId: string, keyword: string) => {
    setRules(prev => prev.map(r => 
      r.id === ruleId ? { ...r, keywords: r.keywords.filter(k => k !== keyword) } : r
    ));
  };

  const addKeyword = (ruleId: string) => {
    if (!newKeywordInput || !newKeywordInput.val.trim()) return;
    setRules(prev => prev.map(r => 
      r.id === ruleId ? { ...r, keywords: [...r.keywords, newKeywordInput.val.trim()] } : r
    ));
    setNewKeywordInput(null);
  };

  // -- Drag & Drop Handlers --

  const handleDragStart = (e: React.DragEvent, ruleId: string, keyword: string) => {
    setDraggedItem({ ruleId, keyword });
    // This effectAllowed is standard
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, ruleId: string) => {
    e.preventDefault(); // Necessary to allow dropping
    if (draggedItem?.ruleId !== ruleId) {
        setDragOverRuleId(ruleId);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setDragOverRuleId(null);
  };

  const handleDrop = (e: React.DragEvent, targetRuleId: string) => {
    e.preventDefault();
    setDragOverRuleId(null);

    if (!draggedItem) return;
    if (draggedItem.ruleId === targetRuleId) return; // Same container, reordering not implemented for simplicity, but basic move checks out.

    // 1. Remove from source
    // 2. Add to target (if not exists)
    
    setRules(prev => {
        const nextRules = prev.map(rule => {
            // Remove from source
            if (rule.id === draggedItem.ruleId) {
                return { ...rule, keywords: rule.keywords.filter(k => k !== draggedItem.keyword) };
            }
            // Add to target
            if (rule.id === targetRuleId) {
                // Prevent duplicates
                if (rule.keywords.includes(draggedItem.keyword)) return rule;
                return { ...rule, keywords: [...rule.keywords, draggedItem.keyword] };
            }
            return rule;
        });
        return nextRules;
    });
    
    setDraggedItem(null);
  };

  return (
    <div className="flex min-h-screen flex-col px-4 pt-12 pb-24 max-w-2xl mx-auto">
      {/* Header with Back Button */}
      <div className="mb-8 flex items-start gap-4">
        <button 
            onClick={onBack}
            className="mt-1 rounded-full p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
        >
            <ArrowLeft size={24} />
        </button>
        <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-white">{t.title}</h2>
            <p className="text-lg text-zinc-400">{t.subtitle}</p>
        </div>
      </div>

      <div className="space-y-6">
        {rules.map((rule) => {
            const isDragOver = dragOverRuleId === rule.id;
            
            return (
              <div 
                key={rule.id} 
                onDragOver={(e) => handleDragOver(e, rule.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, rule.id)}
                className={`relative overflow-hidden rounded-3xl border transition-all duration-300 ${
                    isDragOver 
                        ? 'border-indigo-500 bg-indigo-500/10 scale-[1.02] shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)]' 
                        : 'border-white/10 bg-white/5'
                }`}
              >
                 {/* Header */}
                <div className={`h-2 w-full ${rule.color} opacity-80`} />
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <GripVertical className="text-zinc-600" size={20} />
                            <h3 className="text-xl font-bold text-white">{rule.name}</h3>
                        </div>
                        {rule.keywords.length === 0 && (
                            <span className="text-xs text-zinc-600 italic">Drop items here</span>
                        )}
                    </div>
    
                    {/* Chips */}
                    <div className="flex flex-wrap gap-2">
                        {rule.keywords.map(k => (
                            <span 
                                key={k} 
                                draggable
                                onDragStart={(e) => handleDragStart(e, rule.id, k)}
                                className="group/chip cursor-grab active:cursor-grabbing inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-zinc-200 hover:bg-white/10 hover:border-white/20 transition-all shadow-sm"
                            >
                                <GripVertical size={12} className="text-zinc-600 group-hover/chip:text-zinc-400" />
                                {k}
                                <button 
                                    onClick={() => removeKeyword(rule.id, k)}
                                    className="ml-1 text-zinc-500 hover:text-red-400 transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            </span>
                        ))}
                        
                        {/* Add Button / Input */}
                        {newKeywordInput?.id === rule.id ? (
                            <div className="flex items-center gap-2">
                                <input 
                                    autoFocus
                                    type="text" 
                                    value={newKeywordInput.val}
                                    onChange={(e) => setNewKeywordInput({ id: rule.id, val: e.target.value })}
                                    onKeyDown={(e) => {
                                        if(e.key === 'Enter') addKeyword(rule.id);
                                        if(e.key === 'Escape') setNewKeywordInput(null);
                                    }}
                                    className="w-32 rounded-lg border border-indigo-500 bg-black/40 px-3 py-1 text-sm text-white focus:outline-none"
                                    placeholder={t.addKeyword}
                                />
                            </div>
                        ) : (
                            <button 
                                onClick={() => setNewKeywordInput({ id: rule.id, val: '' })}
                                className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-zinc-600 px-3 py-1.5 text-sm font-medium text-zinc-500 hover:border-indigo-500 hover:text-indigo-400 transition-all"
                            >
                                <Plus size={14} />
                                {t.addKeyword}
                            </button>
                        )}
                    </div>
                </div>
              </div>
            );
        })}
      </div>

      {/* Footer Action */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl p-6">
        <div className="mx-auto max-w-2xl">
            <button
                onClick={() => onComplete(rules)}
                className="group relative flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-4 text-lg font-bold tracking-tight text-white shadow-lg transition-all hover:scale-[1.02] active:scale-95"
            >
                {t.save}
            </button>
        </div>
      </div>
    </div>
  );
};

export default PriorityTuning;