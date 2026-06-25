---
name: sankhya-dashboard-html-jsp-custom-best-pratices
description: "Use when working with sankhya-dashboard-html-jsp-custom-best-pratices"
---

---
name: sankhya-dashboard-html-jsp-custom-best-pratices
description: "This skill should be used when the user asks for patterns, best practices, creation, or fixing of Sankhya dashboards using HTML, JSP, Java, and SQL."
category: code
risk: safe
source: community
tags: [sankhya, dashboard, jsp, html, sql, best-practices]
date_added: "2026-03-10"
---

# sankhya-dashboard-html-jsp-custom-best-pratices

## Purpose

To provide a consolidated guide of patterns and best practices for creating and maintaining dashboards, SQL queries, BI parameterization, and UI/UX within the Sankhya ecosystem (JSP/HTML/Java).

## When to Use This Skill

This skill should be used when:
- The user asks about "boas praticas do sankhya" or "Sankhya best practices".
- The user mentions "dashboard sankhya" or is working on a Sankhya BI dashboard.
- The user asks for anything related to the word "Sankhya".
- The user wants to create or modify code files for Sankhya dashboards.

## Core Capabilities

1. **Code Generation & Review**: Apply JSP/JSTL patterns and server-side organization to reduce compilation errors and rendering failures.
2. **Visual Consistency**: Standardize visual identity in BI components using predefined CSS tokens.
3. **Database Exploration**: Structure data exploration queries for performance and correct mapping of Sankhya entities.
4. **BI Construction Guide**: Use the HTML5 component flow in BI to ensure correct rendering, reactivity, and navigation.

## Patterns

### Melhores PrÃ¡ticas de CÃ³digo
Aplicar padrÃµes de JSP/JSTL e organizaÃ§Ã£o server-side para reduzir erros de compilaÃ§Ã£o, falhas de renderizaÃ§Ã£o e regressÃµes em dashboards/telas.

**Diretrizes de implementaÃ§Ã£o**
- Declarar diretivas JSP e taglibs obrigatÃ³rias no topo do arquivo.
- ForÃ§ar `isELIgnored="false"` para habilitar `${...}` em tempo de renderizaÃ§Ã£o.
- Preferir `core_rt` para JSTL core no ecossistema Sankhya.
- Evitar scriptlets Java em JSP; usar JSTL (`c:if`, `c:choose`, `c:forEach`).
- Modularizar lÃ³gica de negÃ³cio (camadas/serviÃ§os), evitando acoplamento em arquivo Ãºnico.
- Evitar hardcode de credenciais, URLs sensÃ­veis e tokens.
- Modelar estado global da UI (dados, filtros, ordenaÃ§Ã£o, aba ativa) e resetar estado antes de novo carregamento.
- Persistir preferÃªncias de visualizaÃ§Ã£o no `localStorage` (ordem de colunas e ordenaÃ§Ã£o).
- Implementar carregamento sob demanda para abas/modais pesados (lazy-load) para reduzir tempo inicial.
- **Blindagem de ParÃ¢metros**: Sempre definir um valor padrÃ£o (fallback) para parÃ¢metros de URL via `c:set` para evitar Erro 500 no servidor Java do Sankhya.
- **SeparaÃ§Ã£o de Camadas (JSP vs JS)**: Evitar injetar tags JSP diretamente dentro de blocos `<script>`. Utilizar containers HTML ocultos para passar dados ao JavaScript, mantendo a saÃºde do editor de cÃ³digo (IDE Linting).

