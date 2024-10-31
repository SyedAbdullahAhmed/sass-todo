import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { json } from "stream/consumers";
import { cookies } from "next/headers";


const isPublicRoute = createRouteMatcher(["/dashboard", "/admin/dashboard", "/subscribe"]);
const isProtectedRoute = createRouteMatcher(["/", "/api/webhook/register", "/sign-in", "/sign-up"]);

/**
 * @deprecated Use `newFunction()` instead.
 */

// export default authMiddleware({
//   publicRoutes,
//   async afterAuth(auth:any, req:any) {
//     // Use 'auth' for authentication details and 'req' for NextRequest
//     // Handle unauthenticated users trying to access protected routes
//     if (!auth.userId && !publicRoutes.includes(req.nextUrl.pathname)) {
//       return NextResponse.redirect(new URL("/sign-in", req.url));
//     }

//     if (auth.userId) {
//       try {
//         const user = await clerkClient.users.getUser(auth.userId); // Fetch user data from Clerk
//         const role = user.publicMetadata.role as string | undefined;

//         // Admin role redirection logic
//         if (role === "admin" && req.nextUrl.pathname === "/dashboard") {
//           return NextResponse.redirect(new URL("/admin/dashboard", req.url));
//         }

//         // Prevent non-admin users from accessing admin routes
//         if (role !== "admin" && req.nextUrl.pathname.startsWith("/admin")) {
//           return NextResponse.redirect(new URL("/dashboard", req.url));
//         }

//         // Redirect authenticated users trying to access public routes
//         if (publicRoutes.includes(req.nextUrl.pathname)) {
//           return NextResponse.redirect(
//             new URL(
//               role === "admin" ? "/admin/dashboard" : "/dashboard",
//               req.url
//             )
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching user data from Clerk:", error);
//         return NextResponse.redirect(new URL("/error", req.url));
//       }
//     }
//   },
// });


export default clerkMiddleware(async (auth, req) => {
  const cookieStore = await cookies();
  const { userId } = await auth() as any;

  console.log("hello from middleware")
  console.log("userId", userId)
  const allCookies = cookieStore.get("userRole");

  console.log(allCookies)

  // if (!userId && !isPublicRoute.includes(req.nextUrl.pathname)) {
  //   return NextResponse.redirect(new URL("/sign-in", req.url));
  // }

  // if (userId) {
  //   try {
  //     const user = await clerkClient.users.getUser(auth.userId); // Fetch user data from Clerk
  //     const role = user.publicMetadata.role as string | undefined;

  //     // Admin role redirection logic
  //     if (role === "admin" && req.nextUrl.pathname === "/dashboard") {
  //       return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  //     }

  //     // Prevent non-admin users from accessing admin routes
  //     if (role !== "admin" && req.nextUrl.pathname.startsWith("/admin")) {
  //       return NextResponse.redirect(new URL("/dashboard", req.url));
  //     }

  //     // Redirect authenticated users trying to access public routes
  //     if (publicRoutes.includes(req.nextUrl.pathname)) {
  //       return NextResponse.redirect(
  //         new URL(
  //           role === "admin" ? "/admin/dashboard" : "/dashboard",
  //           req.url
  //         )
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user data from Clerk:", error);
  //     return NextResponse.redirect(new URL("/error", req.url));
  //   }

  // if (!userId && isProtectedRoute(req)) {
  //   // Add custom logic to run before redirecting

  //   return auth().redirectToSignIn()
  // }
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// import { clerkMiddleware } from '@clerk/nextjs/server'

// export default clerkMiddleware()

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// }