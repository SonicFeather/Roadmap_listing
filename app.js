const CSV_CANDIDATES = ["milestones.csv", "shuangji_milestones_listing.csv"];
const DEFAULT_SOURCE_LABEL = "milestones.csv";
const REQUIRED_FIELDS = [
  "id",
  "project_group",
  "group_color_key",
  "title",
  "phase",
  "start_date",
  "end_date",
  "status",
  "summary",
  "objective",
  "scope",
  "deliverables",
  "dependencies",
  "risks",
  "owner",
  "remarks",
  "order_no",
];
const STATUS_ORDER = ["已完成", "进行中", "待启动"];
const STATUS_LABELS = {
  已完成: "已完成",
  进行中: "进行中",
  待启动: "待启动",
};
const STATUS_COLORS = {
  已完成: "var(--done)",
  进行中: "var(--doing)",
  待启动: "var(--todo)",
};
const GROUP_STYLE = {
  listing: { label: "上架", color: "var(--listing)", className: "listing" },
  social: { label: "社媒", color: "var(--social)", className: "social" },
};
const TIMELINE_RANGE = {
  start: new Date(2026, 2, 1),
  end: new Date(2026, 11, 20),
};
const MS_PER_DAY = 86400000;
const PX_PER_DAY = 7;
const EMBEDDED_CSV = `id,project_group,group_color_key,title,phase,start_date,end_date,status,summary,objective,scope,deliverables,dependencies,risks,owner,remarks,order_no
M1,上架,listing,上架流程与后台信息上架梳理完成,基础建设阶段,2026-03-01,2026-03-25,已完成,完成后台信息上架链路梳理与问题识别，明确本项目的核心业务边界。,明确当前新品上架流程中后台信息上架的真实路径、参与角色、痛点与系统边界，为后续数据建模和系统建设提供业务基础。,后台信息上架流程梳理|参与角色与职责梳理|现状痛点识别|业务边界确认|上架输入输出节点梳理,后台信息上架流程图|角色分工说明|问题清单|项目边界说明,,流程仍可能继续变化|不同团队口径不一致|现有操作存在隐性步骤未被识别,产品+业务,作为项目启动阶段的前置成果，已完成。,1
M2,上架,listing,数据建模与字段治理体系完成,基础建设阶段,2026-03-10,2026-04-05,已完成,完成上架场景的数据模型、字段标准与输出映射设计。,建立可支撑上架场景的数据标准体系，使字段能够统一管理来源、去向、层级、审核方式和输出结构。,商品数据语义整理|SSOT字段体系设计|输出映射设计|对象结构设计|option体系设计|输出结构设计,ssot_fields定义表|output_mapping映射表|object_schema对象结构说明|option_definition配置说明|output_layout输出结构文档,M1,字段定义反复调整|来源表单不稳定|历史字段命名不统一,产品+数据,该里程碑为后续前后端和AI工作流的基础。,2
M3,上架,listing,后端数据清洗系统主链路搭建完成,基础建设阶段,2026-03-20,2026-04-10,已完成,完成输入到输出的后端清洗主链路骨架搭建。,搭建可运行的数据处理主链路，实现原始输入到标准化、规则推导、结构生成和输出表生成的基本能力。,raw_data_loader搭建|engine字段解析|rule_engine规则执行|schema_manager结构生成|export_generator输出生成|validation_report基础能力|field_trace基础能力,后端处理链路代码框架|基础可运行样例|输出表样例|校验结果样例|trace结果样例,M2,真实样本覆盖不全|规则复杂度持续上升|字段trace粒度仍需细化,产品+开发,当前已完成系统骨架，后续需要持续补充真实业务规则。,3
M4,上架,listing,前后端契约与系统方案收敛,系统承接阶段,2026-04-14,2026-05-15,进行中,统一前端任务模型、页面结构与后端接口契约，形成可开发的系统方案。,在已有数据模型和后端能力基础上，完成面向前端工作台的任务对象、页面结构、接口字段和交互逻辑收敛，减少后续反复返工。,任务模型定义|页面结构收敛|前后端接口字段对齐|真实样本校对|工作台任务流设计|详情页编辑流设计|导出与规则页数据契约设计,前后端接口文档|页面信息架构说明|任务对象定义|真实样本映射说明|联调约定文档,M2|M3,前端仍沿用旧任务假设|真实CSV样本与现有mock差异大|接口字段仍可能调整,产品+前端+后端,这是从底层能力转向系统承接的关键阶段。,4
M5,上架,listing,前端工作台与审核闭环建设,系统承接阶段,2026-05-16,2026-06-30,待启动,建设运营可用的工作台、详情页、导出预览和规则告警页面。,让运营能够在系统中完成创建任务、查看任务、审核信息、选择候选内容并查看输出结果，形成可演示的业务闭环。,工作台列表页建设|工作项详情页建设|导出预览页建设|规则与告警页建设|系统配置页建设|前后端联调,前端可用页面|联调版本|页面交互原型|接口联调记录|基础演示流程,M4,真实数据与页面状态复杂|审核流细节未完全定义|配置页能力范围可能扩张,产品+前端,完成后可支持运营侧试用和演示。,5
M6,上架,listing,AI候选生成与人工审核工作流接入,智能化闭环阶段,2026-07-01,2026-08-10,待启动,接入AI预填与多候选生成能力，并支持人工审核选择。,让AI成为上架流程中的辅助生产模块，对核心文本字段给出多个候选，降低人工填写成本，同时保留人工审核决策权。,AI输入上下文定义|候选字段范围定义|Title生成|SEO Title生成|SEO Description生成|Tags生成|人工选择与回填逻辑设计|知识库或skill上下文接入,AI生成方案说明|Prompt或Skill配置|候选生成样例|人工审核交互说明|字段回填逻辑说明,M4|M5,生成内容质量波动|品牌口径不稳定|知识上下文不足导致候选可用率低,产品+AI,AI只做候选生成，不替代人工最终确认。,6
M7,上架,listing,输出联调与业务试运行,智能化闭环阶段,2026-08-11,2026-09-10,待启动,完成五类输出表联调，支持业务侧使用真实样本进行试跑。,验证系统从任务创建到输出表生成的完整链路在真实业务中的可用性，发现字段、规则和流程中的关键问题。,输出表格式确认|shopify_export_preview联调|product_big_table联调|inventory_mapping联调|其他配套表输出确认|真实样本试跑|业务反馈收集,五类输出表样例|试运行记录|问题清单|字段修正建议|流程优化建议,M5|M6,真实业务样本暴露更多边缘情况|输出表字段仍可能增减|业务反馈导致返工,产品+业务+开发,这是项目从系统可用走向业务可用的重要验证节点。,7
M8,上架,listing,Shopify接入与自动导入方案落地,联通与产品化阶段,2026-09-11,2026-10-20,待启动,打通输出结果到Shopify后台的导入链路，实现业务闭环。,让上架系统不只停留在导出表，而是能够真正把整理后的产品信息导入Shopify后台，提升自动化程度。,Shopify导入方式评估|自动导入链路设计|导入接口联调|异常处理设计|导入结果验证|手动与自动方案对比,Shopify接入方案|导入联调记录|试点导入结果|异常处理说明|流程操作手册,M7,Shopify接口限制|权限边界不清|商品对象映射复杂|异常回退策略不完善,产品+开发,该阶段是项目形成真正业务闭环的关键节点。,8
M9,上架,listing,插件化方案评估与原型验证,联通与产品化阶段,2026-10-21,2026-11-25,待启动,评估以插件形式绑定Shopify后台的可行性，并完成原型验证。,探索将当前系统产品化为插件的可能路径，明确哪些能力适合在Shopify内承载，哪些能力仍需保留在外部系统。,插件化目标定义|Shopify App形态评估|权限与边界评估|嵌入式页面方案评估|最小原型验证|产品化收益与成本分析,插件化可行性分析|能力边界说明|原型页面或演示稿|后续产品化建议,M8,插件权限与审核要求复杂|原系统逻辑与插件形态不完全匹配|开发资源投入较大,产品+开发,该里程碑以可行性验证为主，不强求完整插件正式上线。,9
M10,上架,listing,项目试点验收与阶段复盘,联通与产品化阶段,2026-11-26,2026-12-20,待启动,完成项目试点验收，沉淀问题、价值与下一阶段规划。,通过试点结果验证项目价值，评估效率提升、字段复用、自动化程度和业务接受度，并形成下一阶段的建设方向。,试点项目验收|效率评估|问题复盘|风险复盘|业务反馈汇总|下一阶段规划,试点验收报告|复盘报告|价值评估结论|下一阶段路线图|领导汇报材料,M8|M9,试点样本代表性不足|价值评估口径不统一|后续资源争取存在不确定性,产品+业务+管理层,该节点用于年度总结和下一阶段立项准备。,10
M11,社媒,social,,,,待启动,,,,,,,,,,11
M12,社媒,social,,,,待启动,,,,,,,,,,12`;

