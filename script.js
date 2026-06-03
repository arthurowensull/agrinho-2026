/*
  AGROBALANCE AI
  Simula uma fazenda conectada: sensores IoT geram pulsos horários,
  registros são armazenados em um array com formato de tabela PostgreSQL
  e o motor AgroBalance AI recalcula indicadores, gráficos e recomendações.
*/

const setores = [
  "Área produtiva norte",
  "Área produtiva sul",
  "Área de preservação",
  "Nascentes",
  "Reservatórios",
  "Estação meteorológica",
];

const baseSetor = {
  "Área produtiva norte": {
    temperaturaSolo: 25,
    umidadeSolo: 54,
    temperaturaAmbiente: 29,
    umidadeAr: 58,
    agua: 76,
    fertilidade: 70,
    biodiversidade: 48,
    preservacao: 43,
    produtividade: 82,
  },
  "Área produtiva sul": {
    temperaturaSolo: 24,
    umidadeSolo: 60,
    temperaturaAmbiente: 28,
    umidadeAr: 62,
    agua: 68,
    fertilidade: 66,
    biodiversidade: 52,
    preservacao: 48,
    produtividade: 76,
  },
  "Área de preservação": {
    temperaturaSolo: 20,
    umidadeSolo: 75,
    temperaturaAmbiente: 24,
    umidadeAr: 78,
    agua: 34,
    fertilidade: 58,
    biodiversidade: 86,
    preservacao: 90,
    produtividade: 34,
  },
  Nascentes: {
    temperaturaSolo: 18,
    umidadeSolo: 84,
    temperaturaAmbiente: 23,
    umidadeAr: 82,
    agua: 22,
    fertilidade: 62,
    biodiversidade: 88,
    preservacao: 94,
    produtividade: 28,
  },
  Reservatórios: {
    temperaturaSolo: 21,
    umidadeSolo: 78,
    temperaturaAmbiente: 25,
    umidadeAr: 74,
    agua: 44,
    fertilidade: 52,
    biodiversidade: 68,
    preservacao: 73,
    produtividade: 42,
  },
  "Estação meteorológica": {
    temperaturaSolo: 22,
    umidadeSolo: 65,
    temperaturaAmbiente: 27,
    umidadeAr: 68,
    agua: 30,
    fertilidade: 55,
    biodiversidade: 64,
    preservacao: 68,
    produtividade: 40,
  },
};

const rotulosSetor = {
  "Área produtiva norte": "Setor A — Plantação Principal",
  "Área produtiva sul": "Setor E — Área de Irrigação",
  "Área de preservação": "Setor B — Área de Preservação",
  Nascentes: "Setor C — Nascente",
  Reservatórios: "Setor F — Estação de Sensores",
  "Estação meteorológica": "Setor D — Zona de Biodiversidade",
};

const bancoPostgreSQL = [];
const modificadores = {};
setores.forEach((setor) => {
  modificadores[setor] = {
    umidadeSolo: 0,
    agua: 0,
    fertilidade: 0,
    biodiversidade: 0,
    preservacao: 0,
    produtividade: 0,
  };
});

const elementos = {
  clockBadge: document.getElementById("clockBadge"),
  liveStatus: document.getElementById("liveStatus"),
  dbCount: document.getElementById("dbCount"),
  farmStatusValue: document.getElementById("farmStatusValue"),
  environmentRiskValue: document.getElementById("environmentRiskValue"),
  waterEfficiencyValue: document.getElementById("waterEfficiencyValue"),
  agroIndexValue: document.getElementById("agroIndexValue"),
  agroIndexBar: document.getElementById("agroIndexBar"),
  lastReadingValue: document.getElementById("lastReadingValue"),
  heroStatus: document.getElementById("heroStatus"),
  heroWater: document.getElementById("heroWater"),
  heroBalance: document.getElementById("heroBalance"),
  heroRecords: document.getElementById("heroRecords"),
  soilTempValue: document.getElementById("soilTempValue"),
  soilTempStatus: document.getElementById("soilTempStatus"),
  soilTempBar: document.getElementById("soilTempBar"),
  soilHumidityValue: document.getElementById("soilHumidityValue"),
  soilHumidityStatus: document.getElementById("soilHumidityStatus"),
  soilHumidityBar: document.getElementById("soilHumidityBar"),
  airTempValue: document.getElementById("airTempValue"),
  airTempStatus: document.getElementById("airTempStatus"),
  airTempBar: document.getElementById("airTempBar"),
  airHumidityValue: document.getElementById("airHumidityValue"),
  airHumidityStatus: document.getElementById("airHumidityStatus"),
  airHumidityBar: document.getElementById("airHumidityBar"),
  waterValue: document.getElementById("waterValue"),
  waterStatus: document.getElementById("waterStatus"),
  waterBar: document.getElementById("waterBar"),
  fertilityValue: document.getElementById("fertilityValue"),
  fertilityStatus: document.getElementById("fertilityStatus"),
  fertilityBar: document.getElementById("fertilityBar"),
  plantHealthValue: document.getElementById("plantHealthValue"),
  plantHealthStatus: document.getElementById("plantHealthStatus"),
  plantHealthBar: document.getElementById("plantHealthBar"),
  biodiversityValue: document.getElementById("biodiversityValue"),
  biodiversityStatus: document.getElementById("biodiversityStatus"),
  biodiversityBar: document.getElementById("biodiversityBar"),
  preservationValue: document.getElementById("preservationValue"),
  preservationStatus: document.getElementById("preservationStatus"),
  preservationBar: document.getElementById("preservationBar"),
  sustainableProductivityValue: document.getElementById("sustainableProductivityValue"),
  sustainableProductivityStatus: document.getElementById("sustainableProductivityStatus"),
  sustainableProductivityBar: document.getElementById("sustainableProductivityBar"),
  scaleBeam: document.getElementById("scaleBeam"),
  balanceScore: document.getElementById("balanceScore"),
  productionSideValue: document.getElementById("productionSideValue"),
  preservationSideValue: document.getElementById("preservationSideValue"),
  balanceState: document.getElementById("balanceState"),
  balanceMessage: document.getElementById("balanceMessage"),
  diagnosticText: document.getElementById("diagnosticText"),
  alertList: document.getElementById("alertList"),
  eventTitle: document.getElementById("eventTitle"),
  eventDescription: document.getElementById("eventDescription"),
  activeScenarioName: document.getElementById("activeScenarioName"),
  scenarioSummary: document.getElementById("scenarioSummary"),
  scenarioRecommendation: document.getElementById("scenarioRecommendation"),
  actionList: document.getElementById("actionList"),
  decisionResult: document.getElementById("decisionResult"),
  simImpactList: document.getElementById("simImpactList"),
  flowExplanation: document.getElementById("flowExplanation"),
  sectorDetails: document.getElementById("sectorDetails"),
  timelineList: document.getElementById("timelineList"),
  timelineStatus: document.getElementById("timelineStatus"),
  assistantAnswer: document.getElementById("assistantAnswer"),
  farmReport: document.getElementById("farmReport"),
  visualIntensity: document.getElementById("visualIntensity"),
  signalToggle: document.getElementById("signalToggle"),
  toggleTimelineButton: document.getElementById("toggleTimelineButton"),
};

