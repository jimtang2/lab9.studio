import Title from "@/components/Title"

export default function Terms() {
  return (
    <main className={`
      p-4
      items-center
    `}>
      <Title title="Terms of Use" />
      <h2>Acceptance of Terms</h2>
      <p>By accessing lab9.studio, you agree to these Terms of Use. If you do not agree, do not use the site.</p>
      <h2>Use of Site</h2>
      <p>Use for personal, non-commercial purposes. Do not engage in unlawful activities, harass others, or disrupt functionality. Content owned by lab9.studio or licensed; no reproduction without permission.</p>
      <h2>User Content</h2>
      <p>You are responsible for submitted content (e.g., comments). No harmful, defamatory, or illegal content. lab9.studio may remove or moderate content.</p>
      <h2>Limitation of Liability</h2>
      <p>Site provided “as is.” lab9.studio not liable for damages from use. No guarantee of accuracy, availability, or uninterrupted access.</p>
      <h2>Third-Party Links</h2>
      <p>Site may link to external websites. lab9.studio not responsible for their content or practices.</p>
      <h2>Changes to Terms</h2>
      <p>lab9.studio may update terms. Continued use constitutes acceptance of changes.</p>
      <h2>Termination</h2>
      <p>lab9.studio may suspend or terminate access for any reason, including violation of terms.</p>
      <h2>Contact</h2>
      <p>Visit <a href="/about/contact">/about/contact</a> to contact us.</p>
    </main>
  );
}
