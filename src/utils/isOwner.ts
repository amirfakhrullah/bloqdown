export const isOwner = ({
  contentToken,
  token,
  contentEmail,
  email,
}: {
  contentToken: string;
  token: string;
  contentEmail?: string | null | undefined;
  email?: string | null | undefined;
}): boolean => {
  return (
    (contentEmail && contentEmail === email) ||
    (!contentEmail && contentToken === token)
  );
};