> Os nomes de tabelas e campos abaixo sÃ£o representativos e podem variar conforme a implementaÃ§Ã£o da instÃ¢ncia.

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="snk" uri="/WEB-INF/tld/sankhyaUtil.tld" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<snk:load />
```

**Carregamento de assets em dashboard/gadget**
- Referenciar arquivos com `contextPath` + `BASE_FOLDER`.
- Em nÃ­veis secundÃ¡rios (`openLevel`), manter caminho absoluto para evitar quebra de resoluÃ§Ã£o.

```html
<script src="${pageContext.request.contextPath}/${BASE_FOLDER}/js/app.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/${BASE_FOLDER}/css/style.css" />
```

**Consumo seguro de `snk:query`**
- Iterar em `query.rows` (nÃ£o no objeto raiz).
- Testar vazio com `empty query.rows`.

```jsp
<snk:query var="qDados">
    SELECT CAB.NUNOTA, CAB.CODPARC
      FROM TGFCAB CAB
</snk:query>

<c:choose>
    <c:when test="${empty qDados.rows}">
        <span>Sem resultados</span>
    </c:when>
    <c:otherwise>
        <c:forEach var="linha" items="${qDados.rows}">
            ${linha.NUNOTA}
        </c:forEach>
    </c:otherwise>
</c:choose>
```

**SanitizaÃ§Ã£o de parÃ¢metros antes da SQL**
- Normalizar valor de entrada.
- Remover aspas (`"` e `&quot;`) antes de injetar em query.
- Definir fallback seguro para evitar SQL invÃ¡lida.

```jsp
<c:set var="raw_codusu" value="${empty param.P_CODUSU ? '0' : param.P_CODUSU}" />
<c:set var="codusu_limpo" value="${fn:replace(raw_codusu, '\"', '')}" />
<c:set var="codusu_limpo" value="${fn:replace(codusu_limpo, '&quot;', '')}" />
<c:set var="codusu_seguro" value="${empty codusu_limpo ? '0' : codusu_limpo}" />

<snk:query var="qAcessos">
    SELECT CODUSU, NOMEUSU
      FROM TSIUSU
     WHERE CODUSU = :codusu_seguro
</snk:query>
```

**Estado de tela e lazy-load em dashboard Ãºnico**
- Definir listas globais para reutilizaÃ§Ã£o em KPI, grÃ¡fico, tabela e modais.
- Guardar flag de carregamento por aba para evitar reconsultas desnecessÃ¡rias.
- Recarregar dados e reabrir o contexto (produto/aba) apÃ³s atualizaÃ§Ã£o transacional.

```js
var dadosGlobais = [];
var produtoAtual = null;
var abaCarregada = {};

function abrirDetalhe(dado) {
  produtoAtual = dado;
  abaCarregada = {};
  trocarAba("estoque");
}

function trocarAba(aba) {
  if (aba === "estoque" && !abaCarregada.estoque) carregarAbaEstoque(produtoAtual.CODPROD);
  if (aba === "pedidos" && !abaCarregada.pedidos) carregarAbaPedidos(produtoAtual.CODPROD);
  if (aba === "parceiros" && !abaCarregada.parceiros) carregarAbaParceiros(produtoAtual.CODPROD);
}
```
**Exemplo de Blindagem e SeparaÃ§Ã£o de Camadas**

```jsp
<%-- 1. Blindagem no topo do arquivo --%>
<c:set var="v_salesagent" value="${empty param.SALESAGENT ? '0' : param.SALESAGENT}" />

<%-- 2. Container oculto para dados (SeparaÃ§Ã£o JSP vs JS) --%>
<div id="data-container" style="display:none;">
    [
    <c:forEach var="row" items="${qDados.rows}" varStatus="loop">
        { "id": ${row.ID}, "nome": "${fn:replace(row.NOME, '"', '\\"')}" }${!loop.last ? ',' : ''}
    </c:forEach>
    ]
</div>

<script>
    // 3. JS apenas lÃª os dados do container
    const rawData = document.getElementById('data-container').textContent.trim();
    const myData = rawData ? JSON.parse(rawData) : [];
</script>
```

### Identidade Visual (Colors)
Padronizar identidade visual em componentes BI para consistÃªncia entre gadgets HTML5, tabelas e indicadores.

