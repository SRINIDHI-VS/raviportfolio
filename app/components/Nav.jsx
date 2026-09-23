const NAV_LINKS = [
  { href: "#story", label: "Story" },
  { href: "#results", label: "Results" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <nav>
      <div className="navmark disp">R</div>
      <div className="nav-links">
        {NAV_LINKS.map((l) => (
          <a key={l.href} className="nav-link" href={l.href}>
            {l.label}
          </a>
        ))}
      </div>
      <a
        className="btn magnetic"
        href="https://ravindrafitness.netlify.app"
        target="_blank"
        rel="noopener"
      >
        Enroll →
      </a>
    </nav>
  );
}