const appState = {
  allMilestones: [],
  visibleMilestones: [],
  incompleteMilestones: [],
  /** null = 显示全部分组；否则为 group_color_key（如 listing / social） */
  groupFilterKey: null,
  allGroups: [],
  sourceLabel: DEFAULT_SOURCE_LABEL,
  currentBoardItems: [],
};

document.addEventListener("DOMContentLoaded", init);

async function init() {
  const appRoot = document.getElementById("appRoot");
  try {
    const loadResult = await loadMilestones();
    appState.sourceLabel = loadResult.sourceLabel;
    document.getElementById("dataSourceLabel").textContent = loadResult.sourceLabel;
    document.getElementById("serveNote").textContent =
      loadResult.mode === "embedded"
        ? "当前使用内嵌 CSV 回退模式，可直接 file:// 打开预览；正式维护时建议继续更新 milestones.csv。"
        : "当前为 CSV 文件直读模式；若浏览器对 file:// 受限，可通过轻量静态服务器访问。";

    const parsed = normalizeMilestones(parseCsv(loadResult.csvText));
    const sorted = parsed.sort((a, b) => a.orderNo - b.orderNo);
    appState.allMilestones = sorted;
    appState.visibleMilestones = sorted.filter(isSchedulable);
    appState.incompleteMilestones = sorted.filter((item) => !isSchedulable(item));
    appState.allGroups = [...new Set(appState.allMilestones.map((item) => item.group_color_key).filter(Boolean))];
    appState.groupFilterKey = null;

    if (!appState.allMilestones.length) {
      renderEmpty("CSV 已读取，但没有可用的里程碑数据。");
      return;
    }

    bindGlobalEvents();
    renderRoute();
  } catch (error) {
    console.error(error);
    renderEmpty("里程碑数据加载失败，请检查 CSV 文件字段是否完整。");
  } finally {
    appRoot.classList.remove("is-loading");
  }
}

