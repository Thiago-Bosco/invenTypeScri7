
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Package, 
  BarChart3, 
  ListPlus, 
  Tags, 
  ArrowRightLeft, 
  Menu, 
  X, 
  Settings,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

type SidebarProps = {
  className?: string;
};

const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso"
    });
    navigate('/login');
  };

  return (
    <div
      className={cn(
        'fixed left-0 top-0 z-40 h-screen transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        'bg-sidebar',
        className
      )}
    >
      <div className="flex h-full flex-col justify-between p-4">
        <div>
          <div className="mb-8 flex items-center justify-between">
            {!collapsed && (
              <h1 className="text-xl font-bold text-sidebar-foreground">
                Inventário
              </h1>
            )}
            <button
              onClick={toggleSidebar}
              className="rounded p-1.5 text-sidebar-foreground hover:bg-sidebar-accent"
            >
              {collapsed ? <Menu size={20} /> : <X size={20} />}
            </button>
          </div>

          <nav>
            <ul className="space-y-2">
              <SidebarItem
                to="/"
                icon={<BarChart3 size={20} />}
                text="Dashboard"
                collapsed={collapsed}
              />
              <SidebarItem
                to="/inventory"
                icon={<Package size={20} />}
                text="Inventário"
                collapsed={collapsed}
              />
              <SidebarItem
                to="/add-item"
                icon={<ListPlus size={20} />}
                text="Adicionar Item"
                collapsed={collapsed}
              />
              <SidebarItem
                to="/categories"
                icon={<Tags size={20} />}
                text="Categorias"
                collapsed={collapsed}
              />
              <SidebarItem
                to="/transactions"
                icon={<ArrowRightLeft size={20} />}
                text="Transações"
                collapsed={collapsed}
              />
            </ul>
          </nav>
        </div>

        <div>
          <ul className="space-y-2">
            <SidebarItem
              to="/settings"
              icon={<Settings size={20} />}
              text="Configurações"
              collapsed={collapsed}
            />
            <li>
              <button
                onClick={handleLogout}
                className={cn(
                  'flex w-full items-center rounded-md p-2 text-sidebar-foreground hover:bg-sidebar-accent',
                  !collapsed && 'px-4'
                )}
              >
                <span className="mr-3"><LogOut size={20} /></span>
                {!collapsed && <span>Sair</span>}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

type SidebarItemProps = {
  to: string;
  icon: React.ReactNode;
  text: string;
  collapsed: boolean;
};

const SidebarItem = ({ to, icon, text, collapsed }: SidebarItemProps) => {
  return (
    <li>
      <Link
        to={to}
        className={cn(
          'flex items-center rounded-md p-2 text-sidebar-foreground hover:bg-sidebar-accent',
          !collapsed && 'px-4'
        )}
      >
        <span className="mr-3">{icon}</span>
        {!collapsed && <span>{text}</span>}
      </Link>
    </li>
  );
};

export default Sidebar;
