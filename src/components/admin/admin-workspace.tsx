import { useEffect, useState, type ReactNode } from "react";
import { Activity, Key, Lock, Settings, Shield, Users } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RecordDialog, str, type FieldValue } from "@/components/tax/record-dialog";
import { dateTimeFmt } from "@/lib/format";
import {
  DetailsDrawer,
  StatusBadge,
  SummaryStrip,
  TaxTable,
  TaxWorkspace,
} from "@/components/tax/tax-workspace";

const client = supabase as any;
const ROLE_OPTIONS = ["admin", "manager", "cashier", "staff"] as const;

export type Section = "users" | "roles" | "permissions" | "settings" | "activity" | "security";
const sectionMeta: Record<Section, { title: string; subtitle: string; icon: typeof Users }> = {
  users: { title: "Users", subtitle: "Review users and their effective access", icon: Users },
  roles: {
    title: "Roles",
    subtitle: "Configure responsibilities through assigned permissions",
    icon: Shield,
  },
  permissions: {
    title: "Permissions",
    subtitle: "Manage the capabilities available to this business",
    icon: Key,
  },
  settings: {
    title: "Settings",
    subtitle: "Configure supported business behavior",
    icon: Settings,
  },
  activity: {
    title: "Activity Logs",
    subtitle: "Trace administrative and security changes",
    icon: Activity,
  },
  security: {
    title: "Security",
    subtitle: "Review authorization controls and account protection",
    icon: Lock,
  },
};

function AdminShell({ section, children }: { section: Section; children: ReactNode }) {
  const meta = sectionMeta[section];
  return (
    <TaxWorkspace
      title={meta.title}
      subtitle={meta.subtitle}
      icon={meta.icon}
      backTo="/m/admin"
      backLabel="Back to Administration"
    >
      {children}
    </TaxWorkspace>
  );
}

export function AdminPage({ section }: { section: Section }) {
  if (section === "users") return <UsersPage />;
  if (section === "roles") return <RolesPage />;
  if (section === "permissions") return <PermissionsPage />;
  if (section === "settings") return <SettingsPage />;
  if (section === "activity") return <ActivityPage />;
  return <SecurityPage />;
}

function UsersPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [selected, setSelected] = useState<any | null>(null);
  const [effectiveAccess, setEffectiveAccess] = useState<string[]>([]);
  const refresh = async () => {
    const [{ data: profiles }, { data: userRoles }] = await Promise.all([
      client.from("profiles").select("id,full_name,email,status,last_seen_at,created_at"),
      client.from("user_roles").select("user_id,role"),
    ]);
    setRows(
      (profiles ?? []).map((profile: any) => ({
        ...profile,
        roles:
          (userRoles ?? [])
            .filter((row: any) => row.user_id === profile.id)
            .map((row: any) => row.role)
            .join(", ") || "staff",
      })),
    );
    setRoles(userRoles ?? []);
  };
  useEffect(() => {
    void refresh();
  }, []);
  useEffect(() => {
    if (!selected) return;
    void (async () => {
      const [{ data: assignments }, { data: overrides }] = await Promise.all([
        client.from("user_roles").select("role").eq("user_id", selected.id),
        client
          .from("user_permission_overrides")
          .select("permission_key,effect")
          .eq("user_id", selected.id),
      ]);
      const roleNames = (assignments ?? []).map((row: any) => row.role);
      const { data: rolePermissions } = roleNames.length
        ? await client.from("role_permissions").select("permission_key").in("role", roleNames)
        : { data: [] };
      const denied = new Set(
        (overrides ?? [])
          .filter((row: any) => row.effect === "deny")
          .map((row: any) => row.permission_key),
      );
      const granted = new Set([
        ...(rolePermissions ?? []).map((row: any) => row.permission_key),
        ...(overrides ?? [])
          .filter((row: any) => row.effect === "allow")
          .map((row: any) => row.permission_key),
      ]);
      setEffectiveAccess([...granted].filter((permission) => !denied.has(permission)).sort());
    })();
  }, [selected]);
  const save = async (value: Record<string, FieldValue>) => {
    const role = str(value.role) as "admin" | "manager" | "cashier" | "staff";
    const { error } = await client
      .from("user_roles")
      .upsert({ user_id: editing.id, role }, { onConflict: "user_id,role" });
    if (error) toast.error(error.message);
    else {
      toast.success("User access updated");
      setEditing(null);
      await refresh();
    }
  };
  const toggleStatus = async (row: any) => {
    const next = row.status === "active" ? "inactive" : "active";
    const { error } = await client.from("profiles").update({ status: next }).eq("id", row.id);
    if (error) toast.error(error.message);
    else {
      toast.success(next === "active" ? "User activated" : "User deactivated");
      await refresh();
    }
  };
  const activeCount = rows.filter((row) => row.status === "active").length;
  return (
    <AdminShell section="users">
      <SummaryStrip
        items={[
          { label: "Users", value: String(rows.length), accent: true },
          { label: "Active", value: String(activeCount) },
          { label: "Role assignments", value: String(roles.length) },
        ]}
      />
      <TaxTable
        rows={rows}
        searchKeys={(row) => `${row.full_name} ${row.email} ${row.status}`}
        filter={{
          label: "Status",
          options: [
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ],
          match: (row, value) => (row.status || "active") === value,
        }}
        columns={[
          {
            key: "full_name",
            label: "Name",
            render: (row) => (
              <span className="font-medium text-white">{row.full_name || "Unnamed user"}</span>
            ),
          },
          {
            key: "email",
            label: "Email",
            render: (row) => <span className="text-white/70">{row.email || "—"}</span>,
          },
          { key: "roles", label: "Role", render: (row) => <StatusBadge value={row.roles} /> },
          {
            key: "status",
            label: "Status",
            render: (row) => <StatusBadge value={row.status || "active"} />,
          },
          {
            key: "last_seen_at",
            label: "Last seen",
            hideOnMobile: true,
            render: (row) => (row.last_seen_at ? dateTimeFmt.format(new Date(row.last_seen_at)) : "Never"),
          },
        ]}
        onEdit={setEditing}
        onRowClick={setSelected}
        rowActions={(row) => [
          { label: "Assign role", onSelect: () => setEditing(row) },
          {
            label: row.status === "active" ? "Deactivate user" : "Activate user",
            onSelect: () => void toggleStatus(row),
            danger: row.status === "active",
          },
        ]}
        addLabel="Assign access"
        empty={{
          title: "No users found",
          description: "Users appear here after they create an account.",
          icon: Users,
        }}
      />

      <DetailsDrawer
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected?.full_name || selected?.email || "User details"}
        description="User profile and effective access from assigned roles and overrides."
        icon={Users}
        rows={[
          { label: "Email", value: selected?.email || "Not provided" },
          {
            label: "Created",
            value: selected?.created_at
              ? new Date(selected.created_at).toLocaleString()
              : "Not available",
          },
          { label: "Role", value: selected?.roles || "staff" },
          {
            label: "Effective permissions",
            value: effectiveAccess.length ? effectiveAccess.join(", ") : "None assigned",
          },
        ]}
      />
      <RecordDialog
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
        title="Assign role"
        description={`Update access for ${editing?.full_name || editing?.email || "this user"}.`}
        icon={Shield}
        submitLabel="Save access"
        initialValue={{ role: editing ? editing.roles.split(", ")[0] || "staff" : "staff" }}
        fields={[
          {
            name: "role",
            label: "Role",
            type: "select",
            options: ["admin", "manager", "cashier", "staff"],
            required: true,
          },
        ]}
        onSubmit={(value) => void save(value)}
      />
    </AdminShell>
  );
}

function RolesPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [permissionOptions, setPermissionOptions] = useState<string[]>([]);
  const refresh = async () => {
    const [{ data }, { data: catalog }, { data: assignments }] = await Promise.all([
      client.from("role_permissions").select("role,permission_key,scope").order("role"),
      client
        .from("permission_catalog")
        .select("permission_key")
        .eq("active", true)
        .order("permission_key"),
      client.from("user_roles").select("user_id,role"),
    ]);
    setPermissionOptions((catalog ?? []).map((row: any) => row.permission_key));
    const base: Record<string, any> = {};
    for (const role of ROLE_OPTIONS) base[role] = { id: role, role, permissions: [], users: 0 };
    for (const row of data ?? []) {
      base[row.role] ??= { id: row.role, role: row.role, permissions: [], users: 0 };
      base[row.role].permissions.push(row.permission_key);
    }
    for (const row of assignments ?? []) {
      base[row.role] ??= { id: row.role, role: row.role, permissions: [], users: 0 };
      base[row.role].users += 1;
    }
    setRows(Object.values(base));
  };
  useEffect(() => {
    void refresh();
  }, []);
  const save = async (value: Record<string, FieldValue>) => {
    const role = str(value.role);
    const permissionKey = str(value.permission);
    const { error } = await client
      .from("role_permissions")
      .upsert(
        { role, permission_key: permissionKey, scope: "ALL" },
        { onConflict: "role,permission_key" },
      );
    if (error) toast.error(error.message);
    else {
      toast.success("Role permission saved");
      setEditing(null);
      await refresh();
    }
  };
  return (
    <AdminShell section="roles">
      <SummaryStrip
        items={[
          { label: "Roles", value: String(rows.length), accent: true },
          {
            label: "Configured roles",
            value: String(rows.filter((row) => row.permissions.length > 0).length),
          },
          {
            label: "Assigned users",
            value: String(rows.reduce((total, row) => total + row.users, 0)),
          },
        ]}
      />
      <TaxTable
        rows={rows}
        searchKeys={(row) => `${row.role} ${row.permissions.join(" ")}`}
        columns={[
          {
            key: "role",
            label: "Role",
            render: (row) => <span className="font-medium capitalize text-white">{row.role}</span>,
          },
          {
            key: "users",
            label: "Users",
            render: (row) => <span className="text-white/70">{row.users}</span>,
          },
          {
            key: "permission_count",
            label: "Permissions",
            render: (row) => <span className="text-white/70">{row.permissions.length}</span>,
          },
          {
            key: "status",
            label: "Status",
            render: (row) => (
              <StatusBadge value={row.permissions.length ? "Configured" : "Unconfigured"} />
            ),
          },
          {
            key: "permissions",
            label: "Assigned permissions",
            hideOnMobile: true,
            render: (row) => (
              <span className="text-white/70">
                {row.permissions.length ? row.permissions.join(", ") : "No permissions assigned"}
              </span>
            ),
          },
        ]}
        onEdit={(row) => setEditing({ role: row.role })}
        addLabel="Assign permission"
        onAdd={() => setEditing({ role: "staff" })}
        empty={{
          title: "No role permissions yet",
          description: "Assign explicit permissions to roles to follow least privilege.",
          icon: Shield,
        }}
      />
      <RecordDialog
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
        title="Assign permission"
        description="A role only receives the capabilities explicitly assigned here."
        icon={Key}
        submitLabel="Save permission"
        initialValue={{ role: editing?.role || "staff" }}
        fields={[
          {
            name: "role",
            label: "Role",
            type: "select",
            options: ["admin", "manager", "cashier", "staff"],
            required: true,
          },
          {
            name: "permission",
            label: "Permission",
            type: "select",
            options: permissionOptions,
            required: true,
          },
        ]}
        onSubmit={(value) => void save(value)}
      />
    </AdminShell>
  );
}

function PermissionsPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [assignedRoles, setAssignedRoles] = useState<string[]>([]);
  useEffect(() => {
    void client
      .from("permission_catalog")
      .select("permission_key,module,action,description,active")
      .order("module")
      .then(({ data }: any) => setRows(data ?? []));
  }, []);
  useEffect(() => {
    if (!selected) return;
    void client
      .from("role_permissions")
      .select("role")
      .eq("permission_key", selected.permission_key)
      .then(({ data }: any) => setAssignedRoles((data ?? []).map((row: any) => row.role)));
  }, [selected]);
  return (
    <AdminShell section="permissions">
      <TaxTable
        rows={rows}
        searchKeys={(row) => `${row.permission_key} ${row.module} ${row.action}`}
        columns={[
          {
            key: "permission_key",
            label: "Permission",
            render: (row) => <span className="font-medium text-white">{row.permission_key}</span>,
          },
          { key: "module", label: "Module" },
          { key: "action", label: "Action" },
          { key: "description", label: "Description", hideOnMobile: true },
          {
            key: "active",
            label: "Status",
            render: (row) => <StatusBadge value={row.active ? "Active" : "Inactive"} />,
          },
        ]}
        onRowClick={setSelected}
        empty={{
          title: "No permissions configured",
          description:
            "Permission definitions are seeded by the platform and assigned through roles.",
          icon: Key,
        }}
      />
      <DetailsDrawer
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected?.permission_key || "Permission details"}
        description="Permission definition and current role assignments from the authorization catalog."
        icon={Key}
        rows={[
          { label: "Module", value: selected?.module || "Not available" },
          { label: "Action", value: selected?.action || "Not available" },
          { label: "Description", value: selected?.description || "No description" },
          {
            label: "Assigned roles",
            value: assignedRoles.length ? assignedRoles.join(", ") : "No roles assigned",
          },
        ]}
      />
    </AdminShell>
  );
}

function SettingsPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const refresh = async () => {
    const { data } = await client
      .from("business_settings")
      .select("setting_key,setting_value,description,updated_at")
      .order("setting_key");
    setRows(data ?? []);
  };
  useEffect(() => {
    void refresh();
  }, []);
  const save = async (value: Record<string, FieldValue>) => {
    const { error } = await client.from("business_settings").upsert({
      setting_key: str(value.key),
      setting_value: str(value.value),
      description: str(value.description) || null,
    });
    if (error) toast.error(error.message);
    else {
      toast.success("Setting saved");
      setEditing(null);
      await refresh();
    }
  };
  return (
    <AdminShell section="settings">
      <TaxTable
        rows={rows}
        searchKeys={(row) => `${row.setting_key} ${row.description || ""}`}
        columns={[
          {
            key: "setting_key",
            label: "Setting",
            render: (row) => <span className="font-medium text-white">{row.setting_key}</span>,
          },
          { key: "setting_value", label: "Value" },
          { key: "description", label: "Description", hideOnMobile: true },
          {
            key: "updated_at",
            label: "Updated",
            render: (row) => new Date(row.updated_at).toLocaleDateString(),
          },
        ]}
        onEdit={setEditing}
        onAdd={() => setEditing({})}
        addLabel="Add setting"
        empty={{
          title: "No business settings",
          description: "Add supported configuration values for this business.",
          icon: Settings,
        }}
      />
      <RecordDialog
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
        title={editing?.setting_key ? "Edit setting" : "Add setting"}
        description="Settings are persisted and can be consumed by business logic."
        icon={Settings}
        submitLabel="Save setting"
        initialValue={
          editing
            ? {
                key: editing.setting_key || "",
                value: editing.setting_value || "",
                description: editing.description || "",
              }
            : null
        }
        fields={[
          { name: "key", label: "Setting key", type: "text", required: true },
          { name: "value", label: "Value", type: "text", required: true },
          { name: "description", label: "Description", type: "text" },
        ]}
        onSubmit={(value) => void save(value)}
      />
    </AdminShell>
  );
}

function ActivityPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  useEffect(() => {
    void client
      .from("admin_audit_logs")
      .select("id,actor_id,action,resource_type,resource_id,previous_value,new_value,created_at")
      .order("created_at", { ascending: false })
      .limit(200)
      .then(({ data }: any) => setRows(data ?? []));
  }, []);
  return (
    <AdminShell section="activity">
      <TaxTable
        rows={rows}
        searchKeys={(row) => `${row.action} ${row.resource_type} ${row.resource_id || ""}`}
        columns={[
          {
            key: "action",
            label: "Action",
            render: (row) => <span className="font-medium text-white">{row.action}</span>,
          },
          { key: "resource_type", label: "Resource" },
          { key: "previous_value", label: "Previous", render: (row) => row.previous_value || "—" },
          { key: "new_value", label: "New", render: (row) => row.new_value || "—" },
          {
            key: "created_at",
            label: "Timestamp",
            render: (row) => new Date(row.created_at).toLocaleString(),
          },
        ]}
        onRowClick={setSelected}
        empty={{
          title: "No activity recorded",
          description: "Administrative changes will appear here as they occur.",
          icon: Activity,
        }}
      />
      <DetailsDrawer
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected?.action || "Activity details"}
        description="Append-only administrative audit record."
        icon={Activity}
        rows={[
          { label: "Actor", value: selected?.actor_id || "Not available" },
          { label: "Resource", value: selected?.resource_type || "Not available" },
          { label: "Resource ID", value: selected?.resource_id || "Not available" },
          {
            label: "Timestamp",
            value: selected?.created_at
              ? new Date(selected.created_at).toLocaleString()
              : "Not available",
          },
          { label: "Previous value", value: selected?.previous_value || "—" },
          { label: "New value", value: selected?.new_value || "—" },
        ]}
      />
    </AdminShell>
  );
}

function SecurityPage() {
  return (
    <AdminShell section="security">
      <SummaryStrip
        items={[
          { label: "Authorization", value: "RLS enforced", accent: true },
          { label: "Audit trail", value: "Append-only" },
          { label: "Access model", value: "Role permissions" },
        ]}
      />
      <div className="rounded-2xl border border-white/15 bg-black/20 p-5 text-sm text-white/70">
        <p className="font-medium text-white">Security controls</p>
        <p className="mt-2">
          Administrative writes are restricted by the database authorization policies. Users receive
          only explicitly assigned role permissions, and changes are recorded in the Activity Logs
          module.
        </p>
      </div>
    </AdminShell>
  );
}
