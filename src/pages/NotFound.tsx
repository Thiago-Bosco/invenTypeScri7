
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 p-8">
        <div className="flex justify-center">
          <div className="p-4 bg-blue-50 text-inventory-blue rounded-full">
            <Package size={48} />
          </div>
        </div>
        <h1 className="text-4xl font-bold">Página não encontrada</h1>
        <p className="text-xl text-gray-600 max-w-md mx-auto">
          A página que você está procurando não existe ou foi movida para outro lugar.
        </p>
        <div>
          <Button onClick={() => window.location.href = '/'}>
            Voltar para o Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
