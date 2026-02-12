import React from 'react';
import type { Transaction } from '../api';

interface TransactionListProps {
    transactions: Transaction[];
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-xl font-semibold text-forest-green mb-4">最近交易</h3>
            {transactions.length === 0 ? (
                <p className="text-center text-slate-400 py-8">目前沒有交易紀錄</p>
            ) : (
                <div className="space-y-3">
                    {transactions.map((t) => (
                        <div key={t.id} className="flex items-center justify-between p-3 hover:bg-water-blue/30 rounded-xl transition-colors group">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-water-blue flex items-center justify-center text-forest-green text-sm font-bold group-hover:bg-forest-green group-hover:text-white transition-colors">
                                    {t.category[0]}
                                </div>
                                <div>
                                    <div className="font-medium text-slate-800">{t.category}</div>
                                    <div className="text-xs text-slate-400">{t.date} {t.description && `· ${t.description}`}</div>
                                </div>
                            </div>
                            <div className="font-bold text-slate-700">
                                NT$ {t.amount.toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