**Diretrizes de UI/UX**
- Definir paleta via tokens (`--color-*`) para evitar valores espalhados.
- Priorizar contraste mÃ­nimo entre texto/fundo (legibilidade operacional).
- Manter semÃ¢ntica visual consistente: sucesso, alerta, erro, neutro.
- Permitir sobrescrita por dados vindos do SQL (`BKCOLOR`, `FGCOLOR`) quando necessÃ¡rio.
- Usar cabeÃ§alho sticky e colunas fixas para tabelas largas com alto volume de leitura.
- Diferenciar status de linha via classes CSS (aprovado, parcial, histÃ³rico, crÃ­tico) para leitura operacional rÃ¡pida.

> Os nomes de tabelas e campos abaixo sÃ£o representativos e podem variar conforme a implementaÃ§Ã£o da instÃ¢ncia.

```html
<style>
  :root {
    --color-bg: #F5F7FA;
    --color-surface: #FFFFFF;
    --color-text: #1F2937;
    --color-success: #1A7F37;
    --color-warning: #B26A00;
    --color-danger: #B42318;
    --color-accent: #0E5A8A;
  }

  .card {
    background: var(--color-surface);
    color: var(--color-text);
    border-radius: 8px;
    padding: 12px;
  }
</style>
```

```sql
SELECT
    V.CODMETA,
    V.VALOR_ATUAL,
    V.VALOR_META,
    CASE WHEN V.VALOR_ATUAL >= V.VALOR_META THEN '#1A7F37' ELSE '#B42318' END AS BKCOLOR,
    '#FFFFFF' AS FGCOLOR
FROM AD_DADOS_VENDA V
```

```html
<style>
  #tblDados thead th { position: sticky; top: 0; z-index: 4; }
  #tblDados .col-fixa-1 { position: sticky; left: 0; z-index: 3; }
  #tblDados .col-fixa-2 { position: sticky; left: var(--fix-col-1-width); z-index: 2; }
  .row-aprovacao td { background: #ffe8cc; color: #7a3a00; }
  .row-parcial td { background: #fff4c4; color: #5e4c00; }
</style>
```

### Consultas e ExploraÃ§Ã£o de Banco
Estruturar exploraÃ§Ã£o de dados com foco em performance, legibilidade e mapeamento correto de entidades Sankhya.

**Boas prÃ¡ticas de exploraÃ§Ã£o (DBExplorer)**
- Usar DBExplorer para inspeÃ§Ã£o de tabelas, campos, Ã­ndices, views e procedures.
- Respeitar limite de retorno configurado (ex.: `DBEXPMAXROW`) para evitar carga excessiva.
- Evitar `SELECT *` em tabelas com campos volumosos (BLOB/CLOB).

**Mapas essenciais do ecossistema**
- DicionÃ¡rio: `TDDTAB`, `TDDCAM`, `TDDOPC`, `TDDINS`, `TDDLIG`.
- Comercial/financeiro: `TGFCAB`, `TGFITE`, `TGFTOP`, `TGFPAR`, `TGFPRO`, `TGFEST`, `TGFVAR`.
- SeguranÃ§a/acesso: `TSIUSU`, `TSIGRU`, `TSIACI`, `TSIIMP`.

**PadrÃµes de SQL recomendados**
- Em TOP versionada, relacionar `CODTIPOPER` + data de alteraÃ§Ã£o (`DHTIPOPER`/`DHALTER`).
- Em filtros opcionais, usar padrÃ£o `(... = :P_PARAM OR :P_PARAM IS NULL)`.
- Parametrizar sempre (evitar literals de usuÃ¡rio).

> Os nomes de tabelas e campos abaixo sÃ£o representativos e podem variar conforme a implementaÃ§Ã£o da instÃ¢ncia.

