import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send, Shield, Heart, Car, Home } from 'lucide-react';

const NeedForm = () => {
  const [necesidad, setNecesidad] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const exampleNeeds = [
    { icon: Heart, text: "Quiero proteger a mis hijos" },
    { icon: Car, text: "Necesito seguro para mi vehículo" },
    { icon: Home, text: "Quiero asegurar mi hogar" },
    { icon: Shield, text: "Busco un seguro de vida" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!necesidad.trim()) {
      toast({
        title: "Campo requerido",
        description: "Por favor, describe tu necesidad de seguro.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('necesidad', necesidad.trim());

      const response = await fetch(
        'https://primary-production-babea.up.railway.app/webhook-test/f2589c52-5985-488c-8187-bc59af3a3757',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      toast({
        title: "Solicitud enviada",
        description: "Hemos recibido tu necesidad. Un asesor se pondrá en contacto contigo pronto.",
      });
      
      setNecesidad('');
    } catch (error) {
      toast({
        title: "Error de conexión",
        description: "No pudimos procesar tu solicitud. Por favor, intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (text: string) => {
    setNecesidad(text);
  };

  return (
    <div className="bg-card rounded-lg shadow-lg p-6 sm:p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
          ¿Cómo podemos protegerte?
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Cuéntanos qué necesitas y te ayudaremos a encontrar el seguro perfecto para ti
        </p>
      </div>

      {/* Ejemplos de necesidades */}
      <div className="mb-6">
        <p className="text-sm font-medium text-muted-foreground mb-3">
          Ejemplos de necesidades:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {exampleNeeds.map((example, index) => {
            const IconComponent = example.icon;
            return (
              <button
                key={index}
                onClick={() => handleExampleClick(example.text)}
                className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-accent hover:border-primary/30 transition-colors text-left text-sm"
              >
                <IconComponent className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-foreground">{example.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="necesidad" className="block text-sm font-medium text-foreground mb-2">
            Describe tu necesidad
          </label>
          <Textarea
            id="necesidad"
            value={necesidad}
            onChange={(e) => setNecesidad(e.target.value)}
            placeholder="Por ejemplo: Quiero proteger a mis hijos con un seguro educativo..."
            className="min-h-[120px] resize-none"
            maxLength={500}
          />
          <div className="text-xs text-muted-foreground mt-1 text-right">
            {necesidad.length}/500 caracteres
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full"
          size="lg"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
              <span>Enviando...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Send className="h-4 w-4" />
              <span>Enviar solicitud</span>
            </div>
          )}
        </Button>
      </form>
    </div>
  );
};

export default NeedForm;