const canvas = document.getElementById("trendChart");
const ctx = canvas.getContext("2d");
const metricModules = document.querySelectorAll("[data-metric]");
const sectorButtons = document.querySelectorAll(".sector");
const periodButtons = document.querySelectorAll("[data-period]");
const flowButtons = document.querySelectorAll("[data-flow]");
const scaleActionButtons = document.querySelectorAll("[data-scale-action]");
const scenarioButtons = document.querySelectorAll("[data-scenario]");
const assistantButtons = document.querySelectorAll("[data-question]");

let setorSelecionado = "todos";
let periodoSelecionado = 24;
let horaSimulada = 0;
let eventoAtual = 0;
let ultimaMedia = null;
let ultimoIndice = 0;
let ultimaAnalise = {};
const linhaDoTempo = [];

const eventos = [
  {
    titulo: "Período de seca",
    descricao: "A umidade do solo cai e a irrigação pressiona os reservatórios.",
    acoes: [
      ["Ativar irrigação por gotejamento", { agua: -12, produtividade: 4, fertilidade: 1, biodiversidade: 2 }],
      ["Irrigar em horário integral", { agua: 15, produtividade: 8, biodiversidade: -8, preservacao: -6 }],
      ["Reduzir área irrigada temporariamente", { agua: -18, produtividade: -6, biodiversidade: 4, preservacao: 3 }],
    ],
  },
  {
    titulo: "Chuva excessiva",
    descricao: "A água acumulada ameaça fertilidade, estradas internas e nascentes.",
    acoes: [
      ["Abrir drenagem controlada", { agua: -8, fertilidade: 3, biodiversidade: 2, produtividade: 2 }],
      ["Manter produção sem ajuste", { agua: 8, fertilidade: -7, biodiversidade: -3, produtividade: -4 }],
      ["Criar faixas vegetadas", { agua: -4, fertilidade: 4, biodiversidade: 7, preservacao: 6 }],
    ],
  },
  {
    titulo: "Aumento da demanda agrícola",
    descricao: "A cooperativa solicita mais produção no próximo ciclo.",
    acoes: [
      ["Intensificar com limite ambiental", { produtividade: 7, agua: 5, fertilidade: -2, biodiversidade: -2 }],
      ["Expandir plantio sobre área sensível", { produtividade: 14, agua: 14, fertilidade: -7, biodiversidade: -14, preservacao: -13 }],
      ["Negociar produção escalonada", { produtividade: 4, agua: -3, fertilidade: 2, biodiversidade: 2 }],
    ],
  },
  {
    titulo: "Queda na biodiversidade",
    descricao: "O índice de vida no solo e nas bordas produtivas caiu no histórico recente.",
    acoes: [
      ["Ampliar corredores ecológicos", { biodiversidade: 13, preservacao: 8, produtividade: -3 }],
      ["Aplicar manejo químico amplo", { produtividade: 8, biodiversidade: -12, fertilidade: -4, preservacao: -8 }],
      ["Implantar rotação com cobertura", { biodiversidade: 7, fertilidade: 8, produtividade: 3, agua: -2 }],
    ],
  },
  {
    titulo: "Escassez hídrica",
    descricao: "Reservatórios e nascentes mostram pressão acima do limite ideal.",
    acoes: [
      ["Priorizar culturas menos exigentes", { agua: -14, produtividade: -3, preservacao: 5 }],
      ["Captar água sem restrição", { agua: 18, produtividade: 8, biodiversidade: -9, preservacao: -11 }],
      ["Reutilizar água com sensores", { agua: -10, produtividade: 3, fertilidade: 2, biodiversidade: 3 }],
    ],
  },
];

const explicacoesFluxo = {
  sensor: "Sensores IoT coletam dados do ambiente rural em intervalos definidos, por exemplo uma leitura a cada hora por setor da propriedade.",
  postgres: "O PostgreSQL armazena cada leitura com horário, setor e indicador, criando histórico diário, semanal, mensal e anual para gráficos e comparações.",
  engine: "O Motor de Análise AgroBalance AI lê o histórico e identifica padrões, tendências, desperdícios, riscos ambientais e pressão sobre água, solo e biodiversidade.",
  decision: "O produtor recebe recomendações práticas para equilibrar produtividade, água, fertilidade, biodiversidade e preservação ambiental.",
};

