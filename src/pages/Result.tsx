import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, Lightbulb } from 'lucide-react';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recomendacion = location.state?.recomendacion;

  useEffect(() => {
    // Si no hay recomendación, redirigir al inicio
    if (!recomendacion) {
      navigate('/');
    }
  }, [recomendacion, navigate]);

  const handleBackToHome = () => {
    navigate('/');
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
              
              <div className="flex justify-center pt-4">
                <Button 
                  onClick={handleBackToHome}
                  size="lg"
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