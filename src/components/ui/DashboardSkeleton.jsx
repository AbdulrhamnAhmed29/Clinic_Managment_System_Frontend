import React from "react";

/* ---------- Primitive ---------- */
const Bone = ({ className = "" }) => (
  <div className={`animate-pulse rounded-md bg-slate-200 ${className}`} />
);

/* ---------- Sidebar ---------- */
const SidebarSkeleton = () => (
  <aside className="hidden w-64 shrink-0 flex-col border-e border-slate-200 bg-white p-5 lg:flex">
    <div className="flex items-center gap-3">
      <Bone className="h-9 w-9 rounded-lg" />
      <Bone className="h-4 w-28" />
    </div>

    <nav className="mt-8 space-y-2">
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 rounded-lg px-2 py-2">
          <Bone className="h-5 w-5" />
          <Bone className={`h-3 ${i % 2 ? "w-24" : "w-32"}`} />
        </div>
      ))}
    </nav>

    <div className="mt-auto flex items-center gap-3 border-t border-slate-100 pt-4">
      <Bone className="h-10 w-10 rounded-full" />
      <div className="space-y-2">
        <Bone className="h-3 w-24" />
        <Bone className="h-3 w-16" />
      </div>
    </div>
  </aside>
);

/* ---------- Topbar ---------- */
const TopbarSkeleton = () => (
  <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
    <Bone className="h-9 w-full max-w-xs rounded-lg" />
    <div className="flex items-center gap-3">
      <Bone className="h-9 w-9 rounded-full" />
      <Bone className="h-9 w-9 rounded-full" />
      <Bone className="h-9 w-9 rounded-full" />
    </div>
  </header>
);

/* ---------- Stat card ---------- */
const StatCardSkeleton = () => (
  <div className="rounded-xl border border-slate-200 bg-white p-5">
    <div className="flex items-center justify-between">
      <Bone className="h-3 w-24" />
      <Bone className="h-9 w-9 rounded-lg" />
    </div>
    <Bone className="mt-5 h-7 w-32" />
    <Bone className="mt-3 h-3 w-20" />
  </div>
);

/* ---------- Chart card ---------- */
const ChartCardSkeleton = () => {
  const heights = ["h-24", "h-36", "h-28", "h-44", "h-32", "h-52", "h-40", "h-48", "h-36", "h-44"];
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Bone className="h-4 w-40" />
          <Bone className="h-3 w-28" />
        </div>
        <Bone className="h-8 w-24 rounded-lg" />
      </div>
      <div className="mt-6 flex h-56 items-end gap-3">
        {heights.map((h, i) => (
          <Bone key={i} className={`w-full ${h}`} />
        ))}
      </div>
    </div>
  );
};

/* ---------- List card (e.g. recent activity) ---------- */
const ListCardSkeleton = () => (
  <div className="rounded-xl border border-slate-200 bg-white p-5">
    <Bone className="h-4 w-36" />
    <div className="mt-5 space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Bone className="h-10 w-10 shrink-0 rounded-full" />
          <div className="flex-1 space-y-2">
            <Bone className="h-3 w-3/4" />
            <Bone className="h-3 w-1/2" />
          </div>
          <Bone className="h-3 w-10" />
        </div>
      ))}
    </div>
  </div>
);

/* ---------- Table card ---------- */
const TableCardSkeleton = () => (
  <div className="rounded-xl border border-slate-200 bg-white p-5">
    <div className="flex items-center justify-between">
      <Bone className="h-4 w-32" />
      <Bone className="h-8 w-20 rounded-lg" />
    </div>
    <div className="mt-5 overflow-x-auto">
      <div className=" space-y-3">
        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Bone key={i} className="h-3 w-2/3 bg-slate-300" />
          ))}
        </div>
        {Array.from({ length: 5 }).map((_, r) => (
          <div key={r} className="grid grid-cols-5 gap-4 border-t border-slate-100 pt-3">
            {Array.from({ length: 5 }).map((_, c) => (
              <Bone key={c} className="h-4 w-full" />
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ---------- Page ---------- */
export default function DashboardSkeleton() {
  return (
    <div
      className="flex min-h-screen bg-slate-50"
      role="status"
      aria-busy="true"
      aria-label="Loading dashboard"
    >
      <SidebarSkeleton />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopbarSkeleton />

        <main className="flex-1 space-y-6 p-4 sm:p-6">
          {/* Page title + action */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Bone className="h-6 w-48" />
              <Bone className="h-3 w-64" />
            </div>
            <Bone className="h-10 w-32 rounded-lg" />
          </div>

          {/* Stat cards */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <StatCardSkeleton key={i} />
            ))}
          </section>

          {/* Chart + list */}
          <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <ChartCardSkeleton />
            </div>
            <ListCardSkeleton />
          </section>

          {/* Table */}
          <TableCardSkeleton />
        </main>
      </div>
    </div>
  );
}