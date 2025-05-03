export default async function LoaderTrigger() {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return (
    <div></div>
  );
}
