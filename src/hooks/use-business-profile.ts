import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/** Business identity used on printed sales documents. */
export function useBusinessProfile() {
  const [profile, setProfile] = useState({ name: "Bizz", address: "", phone: "", email: "" });

  useEffect(() => {
    void (async () => {
      const { data } = await supabase.from("profiles").select("business_name, full_name").limit(1).maybeSingle();
      const name = (data as any)?.business_name || (data as any)?.full_name || "Bizz";
      setProfile((prev) => ({ ...prev, name }));
    })();
  }, []);

  return profile;
}
