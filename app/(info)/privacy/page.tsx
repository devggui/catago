export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container mx-auto max-w-4xl py-12">
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold">Política de Privacidade</h1>
            <p className="text-muted-foreground">
              Última atualização: 8 de abril de 2025
            </p>
          </div>

          <div className="prose prose-gray max-w-none dark:prose-invert space-y-6">
            <p>
              Esta Política de Privacidade descreve como o Catalogo coleta, usa
              e compartilha suas informações pessoais. Nós valorizamos sua
              privacidade e nos esforçamos para proteger suas informações
              pessoais.
            </p>

            <h2>1. Informações que Coletamos</h2>
            <p>Podemos coletar os seguintes tipos de informações:</p>
            <ul>
              <li>
                <strong>Informações da conta:</strong> nome, endereço de e-mail,
                senha e informações de contato quando você se registra para uma
                conta.
              </li>
              <li>
                <strong>Informações de uso:</strong> como você interage com
                nosso serviço, incluindo as páginas que você visita, os recursos
                que você usa e o tempo gasto no serviço.
              </li>
              <li>
                <strong>Informações do dispositivo:</strong> tipo de
                dispositivo, sistema operacional, navegador e endereço IP.
              </li>
              <li>
                <strong>Informações de pagamento:</strong> detalhes do cartão de
                crédito ou outras informações financeiras necessárias para
                processar pagamentos.
              </li>
              <li>
                <strong>Conteúdo do usuário:</strong> informações sobre
                produtos, descrições, imagens e outros conteúdos que você
                carrega no serviço.
              </li>
            </ul>

            <h2>2. Como Usamos Suas Informações</h2>
            <p>Usamos suas informações para:</p>
            <ul>
              <li>Fornecer, manter e melhorar nosso serviço</li>
              <li>Processar transações e enviar notificações relacionadas</li>
              <li>Responder a seus comentários, perguntas e solicitações</li>
              <li>Monitorar e analisar tendências, uso e atividades</li>
              <li>
                Detectar, investigar e prevenir atividades fraudulentas e não
                autorizadas
              </li>
              <li>Personalizar e melhorar sua experiência</li>
            </ul>

            <h2>3. Compartilhamento de Informações</h2>
            <p>Podemos compartilhar suas informações com:</p>
            <ul>
              <li>
                <strong>Provedores de serviços:</strong> empresas que realizam
                serviços em nosso nome, como processamento de pagamentos e
                análise de dados.
              </li>
              <li>
                <strong>Parceiros de negócios:</strong> terceiros com quem
                podemos oferecer produtos ou serviços em conjunto.
              </li>
              <li>
                <strong>Conformidade legal:</strong> quando necessário para
                cumprir leis aplicáveis, regulamentos ou processos legais.
              </li>
            </ul>

            <h2>4. Segurança de Dados</h2>
            <p>
              Implementamos medidas de segurança projetadas para proteger suas
              informações pessoais contra acesso, divulgação, alteração e
              destruição não autorizados. No entanto, nenhum sistema é
              completamente seguro, e não podemos garantir a segurança absoluta
              de suas informações.
            </p>

            <h2>5. Cookies e Tecnologias Semelhantes</h2>
            <p>
              Usamos cookies e tecnologias semelhantes para coletar informações
              sobre suas atividades em nosso serviço. Você pode configurar seu
              navegador para recusar todos ou alguns cookies, mas isso pode
              afetar a funcionalidade do serviço.
            </p>

            <h2>6. Seus Direitos</h2>
            <p>
              Dependendo da sua localização, você pode ter os seguintes
              direitos:
            </p>
            <ul>
              <li>Acessar as informações pessoais que temos sobre você</li>
              <li>Corrigir informações imprecisas ou incompletas</li>
              <li>Excluir suas informações pessoais</li>
              <li>
                Restringir ou opor-se ao processamento de suas informações
              </li>
              <li>Solicitar a portabilidade de suas informações</li>
              <li>Retirar o consentimento a qualquer momento</li>
            </ul>

            <h2>7. Retenção de Dados</h2>
            <p>
              Mantemos suas informações pessoais pelo tempo necessário para
              fornecer o serviço e cumprir nossas obrigações legais. Quando não
              tivermos mais uma necessidade comercial legítima de processar suas
              informações pessoais, excluiremos ou anonimizaremos essas
              informações.
            </p>

            <h2>8. Crianças</h2>
            <p>
              Nosso serviço não é destinado a crianças menores de 13 anos, e não
              coletamos intencionalmente informações pessoais de crianças
              menores de 13 anos.
            </p>

            <h2>9. Alterações nesta Política</h2>
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente.
              Notificaremos você sobre quaisquer alterações publicando a nova
              Política de Privacidade nesta página e atualizando a data da
              &quot;última atualização&quot;.
            </p>

            <h2>10. Contato</h2>
            <p>
              Se você tiver alguma dúvida sobre esta Política de Privacidade,
              entre em contato conosco pelo e-mail:{" "}
              <a href="mailto:privacidade@catalogo.com">
                privacidade@catalogo.com
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
