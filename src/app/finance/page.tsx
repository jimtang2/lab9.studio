import Image from 'next/image';
import LoaderTrigger from "@/components/LoaderTrigger"

export default function Finance() {
  return (
    <main className={`
      flex flex-col 
      items-center
      z-5
      py-2
      px-8
      min-h-[calc(100vh-88px)]
    `}>
      <LoaderTrigger />
    </main>
  );
}