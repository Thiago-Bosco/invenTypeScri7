
import React from 'react';
import { InventoryItem } from '@/types/inventory';
import { formatCurrency, formatSerialNumber, formatStatus } from '@/utils/formatters';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Server, Package, HardDrive, Database } from 'lucide-react';
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
  const getStatusColor = () => {
    switch (item.status) {
      case 'AVAILABLE': return "bg-green-100 text-green-800";
      case 'IN_USE': return "bg-blue-100 text-blue-800";
      case 'MAINTENANCE': return "bg-yellow-100 text-yellow-800";
      case 'DECOMMISSIONED': return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = () => {
    switch (categoryName.toLowerCase()) {
      case 'servidores':
        return <Server className="h-4 w-4 mr-1" />;
      case 'hardware':
        return <HardDrive className="h-4 w-4 mr-1" />;
      case 'software':
        return <Database className="h-4 w-4 mr-1" />;
      default:
        return <Package className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-medium text-lg">{item.name}</h3>
          <div className="flex items-center text-sm text-gray-500">
            {getCategoryIcon()}
            <span>{categoryName}</span>
          </div>
        </div>
        <Badge variant="outline" className={getStatusColor()}>
          {formatStatus(item.status)}
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
        {item.serialNumber && (
          <p>
            <span className="font-semibold">Nº de Série:</span> {formatSerialNumber(item.serialNumber)}
          </p>
        )}
        {item.manufacturer && (
          <p>
            <span className="font-semibold">Fabricante:</span> {item.manufacturer}
          </p>
        )}
        {item.model && (
          <p>
            <span className="font-semibold">Modelo:</span> {item.model}
          </p>
        )}
        {item.currentLocation && (
          <p>
            <span className="font-semibold">Localização Atual:</span> {item.currentLocation}
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
