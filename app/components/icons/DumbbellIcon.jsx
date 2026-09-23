export default function DumbbellIcon(props) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="4.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="6" y="18" width="10" height="28" rx="4" />
      <rect x="48" y="18" width="10" height="28" rx="4" />
      <rect x="16" y="24" width="6" height="16" rx="2" />
      <rect x="42" y="24" width="6" height="16" rx="2" />
      <line x1="22" y1="32" x2="42" y2="32" />
    </svg>
  );
}
