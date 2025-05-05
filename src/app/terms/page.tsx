import Image from 'next/image';
import LoaderTrigger from "@/components/LoaderTrigger"

export default function Terms() {
  return (
    <main className={`
      flex flex-col 
      items-center
      z-5
      py-2
    `}
      style={{
        
      }}>
      <div className="sm:w-lg text-center w-sm px-2">
        <h1 className="text-xl font-bold py-2">Terms of Use</h1>
        <h2 className="text-md font-bold">Last Updated: May 3, 2025</h2>
        <p className="pb-4">Welcome to lab9.studio! These are the rules for vibing with our site. Don’t like ‘em? Bounce. Otherwise, let’s keep it fun and not end up in court, yeah?</p>
        <h2 className="text-md font-bold">1. Who’s Invited</h2>
        <p className="pb-4">Anyone over 13 with Wi-Fi and a shred of chill can hang. Kids, get your parents’ OK before you start commenting your Roblox fanfic. No creeps, bots, or Karens allowed.</p>
        <h2 className="text-md font-bold">2. Play Nice</h2>
        <p className="pb-4">Browse, share, enjoy—but don’t be a dick. No stealing our content, hacking the site, or posting anything that’d make your mom wash your mouth out with soap. Keep it legal, keep it classy.</p>
        <h2 className="text-md font-bold">3. We Own the Goods</h2>
        <p className="pb-4">All the words, pics, and glorious memes here belong to [Your Name] or our pals. Wanna borrow? Ask first. Your comments or fan mail? We can show ‘em off but won’t sell ‘em to sketchy data brokers.</p>
        <h2 className="text-md font-bold">4. No Promises, No Drama</h2>
        <p className="pb-4">This site’s “as is,” meaning we’re not your tech support or your therapist. If it crashes or you hate our hot takes, tough luck. We’re not liable if you rage-quit and yeet your laptop.</p>
        <h2 className="text-md font-bold">5. We Can Change the Rules</h2>
        <p className="pb-4">We might remix these terms. Check the date up top. If you’re still here after we update, you’re down with it. Got beef? Email us at got-beef@lab9.studio or hit the Contact Page.</p>
      </div>
    </main>
  );
}
