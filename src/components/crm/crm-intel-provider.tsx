import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/**
 * CRM market / campaign intelligence store.
 *
 * The cloud schema for these new concepts is prepared but NOT executed
 * (see db/pending-migrations/20260808_crm_market_intelligence.sql), so — exactly
 * like the HR and Compliance modules already do in this project — the layer is
 * persisted locally until the migration is applied.
 */

const KEY = "bizz.crm.intel";

export type MarketAudience = {
  id: string;
  name: string;
  region: string;
  /** estimated total potential customers in this audience */
  available: number;
  /** how many of those the business can realistically reach today */
  reach: number;
  channels: string[];
  notes?: string;
};

export type CampaignObjective =
  | "awareness"
  | "lead_generation"
  | "conversion"
  | "retention"
  | "reactivation"
  | "referral";

export type CampaignTemplateKey =
  | "content_educational"
  | "content_product_awareness"
  | "content_brand"
  | "content_demo"
  | "content_testimonial"
  | "ads_awareness"
  | "ads_leads"
  | "ads_conversion"
  | "ads_retargeting"
  | "growth_acquisition"
  | "growth_retention"
  | "growth_repeat"
  | "growth_referral"
  | "growth_reactivation";

export type CampaignTemplate = {
  key: CampaignTemplateKey;
  group: "Content Creation" | "Sponsored Ads" | "Customer Growth";
  label: string;
  objective: CampaignObjective;
  channel: string;
  content: string;
};

export const CAMPAIGN_TEMPLATES: CampaignTemplate[] = [
  { key: "content_educational", group: "Content Creation", label: "Educational content", objective: "awareness", channel: "social", content: "Teach the audience how to solve a problem your product addresses." },
  { key: "content_product_awareness", group: "Content Creation", label: "Product awareness", objective: "awareness", channel: "social", content: "Introduce a product, its use case and price positioning." },
  { key: "content_brand", group: "Content Creation", label: "Brand awareness", objective: "awareness", channel: "social", content: "Who we are, what we stand for, why customers trust us." },
  { key: "content_demo", group: "Content Creation", label: "Product demonstration", objective: "conversion", channel: "social", content: "Short demo showing the product in real use." },
  { key: "content_testimonial", group: "Content Creation", label: "Customer story / testimonial", objective: "conversion", channel: "social", content: "A served customer tells their result in their own words." },
  { key: "ads_awareness", group: "Sponsored Ads", label: "Awareness ads", objective: "awareness", channel: "social", content: "Paid reach to the unserved part of the reachable market." },
  { key: "ads_leads", group: "Sponsored Ads", label: "Lead generation ads", objective: "lead_generation", channel: "social", content: "Collect contacts of interested prospects." },
  { key: "ads_conversion", group: "Sponsored Ads", label: "Conversion ads", objective: "conversion", channel: "social", content: "Drive orders from warm audiences." },
  { key: "ads_retargeting", group: "Sponsored Ads", label: "Retargeting ads", objective: "conversion", channel: "social", content: "Re-engage people who interacted but did not buy." },
  { key: "growth_acquisition", group: "Customer Growth", label: "New customer acquisition", objective: "lead_generation", channel: "whatsapp", content: "Offer designed to convert first-time customers." },
  { key: "growth_retention", group: "Customer Growth", label: "Customer retention", objective: "retention", channel: "sms", content: "Keep active customers buying — value reminders and care." },
  { key: "growth_repeat", group: "Customer Growth", label: "Repeat purchase", objective: "retention", channel: "sms", content: "Trigger the next order from customers who bought once." },
  { key: "growth_referral", group: "Customer Growth", label: "Referral", objective: "referral", channel: "whatsapp", content: "Ask happy customers to bring one more customer." },
  { key: "growth_reactivation", group: "Customer Growth", label: "Reactivation", objective: "reactivation", channel: "sms", content: "Win back customers who went inactive." },
];

