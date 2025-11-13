interface ServiceIconProps {
  type: "workflow" | "brain" | "architecture";
}

export default function ServiceIcon({ type }: ServiceIconProps) {
  switch (type) {
    case "workflow":
      return (
        <svg
          class="w-12 h-12 text-teal-600 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Workflow/Automation icon */}
          <circle cx="6" cy="6" r="2" stroke-width="2" stroke-linecap="round" />
          <circle cx="18" cy="6" r="2" stroke-width="2" stroke-linecap="round" />
          <circle cx="12" cy="18" r="2" stroke-width="2" stroke-linecap="round" />
          <path
            d="M8 6h4m4 0h4M12 8v8M10 16h4"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );

    case "brain":
      return (
        <svg
          class="w-12 h-12 text-teal-600 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* AI/Neural Network icon - interconnected nodes */}
          {/* Left nodes (3 input) */}
          <circle cx="3" cy="5" r="1.5" fill="currentColor" />
          <circle cx="3" cy="12" r="1.5" fill="currentColor" />
          <circle cx="3" cy="19" r="1.5" fill="currentColor" />
          {/* Center nodes (4 processing) */}
          <circle cx="12" cy="4" r="1.5" fill="currentColor" />
          <circle cx="12" cy="9" r="1.5" fill="currentColor" />
          <circle cx="12" cy="15" r="1.5" fill="currentColor" />
          <circle cx="12" cy="20" r="1.5" fill="currentColor" />
          {/* Right nodes (2 output) */}
          <circle cx="21" cy="8" r="1.5" fill="currentColor" />
          <circle cx="21" cy="16" r="1.5" fill="currentColor" />
          {/* Connecting lines from input to processing */}
          <line x1="4.5" y1="5" x2="10.5" y2="4" stroke-width="1" stroke-linecap="round" />
          <line x1="4.5" y1="5" x2="10.5" y2="9" stroke-width="1" stroke-linecap="round" />
          <line x1="4.5" y1="12" x2="10.5" y2="9" stroke-width="1" stroke-linecap="round" />
          <line x1="4.5" y1="12" x2="10.5" y2="15" stroke-width="1" stroke-linecap="round" />
          <line x1="4.5" y1="19" x2="10.5" y2="15" stroke-width="1" stroke-linecap="round" />
          <line x1="4.5" y1="19" x2="10.5" y2="20" stroke-width="1" stroke-linecap="round" />
          {/* Connecting lines from processing to output */}
          <line x1="13.5" y1="4" x2="19.5" y2="8" stroke-width="1" stroke-linecap="round" />
          <line x1="13.5" y1="9" x2="19.5" y2="8" stroke-width="1" stroke-linecap="round" />
          <line x1="13.5" y1="15" x2="19.5" y2="16" stroke-width="1" stroke-linecap="round" />
          <line x1="13.5" y1="20" x2="19.5" y2="16" stroke-width="1" stroke-linecap="round" />
        </svg>
      );

    case "architecture":
      return (
        <svg
          class="w-12 h-12 text-teal-600 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Architecture/Blueprint icon */}
          <rect
            x="3"
            y="3"
            width="7"
            height="7"
            stroke-width="2"
            stroke-linecap="round"
          />
          <rect
            x="14"
            y="3"
            width="7"
            height="7"
            stroke-width="2"
            stroke-linecap="round"
          />
          <rect
            x="3"
            y="14"
            width="7"
            height="7"
            stroke-width="2"
            stroke-linecap="round"
          />
          <rect
            x="14"
            y="14"
            width="7"
            height="7"
            stroke-width="2"
            stroke-linecap="round"
          />
          <line
            x1="10"
            y1="7"
            x2="14"
            y2="7"
            stroke-width="2"
            stroke-linecap="round"
          />
          <line
            x1="7"
            y1="10"
            x2="7"
            y2="14"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      );

    default:
      return null;
  }
}
