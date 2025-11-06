import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useFirebase } from "@/context/Firebase"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const PortfolioAdminPage: React.FC = () => {
  const navigate = useNavigate()
  const { handleCreateNewList } = useFirebase() || {}

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [techInput, setTechInput] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    image: null as File | null,
    description: "",
    technologies: [] as string[],
    client: "",
    year: "",
    createdAt: "",
  })

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, files } = e.target as HTMLInputElement

    if (name === "image" && files && files.length > 0) {
      setFormData({ ...formData, image: files[0] })
    } else if (name === "technologies") {
      setTechInput(value)
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const techArray = techInput
        .split(/[\s,]+/)
        .map((t) => t.trim())
        .filter((t) => t !== "")

      const finalData = {
        ...formData,
        technologies: techArray,
      }

      if (!finalData.name || !finalData.category || !finalData.image) {
        toast.error("⚠️ Please fill all required fields!")
        setIsSubmitting(false)
        return
      }

      const data = await handleCreateNewList(
        finalData.name,
        finalData.category,
        finalData.description,
        finalData.technologies,
        finalData.client,
        finalData.year,
        finalData.createdAt,
        finalData.image
      )

      if (data && data.id) {
        toast.success("✅ Project added successfully!")
        setFormData({
          name: "",
          category: "",
          image: null,
          description: "",
          technologies: [],
          client: "",
          year: "",
          createdAt: "",
        })
        setTechInput("")
      } else {
        toast.error("⚠️ Something went wrong while saving project!")
      }
    } catch (error) {
      console.error("🔥 Upload error:", error)
      toast.error("❌ Failed to add project")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-20 px-4 flex justify-center items-center drop-shadow-lg">
      <div className="animate-fade-in mx-4 w-[600px] md:w-[700px]">
        <Card className="service-card w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Add New Project to Portfolio
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Project Title *
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Memesta Services"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-background border border-border rounded-md focus:border-primary transition-colors"
                  required
                >
                  <option value="">Select category</option>
                  <option value="Website Development">Website Development</option>
                  <option value="Mobile App Development">
                    Mobile App Development
                  </option>
                  <option value="AI/ML Solutions">AI/ML Solutions</option>
                  <option value="Consultation">Consultation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Image *</label>
                <Input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description *
                </label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Write a short description..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Technologies * (comma or space separated)
                </label>
                <Input
                  type="text"
                  name="technologies"
                  value={techInput}
                  onChange={handleInputChange}
                  placeholder="React, Tailwind CSS, Node.js"
                  required
                />
                {techInput && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {techInput
                      .split(/[\s,]+/)
                      .filter((t) => t.trim() !== "")
                      .map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Client *</label>
                <Input
                  type="text"
                  name="client"
                  value={formData.client}
                  onChange={handleInputChange}
                  placeholder="Memesta Services Pvt. Ltd."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Year *</label>
                <Input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  placeholder="2024"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Date *</label>
                <Input
                  type="date"
                  name="createdAt"
                  value={formData.createdAt}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-lg py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Add Project"}
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PortfolioAdminPage
