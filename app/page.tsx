"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Phone, Mail, MapPin, Clock, CheckCircle, Heart, Brain, Shield, Menu, X, ChevronUp } from 'lucide-react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    preferredTime: '',
    agreeToContact: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setShowScrollTop(currentScrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
        }
      });
    }, observerOptions);

    // Observe all elements with scroll-animate class
    const animateElements = document.querySelectorAll('.scroll-animate');
    animateElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Please tell us what brings you here';
    if (!formData.preferredTime.trim()) newErrors.preferredTime = 'Preferred time is required';
    if (!formData.agreeToContact) newErrors.agreeToContact = 'You must agree to be contacted';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      console.log('Form submitted:', formData);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          <div className="font-serif font-medium text-lg sm:text-xl text-gray-900 truncate">
            Dr. Serena Blake
          </div>
            
            {/* Desktop Menu */}
            
            <b><div className="hidden md:flex space-x-6 lg:space-x-8">
              <a href="#home" className="text-gray-700 hover:text-primary transition-colors text-sm lg:text-base">Home</a>
              <a href="#about" className="text-gray-700 hover:text-primary transition-colors text-sm lg:text-base">About</a>
              <a href="#services" className="text-gray-700 hover:text-primary transition-colors text-sm lg:text-base">Services</a>
              <a href="#faq" className="text-gray-700 hover:text-primary transition-colors text-sm lg:text-base">FAQ</a>
              <a href="#contact" className="text-gray-700 hover:text-primary transition-colors text-sm lg:text-base">Contact</a>
            </div></b>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#home" className="block px-3 py-2 text-gray-600 hover:text-teal-600" onClick={() => setIsMenuOpen(false)}>Home</a>
                <a href="#about" className="block px-3 py-2 text-gray-600 hover:text-teal-600" onClick={() => setIsMenuOpen(false)}>About</a>
                <a href="#services" className="block px-3 py-2 text-gray-600 hover:text-teal-600" onClick={() => setIsMenuOpen(false)}>Services</a>
                <a href="#faq" className="block px-3 py-2 text-gray-600 hover:text-teal-600" onClick={() => setIsMenuOpen(false)}>FAQ</a>
                <a href="#contact" className="block px-3 py-2 text-gray-600 hover:text-teal-600" onClick={() => setIsMenuOpen(false)}>Contact</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-blue-400/10"></div>
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")`,
            }}
          ></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 pt-16 sm:pt-20">
          <div 
            className="transform transition-all duration-1000 ease-out scroll-animate opacity-0 translate-y-8"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          >
            {/* <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light text-gray-800 mb-4 sm:mb-6 leading-tight tracking-wide">
              Find Your Path to
              <span className="block text-teal-600 font-normal">Healing & Growth</span>
            </h1> */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-medium text-gray-900 mb-4 sm:mb-6 leading-tight max-w-4xl mx-auto">
            Find Your Path to
            <span className="text-teal-700 text-primary block">Healing & Growth</span>
          </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-12 font-light leading-relaxed max-w-3xl mx-auto px-4">
              Dr. Serena Blake, PsyD • Licensed Clinical Psychologist
Compassionate, evidence-based therapy in Los Angeles
            </p>
            <Button 
              size="lg" 
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-light rounded-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Schedule Free Consultation
           
            </Button>
            

          </div>
          
        </div>
        <div className="text-green-600 absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="text-green-600 w-5 h-8 sm:w-6 sm:h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="text-green-600 w-1 h-2 sm:h-3 bg-primary rounded-full mt-1 sm:mt-2"></div>
        </div>
      </div>

        {/* Floating Elements */}
        <div className="text-green-600 absolute top-1/4 left-4 sm:left-10 w-16 sm:w-20 h-16 sm:h-20 bg-teal-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="text-green-600 absolute bottom-1/4 right-4 sm:right-10 w-24 sm:w-32 h-24 sm:h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8 order-2 lg:order-1 scroll-animate opacity-0 translate-y-8">
              <div>
                {/* <h2 className="text-sm uppercase tracking-widest text-teal-600 mb-4 font-medium">
                  About Dr. Blake
                </h2> */}
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-800 mb-6 sm:mb-8 leading-tight font-serif font-medium text-gray-900 mb-4 sm:mb-6">
                  About Dr. Serena Blake
                </h3>
              </div>
              
              <div className="space-y-4 sm:space-y-6 text-gray-600 leading-relaxed">
                <p className="text-base sm:text-lg">
                  Dr. Serena Blake is a licensed clinical psychologist (PsyD) based in Los Angeles, CA, 
                  with eight years of experience and over 500 client sessions. She blends evidence-based 
                  approaches—like cognitive-behavioral therapy and mindfulness—with compassionate, 
                  personalized care.
                </p>
                <p className="text-base sm:text-lg">
                  Whether you meet in her Maplewood Drive office or connect virtually via Zoom, 
                  Dr. Blake is committed to creating a safe, supportive space for you to overcome anxiety, 
                  strengthen relationships, and heal from trauma.
                </p>
                <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-teal-600 h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Evidence-based therapeutic approaches</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-teal-600 h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Cognitive-behavioral therapy (CBT)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-teal-600 h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Mindfulness-based interventions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-teal-600 h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Trauma-informed care</span>
                </div>
              </div>
              </div>
              
             <div className="grid grid-cols-2 gap-6 sm:gap-8 pt-6 sm:pt-8">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">8+</div>
                  <div className="text-xl sm:text-1xl font-bold text-gray-900">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-xl sm:text-1xl font-bold text-gray-900">Client Sessions</div>
                </div>
                
              </div>
            </div>
            
            <div className="relative order-1 lg:order-2 scroll-animate opacity-0 translate-y-8">
              <div className="relative z-10 max-w-sm mx-auto lg:max-w-md">
                <img 
                  src="/image.png"
                  alt="Dr. Serena Blake"
                  className="w-full shadow-2xl"
                />
              </div>
              
              <div className="absolute -top-4 sm:-top-8 -left-4 sm:-left-8 w-full h-full bg-teal-100 -z-10"></div>
              <div className="absolute -bottom-4 sm:-bottom-8 -right-4 sm:-right-8 w-24 sm:w-32 h-24 sm:h-32 bg-blue-100"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-20 scroll-animate opacity-0 translate-y-8">
            {/* <h2 className="text-sm uppercase tracking-widest text-teal-600 mb-4 font-medium">
              Services
            </h2> */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-800 mb-6 sm:mb-8 leading-tight font-serif font-medium text-gray-900 mb-4 sm:mb-6">
              Specialized Therapeutic Services
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Evidence-based approaches tailored to your unique needs and goals
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-20">
            {/* Anxiety & Stress Management */}
            <div className="group bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 scroll-animate opacity-0 translate-y-8">
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                  alt="Anxiety and Stress Management"
                  className="w-full h-48 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-teal-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center mb-4">
                  {/* <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-teal-600 mr-3" /> */}
                  <h4 className="text-lg sm:text-xl font-light text-gray-800 font-serif font-medium text-gray-900 mb-4 sm:mb-6">Anxiety & Stress Management</h4>
                </div>
                <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  Learn effective coping strategies and mindfulness techniques to manage anxiety, 
                  reduce stress, and regain control over your thoughts and emotions.
                </p>
                <div className="text-teal-600 font-light text-base sm:text-lg">$200 / session</div>
              </div>
            </div>

            {/* Relationship Counseling */}
            <div className="group bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 scroll-animate opacity-0 translate-y-8">
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                  alt="Relationship Counseling"
                  className="w-full h-48 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-teal-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center mb-4">
                  {/* <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-teal-600 mr-3" /> */}
                  <h4 className="text-lg sm:text-xl font-light text-gray-800 font-serif font-medium text-gray-900 mb-4 sm:mb-6">Relationship Counseling</h4>
                </div>
                <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  Strengthen communication, rebuild trust, and deepen intimacy in your relationships 
                  through evidence-based therapeutic approaches.
                </p>
                <div className="text-teal-600 font-light text-base sm:text-lg">$240 / couples session</div>
              </div>
            </div>

            {/* Trauma Recovery */}
            <div className="group bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 sm:col-span-2 lg:col-span-1 scroll-animate opacity-0 translate-y-8">
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                  alt="Trauma Recovery"
                  className="w-full h-48 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-teal-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center mb-4">
                  {/* <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-teal-600 mr-3" /> */}
                  <h4 className="text-lg sm:text-xl font-light text-gray-800 font-serif font-medium text-gray-900 mb-4 sm:mb-6">Trauma Recovery</h4>
                </div>
                <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  Heal from past traumatic experiences in a safe, supportive environment using 
                  evidence-based approaches at your own pace.
                </p>
                <div className="text-teal-600 font-light text-base sm:text-lg">$200 / session</div>
              </div>
            </div>
          </div>

          {/* Office Hours */}
          <div className="bg-white shadow-lg p-6 sm:p-12 scroll-animate opacity-0 translate-y-8">
            {/* <h3 className="text-xl sm:text-2xl font-light text-gray-800 mb-6 sm:mb-8 text-center">Office Hours</h3> */}
             <h3 className="text-xl sm:text-2xl font-serif font-medium text-gray-900 mb-4 sm:mb-6 text-center">
              Office Hours & Availability
            </h3>
            {/* <div className="grid sm:grid-cols-2 gap-8 sm:gap-12">
              <div className="text-center">
                <div className="bg-teal-50 p-6 sm:p-8 mb-4">
                  <Clock className="h-10 sm:h-12 w-10 sm:w-12 text-teal-600 mx-auto mb-4" />
                  <h4 className="font-light text-gray-800 mb-2 text-base sm:text-lg">In-Person Sessions</h4>
                  <p className="text-gray-600 text-sm sm:text-base">Tuesday & Thursday</p>
                  <p className="text-gray-600 text-sm sm:text-base">10:00 AM - 6:00 PM</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-blue-50 p-6 sm:p-8 mb-4">
                  <Clock className="h-10 sm:h-12 w-10 sm:w-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-light text-gray-800 mb-2 text-base sm:text-lg">Virtual Sessions</h4>
                  <p className="text-gray-600 text-sm sm:text-base">Monday, Wednesday & Friday</p>
                  <p className="text-gray-600 text-sm sm:text-base">1:00 PM - 5:00 PM</p>
                </div>
              </div> */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 text-left">
              <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">In-Person Sessions</h4>
                <p className="text-gray-600 text-sm sm:text-base">Tuesday & Thursday</p>
                <p className="text-gray-600 text-sm sm:text-base">10:00 AM - 6:00 PM</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">1287 Maplewood Drive, Los Angeles, CA 90026</p>
              </div>
              <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Virtual Sessions</h4>
                <p className="text-gray-600 text-sm sm:text-base">Monday, Wednesday & Friday</p>
                <p className="text-gray-600 text-sm sm:text-base">1:00 PM - 5:00 PM</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">Secure Zoom video sessions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-20 scroll-animate opacity-0 translate-y-8">
            {/* <h2 className="text-sm uppercase tracking-widest text-teal-600 mb-4 font-medium">
              FAQ
            </h2> */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-4 sm:mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="scroll-animate opacity-0 translate-y-8">
            <Accordion type="single" collapsible className="space-y-4 sm:space-y-6">
              <AccordionItem value="insurance" className="border border-gray-200 px-4 sm:px-8 py-2">
                <AccordionTrigger className="text-left text-base sm:text-lg font-serif font-medium text-gray-800 hover:text-teal-600 transition-colors">
                  Do you accept insurance?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-4 pb-6 leading-relaxed text-sm sm:text-base">
                  No, I do not accept insurance directly. However, I provide a detailed superbill 
                  after each session that you can submit to your insurance company for potential 
                  reimbursement. Many clients find they can recover a significant portion of their 
                  therapy costs this way.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="online" className="border border-gray-200 px-4 sm:px-8 py-2">
                <AccordionTrigger className="text-left text-base sm:text-lg font-serif font-medium text-gray-800 hover:text-teal-600 transition-colors">
                  Are online sessions available?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-4 pb-6 leading-relaxed text-sm sm:text-base">
                  Yes! I offer virtual therapy sessions via Zoom on Mondays, Wednesdays, and Fridays 
                  from 1:00 PM to 5:00 PM. Online sessions are just as effective as in-person therapy 
                  and provide the convenience of receiving support from your own space.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cancellation" className="border border-gray-200 px-4 sm:px-8 py-2">
                <AccordionTrigger className="text-left text-base sm:text-lg font-serif font-medium text-gray-800 hover:text-teal-600 transition-colors">
                  What is your cancellation policy?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-4 pb-6 leading-relaxed text-sm sm:text-base">
                  I require 24-hour advance notice for cancellations or rescheduling. Cancellations 
                  made with less than 24 hours notice will be charged the full session fee. Emergency 
                  situations are handled on a case-by-case basis.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
           <div className="mt-8 sm:mt-12 text-center px-4">
          <b><p className="text-gray-600 mb-4 text-sm sm:text-base">Still have questions?</p></b>
          <b>
            <p className="text-gray-900 text-sm sm:text-base">
            Contact me at{" "}
            <a href="mailto:serena@blakepsychology.com" className="text-teal-600 text-primary hover:underline font-medium break-all ">
              serena@blakepsychology.com
            </a>
            {" "}or{" "}
            <a href="tel:+13235550192" className="text-primary hover:underline font-medium">
              (323) 555-0192
            </a>
          </p>
          </b>
        </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-20 scroll-animate opacity-0 translate-y-8">
            {/* <h2 className="text-sm uppercase tracking-widest text-teal-600 mb-4 font-medium">
              Contact
            </h2> */}
           <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-4 sm:mb-6">
              Get in Touch
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 font-light">
              Ready to begin your journey? Let's schedule your free consultation
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Contact Info */}
            <div className="space-y-8 sm:space-y-12 scroll-animate opacity-0 translate-y-8">
              <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-medium text-gray-900 mb-4 sm:mb-6">
                  Contact Information
                </h3>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <MapPin className="text-teal-600 h-5 w-5 sm:h-6 sm:w-6 text-primary mt-1 flex-shrink-0" />
                    <b>
                    <div>
                      <div className="font-medium text-gray-900 text-sm sm:text-base">Office Location</div>
                      <div className="text-gray-600 text-sm sm:text-base">1287 Maplewood Drive</div>
                      <div className="text-gray-600 text-sm sm:text-base">Los Angeles, CA 90026</div>
                    </div>
                    </b>
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <Phone className="text-teal-600 h-5 w-5 sm:h-6 sm:w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900 text-sm sm:text-base">Phone</div>
                     <b> <a href="tel:+13235550192" className="text-teal-600 text-primary hover:underline text-sm sm:text-base">
                        (323) 555-0192
                      </a>
                      </b>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <Mail className="text-teal-600 h-5 w-5 sm:h-6 sm:w-6 text-primary mt-1 flex-shrink-0" />
                   <b>
                    <div>
                      <div className=" font-medium text-gray-900 text-sm sm:text-base">Email</div>
                      <a href="mailto:serena@blakepsychology.com" className="text-teal-600 text-primary hover:underline text-sm sm:text-base break-all">
                        serena@blakepsychology.com
                      </a>
                    </div>
                    </b>
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <Clock className="text-teal-600 h-5 w-5 sm:h-6 sm:w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900 text-sm sm:text-base">Office Hours</div>
                      <div className="text-gray-600 space-y-1 text-sm sm:text-base">
                        <div>In-person: Tue & Thu, 10 AM–6 PM</div>
                        <div>Virtual: Mon, Wed & Fri, 1 PM–5 PM</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
                <h4 className="font-medium text-gray-900 mb-3 text-sm sm:text-base">Free Consultation</h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Not sure if therapy is right for you? Schedule a complimentary 15-minute consultation to discuss your needs and learn more about my approach.
                </p>
              </div>
            </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-6 sm:p-8 shadow-lg scroll-animate opacity-0 translate-y-8">
              {isSubmitted ? (
                <div className="text-center py-8 sm:py-12">
                  <CheckCircle className="h-12 sm:h-16 w-12 sm:w-16 text-teal-600 mx-auto mb-4 sm:mb-6" />
                  <h4 className="text-xl sm:text-2xl font-light text-gray-800 mb-4">Thank You!</h4>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Your message has been sent successfully. I'll get back to you within 24 hours 
                    to schedule your free consultation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`mt-2 border-gray-300 focus:border-teal-500 focus:ring-teal-500 text-sm sm:text-base ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="Your full name"
                    />
                    {errors.name && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`mt-2 border-gray-300 focus:border-teal-500 focus:ring-teal-500 text-sm sm:text-base ${errors.phone ? 'border-red-500' : ''}`}
                      placeholder="Your phone number"
                    />
                    {errors.phone && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`mt-2 border-gray-300 focus:border-teal-500 focus:ring-teal-500 text-sm sm:text-base ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                     <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    What brings you here? *
                  </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className={`mt-2 border-gray-300 focus:border-teal-500 focus:ring-teal-500 text-sm sm:text-base ${errors.message ? 'border-red-500' : ''}`}
                      placeholder="Tell me a bit about what you'd like to work on..."
                      rows={4}
                    />
                    {errors.message && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.message}</p>}
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-3">
                    Preferred Contact Method *
                  </label>
                    <Input
                      id="preferredTime"
                      value={formData.preferredTime}
                      onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                      className={`mt-2 border-gray-300 focus:border-teal-500 focus:ring-teal-500 text-sm sm:text-base ${errors.preferredTime ? 'border-red-500' : ''}`}
                      placeholder="e.g., Weekday mornings, evenings after 6pm"
                    />
                    {errors.preferredTime && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.preferredTime}</p>}
                  </div>

                  {/* <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreeToContact"
                      checked={formData.agreeToContact}
                      onCheckedChange={(checked) => handleInputChange('agreeToContact', checked as boolean)}
                      className={`mt-1 flex-shrink-0 ${errors.agreeToContact ? 'border-red-500' : ''}`}
                    />
                    <Label htmlFor="agreeToContact" className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                      I agree to be contacted by Dr. Serena Blake regarding my inquiry and understand 
                      that this form is not for emergency situations. *
                    </Label>
                  </div>
                  {errors.agreeToContact && <p className="text-red-500 text-xs sm:text-sm">{errors.agreeToContact}</p>} */}
                  <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <Checkbox
                      id="agreeToContact"
                      checked={formData.agreeToContact}
                      onCheckedChange={(checked) => handleInputChange("agreeToContact", checked as boolean)}
                      className={errors.agreeToContact ? "border-red-500" : ""}
                    />
                  </div>
                  <label htmlFor="agreeToContact" className="text-sm text-gray-600 leading-relaxed">
                    I agree to be contacted by Dr. Serena Blake regarding my inquiry and understand that this form is not secure for sharing sensitive information. *
                  </label>
                </div>
                {errors.agreeToContact && <p className="text-red-500 text-sm">{errors.agreeToContact}</p>}

                  <Button 
                    type="submit" 
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 sm:py-4 text-base sm:text-lg font-light rounded-none shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12 scroll-animate opacity-0 translate-y-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <h4 className="text-xl sm:text-2xl font-light mb-4 sm:mb-6">Dr. Serena Blake</h4>
              <p className="text-gray-400 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                Licensed Clinical Psychologist providing compassionate, evidence-based therapy 
                in Los Angeles and virtually.
              </p>
              <div className="text-gray-400 text-sm sm:text-base">
                <p>PsyD, Licensed Clinical Psychologist</p>
                <p>License #PSY12345</p>
              </div>
            </div>
            
            <div>
              <h5 className="text-base sm:text-lg font-light mb-4 sm:mb-6">Contact Info</h5>
              <div className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
                <p>(323) 555-0192</p>
                <p className="break-all">serena@blakepsychology.com</p>
                <p>1287 Maplewood Drive<br />Los Angeles, CA 90026</p>
              </div>
            </div>
            
            <div>
              <h5 className="text-base sm:text-lg font-light mb-4 sm:mb-6">Office Hours</h5>
              <div className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
                <div>
                  <p className="font-medium">In-Person</p>
                  <p>Tue & Thu: 10 AM - 6 PM</p>
                </div>
                <div>
                  <p className="font-medium">Virtual</p>
                  <p>Mon, Wed & Fri: 1 PM - 5 PM</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-6 sm:pt-8 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              &copy; 2025 Dr. Serena Blake Psychology. All rights reserved. | 
              <span className="ml-2">Privacy Policy</span> | 
              <span className="ml-2">Terms of Service</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
