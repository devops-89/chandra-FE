/**
 * Store the current path for redirect after login
 */
export function storeRedirectPath(path?: string): void {
  const redirectPath = path || window.location.pathname;
  sessionStorage.setItem('redirectAfterLogin', redirectPath);
}

/**
 * Get and clear the stored redirect path
 */
export function getAndClearRedirectPath(): string | null {
  const redirectPath = sessionStorage.getItem('redirectAfterLogin');
  if (redirectPath) {
    sessionStorage.removeItem('redirectAfterLogin');
    return redirectPath;
  }
  return null;
}

export function getDashboardPathForRole(role?: string | null): string {
  const normalizedRole = role?.toUpperCase();

  if (normalizedRole === 'ADMIN') {
    return '/dashboard/admin';
  }

  if (normalizedRole === 'TECHNICIAN') {
    return '/dashboard/technician';
  }

  return '/dashboard/customer';
}

function isSafeInternalRedirect(path: string): boolean {
  return path.startsWith('/') && !path.startsWith('//');
}

function isRedirectAllowedForRole(path: string, role?: string | null): boolean {
  if (!isSafeInternalRedirect(path)) {
    return false;
  }

  const normalizedRole = role?.toUpperCase();

  if (path.startsWith('/dashboard/admin')) {
    return normalizedRole === 'ADMIN';
  }

  if (path.startsWith('/dashboard/technician')) {
    return normalizedRole === 'TECHNICIAN';
  }

  if (path.startsWith('/dashboard/customer') || path.startsWith('/booking')) {
    return normalizedRole !== 'ADMIN' && normalizedRole !== 'TECHNICIAN';
  }

  return true;
}

/**
 * Handle redirect after successful authentication
 * Returns the path to redirect to, defaults to dashboard if no stored path
 */
export function handlePostAuthRedirect(role?: string | null): string {
  const storedPath = getAndClearRedirectPath();
  const fallbackPath = getDashboardPathForRole(role);

  if (storedPath && isRedirectAllowedForRole(storedPath, role)) {
    return storedPath;
  }

  return fallbackPath;
}