async function loadMilestones() {
  for (const source of CSV_CANDIDATES) {
    try {
      const response = await fetch(source, { cache: "no-store" });
      if (!response.ok) {
        continue;
      }
      const csvText = await response.text();
      return { csvText, sourceLabel: source, mode: "fetch" };
    } catch (error) {
      continue;
    }
  }

  return { csvText: EMBEDDED_CSV, sourceLabel: `${DEFAULT_SOURCE_LABEL}（内嵌回退）`, mode: "embedded" };
}

function parseCsv(text) {
  const rows = [];
  let current = "";
  let row = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(current);
      current = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        i += 1;
      }
      row.push(current);
      if (row.some((cell) => cell.trim() !== "")) {
        rows.push(row);
      }
      row = [];
      current = "";
      continue;
    }

    current += char;
  }

  if (current !== "" || row.length) {
    row.push(current);
    rows.push(row);
  }

  if (!rows.length) {
    return [];
  }

  const headers = rows[0].map((header) => header.trim());
  const hasRequiredHeaders = REQUIRED_FIELDS.every((field) => headers.includes(field));
  if (!hasRequiredHeaders) {
    throw new Error("CSV 缺少必需字段。");
  }

  return rows.slice(1).map((cells) => {
    const record = {};
    headers.forEach((header, index) => {
      record[header] = (cells[index] || "").trim();
    });
    return record;
  });
}

function normalizeMilestones(records) {
  return records.map((record) => {
    const normalized = { ...record };
    normalized.id = String(normalized.id || "").trim();
    normalized.orderNo = Number.parseInt(record.order_no, 10) || Number.MAX_SAFE_INTEGER;
    normalized.startDate = parseDate(record.start_date);
    normalized.endDate = parseDate(record.end_date);
    normalized.scopeList = splitPipeField(record.scope);
    normalized.deliverablesList = splitPipeField(record.deliverables);
    normalized.dependenciesList = splitPipeField(record.dependencies);
    normalized.risksList = splitPipeField(record.risks);
    normalized.groupMeta = getGroupMeta(record.group_color_key, record.project_group);
    normalized.status = STATUS_LABELS[record.status] ? record.status : "待启动";
    normalized.fullTitle = record.title || "";
    normalized.shortTitle = getShortTitle(record.title || "");
    normalized.barTitle = getBarTitle(normalized.id, normalized.fullTitle);
    return normalized;
  });
}

