import Image from 'next/image';
import LoaderTrigger from "@/components/LoaderTrigger"

export default function Privacy() {
  return (
    <main className={`
      flex flex-col 
      items-center
      z-5
      py-2
      px-8
      min-h-[calc(100vh-88px)]
    `}
      style={{
        
      }}>
      <div className="sm:w-lg text-center w-sm px-2">
        <h1 className="text-xl font-bold py-2">Privacy Policy</h1>        
        <h2 className="text-md font-bold">Last Updated: May 3, 2025</h2>
        <p className="pb-4">At lab9.studio, we value your privacy and want you to feel safe while browsing. This Privacy Policy explains how we handle your information. Questions? Reach us at info@lab9.studio or via the Contact Page.</p>
        <h2 className="text-md font-bold">1. What We Collect</h2>
        <p className="pb-4">We may collect basic info like your name or email if you comment, contact us, or sign up for updates. Visiting the site might also share technical stuff like your IP address or browser type through cookies or analytics tools.</p>
        <h2 className="text-md font-bold">2. How We Use It</h2>
        <p className="pb-4">Your info helps us run the site, respond to your messages, or improve your experience. We might use analytics to see what content you like but won’t stalk you like a creepy ex.</p>
        <h2 className="text-md font-bold">3. Who We Share It With</h2>
        <p className="pb-4">We don’t sell or share your data with shady third parties. It’s only shared with trusted services (like hosting or analytics providers) to keep the site running, and they’re bound to keep it confidential.</p>
        <h2 className="text-md font-bold">4. Your Choices</h2>
        <p className="pb-4">You can opt out of cookies or newsletters—check your browser settings or unsubscribe links. If you want your data deleted, contact us, and we’ll handle it unless we’re legally required to keep it.</p>
        <h2 className="text-md font-bold">5. Security & Updates</h2>
        <p className="pb-4">We use standard security to protect your info, but no system’s perfect. We’ll update this policy as needed—check the date above. Using the site after changes means you’re okay with them.</p>
      </div>
    </main>
  );
}
