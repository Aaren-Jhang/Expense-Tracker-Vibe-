import React from 'react';
import type { Summary as SummaryType } from '../api';

interface SummaryProps {
    summary: SummaryType | null;
}

export const Summary: React.FC<SummaryProps> = ({ summary }) => {
    if (!summary) return null;

    return (
        <div className="bg-forest-green text-white rounded-2xl p-6 shadow-lg mb-8 transform hover:scale-[1.02] transition-transform duration-300">
            <h2 className="text-sm uppercase tracking-wider opacity-80 mb-1">本月總支出</h2>
            <div className="flex items-baseline">
                <span className="text-4xl font-light mr-2">NT$</span>
                <span className="text-6xl font-bold">{summary.total_expenses.toLocaleString()}</span>
            </div>
            <div className="mt-4 text-sm opacity-70 text-right">
                {summary.year} 年 {summary.month} 月
            </div>
        </div>
    );
};
