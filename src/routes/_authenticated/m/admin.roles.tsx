import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/m/admin/roles")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authenticated/m/admin/roles"!</div>;
}
