"use client"

import React, { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { X, Menu as MenuIcon } from "lucide-react"

interface MenuItemProps {
  children?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  icon?: React.ReactNode
  isActive?: boolean
  label?: string
}

export function MenuItem({ onClick, disabled = false, icon, isActive = false, label }: MenuItemProps) {
  return (
    <button
      type="button"
      className={`relative w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-200 outline-hidden focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/40
        ${disabled ? "text-muted-foreground cursor-not-allowed" : ""}
        ${isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:text-primary hover:scale-110"}
      `}
      role="menuitem"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      {icon}
    </button>
  )
}

interface MenuContainerProps {
  children: React.ReactNode
}

export function MenuContainer({ children }: MenuContainerProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [pos, setPos] = useState<{ top: number; right: number } | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const updatePos = () => {
    const el = triggerRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setPos({
      top: r.bottom + 12,
      right: window.innerWidth - r.right,
    })
  }

  useEffect(() => {
    if (!isExpanded) return
    updatePos()
    const onScroll = () => updatePos()
    const onResize = () => updatePos()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsExpanded(false)
    }
    window.addEventListener("scroll", onScroll, true)
    window.addEventListener("resize", onResize)
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("scroll", onScroll, true)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("keydown", onKey)
    }
  }, [isExpanded])

  const close = () => setIsExpanded(false)

  // Wrap children clicks to also close the menu
  const childrenArray = React.Children.map(children, (child) => {
    if (!React.isValidElement<MenuItemProps>(child)) return child
    const original = child.props.onClick
    return React.cloneElement(child, {
      onClick: () => {
        original?.()
        close()
      },
    })
  })

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsExpanded((v) => !v)}
        aria-label={isExpanded ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isExpanded}
        className={`relative w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-xl border shadow-md transition-colors outline-hidden focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/40
          ${isExpanded ? "bg-primary text-primary-foreground border-primary/40" : "bg-white/70 text-foreground border-white/40 hover:bg-white/90"}
        `}
      >
        {isExpanded ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
      </button>

      {isExpanded && pos &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-[99]"
              onClick={close}
              aria-hidden
            />
            <div
              className="fixed z-[100] origin-top-right animate-scale-in"
              style={{ top: pos.top, right: pos.right }}
              role="menu"
            >
              <div className="flex flex-col gap-1 p-1.5 rounded-full bg-white/80 border border-white/40">
                {childrenArray}
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  )
}
