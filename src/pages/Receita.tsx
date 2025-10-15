import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { FileText, Plus, Trash2, Download } from "lucide-react";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

interface PrescriptionData {
  patient_name: string;
  patient_age: string;
  medications: Medication[];
  observations: string;
}

const Receita = () => {
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [prescription, setPrescription] = useState<PrescriptionData>({
    patient_name: '',
    patient_age: '',
    medications: [{ id: crypto.randomUUID(), name: '', dosage: '', frequency: '', duration: '' }],
    observations: '',
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuthAndProfile();
  }, []);

  const checkAuthAndProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Acesso negado",
        description: "Faça login para criar receitas",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    // Check if user has a complete profile
    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select('full_name, crm, crm_uf, specialty')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error || !profile || !profile.full_name || !profile.crm || !profile.crm_uf) {
      toast({
        title: "Perfil incompleto",
        description: "Complete seu perfil antes de criar receitas",
        variant: "destructive",
      });
      navigate("/perfil");
      return;
    }

    setHasProfile(true);
    setLoading(false);
  };

  const addMedication = () => {
    setPrescription(prev => ({
      ...prev,
      medications: [...prev.medications, { id: crypto.randomUUID(), name: '', dosage: '', frequency: '', duration: '' }],
    }));
  };

  const removeMedication = (id: string) => {
    setPrescription(prev => ({
      ...prev,
      medications: prev.medications.filter(m => m.id !== id),
    }));
  };

  const updateMedication = (id: string, field: keyof Medication, value: string) => {
    setPrescription(prev => ({
      ...prev,
      medications: prev.medications.map(m => 
        m.id === id ? { ...m, [field]: value } : m
      ),
    }));
  };

  const handleGenerate = async () => {
    // Validate
    if (!prescription.patient_name.trim()) {
      toast({
        title: "Dados incompletos",
        description: "Informe o nome do paciente",
        variant: "destructive",
      });
      return;
    }

    const validMeds = prescription.medications.filter(m => m.name.trim());
    if (validMeds.length === 0) {
      toast({
        title: "Dados incompletos",
        description: "Adicione pelo menos um medicamento",
        variant: "destructive",
      });
      return;
    }

    try {
      setGenerating(true);

      const { data, error } = await supabase.functions.invoke('generate-prescription', {
        body: {
          patient_name: prescription.patient_name,
          patient_age: prescription.patient_age,
          medications: validMeds.map(({ id, ...rest }) => rest),
          observations: prescription.observations,
        },
      });

      if (error) throw error;

      // Download PDF
      const blob = new Blob([Uint8Array.from(atob(data.pdf), c => c.charCodeAt(0))], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receita_${prescription.patient_name.replace(/\s/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      a.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Receita gerada",
        description: "PDF baixado com sucesso",
      });

      // Reset form
      setPrescription({
        patient_name: '',
        patient_age: '',
        medications: [{ id: crypto.randomUUID(), name: '', dosage: '', frequency: '', duration: '' }],
        observations: '',
      });

    } catch (error) {
      console.error('Error generating prescription:', error);
      toast({
        title: "Erro ao gerar receita",
        description: error instanceof Error ? error.message : "Tente novamente",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
          <div className="container-custom px-4">
            <Skeleton className="h-12 w-64 mx-auto mb-8" />
            <div className="max-w-4xl mx-auto space-y-6">
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
          <div className="max-w-4xl mx-auto">
            <h1 className="hero-headline text-3xl sm:text-4xl md:text-5xl text-center mb-12">
              Nova Receita Médica
            </h1>

            <Card className="card-premium p-6 sm:p-8 space-y-8">
              {/* Dados do Paciente */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Dados do Paciente</h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2 sm:col-span-1">
                    <Label htmlFor="patient_name">Nome Completo *</Label>
                    <Input
                      id="patient_name"
                      value={prescription.patient_name}
                      onChange={(e) => setPrescription(prev => ({ ...prev, patient_name: e.target.value }))}
                      placeholder="Nome do paciente"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="patient_age">Idade</Label>
                    <Input
                      id="patient_age"
                      value={prescription.patient_age}
                      onChange={(e) => setPrescription(prev => ({ ...prev, patient_age: e.target.value }))}
                      placeholder="Ex: 35 anos"
                    />
                  </div>
                </div>
              </div>

              {/* Medicamentos */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Medicamentos</h2>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addMedication}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar
                  </Button>
                </div>

                {prescription.medications.map((med, index) => (
                  <Card key={med.id} className="p-4 space-y-3 border-muted">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        Medicamento {index + 1}
                      </span>
                      {prescription.medications.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMedication(med.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      )}
                    </div>

                    <div className="grid gap-3">
                      <div className="space-y-2">
                        <Label>Nome do Medicamento *</Label>
                        <Input
                          value={med.name}
                          onChange={(e) => updateMedication(med.id, 'name', e.target.value)}
                          placeholder="Ex: Dipirona 500mg"
                        />
                      </div>

                      <div className="grid sm:grid-cols-3 gap-3">
                        <div className="space-y-2">
                          <Label>Dosagem</Label>
                          <Input
                            value={med.dosage}
                            onChange={(e) => updateMedication(med.id, 'dosage', e.target.value)}
                            placeholder="Ex: 1 comprimido"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Frequência</Label>
                          <Input
                            value={med.frequency}
                            onChange={(e) => updateMedication(med.id, 'frequency', e.target.value)}
                            placeholder="Ex: 3x ao dia"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Duração</Label>
                          <Input
                            value={med.duration}
                            onChange={(e) => updateMedication(med.id, 'duration', e.target.value)}
                            placeholder="Ex: 7 dias"
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Observações */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Observações</h2>
                <Textarea
                  value={prescription.observations}
                  onChange={(e) => setPrescription(prev => ({ ...prev, observations: e.target.value }))}
                  rows={4}
                  placeholder="Orientações adicionais ao paciente..."
                />
              </div>

              {/* Botão Gerar */}
              <Button 
                onClick={handleGenerate} 
                disabled={generating}
                className="w-full bg-secondary hover:bg-secondary/90"
                size="lg"
              >
                <Download className="mr-2 w-4 h-4" />
                {generating ? 'Gerando PDF...' : 'Gerar Receita PDF'}
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Receita;