function splitPipeField(value) {
  return (value || "")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseDate(value) {
  if (!value) {
    return null;
  }

  const normalized = value.trim().replace(/\//g, "-");
  const parts = normalized.split("-").map((part) => part.trim()).filter(Boolean);
  if (parts.length < 3) {
    return null;
  }
  const [year, month, day] = parts.map((item) => Number.parseInt(item, 10));
  if (!year || !month || !day) {
    return null;
  }
  return new Date(year, month - 1, day);
}

function getGroupMeta(key, fallbackLabel) {
  const meta = GROUP_STYLE[key];
  if (meta) {
    return meta;
  }
  return {
    label: fallbackLabel || "未分组",
    color: "var(--todo)",
    className: "listing",
  };
}

function isSchedulable(item) {
  return Boolean(item.id && item.title && item.startDate && item.endDate);
}

function bindGlobalEvents() {
  window.addEventListener("hashchange", renderRoute);
  window.addEventListener("resize", () => {
    hideTooltip();
    requestAnimationFrame(() => syncRoadmapRowHeights());
  });
}

function renderRoute() {
  renderOverview();
  syncDrawerFromHash();
}

function getMilestoneIdFromHash() {
  const raw = window.location.hash.replace(/^#/, "").trim();
  if (!raw) {
    return null;
  }
  const query = raw.startsWith("?") ? raw.slice(1) : raw;
  try {
    const params = new URLSearchParams(query);
    const fromParams = params.get("milestone");
    if (fromParams) {
      return fromParams;
    }
  } catch {
    /* fall through */
  }
  const match = query.match(/(?:^|&)milestone=([^&]+)/);
  if (!match) {
    return null;
  }
  try {
    return decodeURIComponent(match[1].replace(/\+/g, " "));
  } catch {
    return match[1];
  }
}

function renderOverview() {
  const appRoot = document.getElementById("appRoot");
  const template = document.getElementById("overviewTemplate");
  appRoot.innerHTML = "";
  appRoot.appendChild(template.content.cloneNode(true));

  const visibleItems = getFilteredMilestones();
  appState.currentBoardItems = visibleItems;
  fillOverviewMeta(visibleItems);
  renderGroupFilters();
  renderStatusLegend();
  renderTimeline(visibleItems);
  bindDrawerEvents();
}

function getFilteredMilestones() {
  if (appState.groupFilterKey == null || appState.groupFilterKey === "") {
    return appState.visibleMilestones;
  }
  return appState.visibleMilestones.filter((item) => item.group_color_key === appState.groupFilterKey);
}

function fillOverviewMeta(items) {
  document.getElementById("rangeLabel").textContent = `${formatDate(TIMELINE_RANGE.start)} - ${formatDate(TIMELINE_RANGE.end)}`;
  document.getElementById("milestoneCountLabel").textContent = `${items.length} / ${appState.visibleMilestones.length}`;
  document.getElementById("groupCountLabel").textContent = `${new Set(appState.allMilestones.map((item) => item.project_group).filter(Boolean)).size}`;

  const counts = {
    已完成: items.filter((item) => item.status === "已完成").length,
    进行中: items.filter((item) => item.status === "进行中").length,
    待启动: items.filter((item) => item.status === "待启动").length,
  };
  document.getElementById("statCompleted").textContent = counts["已完成"];
  document.getElementById("statActive").textContent = counts["进行中"];
  document.getElementById("statPending").textContent = counts["待启动"];
}

function renderGroupFilters() {
  const container = document.getElementById("groupFilters");
  const groups = [...new Set(appState.visibleMilestones.map((item) => item.group_color_key).filter(Boolean))];
  container.innerHTML = "";

  groups.forEach((groupKey) => {
    const meta = getGroupMeta(groupKey);
    const button = document.createElement("button");
    button.type = "button";
    const chipActive =
      appState.groupFilterKey === null || appState.groupFilterKey === groupKey;
    button.className = `filter-chip ${chipActive ? "is-active" : ""}`;
    button.textContent = meta.label;
    button.dataset.groupKey = groupKey;
    button.addEventListener("click", () => {
      if (appState.groupFilterKey === groupKey) {
        appState.groupFilterKey = null;
      } else {
        appState.groupFilterKey = groupKey;
      }
      renderRoute();
    });
    container.appendChild(button);
  });
}

function renderStatusLegend() {
  const statusLegend = document.getElementById("statusLegend");
  statusLegend.innerHTML = "";

  STATUS_ORDER.forEach((status) => {
    statusLegend.appendChild(createLegendItem(status, STATUS_COLORS[status]));
  });
}

function createLegendItem(label, color) {
  const item = document.createElement("div");
  item.className = "legend-item";
  const swatch = document.createElement("span");
  swatch.className = "legend-swatch";
  swatch.style.background = color;
  item.appendChild(swatch);
  item.appendChild(document.createTextNode(label));
  return item;
}

function renderTimeline(items) {
  const monthHeader = document.getElementById("monthHeader");
  const list = document.getElementById("timelineList");
  const rows = document.getElementById("timelineRows");
  const warning = document.getElementById("dataWarning");

  monthHeader.innerHTML = "";
  list.innerHTML = "";
  rows.innerHTML = "";

  setRoadmapAxisVars();
  buildMonthHeader(monthHeader, TIMELINE_RANGE.start, TIMELINE_RANGE.end);

  items.forEach((item) => {
    list.appendChild(createRoadmapLeftRow(item));
    rows.appendChild(createRoadmapTimelineRow(item));
  });

  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "loading-panel__card";
    empty.innerHTML = `<p class="empty-note">当前筛选条件下暂无可展示里程碑。</p>`;
    rows.appendChild(empty);
  }

  if (appState.incompleteMilestones.length) {
    warning.innerHTML = `<p class="warning-note">以下记录因信息不完整暂未进入时间轴：${appState.incompleteMilestones
      .map((item) => item.id || "未命名")
      .join("、")}</p>`;
  } else {
    warning.textContent = "";
  }

  requestAnimationFrame(() => {
    syncRoadmapRowHeights();
    requestAnimationFrame(() => syncRoadmapRowHeights());
  });
}

function createRoadmapLeftRow(item) {
  const row = document.createElement("button");
  row.type = "button";
  row.className = "roadmap-left-row";
  row.dataset.milestoneId = item.id;
  row.addEventListener("click", () => {
    const nextHash = `milestone=${encodeURIComponent(item.id)}`;
    if (window.location.hash === `#${nextHash}`) {
      openDrawer(item);
      return;
    }
    window.location.hash = nextHash;
  });

  const title = document.createElement("div");
  title.className = "roadmap-left-row__title";
  title.textContent = item.shortTitle || item.title || item.fullTitle;
  row.appendChild(title);

  const meta = document.createElement("div");
  meta.className = "roadmap-left-row__meta";
  meta.textContent = `${item.phase || "未填写阶段"} / ${formatDate(item.startDate)} - ${formatDate(item.endDate)}`;
  row.appendChild(meta);

  const tags = document.createElement("div");
  tags.className = "roadmap-left-row__tags";
  tags.appendChild(createRoadmapTag(item.groupMeta.label, `roadmap-tag roadmap-tag--${item.groupMeta.className}`));
  tags.appendChild(createRoadmapStatusTag(item.status));
  row.appendChild(tags);

  return row;
}

function createPill(text, className) {
  const pill = document.createElement("span");
  pill.className = className;
  pill.textContent = text;
  return pill;
}

function createStatusPill(status) {
  const pill = document.createElement("span");
  pill.className = "status-pill";
  pill.dataset.status = status;
  const dot = document.createElement("span");
  dot.className = "status-dot";
  dot.style.color = STATUS_COLORS[status];
  pill.appendChild(dot);
  pill.appendChild(document.createTextNode(status));
  return pill;
}

function createRoadmapTimelineRow(item) {
  const row = document.createElement("div");
  row.className = "roadmap-row";
  row.dataset.milestoneId = item.id;

  const axis = computeAxisPlacement(item.startDate, item.endDate);
  const widthPx = axis.widthDays * PX_PER_DAY;
  const bar = document.createElement("button");
  bar.type = "button";
  bar.className = `roadmap-bar roadmap-bar--${item.groupMeta.className}`;
  bar.dataset.status = item.status;
  bar.style.left = `${axis.offsetDays * PX_PER_DAY}px`;
  bar.style.width = `${Math.max(18, widthPx)}px`;

  const statusDot = document.createElement("span");
  statusDot.className = "status-dot";
  statusDot.style.color = STATUS_COLORS[item.status];
  bar.appendChild(statusDot);

  const label = document.createElement("span");
  label.className = "roadmap-bar__text";
  label.textContent = getRoadmapBarText(item, widthPx);
  bar.appendChild(label);

  bar.addEventListener("click", () => {
    const nextHash = `milestone=${encodeURIComponent(item.id)}`;
    if (window.location.hash === `#${nextHash}`) {
      openDrawer(item);
      return;
    }
    window.location.hash = nextHash;
  });
  bar.addEventListener("mouseenter", (event) => showTooltip(event, buildTooltipContent(item)));
  bar.addEventListener("mousemove", moveTooltip);
  bar.addEventListener("mouseleave", hideTooltip);
  bar.addEventListener("blur", hideTooltip);

  row.appendChild(bar);
  return row;
}

function setRoadmapAxisVars() {
  const totalDays = daysBetweenInclusive(TIMELINE_RANGE.start, TIMELINE_RANGE.end);
  const widthPx = totalDays * PX_PER_DAY;
  document.documentElement.style.setProperty("--roadmap-timeline-width", `${widthPx}px`);
  document.documentElement.style.setProperty("--roadmap-px-per-day", `${PX_PER_DAY}px`);
}

function buildMonthHeader(container, startDate, endDate) {
  const cursor = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
  while (cursor <= endDate) {
    const monthStart = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const monthEnd = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0);
    const segStart = maxDate(monthStart, startDate);
    const segEnd = minDate(monthEnd, endDate);
    if (segEnd >= segStart) {
      const days = daysBetweenInclusive(segStart, segEnd);
      const cell = document.createElement("div");
      cell.className = "roadmap-month-cell";
      cell.textContent = `${cursor.getMonth() + 1}月`;
      cell.style.width = `${days * PX_PER_DAY}px`;
      container.appendChild(cell);
    }
    cursor.setMonth(cursor.getMonth() + 1);
  }
}

function computeAxisPlacement(taskStart, taskEnd) {
  const start = maxDate(TIMELINE_RANGE.start, taskStart);
  const end = minDate(TIMELINE_RANGE.end, taskEnd);
  const offsetDays = Math.max(0, daysBetweenInclusive(TIMELINE_RANGE.start, start) - 1);
  const widthDays = end.getTime() >= start.getTime() ? Math.max(1, daysBetweenInclusive(start, end)) : 1;
  return { offsetDays, widthDays };
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function daysBetweenInclusive(startDate, endDate) {
  const start = startOfDay(startDate);
  const end = startOfDay(endDate);
  return Math.round((end.getTime() - start.getTime()) / MS_PER_DAY) + 1;
}

function maxDate(a, b) {
  return a.getTime() >= b.getTime() ? a : b;
}

function minDate(a, b) {
  return a.getTime() <= b.getTime() ? a : b;
}

function getRoadmapBarText(item, widthPx) {
  const compact = `${item.id} ${String(item.shortTitle || "").slice(0, 8)}`.trim();
  const normal = `${item.id} ${item.shortTitle || item.fullTitle || ""}`.trim();
  const bar = item.barTitle || compact;

  if (widthPx < 62) {
    return item.id;
  }
  if (widthPx < 110) {
    return compact;
  }
  if (widthPx < 180) {
    return bar;
  }
  return normal;
}

function createRoadmapTag(text, className) {
  const tag = document.createElement("span");
  tag.className = `${className} roadmap-tag--group`.replace(/\s+/g, " ").trim();
  tag.textContent = text;
  return tag;
}

function createRoadmapStatusTag(status) {
  const tag = document.createElement("span");
  tag.className = "roadmap-tag roadmap-tag--status";
  tag.dataset.status = status;
  const dot = document.createElement("span");
  dot.className = "status-dot";
  dot.style.color = STATUS_COLORS[status];
  tag.appendChild(dot);
  tag.appendChild(document.createTextNode(status));
  return tag;
}

function bindDrawerEvents() {
  const drawer = document.getElementById("milestoneDrawer");
  if (!drawer) {
    return;
  }
  const closeButton = document.getElementById("drawerCloseButton");
  closeButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (window.location.hash) {
      window.location.hash = "";
    }
    closeDrawer();
  });
}

