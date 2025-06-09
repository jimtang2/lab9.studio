
export default function Loading() {
  return (
    <main className="flex flex-col justify-center items-center v-full h-full">
      <h1>Loading...</h1>
      <div className="animate-spin rounded-full h-24 w-24 border-t-24 border-accent"></div>
    </main>
  );
}