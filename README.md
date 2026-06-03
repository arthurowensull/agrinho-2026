# AGROBALANCE AI

**Slogan:** “Produzir mais não significa produzir melhor.”

Projeto desenvolvido para o **Agrinho Programação 2026**, com o tema **Produção e Preservação através da Agricultura Inteligente**.

O **AGROBALANCE AI** é uma plataforma web simulada que representa uma central de comando agrícola inteligente. O projeto utiliza dados simulados de sensores IoT, armazenamento histórico inspirado em PostgreSQL, análise por IA simulada e recomendações sustentáveis para demonstrar como a tecnologia pode ajudar no equilíbrio entre produtividade rural e preservação ambiental.

---

## Objetivo do Projeto

O objetivo do AGROBALANCE AI é mostrar que a agricultura do futuro não depende apenas de produzir mais, mas de produzir melhor.

A plataforma demonstra, de forma visual e interativa, como sensores, dados e inteligência artificial podem auxiliar produtores rurais na tomada de decisões mais conscientes sobre:

* uso racional da água;
* fertilidade do solo;
* saúde da plantação;
* preservação ambiental;
* biodiversidade;
* produtividade sustentável.

O projeto reforça a ideia de que produção agrícola e preservação ambiental não precisam ser opostas. Com planejamento, tecnologia e análise de dados, é possível buscar um equilíbrio entre desenvolvimento do campo e responsabilidade ambiental.

---

## Relação com o Tema Agrinho

O tema do projeto é **Produção e Preservação através da Agricultura Inteligente**.

A proposta se conecta ao Agrinho ao apresentar uma solução educacional e tecnológica para um problema real: como aumentar a eficiência da produção agrícola sem comprometer o solo, a água, a biodiversidade e os recursos naturais.

O site simula situações em que o produtor precisa tomar decisões. Cada escolha pode melhorar ou prejudicar o equilíbrio da fazenda, mostrando que a tecnologia deve ser usada como ferramenta de responsabilidade e sustentabilidade.

---

## Tecnologias Utilizadas

O projeto foi desenvolvido utilizando apenas tecnologias básicas da web:

* HTML5;
* CSS3;
* JavaScript puro;
* Canvas nativo do HTML.

O projeto **não utiliza**:

* frameworks;
* bibliotecas externas;
* CDN;
* Bootstrap;
* Tailwind;
* React;
* Vue;
* Angular;
* jQuery;
* Chart.js;
* bibliotecas de ícones;
* bibliotecas de animação.

Toda a estrutura visual, interativa e lógica foi construída manualmente com HTML, CSS e JavaScript.

---

## Estrutura do Projeto

```text
agrobalance-ai/
├── index.html
├── style.css
├── script.js
└── README.md
```

### Descrição dos arquivos

| Arquivo      | Função                                                                          |
| ------------ | ------------------------------------------------------------------------------- |
| `index.html` | Estrutura semântica da página, seções, botões, textos e elementos interativos   |
| `style.css`  | Estilização visual, responsividade, animações, layout e identidade visual       |
| `script.js`  | Lógica da simulação, manipulação do DOM, indicadores, diagnósticos e interações |
| `README.md`  | Documentação do projeto, explicação, tecnologias e instruções de uso            |

---

## Funcionalidades do Site

O AGROBALANCE AI possui diversas funcionalidades interativas criadas com JavaScript puro.

### Hero Imersivo

A página inicia com uma apresentação visual do projeto, simulando o acesso a uma plataforma tecnológica de monitoramento agrícola.

### Missão do Produtor

O usuário assume o papel de um produtor rural que precisa manter a produção ativa sem prejudicar o solo, a água e a biodiversidade.

### Centro de Decisões AgroBalance

É o painel principal do sistema. Ele apresenta indicadores simulados da propriedade, como:

* temperatura do solo;
* umidade do solo;
* temperatura ambiente;
* umidade do ar;
* consumo de água;
* fertilidade;
* saúde da plantação;
* biodiversidade;
* preservação ambiental;
* produtividade sustentável.

Esses dados são atualizados dinamicamente por JavaScript, simulando leituras de sensores IoT.

### Índice AgroBalance

O Índice AgroBalance representa o equilíbrio geral da fazenda.

Ele varia de 0 a 100 e considera fatores como produtividade, fertilidade, biodiversidade, preservação e consumo de água.

A interpretação do índice é:

| Pontuação | Situação              |
| --------- | --------------------- |
| 0 a 39    | Desequilíbrio crítico |
| 40 a 59   | Atenção               |
| 60 a 79   | Equilíbrio moderado   |
| 80 a 100  | Produção sustentável  |

### Balança Produção vs Preservação

A balança mostra visualmente a relação entre produção agrícola e preservação ambiental.

O usuário pode testar ações como:

* aumentar produção;
* expandir área produtiva;
* reduzir consumo de água;
* preservar área nativa;
* recuperar fertilidade;
* proteger biodiversidade.

Cada ação altera os indicadores e influencia o equilíbrio da propriedade.

### Simulador de Cenários Agrícolas

O site permite simular diferentes situações no campo:

* cenário de seca;
* cenário de alta produção;
* cenário de solo degradado;
* cenário de recuperação ambiental;
* cenário equilibrado.

Cada cenário altera os dados da fazenda e gera novas recomendações.

### Fazenda Digital Interativa

O projeto possui um mapa visual da propriedade com setores clicáveis:

* Setor A — Plantação Principal;
* Setor B — Área de Preservação;
* Setor C — Nascente;
* Setor D — Zona de Biodiversidade;
* Setor E — Área de Irrigação;
* Setor F — Estação de Sensores.