function syncDrawerFromHash() {
  const milestoneId = getMilestoneIdFromHash();
  if (!milestoneId) {
    closeDrawer();
    return;
  }
  const inFilteredBoard = appState.currentBoardItems.some((item) => item.id === milestoneId);
  if (!inFilteredBoard) {
    if (window.location.hash) {
      window.location.hash = "";
    }
    closeDrawer();
    return;
  }
  const current = appState.allMilestones.find((item) => item.id === milestoneId);
  if (!current || !isSchedulable(current)) {
    closeDrawer();
    return;
  }
  openDrawer(current);
}

function openDrawer(item) {
  const drawer = document.getElementById("milestoneDrawer");
  if (!drawer) {
    return;
  }
  drawer.hidden = false;

  const list = appState.currentBoardItems.length ? appState.currentBoardItems : appState.visibleMilestones;
  const index = list.findIndex((entry) => entry.id === item.id);
  const prevItem = index > 0 ? list[index - 1] : null;
  const nextItem = index >= 0 && index < list.length - 1 ? list[index + 1] : null;

  setMilestoneSelection(item.id);

  const titleText = item.fullTitle || item.title || "-";
  const summaryText = item.summary && String(item.summary).trim() ? item.summary : "-";
  const objectiveText = item.objective && String(item.objective).trim() ? item.objective : "-";
  const phaseText = item.phase && String(item.phase).trim() ? item.phase : "-";
  const ownerText = item.owner && String(item.owner).trim() ? item.owner : "-";
  const remarksText = item.remarks && String(item.remarks).trim() ? item.remarks : "-";

  document.getElementById("drawerEyebrow").textContent = `${item.id} · ${item.project_group || item.groupMeta.label}`;
  document.getElementById("drawerTitle").textContent = titleText;
  document.getElementById("drawerSummary").textContent = summaryText;
  document.getElementById("drawerGroupBadge").textContent = item.project_group || item.groupMeta.label;
  document.getElementById("drawerGroupBadge").dataset.group = item.group_color_key || item.groupMeta.className;
  document.getElementById("drawerStatusBadge").textContent = item.status;
  document.getElementById("drawerStatusBadge").dataset.status = item.status;
  document.getElementById("drawerPhase").textContent = phaseText;
  document.getElementById("drawerDateRange").textContent = `${formatDate(item.startDate)} - ${formatDate(item.endDate)}`;
  document.getElementById("drawerOwner").textContent = ownerText;
  document.getElementById("drawerRemarks").textContent = remarksText;
  document.getElementById("drawerObjective").textContent = objectiveText;

  fillList("drawerScope", item.scopeList || [], "-");
  fillList("drawerDeliverables", item.deliverablesList || [], "-");
  fillList("drawerDependencies", item.dependenciesList || [], "-");
  fillList("drawerRisks", item.risksList || [], "-");

  const prevButton = document.getElementById("drawerPrevButton");
  const nextButton = document.getElementById("drawerNextButton");
  prevButton.disabled = !prevItem;
  nextButton.disabled = !nextItem;

  prevButton.onclick = prevItem
    ? () => {
        window.location.hash = `milestone=${encodeURIComponent(prevItem.id)}`;
      }
    : null;
  nextButton.onclick = nextItem
    ? () => {
        window.location.hash = `milestone=${encodeURIComponent(nextItem.id)}`;
      }
    : null;
}

