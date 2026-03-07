"use client"

import { useEffect, useRef, useState } from "react"

interface BloodCell {
  x: number
  y: number
  z: number
  size: number
  speedX: number
  speedY: number
  speedZ: number
  rotation: number
  rotationSpeed: number
}

export function BloodCellAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cellsRef = useRef<BloodCell[]>([])
  const scrollYRef = useRef(0)
  const [isVisible, setIsVisible] = useState(false)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const initCells = () => {
      const cells: BloodCell[] = []
      const cellCount = Math.floor((canvas.width * canvas.height) / 30000) // Reduced from 15000

      for (let i = 0; i < cellCount; i++) {
        cells.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          size: 20 + Math.random() * 40,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          speedZ: (Math.random() - 0.5) * 0.2,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
        })
      }
      cellsRef.current = cells
    }
    initCells()

    const handleScroll = () => {
      scrollYRef.current = window.scrollY
      const ctaSectionStart = window.innerHeight * 2.5 // Adjust based on your layout
      if (window.scrollY > ctaSectionStart) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()

    // Draw blood cell with realistic biconcave shape
    const drawBloodCell = (cell: BloodCell) => {
      const scale = 1 + cell.z / 1000
      const parallaxOffset = (scrollYRef.current * cell.z) / 2000
      const size = cell.size * scale
      const alpha = 0.15 + (cell.z / 1000) * 0.25 // Reduced from 0.3 + 0.4

      ctx.save()
      ctx.translate(cell.x, cell.y - parallaxOffset)
      ctx.rotate(cell.rotation)

      const gradient = ctx.createRadialGradient(0, -size * 0.2, size * 0.1, 0, 0, size * 0.6)
      gradient.addColorStop(0, `rgba(220, 38, 38, ${alpha})`)
      gradient.addColorStop(0.4, `rgba(185, 28, 28, ${alpha})`)
      gradient.addColorStop(0.7, `rgba(153, 27, 27, ${alpha})`)
      gradient.addColorStop(1, `rgba(127, 29, 29, ${alpha * 0.6})`)

      ctx.beginPath()
      ctx.ellipse(0, 0, size * 0.6, size * 0.4, 0, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      const highlight = ctx.createRadialGradient(-size * 0.15, -size * 0.15, 0, -size * 0.15, -size * 0.15, size * 0.3)
      highlight.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.3})`)
      highlight.addColorStop(1, `rgba(255, 255, 255, 0)`)
      ctx.fillStyle = highlight
      ctx.fill()

      ctx.beginPath()
      ctx.ellipse(0, 0, size * 0.2, size * 0.15, 0, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(127, 29, 29, ${alpha * 0.4})`
      ctx.fill()

      ctx.restore()
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (isVisible) {
        const sortedCells = [...cellsRef.current].sort((a, b) => a.z - b.z)

        sortedCells.forEach((cell) => {
          cell.x += cell.speedX
          cell.y += cell.speedY
          cell.z += cell.speedZ
          cell.rotation += cell.rotationSpeed

          if (cell.x < -100) cell.x = canvas.width + 100
          if (cell.x > canvas.width + 100) cell.x = -100
          if (cell.y < -100) cell.y = canvas.height + 100
          if (cell.y > canvas.height + 100) cell.y = -100
          if (cell.z < 0) cell.z = 1000
          if (cell.z > 1000) cell.z = 0

          drawBloodCell(cell)
        })
      }

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(animationId)
    }
  }, [isVisible])

  useEffect(() => {
    if (isVisible) {
      const fadeIn = setInterval(() => {
        setOpacity((prev) => {
          if (prev >= 0.5) {
            clearInterval(fadeIn)
            return 0.5
          }
          return prev + 0.05
        })
      }, 50)
      return () => clearInterval(fadeIn)
    } else {
      setOpacity(0)
    }
  }, [isVisible])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
        style={{ opacity }}
        aria-hidden="true"
      />
      <div
        className="fixed inset-x-0 top-0 h-[60vh] pointer-events-none z-0 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 40%, rgba(255,255,255,0.7) 70%, rgba(255,255,255,0) 100%)",
          opacity: isVisible ? 1 : 0,
        }}
        aria-hidden="true"
      />
    </>
  )
}