const acoesBalanca = {
  producao: {
    texto: "Aumentar produção elevou a produtividade, mas pressionou água, biodiversidade e preservação.",
    efeito: { produtividade: 10, agua: 9, fertilidade: -3, biodiversidade: -6, preservacao: -6 },
  },
  expandir: {
    texto: "Expandir área produtiva aumentou produção rapidamente, mas elevou risco ambiental e consumo hídrico.",
    efeito: { produtividade: 15, agua: 14, fertilidade: -8, biodiversidade: -12, preservacao: -12 },
  },
  agua: {
    texto: "Reduzir consumo de água melhorou a eficiência hídrica e protegeu as nascentes.",
    efeito: { agua: -11, preservacao: 4, biodiversidade: 3 },
  },
  preservar: {
    texto: "Preservar área nativa fortaleceu corredores ecológicos e reduziu a pressão ambiental.",
    efeito: { preservacao: 10, biodiversidade: 6, produtividade: -3, agua: -2 },
  },
  fertilidade: {
    texto: "Melhorar fertilidade do solo aumentou resiliência produtiva com menor desgaste do terreno.",
    efeito: { fertilidade: 10, produtividade: 4, agua: -2 },
  },
  desperdicio: {
    texto: "Reduzir desperdício tornou o uso de água e insumos mais eficiente.",
    efeito: { agua: -8, fertilidade: 3, preservacao: 3, produtividade: 2 },
  },
  biodiversidade: {
    texto: "Proteger biodiversidade elevou vida no solo e estabilidade ambiental.",
    efeito: { biodiversidade: 11, preservacao: 5, fertilidade: 2, produtividade: -2 },
  },
};

const cenarios = {
  seca: {
    nome: "Cenário de seca",
    texto: "Umidade do solo em queda, consumo de água elevado e recomendação de irrigação controlada.",
    recomendacao: "Usar irrigação por gotejamento, reduzir desperdício e proteger nascentes.",
    efeito: { umidadeSolo: -22, agua: 18, fertilidade: -6, biodiversidade: -8, preservacao: -6, produtividade: -5 },
  },
  altaProducao: {
    nome: "Cenário de alta produção",
    texto: "Produtividade acelerada com maior pressão sobre água, solo e áreas sensíveis.",
    recomendacao: "Limitar expansão, acompanhar fertilidade e compensar impactos ambientais.",
    efeito: { umidadeSolo: -8, agua: 14, fertilidade: -7, biodiversidade: -10, preservacao: -9, produtividade: 16 },
  },
  soloDegradado: {
    nome: "Cenário de solo degradado",
    texto: "Fertilidade reduzida e alerta para rotação de culturas, cobertura vegetal e manejo regenerativo.",
    recomendacao: "Recuperar fertilidade com cobertura vegetal, rotação e adubação orgânica.",
    efeito: { umidadeSolo: -10, agua: 7, fertilidade: -20, biodiversidade: -6, preservacao: -4, produtividade: -12 },
  },
  recuperacao: {
    nome: "Cenário de recuperação ambiental",
    texto: "Áreas nativas e biodiversidade se recuperam, com produção temporariamente mais cuidadosa.",
    recomendacao: "Manter corredores ecológicos e retomar produção com manejo de baixo impacto.",
    efeito: { umidadeSolo: 8, agua: -8, fertilidade: 10, biodiversidade: 16, preservacao: 16, produtividade: -4 },
  },
  equilibrado: {
    nome: "Cenário equilibrado",
    texto: "Produção e preservação ficam próximas, alertas diminuem e o sistema busca produção sustentável.",
    recomendacao: "Manter estratégia atual e acompanhar o histórico dos sensores.",
    efeito: { umidadeSolo: 5, agua: -8, fertilidade: 8, biodiversidade: 9, preservacao: 9, produtividade: 4 },
  },
};

const limitar = (valor, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(valor)));
const variar = (amplitude) => Math.round((Math.random() * amplitude * 2 - amplitude) * 10) / 10;

// Classifica indicadores em estados visuais para orientar o produtor.
function classificar(valor, invertido = false) {
  if (invertido) {
    if (valor <= 48) return ["good", "Controlado"];
    if (valor <= 72) return ["warn", "Atenção"];
    return ["risk", "Risco"];
  }

  if (valor >= 68) return ["good", "Estável"];
  if (valor >= 48) return ["warn", "Atenção"];
  return ["risk", "Risco"];
}

// Atualiza os módulos visuais do painel principal.
function atualizarModulo(chave, valor, barra, invertido = false) {
  const modulo = Array.from(metricModules).find((item) => item.dataset.metric === chave);
  const status = elementos[`${chave}Status`];
  const barraElemento = elementos[`${chave}Bar`];
  const [classe, texto] = classificar(barra, invertido);

  if (modulo) {
    modulo.classList.remove("good", "warn", "risk");
    modulo.classList.add(classe);
  }
  if (status) status.textContent = texto;
  if (barraElemento) barraElemento.style.width = `${limitar(barra)}%`;
}

// Calcula o índice AgroBalance de 0 a 100 com base em água, solo, produção e preservação.
function calcularIndiceAgroBalance(media) {
  const eficienciaAgua = 100 - media.agua;
  return limitar((
    media.produtividade * 0.18
    + media.fertilidade * 0.18
    + media.saudePlantacao * 0.14
    + media.biodiversidade * 0.18
    + media.preservacao * 0.18
    + eficienciaAgua * 0.14
  ));
}

function interpretarIndice(indice) {
  if (indice <= 39) return ["Desequilíbrio crítico", "Alto"];
  if (indice <= 59) return ["Atenção", "Moderado"];
  if (indice <= 79) return ["Equilíbrio moderado", "Baixo"];
  return ["Produção sustentável", "Baixo"];
}

function setorMaisCritico() {
  return setores
    .map((setor) => {
      const registros = bancoPostgreSQL.filter((registro) => registro.setor === setor).slice(-24);
      const media = medias(registros);
      const indice = calcularIndiceAgroBalance(media);
      return { setor, media, indice };
    })
    .sort((a, b) => a.indice - b.indice)[0];
}

function setorMaisPreservado() {
  return setores
    .map((setor) => {
      const registros = bancoPostgreSQL.filter((registro) => registro.setor === setor).slice(-24);
      const media = medias(registros);
      return { setor, media, valor: media.preservacao + media.biodiversidade - media.agua / 2 };
    })
    .sort((a, b) => b.valor - a.valor)[0];
}