function closeDrawer() {
  const drawer = document.getElementById("milestoneDrawer");
  if (!drawer) {
    return;
  }
  drawer.hidden = true;
  clearMilestoneSelection();
}

function setMilestoneSelection(activeId) {
  clearMilestoneSelection();
  document.querySelectorAll(".roadmap-left-row, .roadmap-bar").forEach((el) => {
    if (el.dataset.milestoneId === activeId) {
      el.classList.add("is-selected");
    }
  });
}

function clearMilestoneSelection() {
  document.querySelectorAll(".roadmap-left-row.is-selected, .roadmap-bar.is-selected").forEach((el) => {
    el.classList.remove("is-selected");
  });
}

function syncRoadmapRowHeights() {
  const leftRows = [...document.querySelectorAll("#timelineList .roadmap-left-row")];
  const rightRows = [...document.querySelectorAll("#timelineRows .roadmap-row")];
  leftRows.forEach((left) => {
    left.style.minHeight = "";
    left.style.height = "";
  });
  rightRows.forEach((right) => {
    right.style.minHeight = "";
    right.style.height = "";
  });
  leftRows.forEach((left, index) => {
    const right = rightRows[index];
    if (!right) {
      return;
    }
    const height = Math.max(left.getBoundingClientRect().height, right.getBoundingClientRect().height);
    const px = `${Math.ceil(height)}px`;
    left.style.minHeight = px;
    right.style.minHeight = px;
  });
}

