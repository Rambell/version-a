'use client'

import Hero from "@/components/sections/Hero";
import CourseSection from '../components/sections/CourseSection'
import ContactForm from "@/components/sections/ContactForm";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <main>
      <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <CourseSection searchQuery={searchQuery} />
      <ContactForm />
    </main>
  );
}