function registrarLinhaDoTempo(texto) {
  const hora = `${String(horaSimulada % 24).padStart(2, "0")}:00`;
  linhaDoTempo.unshift({ hora, texto });
  while (linhaDoTempo.length > 5) linhaDoTempo.pop();

  elementos.timelineList.innerHTML = linhaDoTempo
    .map((item) => `<li><time>${item.hora}</time><span>${item.texto}</span></li>`)
    .join("");
  elementos.timelineStatus.textContent = `Último pulso analisado às ${hora}`;
}

function formatarImpacto(efeito) {
  const nomes = {
    umidadeSolo: "Umidade do solo",
    agua: "Consumo de água",
    fertilidade: "Fertilidade",
    biodiversidade: "Biodiversidade",
    preservacao: "Preservação",
    produtividade: "Produtividade",
  };

  return Object.entries(efeito)
    .map(([campo, valor]) => `${nomes[campo]} ${valor > 0 ? "+" : ""}${valor}`)
    .join(" | ");
}

function renderizarImpactos(efeito) {
  const nomes = {
    umidadeSolo: "Umidade do solo",
    agua: "Consumo de água",
    fertilidade: "Fertilidade",
    biodiversidade: "Biodiversidade",
    preservacao: "Preservação",
    produtividade: "Produtividade",
  };

  elementos.simImpactList.innerHTML = Object.entries(efeito)
    .map(([campo, valor]) => `
      <li>
        <strong>${nomes[campo]}</strong>
        <span class="${valor >= 0 ? "positive" : "negative"}">${valor > 0 ? "+" : ""}${valor}</span>
      </li>
    `)
    .join("");
}

// Atualiza o painel geral da fazenda.
function atualizarStatusGeral(media) {
  const indice = calcularIndiceAgroBalance(media);
  const [status, risco] = interpretarIndice(indice);
  const eficienciaAgua = limitar(100 - media.agua);

  ultimoIndice = indice;
  ultimaAnalise = { status, risco, eficienciaAgua };
  elementos.farmStatusValue.textContent = status;
  elementos.environmentRiskValue.textContent = risco;
  elementos.waterEfficiencyValue.textContent = `${eficienciaAgua}%`;
  elementos.agroIndexValue.textContent = `${indice}%`;
  elementos.agroIndexBar.style.width = `${indice}%`;
  elementos.lastReadingValue.textContent = "Agora";
}

function gerarEventoLinhaDoTempo(media) {
  if (media.agua > 74) return "IA detectou risco de desperdício hídrico e recomendou irrigação controlada.";
  if (media.biodiversidade < 50) return "Biodiversidade em queda leve nas áreas próximas à produção.";
  if (media.fertilidade < 52) return "Fertilidade do solo registrada abaixo da faixa ideal.";
  if (media.produtividadeSustentavel >= 78) return "Diagnóstico atualizado: produção sustentável alcançada no ciclo atual.";
  if (media.umidadeSolo < 48) return "Umidade do solo registrada em nível de atenção.";
  return "Leitura consolidada: sensores enviaram dados de solo, água e biodiversidade.";
}

// Atualiza os dados simulados dos sensores.
function gerarRegistro(setor, data) {
  const base = baseSetor[setor];
  const mod = modificadores[setor];
  const ciclo = Math.sin((horaSimulada % 24) / 24 * Math.PI * 2);
  const agua = limitar(base.agua + mod.agua + variar(4));
  const fertilidade = limitar(base.fertilidade + mod.fertilidade + variar(3));
  const biodiversidade = limitar(base.biodiversidade + mod.biodiversidade + variar(3));
  const preservacao = limitar(base.preservacao + mod.preservacao + variar(2.5));
  const produtividade = limitar(base.produtividade + mod.produtividade + variar(4));
  const umidadeSolo = limitar(base.umidadeSolo + mod.umidadeSolo - ciclo * 5 + variar(3), 10, 98);
  const saudePlantacao = limitar((fertilidade + umidadeSolo + produtividade + biodiversidade) / 4);
  const produtividadeSustentavel = limitar((produtividade + fertilidade + biodiversidade + preservacao + (100 - agua)) / 5);

  return {
    timestamp: data,
    setor,
    temperaturaSolo: limitar(base.temperaturaSolo + ciclo * 2 + variar(1.4), 8, 42),
    umidadeSolo,
    temperaturaAmbiente: limitar(base.temperaturaAmbiente + ciclo * 4 + variar(1.8), 8, 45),
    umidadeAr: limitar(base.umidadeAr - ciclo * 7 + variar(3), 15, 100),
    agua,
    fertilidade,
    saudePlantacao,
    biodiversidade,
    preservacao,
    produtividade,
    produtividadeSustentavel,
  };
}

function gerarPulso(preload = false) {
  const data = new Date(Date.now() + horaSimulada * 3600000);
  setores.forEach((setor) => bancoPostgreSQL.push(gerarRegistro(setor, data)));
  if (!preload) horaSimulada += 1;
  while (bancoPostgreSQL.length > 720 * setores.length) bancoPostgreSQL.shift();
}

function registrosFiltrados() {
  const base = setorSelecionado === "todos"
    ? bancoPostgreSQL
    : bancoPostgreSQL.filter((registro) => registro.setor === setorSelecionado);
  return base.slice(-periodoSelecionado * (setorSelecionado === "todos" ? setores.length : 1));
}

function medias(registros) {
  const campos = [
    "temperaturaSolo",
    "umidadeSolo",
    "temperaturaAmbiente",
    "umidadeAr",
    "agua",
    "fertilidade",
    "saudePlantacao",
    "biodiversidade",
    "preservacao",
    "produtividade",
    "produtividadeSustentavel",
  ];
  const total = campos.reduce((acc, campo) => ({ ...acc, [campo]: 0 }), {});
  registros.forEach((registro) => campos.forEach((campo) => { total[campo] += registro[campo]; }));
  const divisor = registros.length || 1;
  return campos.reduce((acc, campo) => ({ ...acc, [campo]: Math.round(total[campo] / divisor) }), {});
}

