

## Plano: Botão Escondido de 15 Dias Grátis + Notificações de Expiração

### Resumo

Criar um botão discreto no final da página inicial que ativa um trial de 15 dias com benefícios PRO, sem precisar fechar nenhum plano no Stripe. A partir do dia 10, o sistema exibe notificações avisando que restam 5 dias e incentivando a assinar o Plano PRO.

### O que será feito

**1. Tabela `free_trials` no banco de dados**
- Colunas: `id`, `email`, `activated_at`, `expires_at`, `notified_day_10` a `notified_day_14` (flags), `converted` (boolean)
- RLS: leitura pública por email (sem necessidade de autenticação, já que o trial é para "qualquer pessoa")
- Sem necessidade de login — o trial é ativado por email

**2. Edge Function `activate-free-trial`**
- Recebe `email` no body
- Verifica se já existe trial ativo para esse email
- Cria registro com `activated_at = now()` e `expires_at = now() + 15 days`
- Retorna status de sucesso

**3. Edge Function `check-free-trial`**
- Recebe `email` no body
- Retorna: `active` (boolean), `days_remaining`, `should_show_warning` (true se dia 10+)

**4. Botão escondido no final da página Index**
- Visualmente discreto (texto pequeno, cor suave, sem destaque)
- Ao clicar, abre um mini-formulário pedindo apenas o email
- Chama `activate-free-trial` e exibe toast de confirmação
- Redireciona para `https://acesso.mindmed.online`

**5. Notificações de expiração (dias 10-15)**
- Edge Function `send-trial-reminders` (executada via pg_cron a cada hora)
- Consulta trials onde `activated_at + 10 dias <= now()` e ainda não notificados
- Envia email com mensagem: "Restam X dias do seu trial! Assine o Plano PRO para continuar com todos os benefícios"
- Atualiza flags de notificação para evitar emails duplicados

### Detalhes Técnicos

**Banco de dados:**
```sql
CREATE TABLE public.free_trials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  activated_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '15 days'),
  notified_day_10 boolean DEFAULT false,
  notified_day_11 boolean DEFAULT false,
  notified_day_12 boolean DEFAULT false,
  notified_day_13 boolean DEFAULT false,
  notified_day_14 boolean DEFAULT false,
  converted boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(email)
);
```

**Emails de lembrete (dias 10-14):**
- Dia 10: "Restam 5 dias do seu período gratuito MindMed PRO!"
- Dia 11: "Restam 4 dias — não perca seus laudos automáticos"
- Dia 12: "Restam 3 dias — garanta seu Plano PRO"
- Dia 13: "Restam 2 dias — última chance de manter os benefícios PRO"
- Dia 14: "Último dia! Amanhã seu acesso PRO expira"

Cada email inclui lista de benefícios PRO e link direto para checkout.

**Arquivos a criar/editar:**
- `supabase/functions/activate-free-trial/index.ts` — ativa trial
- `supabase/functions/check-free-trial/index.ts` — verifica status
- `supabase/functions/send-trial-reminders/index.ts` — envia lembretes via cron
- `src/pages/Index.tsx` — adicionar botão escondido no final (antes do Footer)
- Migração SQL para criar tabela `free_trials`
- Configurar pg_cron para executar `send-trial-reminders` a cada hora

**Pré-requisito de email:** Será necessário verificar se a infraestrutura de email está configurada para enviar os lembretes.