```sql
SELECT
    CAB.NUNOTA,
    CAB.CODPARC,
    CAB.DTNEG,
    ITE.SEQUENCIA,
    ITE.CODPROD,
    (ITE.VLRTOT - ITE.VLRDESC) AS VLR_LIQUIDO
FROM TGFCAB CAB
JOIN TGFITE ITE
  ON ITE.NUNOTA = CAB.NUNOTA
JOIN TGFTOP TOP
  ON TOP.CODTIPOPER = CAB.CODTIPOPER
 AND TOP.DHALTER   = CAB.DHTIPOPER
WHERE (CAB.CODPARC = :P_CODPARC OR :P_CODPARC IS NULL)
  AND (CAB.CODVEND = :P_CODVEND OR :P_CODVEND IS NULL)
```

```sql
SELECT
    U.CODUSU,
    U.NOMEUSU,
    G.NOMEGRUPO,
    A.CODREL,
    I.NOME AS DESCRICAO_RECURSO,
    A.CONS,
    A.ALTERA
FROM TSIUSU U
JOIN TSIGRU G ON G.CODGRUPO = U.CODGRUPO
JOIN TSIACI A ON A.CODGRUPO = U.CODGRUPO
JOIN TSIIMP I ON I.CODREL = A.CODREL
WHERE U.CODUSU = :P_CODUSU
ORDER BY I.NOME
```

### Guia do Construtor de BI
Aplicar fluxo de desenvolvimento de componentes HTML5 no BI para garantir renderizaÃ§Ã£o, reatividade e navegaÃ§Ã£o entre nÃ­veis.

**Estrutura e publicaÃ§Ã£o**
- Empacotar componente em `.zip` com `index.html` como entrada principal.
- Organizar recursos estÃ¡ticos em `assets/` (CSS, JS, libs, imagens).
- Usar XML/design conforme necessidade; considerar JSP de entrada quando houver prÃ©-processamento server-side.

**Fluxo de dados e parÃ¢metros**
- Definir variÃ¡veis SQL ou BeanShell conforme complexidade.
- Usar prefixos de traduÃ§Ã£o de parÃ¢metro:
  - `:` para bind padrÃ£o.
  - `:#` para substituiÃ§Ã£o literal (avaliar com cautela e validaÃ§Ã£o).
  - `:@` para literal textual em cenÃ¡rios como `LIKE`.
- Em parÃ¢metros multi-list extensos, usar `/*inCollection*/`.

> Os nomes de tabelas e campos abaixo sÃ£o representativos e podem variar conforme a implementaÃ§Ã£o da instÃ¢ncia.

```sql
SELECT
    C.CODCID,
    C.NOMECID,
    C.UF
FROM AD_TABELA_EXEMPLO C
WHERE /*inCollection*/ C.CODCID IN :P_CODCID /*inCollection*/
```

**Reatividade e ciclo de vida**
- Programar re-render quando filtros globais mudarem.
- Evitar dependÃªncia exclusiva de `DOMContentLoaded` em conteÃºdo injetado.
- Aplicar inicializaÃ§Ã£o assÃ­ncrona para garantir elementos disponÃ­veis.

```html
<script>
  function renderizarComponente(dados) {
    // Atualizar DOM, grÃ¡ficos e KPIs com os dados recebidos
  }

  function iniciar() {
    const dadosIniciais = window.snkBIData || [];
    renderizarComponente(dadosIniciais);
  }

  setTimeout(iniciar, 300);
</script>
```

**Drill-down e eventos**
- Modelar nÃ­veis independentes (macro â†’ micro) com argumentos explÃ­citos.
- Evitar contÃªiner vazio em nÃ­veis subsequentes.
- Usar heranÃ§a de contexto entre nÃ­veis para preservar filtros e navegaÃ§Ã£o.
- Implementar aÃ§Ãµes de clique para atualizar detalhes e abrir telas nativas com chave de contexto.

