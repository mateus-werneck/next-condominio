export function isMobileAgent(userAgent: string): boolean {
  const isMobile = userAgent.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  );

  return Boolean(isMobile);
}
