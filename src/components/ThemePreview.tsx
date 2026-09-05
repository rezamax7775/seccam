import React, { useState, useId } from 'react';
import {
  Shield,
  Camera,
  Cpu,
  Flame,
  HardDrive,
  Phone,
  Mail,
  MapPin,
  Search,
  CheckCircle2,
  ChevronLeft,
  ArrowLeft,
  ExternalLink,
  Layers,
  Award,
  Users,
  Building2,
  Lock,
  Menu,
  X,
  FileSpreadsheet,
  Calculator,
  Eye,
  Zap,
  Radio,
  FileCheck
} from 'lucide-react';
import {
  Product,
  Project,
  SiteSettings,
  PRODUCTS,
  PROJECTS,
  SERVICES,
  INITIAL_SITE_SETTINGS
} from '../data/mockData';

interface ThemePreviewProps {
  onOpenCalculator: () => void;
  onSubmitInquiry: (data: {
    serviceType: string;
    productName: string;
    message: string;
    name: string;
    phone: string;
    company: string;
  }) => void;
  activeNavTab: 'home' | 'products' | 'projects' | 'about' | 'contact';
  setActiveNavTab: (tab: 'home' | 'products' | 'projects' | 'about' | 'contact') => void;
  products?: Product[];
  projects?: Project[];
  siteSettings?: SiteSettings;
  onOpenAdmin?: () => void;
}