export type CampaignIntel = {
  campaignId: string;
  objective: CampaignObjective;
  template?: CampaignTemplateKey;
  audience?: string;
  segment?: string;
  content?: string;
  expectedCustomers?: number;
  impressions: number;
  reach: number;
  engagement: number;
  clicks: number;
  leads: number;
  customersAcquired: number;
  revenue: number;
  extraCost: number;
};

export type SharePlanItem = {
  id: string;
  campaignId: string;
  content: string;
  channel: string;
  audience: string;
  publishDate: string;
  publishTime: string;
  owner: string;
  status: "planned" | "scheduled" | "published" | "cancelled";
};

type State = {
  audiences: MarketAudience[];
  campaigns: CampaignIntel[];
  sharePlan: SharePlanItem[];
};

const EMPTY: State = { audiences: [], campaigns: [], sharePlan: [] };

export const emptyCampaignIntel = (campaignId: string): CampaignIntel => ({
  campaignId,
  objective: "awareness",
  impressions: 0,
  reach: 0,
  engagement: 0,
  clicks: 0,
  leads: 0,
  customersAcquired: 0,
  revenue: 0,
  extraCost: 0,
});

type Ctx = {
  audiences: MarketAudience[];
  campaignIntel: (campaignId: string) => CampaignIntel;
  allCampaignIntel: CampaignIntel[];
  sharePlan: SharePlanItem[];
  saveAudience: (row: Omit<MarketAudience, "id"> & { id?: string }) => void;
  removeAudience: (id: string) => void;
  saveCampaignIntel: (row: CampaignIntel) => void;
  saveSharePlanItem: (row: Omit<SharePlanItem, "id"> & { id?: string }) => void;
  removeSharePlanItem: (id: string) => void;
  market: { available: number; reach: number };
};

const CrmIntelContext = createContext<Ctx | null>(null);

const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `id-${Date.now()}-${Math.random()}`;

export function CrmIntelProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(EMPTY);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...EMPTY, ...JSON.parse(raw) });
    } catch {
      /* ignore corrupt local state */
    }
  }, []);

  const persist = useCallback((next: State) => {
    setState(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage full / unavailable */
    }
  }, []);

  const value = useMemo<Ctx>(() => {
    return {
      audiences: state.audiences,
      allCampaignIntel: state.campaigns,
      sharePlan: state.sharePlan,
      campaignIntel: (campaignId) =>
        state.campaigns.find((c) => c.campaignId === campaignId) ?? emptyCampaignIntel(campaignId),
      saveAudience: (row) => {
        const id = row.id ?? uid();
        const next = row.id
          ? state.audiences.map((a) => (a.id === row.id ? ({ ...a, ...row, id } as MarketAudience) : a))
          : [...state.audiences, { ...row, id } as MarketAudience];
        persist({ ...state, audiences: next });
      },
      removeAudience: (id) => persist({ ...state, audiences: state.audiences.filter((a) => a.id !== id) }),
      saveCampaignIntel: (row) => {
        const exists = state.campaigns.some((c) => c.campaignId === row.campaignId);
        persist({
          ...state,
          campaigns: exists
            ? state.campaigns.map((c) => (c.campaignId === row.campaignId ? row : c))
            : [...state.campaigns, row],
        });
      },
      saveSharePlanItem: (row) => {
        const id = row.id ?? uid();
        const next = row.id
          ? state.sharePlan.map((s) => (s.id === row.id ? ({ ...s, ...row, id } as SharePlanItem) : s))
          : [...state.sharePlan, { ...row, id } as SharePlanItem];
        persist({ ...state, sharePlan: next });
      },
      removeSharePlanItem: (id) => persist({ ...state, sharePlan: state.sharePlan.filter((s) => s.id !== id) }),
      market: {
        available: state.audiences.reduce((a, x) => a + Number(x.available || 0), 0),
        reach: state.audiences.reduce((a, x) => a + Number(x.reach || 0), 0),
      },
    };
  }, [state, persist]);

  return <CrmIntelContext.Provider value={value}>{children}</CrmIntelContext.Provider>;
}

