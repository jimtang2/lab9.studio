import Title from "@/components/Title"

export default function Privacy() {
  return (
    <main className={`flex flex-col items-center p-4`}>
      <Title title="Privacy Policy" />
      <h2>Introduction</h2>
      <p>This Privacy Policy explains how lab9.studio collects, uses, and protects your information on lab9.studio.</p>
      <h2>Information We Collect</h2>
      <p>Personal: Name, email, details provided (e.g., forms, comments). Non-Personal: IP address, browser type, usage data via cookies/analytics.</p>
      <h2>How We Use Your Information</h2>
      <p>Respond to inquiries, improve site, analyze usage (e.g., Google Analytics), comply with legal obligations.</p>
      <h2>Cookies</h2>
      <p>Uses cookies to enhance experience, track usage. Disable cookies in browser; some features may not work.</p>
      <h2>Sharing Your Information</h2>
      <p>Not sold/shared except with service providers under confidentiality or to comply with legal requirements/protect rights.</p>
      <h2>Data Security</h2>
      <p>Reasonable measures (e.g., SSL) used; absolute security not guaranteed.</p>
      <h2>Your Rights</h2>
      <p>Request access, correction, deletion via <a href="/about/register">/about/register</a>. EU/UK: GDPR rights (e.g., portability). CA: CCPA rights (e.g., opt-out).</p>
      <h2>Third-Party Links</h2>
      <p>Links to external sites not controlled by lab9.studio.</p>
      <h2>Children’s Privacy</h2>
      <p>Not intended for users under 13. No knowing collection of children’s data.</p>
      <h2>Changes to Policy</h2>
      <p>Updates posted on this page.</p>
      <h2>Contact</h2>
      <p>Visit <a href="/about/contact">/about/contact</a> to contact us.</p>
    </main>
  );
}
