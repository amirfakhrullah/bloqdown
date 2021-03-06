import { NextApiRequest } from "next";
import { Session } from "next-auth";

/**
 * function for checking if the post is liked by the user through anonymous token and email (if the user is logged in)
 */
export const findIsUserLiked = ({
  likes,
  ctx,
}: {
  likes: {
    userToken: string;
    userEmail: string | null;
  }[];
  ctx: {
    token: string | undefined;
    req: NextApiRequest | undefined;
    session: Session | null;
  };
}) => {
  if (likes.length === 0) return false;

  const likesBasedOnSession = likes.map((like) => like.userEmail);
  const likesBasedOnToken = likes.map((like) => like.userToken);

  if (ctx.session && ctx.session.user) {
    if (likesBasedOnSession.includes(ctx.session.user.email!)) {
      return true;
    }
  }

  if (likesBasedOnToken.includes(ctx.token!)) {
    return true;
  }

  return false;
};
