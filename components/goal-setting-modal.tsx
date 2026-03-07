"use client"

import type React from "react"

import { useState } from "react"
import { Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"

interface GoalSettingModalProps {
  currentBiologicalAge: number
  chronologicalAge: number
  currentGoal: number | null
  onSaveGoal: (goal: number) => void
  trigger?: React.ReactNode
}

export function GoalSettingModal({
  currentBiologicalAge,
  chronologicalAge,
  currentGoal,
  onSaveGoal,
  trigger,
}: GoalSettingModalProps) {
  const [open, setOpen] = useState(false)
  const [goalAge, setGoalAge] = useState(currentGoal || Math.max(20, chronologicalAge - 5))

  const minAge = 20
  const maxAge = Math.floor(currentBiologicalAge)

  const handleSave = () => {
    onSaveGoal(goalAge)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm">
            <Target className="h-4 w-4 mr-2" />
            {currentGoal ? "Update Goal" : "Set Goal"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Set Your Biological Age Goal
          </DialogTitle>
          <DialogDescription>
            Choose a target biological age to work towards. You can only set a goal lower than your current biological
            age of {currentBiologicalAge.toFixed(1)} years.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Target Age</span>
              <span className="text-3xl font-bold text-primary">{goalAge} years</span>
            </div>
            <Slider
              value={[goalAge]}
              onValueChange={(value) => setGoalAge(value[0])}
              min={minAge}
              max={maxAge}
              step={0.5}
              className="w-full"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{minAge} years</span>
              <span>{maxAge} years</span>
            </div>
          </div>
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Current Biological Age:</span>
              <span className="font-medium">{currentBiologicalAge.toFixed(1)} years</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Your Goal:</span>
              <span className="font-medium text-primary">{goalAge} years</span>
            </div>
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>Improvement Needed:</span>
              <span className="text-teal-600">{(currentBiologicalAge - goalAge).toFixed(1)} years</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Goal</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
