import React, { useState, useEffect } from 'react';
import {
  Globe,
  Settings,
  Code2,
  Calculator,
  Shield,
  PhoneCall,
  Package,
  Briefcase,
  Database,
  Lock
} from 'lucide-react';
import { ThemePreview } from './components/ThemePreview';
import { AdminPanel } from './components/AdminPanel';
import { ThemeCodeInspector } from './components/ThemeCodeInspector';
import { QuoteCalculatorModal } from './components/QuoteCalculatorModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import {
  Product,
  Project,
  ConsultationRequest,
  SiteSettings,
  PRODUCTS,
  PROJECTS,
  INITIAL_INQUIRIES,
  INITIAL_SITE_SETTINGS
} from './data/mockData';
import {
  loadStoredProducts,
  saveStoredProducts,
  loadStoredProjects,
  saveStoredProjects,
  loadStoredInquiries,
  saveStoredInquiries,
  loadStoredSiteSettings,
  saveStoredSiteSettings,
  resetAllStorageToDefaults,
  isAdminAuthenticated,
  setAdminAuthenticated
} from './data/storage';

export default function App() {
  const [mainView, setMainView] = useState<'preview' | 'admin' | 'code'>('preview');
  const [navTab, setNavTab] = useState<'home' | 'products' | 'projects' | 'about' | 'contact'>('home');
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => isAdminAuthenticated());
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Dynamic Data with persistence
  const [products, setProducts] = useState<Product[]>(() => loadStoredProducts());
  const [projects, setProjects] = useState<Project[]>(() => loadStoredProjects());
  const [inquiries, setInquiries] = useState<ConsultationRequest[]>(() => loadStoredInquiries());
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => loadStoredSiteSettings());

  const [newInquiryAlert, setNewInquiryAlert] = useState(false);

  // Sync to storage
  const handleSaveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    saveStoredProducts(newProducts);
  };

  const handleSaveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    saveStoredProjects(newProjects);
  };

  const handleSaveInquiries = (newInquiries: ConsultationRequest[]) => {
    setInquiries(newInquiries);
    saveStoredInquiries(newInquiries);
  };

  const handleSaveSettings = (newSettings: SiteSettings) => {
    setSiteSettings(newSettings);
    saveStoredSiteSettings(newSettings);
  };

  const handleResetToDefaults = () => {
    const defaults = resetAllStorageToDefaults();
    setProducts(defaults.products);
    setProjects(defaults.projects);
    setInquiries(defaults.inquiries);
    setSiteSettings(defaults.settings);
  };

  const handleAddInquiry = (data: {
    serviceType: string;
    productName: string;
    message: string;
    name: string;
    phone: string;
    company: string;
  }) => {
    const newId = `REQ-${1050 + inquiries.length}`;
    const newReq: ConsultationRequest = {
      id: newId,
      name: data.name,
      phone: data.phone,
      company: data.company,
      serviceType: data.serviceType,
      productName: data.productName,
      message: data.message,
      date: new Date().toLocaleDateString('fa-IR'),
      status: 'new'
    };

    const updated = [newReq, ...inquiries];
    handleSaveInquiries(updated);
    setNewInquiryAlert(true);
    setTimeout(() => setNewInquiryAlert(false), 5000);
  };

  const handleOpenAdmin = () => {
    if (isAdminLoggedIn) {
      setMainView('admin');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setIsLoginModalOpen(false);
    setMainView('admin');
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    setIsAdminLoggedIn(false);
    setMainView('preview');
  };

  const newCount = inquiries.filter((i) => i.status === 'new').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-['Vazirmatn',sans-serif] flex flex-col justify-between">
      {/* Top Application Bar */}
      <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Brand identifier */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20">
              <Shield className="w-4 h-4 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="text-xs font-black text-white flex items-center gap-1.5">
                {siteSettings.companyName}
                <span className="text-[9px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-1.5 py-0.2 rounded font-mono font-bold">
                  سیستم مدیریت محتوا
                </span>
              </div>
              <div className="text-[10px] text-slate-400">
                {siteSettings.companySubtitle}
              </div>
            </div>
          </div>

          {/* View Switcher Tabs */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setMainView('preview')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                mainView === 'preview'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              مشاهده سایت
            </button>

            <button
              onClick={handleOpenAdmin}
              className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 relative cursor-pointer ${
                mainView === 'admin'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              پنل مدیریت سایت
              {!isAdminLoggedIn && (
                <Lock className="w-3 h-3 text-amber-400" title="محافظت شده با رمز عبور" />
              )}
              {newCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] flex items-center justify-center animate-pulse">
                  {newCount}
                </span>
              )}
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCalculatorOpen(true)}
              className="px-3.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5 text-amber-400" />
              <span>محاسبه‌گر پروژه</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating notification when new inquiry is submitted */}
      {newInquiryAlert && (
        <div className="fixed bottom-6 left-6 z-50 bg-cyan-600 text-slate-950 font-bold px-4 py-3 rounded-xl shadow-2xl border border-cyan-400 flex items-center gap-3 animate-bounce">
          <PhoneCall className="w-5 h-5 text-amber-300" />
          <div className="text-xs">
            <div className="font-black text-white">استعلام جدید با موفقیت ثبت شد!</div>
            <div className="text-[11px] text-cyan-100">در صندوق پیام‌های پنل مدیریت اضافه گردید.</div>
          </div>
          <button
            onClick={handleOpenAdmin}
            className="px-2.5 py-1 bg-white text-slate-950 rounded-lg text-xs font-black mr-2 cursor-pointer"
          >
            مشاهده در پنل مدیریت
          </button>
        </div>
      )}

      {/* Main Viewport Content */}
      <main className="flex-1">
        {mainView === 'preview' && (
          <ThemePreview
            onOpenCalculator={() => setIsCalculatorOpen(true)}
            onSubmitInquiry={handleAddInquiry}
            activeNavTab={navTab}
            setActiveNavTab={setNavTab}
            products={products}
            projects={projects}
            siteSettings={siteSettings}
            onOpenAdmin={handleOpenAdmin}
          />
        )}

        {mainView === 'admin' && (
          isAdminLoggedIn ? (
            <AdminPanel
              products={products}
              projects={projects}
              inquiries={inquiries}
              siteSettings={siteSettings}
              onSaveProducts={handleSaveProducts}
              onSaveProjects={handleSaveProjects}
              onSaveInquiries={handleSaveInquiries}
              onSaveSettings={handleSaveSettings}
              onResetToDefaults={handleResetToDefaults}
              onSwitchToLivePreview={() => setMainView('preview')}
              onLogout={handleLogout}
            />
          ) : (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-amber-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">پیشخوان مدیریت نیازمند ورود با کلمه عبور است</h2>
              <p className="text-xs text-slate-400 max-w-md mb-6 leading-relaxed">
                جهت دسترسی به صندوق پیام‌ها، مدیریت محصولات، پروژه‌ها و تنظیمات سایت، لطفاً ابتدا وارد حساب کاربری مدیر شوید.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition cursor-pointer"
                >
                  ورود به حساب مدیر
                </button>
                <button
                  onClick={() => setMainView('preview')}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition cursor-pointer"
                >
                  بازگشت به سایت
                </button>
              </div>
            </div>
          )
        )}

        {mainView === 'code' && <ThemeCodeInspector />}
      </main>

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccessLogin={handleLoginSuccess}
      />

      {/* Smart Quotation Calculator Modal */}
      <QuoteCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onSubmitQuote={handleAddInquiry}
      />
    </div>
  );
}
