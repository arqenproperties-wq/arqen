'use client'

import { useLayoutEffect, useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react'

const DEFAULT_DIMENSIONS = {
  CARD_W: 310,
  CARD_H: 640,
  IMG_H: 388,
  BEZEL: 14,
  STATUS_H: 52,
  POST_HEADER_H: 46,
  HOME_H: 30,
  IMG_GAP: 20,
}

function getResponsiveDimensions() {
  if (typeof window === 'undefined') {
    return DEFAULT_DIMENSIONS
  }

  const isMobile = window.innerWidth < 640
  const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024

  if (isMobile) {
    return {
      CARD_W: 260,
      CARD_H: 540,
      IMG_H: 330,
      BEZEL: 10,
      STATUS_H: 48,
      POST_HEADER_H: 42,
      HOME_H: 28,
      IMG_GAP: 12,
    }
  } else if (isTablet) {
    return {
      CARD_W: 300,
      CARD_H: 600,
      IMG_H: 360,
      BEZEL: 12,
      STATUS_H: 50,
      POST_HEADER_H: 44,
      HOME_H: 28,
      IMG_GAP: 16,
    }
  } else {
    return DEFAULT_DIMENSIONS
  }
}

function ImageStrip({ posts, stripRef, dimensions, initialX }) {
  const { CARD_W, IMG_GAP, STATUS_H, POST_HEADER_H, CARD_H } = dimensions
  const IMG_STRIP_TOP_OFFSET = -(CARD_H / 2) + STATUS_H + POST_HEADER_H

  return (
    <div
      ref={stripRef}
      className="absolute left-0 flex"
      style={{
        top: `calc(50vh + ${IMG_STRIP_TOP_OFFSET}px)`,
        gap: `${IMG_GAP}px`,
        transform: `translateX(${initialX}px)`,
      }}
    >
      {posts.map((post) => (
        <div
          key={post.id}
          className="relative  overflow-hidden "
          style={{ width: CARD_W, height: CARD_H - STATUS_H - POST_HEADER_H - 125 }}
        >
          <Image src={post.imageUrl} alt={post.caption} fill className="object-cover" />
        </div>
      ))}
    </div>
  )
}

function InstagramUIOverlay({ post, dimensions }) {
  const { CARD_W, CARD_H, STATUS_H } = dimensions
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [localLikes, setLocalLikes] = useState(post.likes)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 640)

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setLiked(false)
    setSaved(false)
    setLocalLikes(post.likes)
  }, [post.id])

  const handleLike = () => {
    setLiked((prev) => {
      setLocalLikes((l) => (prev ? l - 1 : l + 1))
      return !prev
    })
  }

  return (
    <div
      className="absolute flex flex-col z-[9] pointer-events-none"
      style={{
        top: `calc(50vh - ${CARD_H / 2}px)`,
        left: `calc(50% - ${CARD_W / 2}px)`,
        width: CARD_W,
        height: CARD_H,
      }}
    >
      <div style={{ height: STATUS_H }} />

      <div className="h-[42px] md:h-[46px] bg-white flex items-center justify-between px-3 border-b border-gray-200 pointer-events-auto">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full p-[2px] bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-600">
            <div className="w-full h-full rounded-full border-2 border-white bg-white">
              <Image src='/newlogo.png' alt='icon' width={32} height={32} className="rounded-full relative top-[2px]" />
            </div>
          </div>
          <div>
            <p className="text-[10px] md:text-[11px] font-bold text-black leading-tight">
              arqenproperties
            </p>
            <p className="text-[9px] md:text-[10px] text-gray-500 leading-tight truncate max-w-[150px]">
              {post.location}
            </p>
          </div>
        </div>
        <MoreHorizontal size={isMobile ? 16 : 18} />
      </div>

      <div
        className="w-full flex-shrink-0"
        style={{
          height: dimensions.CARD_H - STATUS_H - 42 - 44 - 20 - (isMobile ? 60 : 65)
        }}
      />
      <div className="bg-white flex items-center justify-between px-3 py-2 pointer-events-auto flex-shrink-0">
        <div className="flex items-center gap-3 md:gap-4">
          <button onClick={handleLike} className="touch-manipulation">
            <Heart
              size={isMobile ? 20 : 22}
              className={`${liked ? 'text-red-500 scale-125' : 'text-black'} transition-transform active:scale-90`}
              fill={liked ? 'currentColor' : 'none'}
            />
          </button>
          <button className="touch-manipulation">
            <MessageCircle size={isMobile ? 20 : 22} />
          </button>
          <button className="touch-manipulation">
            <Send size={isMobile ? 18 : 20} className="-rotate-12" />
          </button>
        </div>
        <button onClick={() => setSaved((s) => !s)} className="touch-manipulation">
          <Bookmark size={isMobile ? 20 : 22} fill={saved ? 'black' : 'none'} />
        </button>
      </div>

      <div className="bg-white px-3 text-[10px] md:text-[11px] font-bold">
        {localLikes.toLocaleString()} likes
      </div>

      <div className="bg-white px-3 text-[10px] md:text-[11px] flex-shrink-0">
        <span className="font-bold">arqenproperties </span>
        <span className="break-words">
          {post.caption.length > 60 && isMobile ? post.caption.slice(0, 60) + '...' : post.caption}
        </span>
      </div>

      <div className="bg-white px-3 text-[9px] md:text-[10px] text-gray-500">
        View all {post.comments} comments
      </div>

      <div className="bg-white px-3 pb-1 text-[9px] md:text-[10px] text-gray-400 uppercase tracking-wide">
        {post.timestamp}
      </div>

      <div className="bg-white" style={{ height: isMobile ? 4 : 6 }} />
    </div>
  )
}

