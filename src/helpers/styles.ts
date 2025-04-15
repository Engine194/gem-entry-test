export const cls = (...args: (string | boolean | undefined)[]) =>
  args.filter(Boolean).join(" ");
