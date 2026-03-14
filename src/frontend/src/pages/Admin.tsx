import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useActor } from "@/hooks/useActor";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Download, LogOut, Mail, ShieldCheck, Users } from "lucide-react";

function useAdminData() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["admin", "emails"],
    queryFn: async () => {
      if (!actor) return { isAdmin: false, emails: [], hasAdmin: false };
      const [isAdmin, emails, hasAdmin] = await Promise.all([
        actor.isCallerAdmin(),
        actor.isCallerAdmin().then((a) => (a ? actor.getEmails() : [])),
        actor.hasAdmin(),
      ]);
      return { isAdmin, emails: isAdmin ? emails : [], hasAdmin };
    },
    enabled: !!actor && !isFetching,
  });
}

function exportCSV(emails: string[]) {
  const header = "#,Email Address";
  const rows = emails.map((e, i) => `${i + 1},${e}`);
  const csv = [header, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "subscribers.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function Admin() {
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();
  const { isFetching: actorFetching, actor } = useActor();
  const { data, isLoading } = useAdminData();
  const queryClient = useQueryClient();

  const claimAdmin = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const success = await actor.claimFirstAdmin();
      if (!success)
        throw new Error("Could not claim admin — an admin already exists.");
      return success;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "emails"] });
    },
  });

  const isAuthenticated = !!identity;
  const loading = isLoading || actorFetching;

  // Not logged in
  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
        <div className="max-w-sm w-full text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent mb-6">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <h1 className="font-display font-bold text-3xl text-foreground mb-3">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
            Sign in with your Internet Identity to access subscriber data.
          </p>
          <Button
            onClick={login}
            disabled={isLoggingIn}
            data-ocid="admin.primary_button"
            className="w-full font-semibold"
          >
            {isLoggingIn ? "Signing in…" : "Sign in"}
          </Button>
        </div>
      </div>
    );
  }

  // Loading
  if (loading) {
    return (
      <div
        className="min-h-[calc(100vh-4rem)] flex items-center justify-center"
        data-ocid="admin.loading_state"
      >
        <div className="text-center">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">Loading…</p>
        </div>
      </div>
    );
  }

  // First-run: no admin assigned yet
  if (!data?.hasAdmin) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
        <div className="max-w-sm w-full text-center" data-ocid="admin.panel">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent mb-6">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <h1 className="font-display font-bold text-3xl text-foreground mb-3">
            First-Time Setup
          </h1>
          <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
            No admin has been assigned yet. Click below to make your current
            account the admin. This button disappears once an admin is set.
          </p>
          {claimAdmin.isError && (
            <p
              className="text-destructive text-sm mb-4"
              data-ocid="admin.error_state"
            >
              {(claimAdmin.error as Error).message}
            </p>
          )}
          {claimAdmin.isSuccess ? (
            <p
              className="text-sm text-green-600 font-medium mb-4"
              data-ocid="admin.success_state"
            >
              You are now the admin. Reloading…
            </p>
          ) : (
            <Button
              onClick={() => claimAdmin.mutate()}
              disabled={claimAdmin.isPending}
              data-ocid="admin.primary_button"
              className="w-full font-semibold"
            >
              {claimAdmin.isPending ? "Setting up…" : "Make me the admin"}
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clear}
            data-ocid="admin.secondary_button"
            className="mt-4 text-muted-foreground"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </Button>
        </div>
      </div>
    );
  }

  // Not admin
  if (!data?.isAdmin) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
        <div
          className="max-w-sm w-full text-center"
          data-ocid="admin.error_state"
        >
          <h1 className="font-display font-bold text-3xl text-foreground mb-3">
            Access Denied
          </h1>
          <p className="text-muted-foreground mb-8 text-sm">
            Your account doesn't have admin privileges.
          </p>
          <Button
            variant="outline"
            onClick={clear}
            data-ocid="admin.secondary_button"
            className="font-semibold"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </Button>
        </div>
      </div>
    );
  }

  const emails = data.emails;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="flex items-start justify-between mb-12">
        <div>
          <p className="font-body text-xs font-semibold text-primary uppercase tracking-widest mb-2">
            Admin
          </p>
          <h1 className="font-display font-extrabold text-4xl text-foreground">
            Subscribers
          </h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clear}
          data-ocid="admin.secondary_button"
          className="text-muted-foreground hover:text-foreground"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign out
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <Users className="w-4 h-4" />
            Total Subscribers
          </div>
          <p className="font-display font-extrabold text-5xl text-foreground">
            {emails.length}
          </p>
        </div>
        <div className="border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <Mail className="w-4 h-4" />
            Guide Downloads
          </div>
          <p className="font-display font-extrabold text-5xl text-foreground">
            {emails.length}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          {emails.length} {emails.length === 1 ? "subscriber" : "subscribers"}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => exportCSV(emails)}
          disabled={emails.length === 0}
          data-ocid="admin.primary_button"
          className="font-semibold"
        >
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Table */}
      {emails.length === 0 ? (
        <div
          className="border border-border rounded-lg py-20 text-center"
          data-ocid="admin.empty_state"
        >
          <Mail className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">No subscribers yet.</p>
        </div>
      ) : (
        <div
          className="border border-border rounded-lg overflow-hidden"
          data-ocid="admin.table"
        >
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="w-16 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  #
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Email Address
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emails.map((email, index) => (
                <TableRow
                  key={email}
                  data-ocid={`admin.item.${index + 1}`}
                  className="hover:bg-muted/20 transition-colors"
                >
                  <TableCell className="text-muted-foreground text-sm font-mono">
                    {index + 1}
                  </TableCell>
                  <TableCell className="text-foreground text-sm font-medium">
                    {email}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
