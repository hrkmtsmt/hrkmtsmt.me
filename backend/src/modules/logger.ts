// biome-ignore lint/complexity/noStaticOnlyClass: Logger is intentionally a static-only utility class
export class Logger {
  // biome-ignore lint/suspicious/noExplicitAny: variadic error arguments require any type
  public static error(...e: any) {
    console.error(...e);
  }
}
