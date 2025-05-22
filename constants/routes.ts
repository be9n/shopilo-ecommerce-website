// Routes that don't require authentication
export const publicRoutes = ["/login", "/register", "/forgot-password"];

// Routes that require authentication
export const protectedRoutes = ["/account", "/orders", "/checkout"];
