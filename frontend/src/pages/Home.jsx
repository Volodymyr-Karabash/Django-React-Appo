import DoctorSection from "../components/doctors/DoctorSection";
import Hero from "../components/Hero";
import BookProcess from "../components/BookProcess";
import Subscribe from "../components/Subscribe";
import FilterSpecialist from "../components/FilterSpecialist";

export default function Home() {
  return (
    <>
    <Hero />
    <DoctorSection />
    <FilterSpecialist />  
    <BookProcess />
    <Subscribe />
  </>
  )
}
