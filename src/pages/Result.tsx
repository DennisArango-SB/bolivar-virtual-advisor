import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, Lightbulb, Check, X } from 'lucide-react';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recomendacion = location.state?.recomendacion;
  const [userChoice, setUserChoice] = useState<'yes' | 'no' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Si no hay recomendación, redirigir al inicio
    if (!recomendacion) {
      navigate('/');
    }
  }, [recomendacion, navigate]);

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleQuoteRequest = () => {
    setIsLoading(true);
    setUserChoice('yes');
    
    const userData = {
      nombre: location.state?.nombre,
      telefono: location.state?.telefono,
      correo: location.state?.correo,
      producto_recomendado: location.state?.recomendacion,
      respuesta_usuario: "si"
    };

    fetch('https://primary-production-babea.up.railway.app/webhook-test/c4cc6967-1a3e-4d41-b90a-d02f497b7d8f', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then(response => {
      console.log('Quote request sent successfully');
    })
    .catch(error => {
      console.error('Error sending quote request:', error);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  const handleDecline = () => {
    setUserChoice('no');
    
    const userData = {
      nombre: location.state?.nombre,
      telefono: location.state?.telefono,
      correo: location.state?.correo,
      producto_recomendado: location.state?.recomendacion,
      respuesta_usuario: "no"
    };

    fetch('https://primary-production-babea.up.railway.app/webhook-test/c4cc6967-1a3e-4d41-b90a-d02f497b7d8f', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then(response => {
      console.log('Decline response sent successfully');
    })
    .catch(error => {
      console.error('Error sending decline response:', error);
    });
  };

  if (!recomendacion) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-secondary/30 to-background">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-4xl">
          <Card className="shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-8 w-8 text-primary" />
                  <Lightbulb className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground">
                Tu Recomendación Personalizada
              </CardTitle>
              <p className="text-muted-foreground text-sm sm:text-base mt-2">
                Basada en tu necesidad específica, aquí tienes nuestra recomendación
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-secondary/20 rounded-lg p-6 border border-primary/20">
                <div className="prose prose-lg max-w-none">
                  <div className="text-foreground leading-relaxed whitespace-pre-wrap">
                    {recomendacion}
                  </div>
                </div>
              </div>

              {/* Botones de decisión */}
              {userChoice === null && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                  <Button 
                    onClick={handleQuoteRequest}
                    size="lg"
                    disabled={isLoading}
                    className="flex items-center space-x-2 bg-primary hover:bg-primary/90"
                  >
                    <Check className="h-4 w-4" />
                    <span>{isLoading ? 'Enviando...' : 'Sí, quiero cotizar'}</span>
                  </Button>
                  <Button 
                    onClick={handleDecline}
                    variant="outline"
                    size="lg"
                    className="flex items-center space-x-2"
                  >
                    <X className="h-4 w-4" />
                    <span>No, gracias</span>
                  </Button>
                </div>
              )}

              {/* Mensajes de respuesta */}
              {userChoice === 'yes' && (
                <div className="text-center pt-4">
                  <p className="text-green-600 font-medium text-lg">
                    ✅ ¡Gracias! Un asesor se contactará contigo lo más pronto posible.
                  </p>
                </div>
              )}

              {userChoice === 'no' && (
                <div className="text-center pt-4">
                  <p className="text-muted-foreground text-lg">
                    😔 Lamentamos que no desees continuar. Si cambias de opinión, en Seguros Bolívar estaremos listos para ayudarte.
                  </p>
                </div>
              )}
              
              <div className="flex justify-center pt-6">
                <Button 
                  onClick={handleBackToHome}
                  size="lg"
                  variant="secondary"
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Volver al inicio</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Result;