import Hero from "@/components/sections/Hero";
import CourseSection from '../components/sections/CourseSection'
import ContactForm from "@/components/sections/ContactForm";

export default function Home() {
  return (
    <main>
      <Hero />
      <CourseSection />
      <ContactForm />
    </main>
  );
}