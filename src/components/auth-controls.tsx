import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export function AuthControls() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) return null;

  return (
    <div className="flex items-center gap-2">
      <Show when="signed-out">
        <SignInButton mode="modal">
          <button className="cursor-pointer rounded-lg px-3 py-2 text-xs font-semibold text-on-dark-muted transition-colors hover:bg-hero-glass-hover hover:text-on-dark">
            Sign in
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="cursor-pointer rounded-lg bg-amber-accent px-3 py-2 text-xs font-semibold text-on-dark transition-colors hover:bg-amber-hover">
            Sign up
          </button>
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>
    </div>
  );
}