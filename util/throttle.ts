
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => ReturnType<T>) => {
  let inThrottle: boolean;
  let lastResult: ReturnType<T>;

  return function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
): ReturnType<T> {
    const context = this;
    if (!inThrottle) {
        inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
      lastResult = func.apply(context, args);
    }
    return lastResult;
  };
};
