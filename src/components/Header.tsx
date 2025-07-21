import { Shield } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center sm:justify-start">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-foreground rounded-full p-2">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-bold">Seguros Bolívar</h1>
              <p className="text-xs sm:text-sm opacity-90">Asesor Virtual de Seguros</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;