function fillList(elementId, items, fallback) {
  const element = document.getElementById(elementId);
  if (!element) {
    return;
  }
  element.innerHTML = "";
  if (!items.length) {
    const li = document.createElement("li");
    li.textContent = fallback;
    element.appendChild(li);
    return;
  }
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    element.appendChild(li);
  });
}

function renderEmpty(message) {
  const appRoot = document.getElementById("appRoot");
  const template = document.getElementById("emptyStateTemplate");
  appRoot.innerHTML = "";
  appRoot.appendChild(template.content.cloneNode(true));
  document.getElementById("emptyMessage").textContent = message;
}

function formatDate(date) {
  if (!date) {
    return "未排期";
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

function showTooltip(event, text) {
  const tooltip = document.getElementById("tooltip");
  tooltip.hidden = false;
  tooltip.textContent = text;
  moveTooltip(event);
}

function moveTooltip(event) {
  const tooltip = document.getElementById("tooltip");
  if (tooltip.hidden) {
    return;
  }
  const offsetX = 24;
  const offsetY = 18;
  const preferRight = event.clientX + offsetX + tooltip.offsetWidth < window.innerWidth - 16;
  const nextLeft = preferRight
    ? event.clientX + offsetX
    : event.clientX - tooltip.offsetWidth - 18;
  const nextTop = Math.min(event.clientY + offsetY, window.innerHeight - tooltip.offsetHeight - 16);
  tooltip.style.left = `${Math.max(16, nextLeft)}px`;
  tooltip.style.top = `${Math.max(16, nextTop)}px`;
}

function hideTooltip() {
  const tooltip = document.getElementById("tooltip");
  tooltip.hidden = true;
}

// legacy timeline height sync removed (grid rows are fixed-height now)

function getShortTitle(title) {
  const mapping = {
    上架流程与后台信息上架梳理完成: "上架流程梳理",
    数据建模与字段治理体系完成: "数据建模与字段治理",
    后端数据清洗系统主链路搭建完成: "后端清洗主链路",
    前后端契约与系统方案收敛: "前后端契约与方案收敛",
    前端工作台与审核闭环建设: "前端工作台与审核闭环",
    AI候选生成与人工审核工作流接入: "AI候选生成与人工审核",
    输出联调与业务试运行: "输出联调与业务试运行",
    Shopify接入与自动导入方案落地: "Shopify接入与自动导入",
    插件化方案评估与原型验证: "插件化评估与原型验证",
    项目试点验收与阶段复盘: "项目试点验收与阶段复盘",
  };

  if (mapping[title]) {
    return mapping[title];
  }

  return title
    .replace(/完成$/g, "")
    .replace(/体系/g, "")
    .replace(/方案/g, "")
    .replace(/建设/g, "")
    .replace(/接入/g, "")
    .replace(/落地/g, "")
    .replace(/验证/g, "")
    .trim();
}

function getBarTitle(id, title) {
  const mapping = {
    M1: "M1 上架流程梳理",
    M2: "M2 数据建模字段治理",
    M3: "M3 后端清洗主链路",
    M4: "M4 前后端契约收敛",
    M5: "M5 前端工作台审核闭环",
    M6: "M6 AI候选生成审核",
    M7: "M7 输出联调试运行",
    M8: "M8 Shopify接入导入",
    M9: "M9 插件化评估原型",
    M10: "M10 项目验收复盘",
  };

  if (mapping[id]) {
    return mapping[id];
  }

  return `${id} ${getShortTitle(title).slice(0, 10)}`.trim();
}

function buildTooltipContent(item) {
  const title = `${item.id} ${item.fullTitle || ""}`.trim();
  const meta = `${item.phase || "未填写阶段"} / ${formatDate(item.startDate)} - ${formatDate(item.endDate)}`;
  const summary = item.summary || item.objective || "暂无说明";
  return `${title}\n${meta}\n${summary}`;
}