function PhoneFrameOverlay({ dimensions }) {
  const { CARD_W, CARD_H, BEZEL } = dimensions
  const outerW = CARD_W + BEZEL * 2
  const outerH = CARD_H + BEZEL * 2
  const innerR = Math.min(36, CARD_W * 0.12)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 640)
  }, [])

  return (
    <div
      className="relative pointer-events-none"
      style={{
        width: outerW,
        height: outerH,
        borderRadius: Math.min(50, CARD_W * 0.16),
        border: `${BEZEL}px solid #0d0d0d`,
        boxShadow: '0 0 0 1.5px #3a3a3a, 0 20px 60px rgba(0,0,0,0.4)',
      }}
    >
      <div className="absolute top-2 md:top-3 left-1/2 -translate-x-1/2 w-[90px] md:w-[100px] h-[25px] md:h-[30px] bg-black rounded-full flex items-center justify-center z-20">
        <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-gray-800" />
      </div>

      <div
        className="absolute top-0 left-0 right-0 bg-white flex justify-between px-3 md:px-4 pt-3 md:pt-4"
        style={{ height: dimensions.STATUS_H, borderRadius: `${innerR}px ${innerR}px 0 0` }}
      >
        <span className="text-[10px] md:text-xs font-semibold">9:41</span>
        {!isMobile && <span className="text-[10px] md:text-xs"> 100%</span>}
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 bg-white flex items-center justify-center"
        style={{ height: dimensions.HOME_H, borderRadius: `0 0 ${innerR}px ${innerR}px` }}
      >
        <div className="w-16 md:w-20 h-1 bg-black opacity-20 rounded-full" />
      </div>
    </div>
  )
}

export default function CenterCarousel({ posts = [] }) {
  const imageStripRef = useRef(null)
  const [active, setActive] = useState(0)
  const initialized = useRef(false)
  const [dimensions, setDimensions] = useState(DEFAULT_DIMENSIONS)
  const [mounted, setMounted] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  useEffect(() => {
    setMounted(true)
    const updateDimensions = () => {
      initialized.current = false
      setDimensions(getResponsiveDimensions())
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useLayoutEffect(() => {
    if (!imageStripRef.current || !dimensions) return
    const vw = window.innerWidth
    const x = vw / 2 - dimensions.CARD_W / 2 - active * (dimensions.CARD_W + dimensions.IMG_GAP)

    if (!initialized.current) {
      gsap.set(imageStripRef.current, { x })
      initialized.current = true
    } else {
      gsap.to(imageStripRef.current, { x, duration: 0.45, ease: 'power3.out' })
    }
  }, [active, dimensions])

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const diff = touchStart - touchEnd
    const minSwipeDistance = 50

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        setActive((p) => (p + 1) % posts.length)
      } else {
        setActive((p) => (p - 1 + posts.length) % posts.length)
      }
    }
    setTouchStart(0)
    setTouchEnd(0)
  }

  const next = () => setActive((p) => (p + 1) % posts.length)
  const prev = () => setActive((p) => (p - 1 + posts.length) % posts.length)

  const isMobile = mounted && window.innerWidth < 640

  if (!mounted) {
    return (
      <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black/5">
        <div style={{ width: DEFAULT_DIMENSIONS.CARD_W, height: DEFAULT_DIMENSIONS.CARD_H }} />
      </div>
    )
  }
  const initialX = window.innerWidth / 2 - dimensions.CARD_W / 2 - active * (dimensions.CARD_W + dimensions.IMG_GAP)

  return (
    <div
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#f3eee8] mt-20 mb-20"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {dimensions && (
        <>
          <ImageStrip posts={posts} stripRef={imageStripRef} dimensions={dimensions} initialX={initialX} />
          <InstagramUIOverlay post={posts[active]} dimensions={dimensions} />

          <div className="absolute z-10 pointer-events-none">
            <PhoneFrameOverlay dimensions={dimensions} />
          </div>

          {!isMobile && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 md:left-7 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/10 hover:bg-black/70 backdrop-blur-sm text-white flex items-center justify-center text-xl transition-all cursor-pointer"
              >
                ←
              </button>
              <button
                onClick={next}
                className="absolute right-4 md:right-7 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/10 hover:bg-black/70 backdrop-blur-sm text-white flex items-center justify-center text-xl transition-all cursor-pointer"
              >
                →
              </button>
            </>
          )}

          {isMobile && (
            <div className="absolute bottom-20 z-20 text-white/40 text-xs bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none">
              ← Swipe →
            </div>
          )}
        </>
      )}
    </div>
  )
}