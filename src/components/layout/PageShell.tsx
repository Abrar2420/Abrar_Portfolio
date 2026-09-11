import type { ReactNode } from 'react'

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#faf9f7] px-4 sm:px-6">
      <div className="mx-auto max-w-245 border-x border-[#d6d0c8]">
        {children}
      </div>
    </div>
  )
}
