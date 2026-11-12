// Renders nothing until NEXT_PUBLIC_ADS_ENABLED=true. Always labeled; keep away from buttons and inputs.
export default function AdSlot({ id }: { id: string }) {
  if (process.env.NEXT_PUBLIC_ADS_ENABLED !== "true") return null;
  return <aside aria-label="Advertisement" className="my-8 text-center text-xs text-slate-400"><p>Advertisement</p><div id={id} className="min-h-[90px]" /></aside>;
}
