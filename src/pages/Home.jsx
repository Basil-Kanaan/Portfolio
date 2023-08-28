import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import ContactSection from "../components/ContactSection";
import SectionDivider from "../components/SectionDivider";
import AboutMe from "../components/AboutMe";

const Home = () => {

    return (
        <div>
            <HeroSection/>
            <AboutMe/>
            <SectionDivider/>
            <ServicesSection/>
            <SectionDivider/>
            <ContactSection/>
        </div>
    );
};

export default Home;
