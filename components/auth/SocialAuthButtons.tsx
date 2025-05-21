import GoogleLoginButton from "./GoogleLoginButton";

export default function SocialAuthButtons({
  setIsSocialLoading,
  setError,
}: {
  setIsSocialLoading: (isSocialLoading: boolean) => void;
  setError: (error: string | null) => void;
}) {
  return (
    <div className="flex flex-col gap-4 w-full mt-4">
      <GoogleLoginButton setIsSocialLoading={setIsSocialLoading} setError={setError} />
    </div>
  );
}