function ultimosPorHora(registros) {
  const porHora = new Map();
  registros.forEach((registro) => {
    const chave = registro.timestamp.toISOString();
    if (!porHora.has(chave)) porHora.set(chave, []);
    porHora.get(chave).push(registro);
  });
  return Array.from(porHora.values()).map(medias);
}

function atualizarIndicadores() {
  const registros = registrosFiltrados();
  const media = medias(registros);
  const ultimo = registros[registros.length - 1];
  ultimaMedia = media;

  elementos.soilTempValue.textContent = `${media.temperaturaSolo} C`;
  elementos.soilHumidityValue.textContent = `${media.umidadeSolo}%`;
  elementos.airTempValue.textContent = `${media.temperaturaAmbiente} C`;
  elementos.airHumidityValue.textContent = `${media.umidadeAr}%`;
  elementos.waterValue.textContent = `${media.agua} L/h`;
  elementos.fertilityValue.textContent = media.fertilidade;
  elementos.plantHealthValue.textContent = media.saudePlantacao;
  elementos.biodiversityValue.textContent = media.biodiversidade;
  elementos.preservationValue.textContent = media.preservacao;
  elementos.sustainableProductivityValue.textContent = media.produtividadeSustentavel;
  elementos.heroStatus.textContent = media.produtividadeSustentavel >= 68
    ? "Operação equilibrada"
    : "Ajuste recomendado";
  elementos.heroWater.textContent = `${media.agua} L/h`;
  elementos.heroRecords.textContent = bancoPostgreSQL.length;

  atualizarModulo("soilTemp", media.temperaturaSolo, limitar(100 - Math.abs(media.temperaturaSolo - 24) * 5));
  atualizarModulo("soilHumidity", media.umidadeSolo, media.umidadeSolo);
  atualizarModulo("airTemp", media.temperaturaAmbiente, limitar(100 - Math.abs(media.temperaturaAmbiente - 27) * 4));
  atualizarModulo("airHumidity", media.umidadeAr, media.umidadeAr);
  atualizarModulo("water", media.agua, media.agua, true);
  atualizarModulo("fertility", media.fertilidade, media.fertilidade);
  atualizarModulo("plantHealth", media.saudePlantacao, media.saudePlantacao);
  atualizarModulo("biodiversity", media.biodiversidade, media.biodiversidade);
  atualizarModulo("preservation", media.preservacao, media.preservacao);
  atualizarModulo("sustainableProductivity", media.produtividadeSustentavel, media.produtividadeSustentavel);

  elementos.clockBadge.textContent = `Hora simulada ${String(horaSimulada % 24).padStart(2, "0")}:00`;
  elementos.liveStatus.textContent = ultimo
    ? `Último pulso recebido de ${ultimo.setor}`
    : "Aguardando pulsos dos sensores";
  elementos.dbCount.textContent = `${bancoPostgreSQL.length} registros no PostgreSQL simulado`;

  atualizarStatusGeral(media);
  atualizarBalanca(media);
  atualizarAlertas(media);
  atualizarDetalhesSetor();
  registrarLinhaDoTempo(gerarEventoLinhaDoTempo(media));
}

function atualizarBalanca(media) {
  const producao = (media.produtividade + media.fertilidade) / 2;
  const preservacao = (media.preservacao + media.biodiversidade + (100 - media.agua)) / 3;
  const diferenca = producao - preservacao;
  const angulo = Math.max(-16, Math.min(16, diferenca / 2.5));
  const equilibrio = limitar(100 - Math.abs(diferenca) * 2.4);
  elementos.scaleBeam.style.transform = `rotate(${angulo}deg)`;
  elementos.balanceScore.textContent = `${equilibrio}%`;
  elementos.heroBalance.textContent = `${equilibrio}%`;
  elementos.productionSideValue.textContent = `${Math.round(producao)}%`;
  elementos.preservationSideValue.textContent = `${Math.round(preservacao)}%`;

  if (diferenca > 14) {
    elementos.balanceState.textContent = "Alerta ambiental";
    elementos.balanceState.style.color = "var(--red)";
    elementos.balanceMessage.textContent = "Produção muito alta com preservação baixa. O sistema recomenda reduzir pressão hídrica e recuperar biodiversidade.";
  } else if (diferenca < -14) {
    elementos.balanceState.textContent = "Alerta econômico";
    elementos.balanceState.style.color = "var(--yellow)";
    elementos.balanceMessage.textContent = "Preservação muito alta com produção baixa. Planeje manejo produtivo de baixo impacto para manter viabilidade econômica.";
  } else {
    elementos.balanceState.textContent = "Produção Sustentável Alcançada";
    elementos.balanceState.style.color = "var(--green)";
    elementos.balanceMessage.textContent = "Equilíbrio sustentável atingido: produtividade, solo, água e preservação permanecem dentro da faixa ideal.";
  }
}

function atualizarAlertas(media) {
  const alertas = [];
  const horario = `${String(horaSimulada % 24).padStart(2, "0")}:00`;

  if (media.agua > 72) {
    alertas.push(["risk", "Alerta hídrico", "Atenção", horario, "Consumo de água acima do padrão no Setor E.", "Reduzir irrigação em setores de baixa necessidade e priorizar gotejamento."]);
  }
  if (media.biodiversidade < 48) {
    alertas.push(["warn", "Alerta ambiental", "Moderado", horario, "Biodiversidade em queda na área próxima à plantação.", "Ampliar corredores ecológicos e proteger bordas vegetadas."]);
  }
  if (media.fertilidade < 50) {
    alertas.push(["warn", "Alerta de solo", "Atenção", horario, "Solo apresenta perda gradual de fertilidade.", "Reforçar rotação de culturas, cobertura vegetal e adubação orgânica."]);
  }
  if (media.preservacao < 50) {
    alertas.push(["risk", "Alerta de preservação", "Alto", horario, "Preservação insuficiente em áreas sensíveis.", "Proteger nascentes e evitar expansão produtiva próxima à vegetação nativa."]);
  }
  if (!alertas.length) {
    alertas.push(["ok", "Alerta positivo", "Estável", horario, "Produção sustentável alcançada no ciclo atual.", "Manter monitoramento por histórico diário, semanal, mensal e anual."]);
  }

  elementos.alertList.innerHTML = alertas
    .map(([classe, tipo, nivel, horarioAlerta, mensagem, recomendacao]) => `
      <li class="${classe}">
        <strong>${tipo} — ${nivel}</strong>
        <span>${horarioAlerta} — ${mensagem}</span>
        <span>Recomendação: ${recomendacao}</span>
      </li>
    `)
    .join("");
}

