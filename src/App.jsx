import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { 
  Mic, 
  FileText, 
  Copy, 
  Settings, 
  Zap, 
  Users, 
  MessageSquare, 
  Star,
  Menu,
  X,
  Play,
  Download,
  Upload
} from 'lucide-react';
import './App.css';

// Import images
import logoImg from './assets/logo.png';
import heroImg from './assets/hero-illustration.png';
import ttsIcon from './assets/tts-icon.png';
import sttIcon from './assets/stt-icon.png';
import voiceCloneIcon from './assets/voice-clone-icon.png';
import audioStudioIcon from './assets/audio-studio-icon.png';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: ttsIcon,
      title: "تحويل النص إلى صوت",
      description: "حوّل أي نص عربي إلى صوت بشري طبيعي بأكثر من 300 صوت احترافي و 50+ لهجة عربية",
      highlights: ["300+ صوت احترافي", "50+ لهجة عربية", "جودة استوديو عالية"]
    },
    {
      icon: sttIcon,
      title: "تحويل الصوت إلى نص",
      description: "فرّغ ملفاتك الصوتية والمرئية إلى نصوص مكتوبة بدقة عالية مع دعم جميع اللهجات العربية",
      highlights: ["دقة عالية 98%", "تمييز المتحدثين", "تصدير متعدد الصيغ"]
    },
    {
      icon: voiceCloneIcon,
      title: "استنساخ الأصوات الذكي",
      description: "انسخ أي صوت بعينة قصيرة فقط باستخدام تقنيات الذكاء الاصطناعي المتقدمة",
      highlights: ["عينة 30 ثانية فقط", "تقنية متقدمة", "جودة احترافية"]
    },
    {
      icon: audioStudioIcon,
      title: "استوديو التحكم الصوتي",
      description: "تحكم كامل بكل عنصر صوتي: النبرة، السرعة، المشاعر، ومستوى الطاقة",
      highlights: ["تحكم شامل", "مشاعر متنوعة", "جودة هوليوودية"]
    }
  ];

  const stats = [
    { number: "300+", label: "منشئ محتوى نشط" },
    { number: "250M+", label: "كلمة تم معالجتها" },
    { number: "50+", label: "مشروع صوتي مكتمل" }
  ];

  const testimonials = [
    {
      name: "أحمد محمد",
      role: "منشئ محتوى",
      content: "منصة رائعة ساعدتني في إنتاج محتوى صوتي احترافي بسرعة وجودة عالية",
      rating: 5
    },
    {
      name: "فاطمة علي",
      role: "مطورة تطبيقات",
      content: "واجهة برمجة التطبيقات سهلة الاستخدام ومتكاملة بشكل مثالي مع تطبيقاتنا",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: "المجاني",
      price: "0",
      period: "شهرياً",
      features: ["1000 كلمة شهرياً", "5 أصوات أساسية", "جودة قياسية", "دعم أساسي"],
      popular: false
    },
    {
      name: "المحترف",
      price: "49",
      period: "شهرياً",
      features: ["50,000 كلمة شهرياً", "جميع الأصوات", "جودة عالية", "استنساخ الأصوات", "دعم أولوية"],
      popular: true
    },
    {
      name: "المؤسسي",
      price: "199",
      period: "شهرياً",
      features: ["كلمات غير محدودة", "جميع الميزات", "API متقدم", "دعم مخصص", "تكامل مخصص"],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <img src={logoImg} alt="صوتك الذكي" className="h-10 w-auto" />
              <span className="text-xl font-bold text-blue-900">صوتك الذكي</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">الرئيسية</a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">الميزات</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">الأسعار</a>
              <a href="#api" className="text-gray-700 hover:text-blue-600 transition-colors">واجهة API</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">اتصل بنا</a>
            </div>

            <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
              <Button variant="ghost">تسجيل الدخول</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">إنشاء حساب</Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-blue-600">الرئيسية</a>
              <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-blue-600">الميزات</a>
              <a href="#pricing" className="block px-3 py-2 text-gray-700 hover:text-blue-600">الأسعار</a>
              <a href="#api" className="block px-3 py-2 text-gray-700 hover:text-blue-600">واجهة API</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600">اتصل بنا</a>
              <div className="flex flex-col space-y-2 px-3 pt-2">
                <Button variant="ghost" size="sm">تسجيل الدخول</Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">إنشاء حساب</Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-right">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                ثورة الذكاء الاصطناعي 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
                  {" "}الصوتي
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                منصة متكاملة تجمع أقوى تقنيات الذكاء الاصطناعي الصوتي. حوّل نصوصك إلى أصوات بشرية طبيعية، 
                واستنسخ صوتك الشخصي، وحوّل تسجيلاتك الصوتية إلى نصوص بدقة عالية.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3">
                  <Play className="ml-2 h-5 w-5" />
                  ابدأ تجربتك المجانية
                </Button>
                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3">
                  <Download className="ml-2 h-5 w-5" />
                  جرب التحويل مجاناً
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src={heroImg} 
                alt="AI Voice Technology" 
                className="w-full max-w-lg h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              مجموعة متكاملة من التقنيات الصوتية المتقدمة
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              تلبية جميع احتياجاتك الإبداعية والمهنية بأحدث تقنيات الذكاء الاصطناعي
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 p-4 bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <img src={feature.icon} alt={feature.title} className="w-full h-full object-contain" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mb-4 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {feature.highlights.map((highlight, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ماذا يقول عملاؤنا
            </h2>
            <p className="text-xl text-blue-100">
              آراء وتجارب حقيقية من مستخدمي المنصة
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg mb-4 leading-relaxed">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-blue-100">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              خطط الأسعار
            </h2>
            <p className="text-xl text-gray-600">
              اختر الخطة المناسبة لاحتياجاتك
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''} hover:shadow-xl transition-all duration-300`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-4 py-1">الأكثر شعبية</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-blue-600">${plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full ml-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'}`}
                  >
                    {plan.price === "0" ? "ابدأ مجاناً" : "اشترك الآن"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-green-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            جاهز لتجربة مستقبل التقنية الصوتية؟
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            انضم إلى آلاف المبدعين الذين يستخدمون منصتنا لإنتاج محتوى صوتي احترافي
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-3">
              <Upload className="ml-2 h-5 w-5" />
              ابدأ الآن مجاناً
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3">
              <MessageSquare className="ml-2 h-5 w-5" />
              تحدث مع فريقنا
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                <img src={logoImg} alt="صوتك الذكي" className="h-8 w-auto" />
                <span className="text-xl font-bold">صوتك الذكي</span>
              </div>
              <p className="text-gray-400">
                منصة الذكاء الاصطناعي الصوتي الرائدة في المنطقة العربية
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">المنتج</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">الميزات</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الأسعار</a></li>
                <li><a href="#" className="hover:text-white transition-colors">واجهة API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">العينات الصوتية</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">الشركة</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">من نحن</a></li>
                <li><a href="#" className="hover:text-white transition-colors">المدونة</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الوظائف</a></li>
                <li><a href="#" className="hover:text-white transition-colors">اتصل بنا</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">الدعم</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">مركز المساعدة</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الوثائق</a></li>
                <li><a href="#" className="hover:text-white transition-colors">حالة الخدمة</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الأمان</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 صوتك الذكي. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

