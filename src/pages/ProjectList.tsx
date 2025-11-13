import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useFirebase } from '@/context/Firebase';
import { deleteDoc,doc, QueryDocumentSnapshot, type DocumentData } from 'firebase/firestore';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {firestore} from "../context/Firebase"
import { toast } from 'react-toastify';



const ProjectList = () => {

const navigate = useNavigate()
const [portfolioData, setPortFolioData] = useState<any[]>([]);

const [loading, setLoading] = useState(true)

  const [selectedCategory,setSelectedCategory] = useState('All');
  
  const { getData, getImagesUrl } = useFirebase();

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        setLoading(true)
        const snapshot = await getData();
        const dataList = await Promise.all(
          snapshot.docs.map(async (doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data();
            const imageUrl = data.imageURL
              ? await getImagesUrl(data.imageURL)
              : null;
            return { id: doc.id, ...data, imageUrl };
          })
        );
        setPortFolioData(dataList);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      }
    };

    fetchData();
  }, [getData, getImagesUrl]);

  // console.log(portfolioData);

  const categories = ['All', 'Website Development', 'Mobile App Development', 'AI/ML Solutions'];
  


    // Filter + Sort by date
  const sortedProjects = [...portfolioData]
    .filter(
      (project) =>
        selectedCategory === 'All' || project.category === selectedCategory
    )
    .sort((a, b) => {
      const aDate = a.createdAt ? new Date(a.createdAt) : new Date(0);
      const bDate = b.createdAt ? new Date(b.createdAt) : new Date(0);
      return bDate.getTime() - aDate.getTime();
    });


    // handle delete 

    async function  handleDelete(id:string) {
      console.log(id);

         try {
      
       await deleteDoc(doc(firestore,"portfolioAdmin",id))

       toast.success("project delete successfully...")
      
        setPortFolioData((prevUsers) => prevUsers.filter((project) => project.id !== id));

    } catch (error) {
      console.log(error);
      
    }
      
    }


  return (
   <div className="min-h-screen bg-gradient-hero overflow-x-hidden pt-12">
      {/* Hero Section */}
      <section className="py-10 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold mb-6">
            Our <span className="text-gradient">Portfolio</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Explore our latest projects and see how we've helped businesses
            transform their digital presence with innovative solutions.
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg border transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-gradient-card border-border text-foreground hover:bg-primary hover:text-primary-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
   {loading ?     <div className=" bg-gradient-hero flex items-center justify-center pb-20">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-xl text-blue-500">Loading Projects...</p>
      </div>

    </div>:    <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProjects.map((project, index) => (
              <Card
                key={project.id}
                className="service-card group cursor-pointer  overflow-hidden h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* ✅ Image Rendering Safely */}
                <div className="aspect-video bg-gradient-card flex items-center justify-center overflow-hidden">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title || 'Project image'}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center text-5xl text-muted-foreground h-full">
                      📱
                    </div>
                  )}
                </div>

                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-accent font-medium text-blue-500">
                      {project.category || 'Uncategorized'}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {project.year || '—'}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.name || 'Untitled Project'}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description || 'No description available.'}
                  </p>

                  {/* Client Info */}
                  {project.client && (
                    <div className="mb-4">
                      <span className="text-sm font-medium text-foreground">
                        Client:{' '}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {project.client}
                      </span>
                    </div>
                  )}

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-4">
                      <div className="text-sm font-medium text-foreground mb-2">
                        Technologies:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech: string) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Project Links */}
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full mt-4 btn-outline-glow py-2 text-sm group-hover:btn-electric transition-all block text-center"
                    >
                      View Project Details
                    </a>
                  ) : (
                    <button
                      className="w-full mt-4 btn-outline-glow py-2 text-sm group-hover:btn-electric transition-all"
                      disabled
                    >
                      View Project Details
                    </button>
                  )}

<div className='flex justify-between pt-8 '>

<Popover>
  <PopoverTrigger asChild>

  <button 
  className=' border  px-3 py-1  rounded-md bg-[#262626] cursor-pointer hover:bg-[#171717]'>Delete Project</button>

  </PopoverTrigger>
  <PopoverContent className='flex items-center flex-col' >
    <h1>you want to delete this project</h1>

    <button 
    onClick={() => handleDelete(project.id)}
    className=' border  px-3 py-1  rounded-md bg-[#262626] cursor-pointer hover:bg-[#171717] mt-5'>Confirm</button>
  </PopoverContent>
</Popover>



  <button
  onClick={() => navigate("/editProject",{state:{project}})} 
  className='border  px-3 py-1  rounded-md bg-[#262626] hover:bg-[#171717] cursor-pointer '
  >Update Project</button>

</div>

                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>}

      {/* Stats Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">100%</div>
              <div className="text-muted-foreground">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyber-pink mb-2">98%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-neon-purple mb-2">3+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-card p-12 rounded-2xl border border-border max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Start Your{' '}
              <span className="text-gradient">Next Project?</span>
            </h3>
            <p className="text-muted-foreground mb-6 text-lg">
              Let's create something amazing together. Get in touch to discuss
              your project and see how we can bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact">
                <button className="btn-electric text-lg px-8 py-4">
                  Start Your Project
                </button>
              </a>
              <a href="tel:+919910071697">
                <button className="btn-outline-glow text-lg px-8 py-4">
                  Schedule Call
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProjectList
