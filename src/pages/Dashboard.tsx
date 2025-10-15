import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { FileText, TrendingUp, Calendar, Trash2, BarChart3 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Prescription {
  id: string;
  patient_name: string;
  patient_age: string;
  created_at: string;
  medications: any;
}

interface Stats {
  total_prescriptions: number;
  this_month: number;
  quota_used: number;
  quota_total: number;
  plan: string;
}

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Acesso negado",
        description: "Faça login para acessar o dashboard",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    await Promise.all([
      loadPrescriptions(user.id),
      loadStats(user.id),
    ]);

    setLoading(false);
  };

  const loadPrescriptions = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('prescriptions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setPrescriptions(data || []);
    } catch (error) {
      console.error('Error loading prescriptions:', error);
      toast({
        title: "Erro ao carregar histórico",
        description: "Não foi possível carregar suas receitas",
        variant: "destructive",
      });
    }
  };

  const loadStats = async (userId: string) => {
    try {
      // Get total prescriptions
      const { count: total, error: countError } = await supabase
        .from('prescriptions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      if (countError) throw countError;

      // Get this month's prescriptions
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { count: thisMonth, error: monthError } = await supabase
        .from('prescriptions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .gte('created_at', startOfMonth.toISOString());

      if (monthError) throw monthError;

      // Get subscription info
      const { data: subscription, error: subError } = await supabase
        .from('plan_subscriptions')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .maybeSingle();

      if (subError) throw subError;

      setStats({
        total_prescriptions: total || 0,
        this_month: thisMonth || 0,
        quota_used: subscription?.quota_used || 0,
        quota_total: subscription?.quota_total || 0,
        plan: subscription?.plan || 'free',
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('prescriptions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Receita excluída",
        description: "A receita foi removida do histórico",
      });

      setPrescriptions(prev => prev.filter(p => p.id !== id));
      
      // Reload stats
      const { data: { user } } = await supabase.auth.getUser();
      if (user) loadStats(user.id);
    } catch (error) {
      console.error('Error deleting prescription:', error);
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir a receita",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
          <div className="container-custom px-4">
            <Skeleton className="h-12 w-64 mx-auto mb-8" />
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
              </div>
              <Skeleton className="h-96 w-full" />
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 bg-gradient-hero">
        <div className="container-custom px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="hero-headline text-3xl sm:text-4xl md:text-5xl text-center mb-12">
              Dashboard de Uso
            </h1>

            {/* Stats Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="card-premium p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total de Receitas</p>
                    <p className="text-2xl font-bold">{stats?.total_prescriptions || 0}</p>
                  </div>
                </div>
              </Card>

              <Card className="card-premium p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Este Mês</p>
                    <p className="text-2xl font-bold">{stats?.this_month || 0}</p>
                  </div>
                </div>
              </Card>

              {stats?.plan === 'starter' && (
                <Card className="card-premium p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Cota Utilizada</p>
                      <p className="text-2xl font-bold">
                        {stats.quota_used}/{stats.quota_total}
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              <Card className="card-premium p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Plano Ativo</p>
                    <p className="text-2xl font-bold capitalize">{stats?.plan || 'Free'}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-4 mb-8">
              <Button 
                onClick={() => navigate('/receita')}
                className="bg-secondary hover:bg-secondary/90"
              >
                <FileText className="w-4 h-4 mr-2" />
                Nova Receita
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/billing')}
              >
                Gerenciar Assinatura
              </Button>
            </div>

            {/* Prescription History */}
            <Card className="card-premium p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-6">Histórico de Receitas</h2>

              {prescriptions.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg text-muted-foreground mb-4">
                    Nenhuma receita gerada ainda
                  </p>
                  <Button onClick={() => navigate('/receita')} className="bg-secondary hover:bg-secondary/90">
                    Criar Primeira Receita
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {prescriptions.map((prescription) => (
                    <Card key={prescription.id} className="p-4 border-muted hover:border-secondary transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">
                            {prescription.patient_name}
                          </h3>
                          {prescription.patient_age && (
                            <p className="text-sm text-muted-foreground mb-2">
                              Idade: {prescription.patient_age}
                            </p>
                          )}
                          <p className="text-sm text-muted-foreground mb-2">
                            {Array.isArray(prescription.medications) ? prescription.medications.length : 0} medicamento(s)
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(prescription.created_at), "d 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(prescription.id)}
                          className="hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
