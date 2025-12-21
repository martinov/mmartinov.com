import { define } from "../utils.ts";

export default define.page(function App({ Component }) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          Martin Martinov - Software Architect & Automation Consultant
        </title>
        <meta
          name="description"
          content="Software architect specializing in business process automation and AI integration. 22+ years building systems that work."
        />

        {/* Preconnect to Google Fonts for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

        {/* Google Fonts - Newsreader (display) and DM Sans (body) */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;0,6..72,700;1,6..72,400&display=swap"
          rel="stylesheet"
        />

        {/* Plausible Analytics - Privacy-focused, GDPR compliant */}
        <script
          async
          src="https://analytics.mmartinov.com/js/pa-_ee_5f_2lWSfTCCHibgKM.js"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
  window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
  plausible.init()
`,
          }}
        />
      </head>
      <body class="bg-white text-gray-900 antialiased">
        <Component />
      </body>
    </html>
  );
});
