
export class ServerHttpResponse {
  private statusCode: number;
  private headers: Record<string, string>;
  private body: string;

  constructor() {
    this.statusCode = 200; // Default status code
    this.headers = {};
    this.body = '';
  }

  // setStatusCode(code: number): void {
  //   this.statusCode = code;
  // }

  // setHeader(name: string, value: string): void {
  //   this.headers[name] = value;
  // }

  // setBody(body: string): void {
  //   this.body = body;
  // }

  // getResponse(): { statusCode: number; headers: Record<string, string>; body: string } {
  //   return {
  //     statusCode: this.statusCode,
  //     headers: this.headers,
  //     body: this.body,
  //   };
  // }
}