function desenharGrafico() {
  const dados = ultimosPorHora(registrosFiltrados()).slice(-periodoSelecionado);
  const largura = canvas.width;
  const altura = canvas.height;
  const margem = 42;
  const series = [
    ["agua", "#70d7ff"],
    ["fertilidade", "#42e89f"],
    ["biodiversidade", "#ffd166"],
    ["produtividade", "#ff5f68"],
  ];

  ctx.clearRect(0, 0, largura, altura);
  ctx.fillStyle = "#090d12";
  ctx.fillRect(0, 0, largura, altura);

  ctx.strokeStyle = "rgba(238,247,243,0.1)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 5; i += 1) {
    const y = margem + ((altura - margem * 2) / 5) * i;
    ctx.beginPath();
    ctx.moveTo(margem, y);
    ctx.lineTo(largura - margem, y);
    ctx.stroke();
    ctx.fillStyle = "rgba(238,247,243,0.65)";
    ctx.font = "12px Arial";
    ctx.fillText(String(100 - i * 20), 10, y + 4);
  }

  series.forEach(([campo, cor]) => {
    ctx.strokeStyle = cor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    dados.forEach((ponto, index) => {
      const x = margem + ((largura - margem * 2) / Math.max(dados.length - 1, 1)) * index;
      const y = altura - margem - (ponto[campo] / 100) * (altura - margem * 2);
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  });

  ctx.fillStyle = "rgba(238,247,243,0.82)";
  ctx.font = "14px Arial";
  const setorGrafico = setorSelecionado === "todos" ? "Todos os setores" : rotulosSetor[setorSelecionado];
  ctx.fillText(`${setorGrafico} | últimas ${periodoSelecionado === 24 ? "24 horas" : periodoSelecionado === 168 ? "semana" : "mês"}`, margem, 24);
}

// Gera o diagnóstico da IA simulada.
function gerarDiagnostico() {
  const media24 = medias(registrosFiltrados().slice(-24 * (setorSelecionado === "todos" ? setores.length : 1)));
  const mediaSemana = medias(registrosFiltrados().slice(-168 * (setorSelecionado === "todos" ? setores.length : 1)));
  const recomendacoes = [];
  const riscos = [];
  const desperdicios = [];
  const impactos = [];

  if (media24.agua > 72) {
    desperdicios.push("consumo hídrico acima do ideal");
    impactos.push("pressão sobre reservatórios e nascentes");
    recomendacoes.push("reduzir irrigação excessiva, usar gotejamento e reaproveitamento de água");
  }
  if (media24.biodiversidade < mediaSemana.biodiversidade || media24.biodiversidade < 50) {
    riscos.push("biodiversidade em queda");
    impactos.push("menor estabilidade ecológica nas bordas produtivas");
    recomendacoes.push("preservar vegetação nativa e ampliar corredores ecológicos");
  }
  if (media24.fertilidade < 52) {
    riscos.push("queda de fertilidade do solo");
    recomendacoes.push("aplicar rotação de culturas, adubação orgânica e cobertura permanente");
  }
  if (media24.preservacao < 52) {
    impactos.push("preservação ambiental insuficiente");
    recomendacoes.push("proteger nascentes e limitar expansão sobre áreas sensíveis");
  }
  if (media24.produtividade < 45) recomendacoes.push("melhorar manejo produtivo sem avançar sobre áreas de preservação");

  const producao = (media24.produtividade + media24.fertilidade) / 2;
  const preservacao = (media24.preservacao + media24.biodiversidade + (100 - media24.agua)) / 3;
  const indice = calcularIndiceAgroBalance(media24);
  const [, urgencia] = interpretarIndice(indice);

  if (!riscos.length && !desperdicios.length && Math.abs(producao - preservacao) <= 14) {
    elementos.diagnosticText.innerHTML = `
      <strong>Diagnóstico AgroBalance AI:</strong> Produção Sustentável Alcançada.<br>
      <strong>Resumo da situação:</strong> produtividade, água, solo e biodiversidade estão dentro da faixa segura.<br>
      <strong>Riscos detectados:</strong> baixos.<br>
      <strong>Impactos ambientais:</strong> controlados.<br>
      <strong>Recomendações:</strong> manter monitoramento diário, semanal, mensal e anual pelo histórico do PostgreSQL.<br>
      <strong>Nível de urgência:</strong> Baixo. <strong>Índice de equilíbrio:</strong> ${indice}%.
    `;
    return;
  }

  const diagnostico = producao > preservacao
    ? "A produção está crescendo, porém há sinais de pressão ambiental."
    : "A preservação está acima da produção, exigindo manejo produtivo de baixo impacto.";

  elementos.diagnosticText.innerHTML = `
    <strong>Diagnóstico AgroBalance AI:</strong> ${diagnostico}<br>
    <strong>Resumo da situação:</strong> a fazenda apresenta produtividade de ${media24.produtividade}% com preservação em ${media24.preservacao}%.<br>
    <strong>Riscos detectados:</strong> ${riscos.join(", ") || "sem risco crítico"}.<br>
    <strong>Desperdícios:</strong> ${desperdicios.join(", ") || "sem desperdício relevante"}.<br>
    <strong>Impactos ambientais:</strong> ${impactos.join(", ") || "impactos controlados"}.<br>
    <strong>Recomendações:</strong> ${recomendacoes.join("; ")}.<br>
    <strong>Nível de urgência:</strong> ${urgencia}. <strong>Índice de equilíbrio:</strong> ${indice}%.
  `;
}

function atualizarDetalhesSetor() {
  if (setorSelecionado === "todos") {
    elementos.sectorDetails.innerHTML = "<strong>Todos os setores</strong><p>Selecione uma área do mapa para ver um resumo operacional do setor.</p>";
    return;
  }

  const media = medias(registrosFiltrados());
  const consumo = media.agua > 72 ? "alto" : media.agua > 48 ? "moderado" : "controlado";
  const status = media.produtividade > 68 && media.preservacao > 55
    ? "produtivo e equilibrado"
    : media.produtividade > 68
      ? "produtivo com pressão ambiental"
      : "em recuperação sustentável";
  const risco = calcularIndiceAgroBalance(media) < 50 ? "alto" : media.agua > 72 ? "moderado" : "baixo";
  const recomendacao = risco === "alto"
    ? "reduzir pressão produtiva, recuperar solo e proteger áreas sensíveis"
    : media.agua > 72
      ? "ajustar irrigação e priorizar sensores de umidade"
      : "manter monitoramento e práticas sustentáveis";

  elementos.sectorDetails.innerHTML = `
    <strong>${rotulosSetor[setorSelecionado]}</strong>
    <p>Umidade: ${media.umidadeSolo}% | Fertilidade: ${media.fertilidade}% | Preservação: ${media.preservacao}% | Consumo de água: ${consumo}</p>
    <p>Risco: ${risco} | Status do sensor: online | Status operacional: ${status}</p>
    <p>Recomendação da IA: ${recomendacao}.</p>
  `;
}

function selecionarSetor(setor) {
  setorSelecionado = setor;
  sectorButtons.forEach((botao) => botao.classList.toggle("active", botao.dataset.sector === setor));
  atualizarTudo();
}

function renderizarEvento() {
  const evento = eventos[eventoAtual];
  elementos.eventTitle.textContent = evento.titulo;
  elementos.eventDescription.textContent = evento.descricao;
  elementos.actionList.innerHTML = evento.acoes
    .map(([rotulo, efeito], index) => `
      <button type="button" data-action="${index}">
        <strong>${rotulo}</strong>
        <span>${formatarImpacto(efeito)}</span>
      </button>
    `)
    .join("");
}

function aplicarAcao(index) {
  const [rotulo, efeito] = eventos[eventoAtual].acoes[index];
  const alvo = setorSelecionado === "todos" ? setores : [setorSelecionado];
  alvo.forEach((setor) => {
    Object.keys(efeito).forEach((campo) => {
      modificadores[setor][campo] = limitar(modificadores[setor][campo] + efeito[campo], -35, 35);
    });
  });
  elementos.decisionResult.textContent = `${rotulo}: ação aplicada em ${setorSelecionado === "todos" ? "todos os setores" : rotulosSetor[setorSelecionado]}. A IA recalculou indicadores, alertas e índice AgroBalance.`;
  renderizarImpactos(efeito);
  gerarPulso();
  atualizarTudo();
  gerarDiagnostico();
}

function aplicarAcaoBalanca(chave) {
  const acao = acoesBalanca[chave];
  const alvo = setorSelecionado === "todos" ? setores : [setorSelecionado];

  alvo.forEach((setor) => {
    Object.keys(acao.efeito).forEach((campo) => {
      modificadores[setor][campo] = limitar(modificadores[setor][campo] + acao.efeito[campo], -35, 35);
    });
  });

  elementos.decisionResult.textContent = acao.texto;
  gerarPulso();
  atualizarTudo();
}

function aplicarCenario(chave) {
  const cenario = cenarios[chave];
  if (!cenario) return;
  setores.forEach((setor) => {
    modificadores[setor] = {
      umidadeSolo: 0,
      agua: 0,
      fertilidade: 0,
      biodiversidade: 0,
      preservacao: 0,
      produtividade: 0,
      ...cenario.efeito,
    };
  });
  scenarioButtons.forEach((botao) => {
    const ativo = botao.dataset.scenario === chave;
    botao.classList.toggle("active", ativo);
    botao.setAttribute("aria-pressed", String(ativo));
  });
  elementos.activeScenarioName.textContent = cenario.nome;
  elementos.scenarioSummary.textContent = cenario.texto;
  elementos.scenarioRecommendation.textContent = cenario.recomendacao;
  elementos.decisionResult.textContent = `${cenario.nome} aplicado. Agora escolha uma resposta do produtor para melhorar ou piorar o equilíbrio.`;
  renderizarImpactos(cenario.efeito);
  registrarLinhaDoTempo(`${cenario.nome} aplicado pelo produtor. O Motor AgroBalance AI recalculou riscos e recomendações.`);
  gerarPulso();
  atualizarTudo();
  gerarDiagnostico();
}

function prepararSimuladorInicial() {
  elementos.activeScenarioName.textContent = "Nenhum cenário aplicado";
  elementos.scenarioSummary.textContent = "Primeiro escolha um cenário agrícola. Depois selecione uma resposta do produtor.";
  elementos.scenarioRecommendation.textContent = "O sistema mostrará impactos reais nos indicadores e no diagnóstico.";
  elementos.simImpactList.innerHTML = `
    <li><strong>Passo 1</strong><span>Escolha um cenário acima</span></li>
    <li><strong>Passo 2</strong><span>Escolha uma ação do produtor</span></li>
    <li><strong>Passo 3</strong><span>Veja alertas, índice e diagnóstico mudarem</span></li>
  `;
}

function responderAssistente(pergunta) {
  const media = ultimaMedia || medias(registrosFiltrados());
  const critico = setorMaisCritico();

  const respostas = {
    solo: media.fertilidade < 52
      ? `O solo exige atenção: fertilidade em ${media.fertilidade}%. Recomendo rotação de culturas e cobertura vegetal.`
      : `O solo está operacional, com fertilidade em ${media.fertilidade}% e saúde da plantação em ${media.saudePlantacao}%.`,
    irrigar: media.agua > 72
      ? `Não aumente a irrigação agora. O consumo já está em ${media.agua} L/h; priorize irrigação controlada.`
      : `A irrigação pode ser mantida com cautela. O consumo está em ${media.agua} L/h e a umidade do solo em ${media.umidadeSolo}%.`,
    equilibrio: ultimoIndice >= 80
      ? `Sim. O Índice AgroBalance está em ${ultimoIndice}%, indicando produção sustentável.`
      : `Ainda não totalmente. O Índice AgroBalance está em ${ultimoIndice}%; ajuste água, biodiversidade e preservação.`,
    setor: `${rotulosSetor[critico.setor]} precisa de atenção. Índice setorial: ${critico.indice}%.`,
  };

  elementos.assistantAnswer.textContent = respostas[pergunta];
}

function gerarRelatorioFazenda() {
  const media = ultimaMedia || medias(registrosFiltrados());
  const critico = setorMaisCritico();
  const preservado = setorMaisPreservado();
  const principalRisco = media.agua > 72
    ? "consumo de água acima do ideal"
    : media.biodiversidade < 50
      ? "biodiversidade em queda"
      : media.fertilidade < 52
        ? "fertilidade do solo em atenção"
        : "risco controlado";
  const recomendacao = principalRisco === "risco controlado"
    ? "manter o monitoramento e preservar o equilíbrio atual"
    : "reduzir pressão produtiva, proteger áreas nativas e acompanhar o histórico dos sensores";

  elementos.farmReport.innerHTML = `
    <strong>Status geral:</strong> ${ultimaAnalise.status || "Em Observação"}<br>
    <strong>Índice AgroBalance:</strong> ${ultimoIndice}%<br>
    <strong>Principal risco:</strong> ${principalRisco}.<br>
    <strong>Principal recomendação:</strong> ${recomendacao}.<br>
    <strong>Setor mais crítico:</strong> ${rotulosSetor[critico.setor]} (${critico.indice}%).<br>
    <strong>Setor mais preservado:</strong> ${rotulosSetor[preservado.setor]}.
  `;
}

function ajustarIntensidadeVisual() {
  document.body.classList.remove("effects-low", "effects-high");
  if (elementos.visualIntensity.value === "1") document.body.classList.add("effects-low");
  if (elementos.visualIntensity.value === "3") document.body.classList.add("effects-high");
}

function atualizarTudo() {
  atualizarIndicadores();
  desenharGrafico();
}

// Controla a acessibilidade, navegação e interações da página.
function configurarInteracoes() {
  document.getElementById("diagnosticButton").addEventListener("click", gerarDiagnostico);
  document.getElementById("heroDiagnosticButton").addEventListener("click", () => {
    document.getElementById("dados").scrollIntoView({ behavior: "smooth" });
    gerarDiagnostico();
  });
  document.getElementById("resetSector").addEventListener("click", () => {
    setorSelecionado = "todos";
    sectorButtons.forEach((botao) => botao.classList.remove("active"));
    atualizarTudo();
  });
  document.getElementById("newEventButton").addEventListener("click", () => {
    eventoAtual = (eventoAtual + 1) % eventos.length;
    renderizarEvento();
    elementos.decisionResult.textContent = "Evento trocado. Agora escolha uma resposta do produtor para aplicar impacto real nos indicadores.";
    elementos.simImpactList.innerHTML = "";
  });
  document.getElementById("contrastToggle").addEventListener("click", (event) => {
    const ativo = document.body.classList.toggle("high-contrast");
    event.currentTarget.setAttribute("aria-pressed", String(ativo));
  });
  document.getElementById("fontIncrease").addEventListener("click", () => {
    document.body.classList.remove("small-font");
    document.body.classList.add("large-font");
  });
  document.getElementById("fontDecrease").addEventListener("click", () => {
    document.body.classList.remove("large-font");
    document.body.classList.add("small-font");
  });
  document.getElementById("topButton").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  elementos.visualIntensity.addEventListener("input", ajustarIntensidadeVisual);
  elementos.signalToggle.addEventListener("change", () => {
    document.body.classList.toggle("signal-off", !elementos.signalToggle.checked);
  });
  elementos.toggleTimelineButton.addEventListener("click", () => {
    const oculto = elementos.timelineList.classList.toggle("is-hidden");
    elementos.toggleTimelineButton.textContent = oculto ? "Mostrar histórico" : "Ocultar histórico";
  });

  sectorButtons.forEach((botao) => botao.addEventListener("click", () => selecionarSetor(botao.dataset.sector)));
  scaleActionButtons.forEach((botao) => botao.addEventListener("click", () => aplicarAcaoBalanca(botao.dataset.scaleAction)));
  scenarioButtons.forEach((botao) => botao.addEventListener("click", () => aplicarCenario(botao.dataset.scenario)));
  assistantButtons.forEach((botao) => botao.addEventListener("click", () => responderAssistente(botao.dataset.question)));
  document.getElementById("farmReportButton").addEventListener("click", gerarRelatorioFazenda);
  periodButtons.forEach((botao) => botao.addEventListener("click", () => {
    periodoSelecionado = Number(botao.dataset.period);
    periodButtons.forEach((item) => item.classList.toggle("active", item === botao));
    atualizarTudo();
  }));
  flowButtons.forEach((botao) => botao.addEventListener("click", () => {
    flowButtons.forEach((item) => item.classList.toggle("active", item === botao));
    elementos.flowExplanation.textContent = explicacoesFluxo[botao.dataset.flow];
  }));
  elementos.actionList.addEventListener("click", (event) => {
    const botao = event.target.closest("[data-action]");
    if (botao) aplicarAcao(Number(botao.dataset.action));
  });
}

for (let i = 0; i < 168; i += 1) {
  gerarPulso(true);
  horaSimulada += 1;
}

configurarInteracoes();
renderizarEvento();
prepararSimuladorInicial();
atualizarTudo();

setInterval(() => {
  gerarPulso();
  atualizarTudo();
}, 3000);
