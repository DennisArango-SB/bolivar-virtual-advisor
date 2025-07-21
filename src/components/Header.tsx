import logoImage from '/lovable-uploads/9ef9747c-5dfc-499b-88ce-94061126da59.png';

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center sm:justify-start">
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-full p-2">
              <img src={logoImage} alt="Seguros Bolívar" className="h-8 w-8 object-contain" />
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