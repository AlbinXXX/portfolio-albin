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
                
                <div className="relative z-20 flex-1 px-6 py-20 mt-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                                Get In Touch
                            </h1>
                            <p className="text-lg md:text-xl text-white font-mono mb-8">
                                INSERT INTO conversations VALUES ('your_idea', 'my_expertise', 'amazing_results');
                            </p>
                            <p className="text-white max-w-2xl mx-auto">
                                Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
                            </p>
                        </div>

                        <div className="flex justify-center">
                            <div className="transform scale-75 md:scale-100">
                                <ContactMagicBento />
                            </div>
                        </div>

                        <div className="text-center mt-16">
                            <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-white/10 p-8 max-w-lg mx-auto">
                                <h3 className="font-semibold text-white text-lg mb-4">Ready to Start Your Project?</h3>
                                <p className="text-white/80">
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
        <div className="contact-bento">
            <style>
                {`
                    .contact-bento .bento-section {
                        max-width: 1200px;
                        display: grid;
                        grid-template-columns: repeat(6, 1fr);
                        grid-template-rows: repeat(4, 200px);
                        gap: 16px;
                        padding: 16px;
                    }
                    
                    .contact-bento .card {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                        padding: 2rem;
                        background: rgba(6, 0, 16, 0.9) !important;
                        border: 1px solid rgba(167, 239, 158, 0.2);
                        border-radius: 20px;
                        transition: all 0.3s ease;
                        position: relative;
                        overflow: hidden;
                    }
                    
                    .contact-bento .card:hover {
                        transform: translateY(-4px);
                        border-color: rgba(167, 239, 158, 0.5);
                        box-shadow: 0 8px 25px rgba(167, 239, 158, 0.1);
                    }
                    
                    .contact-bento .card-form {
                        grid-column: 4 / 7;
                        grid-row: 1 / 5;
                        padding: 2rem;
                        text-align: left;
                        align-items: stretch;
                        justify-content: flex-start;
                    }
                    
                    .contact-bento .card-email {
                        grid-column: 1 / 2;
                        grid-row: 1;
                    }
                    
                    .contact-bento .card-location {
                        grid-column: 2 / 4;
                        grid-row: 1;
                    }
                    
                    .contact-bento .card-large {
                        grid-column: 1 / 4;
                        grid-row: 2 / 3;
                    }
                    
                    .contact-bento .card-github {
                        grid-column: 1;
                        grid-row: 3;
                    }
                    
                    .contact-bento .card-linkedin {
                        grid-column: 2;
                        grid-row: 3;
                    }
                    
                    .contact-bento .card-availability {
                        grid-column: 3;
                        grid-row: 3;
                    }
                    
                    .contact-bento .card-info {
                        grid-column: 1 / 4;
                        grid-row: 4;
                        text-align: left;
                        align-items: flex-start;
                        justify-content: flex-start;
                        padding: 1.5rem;
                    }
                    
                    .contact-bento .card-icon {
                        width: 36px;
                        height: 36px;
                        margin-bottom: 12px;
                        color: #a7ef9e;
                    }
                    
                    .contact-bento .card-icon-large {
                        width: 48px;
                        height: 48px;
                        margin-bottom: 16px;
                        color: #a7ef9e;
                    }
                    
                    .contact-bento .card-title {
                        font-size: 1.1rem;
                        font-weight: 600;
                        color: white;
                        margin-bottom: 6px;
                    }
                    
                    .contact-bento .card-title-large {
                        font-size: 1.5rem;
                        font-weight: 700;
                        color: white;
                        margin-bottom: 12px;
                    }
                    
                    .contact-bento .card-description {
                        font-size: 0.85rem;
                        color: white;
                        line-height: 1.4;
                    }
                    
                    .contact-bento .card-description-large {
                        font-size: 1rem;
                        color: white;
                        line-height: 1.5;
                        text-align: center;
                    }
                    
                    .contact-bento .card-link {
                        color: #a7ef9e;
                        text-decoration: none;
                        transition: opacity 0.3s ease;
                    }
                    
                    .contact-bento .card-link:hover {
                        opacity: 0.8;
                    }
                    
                    .contact-bento .form-title {
                        font-size: 1.75rem;
                        font-weight: 700;
                        color: white;
                        margin-bottom: 0.75rem;
                        text-align: center;
                    }
                    
                    .contact-bento .form-subtitle {
                        font-size: 0.9rem;
                        color: rgba(255, 255, 255, 0.8);
                        margin-bottom: 2rem;
                        text-align: center;
                    }
                    
                    @media (max-width: 1200px) {
                        .contact-bento .bento-section {
                            grid-template-columns: repeat(3, 1fr);
                            grid-template-rows: repeat(5, 180px);
                            max-width: 900px;
                        }
                        
                        .contact-bento .card-form {
                            grid-column: 1 / 4;
                            grid-row: 3 / 5;
                        }
                        
                        .contact-bento .card-email {
                            grid-column: 1;
                            grid-row: 1;
                        }
                        
                        .contact-bento .card-location {
                            grid-column: 2;
                            grid-row: 1;
                        }
                        
                        .contact-bento .card-large {
                            grid-column: 3;
                            grid-row: 1;
                        }
                        
                        .contact-bento .card-github {
                            grid-column: 1;
                            grid-row: 2;
                        }
                        
                        .contact-bento .card-linkedin {
                            grid-column: 2;
                            grid-row: 2;
                        }
                        
                        .contact-bento .card-availability {
                            grid-column: 3;
                            grid-row: 2;
                        }
                        
                        .contact-bento .card-info {
                            grid-column: 1 / 4;
                            grid-row: 5;
                        }
                    }
                    
                    @media (max-width: 768px) {
                        .contact-bento .bento-section {
                            grid-template-columns: 1fr;
                            grid-template-rows: repeat(8, 160px);
                            max-width: 400px;
                        }
                        
                        .contact-bento .card-form,
                        .contact-bento .card-email,
                        .contact-bento .card-location,
                        .contact-bento .card-large,
                        .contact-bento .card-github,
                        .contact-bento .card-linkedin,
                        .contact-bento .card-availability,
                        .contact-bento .card-info {
                            grid-column: 1;
                            grid-row: auto;
                        }
                        
                        .contact-bento .card-form {
                            grid-row: span 3;
                        }
                        
                        .contact-bento .card {
                            padding: 1.5rem;
                        }
                    }
                `}
            </style>
            
                        <div className="bento-section">
                <div className="card card-form">
                    <div className="form-title">Send a Message</div>
                    <div className="form-subtitle">
                        Fill out the form below and I'll get back to you as soon as possible.
                    </div>
                    <ContactForm />
                </div>

                <div className="card card-email">
                    <Mail className="card-icon" />
                    <h3 className="card-title">Email</h3>
                    <p className="card-description mt-2">
                        Response within 24 hours
                    </p>
                </div>

                <div className="card card-location">
                    <MapPin className="card-icon" />
                    <h3 className="card-title">Location</h3>
                    <p className="card-description">North Macedonia, Europe</p>
                    <p className="card-description mt-2">
                        Remote worldwide
                    </p>
                </div>

                <div className="card card-large">
                    <Clock className="card-icon-large" />
                    <h3 className="card-title-large">Let's Connect</h3>
                    <p className="card-description-large">
                        I'm always excited to work on new projects and meet interesting people. 
                        Let's discuss your vision and make it reality.
                    </p>
                </div>

                <div className="card card-github">
                    <Github className="card-icon" />
                    <h3 className="card-title">GitHub</h3>
                    <p className="card-description">
                        <a href="https://github.com/AlbinXXX" target="_blank" rel="noopener noreferrer" className="card-link">
                            @AlbinXXX
                        </a>
                    </p>
                </div>

                <div className="card card-linkedin">
                    <Linkedin className="card-icon" />
                    <h3 className="card-title">LinkedIn</h3>
                    <p className="card-description">
                        <a href="https://linkedin.com/in/albin-rushiti" target="_blank" rel="noopener noreferrer" className="card-link">
                            albin-rushiti
                        </a>
                    </p>
                </div>

                <div className="card card-availability">
                    <Clock className="card-icon" />
                    <h3 className="card-title">Available</h3>
                    <p className="card-description">
                        Currently accepting new projects
                    </p>
                </div>

                <div className="card card-info">
                    <h3 className="card-title" style={{ marginBottom: '12px' }}>What to Include</h3>
                    <ul className="text-xs text-white space-y-1" style={{ textAlign: 'left' }}>
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