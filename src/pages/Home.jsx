import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import ContactSection from "../components/ContactSection";
// import SectionDivider from "../components/SectionDivider";
import AboutMe from "../components/AboutMe";
import ProjectsSection from "../components/ProjectsSection";

const Home = () => {

    return (
        <div>
            <div id="hero-section">
                <HeroSection/>
            </div>
            <div id="about-section">
                <AboutMe/>
            </div>
            <div id="services-section">
                <ServicesSection/>
            </div>
            <div id="projects-section">
                <ProjectsSection/>
            </div>
            <div id="contact-section">
                <ContactSection/>
            </div>
        </div>
    );
};

export default Home;
