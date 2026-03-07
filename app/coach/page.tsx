"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Activity, Settings, Send, Bot, User, Sparkles, Calendar, Clock, Video, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserMenu } from "@/components/user-menu"
import { MobileNav } from "@/components/mobile-nav"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface CoachSession {
  id: string
  date: string
  time: string
  status: "upcoming" | "completed" | "cancelled"
  focus: string
  duration: number
}

export default function CoachPage() {
  const [view, setView] = useState<"sessions" | "chat">("sessions")
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const [sessions] = useState<CoachSession[]>([
    {
      id: "1",
      date: "2025-10-25",
      time: "10:00 AM",
      status: "upcoming",
      focus: "Heart Health Optimization",
      duration: 15,
    },
    {
      id: "2",
      date: "2025-10-10",
      time: "2:00 PM",
      status: "completed",
      focus: "Metabolic Health Review",
      duration: 15,
    },
  ])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your biomarkers, I recommend focusing on improving your LDL cholesterol through dietary changes. Try adding more soluble fiber from oats, beans, and berries to your daily meals.",
        "Your glucose levels are in the borderline range. Consider eating balanced meals with protein, fiber, and healthy fats to stabilize blood sugar. Exercise after meals can also help improve insulin sensitivity.",
        "Great question! Your vitamin D levels are low, which is common. I recommend getting 15-20 minutes of sun exposure daily and considering a vitamin D3 supplement (2000-4000 IU). Retest in 3 months.",
        "To lower your biological age, focus on the top drivers: improving your LDL cholesterol, reducing inflammation (hs-CRP), and optimizing your glucose levels. Small consistent changes make the biggest impact.",
        "Your hormone balance looks good overall. To maintain healthy testosterone levels, continue with resistance training, ensure adequate sleep (7-9 hours), and maintain healthy body weight.",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const assistantMessage: Message = { role: "assistant", content: randomResponse }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleJoinSession = (sessionId: string) => {
    setActiveSessionId(sessionId)
    setView("chat")
    const session = sessions.find((s) => s.id === sessionId)
    setMessages([
      {
        role: "assistant",
        content: `Welcome to your ${session?.focus} session! I'm your AI Longevity Coach, ready to help you optimize your health. What would you like to focus on today?`,
      },
    ])
  }

  const handleBackToSessions = () => {
    setView("sessions")
    setActiveSessionId(null)
    setMessages([])
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MobileNav />
            <Link href="/" className="flex items-center gap-2">
              <Activity className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">Longevity</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/biomarkers">
              <Button variant="ghost">Biomarkers</Button>
            </Link>
            <Link href="/meal-plan">
              <Button variant="ghost">Meal Plan</Button>
            </Link>
            <Link href="/history">
              <Button variant="ghost">History</Button>
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/settings">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
            <UserMenu />
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3 mb-6">
            {view === "chat" && (
              <Button variant="ghost" size="icon" onClick={handleBackToSessions} className="shrink-0">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{view === "sessions" ? "AI Longevity Coach" : "Coaching Session"}</h1>
              <p className="text-sm text-muted-foreground">
                {view === "sessions" ? "12 sessions per year • Personalized guidance" : "Session-based AI coaching"}
              </p>
            </div>
          </div>

          {view === "sessions" ? (
            <div className="space-y-6">
              {/* Next Session Card */}
              {sessions.filter((s) => s.status === "upcoming").length > 0 && (
                <Card className="border-2 border-primary/20 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Next Session
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {sessions
                      .filter((s) => s.status === "upcoming")
                      .map((session) => (
                        <div key={session.id} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-lg">{session.focus}</p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {session.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {session.time}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Video className="h-4 w-4" />
                                  {session.duration} min
                                </span>
                              </div>
                            </div>
                            <Badge>Upcoming</Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Reschedule
                            </Button>
                            <Button variant="outline" size="sm">
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-teal-600 to-emerald-600"
                              onClick={() => handleJoinSession(session.id)}
                            >
                              Join Session
                            </Button>
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              )}

              {/* Book a Session */}
              <Card>
                <CardHeader>
                  <CardTitle>Book a Session</CardTitle>
                  <CardDescription>Schedule a 15-minute coaching session focused on your health goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button size="lg" className="w-full">
                    <Calendar className="mr-2 h-5 w-5" />
                    Schedule New Session
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    🔒 Sessions are processed on your device. For faster generation, switch to Ephemeral Mode.
                  </p>
                </CardContent>
              </Card>

              {/* Past Sessions */}
              <Card>
                <CardHeader>
                  <CardTitle>Past Sessions</CardTitle>
                  <CardDescription>Review your coaching history and reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {sessions
                      .filter((s) => s.status === "completed")
                      .map((session) => (
                        <div
                          key={session.id}
                          className="flex items-center justify-between p-4 rounded-lg border bg-muted/50"
                        >
                          <div>
                            <p className="font-medium">{session.focus}</p>
                            <p className="text-sm text-muted-foreground">
                              {session.date} • {session.time}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/coach/sessions/${session.id}`}>View Report</Link>
                          </Button>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex flex-col h-[calc(100vh-280px)]">
              {/* Messages */}
              <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
                <div className="space-y-6 pb-8">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.role === "assistant" && (
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
                          <Bot className="h-5 w-5 text-purple-600" />
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      </div>
                      {message.role === "user" && (
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-5 w-5 text-purple-600 animate-pulse" />
                      </div>
                      <div className="bg-muted rounded-2xl px-4 py-3">
                        <div className="flex gap-1">
                          <div
                            className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          />
                          <div
                            className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          />
                          <div
                            className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Suggested Questions */}
              {messages.length === 1 && (
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "How can I lower my LDL cholesterol?",
                      "What foods help reduce inflammation?",
                      "How do I improve my biological age?",
                      "What exercises are best for my biomarkers?",
                    ].map((question) => (
                      <Badge
                        key={question}
                        variant="outline"
                        className="cursor-pointer hover:bg-muted"
                        onClick={() => setInput(question)}
                      >
                        {question}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Box */}
              <div className="flex gap-3 items-end pt-4 border-t">
                <div className="flex-1 relative">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about your biomarkers, diet, exercise, or health goals..."
                    disabled={isLoading}
                    className="min-h-[60px] max-h-[200px] resize-none text-base"
                    rows={1}
                  />
                </div>
                <Button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  size="lg"
                  className="h-[60px] px-6 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                AI can make mistakes. Consult with healthcare professionals for medical advice.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