Ao clicar em cada setor, o usuário visualiza dados ambientais, nível de risco, recomendação da IA e status do sensor.

### Centro de Alertas Inteligentes

O sistema gera alertas simulados com base nos indicadores da fazenda.

Os alertas podem indicar:

* consumo de água elevado;
* queda na biodiversidade;
* baixa fertilidade;
* risco ambiental;
* produção sustentável atingida.

### Histórico Inteligente

A linha do tempo mostra registros simulados dos sensores, representando o envio periódico de dados para análise.

### Fluxo Técnico dos Dados

O site apresenta o caminho da informação dentro da plataforma:

```text
Sensor IoT → PostgreSQL → Motor de Análise AgroBalance AI → Decisão do Produtor
```

Esse fluxo mostra que os sensores coletam dados, o banco armazena o histórico, a IA analisa padrões e o produtor recebe recomendações.

### Assistente AgroBalance

O assistente simula respostas automáticas para perguntas como:

* Como está o solo?
* Devo irrigar agora?
* A fazenda está equilibrada?
* Qual setor precisa de atenção?

As respostas são geradas com base nos indicadores atuais da simulação.

### Relatório Final da Fazenda

O usuário pode gerar um resumo final com:

* status geral da fazenda;
* Índice AgroBalance;
* principal risco;
* principal recomendação;
* setor mais crítico;
* setor mais preservado.

### Acessibilidade

O projeto inclui recursos para melhorar a experiência do usuário:

* botão de alto contraste;
* botão para aumentar fonte;
* botão para diminuir fonte;
* botão voltar ao topo;
* navegação por links internos;
* estrutura semântica em HTML.

### Controle Visual

O site também possui controle de intensidade de efeitos visuais, permitindo ajustar a experiência visual da plataforma.

---

## Como Usar o Site

1. Abra o arquivo `index.html` em um navegador moderno.
2. Navegue pelas seções usando o menu superior.
3. Observe os indicadores do Centro de Decisões AgroBalance.
4. Clique em **Gerar Diagnóstico** para receber uma análise da IA simulada.
5. Use os botões da Balança AgroBalance para testar decisões de produção e preservação.
6. Acesse o Simulador de Cenários Agrícolas para alterar o comportamento da fazenda.
7. Clique nos setores da Fazenda Digital para visualizar informações específicas.
8. Consulte os alertas, o histórico inteligente e o assistente virtual.
9. Gere o Relatório Final da Fazenda para ver o resumo do ciclo atual.
10. Use os botões de acessibilidade caso precise alterar contraste, fonte ou voltar ao topo.

---

## Lógica da Simulação

O JavaScript do projeto simula uma propriedade rural conectada.

Os dados dos sensores são gerados e processados pelo próprio código. Eles são armazenados em estruturas como arrays e objetos, representando um histórico de leituras semelhante ao que aconteceria em um banco de dados.

A partir desses dados, o sistema calcula o Índice AgroBalance, atualiza indicadores visuais, gera alertas, modifica gráficos, interpreta cenários e cria recomendações para o usuário.

A IA presente no projeto é uma simulação educativa. Ela não utiliza modelo real de inteligência artificial, mas representa o funcionamento lógico de um sistema que analisa dados e entrega recomendações com base em regras programadas.

---

## Responsividade

O layout foi desenvolvido para se adaptar a diferentes tamanhos de tela, incluindo:

* celulares;
* tablets;
* notebooks;
* desktops.

Foram utilizadas técnicas de CSS como Flexbox, Grid e Media Queries para reorganizar os elementos conforme o tamanho da tela.

---

## Identidade Visual

A identidade visual do AGROBALANCE AI mistura elementos de:

* tecnologia;
* agricultura;
* sustentabilidade;
* sensores;
* dados;
* painéis de monitoramento;
* inteligência artificial.

O objetivo visual é fazer o site parecer uma plataforma profissional de monitoramento agrícola, e não apenas uma página informativa.

---

## Publicação

O projeto pode ser publicado como site estático pelo GitHub Pages ou pela Vercel.

### GitHub Pages

1. Acesse as configurações do repositório.
2. Entre na seção **Pages**.
3. Selecione a branch principal.
4. Escolha a pasta raiz do projeto.
5. Salve e aguarde a publicação.
6. Copie o link gerado.
7. Adicione o link na seção **About** do repositório.

### Vercel

1. Importe o repositório na Vercel.
2. Mantenha a configuração padrão para site estático.
3. Publique o projeto.
4. Copie o link gerado.
5. Adicione o link na seção **About** do repositório.

---

## Requisitos Atendidos da Rubrica

* HTML, CSS e JavaScript separados.
* JavaScript manipula o DOM de forma funcional.
* Uso de variáveis, arrays, objetos e funções.
* HTML com tags semânticas e elementos de interação.
* CSS com classes, IDs, Flexbox, Grid, transições e responsividade.
* Sem CSS inline.
* Sem JavaScript inline.
* Sem frameworks ou bibliotecas externas.
* Interface responsiva.
* Recursos de acessibilidade.
* Efeitos visuais e interações com o usuário.
* README com objetivo, tecnologias e instruções.
* Identidade visual própria.
* Projeto autoral e educativo.

---

## Autoria

Projeto autoral desenvolvido por **Arthur Costa Marcondes** para fins educacionais no **Agrinho Programação 2026**.

Colégio Estadual Padre Cláudio Morelli.

---

## Observação Final

O AGROBALANCE AI demonstra como a programação pode ser usada para criar uma experiência educativa, interativa e sustentável. A plataforma mostra que o futuro da agricultura depende do equilíbrio entre produção, preservação e uso inteligente dos dados.