**NavegaÃ§Ã£o multi-nÃ­vel (openLevel e contrato de contexto)**
- Definir constantes de nÃ­vel em configuraÃ§Ã£o (`NIVEL_RESUMO`, `NIVEL_DETALHE`, `NIVEL_ITEM`) para evitar acoplamento em string solta.
- Encapsular `openLevel` em funÃ§Ãµes dedicadas por rota de navegaÃ§Ã£o (ex.: abrir detalhe por vendedor, abrir itens por parceiro).
- Repassar parÃ¢metros de contexto entre nÃ­veis com contrato explÃ­cito (`ARG_*` para chaves e `P_*` para filtros/perÃ­odo).
- Validar disponibilidade de `openLevel` e parÃ¢metros obrigatÃ³rios antes de navegar.
- Aplicar fallback de erro no console/UI quando o contexto nÃ£o permitir abertura de nÃ­vel.

```js
var cfg = window.DASH_CONFIG || {};
var NIVEL_DETALHE = cfg.NIVEL_DETALHE || "NIVEL_B";
var NIVEL_ITEM = cfg.NIVEL_ITEM || "NIVEL_C";

function abrirNivelDetalhe(codigoEntidade) {
  if (!codigoEntidade || typeof openLevel !== "function") return;
  openLevel(NIVEL_DETALHE, {
    ARG_CODENT: parseInt(codigoEntidade, 10),
    P_PERIODO_INI: cfg.P_PERIODO_INI || "",
    P_PERIODO_FIN: cfg.P_PERIODO_FIN || "",
    P_CODMETA: cfg.P_CODMETA || ""
  });
}

function abrirNivelItem(codigoEntidadeFilha) {
  if (!codigoEntidadeFilha || typeof openLevel !== "function") return;
  openLevel(NIVEL_ITEM, {
    ARG_CODENT_FILHA: parseInt(codigoEntidadeFilha, 10),
    P_PERIODO_INI: cfg.P_PERIODO_INI || "",
    P_PERIODO_FIN: cfg.P_PERIODO_FIN || "",
    P_CODMETA: cfg.P_CODMETA || ""
  });
}
```

**SeguranÃ§a e bloqueio de acesso por escopo**
- Restringir qualquer consulta de nÃ­vel pela relaÃ§Ã£o usuÃ¡rio-meta/escopo antes de agregar dados.
- Centralizar o predicado de seguranÃ§a em funÃ§Ã£o de montagem de `WHERE` para reaproveitamento em KPIs, grids e grÃ¡ficos.
- Preferir variÃ¡veis de sessÃ£o (`CODUSU_LOG` ou funÃ§Ã£o equivalente de usuÃ¡rio logado) para evitar spoof de parÃ¢metro de usuÃ¡rio.
- Bloquear carga quando parÃ¢metros crÃ­ticos estiverem ausentes (ex.: perÃ­odo, meta, entidade de drill-down).

> Os nomes de tabelas e campos abaixo sÃ£o representativos e podem variar conforme a implementaÃ§Ã£o da instÃ¢ncia.

```sql
SELECT
    M.CODMETA,
    M.CODENTIDADE,
    SUM(M.VLRPREV) AS VLR_PREV,
    SUM(M.VLRREAL) AS VLR_REAL
FROM AD_DADOS_META M
WHERE M.CODMETA = :P_CODMETA
  AND M.DTREF BETWEEN TO_DATE(:P_PERIODO_INI, 'DD/MM/YYYY')
                  AND TO_DATE(:P_PERIODO_FIN, 'DD/MM/YYYY')
  AND EXISTS (
      SELECT 1
      FROM AD_META_USUARIO_LIB L
      WHERE L.CODMETA = M.CODMETA
        AND L.CODUSU = STP_GET_CODUSULOGADO
  )
GROUP BY M.CODMETA, M.CODENTIDADE
```

