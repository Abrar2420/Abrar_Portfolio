import type { ReactNode } from 'react'

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="px-4 sm:px-6">
      <div className="mx-auto max-w-[980px] border-x border-[#d6d0c8]">
        {children}
      </div>
    </div>
  )
}
