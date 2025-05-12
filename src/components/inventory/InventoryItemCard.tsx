
import React from 'react';
import { InventoryItem } from '@/types/inventory';
import { formatCurrency } from '@/utils/formatters';
import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type InventoryItemCardProps = {
  item: InventoryItem;
  categoryName: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const InventoryItemCard = ({
  item,
  categoryName,
  onEdit,
  onDelete,
}: InventoryItemCardProps) => {
  const getStockStatusColor = () => {
    if (!item.minQuantity) return "bg-blue-100 text-blue-800";
    if (item.quantity <= 0) return "bg-red-100 text-red-800";
    if (item.quantity <= item.minQuantity) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  const getStockStatusText = () => {
    if (item.quantity <= 0) return "Sem estoque";
    if (item.minQuantity && item.quantity <= item.minQuantity) return "Estoque baixo";
    return "Em estoque";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-medium text-lg">{item.name}</h3>
          <p className="text-sm text-gray-500">{categoryName}</p>
        </div>
        <Badge variant="outline" className={getStockStatusColor()}>
          {getStockStatusText()}
        </Badge>
      </div>
      
      <div className="mt-2 text-sm space-y-2 flex-grow">
        {item.description && <p className="text-gray-600">{item.description}</p>}
        <p>
          <span className="font-semibold">Quantidade:</span> {item.quantity} {item.unit}
        </p>
        <p>
          <span className="font-semibold">Preço:</span> {formatCurrency(item.price)}
        </p>
        {item.location && (
          <p>
            <span className="font-semibold">Localização:</span> {item.location}
          </p>
        )}
      </div>
      
      <div className="mt-4 flex justify-end pt-3 border-t">
        <button 
          onClick={() => onEdit(item.id)}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-md mr-2"
          title="Editar"
        >
          <Edit size={18} />
        </button>
        <button 
          onClick={() => onDelete(item.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-md"
          title="Excluir"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default InventoryItemCard;
