
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useToast } from '@/hooks/use-toast';
import { inventoryItems, inventoryTransactions } from '@/data/mockData';
import { Plus, ArrowUp, ArrowDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatDate } from '@/utils/formatters';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { InventoryTransaction } from '@/types/inventory';

const Transactions = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<InventoryTransaction>>({
    itemId: '',
    type: 'IN',
    quantity: 1,
    date: new Date(),
    notes: ''
  });

  // Filter transactions based on search and type filter
  const filteredTransactions = inventoryTransactions.filter(transaction => {
    const item = inventoryItems.find(i => i.id === transaction.itemId);
    const matchesSearch = item && item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    return matchesSearch && matchesType;
  }).sort((a, b) => b.date.getTime() - a.date.getTime());

  const handleOpenDialog = () => {
    setFormData({
      itemId: '',
      type: 'IN',
      quantity: 1,
      date: new Date(),
      notes: ''
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value, 10) : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.itemId || !formData.quantity || formData.quantity <= 0) {
      toast({
        title: 'Erro no formulário',
        description: 'Por favor, preencha todos os campos obrigatórios corretamente.',
        variant: 'destructive',
      });
      return;
    }

    // In a real application, we would save the transaction to the database
    toast({
      title: 'Transação registrada',
      description: 'A transação foi registrada com sucesso.',
    });

    handleCloseDialog();
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Transações</h1>
            <p className="text-muted-foreground">Histórico de entradas e saídas do inventário</p>
          </div>
          <Button onClick={handleOpenDialog}>
            <Plus size={16} className="mr-2" />
            Nova Transação
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por item..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-full md:w-64">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="IN">Entradas</SelectItem>
                  <SelectItem value="OUT">Saídas</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantidade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notas
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => {
                const item = inventoryItems.find(i => i.id === transaction.itemId);
                return (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">{formatDate(transaction.date)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{item?.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${transaction.type === 'IN' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'}`
                      }>
                        {transaction.type === 'IN' 
                          ? <ArrowDown size={12} className="mr-1" /> 
                          : <ArrowUp size={12} className="mr-1" />
                        }
                        {transaction.type === 'IN' ? 'Entrada' : 'Saída'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">{transaction.quantity}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {transaction.notes || '-'}
                      </div>
                    </td>
                  </tr>
                );
              })}
              
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    Nenhuma transação encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Transação</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="itemId">Item *</Label>
                <Select
                  value={formData.itemId}
                  onValueChange={(value) => handleSelectChange('itemId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um item" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {inventoryItems.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="type">Tipo *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange('type', value as 'IN' | 'OUT')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="IN">Entrada</SelectItem>
                      <SelectItem value="OUT">Saída</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="quantity">Quantidade *</Label>
                <Input 
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity?.toString() || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="notes">Notas</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes || ''}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancelar
              </Button>
              <Button type="submit">
                Registrar Transação
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Transactions;
