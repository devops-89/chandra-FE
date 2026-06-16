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

/**
 * Handle redirect after successful authentication
 * Returns the path to redirect to, defaults to dashboard if no stored path
 */
export function handlePostAuthRedirect(): string {
  const storedPath = getAndClearRedirectPath();
  return storedPath || '/dashboard/customer';
}