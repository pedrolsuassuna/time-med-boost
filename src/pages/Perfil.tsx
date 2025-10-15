import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useImageUpload } from "@/hooks/useImageUpload";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Upload, Save, User, Building2, MapPin, Phone, Mail } from "lucide-react";

interface UserProfile {
  full_name: string;
  crm: string;
  crm_uf: string;
  specialty: string;
  clinic_name: string;
  address: string;
  phone: string;
  email_public: string;
  logo_url: string;
  signature_image_url: string;
  stamp_image_url: string;
  prescription_footer_text: string;
}

const UF_OPTIONS = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const Perfil = () => {
  const [profile, setProfile] = useState<UserProfile>({
    full_name: '',
    crm: '',
    crm_uf: '',
    specialty: '',
    clinic_name: '',
    address: '',
    phone: '',
    email_public: '',
    logo_url: '',
    signature_image_url: '',
    stamp_image_url: '',
    prescription_footer_text: 'Uso conforme orientação médica. Mantenha fora do alcance de crianças.',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { uploadImage, uploading } = useImageUpload();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Acesso negado",
        description: "Faça login para acessar seu perfil",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    setUserId(user.id);
    loadProfile(user.id);
  };

  const loadProfile = async (uid: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', uid)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        setProfile(data);
      }

    } catch (error) {
      console.error('Error loading profile:', error);
      toast({
        title: "Erro ao carregar perfil",
        description: "Não foi possível carregar seus dados",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'logo_url' | 'signature_image_url' | 'stamp_image_url'
  ) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    const bucketMap = {
      logo_url: 'medical-logos' as const,
      signature_image_url: 'medical-signatures' as const,
      stamp_image_url: 'medical-stamps' as const,
    };

    const url = await uploadImage(file, bucketMap[field], userId);
    
    if (url) {
      handleInputChange(field, url);
      toast({
        title: "Upload concluído",
        description: "Imagem enviada com sucesso",
      });
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // Validate CRM
      if (profile.crm && !/^\d+$/.test(profile.crm)) {
        toast({
          title: "CRM inválido",
          description: "O CRM deve conter apenas números",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: userId,
          ...profile,
        }, { onConflict: 'user_id' });

      if (error) throw error;

      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram salvas com sucesso",
      });

    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar suas informações",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
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
              Meu Perfil Profissional
            </h1>

            <Card className="card-premium p-6 sm:p-8 space-y-8">
              {/* Dados Pessoais */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xl font-bold">
                  <User className="w-5 h-5" />
                  <h2>Dados Pessoais</h2>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Nome Completo *</Label>
                    <Input
                      id="full_name"
                      value={profile.full_name}
                      onChange={(e) => handleInputChange('full_name', e.target.value)}
                      placeholder="Dr. João Silva"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialty">Especialidade *</Label>
                    <Input
                      id="specialty"
                      value={profile.specialty}
                      onChange={(e) => handleInputChange('specialty', e.target.value)}
                      placeholder="Cardiologia"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="crm">CRM *</Label>
                    <Input
                      id="crm"
                      value={profile.crm}
                      onChange={(e) => handleInputChange('crm', e.target.value)}
                      placeholder="123456"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="crm_uf">UF do CRM *</Label>
                    <select
                      id="crm_uf"
                      value={profile.crm_uf}
                      onChange={(e) => handleInputChange('crm_uf', e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Selecione</option>
                      {UF_OPTIONS.map(uf => (
                        <option key={uf} value={uf}>{uf}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Clínica */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xl font-bold">
                  <Building2 className="w-5 h-5" />
                  <h2>Dados da Clínica</h2>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clinic_name">Nome da Clínica</Label>
                    <Input
                      id="clinic_name"
                      value={profile.clinic_name}
                      onChange={(e) => handleInputChange('clinic_name', e.target.value)}
                      placeholder="Clínica São José"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="(11) 98765-4321"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="address">Endereço</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="address"
                        value={profile.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Rua Example, 123 - São Paulo, SP"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="email_public">Email Profissional</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email_public"
                        type="email"
                        value={profile.email_public}
                        onChange={(e) => handleInputChange('email_public', e.target.value)}
                        placeholder="contato@clinica.com.br"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Uploads */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xl font-bold">
                  <Upload className="w-5 h-5" />
                  <h2>Imagens Profissionais</h2>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  {/* Logo */}
                  <div className="space-y-2">
                    <Label>Logo da Clínica</Label>
                    {profile.logo_url && (
                      <div className="aspect-square rounded-lg border overflow-hidden mb-2">
                        <img 
                          src={profile.logo_url} 
                          alt="Logo" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <Input
                      type="file"
                      accept="image/png,image/jpeg,image/svg+xml,image/webp"
                      onChange={(e) => handleFileUpload(e, 'logo_url')}
                      disabled={uploading}
                    />
                    <p className="text-xs text-muted-foreground">PNG, JPG, SVG (max 5MB)</p>
                  </div>

                  {/* Assinatura */}
                  <div className="space-y-2">
                    <Label>Assinatura Digital</Label>
                    {profile.signature_image_url && (
                      <div className="aspect-square rounded-lg border overflow-hidden mb-2 bg-muted">
                        <img 
                          src={profile.signature_image_url} 
                          alt="Assinatura" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <Input
                      type="file"
                      accept="image/png,image/jpeg,image/svg+xml"
                      onChange={(e) => handleFileUpload(e, 'signature_image_url')}
                      disabled={uploading}
                    />
                    <p className="text-xs text-muted-foreground">PNG, JPG, SVG (max 5MB)</p>
                  </div>

                  {/* Carimbo */}
                  <div className="space-y-2">
                    <Label>Carimbo</Label>
                    {profile.stamp_image_url && (
                      <div className="aspect-square rounded-lg border overflow-hidden mb-2">
                        <img 
                          src={profile.stamp_image_url} 
                          alt="Carimbo" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <Input
                      type="file"
                      accept="image/png,image/jpeg,image/svg+xml"
                      onChange={(e) => handleFileUpload(e, 'stamp_image_url')}
                      disabled={uploading}
                    />
                    <p className="text-xs text-muted-foreground">PNG, JPG, SVG (max 5MB)</p>
                  </div>
                </div>
              </div>

              {/* Rodapé de Receituário */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="footer">Texto de Rodapé do Receituário</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Este texto aparecerá no rodapé de todos os receituários
                  </p>
                </div>
                <Textarea
                  id="footer"
                  value={profile.prescription_footer_text}
                  onChange={(e) => handleInputChange('prescription_footer_text', e.target.value)}
                  rows={3}
                  placeholder="Uso conforme orientação médica..."
                />
              </div>

              {/* Botão Salvar */}
              <Button 
                onClick={handleSave} 
                disabled={saving || uploading}
                className="w-full bg-secondary hover:bg-secondary/90"
                size="lg"
              >
                <Save className="mr-2 w-4 h-4" />
                {saving ? 'Salvando...' : 'Salvar Perfil'}
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Perfil;
