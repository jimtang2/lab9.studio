import Image from 'next/image';
import LoaderTrigger from "@/components/LoaderTrigger"

export default function Finance() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <LoaderTrigger />
    </main>
  );
}