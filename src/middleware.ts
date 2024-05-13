import { clerkMiddleware, createRouteMatcher } from "astro-clerk-auth/server";

const isPublicPage = createRouteMatcher(['/sign-in','/sign-up'])

export const onRequest = clerkMiddleware((auth, context, next) => {
  if (!isPublicPage(context.request) && !auth().userId) {
    return auth().redirectToSignIn();
  }

  return next();
});
