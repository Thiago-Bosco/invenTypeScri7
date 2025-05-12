
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Settings = () => {
  const { toast } = useToast();

  const handleSaveGeneralSettings = () => {
    toast({
      title: 'Configurações salvas',
      description: 'As configurações gerais foram salvas com sucesso.',
    });
  };

  const handleSaveNotificationSettings = () => {
    toast({
      title: 'Configurações salvas',
      description: 'As configurações de notificações foram salvas com sucesso.',
    });
  };

  const handleExportData = () => {
    toast({
      title: 'Exportação iniciada',
      description: 'Seus dados estão sendo exportados. O download começará em breve.',
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">Gerencie as configurações do sistema</p>
        </div>

        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">Geral</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="data">Dados</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Gerais</CardTitle>
                <CardDescription>
                  Configure as preferências gerais do sistema de inventário.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="company_name">Nome da Empresa</Label>
                  <Input id="company_name" defaultValue="Minha Empresa" />
                </div>
                <div>
                  <Label htmlFor="currency">Moeda</Label>
                  <Input id="currency" defaultValue="BRL" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="allow_negative_stock" defaultChecked />
                  <Label htmlFor="allow_negative_stock">Permitir estoque negativo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="auto_calculate" />
                  <Label htmlFor="auto_calculate">Calcular valor automaticamente</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveGeneralSettings}>Salvar Configurações</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Notificações</CardTitle>
                <CardDescription>
                  Configure como e quando você deseja receber notificações.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="email_notifications" defaultChecked />
                  <Label htmlFor="email_notifications">Notificações por e-mail</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="low_stock_alerts" defaultChecked />
                  <Label htmlFor="low_stock_alerts">Alertas de estoque baixo</Label>
                </div>
                <div>
                  <Label htmlFor="email_address">E-mail para notificações</Label>
                  <Input id="email_address" type="email" placeholder="seu@email.com" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveNotificationSettings}>Salvar Configurações</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="data">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Dados</CardTitle>
                <CardDescription>
                  Exporte ou importe dados do sistema.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Exportar Dados</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Exporte todos os dados do inventário para um arquivo CSV.
                  </p>
                  <Button onClick={handleExportData}>Exportar para CSV</Button>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2">Importar Dados</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Importe dados de um arquivo CSV. O formato deve corresponder ao modelo de exportação.
                  </p>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="import_file">Arquivo CSV</Label>
                    <Input id="import_file" type="file" accept=".csv" />
                  </div>
                  <Button className="mt-4" variant="outline">Importar</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
