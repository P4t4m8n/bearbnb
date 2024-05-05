export function debounce<F extends (...args: any[]) => void>(
  func: F,
  waitFor: number
): (...args: Parameters<F>) => void {
  let timeoutId: number | undefined = undefined;

  return function (...args: Parameters<F>): void {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = window.setTimeout(() => func(...args), waitFor);
  };
}
