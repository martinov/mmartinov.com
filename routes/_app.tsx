import { define } from "../utils.ts";

export default define.page(function App({ Component }) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Martin Martinov - Software Architect & Automation Consultant</title>
        <meta
          name="description"
          content="Software architect specializing in business process automation and AI integration. 20+ years building systems that work."
        />

        {/* Plausible Analytics - Privacy-focused, GDPR compliant */}
        <script
          defer
          data-domain="mmartinov.com"
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body class="bg-white text-gray-900 antialiased">
        <Component />
      </body>
    </html>
  );
});
