"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, CheckCircle } from "lucide-react"

interface EnquiryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface FormData {
  name: string
  email: string
  phone: string
  hasWorkedBefore: string
  projectType: string
  location: string
  timeline: string
  budget: string
  builder: string
  builderDetails: string
  designBrief: string
  heardFrom: string
  otherSource: string
}

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  hasWorkedBefore: "",
  projectType: "",
  location: "",
  timeline: "",
  budget: "",
  builder: "",
  builderDetails: "",
  designBrief: "",
  heardFrom: "",
  otherSource: "",
}

export function EnquiryModal({ open, onOpenChange }: EnquiryModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [submitted, setSubmitted] = useState(false)

  const totalSteps = 8

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      onOpenChange(false)
      setStep(1)
      setFormData(initialFormData)
      setSubmitted(false)
    }, 2500)
  }

  const handleClose = () => {
    onOpenChange(false)
    setStep(1)
    setFormData(initialFormData)
  }

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-md border-border">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-6 p-4 bg-secondary rounded-full">
              <CheckCircle className="w-12 h-12 text-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-3">Thank You</h2>
            <p className="text-center text-muted-foreground leading-relaxed">
              Thanks for reaching out. We&apos;ve received your enquiry and will be in touch soon.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl border-border max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Project Enquiry</DialogTitle>
          <DialogDescription className="text-base text-foreground font-medium">
            To get started, we ask that you provide some initial information about your project to help us determine
            whether we&apos;re the right fit. Our team will review the details and be in touch to discuss next steps
            within 5 business days.
          </DialogDescription>
        </DialogHeader>

        <div className="my-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-muted-foreground">
              ({String(step).padStart(2, "0")}/{String(totalSteps).padStart(2, "0")})
            </span>
          </div>
          <div className="w-full bg-secondary h-px">
            <div
              className="bg-foreground h-px transition-all duration-500"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-6 min-h-80">
          {/* Step 1: Your Personal Details */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold">Your Personal Details</h3>
              <div>
                <Label htmlFor="name" className="font-medium">
                  Name <span className="text-accent">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Please enter your name."
                  className="mt-2 border-border bg-secondary"
                />
              </div>
              <div>
                <Label htmlFor="email" className="font-medium">
                  Email Address <span className="text-accent">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Please enter your email."
                  className="mt-2 border-border bg-secondary"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Optional"
                  className="mt-2 border-border bg-secondary"
                />
              </div>
            </div>
          )}

          {/* Step 2: Have you worked with an architect before? */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold">
                Have you worked with an architect before? <span className="text-accent">*</span>
              </h3>
              <RadioGroup
                value={formData.hasWorkedBefore}
                onValueChange={(value) => handleSelectChange("hasWorkedBefore", value)}
              >
                {[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ].map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 mb-4">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="font-normal cursor-pointer text-base">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Step 3: What type of project are you looking for? */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold">
                What type of project are you looking for? <span className="text-accent">*</span>
              </h3>
              <div className="space-y-3">
                {[
                  { id: "new-home", label: "New Home" },
                  { id: "renovation", label: "Renovation + Extensions" },
                  { id: "commercial", label: "Commercial Project" },
                  { id: "interior", label: "Interior Design Only" },
                  { id: "other", label: "Other / Unsure" },
                ].map((type) => (
                  <div key={type.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={type.id}
                      checked={formData.projectType.includes(type.id)}
                      onCheckedChange={(checked) => {
                        const current = formData.projectType.split(",").filter(Boolean)
                        const updated = checked ? [...current, type.id] : current.filter((item) => item !== type.id)
                        handleSelectChange("projectType", updated.join(","))
                      }}
                    />
                    <Label htmlFor={type.id} className="font-normal cursor-pointer text-base">
                      {type.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Where are you planning to build? */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold">
                Where are you planning to build your project? <span className="text-accent">*</span>
              </h3>
              <div>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Please enter a build location for your project."
                  className="border-border bg-secondary"
                />
              </div>
              <div>
                <Label className="font-medium block mb-3">Project timeline for designs and/or build (if known)</Label>
                <Textarea
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  placeholder="Note: our studio has an 8-12 week minimum wait time to commence new projects."
                  className="border-border bg-secondary min-h-24 text-sm"
                />
              </div>
            </div>
          )}

          {/* Step 5: Project budget range */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">Project budget range (if known)</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Note: our design fees start from a minimum of $4,500-$6,000 p/m². Project costs can vary
                  significantly.
                </p>
              </div>
              <RadioGroup value={formData.budget} onValueChange={(value) => handleSelectChange("budget", value)}>
                {[
                  { value: "under-500k", label: "< $500k" },
                  { value: "500k-1m", label: "$500k - $1 Mil" },
                  { value: "1m-1.5m", label: "$1 Mil - $1.5 Mil" },
                  { value: "1.5m-2.5m", label: "$1.5 Mil - $2.5 Mil" },
                  { value: "2.5m-plus", label: "$2.5 Mil+" },
                ].map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 mb-4">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="font-normal cursor-pointer text-base">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Step 6: Have you engaged a builder? */}
          {step === 6 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold">Have you engaged a builder?</h3>
              <RadioGroup value={formData.builder} onValueChange={(value) => handleSelectChange("builder", value)}>
                {[
                  { value: "yes", label: "Yes" },
                  { value: "planning", label: "NOT YET, BUT WE HAVE SOMEONE IN MIND" },
                  { value: "help", label: "NO, WE WOULD LIKE HELP WITH SELECTING A BUILDER" },
                ].map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 mb-4">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="font-normal cursor-pointer text-base">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {formData.builder === "yes" && (
                <div className="mt-6">
                  <Label htmlFor="builderDetails" className="font-medium">
                    Builder Details
                  </Label>
                  <Textarea
                    id="builderDetails"
                    name="builderDetails"
                    value={formData.builderDetails}
                    onChange={handleInputChange}
                    placeholder="Please provide builder name and other details"
                    className="mt-2 border-border bg-secondary min-h-24"
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 7: Design Brief */}
          {step === 7 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold">Design Brief</h3>
              <Textarea
                name="designBrief"
                value={formData.designBrief}
                onChange={handleInputChange}
                placeholder="Provide any additional information, ideas and details you may have for your project here"
                className="border-border bg-secondary min-h-32"
              />
            </div>
          )}

          {/* Step 8: Additional Information */}
          {step === 8 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold">Additional Information</h3>
              <div>
                <Label className="font-medium block mb-3">How did you hear about us?</Label>
                <RadioGroup
                  value={formData.heardFrom}
                  onValueChange={(value) => handleSelectChange("heardFrom", value)}
                >
                  {[
                    { value: "friend", label: "Friend" },
                    { value: "family", label: "Family" },
                    { value: "google", label: "Google" },
                    { value: "instagram", label: "Instagram" },
                    { value: "other", label: "Other" },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-3 mb-3">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="font-normal cursor-pointer text-base">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              {formData.heardFrom === "other" && (
                <div className="mt-4">
                  <Input
                    name="otherSource"
                    value={formData.otherSource}
                    onChange={handleInputChange}
                    placeholder="Please provide details"
                    className="border-border bg-secondary"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 justify-between pt-8 border-t border-border">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
            className="flex items-center gap-2 border-border hover:bg-secondary bg-transparent"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex gap-3">
            {step < totalSteps ? (
              <Button
                onClick={handleNext}
                className="bg-foreground text-primary-foreground hover:bg-foreground/90 transition-elegant"
              >
                Next →
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-foreground text-primary-foreground hover:bg-foreground/90 transition-elegant"
              >
                Submit Form →
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
