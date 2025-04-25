import Dashboard from '@/components/Dashboard';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100/30">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Dashboard />
      <Footer/>
      </div>
    </div>
  );
};

export default Index;
