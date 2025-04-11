export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container mx-auto max-w-4xl py-12">
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold">Termos de Serviço</h1>
            <p className="text-muted-foreground">
              Última atualização: 8 de abril de 2025
            </p>
          </div>

          <div className="prose prose-gray max-w-none dark:prose-invert space-y-6">
            <p>
              Bem-vindo ao Catalogo. Ao acessar ou usar nosso serviço, você
              concorda com estes termos. Por favor, leia-os cuidadosamente.
            </p>

            <h2>1. Aceitação dos Termos</h2>
            <p>
              Ao criar uma conta no Catalogo, você concorda com estes Termos de
              Serviço. Se você estiver usando o serviço em nome de uma
              organização, você está concordando com estes termos em nome dessa
              organização.
            </p>

            <h2>2. Descrição do Serviço</h2>
            <p>
              O Catalogo é uma plataforma de gerenciamento de catálogo de
              produtos que permite aos usuários criar, organizar e compartilhar
              informações sobre seus produtos.
            </p>

            <h2>3. Conta de Usuário</h2>
            <p>
              Para usar o Catalogo, você precisa criar uma conta. Você é
              responsável por manter a confidencialidade de sua senha e por
              todas as atividades que ocorrem em sua conta. Notifique-nos
              imediatamente sobre qualquer uso não autorizado de sua conta.
            </p>

            <h2>4. Período de Teste Gratuito</h2>
            <p>
              Oferecemos um período de teste gratuito de 14 dias para novos
              usuários. Após o término do período de teste, sua conta será
              automaticamente convertida para uma assinatura paga, a menos que
              você cancele antes do final do período de teste.
            </p>

            <h2>5. Pagamentos e Faturamento</h2>
            <p>
              Após o período de teste gratuito, você será cobrado R$14,99 por
              mês. O faturamento ocorre mensalmente e é automático. Você pode
              cancelar sua assinatura a qualquer momento, mas não oferecemos
              reembolsos para períodos parciais.
            </p>

            <h2>6. Conteúdo do Usuário</h2>
            <p>
              Você mantém todos os direitos sobre o conteúdo que você carrega no
              Catalogo. Ao carregar conteúdo, você nos concede uma licença
              mundial, não exclusiva e isenta de royalties para usar, modificar,
              executar publicamente, exibir publicamente e distribuir seu
              conteúdo em conexão com o serviço.
            </p>

            <h2>7. Uso Aceitável</h2>
            <p>Você concorda em não usar o Catalogo para:</p>
            <ul>
              <li>Violar leis ou regulamentos</li>
              <li>Infringir direitos de propriedade intelectual</li>
              <li>Transmitir malware ou outros códigos maliciosos</li>
              <li>
                Interferir ou interromper a integridade ou o desempenho do
                serviço
              </li>
              <li>Assediar, abusar ou prejudicar outra pessoa</li>
            </ul>

            <h2>8. Limitação de Responsabilidade</h2>
            <p>
              O Catalogo é fornecido &quot;como está&quot; e &quot;conforme
              disponível&quot;. Não garantimos que o serviço será ininterrupto,
              oportuno, seguro ou livre de erros. Em nenhum caso seremos
              responsáveis por quaisquer danos indiretos, incidentais,
              especiais, consequenciais ou punitivos.
            </p>

            <h2>9. Modificações do Serviço</h2>
            <p>
              Reservamo-nos o direito de modificar ou descontinuar, temporária
              ou permanentemente, o serviço (ou qualquer parte dele) a qualquer
              momento, com ou sem aviso prévio.
            </p>

            <h2>10. Modificações dos Termos</h2>
            <p>
              Podemos modificar estes termos a qualquer momento publicando os
              termos modificados em nosso site. É sua responsabilidade verificar
              periodicamente as alterações. O uso continuado do serviço após
              tais modificações constitui sua aceitação dos novos termos.
            </p>

            <h2>11. Rescisão</h2>
            <p>
              Podemos encerrar ou suspender sua conta e acesso ao serviço
              imediatamente, sem aviso prévio ou responsabilidade, por qualquer
              motivo, incluindo, sem limitação, se você violar estes Termos.
            </p>

            <h2>12. Lei Aplicável</h2>
            <p>
              Estes termos serão regidos e interpretados de acordo com as leis
              do Brasil, sem considerar suas disposições de conflito de leis.
            </p>

            <h2>13. Contato</h2>
            <p>
              Se você tiver alguma dúvida sobre estes Termos, entre em contato
              conosco pelo e-mail:{" "}
              <a href="mailto:contato@catalogo.com">contato@catalogo.com</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
