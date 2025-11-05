import { Head, Link } from '@inertiajs/react';
import { ContactForm } from '@/components/forms/ContactForm';
import { Mail, Phone, MapPin, Clock, Github, Linkedin } from 'lucide-react';
import MainLayout from '@/components/layouts/MainLayout';
import FaultyTerminal from '@/components/FaultyTerminal';
import MagicBento from '@/components/MagicBento';

export default function Contact() {
    return (
        <MainLayout>
            <Head title="Contact - Albin Rushiti" />
            
            <section className="min-h-screen relative flex flex-col overflow-hidden">
                <div className="absolute inset-0 w-full h-full">
                    <FaultyTerminal 
                        scale={1.5}
                        gridMul={[2, 1]}
                        digitSize={1.2}
                        timeScale={0.5}
                        noiseAmp={1}
                        brightness={0.6}
                        scanlineIntensity={0.5}
                        curvature={0.1}
                        mouseStrength={0.5}
                        mouseReact={true}
                        pageLoadAnimation={true}
                        tint="#a7ef9e"
                        glitchAmount={1}
                        flickerAmount={1}
                        chromaticAberration={0}
                        dither={false}
                        style={{ 
                            width: '100%', 
                            height: '100%'
                        }}
                    />
                </div>
                
                                <div className="relative z-20 flex-1 px-4 sm:px-6 py-8 sm:py-12 mt-16 sm:mt-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-6 sm:mb-8 md:mb-16">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                                Get In Touch
                            </h1>
                            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-mono mb-3 sm:mb-4 md:mb-8 px-2 break-all sm:break-normal">
                                INSERT INTO conversations VALUES ('your_idea', 'my_expertise', 'amazing_results');
                            </p>
                            <p className="text-white max-w-2xl mx-auto text-xs sm:text-sm md:text-base px-4">
                                Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
                            </p>
                        </div>
                    </div>

                    {/* Full width contact section */}
                    <div className="w-full px-4 sm:px-6">
                        <ContactMagicBento />
                    </div>

                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mt-6 sm:mt-8 md:mt-16 px-4">
                            <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-white/10 p-3 sm:p-4 md:p-8 max-w-lg mx-auto">
                                <h3 className="font-semibold text-white text-sm sm:text-base md:text-lg mb-2 sm:mb-3 md:mb-4">Ready to Start Your Project?</h3>
                                <p className="text-white/80 text-xs sm:text-sm md:text-base">
                                    From concept to deployment, I'll help you build something amazing. 
                                    Let's discuss your vision and make it reality.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

function ContactMagicBento() {
    return (
        <div className="w-full">
            {/* Desktop Layout: 2 columns - Full width */}
            <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8 max-w-none">
                {/* Left side - Contact Cards */}
                <div className="grid grid-cols-3 grid-rows-4 gap-4 h-fit">
                    {/* Email Card */}
                    <div className="col-span-1 row-span-1 bg-black/90 border border-primary/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
                        <Mail className="w-8 h-8 text-primary mb-3" />
                        <h3 className="text-white font-semibold text-lg mb-2">Email</h3>
                        <p className="text-white/80 text-sm">Response within 24 hours</p>
                    </div>

                    {/* Location Card */}
                    <div className="col-span-2 row-span-1 bg-black/90 border border-primary/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
                        <MapPin className="w-8 h-8 text-primary mb-3" />
                        <h3 className="text-white font-semibold text-lg mb-2">Location</h3>
                        <p className="text-white/80 text-sm">North Macedonia, Europe</p>
                        <p className="text-white/80 text-sm mt-1">Remote worldwide</p>
                    </div>

                    {/* Let's Connect Card */}
                    <div className="col-span-3 row-span-1 bg-black/90 border border-primary/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
                        <Clock className="w-12 h-12 text-primary mb-4" />
                        <h3 className="text-white font-bold text-xl mb-3">Let's Connect</h3>
                        <p className="text-white/80 text-base">
                            I'm always excited to work on new projects and meet interesting people. 
                            Let's discuss your vision and make it reality.
                        </p>
                    </div>

                    {/* GitHub Card */}
                    <div className="col-span-1 row-span-1 bg-black/90 border border-primary/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
                        <Github className="w-8 h-8 text-primary mb-3" />
                        <h3 className="text-white font-semibold text-lg mb-2">GitHub</h3>
                        <a href="https://github.com/AlbinXXX" target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:opacity-80 transition-opacity">
                            @AlbinXXX
                        </a>
                    </div>

                    {/* LinkedIn Card */}
                    <div className="col-span-1 row-span-1 bg-black/90 border border-primary/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
                        <Linkedin className="w-8 h-8 text-primary mb-3" />
                        <h3 className="text-white font-semibold text-lg mb-2">LinkedIn</h3>
                        <a href="https://linkedin.com/in/albin-rushiti" target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:opacity-80 transition-opacity">
                            albin-rushiti
                        </a>
                    </div>

                    {/* Available Card */}
                    <div className="col-span-1 row-span-1 bg-black/90 border border-primary/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
                        <Clock className="w-8 h-8 text-primary mb-3" />
                        <h3 className="text-white font-semibold text-lg mb-2">Available</h3>
                        <p className="text-white/80 text-sm">Currently accepting new projects</p>
                    </div>

                    {/* What to Include Card */}
                    <div className="col-span-3 row-span-1 bg-black/90 border border-primary/20 rounded-2xl p-6 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
                        <h3 className="text-white font-semibold text-lg mb-4">What to Include</h3>
                        <ul className="text-white/80 text-sm space-y-2 text-left">
                            <li>• Brief description of your project</li>
                            <li>• Timeline and budget (if known)</li>
                            <li>• Any specific requirements or technologies</li>
                            <li>• How you heard about my work</li>
                        </ul>
                    </div>
                </div>

                {/* Right side - Contact Form */}
                <div className="bg-black/90 border border-primary/20 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300">
                    <h2 className="text-white font-bold text-2xl mb-3 text-center">Send a Message</h2>
                    <p className="text-white/80 text-sm mb-8 text-center">
                        Fill out the form below and I'll get back to you as soon as possible.
                    </p>
                    <ContactForm />
                </div>
            </div>

            {/* Mobile/Tablet Layout: Stacked - Full width */}
            <div className="lg:hidden space-y-6 max-w-4xl mx-auto">
                {/* Contact Form First on Mobile */}
                <div className="bg-black/90 border border-primary/20 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300">
                    <h2 className="text-white font-bold text-xl mb-3 text-center">Send a Message</h2>
                    <p className="text-white/80 text-sm mb-6 text-center">
                        Fill out the form below and I'll get back to you as soon as possible.
                    </p>
                    <ContactForm />
                </div>

                {/* Contact Cards Grid - Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email Card */}
                    <div className="bg-black/90 border border-primary/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
                        <Mail className="w-8 h-8 text-primary mb-3" />
                        <h3 className="text-white font-semibold text-lg mb-2">Email</h3>
                        <p className="text-white/80 text-sm">Response within 24 hours</p>
                    </div>

                    {/* Location Card */}
                    <div className="bg-black/90 border border-primary/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
                        <MapPin className="w-8 h-8 text-primary mb-3" />
                        <h3 className="text-white font-semibold text-lg mb-2">Location</h3>
                        <p className="text-white/80 text-sm">North Macedonia, Europe</p>
                        <p className="text-white/80 text-sm mt-1">Remote worldwide</p>
                    </div>

                    {/* GitHub Card */}
                    <div className="bg-black/90 border border-primary/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
                        <Github className="w-8 h-8 text-primary mb-3" />
                        <h3 className="text-white font-semibold text-lg mb-2">GitHub</h3>
                        <a href="https://github.com/AlbinXXX" target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:opacity-80 transition-opacity">
                            @AlbinXXX
                        </a>
                    </div>

                    {/* LinkedIn Card */}
                    <div className="bg-black/90 border border-primary/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
                        <Linkedin className="w-8 h-8 text-primary mb-3" />
                        <h3 className="text-white font-semibold text-lg mb-2">LinkedIn</h3>
                        <a href="https://linkedin.com/in/albin-rushiti" target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:opacity-80 transition-opacity">
                            albin-rushiti
                        </a>
                    </div>
                </div>

                {/* Let's Connect Card - Mobile */}
                <div className="bg-black/90 border border-primary/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
                    <Clock className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-white font-bold text-xl mb-3">Let's Connect</h3>
                    <p className="text-white/80 text-base">
                        I'm always excited to work on new projects and meet interesting people. 
                        Let's discuss your vision and make it reality.
                    </p>
                </div>

                {/* Available Card - Mobile */}
                <div className="bg-black/90 border border-primary/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
                    <Clock className="w-8 h-8 text-primary mb-3" />
                    <h3 className="text-white font-semibold text-lg mb-2">Available</h3>
                    <p className="text-white/80 text-sm">Currently accepting new projects</p>
                </div>

                {/* What to Include Card - Mobile */}
                <div className="bg-black/90 border border-primary/20 rounded-2xl p-6 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
                    <h3 className="text-white font-semibold text-lg mb-4">What to Include</h3>
                    <ul className="text-white/80 text-sm space-y-2 text-left">
                        <li>• Brief description of your project</li>
                        <li>• Timeline and budget (if known)</li>
                        <li>• Any specific requirements or technologies</li>
                        <li>• How you heard about my work</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}