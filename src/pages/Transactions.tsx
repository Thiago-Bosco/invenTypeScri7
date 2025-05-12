
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useToast } from '@/hooks/use-toast';
import { inventoryItems, inventoryTransactions } from '@/data/mockData';
import { Plus, ArrowUp, ArrowDown, Search, ArrowRight } from 'lucide-react';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    notes: '',
    responsiblePerson: '',
    sourceLocation: '',
    destinationLocation: ''
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
      notes: '',
      responsiblePerson: '',
      sourceLocation: '',
      destinationLocation: ''
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
    
    if (!formData.itemId || !formData.quantity || formData.quantity <= 0 || !formData.responsiblePerson) {
      toast({
        title: 'Erro no formulário',
        description: 'Por favor, preencha todos os campos obrigatórios corretamente.',
        variant: 'destructive',
      });
      return;
    }

    if (formData.type === 'TRANSFER' && (!formData.sourceLocation || !formData.destinationLocation)) {
      toast({
        title: 'Erro no formulário',
        description: 'Para transferências, é necessário informar a origem e o destino.',
        variant: 'destructive',
      });
      return;
    }

    // In a real application, we would save the transaction to the database
    toast({
      title: 'Movimentação registrada',
      description: 'A movimentação foi registrada com sucesso.',
    });

    handleCloseDialog();
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Movimentações</h1>
            <p className="text-muted-foreground">Histórico de movimentações de equipamentos</p>
          </div>
          <Button onClick={handleOpenDialog}>
            <Plus size={16} className="mr-2" />
            Nova Movimentação
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
                  <SelectItem value="TRANSFER">Transferências</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Origem/Destino</TableHead>
                <TableHead>Notas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => {
                  const item = inventoryItems.find(i => i.id === transaction.itemId);
                  return (
                    <TableRow key={transaction.id}>
                      <TableCell>{formatDate(transaction.date)}</TableCell>
                      <TableCell className="font-medium">{item?.name}</TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${transaction.type === 'IN' 
                            ? 'bg-green-100 text-green-800' 
                            : transaction.type === 'OUT'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-blue-100 text-blue-800'}`
                        }>
                          {transaction.type === 'IN' 
                            ? <ArrowDown size={12} className="mr-1" /> 
                            : transaction.type === 'OUT'
                              ? <ArrowUp size={12} className="mr-1" />
                              : <ArrowRight size={12} className="mr-1" />
                          }
                          {transaction.type === 'IN' ? 'Entrada' : transaction.type === 'OUT' ? 'Saída' : 'Transferência'}
                        </div>
                      </TableCell>
                      <TableCell>{transaction.quantity}</TableCell>
                      <TableCell>{transaction.responsiblePerson || '-'}</TableCell>
                      <TableCell>
                        {transaction.type === 'TRANSFER' 
                          ? `${transaction.sourceLocation} → ${transaction.destinationLocation}`
                          : transaction.type === 'IN'
                            ? transaction.destinationLocation
                            : transaction.sourceLocation || '-'}
                      </TableCell>
                      <TableCell className="text-gray-500">{transaction.notes || '-'}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500 py-4">
                    Nenhuma movimentação encontrada.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Nova Movimentação</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="itemId">Equipamento *</Label>
                <Select
                  value={formData.itemId}
                  onValueChange={(value) => handleSelectChange('itemId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um equipamento" />
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
                <Label htmlFor="type">Tipo de Movimentação *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange('type', value as 'IN' | 'OUT' | 'TRANSFER')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="IN">Entrada</SelectItem>
                      <SelectItem value="OUT">Saída</SelectItem>
                      <SelectItem value="TRANSFER">Transferência</SelectItem>
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
                <Label htmlFor="responsiblePerson">Responsável *</Label>
                <Input 
                  id="responsiblePerson"
                  name="responsiblePerson"
                  value={formData.responsiblePerson || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              {formData.type === 'IN' && (
                <div>
                  <Label htmlFor="destinationLocation">Local de Destino *</Label>
                  <Input 
                    id="destinationLocation"
                    name="destinationLocation"
                    value={formData.destinationLocation || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}
              
              {formData.type === 'OUT' && (
                <div>
                  <Label htmlFor="sourceLocation">Local de Origem *</Label>
                  <Input 
                    id="sourceLocation"
                    name="sourceLocation"
                    value={formData.sourceLocation || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}
              
              {formData.type === 'TRANSFER' && (
                <>
                  <div>
                    <Label htmlFor="sourceLocation">Local de Origem *</Label>
                    <Input 
                      id="sourceLocation"
                      name="sourceLocation"
                      value={formData.sourceLocation || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="destinationLocation">Local de Destino *</Label>
                    <Input 
                      id="destinationLocation"
                      name="destinationLocation"
                      value={formData.destinationLocation || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </>
              )}
              
              <div>
                <Label htmlFor="notes">Observações</Label>
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
                Registrar Movimentação
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Transactions;
