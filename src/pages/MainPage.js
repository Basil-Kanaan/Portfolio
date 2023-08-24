import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import ResumeSection from '../components/ResumeSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from "../components/ContactSection";

const MainPage = () => {
    return (
        <div>
            <HeroSection />
            <ServicesSection />
            <ResumeSection />
            <ProjectsSection />
            <ContactSection />
        </div>
    );
};

export default MainPage;
