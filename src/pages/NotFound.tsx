
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="container text-center max-w-md">
          <h1 className="text-6xl font-bold font-heading text-travel-blue mb-6">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Página não encontrada</h2>
          <p className="text-muted-foreground mb-8">
            Desculpe, a página que você está procurando não existe ou foi movida.
          </p>
          <Link to="/">
            <Button className="bg-travel-blue hover:bg-travel-blue/90">
              Voltar para a página inicial
            </Button>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
