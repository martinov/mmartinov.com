import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";

interface ObfuscatedEmailProps {
  encoded: string;
  className?: string;
}

/**
 * Client-side email obfuscation component
 * Decodes email on the client to prevent bot scraping
 *
 * Email is encoded by reversing and applying a simple character shift
 */
export default function ObfuscatedEmail({ encoded, className }: ObfuscatedEmailProps) {
  const email = useSignal("");
  const mailtoHref = useSignal("");

  useEffect(() => {
    // Decode the email client-side
    // Step 1: Reverse the string
    const reversed = encoded.split("").reverse().join("");

    // Step 2: Decode from base64
    const decoded = atob(reversed);

    email.value = decoded;
    mailtoHref.value = `mailto:${decoded}`;
  }, [encoded]);

  return (
    <a
      href={mailtoHref.value}
      class={className}
    >
      {email.value}
    </a>
  );
}

/**
 * Helper function to encode emails (use this in your content files)
 * Usage: encodeEmail("me@mmartinov.com")
 *
 * This is NOT exported from the island - use it separately to generate encoded values
 */
export function encodeEmail(email: string): string {
  // Step 1: Base64 encode
  const encoded = btoa(email);

  // Step 2: Reverse the string
  const reversed = encoded.split("").reverse().join("");

  return reversed;
}
