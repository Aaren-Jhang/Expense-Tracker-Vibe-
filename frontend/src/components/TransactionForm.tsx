import React, { useState } from 'react';
import type { TransactionCreate } from '../api';

interface TransactionFormProps {
    onSubmit: (data: TransactionCreate) => void;
}

const CATEGORIES = ['飲食', '衣物', '居住', '交通', '娛樂', '其他'];

export const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit }) => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || !category || !date) return;

        onSubmit({
            amount: parseFloat(amount),
            category,
            date,
            description,
        });

        setAmount('');
        setDescription('');
        // Keep date and category for convenience
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
            <h3 className="text-xl font-semibold text-forest-green mb-4">新增記帳</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">日期</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green transition-colors"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">類別</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green transition-colors bg-white"
                    >
                        {CATEGORIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-600 mb-1">金額</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0"
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green transition-colors text-lg font-medium"
                        required
                        min="0"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-600 mb-1">備註 (選填)</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="早餐、捷運..."
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green transition-colors"
                    />
                </div>
            </div>
            <button
                type="submit"
                className="w-full mt-6 bg-forest-green text-white py-3 rounded-xl font-medium hover:bg-opacity-90 active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-lg"
            >
                新增紀錄
            </button>
        </form>
    );
};
