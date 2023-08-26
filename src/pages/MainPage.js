import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import ResumeSection from '../components/ResumeSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from "../components/ContactSection";
import SectionDivider from "../components/SectionDivider";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";

const MainPage = () => {

    return (
        <div>
            <HeroSection/>
            <ServicesSection />
            <SectionDivider/>
            <ResumeSection/>
            <SectionDivider/>
            <ProjectsSection/>
            <SectionDivider/>
            <ContactSection/>

            {/* Transparent NavBar and SideBar*/}
            <NavBar />
            <SideBar />
        </div>
    );
};

export default MainPage;
