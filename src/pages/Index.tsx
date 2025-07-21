import Header from '@/components/Header';
import NeedForm from '@/components/NeedForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-secondary/30 to-background">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-4xl">
          <NeedForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
