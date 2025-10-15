import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, XCircle, Clock, CreditCard, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type PlanType = 'starter' | 'pro';
type SubscriptionStatus = 'active' | 'canceled' | 'expired' | 'pending';

interface Subscription {
  id: string;
  plan: PlanType;
  status: SubscriptionStatus;
  quota_total: number | null;
  quota_used: number | null;
  renews_at: string | null;
  canceled_at: string | null;
  created_at: string;
}

interface BillingEvent {
  id: string;
  event_type: string;
  created_at: string;
  event_data: any;
}

const Billing = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [events, setEvents] = useState<BillingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Acesso negado",
        description: "Faça login para acessar suas informações de cobrança",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    loadBillingData(user.id);
  };

  const loadBillingData = async (userId: string) => {
    try {
      // Load subscription
      const { data: subData, error: subError } = await supabase
        .from('plan_subscriptions')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (subError) throw subError;
      
      setSubscription(subData);

      // Load billing events if subscription exists
      if (subData) {
        const { data: eventsData, error: eventsError } = await supabase
          .from('billing_events')
          .select('*')
          .eq('subscription_id', subData.id)
          .order('created_at', { ascending: false })
          .limit(10);

        if (eventsError) throw eventsError;
        setEvents(eventsData || []);
      }

    } catch (error) {
      console.error('Error loading billing data:', error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar suas informações de cobrança",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: SubscriptionStatus) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case 'canceled':
      case 'expired':
        return <XCircle className="w-5 h-5 text-destructive" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-warning" />;
    }
  };

  const getStatusBadge = (status: SubscriptionStatus) => {
    const variants: Record<SubscriptionStatus, any> = {
      active: 'default',
      canceled: 'destructive',
      expired: 'destructive',
      pending: 'secondary',
    };

    const labels: Record<SubscriptionStatus, string> = {
      active: 'Ativo',
      canceled: 'Cancelado',
      expired: 'Expirado',
      pending: 'Pendente',
    };

    return (
      <Badge variant={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const getPlanName = (plan: PlanType) => {
    return plan === 'starter' ? 'Starter' : 'Pro';
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
          <div className="container-custom px-4">
            <Skeleton className="h-12 w-64 mx-auto mb-8" />
            <div className="max-w-4xl mx-auto space-y-6">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-64 w-full" />
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
          <div className="max-w-4xl mx-auto">
            <h1 className="hero-headline text-3xl sm:text-4xl md:text-5xl text-center mb-12">
              Minha Assinatura
            </h1>

            {!subscription ? (
              <Card className="card-premium p-8 text-center space-y-6">
                <CreditCard className="w-16 h-16 mx-auto text-muted-foreground" />
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Nenhuma assinatura ativa</h2>
                  <p className="text-muted-foreground">
                    Escolha um plano para começar a usar a MindMed
                  </p>
                </div>
                <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90">
                  <a href="/precos">
                    Ver Planos Disponíveis
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Subscription Card */}
                <Card className="card-premium p-6 sm:p-8">
                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h2 className="text-2xl font-bold">Plano {getPlanName(subscription.plan)}</h2>
                          {getStatusBadge(subscription.status)}
                        </div>
                        <p className="text-muted-foreground">
                          {subscription.plan === 'starter' 
                            ? 'Até 10 consultas por mês' 
                            : 'Consultas ilimitadas'}
                        </p>
                      </div>
                      {getStatusIcon(subscription.status)}
                    </div>

                    {subscription.quota_total !== null && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Consultas usadas</span>
                          <span className="font-medium">
                            {subscription.quota_used || 0} / {subscription.quota_total}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-secondary h-2 rounded-full transition-all"
                            style={{ 
                              width: `${((subscription.quota_used || 0) / subscription.quota_total) * 100}%` 
                            }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t">
                      <div>
                        <p className="text-sm text-muted-foreground">Data de início</p>
                        <p className="font-medium">{formatDate(subscription.created_at)}</p>
                      </div>
                      {subscription.renews_at && subscription.status === 'active' && (
                        <div>
                          <p className="text-sm text-muted-foreground">Próxima renovação</p>
                          <p className="font-medium">{formatDate(subscription.renews_at)}</p>
                        </div>
                      )}
                      {subscription.canceled_at && (
                        <div>
                          <p className="text-sm text-muted-foreground">Data de cancelamento</p>
                          <p className="font-medium">{formatDate(subscription.canceled_at)}</p>
                        </div>
                      )}
                    </div>

                    {subscription.plan === 'starter' && subscription.status === 'active' && (
                      <Button 
                        asChild 
                        className="w-full bg-secondary hover:bg-secondary/90"
                      >
                        <a href="https://pay.cakto.com.br/u95r4cv_607505" target="_blank" rel="noopener noreferrer">
                          Fazer Upgrade para Pro
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </Card>

                {/* Billing Events */}
                {events.length > 0 && (
                  <Card className="card-premium p-6 sm:p-8">
                    <h3 className="text-xl font-bold mb-4">Histórico de Eventos</h3>
                    <div className="space-y-3">
                      {events.map((event) => (
                        <div 
                          key={event.id} 
                          className="flex items-start justify-between py-3 border-b last:border-0"
                        >
                          <div className="space-y-1">
                            <p className="font-medium capitalize">
                              {event.event_type.replace('_', ' ')}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(event.created_at)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Billing;
