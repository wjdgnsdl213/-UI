export function TopBar({ title = '내 가게 경영진단' }: { title?: string }) {
  return (
    <header className="sticky top-0 z-50 flex h-[60px] items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur">
      <h1 className="text-[22px] font-black tracking-[-0.05em]">{title}</h1>
      <button aria-label="닫기" className="text-3xl leading-none text-slate-950">
        ×
      </button>
    </header>
  );
}