export function useCrmIntel() {
  const ctx = useContext(CrmIntelContext);
  if (!ctx) throw new Error("useCrmIntel must be used inside CrmIntelProvider");
  return ctx;
}

/* ------------------------------- derivations ------------------------------- */

export type MarketPosition = {
  available: number;
  reach: number;
  served: number;
  unservedReach: number;
  unservedAvailable: number;
  penetration: number;
  reachCoverage: number;
  reachConversion: number;
};

export function marketPosition(available: number, reach: number, served: number): MarketPosition {
  return {
    available,
    reach,
    served,
    unservedReach: Math.max(reach - served, 0),
    unservedAvailable: Math.max(available - served, 0),
    penetration: available > 0 ? (served / available) * 100 : 0,
    reachCoverage: available > 0 ? (reach / available) * 100 : 0,
    reachConversion: reach > 0 ? (served / reach) * 100 : 0,
  };
}

export type CampaignEconomics = {
  cost: number;
  leads: number;
  acquired: number;
  revenue: number;
  cpl: number;
  cac: number;
  conversion: number;
  roi: number;
  roas: number;
  engagementRate: number;
  ctr: number;
};

export function campaignEconomics(budget: number, intel: CampaignIntel): CampaignEconomics {
  const cost = Number(budget || 0) + Number(intel.extraCost || 0);
  const leads = Number(intel.leads || 0);
  const acquired = Number(intel.customersAcquired || 0);
  const revenue = Number(intel.revenue || 0);
  return {
    cost,
    leads,
    acquired,
    revenue,
    cpl: leads > 0 ? cost / leads : 0,
    cac: acquired > 0 ? cost / acquired : 0,
    conversion: leads > 0 ? (acquired / leads) * 100 : 0,
    roi: cost > 0 ? ((revenue - cost) / cost) * 100 : 0,
    roas: cost > 0 ? revenue / cost : 0,
    engagementRate: intel.reach > 0 ? (intel.engagement / intel.reach) * 100 : 0,
    ctr: intel.impressions > 0 ? (intel.clicks / intel.impressions) * 100 : 0,
  };
}

export type OpportunityLevel = "High" | "Medium" | "Low" | "Not enough data";

/**
 * Investment signal: combines remaining market, conversion quality and unit
 * economics (customer value vs acquisition cost).
 */
export function opportunityLevel(input: {
  unservedReach: number;
  conversion: number;
  cac: number;
  customerValue: number;
}): { level: OpportunityLevel; reason: string } {
  const { unservedReach, conversion, cac, customerValue } = input;
  if (unservedReach <= 0) return { level: "Low", reason: "No unserved reachable market left — expand reach or audience first." };
  if (cac <= 0 || customerValue <= 0) {
    return { level: "Not enough data", reason: "Record campaign cost, acquisitions and revenue to score this opportunity." };
  }
  const ratio = customerValue / cac;
  if (ratio >= 3 && conversion >= 15) {
    return { level: "High", reason: "Large unserved reach, strong conversion and customer value well above acquisition cost." };
  }
  if (ratio >= 1.5) {
    return { level: "Medium", reason: "Market potential is there but conversion or unit economics are only moderate." };
  }
  return { level: "Low", reason: "Acquisition cost is close to or above customer value — fix economics before investing more." };
}

export const OBJECTIVES: { value: CampaignObjective; label: string }[] = [
  { value: "awareness", label: "Awareness" },
  { value: "lead_generation", label: "Lead generation" },
  { value: "conversion", label: "Conversion" },
  { value: "retention", label: "Retention" },
  { value: "reactivation", label: "Reactivation" },
  { value: "referral", label: "Referral" },
];
