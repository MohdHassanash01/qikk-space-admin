
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFirebase } from "@/context/Firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";

import {firestore} from "../context/Firebase"

const EditProject: React.FC = () => {
   
  const location = useLocation()  
  const navigate = useNavigate();

  const { isloggedIn } = useFirebase(); // ✅ Correct usage, no fallback

const data = location.state.project

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [techInput, setTechInput] = useState(data.technologies.join(", "));

  const [formData, setFormData] = useState({
    name: data.name,
    category: data.category,
    description: data.description,
    technologies: data.technologies,
    client: data.client,
    year: data.year,
    createdAt: data.createdAt,
   image: null as File | null,
    url:data.url,
  });

  console.log(location);
  

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target as HTMLInputElement;

    if (name === "technologies") {
      setTechInput(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const techArray = techInput
        .split(/[\s,]+/)
        .map((t: string) => t.trim())
        .filter((t: string) => t !== "");

      const finalData = {
        ...formData,
        technologies: techArray,
      };

      // ✅ Validation
      if (!finalData.name || !finalData.category ) {
        toast.error("⚠️ Please fill all required fields!");
        setIsSubmitting(false);
        return;
      }

    console.log(finalData);

    const docRef = doc(firestore as any,"portfolioAdmin",data.id)

    const updateData = await updateDoc(docRef,finalData)

    console.log(updateData);
    
        toast.success("✅ Project updated successfully!");
        setFormData({
          name: "",
          category: "",
          image: null,
          description: "",
          technologies: [],
          client: "",
          url:"",
          year: "",
          createdAt: "",
        });
        setTechInput("");
        navigate("/projects")

    } catch (error) {
      console.error("🔥 Upload error:", error);
      toast.error("❌ Failed to add project");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isloggedIn) {
      navigate("/signin");
    }
  }, [isloggedIn, navigate]);

  return (
    <div className="py-20 px-4 flex justify-center items-center drop-shadow-lg">
      <div className="animate-fade-in mx-4 w-[600px] md:w-[700px]">
        <Card className="service-card w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Update Project
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Title */}
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

              {/* Category */}
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

              {/* Image Upload */}
              {/* <div>
                <label className="block text-sm font-medium mb-2">Image *</label>
                <Input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
                //   required
                />
              </div> */}

              {/* Description */}
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

              {/* Technologies */}
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
                      .filter((t:string) => t.trim() !== "")
                      .map((tech:string, i:number) => (
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

              {/* Client */}
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

                {/* company url */}
              <div>
                <label className="block text-sm font-medium mb-2">Company Url *</label>
                <Input
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="https://random-url.com/"
                  required
                />
              </div>

              {/* Year */}
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

              {/* Date */}
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

              {/* Submit Button */}
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
  );
};

export default EditProject;
