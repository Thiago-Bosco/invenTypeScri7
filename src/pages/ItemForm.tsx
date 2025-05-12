
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import { categories, inventoryItems } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { InventoryItem } from '@/types/inventory';

const ItemForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!id;

  const [formData, setFormData] = useState<Partial<InventoryItem>>({
    name: '',
    description: '',
    categoryId: '',
    quantity: 0,
    minQuantity: 0,
    price: 0,
    unit: 'unidade',
    location: '',
  });

  useEffect(() => {
    if (isEditing) {
      const item = inventoryItems.find(item => item.id === id);
      if (item) {
        setFormData(item);
      } else {
        toast({
          title: 'Item não encontrado',
          description: 'O item que você está tentando editar não foi encontrado.',
          variant: 'destructive',
        });
        navigate('/inventory');
      }
    }
  }, [id, isEditing, navigate, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'minQuantity' || name === 'price' 
        ? parseFloat(value) 
        : value
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
    
    // Validate form
    if (!formData.name || !formData.categoryId || formData.quantity === undefined || formData.price === undefined) {
      toast({
        title: 'Erro no formulário',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    // In a real application, we would save the item to the database
    toast({
      title: isEditing ? 'Item atualizado' : 'Item adicionado',
      description: isEditing 
        ? 'O item foi atualizado com sucesso.' 
        : 'O item foi adicionado ao inventário com sucesso.',
    });

    navigate('/inventory');
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          {isEditing ? 'Editar Item' : 'Adicionar Novo Item'}
        </h1>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome do Item *</Label>
                <Input 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea 
                  id="description"
                  name="description"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="categoryId">Categoria *</Label>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value) => handleSelectChange('categoryId', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="location">Localização</Label>
                  <Input 
                    id="location"
                    name="location"
                    value={formData.location || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="quantity">Quantidade *</Label>
                  <Input 
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="0"
                    value={formData.quantity?.toString() || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="minQuantity">Quantidade Mínima</Label>
                  <Input 
                    id="minQuantity"
                    name="minQuantity"
                    type="number"
                    min="0"
                    value={formData.minQuantity?.toString() || ''}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="unit">Unidade</Label>
                  <Select
                    value={formData.unit}
                    onValueChange={(value) => handleSelectChange('unit', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma unidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="unidade">Unidade</SelectItem>
                        <SelectItem value="pacote">Pacote</SelectItem>
                        <SelectItem value="caixa">Caixa</SelectItem>
                        <SelectItem value="kg">Kg</SelectItem>
                        <SelectItem value="litro">Litro</SelectItem>
                        <SelectItem value="metro">Metro</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="price">Preço *</Label>
                <Input 
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price?.toString() || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 pt-6">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate('/inventory')}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {isEditing ? 'Atualizar' : 'Adicionar'} Item
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ItemForm;
