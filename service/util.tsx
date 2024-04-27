export function debounce<F extends (...args: any[]) => any>(
  func: F,
  delay: number = 2000
): (...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (...args: Parameters<F>): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function make_id(length = 5): string {
    let txt = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
  }
  
  export function makeLorem(size = 100): string {
    const words = [
      "The sky",
      "above",
      "the port",
      "was",
      "the color of television",
      "tuned",
      "to",
      "a dead channel",
      ".",
      "All",
      "this happened",
      "more or less",
      ".",
      "I",
      "had",
      "the story",
      "bit by bit",
      "from various people",
      "and",
      "as generally",
      "happens",
      "in such cases",
      "each time",
      "it",
      "was",
      "a different story",
      ".",
      "It",
      "was",
      "a pleasure",
      "to",
      "burn",
    ];
    let txt = "";
    while (size > 0) {
      size--;
      txt += words[Math.floor(Math.random() * words.length)] + " ";
    }
    return txt;
  }
  
