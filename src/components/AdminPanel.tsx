import React, { useState } from 'react';
import {
  Package,
  Briefcase,
  PhoneCall,
  Settings,
  Database,
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  ExternalLink,
  Eye,
  EyeOff,
  Download,
  Upload,
  RefreshCw,
  Sparkles,
  Shield,
  Layers,
  Save,
  Check,
  Tag,
  Star,
  FileSpreadsheet,
  X,
  Phone,
  Mail,
  MapPin,
  Lock,
  Key,
  KeyRound,
  User,
  LogOut,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';
import {
  Product,
  Project,
  ConsultationRequest,
  SiteSettings,
  PRODUCTS as DEFAULT_PRODUCTS,
  PROJECTS as DEFAULT_PROJECTS,
  INITIAL_SITE_SETTINGS
} from '../data/mockData';
import {
  AdminCredentials,
  loadAdminCredentials,
  saveAdminCredentials,
  verifyAdminCredentials,
  resetAdminCredentialsToDefault
} from '../data/storage';

interface AdminPanelProps {
  products: Product[];
  projects: Project[];
  inquiries: ConsultationRequest[];
  siteSettings: SiteSettings;
  onSaveProducts: (products: Product[]) => void;
  onSaveProjects: (projects: Project[]) => void;
  onSaveInquiries: (inquiries: ConsultationRequest[]) => void;
  onSaveSettings: (settings: SiteSettings) => void;
  onResetToDefaults: () => void;
  onSwitchToLivePreview: () => void;
  onLogout?: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  products,
  projects,
  inquiries,
  siteSettings,
  onSaveProducts,
  onSaveProjects,
  onSaveInquiries,
  onSaveSettings,
  onResetToDefaults,
  onSwitchToLivePreview,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'products' | 'projects' | 'settings' | 'security' | 'backup'>('inquiries');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Security & Password Management State
  const [adminCreds, setAdminCreds] = useState<AdminCredentials>(() => loadAdminCredentials());
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newUsernameInput, setNewUsernameInput] = useState(() => adminCreds.username);
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmPassInput, setConfirmPassInput] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [securityError, setSecurityError] = useState('');

  // Inquiries State
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<ConsultationRequest | null>(null);
  const [inquiryNoteInput, setInquiryNoteInput] = useState('');

  // Products State
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // Product Form State
  const [prodTitle, setProdTitle] = useState('');
  const [prodModel, setProdModel] = useState('');
  const [prodCategory, setProdCategory] = useState('دوربین تحت شبکه (IP)');
  const [prodBrand, setProdBrand] = useState('بومیا پرو (Bumiya Pro)');
  const [prodResolution, setProdResolution] = useState('8 مگاپیکسل 4K UHD');
  const [prodNightVision, setProdNightVision] = useState('دید در شب رنگی تا ۶۰ متر');
  const [prodSensor, setProdSensor] = useState('1/1.8" Progressive Scan CMOS ساخت سونی');
  const [prodProtection, setProdProtection] = useState('استاندارد IP67 و ضد ضربه IK10');
  const [prodWarranty, setProdWarranty] = useState('۳۶ ماه گارانتی طلایی تعویض بومیا');
  const [prodPriceEstimate, setProdPriceEstimate] = useState('تماس جهت استعلام پروژه');
  const [prodFeatures, setProdFeatures] = useState<string[]>([]);
  const [prodFeatureInput, setProdFeatureInput] = useState('');
  const [prodDescription, setProdDescription] = useState('');
  const [prodImageUrl, setProdImageUrl] = useState('https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80');
  const [prodIsFeatured, setProdIsFeatured] = useState(false);

  // Projects State
  const [projectSearch, setProjectSearch] = useState('');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Project Form State
  const [projTitle, setProjTitle] = useState('');
  const [projClient, setProjClient] = useState('');
  const [projCategory, setProjCategory] = useState('صنعتی و نفت و گاز');
  const [projLocation, setProjLocation] = useState('تهران');
  const [projDate, setProjDate] = useState('۱۴۰۳');
  const [projCameraCount, setProjCameraCount] = useState<number>(48);
  const [projNvrChannels, setProjNvrChannels] = useState<number>(64);
  const [projFiberDistance, setProjFiberDistance] = useState('۵ کیلومتر');
  const [projSummary, setProjSummary] = useState('');
  const [projChallenges, setProjChallenges] = useState('');
  const [projSolution, setProjSolution] = useState('');
  const [projTechs, setProjTechs] = useState<string[]>([]);
  const [projTechInput, setProjTechInput] = useState('');
  const [projImageUrl, setProjImageUrl] = useState('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80');

  // Settings State
  const [tempSettings, setTempSettings] = useState<SiteSettings>(siteSettings);

  const showNotify = (msg: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({ message: msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  // --- Inquiries Handlers ---
  const handleUpdateInquiryStatus = (id: string, newStatus: ConsultationRequest['status']) => {
    const updated = inquiries.map((item) => (item.id === id ? { ...item, status: newStatus } : item));
    onSaveInquiries(updated);
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
    showNotify('وضعیت استعلام با موفقیت به‌روزرسانی شد.');
  };

  const handleSaveInquiryNote = () => {
    if (!selectedInquiry) return;
    const updated = inquiries.map((item) =>
      item.id === selectedInquiry.id ? { ...item, adminNotes: inquiryNoteInput } : item
    );
    onSaveInquiries(updated);
    setSelectedInquiry({ ...selectedInquiry, adminNotes: inquiryNoteInput });
    showNotify('یادداشت پیگیری ذخیره شد.');
  };

  const handleDeleteInquiry = (id: string) => {
    if (!window.confirm('آیا از حذف این استعلام مطمئن هستید؟')) return;
    const updated = inquiries.filter((item) => item.id !== id);
    onSaveInquiries(updated);
    if (selectedInquiry?.id === id) setSelectedInquiry(null);
    showNotify('استعلام با موفقیت حذف گردید.');
  };

  const handleExportInquiriesCsv = () => {
    const header = 'شناسه,نام مشتری,تلفن,شرکت,نوع خدمت,محصول,تاریخ,وضعیت,یادداشت\n';
    const rows = inquiries
      .map(
        (i) =>
          `"${i.id}","${i.name}","${i.phone}","${i.company || ''}","${i.serviceType}","${i.productName || ''}","${
            i.date
          }","${i.status}","${i.adminNotes || ''}"`
      )
      .join('\n');
    const blob = new Blob(['\uFEFF' + header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `bumiya_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotify('فایل خروجی استعلام‌ها دانلود گردید.');
  };

  // --- Products Handlers ---
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProdTitle('');
    setProdModel('BHG-');
    setProdCategory('دوربین تحت شبکه (IP)');
    setProdBrand('بومیا پرو (Bumiya Pro)');
    setProdResolution('8 مگاپیکسل 4K UHD');
    setProdNightVision('دید در شب رنگی تا ۶۰ متر');
    setProdSensor('سنسور صنعتی پیشرفته سونی');
    setProdProtection('استاندارد IP67 و IK10');
    setProdWarranty('۳۶ ماه گارانتی طلایی تعویض');
    setProdPriceEstimate('تماس جهت استعلام پروژه');
    setProdFeatures([
      'سنسور هوشمند تشخیص حرکت و تفکیک انسان از خودرو',
      'فشرده‌سازی H.265+ جهت صرفه‌جویی در هارد',
      'پشتیبانی از پروتکل استاندارد ONVIF'
    ]);
    setProdDescription('');
    setProdImageUrl('https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80');
    setProdIsFeatured(false);
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProdTitle(prod.title);
    setProdModel(prod.model);
    setProdCategory(prod.category);
    setProdBrand(prod.brand);
    setProdResolution(prod.resolution);
    setProdNightVision(prod.nightVision);
    setProdSensor(prod.sensor);
    setProdProtection(prod.protection);
    setProdWarranty(prod.warranty);
    setProdPriceEstimate(prod.priceEstimate);
    setProdFeatures([...prod.features]);
    setProdDescription(prod.description);
    setProdImageUrl(prod.imageUrl);
    setProdIsFeatured(!!prod.isFeatured);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodTitle || !prodModel) {
      alert('لطفاً عنوان و مدل محصول را وارد نمایید.');
      return;
    }

    if (editingProduct) {
      // Edit
      const updated = products.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              title: prodTitle,
              model: prodModel,
              category: prodCategory,
              brand: prodBrand,
              resolution: prodResolution,
              nightVision: prodNightVision,
              sensor: prodSensor,
              protection: prodProtection,
              warranty: prodWarranty,
              priceEstimate: prodPriceEstimate,
              features: prodFeatures,
              description: prodDescription,
              imageUrl: prodImageUrl,
              isFeatured: prodIsFeatured
            }
          : p
      );
      onSaveProducts(updated);
      showNotify(`محصول «${prodTitle}» با موفقیت ویرایش شد.`);
    } else {
      // Create
      const newProd: Product = {
        id: `p-${Date.now()}`,
        title: prodTitle,
        model: prodModel,
        category: prodCategory,
        brand: prodBrand,
        resolution: prodResolution,
        nightVision: prodNightVision,
        sensor: prodSensor,
        protection: prodProtection,
        warranty: prodWarranty,
        priceEstimate: prodPriceEstimate,
        features: prodFeatures.length > 0 ? prodFeatures : ['گارانتی رسمی بومیا'],
        description: prodDescription || 'تجهیزات تخصصی نظارت تصویری و امنیت هوشمند بومیا.',
        imageUrl: prodImageUrl,
        isFeatured: prodIsFeatured
      };
      onSaveProducts([newProd, ...products]);
      showNotify(`محصول جدید «${prodTitle}» به فروشگاه اضافه شد.`);
    }

    setIsProductModalOpen(false);
  };

  const handleDeleteProduct = (id: string, title: string) => {
    if (!window.confirm(`آیا از حذف محصول «${title}» اطمینان دارید؟`)) return;
    const updated = products.filter((p) => p.id !== id);
    onSaveProducts(updated);
    showNotify('محصول مورد نظر با موفقیت حذف گردید.');
  };

  const handleToggleProductFeatured = (id: string) => {
    const updated = products.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p));
    onSaveProducts(updated);
    showNotify('وضعیت نمایش در صفحه اصلی تغییر یافت.');
  };

  // --- Projects Handlers ---
  const handleOpenAddProject = () => {
    setEditingProject(null);
    setProjTitle('');
    setProjClient('');
    setProjCategory('صنعتی و نفت و گاز');
    setProjLocation('تهران');
    setProjDate('۱۴۰۳');
    setProjCameraCount(64);
    setProjNvrChannels(64);
    setProjFiberDistance('۶ کیلومتر');
    setProjSummary('');
    setProjChallenges('');
    setProjSolution('');
    setProjTechs(['دوربین‌های ۴K صنعتی', 'رینگ فیبر نوری', 'اتاق مانیتورینگ مرکزی']);
    setProjImageUrl('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80');
    setIsProjectModalOpen(true);
  };

  const handleOpenEditProject = (proj: Project) => {
    setEditingProject(proj);
    setProjTitle(proj.title);
    setProjClient(proj.client);
    setProjCategory(proj.category);
    setProjLocation(proj.location);
    setProjDate(proj.date);
    setProjCameraCount(proj.cameraCount);
    setProjNvrChannels(proj.nvrChannels);
    setProjFiberDistance(proj.fiberDistance);
    setProjSummary(proj.summary);
    setProjChallenges(proj.challenges);
    setProjSolution(proj.solution);
    setProjTechs([...proj.technologies]);
    setProjImageUrl(proj.imageUrl);
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle || !projClient) {
      alert('لطفاً عنوان پروژه و نام کارفرما را وارد نمایید.');
      return;
    }

    if (editingProject) {
      const updated = projects.map((p) =>
        p.id === editingProject.id
          ? {
              ...p,
              title: projTitle,
              client: projClient,
              category: projCategory,
              location: projLocation,
              date: projDate,
              cameraCount: Number(projCameraCount) || 1,
              nvrChannels: Number(projNvrChannels) || 4,
              fiberDistance: projFiberDistance,
              summary: projSummary,
              challenges: projChallenges,
              solution: projSolution,
              technologies: projTechs,
              imageUrl: projImageUrl
            }
          : p
      );
      onSaveProjects(updated);
      showNotify(`پروژه «${projTitle}» با موفقیت به‌روز شد.`);
    } else {
      const newProj: Project = {
        id: `proj-${Date.now()}`,
        title: projTitle,
        client: projClient,
        category: projCategory,
        location: projLocation,
        date: projDate,
        cameraCount: Number(projCameraCount) || 1,
        nvrChannels: Number(projNvrChannels) || 4,
        fiberDistance: projFiberDistance,
        summary: projSummary || 'پروژه جامع حفاظت تصویری بومیا.',
        challenges: projChallenges || 'نیاز به پوشش با کیفیت بالا و عملکرد شبانه‌روزی.',
        solution: projSolution || 'طراحی بستر فیبر نوری و دوربین‌های ۴K هوشمند.',
        technologies: projTechs.length > 0 ? projTechs : ['دوربین ۴K', 'فیبر نوری'],
        imageUrl: projImageUrl
      };
      onSaveProjects([newProj, ...projects]);
      showNotify(`پروژه جدید «${projTitle}» با موفقیت اضافه شد.`);
    }

    setIsProjectModalOpen(false);
  };

  const handleDeleteProject = (id: string, title: string) => {
    if (!window.confirm(`آیا از حذف پروژه «${title}» مطمئن هستید؟`)) return;
    const updated = projects.filter((p) => p.id !== id);
    onSaveProjects(updated);
    showNotify('پروژه با موفقیت حذف گردید.');
  };

  // --- Settings Handlers ---
  const handleSaveAllSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(tempSettings);
    showNotify('تنظیمات عمومی سایت و اطلاعات تماس با موفقیت ذخیره شد.');
  };

  // --- Backup Handlers ---
  const handleExportFullBackup = () => {
    const backupData = {
      appName: 'Bumiya Security Management',
      exportDate: new Date().toISOString(),
      products,
      projects,
      inquiries,
      settings: siteSettings
    };
    const json = JSON.stringify(backupData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bumiya_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showNotify('فایل پشتیبان کامل سیستم دانلود گردید.');
  };

  const handleImportBackupFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        if (!parsed || typeof parsed !== 'object') {
          showNotify('ساختار فایل پشتیبان نامعتبر است.', 'error');
          return;
        }

        if (Array.isArray(parsed.products)) onSaveProducts(parsed.products);
        if (Array.isArray(parsed.projects)) onSaveProjects(parsed.projects);
        if (Array.isArray(parsed.inquiries)) onSaveInquiries(parsed.inquiries);
        if (parsed.settings && typeof parsed.settings === 'object') onSaveSettings(parsed.settings);

        showNotify('اطلاعات پشتیبان با موفقیت بازیابی و بارگذاری شد.');
      } catch (err: any) {
        showNotify('خطا در خواندن فایل: ' + (err?.message || 'فرمت نامعتبر'), 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleFactoryReset = () => {
    if (
      !window.confirm(
        'هشدار: آیا می‌خواهید تمام داده‌ها به حالت نمونه اولیه کارخانه بازگردانده شوند؟ (تغییرات فعلی شما پاک خواهد شد)'
      )
    ) {
      return;
    }
    onResetToDefaults();
    setTempSettings(INITIAL_SITE_SETTINGS);
    showNotify('داده‌های سامانه به حالت اولیه پیش‌فرض بازگردانده شدند.');
  };

  // --- Security & Password Handlers ---
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityError('');

    if (!currentPassInput) {
      setSecurityError('لطفاً کلمه عبور فعلی خود را جهت احراز هویت وارد نمایید.');
      return;
    }

    if (currentPassInput !== adminCreds.password) {
      setSecurityError('کلمه عبور فعلی وارد شده اشتباه است.');
      return;
    }

    if (!newUsernameInput.trim()) {
      setSecurityError('نام کاربری نمی‌تواند خالی باشد.');
      return;
    }

    if (!newPassInput || newPassInput.length < 4) {
      setSecurityError('کلمه عبور جدید باید حداقل دارای ۴ کاراکتر باشد.');
      return;
    }

    if (newPassInput !== confirmPassInput) {
      setSecurityError('تکرار کلمه عبور جدید با کلمه عبور همخوانی ندارد.');
      return;
    }

    const updatedCreds: AdminCredentials = {
      username: newUsernameInput.trim(),
      password: newPassInput,
      lastUpdated: new Date().toLocaleDateString('fa-IR')
    };

    saveAdminCredentials(updatedCreds);
    setAdminCreds(updatedCreds);
    setCurrentPassInput('');
    setNewPassInput('');
    setConfirmPassInput('');
    setSecurityError('');
    showNotify(`نام کاربری و رمز عبور مدیر با موفقیت به‌روزرسانی شدند.`);
  };

  const handleResetCredentials = () => {
    if (!window.confirm('آیا مطمئن هستید که می‌خواهید رمز ورود به حالت پیش‌فرض (admin / admin) بازگردانده شود؟')) {
      return;
    }
    const defaultCreds = resetAdminCredentialsToDefault();
    setAdminCreds(defaultCreds);
    setNewUsernameInput(defaultCreds.username);
    setCurrentPassInput('');
    setNewPassInput('');
    setConfirmPassInput('');
    setSecurityError('');
    showNotify('کلمه عبور و نام کاربری مدیر به حالت اولیه (admin) بازگردانی شد.');
  };

  // Filtered queries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchStatus = inquiryStatusFilter === 'all' || inq.status === inquiryStatusFilter;
    const q = inquirySearch.trim().toLowerCase();
    const matchQuery =
      !q ||
      inq.name.toLowerCase().includes(q) ||
      inq.phone.includes(q) ||
      (inq.company && inq.company.toLowerCase().includes(q)) ||
      inq.message.toLowerCase().includes(q) ||
      inq.serviceType.toLowerCase().includes(q);
    return matchStatus && matchQuery;
  });

  const filteredProducts = products.filter((p) => {
    const matchCat = productCategoryFilter === 'all' || p.category.includes(productCategoryFilter);
    const q = productSearch.trim().toLowerCase();
    const matchQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.model.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q);
    return matchCat && matchQuery;
  });

  const filteredProjects = projects.filter((p) => {
    const q = projectSearch.trim().toLowerCase();
    return (
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.client.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q)
    );
  });

  const newInquiryCount = inquiries.filter((i) => i.status === 'new').length;
  const inProgressCount = inquiries.filter((i) => i.status === 'in_progress').length;
  const completedCount = inquiries.filter((i) => i.status === 'completed').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-['Vazirmatn',sans-serif] p-4 sm:p-6 pb-20">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Management Header */}
        <header className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-2xl">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/20">
              <Shield className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                پنل مدیریت جامع بومیا حفاظت گستر
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded font-mono font-bold">
                  سیستم فعال (Node.js Live)
                </span>
              </div>
              <div className="text-xs text-slate-400">
                مدیریت کامل محصولات، پروژه‌ها، استعلام‌ها و تنظیمات سایت به صورت زنده
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-300">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-400">مدیر:</span>
              <span className="text-white font-mono font-bold">{adminCreds.username}</span>
            </div>

            <button
              onClick={() => setActiveTab('security')}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              title="تغییر کلمه عبور ورود به پنل"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">تغییر رمز</span>
            </button>

            <button
              onClick={handleExportFullBackup}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              title="دانلود فایل پشتیبان کامل دیتابیس"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">پشتیبان JSON</span>
            </button>

            <button
              onClick={onSwitchToLivePreview}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">مشاهده سایت</span>
            </button>

            {onLogout && (
              <button
                onClick={onLogout}
                className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                title="خروج از حساب مدیریت"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline">خروج</span>
              </button>
            )}
          </div>
        </header>

        {/* Global Notification Toast */}
        {notification && (
          <div
            className={`p-4 rounded-xl border text-xs flex items-center justify-between gap-3 shadow-xl animate-fade-in ${
              notification.type === 'success'
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                : notification.type === 'error'
                ? 'bg-red-500/15 border-red-500/40 text-red-300'
                : 'bg-blue-500/15 border-blue-500/40 text-blue-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold">{notification.message}</span>
            </div>
            <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Overview Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div
            onClick={() => {
              setActiveTab('inquiries');
              setInquiryStatusFilter('new');
            }}
            className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 p-4 rounded-2xl cursor-pointer transition"
          >
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>استعلام‌های جدید</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-400 font-mono">{newInquiryCount}</div>
            <div className="text-[11px] text-slate-500 mt-1">نیاز به تماس اولیه</div>
          </div>

          <div
            onClick={() => {
              setActiveTab('inquiries');
              setInquiryStatusFilter('all');
            }}
            className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 p-4 rounded-2xl cursor-pointer transition"
          >
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>کل درخواست‌ها</span>
              <PhoneCall className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-black text-white font-mono">{inquiries.length}</div>
            <div className="text-[11px] text-slate-500 mt-1">{completedCount} قرارداد نهایی</div>
          </div>

          <div
            onClick={() => setActiveTab('products')}
            className="bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 p-4 rounded-2xl cursor-pointer transition"
          >
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>محصولات در کاتالوگ</span>
              <Package className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-white font-mono">{products.length}</div>
            <div className="text-[11px] text-slate-500 mt-1">
              {products.filter((p) => p.isFeatured).length} محصول ویژه صفحه اول
            </div>
          </div>

          <div
            onClick={() => setActiveTab('projects')}
            className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 p-4 rounded-2xl cursor-pointer transition"
          >
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>پروژه‌های ثبت شده</span>
              <Briefcase className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white font-mono">{projects.length}</div>
            <div className="text-[11px] text-slate-500 mt-1">نمونه کارهای اجرایی</div>
          </div>
        </div>

        {/* Main Admin Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'inquiries'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <PhoneCall className="w-4 h-4 text-cyan-300" />
            صندوق استعلام‌ها و پیام‌ها
            {newInquiryCount > 0 && (
              <span className="bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full font-mono text-[10px] font-black">
                {newInquiryCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'products'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Package className="w-4 h-4 text-amber-400" />
            مدیریت محصولات ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'projects'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Briefcase className="w-4 h-4 text-emerald-400" />
            مدیریت پروژه‌ها ({projects.length})
          </button>

          <button
            onClick={() => {
              setTempSettings(siteSettings);
              setActiveTab('settings');
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Settings className="w-4 h-4 text-purple-400" />
            تنظیمات عمومی سایت و تماس
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'security'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Lock className="w-4 h-4 text-cyan-300" />
            امنیت و مدیریت رمز عبور
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'backup'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Database className="w-4 h-4 text-rose-400" />
            پشتیبان‌گیری و دیتابیس
          </button>
        </div>

        {/* TAB 1: INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-cyan-400" />
                  صندوق استعلام‌های قیمت و درخواست‌های مشاوره
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  درخواست‌های ثبت‌شده توسط کاربران در فرم استعلام و محاسبه‌گر هوشمند آنلاین
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportInquiriesCsv}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  خروجی اکسل (CSV)
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Status Chips */}
              <div className="flex flex-wrap gap-1.5 text-xs">
                {[
                  { id: 'all', label: 'همه وضعیت‌ها' },
                  { id: 'new', label: 'درخواست جدید' },
                  { id: 'contacted', label: 'تماس گرفته شد' },
                  { id: 'in_progress', label: 'در حال کارشناسی' },
                  { id: 'completed', label: 'قرارداد / تکمیل' },
                  { id: 'cancelled', label: 'لغو شده' }
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setInquiryStatusFilter(st.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      inquiryStatusFilter === st.id
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative min-w-[240px]">
                <Search className="w-3.5 h-3.5 absolute right-3 top-3 text-slate-500" />
                <input
                  type="text"
                  placeholder="جستجو در نام، شماره یا پیام..."
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Table or Cards */}
            {filteredInquiries.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
                هیچ درخواستی با معیارهای انتخاب‌شده یافت نشد.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">شناسه</th>
                      <th className="p-3">نام متقاضی</th>
                      <th className="p-3">شماره تماس</th>
                      <th className="p-3">شرکت / پروژه</th>
                      <th className="p-3">نوع خدمت / موضوع</th>
                      <th className="p-3">تاریخ ثبت</th>
                      <th className="p-3">وضعیت</th>
                      <th className="p-3 text-center">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredInquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-slate-950/60 transition">
                        <td className="p-3 font-mono text-cyan-400 font-bold">{inq.id}</td>
                        <td className="p-3 font-semibold text-white">{inq.name}</td>
                        <td className="p-3 font-mono text-slate-300" dir="ltr">
                          {inq.phone}
                        </td>
                        <td className="p-3 text-slate-300">{inq.company || '—'}</td>
                        <td className="p-3 text-slate-300 max-w-[200px] truncate">{inq.serviceType}</td>
                        <td className="p-3 text-slate-400 font-mono">{inq.date}</td>
                        <td className="p-3">
                          <select
                            value={inq.status}
                            onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value as any)}
                            className="bg-slate-950 border border-slate-700 text-xs text-white rounded-lg px-2 py-1 focus:outline-none focus:border-cyan-400 cursor-pointer"
                          >
                            <option value="new">درخواست جدید</option>
                            <option value="contacted">تماس گرفته شد</option>
                            <option value="in_progress">در حال کارشناسی</option>
                            <option value="completed">قرارداد / تکمیل</option>
                            <option value="cancelled">لغو شده</option>
                          </select>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => {
                                setSelectedInquiry(inq);
                                setInquiryNoteInput(inq.adminNotes || '');
                              }}
                              className="p-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 transition"
                              title="مشاهده جزئیات و یادداشت"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="p-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/40 text-red-300 transition"
                              title="حذف استعلام"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PRODUCTS */}
        {activeTab === 'products' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Package className="w-4 h-4 text-amber-400" />
                  مدیریت محصولات و تجهیزات نظارت تصویری ({products.length})
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  افزودن، ویرایش مشخصات فنی، تعیین محصولات ویژه صفحه اول و حذف تجهیزات
                </p>
              </div>

              <button
                onClick={handleOpenAddProduct}
                className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                افزودن محصول جدید
              </button>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5 text-xs">
                {[
                  { id: 'all', label: 'همه دسته‌ها' },
                  { id: 'تحت شبکه', label: 'دوربین تحت شبکه (IP)' },
                  { id: 'اسپیددام', label: 'دوربین اسپیددام (PTZ)' },
                  { id: 'پلاک‌خوان', label: 'سیستم پلاک‌خوان' },
                  { id: 'ذخیره‌ساز', label: 'NVR و سرور' },
                  { id: 'کنترل تردد', label: 'کنترل تردد' },
                  { id: 'اعلام', label: 'اعلام و اطفاء حریق' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setProductCategoryFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      productCategoryFilter === cat.id
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[240px]">
                <Search className="w-3.5 h-3.5 absolute right-3 top-3 text-slate-500" />
                <input
                  type="text"
                  placeholder="جستجو در عنوان یا مدل کالا..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition"
                >
                  <div>
                    <div className="relative h-44 bg-slate-900">
                      <img src={prod.imageUrl} alt={prod.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2.5 right-2.5 bg-slate-950/90 text-cyan-400 font-mono text-[11px] px-2 py-0.5 rounded border border-slate-700">
                        {prod.model}
                      </div>
                      <button
                        onClick={() => handleToggleProductFeatured(prod.id)}
                        className={`absolute top-2.5 left-2.5 p-1.5 rounded-lg text-xs transition ${
                          prod.isFeatured
                            ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                            : 'bg-slate-950/80 text-slate-400 hover:text-amber-400'
                        }`}
                        title={prod.isFeatured ? 'محصول ویژه صفحه اصلی است' : 'تبدیل به محصول ویژه صفحه اصلی'}
                      >
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </button>
                      <div className="absolute bottom-2.5 right-2.5 bg-slate-900/90 text-slate-300 text-[10px] px-2 py-0.5 rounded">
                        {prod.category}
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <h4 className="text-sm font-bold text-white line-clamp-1">{prod.title}</h4>
                      <div className="text-xs text-slate-400 space-y-1 bg-slate-900 p-2.5 rounded-lg">
                        <div className="flex justify-between">
                          <span>رزولوشن:</span>
                          <span className="text-slate-200 font-medium">{prod.resolution}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>دید در شب:</span>
                          <span className="text-slate-200">{prod.nightVision}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>گارانتی:</span>
                          <span className="text-emerald-400">{prod.warranty}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex gap-2">
                    <button
                      onClick={() => handleOpenEditProduct(prod)}
                      className="flex-1 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      ویرایش
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(prod.id, prod.title)}
                      className="p-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 text-xs rounded-lg transition"
                      title="حذف محصول"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                  مدیریت پروژه‌ها و نمونه کارهای اجرایی ({projects.length})
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  ثبت تجارب صنعتی، پروژه‌های پتروشیمی، متراژ فیبر نوری و تعداد دوربین‌ها
                </p>
              </div>

              <button
                onClick={handleOpenAddProject}
                className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                ثبت پروژه جدید
              </button>
            </div>

            {/* Project Search Bar */}
            <div className="relative max-w-sm">
              <Search className="w-3.5 h-3.5 absolute right-3 top-3 text-slate-500" />
              <input
                type="text"
                placeholder="جستجو در عنوان یا کارفرما..."
                value={projectSearch}
                onChange={(e) => setProjectSearch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Projects List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition"
                >
                  <div>
                    <div className="relative h-44 bg-slate-900">
                      <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2.5 right-2.5 bg-slate-950/90 text-xs font-bold text-white px-2.5 py-0.5 rounded border border-slate-700">
                        {proj.category}
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="text-xs text-cyan-400 font-semibold">{proj.client}</div>
                      <h4 className="text-sm font-bold text-white line-clamp-1">{proj.title}</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs bg-slate-900 p-2.5 rounded-lg text-slate-300">
                        <div>
                          تعداد دوربین: <span className="text-amber-400 font-bold font-mono">{proj.cameraCount}</span>
                        </div>
                        <div>
                          فیبر نوری: <span className="text-cyan-400 font-bold font-mono">{proj.fiberDistance}</span>
                        </div>
                        <div className="col-span-2 text-slate-400 text-[11px]">موقعیت: {proj.location}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex gap-2">
                    <button
                      onClick={() => handleOpenEditProject(proj)}
                      className="flex-1 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      ویرایش
                    </button>
                    <button
                      onClick={() => handleDeleteProject(proj.id, proj.title)}
                      className="p-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 text-xs rounded-lg transition"
                      title="حذف پروژه"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SETTINGS & CUSTOMIZER */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveAllSettings} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Settings className="w-4 h-4 text-purple-400" />
                  تنظیمات سراسری سایت، هویت بصری و اطلاعات تماس
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  تغییرات شما بلافاصله پس از ذخیره بر روی کل بخش‌های سایت زنده منعکس خواهد شد.
                </p>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
              >
                <Save className="w-4 h-4" />
                ذخیره کلیه تنظیمات
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              {/* Box 1: Brand & Contacts */}
              <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="font-bold text-white text-sm pb-2 border-b border-slate-800 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  اطلاعات تماس و دفتر مرکزی
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">نام شرکت / سامانه</label>
                  <input
                    type="text"
                    value={tempSettings.companyName}
                    onChange={(e) => setTempSettings({ ...tempSettings, companyName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">زیرعنوان شرکت</label>
                  <input
                    type="text"
                    value={tempSettings.companySubtitle}
                    onChange={(e) => setTempSettings({ ...tempSettings, companySubtitle: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">تلفن دفتر مرکزی</label>
                  <input
                    type="text"
                    value={tempSettings.phone1}
                    onChange={(e) => setTempSettings({ ...tempSettings, phone1: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-400 font-mono"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">خط اضطراری ۲۴ ساعته (Hotline)</label>
                  <input
                    type="text"
                    value={tempSettings.phoneHotline}
                    onChange={(e) => setTempSettings({ ...tempSettings, phoneHotline: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-400 font-mono text-amber-300"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">ایمیل رسمی</label>
                  <input
                    type="email"
                    value={tempSettings.email}
                    onChange={(e) => setTempSettings({ ...tempSettings, email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-400 font-mono"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">آدرس کامل دفتر مرکزی</label>
                  <input
                    type="text"
                    value={tempSettings.address}
                    onChange={(e) => setTempSettings({ ...tempSettings, address: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Box 2: Hero Banner Content */}
              <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="font-bold text-white text-sm pb-2 border-b border-slate-800 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  محتوای بنر اصلی صفحه اول (Hero Section)
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">متن نشان متحرک (Badge)</label>
                  <input
                    type="text"
                    value={tempSettings.heroBadge}
                    onChange={(e) => setTempSettings({ ...tempSettings, heroBadge: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">عنوان اصلی تیتر</label>
                  <input
                    type="text"
                    value={tempSettings.heroTitle}
                    onChange={(e) => setTempSettings({ ...tempSettings, heroTitle: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">متن رنگی تیتر (گرادیان)</label>
                  <input
                    type="text"
                    value={tempSettings.heroTitleGradient}
                    onChange={(e) => setTempSettings({ ...tempSettings, heroTitleGradient: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-cyan-400 font-bold focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">توضیحات پاراگراف بنر</label>
                  <textarea
                    rows={3}
                    value={tempSettings.heroSubtitle}
                    onChange={(e) => setTempSettings({ ...tempSettings, heroSubtitle: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-400 leading-relaxed"
                  ></textarea>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-slate-400 mb-1">آمار پروژه‌ها</label>
                    <input
                      type="text"
                      value={tempSettings.heroProjectsCount}
                      onChange={(e) => setTempSettings({ ...tempSettings, heroProjectsCount: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white text-center font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">مدت گارانتی</label>
                    <input
                      type="text"
                      value={tempSettings.heroWarrantyMonths}
                      onChange={(e) => setTempSettings({ ...tempSettings, heroWarrantyMonths: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-cyan-400 text-center font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">درصد پایداری</label>
                    <input
                      type="text"
                      value={tempSettings.heroUptimePercent}
                      onChange={(e) => setTempSettings({ ...tempSettings, heroUptimePercent: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-emerald-400 text-center font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">متن کپی‌رایت فوتر</label>
                  <input
                    type="text"
                    value={tempSettings.copyrightText}
                    onChange={(e) => setTempSettings({ ...tempSettings, copyrightText: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition cursor-pointer"
              >
                ذخیره تغییرات تنظیمات سایت
              </button>
            </div>
          </form>
        )}

        {/* TAB 5: BACKUP & DATABASE */}
        {activeTab === 'backup' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-rose-400" />
                مدیریت دیتابیس محلی، خروجی پشتیبان و بازیابی اطلاعات
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                کلیه محصولات اضافه شده، پروژه‌ها، استعلام‌ها و تنظیمات سایت شما به صورت امن در حافظه پایدار مرورگر ذخیره
                می‌شوند و می‌توانید هر زمان فایل کامل آن را خروجی گرفته یا بازیابی کنید.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* 1. Export JSON */}
              <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-white font-bold text-sm mb-1">
                    <Download className="w-4 h-4 text-cyan-400" />
                    دانلود فایل پشتیبان (Export)
                  </div>
                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    تهیه یک فایل کامل JSON از تمامی محصولات، پروژه‌ها، تنظیمات و درخواست‌های مشتریان برای بایگانی امن.
                  </p>
                </div>
                <button
                  onClick={handleExportFullBackup}
                  className="w-full py-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-bold rounded-lg transition"
                >
                  دریافت فایل پشتیبان JSON
                </button>
              </div>

              {/* 2. Import JSON */}
              <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-white font-bold text-sm mb-1">
                    <Upload className="w-4 h-4 text-emerald-400" />
                    بازیابی از فایل (Import)
                  </div>
                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    بارگذاری فایل JSON پشتیبان قبلی و جایگزینی آن با اطلاعات فعلی سیستم به صورت آنی.
                  </p>
                </div>
                <label className="w-full py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold rounded-lg transition text-center cursor-pointer block">
                  <span>انتخاب و بارگذاری فایل JSON</span>
                  <input type="file" accept=".json" onChange={handleImportBackupFile} className="hidden" />
                </label>
              </div>

              {/* 3. Factory Reset */}
              <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-red-400 font-bold text-sm mb-1">
                    <RefreshCw className="w-4 h-4 text-red-400" />
                    بازنشانی به حالت کارخانه
                  </div>
                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    پاکسازی تمامی تغییرات انجام شده و بارگذاری مجدد اطلاعات نمونه اولیه دوربین‌ها و پروژه‌ها.
                  </p>
                </div>
                <button
                  onClick={handleFactoryReset}
                  className="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 font-bold rounded-lg transition cursor-pointer"
                >
                  بازگردانی به داده‌های اولیه
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SECURITY & PASSWORD MANAGEMENT */}
        {activeTab === 'security' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    امنیت و مدیریت رمز عبور ورود
                    <span className="text-[11px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded font-mono font-bold">
                      کنترل دسترسی
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    تعیین کلمه عبور اختصاصی و ایمن‌سازی دسترسی به پیشخوان مدیریت شرکت بومیا
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">آخرین تغییر رمز:</span>
                <span className="text-xs font-mono font-bold text-cyan-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                  {adminCreds.lastUpdated}
                </span>
              </div>
            </div>

            {/* Security Error Banner */}
            {securityError && (
              <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center justify-between gap-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 shrink-0 text-rose-400" />
                  <span className="font-semibold">{securityError}</span>
                </div>
                <button onClick={() => setSecurityError('')} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form Column (Span 2) */}
              <div className="lg:col-span-2 bg-slate-950 p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <KeyRound className="w-4 h-4 text-amber-400" />
                    فرم تغییر کلمه عبور و مشخصات مدیر
                  </div>
                  <span className="text-[11px] text-slate-500">تمامی فیلدها الزامی هستند</span>
                </div>

                <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
                  {/* Current Password Field */}
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1.5 flex items-center justify-between">
                      <span>کلمه عبور فعلی (جهت احراز هویت):</span>
                      <span className="text-slate-500 text-[11px]">رمز کنونی شما برای تایید تغییرات</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPass ? 'text' : 'password'}
                        value={currentPassInput}
                        onChange={(e) => setCurrentPassInput(e.target.value)}
                        placeholder="کلمه عبور فعلی را وارد کنید..."
                        className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl p-3 pl-10 text-white font-mono placeholder-slate-600 outline-none transition"
                        dir="ltr"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPass(!showCurrentPass)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                      >
                        {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    {/* New Username */}
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">
                        نام کاربری مدیر:
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={newUsernameInput}
                          onChange={(e) => setNewUsernameInput(e.target.value)}
                          placeholder="نام کاربری (پیش‌فرض: admin)"
                          className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl p-3 pl-10 text-white font-mono placeholder-slate-600 outline-none transition"
                          dir="ltr"
                        />
                        <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">
                        کلمه عبور جدید (حداقل ۴ کاراکتر):
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPass ? 'text' : 'password'}
                          value={newPassInput}
                          onChange={(e) => setNewPassInput(e.target.value)}
                          placeholder="کلمه عبور جدید..."
                          className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl p-3 pl-10 text-white font-mono placeholder-slate-600 outline-none transition"
                          dir="ltr"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPass(!showNewPass)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                        >
                          {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1.5">
                      تکرار کلمه عبور جدید:
                    </label>
                    <input
                      type="password"
                      value={confirmPassInput}
                      onChange={(e) => setConfirmPassInput(e.target.value)}
                      placeholder="مجدداً کلمه عبور جدید را وارد فرمایید..."
                      className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl p-3 text-white font-mono placeholder-slate-600 outline-none transition"
                      dir="ltr"
                    />
                  </div>

                  {/* Password Strength Indicator */}
                  {newPassInput && (
                    <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">قدرت کلمه عبور انتخابی:</span>
                        <span
                          className={`font-bold ${
                            newPassInput.length < 6
                              ? 'text-amber-400'
                              : newPassInput.length >= 8 && /\d/.test(newPassInput)
                              ? 'text-emerald-400'
                              : 'text-cyan-400'
                          }`}
                        >
                          {newPassInput.length < 6
                            ? 'معمولی (قابل قبول)'
                            : newPassInput.length >= 8 && /\d/.test(newPassInput)
                            ? 'بسیار قوی و ایمن'
                            : 'خوب'}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden flex">
                        <div
                          className={`h-full transition-all duration-300 ${
                            newPassInput.length < 6
                              ? 'w-1/3 bg-amber-400'
                              : newPassInput.length >= 8 && /\d/.test(newPassInput)
                              ? 'w-full bg-emerald-400'
                              : 'w-2/3 bg-cyan-400'
                          }`}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-slate-950" />
                      ثبت و ذخیره‌سازی کلمه عبور جدید
                    </button>
                  </div>
                </form>
              </div>

              {/* Status & Quick Actions Column */}
              <div className="space-y-4">
                {/* Active Session Status */}
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    وضعیت نشست و حساب فعال
                  </div>

                  <div className="space-y-2 text-xs divide-y divide-slate-800/60">
                    <div className="flex justify-between items-center pt-1.5">
                      <span className="text-slate-400">نام کاربری فعال:</span>
                      <span className="text-cyan-400 font-mono font-bold">{adminCreds.username}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-slate-400">سطح دسترسی:</span>
                      <span className="text-emerald-400 font-bold">مدیر ارشد (Super Admin)</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-slate-400">وضعیت احراز هویت:</span>
                      <span className="text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono text-[10px]">
                        احراز شده (Verified)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Reset to Default */}
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <RefreshCw className="w-4 h-4 text-amber-400" />
                    بازنشانی به رمز اولیه (admin)
                  </div>
                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    در صورت فراموشی یا نیاز به بازگردانی سریع، می‌توانید مشخصات را به نام کاربری <strong className="text-slate-200">admin</strong> و رمز <strong className="text-slate-200">admin</strong> بازنشانی کنید.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetCredentials}
                    className="w-full py-2.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    بازنشانی رمز به پیش‌فرض کارخانه
                  </button>
                </div>

                {/* Security Tips */}
                <div className="p-5 bg-slate-950/70 rounded-2xl border border-slate-800/80 space-y-2 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5 text-white font-bold text-xs">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                    نکات امنیتی مهم:
                  </div>
                  <ul className="space-y-1.5 list-disc list-inside text-slate-400 leading-relaxed">
                    <li>پس از پایان مدیریت، از دکمه «خروج» بالای صفحه استفاده نمایید.</li>
                    <li>رمز عبور در مرورگر و فضای امن دستگاه شما ذخیره می‌گردد.</li>
                    <li>همواره یک نسخه پشتیبان JSON از دیتابیس دانلود و نگهداری کنید.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- INQUIRY DETAILS & NOTES MODAL --- */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="font-mono text-cyan-400 font-bold text-xs">{selectedInquiry.id}</span>
                <span className="text-sm font-bold text-white">{selectedInquiry.name}</span>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">شماره تماس:</span>
                  <span className="font-mono text-white font-bold text-sm" dir="ltr">
                    {selectedInquiry.phone}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">شرکت / پروژه:</span>
                  <span className="text-slate-200">{selectedInquiry.company || 'شخصی'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">نوع سرویس / محصول:</span>
                  <span className="text-cyan-300">{selectedInquiry.serviceType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">تاریخ درخواست:</span>
                  <span className="text-slate-300 font-mono">{selectedInquiry.date}</span>
                </div>
              </div>

              <div>
                <div className="font-bold text-slate-300 mb-1">متن پیام یا برآورد محاسبه‌گر:</div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-200 whitespace-pre-line leading-relaxed font-sans max-h-48 overflow-y-auto">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Admin Note Section */}
              <div className="pt-2">
                <div className="font-bold text-white mb-1.5 flex items-center justify-between">
                  <span>یادداشت پیگیری مدیریت (داخلی):</span>
                  <button
                    onClick={handleSaveInquiryNote}
                    className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <Save className="w-3 h-3" />
                    ذخیره یادداشت
                  </button>
                </div>
                <textarea
                  rows={2}
                  placeholder="مثال: تماس گرفته شد، بازدید برای شنبه ساعت ۱۰ هماهنگ گردید..."
                  value={inquiryNoteInput}
                  onChange={(e) => setInquiryNoteInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                ></textarea>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
              >
                بستن پنجره
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- ADD / EDIT PRODUCT MODAL --- */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  {editingProduct ? `ویرایش محصول: ${editingProduct.title}` : 'افزودن محصول جدید به کاتالوگ'}
                </h3>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">عنوان کامل محصول *</label>
                  <input
                    type="text"
                    required
                    value={prodTitle}
                    onChange={(e) => setProdTitle(e.target.value)}
                    placeholder="مثال: دوربین مداربسته بولت هوشمند ۴K سونی..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">کد مدل فنی دستگاه *</label>
                  <input
                    type="text"
                    required
                    value={prodModel}
                    onChange={(e) => setProdModel(e.target.value)}
                    placeholder="BHG-IPC-..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-cyan-300 font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">دسته‌بندی تجهیزات</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="دوربین تحت شبکه (IP)">دوربین تحت شبکه (IP)</option>
                    <option value="دوربین اسپیددام (PTZ)">دوربین اسپیددام (PTZ)</option>
                    <option value="سیستم پلاک‌خوان (LPR / ANPR)">سیستم پلاک‌خوان (LPR / ANPR)</option>
                    <option value="دستگاه ذخیره‌ساز (NVR / Server)">دستگاه ذخیره‌ساز (NVR / Server)</option>
                    <option value="کنترل تردد و اکسس کنترل">کنترل تردد و اکسس کنترل</option>
                    <option value="سیستم‌های اعلام و اطفاء حریق">سیستم‌های اعلام و اطفاء حریق</option>
                    <option value="تجهیزات شبکه و فیبر نوری">تجهیزات شبکه و فیبر نوری</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">کیفیت / رزولوشن تصویر</label>
                  <input
                    type="text"
                    value={prodResolution}
                    onChange={(e) => setProdResolution(e.target.value)}
                    placeholder="8 مگاپیکسل 4K UHD..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">دید در شب</label>
                  <input
                    type="text"
                    value={prodNightVision}
                    onChange={(e) => setProdNightVision(e.target.value)}
                    placeholder="رنگی تا ۶۰ متر یا مادون قرمز لیزری..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">گارانتی و خدمات</label>
                  <input
                    type="text"
                    value={prodWarranty}
                    onChange={(e) => setProdWarranty(e.target.value)}
                    placeholder="۳۶ ماه گارانتی طلایی تعویض بومیا..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-emerald-400 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">استاندارد مقاومت بدنه</label>
                  <input
                    type="text"
                    value={prodProtection}
                    onChange={(e) => setProdProtection(e.target.value)}
                    placeholder="استاندارد IP67 و ضد ضربه IK10..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">آدرس تصویر محصول (Image URL)</label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={prodImageUrl}
                      onChange={(e) => setProdImageUrl(e.target.value)}
                      placeholder="https://..."
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                    />
                    <div className="w-12 h-10 rounded-lg overflow-hidden border border-slate-700 bg-slate-950 shrink-0">
                      <img src={prodImageUrl} alt="پیش‌نمایش" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">ویژگی‌های شاخص (تگ‌ها)</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="یک ویژگی وارد کنید و دکمه افزودن را بزنید..."
                      value={prodFeatureInput}
                      onChange={(e) => setProdFeatureInput(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2 text-white focus:outline-none focus:border-cyan-400"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (prodFeatureInput.trim()) {
                          setProdFeatures([...prodFeatures, prodFeatureInput.trim()]);
                          setProdFeatureInput('');
                        }
                      }}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-xl font-bold"
                    >
                      افزودن
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {prodFeatures.map((ft, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-950 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-lg text-[11px] flex items-center gap-1.5"
                      >
                        {ft}
                        <button
                          type="button"
                          onClick={() => setProdFeatures(prodFeatures.filter((_, i) => i !== idx))}
                          className="text-red-400 hover:text-red-300"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">توضیحات و مشخصات تکمیلی</label>
                  <textarea
                    rows={3}
                    value={prodDescription}
                    onChange={(e) => setProdDescription(e.target.value)}
                    placeholder="توضیح دهید این دوربین برای چه اماکنی مناسب است..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400 leading-relaxed"
                  ></textarea>
                </div>

                <div className="sm:col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <input
                      type="checkbox"
                      checked={prodIsFeatured}
                      onChange={(e) => setProdIsFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-cyan-500 focus:ring-0 bg-slate-900 border-slate-700"
                    />
                    <span className="text-white font-semibold">
                      نمایش به عنوان محصول شاخص و برگزیده در صفحه اول سایت (Featured)
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-slate-800">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-cyan-500/25 transition cursor-pointer"
                >
                  {editingProduct ? 'ذخیره ویرایش‌های محصول' : 'ثبت و انتشار محصول در سایت'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="py-3 px-5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs transition"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD / EDIT PROJECT MODAL --- */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">
                  {editingProject ? `ویرایش پروژه: ${editingProject.title}` : 'ثبت پروژه یا نمونه‌کار جدید'}
                </h3>
              </div>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">عنوان کامل پروژه *</label>
                  <input
                    type="text"
                    required
                    value={projTitle}
                    onChange={(e) => setProjTitle(e.target.value)}
                    placeholder="مثال: طراحی و پیاده‌سازی سیستم نظارت تصویری پتروشیمی..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">کارفرما / سازمان *</label>
                  <input
                    type="text"
                    required
                    value={projClient}
                    onChange={(e) => setProjClient(e.target.value)}
                    placeholder="شرکت صنایع پتروشیمی..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-cyan-300 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">دسته‌بندی پروژه</label>
                  <select
                    value={projCategory}
                    onChange={(e) => setProjCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="صنعتی و نفت و گاز">صنعتی و نفت و گاز</option>
                    <option value="لجستیک و انبارداری">لجستیک و انبارداری</option>
                    <option value="برج‌های تجاری و مسکونی لوکس">برج‌های تجاری و مسکونی لوکس</option>
                    <option value="سازمان‌های دولتی و اداری">سازمان‌های دولتی و اداری</option>
                    <option value="بیمارستان‌ها و مراکز درمانی">بیمارستان‌ها و مراکز درمانی</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">موقعیت جغرافیایی</label>
                  <input
                    type="text"
                    value={projLocation}
                    onChange={(e) => setProjLocation(e.target.value)}
                    placeholder="عسلویه، بوشهر..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">تاریخ اتمام پروژه</label>
                  <input
                    type="text"
                    value={projDate}
                    onChange={(e) => setProjDate(e.target.value)}
                    placeholder="اردیبهشت ۱۴۰۳..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">تعداد دوربین‌های نصب شده</label>
                  <input
                    type="number"
                    value={projCameraCount}
                    onChange={(e) => setProjCameraCount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">مسافت کابل‌کشی فیبر نوری</label>
                  <input
                    type="text"
                    value={projFiberDistance}
                    onChange={(e) => setProjFiberDistance(e.target.value)}
                    placeholder="۱۲.۵ کیلومتر..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">آدرس تصویر پروژه</label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={projImageUrl}
                      onChange={(e) => setProjImageUrl(e.target.value)}
                      placeholder="https://..."
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                    />
                    <div className="w-12 h-10 rounded-lg overflow-hidden border border-slate-700 bg-slate-950 shrink-0">
                      <img src={projImageUrl} alt="پیش‌نمایش" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">خلاصه توضیحات پروژه</label>
                  <textarea
                    rows={2}
                    value={projSummary}
                    onChange={(e) => setProjSummary(e.target.value)}
                    placeholder="خلاصه‌ای از ابعاد، امکانات و نیازمندی پروژه..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                  ></textarea>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">راهکار ارائه‌شده بومیا</label>
                  <textarea
                    rows={2}
                    value={projSolution}
                    onChange={(e) => setProjSolution(e.target.value)}
                    placeholder="توضیح تکنولوژی‌های ضد انفجار، فیبر نوری یا پردازش هوشمند..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                  ></textarea>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-slate-800">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-emerald-500/25 transition cursor-pointer"
                >
                  {editingProject ? 'ذخیره ویرایش‌های پروژه' : 'ثبت نهایی پروژه در سایت'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="py-3 px-5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs transition"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