export const ThemePreview: React.FC<ThemePreviewProps> = ({
  onOpenCalculator,
  onSubmitInquiry,
  activeNavTab,
  setActiveNavTab,
  products,
  projects,
  siteSettings,
  onOpenAdmin
}) => {
  const currentProducts = products && products.length > 0 ? products : PRODUCTS;
  const currentProjects = projects && projects.length > 0 ? projects : PROJECTS;
  const currentSettings = siteSettings || INITIAL_SITE_SETTINGS;

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');
  const [projectCategoryFilter, setProjectCategoryFilter] = useState<string>('all');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Quote modal state
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteTargetProduct, setQuoteTargetProduct] = useState<string>('');
  const [quoteServiceType, setQuoteServiceType] = useState<string>('دوربین مداربسته و سیستم‌های نظارت تصویری');
  const [quoteName, setQuoteName] = useState('');
  const [quotePhone, setQuotePhone] = useState('');
  const [quoteCompany, setQuoteCompany] = useState('');
  const [quoteMessage, setQuoteMessage] = useState('');
  const [quoteSuccess, setQuoteSuccess] = useState(false);

  const contactNameInputId = useId();
  const contactPhoneInputId = useId();
  const contactCompanyInputId = useId();
  const contactServiceSelectId = useId();
  const contactMessageTextareaId = useId();

  const handleOpenQuoteModal = (productName = '', service = 'دوربین مداربسته و سیستم‌های نظارت تصویری') => {
    setQuoteTargetProduct(productName);
    setQuoteServiceType(service);
    setQuoteSuccess(false);
    setQuoteModalOpen(true);
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteName || !quotePhone) return;

    onSubmitInquiry({
      name: quoteName,
      phone: quotePhone,
      company: quoteCompany || 'شخصی',
      serviceType: quoteServiceType,
      productName: quoteTargetProduct || 'عمومی',
      message: quoteMessage || 'درخواست مشاوره و استعلام قیمت فوری'
    });

    setQuoteSuccess(true);
    setTimeout(() => {
      setQuoteSuccess(false);
      setQuoteModalOpen(false);
      setQuoteName('');
      setQuotePhone('');
      setQuoteCompany('');
      setQuoteMessage('');
    }, 2000);
  };

  // Filtered lists using state products and projects
  const filteredProducts = currentProducts.filter((p) => {
    if (productCategoryFilter === 'all') return true;
    return p.category.includes(productCategoryFilter);
  });

  const filteredProjects = currentProjects.filter((p) => {
    if (projectCategoryFilter === 'all') return true;
    return p.category.includes(projectCategoryFilter);
  });

  const searchResults = searchQuery.trim()
    ? {
        products: currentProducts.filter(
          (p) =>
            p.title.includes(searchQuery) ||
            p.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.includes(searchQuery) ||
            p.description.includes(searchQuery)
        ),
        projects: currentProjects.filter(
          (p) =>
            p.title.includes(searchQuery) ||
            p.client.includes(searchQuery) ||
            p.summary.includes(searchQuery)
        )
      }
    : { products: [], projects: [] };

  return (
    <div id="bumiya-theme-preview-root" className="min-h-screen bg-slate-950 text-slate-100 font-['Vazirmatn',sans-serif] selection:bg-cyan-500 selection:text-slate-950">
      {/* 1. Top Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-slate-400">
            <div className="flex items-center gap-1.5 hover:text-cyan-400 transition">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-mono" dir="ltr">{currentSettings.phone1}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 hover:text-cyan-400 transition">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>{currentSettings.email}</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentSettings.address}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {currentSettings.supportAvailableText}
            </span>
            <button
              onClick={() => handleOpenQuoteModal()}
              className="text-[11px] text-amber-300 hover:text-amber-200 underline flex items-center gap-1"
            >
              درخواست بازدید رایگان کارشناس
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          {/* Logo & Identity */}
          <div
            onClick={() => setActiveNavTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-700 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Shield className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition" />
              </div>
            </div>
            <div>
              <div className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                {currentSettings.companyName}
                <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-1.5 py-0.2 rounded font-mono">
                  PRO
                </span>
              </div>
              <div className="text-[10px] text-slate-400 -mt-0.5">
                {currentSettings.companySubtitle}
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800">
            {[
              { id: 'home', label: 'صفحه اصلی' },
              { id: 'products', label: 'تجهیزات و محصولات' },
              { id: 'projects', label: 'پروژه‌های صنعتی' },
              { id: 'about', label: 'درباره ما و گواهینامه‌ها' },
              { id: 'contact', label: 'تماس و استعلام' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveNavTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeNavTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition"
              title="جستجو در محصولات و مقالات"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenCalculator}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 text-xs font-semibold transition cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5 text-amber-400" />
              محاسبه‌گر هزینه
            </button>

            <button
              onClick={() => handleOpenQuoteModal()}
              className="px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">استعلام فوری قیمت</span>
              <span className="md:hidden">استعلام</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm lg:hidden flex justify-end">
          <div className="w-72 max-w-full bg-slate-900 h-full p-6 border-r border-slate-800 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="font-bold text-white text-sm">منوی ناوبری</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {[
                  { id: 'home', label: 'صفحه اصلی' },
                  { id: 'products', label: 'محصولات و تجهیزات' },
                  { id: 'projects', label: 'پروژه‌های صنعتی و سازمانی' },
                  { id: 'about', label: 'درباره ما و گواهینامه‌ها' },
                  { id: 'contact', label: 'تماس با ما' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveNavTab(tab.id as any);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-right p-3 rounded-lg text-xs font-semibold transition ${
                      activeNavTab === tab.id
                        ? 'bg-blue-600/30 text-cyan-300 border border-blue-500/30'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCalculator();
                }}
                className="w-full py-2.5 px-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center justify-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                محاسبه‌گر هوشمند هزینه پروژه
              </button>
            </div>

            <div className="text-xs text-slate-500 border-t border-slate-800 pt-4">
              <div>تلفن تماس: {currentSettings.phone1}</div>
              <div className="mt-1">{currentSettings.companyName} © ۱۴۰۳</div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MAIN BODY ROUTING */}

      {/* TAB: HOME */}
      {activeNavTab === 'home' && (
        <div>
          {/* Hero Section */}
          <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800/80">
            {/* Background elements */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Text Content */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
                    <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
                    {currentSettings.heroBadge}
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                    {currentSettings.heroTitle}{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
                      {currentSettings.heroTitleGradient}
                    </span>
                  </h1>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {currentSettings.heroSubtitle}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
                      <div className="text-xs text-slate-400">پروژه‌های اجرایی</div>
                      <div className="text-xl font-black text-white mt-0.5 font-mono">{currentSettings.heroProjectsCount}</div>
                    </div>
                    <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
                      <div className="text-xs text-slate-400">گارانتی تعویض طلایی</div>
                      <div className="text-xl font-black text-cyan-400 mt-0.5 font-mono">{currentSettings.heroWarrantyMonths}</div>
                    </div>
                    <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl col-span-2 sm:col-span-1">
                      <div className="text-xs text-slate-400">پایداری عملکرد</div>
                      <div className="text-xl font-black text-emerald-400 mt-0.5 font-mono">{currentSettings.heroUptimePercent}</div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-4">
                    <button
                      onClick={() => handleOpenQuoteModal()}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/25 transition flex items-center gap-2 cursor-pointer"
                    >
                      <Phone className="w-4 h-4" />
                      استعلام قیمت و مشاوره فنی
                    </button>
                    <button
                      onClick={onOpenCalculator}
                      className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500 text-slate-200 hover:text-white text-sm font-semibold transition flex items-center gap-2 cursor-pointer"
                    >
                      <Calculator className="w-4 h-4 text-amber-400" />
                      محاسبه‌گر هوشمند هزینه
                    </button>
                  </div>
                </div>

                {/* Visual Showcase Card */}
                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900/90 shadow-2xl p-4">
                    <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80"
                        alt="دوربین مداربسته بومیا"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                      {/* Live Badges */}
                      <div className="absolute top-3 right-3 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700 text-[11px] text-emerald-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                        AI Live Analytics 4K
                      </div>

                      <div className="absolute bottom-4 right-4 left-4">
                        <div className="text-xs text-cyan-400 font-mono">تکنولوژی شاخص ۲۰۲۴</div>
                        <div className="text-base font-bold text-white mt-0.5">
                          دوربین بولت هوشمند بومیا با قابلیت تشخیص پلاک و چهره در تاریکی مطلق
                        </div>
                        <div className="flex items-center gap-3 mt-2 text-xs text-slate-300">
                          <span>سنسور سونی 1/1.8"</span>
                          <span>•</span>
                          <span>دید در شب رنگی ۶۰m</span>
                          <span>•</span>
                          <span>IP67 ضد آب</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-20 bg-slate-950 border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <div className="text-xs text-cyan-400 font-bold uppercase tracking-wider mb-2">
                  خدمات و حوزه‌های تخصصی
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  راهکارهای جامع حفاظت الکترونیک و ایمنی هوشمند
                </h2>
                <p className="text-sm text-slate-400 mt-3">
                  طراحی مهندسی، تامین مستقیم تجهیزات اصلی، پیاده‌سازی و خدمات پس از فروش با پشتیبانی دائم
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SERVICES.map((svc) => (
                  <div
                    key={svc.id}
                    className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition">
                      {svc.icon === 'Camera' && <Camera className="w-6 h-6" />}
                      {svc.icon === 'ShieldCheck' && <Shield className="w-6 h-6" />}
                      {svc.icon === 'Flame' && <Flame className="w-6 h-6" />}
                      {svc.icon === 'Cpu' && <Cpu className="w-6 h-6" />}
                      {svc.icon === 'Monitor' && <HardDrive className="w-6 h-6" />}
                      {svc.icon === 'Wrench' && <Zap className="w-6 h-6" />}
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{svc.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">{svc.desc}</p>
                    <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-800/80">
                      <span className="text-cyan-400 font-mono text-[11px]">{svc.stats}</span>
                      <button
                        onClick={() => handleOpenQuoteModal('', svc.title)}
                        className="text-slate-400 group-hover:text-cyan-300 font-semibold flex items-center gap-1 transition text-xs"
                      >
                        درخواست مشاوره
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Products */}
          <section className="py-20 bg-slate-900/40 border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
                <div>
                  <div className="text-xs text-cyan-400 font-bold uppercase tracking-wider mb-1">
                    ویترین برگزیده تجهیزات
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    جدیدترین محصولات نظارت تصویری و اکسس کنترل
                  </h2>
                </div>
                <button
                  onClick={() => setActiveNavTab('products')}
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                >
                  مشاهده کاتالوگ کامل محصولات
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(currentProducts.filter((p) => p.isFeatured).length > 0
                  ? currentProducts.filter((p) => p.isFeatured).slice(0, 3)
                  : currentProducts.slice(0, 3)
                ).map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-slate-900 rounded-2xl border border-slate-800 hover:border-slate-700 overflow-hidden flex flex-col justify-between group transition"
                  >
                    <div>
                      <div className="relative h-52 overflow-hidden bg-slate-950">
                        <img
                          src={prod.imageUrl}
                          alt={prod.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] text-cyan-400 border border-slate-700 font-mono">
                          {prod.model}
                        </div>
                        <div className="absolute bottom-3 left-3 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded text-[10px] font-bold">
                          {prod.category}
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="text-sm font-bold text-white leading-snug mb-3 line-clamp-2">
                          {prod.title}
                        </h3>

                        <div className="space-y-1.5 text-xs text-slate-400 mb-4 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                          <div className="flex justify-between">
                            <span>کیفیت تصویر:</span>
                            <span className="text-slate-200 font-semibold">{prod.resolution}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>دید در شب:</span>
                            <span className="text-slate-200">{prod.nightVision}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>گارانتی:</span>
                            <span className="text-emerald-400 font-semibold">{prod.warranty}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex items-center gap-2">
                      <button
                        onClick={() => setSelectedProduct(prod)}
                        className="flex-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition text-center"
                      >
                        مشخصات فنی
                      </button>
                      <button
                        onClick={() => handleOpenQuoteModal(prod.title, prod.category)}
                        className="py-2 px-3 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition flex items-center gap-1"
                      >
                        استعلام قیمت
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Major Projects Showcase */}
          <section className="py-20 bg-slate-950 border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
                <div>
                  <div className="text-xs text-cyan-400 font-bold uppercase tracking-wider mb-1">
                    پروژه‌ها و تجارب موفق
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    پروژه‌های شاخص ملی و صنعتی اجرا شده
                  </h2>
                </div>
                <button
                  onClick={() => setActiveNavTab('projects')}
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                >
                  مشاهده تمامی پروژه‌ها
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {currentProjects.slice(0, 3).map((proj) => (
                  <div
                    key={proj.id}
                    className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={proj.imageUrl}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                        <div className="absolute bottom-3 right-3 text-xs font-bold text-white bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded border border-slate-700">
                          {proj.category}
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="text-xs text-cyan-400 font-semibold mb-1">{proj.client}</div>
                        <h3 className="text-sm font-bold text-white leading-snug mb-3">
                          {proj.title}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                          {proj.summary}
                        </p>

                        <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-950 p-2.5 rounded-lg border border-slate-800 mb-3">
                          <div>
                            <span className="text-slate-500">تعداد دوربین: </span>
                            <span className="text-white font-mono font-bold">{proj.cameraCount}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">فیبر نوری: </span>
                            <span className="text-cyan-400 font-mono font-bold">{proj.fiberDistance}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <button
                        onClick={() => setSelectedProject(proj)}
                        className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition"
                      >
                        مطالعه گزارش فنی و دستاوردهای پروژه
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Quick RFQ banner */}
          <section className="py-16 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-right">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  آیا برای مجموعه خود نیاز به کارشناسی و استعلام قیمت دارید؟
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  تیم مهندسی بومیا آماده اعزام کارشناس جهت بازدید رایگان و تهیه نقشه جانمایی دوربین‌ها می‌باشد.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenCalculator}
                  className="px-5 py-3 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-300 font-bold text-xs hover:bg-amber-500/10 transition"
                >
                  محاسبه آنلاین هزینه
                </button>
                <button
                  onClick={() => handleOpenQuoteModal()}
                  className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition"
                >
                  ثبت درخواست بازدید حضوری
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* TAB: PRODUCTS */}
      {activeNavTab === 'products' && (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <div className="text-xs text-cyan-400 font-bold mb-1">کاتالوگ رسمی تجهیزات امنیتی</div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              محصولات نظارت تصویری، پلاک‌خوان و اکسس کنترل
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              تجهیزات با گواهینامه‌های استاندارد، سنسورهای اصلی سونی و گارانتی تعویض ۳۶ ماهه
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2 pb-6 border-b border-slate-800 mb-8">
            {[
              { id: 'all', label: 'همه دسته‌ها' },
              { id: 'دوربین تحت شبکه', label: 'دوربین‌های تحت شبکه (IP)' },
              { id: 'اسپیددام', label: 'دوربین‌های اسپیددام چرخشی' },
              { id: 'پلاک‌خوان', label: 'سیستم پلاک‌خوان جاده‌ای (ANPR)' },
              { id: 'دستگاه ذخیره‌ساز', label: 'دستگاه‌های NVR و سرور' },
              { id: 'کنترل تردد', label: 'کنترل تردد و بیومتریک' },
              { id: 'اعلام و اطفاء حریق', label: 'اعلام و اطفاء حریق' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setProductCategoryFilter(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                  productCategoryFilter === cat.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-slate-900 rounded-2xl border border-slate-800 hover:border-slate-700 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 bg-slate-950 overflow-hidden">
                    <img
                      src={prod.imageUrl}
                      alt={prod.title}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-slate-950/90 text-cyan-400 font-mono text-xs px-2.5 py-1 rounded border border-slate-700">
                      {prod.model}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="text-[11px] text-amber-400 font-semibold mb-1">{prod.category}</div>
                    <h2 className="text-sm font-bold text-white mb-3 line-clamp-2">{prod.title}</h2>

                    <div className="space-y-2 text-xs text-slate-400 bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 mb-4">
                      <div className="flex justify-between">
                        <span>سنسور و رزولوشن:</span>
                        <span className="text-slate-200 font-medium">{prod.resolution}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>دید در شب:</span>
                        <span className="text-slate-200">{prod.nightVision}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>استاندارد مقاومت:</span>
                        <span className="text-cyan-400">{prod.protection}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex gap-2">
                  <button
                    onClick={() => setSelectedProduct(prod)}
                    className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition"
                  >
                    مشاهده مشخصات کامل
                  </button>
                  <button
                    onClick={() => handleOpenQuoteModal(prod.title, prod.category)}
                    className="py-2 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg text-xs font-bold transition"
                  >
                    استعلام قیمت
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB: PROJECTS */}
      {activeNavTab === 'projects' && (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <div className="text-xs text-cyan-400 font-bold mb-1">گالری پروژه‌ها و نمونه کارهای اجرایی</div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              پروژه‌های حفاظتی، صنعتی و پتروشیمی
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              بررسی چالش‌ها، تعداد دوربین‌ها، کابل‌کشی فیبر نوری و دستاوردهای فنی سامانه‌های مستقر
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56">
                    <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 right-3 bg-slate-950/90 text-xs text-white px-3 py-1 rounded border border-slate-700 font-semibold">
                      {proj.category}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="text-xs text-cyan-400 font-bold mb-1">{proj.client}</div>
                    <h2 className="text-base font-bold text-white mb-2">{proj.title}</h2>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">{proj.summary}</p>

                    <div className="space-y-1.5 text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 mb-4">
                      <div className="flex justify-between">
                        <span className="text-slate-500">موقعیت مکانی:</span>
                        <span>{proj.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">تعداد دوربین‌ها:</span>
                        <span className="font-mono font-bold text-amber-400">{proj.cameraCount} دستگاه</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">طول فیبر نوری:</span>
                        <span className="font-mono font-bold text-cyan-400">{proj.fiberDistance}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="w-full py-2.5 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-cyan-300 rounded-lg text-xs font-bold transition"
                  >
                    مشاهده جزئیات و چالش‌های پروژه
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB: ABOUT */}
      {activeNavTab === 'about' && (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs text-cyan-400 font-bold">درباره شرکت بومیا حفاظت گستر</div>
              <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                ۱۵ سال تعهد به بالاترین استانداردهای امنیت و نظارت هوشمند
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                شرکت بومیا حفاظت گستر به عنوان یکی از مجموعه‌های پیشگام در حوزه طراحی، تامین، اجرا و نگهداری سیستم‌های حفاظت الکترونیک و نظارت تصویری در ایران فعالیت می‌نماید. ما با بهره‌گیری از مهندسین مجرب و اخذ نمایندگی برندهای معتبر جهانی، امنیت پایدار بیش از ۸۵۰ مجتمع صنعتی، پالایشگاهی، تجاری و دولتی را تضمین نموده‌ایم.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400">تاسیس</div>
                  <div className="text-lg font-bold text-white mt-0.5">۱۳۸۸</div>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400">تیم مهندسی</div>
                  <div className="text-lg font-bold text-cyan-400 mt-0.5">+۴۵ کارشناس</div>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
                  <div className="text-xs text-slate-400">تاییدیه‌ها</div>
                  <div className="text-lg font-bold text-amber-400 mt-0.5">آتش‌نشانی و حراست</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
                  alt="اتاق مانیتورینگ بومیا حفاظت گستر"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Certifications & Licences */}
          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              مجوزها، گواهینامه‌ها و صلاحیت‌های فنی
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="font-bold text-cyan-300">عضو رسمی اتحادیه صنف الکترونیک</div>
                <div className="text-slate-400">دارای پروانه کسب تخصصی نصب و راه‌اندازی دوربین‌های مداربسته</div>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="font-bold text-emerald-300">تاییدیه رسمی سازمان آتش‌نشانی</div>
                <div className="text-slate-400">مجری مجاز طراحی و اجرای سیستم‌های اعلام و اطفاء حریق</div>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="font-bold text-purple-300">گواهینامه ایزو ۹۰۰۱ و ۲۷۰۰۱</div>
                <div className="text-slate-400">مدیریت کیفیت و امنیت اطلاعات در اجرای زیرساخت‌های شبکه</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB: CONTACT */}
      {activeNavTab === 'contact' && (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <div className="text-xs text-cyan-400 font-bold mb-1">ارتباط مستقیم با کارشناسان</div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              تماس، مشاوره و استعلام قیمت پروژه
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              جهت هماهنگی بازدید کارشناسی یا دریافت پیش‌فاکتور رسمی فرم زیر را تکمیل فرمایید.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Contact details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
                <h2 className="text-base font-bold text-white pb-3 border-b border-slate-800">
                  اطلاعات دفتر مرکزی
                </h2>

                <div className="space-y-4 text-xs text-slate-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-white">نشانی:</div>
                      <div className="text-slate-400 mt-0.5">{currentSettings.address}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-white">تلفن‌های تماس مستقیم:</div>
                      <div className="text-slate-400 mt-0.5 font-mono" dir="ltr">{currentSettings.phone1}</div>
                      <div className="text-slate-400 font-mono" dir="ltr">{currentSettings.phoneHotline} (خط اضطراری ۲۴ ساعته)</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-white">ایمیل رسمی:</div>
                      <div className="text-slate-400 mt-0.5">{currentSettings.email}</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-xs font-bold text-amber-400 mb-1">ساعات کاری واحد فروش:</div>
                  <div className="text-xs text-slate-400">شنبه تا چهارشنبه: ۸:۳۰ الی ۱۷:۳۰</div>
                  <div className="text-xs text-slate-400">پنج‌شنبه‌ها: ۸:۳۰ الی ۱۳:۳۰</div>
                </div>
              </div>
            </div>

            {/* Direct Form */}
            <div className="lg:col-span-7">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const target = e.target as HTMLFormElement;
                  const formData = new FormData(target);
                  onSubmitInquiry({
                    name: formData.get('name') as string,
                    phone: formData.get('phone') as string,
                    company: (formData.get('company') as string) || 'شخصی',
                    serviceType: formData.get('service') as string,
                    productName: 'استعلام عمومی از فرم تماس',
                    message: formData.get('message') as string
                  });
                  alert('درخواست شما با موفقیت ثبت شد و به کارشناسان بومیا ارسال گردید.');
                  target.reset();
                }}
                className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4"
              >
                <h2 className="text-base font-bold text-white mb-2">
                  فرم ثبت درخواست مشاوره و استعلام قیمت
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={contactNameInputId} className="block text-xs font-semibold text-slate-300 mb-1">نام و نام خانوادگی *</label>
                    <input
                      id={contactNameInputId}
                      name="name"
                      required
                      type="text"
                      placeholder="مهندس علوی"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label htmlFor={contactPhoneInputId} className="block text-xs font-semibold text-slate-300 mb-1">شماره تلفن همراه *</label>
                    <input
                      id={contactPhoneInputId}
                      name="phone"
                      required
                      type="tel"
                      placeholder="09121234567"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={contactCompanyInputId} className="block text-xs font-semibold text-slate-300 mb-1">نام شرکت یا پروژه</label>
                    <input
                      id={contactCompanyInputId}
                      name="company"
                      type="text"
                      placeholder="مجتمع تجاری یا کارخانه"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label htmlFor={contactServiceSelectId} className="block text-xs font-semibold text-slate-300 mb-1">نوع خدمت مورد نظر</label>
                    <select
                      id={contactServiceSelectId}
                      name="service"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="دوربین مداربسته و نظارت تصویری">دوربین مداربسته و نظارت تصویری</option>
                      <option value="سیستم پلاک‌خوان هوشمند">سیستم پلاک‌خوان هوشمند</option>
                      <option value="کنترل تردد و بیومتریک">کنترل تردد و اکسس کنترل</option>
                      <option value="اعلام و اطفاء حریق">اعلام و اطفاء حریق</option>
                      <option value="حفاظت پیرامونی و فنس">حفاظت پیرامونی و فنس الکتریکی</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor={contactMessageTextareaId} className="block text-xs font-semibold text-slate-300 mb-1">شرح درخواست یا جزئیات پروژه</label>
                  <textarea
                    id={contactMessageTextareaId}
                    name="message"
                    rows={4}
                    required
                    placeholder="شرح مختصری از ابعاد فضا، تعداد حدودی دوربین‌ها یا نیازمندی‌های امنیتی خود را بنویسید..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-lg text-xs shadow-lg shadow-cyan-500/20 transition cursor-pointer"
                >
                  ارسال درخواست و دریافت مشاوره فوری
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* 5. Product Specs Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs text-amber-400 font-mono">{selectedProduct.model}</span>
                <h3 className="text-base font-bold text-white mt-1">{selectedProduct.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-48 rounded-xl overflow-hidden">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Specs Table */}
            <div className="space-y-2 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">رزولوشن و کیفیت:</span>
                <span className="text-white font-semibold">{selectedProduct.resolution}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">دید در شب:</span>
                <span className="text-white">{selectedProduct.nightVision}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">سنسور تصویر:</span>
                <span className="text-white">{selectedProduct.sensor}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">استاندارد مقاومت بدنه:</span>
                <span className="text-cyan-400 font-bold">{selectedProduct.protection}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">گارانتی:</span>
                <span className="text-emerald-400 font-bold">{selectedProduct.warranty}</span>
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-200 mb-2">ویژگی‌های برجسته محصول:</div>
              <ul className="space-y-1 text-xs text-slate-300">
                {selectedProduct.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  handleOpenQuoteModal(selectedProduct.title, selectedProduct.category);
                }}
                className="flex-1 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition"
              >
                استعلام قیمت و موجودی این مدل
              </button>
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2.5 bg-slate-800 text-slate-300 rounded-lg text-xs"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs text-cyan-400 font-bold">{selectedProject.client}</span>
                <h3 className="text-base font-bold text-white mt-1">{selectedProject.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-52 rounded-xl overflow-hidden">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
              <div>
                <div className="text-slate-500">تعداد دوربین‌ها</div>
                <div className="text-white font-mono font-bold text-sm mt-0.5">{selectedProject.cameraCount}</div>
              </div>
              <div>
                <div className="text-slate-500">کانال‌های NVR</div>
                <div className="text-white font-mono font-bold text-sm mt-0.5">{selectedProject.nvrChannels}</div>
              </div>
              <div>
                <div className="text-slate-500">فیبر نوری</div>
                <div className="text-cyan-400 font-mono font-bold text-sm mt-0.5">{selectedProject.fiberDistance}</div>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-amber-400">چالش‌های پروژه: </span>
                <span className="text-slate-300">{selectedProject.challenges}</span>
              </div>
              <div>
                <span className="font-bold text-emerald-400">راهکار مهندسی بومیا: </span>
                <span className="text-slate-300">{selectedProject.solution}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {selectedProject.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="text-[11px] bg-slate-800 text-slate-300 border border-slate-700 px-2.5 py-1 rounded-md"
                >
                  {t}
                </span>
              ))}
            </div>

            <button
              onClick={() => setSelectedProject(null)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold"
            >
              بستن پنجره
            </button>
          </div>
        </div>
      )}

      {/* 7. Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">جستجو در محصولات و پروژه‌ها</span>
              <button
                onClick={() => {
                  setSearchModalOpen(false);
                  setSearchQuery('');
                }}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                autoFocus
                placeholder="مثال: ۴K، پلاک‌خوان، NVR، پتروشیمی، دید در شب..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {searchQuery && (
              <div className="max-h-64 overflow-y-auto space-y-3 text-xs pt-2">
                {searchResults.products.length > 0 && (
                  <div>
                    <div className="text-[11px] text-cyan-400 font-bold mb-1.5">محصولات منطبق:</div>
                    <div className="space-y-1.5">
                      {searchResults.products.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => {
                            setSelectedProduct(p);
                            setSearchModalOpen(false);
                          }}
                          className="p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 cursor-pointer flex justify-between items-center"
                        >
                          <span className="font-semibold text-slate-200">{p.title}</span>
                          <span className="text-amber-400 font-mono text-[10px]">{p.model}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {searchResults.projects.length > 0 && (
                  <div>
                    <div className="text-[11px] text-emerald-400 font-bold mb-1.5">پروژه‌های منطبق:</div>
                    <div className="space-y-1.5">
                      {searchResults.projects.map((pr) => (
                        <div
                          key={pr.id}
                          onClick={() => {
                            setSelectedProject(pr);
                            setSearchModalOpen(false);
                          }}
                          className="p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 cursor-pointer flex justify-between items-center"
                        >
                          <span className="font-semibold text-slate-200">{pr.title}</span>
                          <span className="text-slate-400 text-[10px]">{pr.client}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {searchResults.products.length === 0 && searchResults.projects.length === 0 && (
                  <div className="text-center py-6 text-slate-500 text-xs">
                    موردی یافت نشد. عبارت دیگری را جستجو فرمایید.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 8. Global Quote Modal */}
      {quoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">
                {quoteTargetProduct
                  ? `استعلام قیمت: ${quoteTargetProduct}`
                  : 'درخواست مشاوره فنی و استعلام قیمت'}
              </h3>
              <button
                onClick={() => setQuoteModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleQuoteSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">نام و نام خانوادگی *</label>
                <input
                  type="text"
                  required
                  placeholder="مهندس..."
                  value={quoteName}
                  onChange={(e) => setQuoteName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">شماره تماس همراه *</label>
                <input
                  type="tel"
                  required
                  placeholder="0912..."
                  value={quotePhone}
                  onChange={(e) => setQuotePhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">نام سازمان یا پروژه</label>
                <input
                  type="text"
                  placeholder="نام شرکت..."
                  value={quoteCompany}
                  onChange={(e) => setQuoteCompany(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">توضیحات و نیازمندی‌ها</label>
                <textarea
                  rows={3}
                  placeholder="تعداد، محل پروژه یا شرایط خاص..."
                  value={quoteMessage}
                  onChange={(e) => setQuoteMessage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                ></textarea>
              </div>

              {quoteSuccess ? (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-lg text-emerald-300 text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  درخواست شما با موفقیت ثبت شد و به پیشخوان اضافه گردید.
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition mt-2 cursor-pointer"
                >
                  ثبت و ارسال استعلام
                </button>
              )}
            </form>
          </div>
        </div>
      )}

      {/* 9. Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 text-xs text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Shield className="w-5 h-5 text-cyan-400" />
              {currentSettings.companyName}
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              {currentSettings.aboutText}
            </p>
          </div>

          <div>
            <div className="text-white font-bold text-xs mb-3">دسترسی سریع</div>
            <ul className="space-y-2 text-[11px]">
              <li><button onClick={() => setActiveNavTab('home')} className="hover:text-cyan-400 transition">صفحه اصلی</button></li>
              <li><button onClick={() => setActiveNavTab('products')} className="hover:text-cyan-400 transition">کاتالوگ محصولات ۴K</button></li>
              <li><button onClick={() => setActiveNavTab('projects')} className="hover:text-cyan-400 transition">پروژه‌های پتروشیمی و صنعتی</button></li>
              <li><button onClick={() => setActiveNavTab('about')} className="hover:text-cyan-400 transition">گواهینامه‌ها و درباره ما</button></li>
            </ul>
          </div>

          <div>
            <div className="text-white font-bold text-xs mb-3">دسته‌بندی تجهیزات</div>
            <ul className="space-y-2 text-[11px]">
              <li>دوربین‌های بولت و اسپیددام هوشمند</li>
              <li>سیستم‌های پلاک‌خوان جاده‌ای ANPR</li>
              <li>کنترل تردد بیومتریک و تشخیص چهره</li>
              <li>پنل‌های اعلام و اطفاء حریق آدرس‌پذیر</li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-white font-bold text-xs">تماس مستقیم</div>
            <div className="text-[11px] space-y-1">
              <div>تلفن: {currentSettings.phone1}</div>
              <div>ایمیل: {currentSettings.email}</div>
              <div>ساعات کاری: ۸:۳۰ الی ۱۷:۳۰</div>
            </div>
            <div className="pt-2">
              <span className="text-[10px] bg-slate-900 border border-slate-800 px-2.5 py-1 rounded text-cyan-400">
                سامانه مدیریت یکپارچه بومیا (Node.js)
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 mt-8 border-t border-slate-900 text-center text-[11px] text-slate-500">
          {currentSettings.copyrightText}
        </div>
      </footer>
    </div>
  );
};
