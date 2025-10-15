import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Setup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSetup = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase.functions.invoke('setup-admin', {
        body: {
          email: 'pedrolsuassuna@gmail.com',
          password: '020705@Amor',
          fullName: 'Pedro Assunção',
        },
      });

      if (error) throw error;

      toast({
        title: "Conta criada com sucesso!",
        description: "Sua conta Pro foi configurada. Faça login agora.",
      });

      // Auto login
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: 'pedrolsuassuna@gmail.com',
        password: '020705@Amor',
      });

      if (loginError) throw loginError;

      navigate("/dashboard");

    } catch (error) {
      console.error('Setup error:', error);
      toast({
        title: "Erro ao configurar conta",
        description: error instanceof Error ? error.message : "Tente fazer login manualmente",
        variant: "destructive",
      });
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <Card className="card-premium p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Configuração de Conta</h1>
        <p className="text-muted-foreground mb-6">
          Clique no botão abaixo para criar sua conta com plano ilimitado (Pro)
        </p>
        <Button 
          onClick={handleSetup}
          disabled={loading}
          className="w-full bg-secondary hover:bg-secondary/90"
          size="lg"
        >
          {loading ? 'Configurando...' : 'Criar Conta Pro'}
        </Button>
      </Card>
    </div>
  );
};

export default Setup;
