
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR').format(date);
};

export const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
};

export const formatSerialNumber = (serialNumber?: string): string => {
  return serialNumber || 'N/A';
};

export const formatStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    'AVAILABLE': 'Disponível',
    'IN_USE': 'Em Uso',
    'MAINTENANCE': 'Em Manutenção',
    'DECOMMISSIONED': 'Desativado'
  };
  
  return statusMap[status] || status;
};

