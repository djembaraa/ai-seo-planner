import { auth } from "@clerk/nextjs/server";
import { hasClerkConfiguration } from "@/lib/env";

export type TenantIdentity = {
  userId: string;
  orgId?: string | null;
};

export type TenantAuthResult =
  | { status: "authorized"; identity: TenantIdentity }
  | { status: "not-configured" }
  | { status: "unauthenticated" };

export async function getTenantIdentity(): Promise<TenantAuthResult> {
  if (!hasClerkConfiguration()) return { status: "not-configured" };

  const session = await auth();
  if (!session.userId) return { status: "unauthenticated" };

  return {
    status: "authorized",
    identity: { userId: session.userId, orgId: session.orgId },
  };
}