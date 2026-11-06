import { createServer } from "node:http";
import { FAILED_REPLY_TO, RESEND_STUB_PORT, type SentEmail } from "./resend.ts";

const sent: SentEmail[] = [];

const readBody = async (request: AsyncIterable<Buffer>) => {
  const chunks: Buffer[] = [];
  for await (const chunk of request) chunks.push(chunk);
  return JSON.parse(Buffer.concat(chunks).toString("utf8")) as Record<
    string,
    unknown
  >;
};

createServer(async (request, response) => {
  response.setHeader("Content-Type", "application/json");
  if (request.method === "GET" && request.url === "/__emails") {
    response.end(JSON.stringify(sent));
    return;
  }
  if (request.method === "POST" && request.url === "/emails") {
    try {
      const payload = await readBody(request);
      if (
        Array.isArray(payload.reply_to) &&
        payload.reply_to.includes(FAILED_REPLY_TO)
      ) {
        response.writeHead(503).end(JSON.stringify({ message: "Send failed" }));
        return;
      }
      sent.push({
        path: request.url,
        authorization: request.headers.authorization ?? "",
        payload,
      });
      response.end(JSON.stringify({ id: `stub-${sent.length}` }));
    } catch {
      response.writeHead(400).end(JSON.stringify({ message: "Invalid JSON" }));
    }
    return;
  }
  response.writeHead(404).end();
}).listen(RESEND_STUB_PORT, "127.0.0.1", () => {
  console.log(`Resend stub listening on port ${RESEND_STUB_PORT}`);
});