**Grid hierÃ¡rquica com expansÃ£o/colapso**
- Estruturar mapa `filhosPorPai` e estado `nosExpandidos` para renderizaÃ§Ã£o incremental da Ã¡rvore.
- Inicializar nÃ³s nÃ£o analÃ­ticos de nÃ­veis superiores como expandidos para melhorar leitura inicial.
- Em nÃ³s colapsados, exibir agregados de descendentes analÃ­ticos para manter contexto sem abrir toda Ã¡rvore.
- Fornecer aÃ§Ãµes rÃ¡pidas de â€œExpandir tudoâ€ e â€œRecolher tudoâ€ no cabeÃ§alho.
- Em filtros de texto, incluir ancestrais dos nÃ³s encontrados para preservar rastreabilidade hierÃ¡rquica.

```js
var filhosPorPai = {};
var nosExpandidos = {};

function alternarNo(codNo) {
  var id = String(codNo);
  nosExpandidos[id] = !nosExpandidos[id];
  renderizarGrid();
}

function obterVisiveis(raiz) {
  var lista = [];
  function visitar(pai) {
    (filhosPorPai[pai] || []).forEach(function (no) {
      lista.push(no);
      if (nosExpandidos[String(no.CODNO)]) visitar(String(no.CODNO));
    });
  }
  visitar(String(raiz || ""));
  return lista;
}
```

**ResiliÃªncia de carregamento**
- Separar a carga principal da carga complementar (ex.: realizado mensal) e nÃ£o bloquear a visualizaÃ§Ã£o principal por falha secundÃ¡ria.
- Tratar ausÃªncia de dados por componente (`vazio`) sem derrubar o layout inteiro.
- Destruir instÃ¢ncias de grÃ¡fico antes de recriar para evitar vazamento e sobreposiÃ§Ã£o visual.
- Carregar painÃ©is secundÃ¡rios somente ao abrir aba/visÃ£o correspondente (on-demand).

**NavegaÃ§Ã£o intra-nÃ­vel (single JSP)**
- Tratar o JSP Ãºnico como shell de navegaÃ§Ã£o: tabela principal + modal de detalhe + abas internas + modais auxiliares.
- Encadear cliques sem trocar de nÃ­vel Sankhya: KPI â†’ lista modal, grÃ¡fico â†’ filtro de tabela, linha da tabela â†’ detalhe.
- Aplicar atalhos de aÃ§Ã£o no detalhe para abrir cadastro nativo no contexto da chave primÃ¡ria.
- Fechar modal por clique no overlay para reduzir atrito de uso.

```js
function abrirTelaNativa(resourceIdBase64, pkObj) {
  var pk = btoa(JSON.stringify(pkObj));
  top.location.href = "/mge/system.jsp#app/" + resourceIdBase64 + "/" + pk + "&pk-refresh=" + Date.now();
}

function onKpiClick(lista) {
  abrirModalLista("Itens selecionados", "NavegaÃ§Ã£o por atalho", lista);
}

function onGraficoClick(grupo) {
  filtrarTabelaPorGrupo(grupo);
}
```

**Feedback operacional de interface**
- Exibir estados explÃ­citos de carregamento, vazio e erro em cada painel.
- Em aÃ§Ãµes de atualizaÃ§Ã£o, desabilitar botÃ£o de confirmaÃ§Ã£o atÃ© o retorno do `executeQuery`.
- ApÃ³s sucesso, recarregar dados e restaurar contexto anterior (produto e aba ativa).

**VariÃ¡veis internas de seguranÃ§a**
- Aproveitar variÃ¡veis de sessÃ£o para seguranÃ§a em nÃ­vel de linha (`CODUSU_LOG`, `CODGRU_LOG`, `CODVEN_LOG`).
- Restringir dados por contexto do usuÃ¡rio antes de montar visualizaÃ§Ãµes.

## Limitations
- Use this skill only when the task clearly matches the scope described above.
- Do not treat the output as a substitute for environment-specific validation, testing, or expert review.
- Stop and ask for clarification if required inputs, permissions, safety boundaries, or success criteria are missing.

