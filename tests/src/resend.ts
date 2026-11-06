export const RESEND_STUB_PORT = Number(process.env.RESEND_STUB_PORT || 8782);
export const RESEND_STUB_URL = `http://127.0.0.1:${RESEND_STUB_PORT}`;
export const RESEND_API_URL = `${RESEND_STUB_URL}/emails`;

// Each request chooses its own outcome so parallel tests don't share a switch.
export const FAILED_REPLY_TO = "send-failure@example.test";

export interface SentEmail {
  readonly path: string;
  readonly authorization: string;
  readonly payload: Readonly<Record<string, unknown>>;
}

export const sentEmails = async (): Promise<SentEmail[]> => {
  const response = await fetch(`${RESEND_STUB_URL}/__emails`);
  return (await response.json()) as SentEmail[];
};
