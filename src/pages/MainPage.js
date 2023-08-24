import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import ResumeSection from '../components/ResumeSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from "../components/ContactSection";
import SectionDivider from "../components/SectionDivider";

const MainPage = () => {
    return (
        <div>
            <HeroSection/>
            <ServicesSection/>
            <SectionDivider/>
            <ResumeSection/>
            <SectionDivider/>
            <ProjectsSection/>
            <SectionDivider/>
            <ContactSection/>
        </div>
    );
};

export default MainPage;
