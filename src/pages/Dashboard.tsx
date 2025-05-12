
import React from 'react';
import { Package, AlertCircle, TrendingUp, ArrowRightLeft } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import { inventoryItems, inventoryTransactions } from '@/data/mockData';
import { formatCurrency } from '@/utils/formatters';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  // Calculate statistics
  const totalItems = inventoryItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = inventoryItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const lowStockItems = inventoryItems.filter(item => 
    item.minQuantity !== undefined && item.quantity <= item.minQuantity
  ).length;
  
  // Get recent transactions
  const recentTransactions = [...inventoryTransactions]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5);

  // Prepare chart data - items with highest value
  const chartData = inventoryItems
    .sort((a, b) => (b.price * b.quantity) - (a.price * a.quantity))
    .slice(0, 5)
    .map(item => ({
      name: item.name.length > 15 ? item.name.substring(0, 15) + '...' : item.name,
      value: item.price * item.quantity,
    }));

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Visão geral do seu inventário</p>
          </div>
          <div>
            <Button variant="default">Gerar relatório</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total de Itens" 
            value={totalItems} 
            icon={<Package size={24} />} 
            change={{ value: '12%', positive: true }}
          />
          <StatCard 
            title="Valor Total" 
            value={formatCurrency(totalValue)} 
            icon={<TrendingUp size={24} />} 
            change={{ value: '8%', positive: true }}
          />
          <StatCard 
            title="Itens em Estoque Baixo" 
            value={lowStockItems} 
            icon={<AlertCircle size={24} />} 
            className={lowStockItems > 0 ? "border-yellow-300" : ""}
          />
          <StatCard 
            title="Transações Recentes" 
            value={recentTransactions.length} 
            icon={<ArrowRightLeft size={24} />} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="font-bold mb-4">Itens com Maior Valor</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Bar dataKey="value" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="font-bold mb-4">Transações Recentes</h2>
            <div className="space-y-4">
              {recentTransactions.map(transaction => {
                const item = inventoryItems.find(i => i.id === transaction.itemId);
                return (
                  <div key={transaction.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{item?.name}</p>
                      <p className="text-sm text-gray-500">
                        {transaction.type === 'IN' ? 'Entrada' : 'Saída'} • {transaction.quantity} unidades
                      </p>
                    </div>
                    <div className={`text-sm ${transaction.type === 'IN' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'IN' ? '+' : '-'}{transaction.quantity}
                    </div>
                  </div>
                );
              })}
              
              <Button variant="outline" className="w-full mt-2">Ver todas as transações</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
