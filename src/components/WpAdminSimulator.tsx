import React, { useState } from 'react';
import {
  Layers,
  PhoneCall,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  FileText,
  Package,
  Briefcase,
  Settings,
  Sparkles,
  Search,
  ExternalLink,
  Shield,
  Eye,
  Trash2
} from 'lucide-react';
import { ConsultationRequest, PRODUCTS, PROJECTS } from '../data/mockData';

interface WpAdminSimulatorProps {
  inquiries: ConsultationRequest[];
  onUpdateInquiryStatus: (id: string, newStatus: ConsultationRequest['status']) => void;
  onDeleteInquiry: (id: string) => void;
  onResetDemoData: () => void;
  onSwitchToLivePreview: () => void;
}

export const WpAdminSimulator: React.FC<WpAdminSimulatorProps> = ({
  inquiries,
  onUpdateInquiryStatus,
  onDeleteInquiry,
  onResetDemoData,
  onSwitchToLivePreview
}) => {
  const [adminTab, setAdminTab] = useState<'inquiries' | 'products' | 'projects' | 'customizer' | 'demo'>('inquiries');
  const [selectedInquiry, setSelectedInquiry] = useState<ConsultationRequest | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [demoNotice, setDemoNotice] = useState<string | null>(null);

  const filteredInquiries = inquiries.filter((inq) => {
    if (filterStatus === 'all') return true;
    return inq.status === filterStatus;
  });

  const getStatusBadge = (status: ConsultationRequest['status']) => {
    switch (status) {
      case 'new':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Clock className="w-3 h-3" />
            درخواست جدید
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
            <PhoneCall className="w-3 h-3" />
            تماس گرفته شد
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
            <AlertCircle className="w-3 h-3" />
            در حال کارشناسی
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <CheckCircle className="w-3 h-3" />
            تکمیل شده / قرارداد
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
            <XCircle className="w-3 h-3" />
            لغو شده
          </span>
        );
    }
  };

  const handleRunDemoImporter = () => {
    onResetDemoData();
    setDemoNotice('درون‌ریزی داده‌های دمو با موفقیت انجام گردید. محصولات و پروژه‌های استاندارد در پایگاه‌داده بارگذاری شدند.');
    setTimeout(() => setDemoNotice(null), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-['Vazirmatn',sans-serif] p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top WordPress Admin Bar Banner */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold font-serif text-lg">
              W
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                پیشخوان مدیریت وردپرس (WordPress Admin)
                <span className="text-[10px] bg-slate-800 text-cyan-400 px-2 py-0.5 rounded border border-slate-700 font-mono">
                  Bumiya Engine v6.7
                </span>
              </div>
              <div className="text-xs text-slate-400">
                شبیه‌ساز واقعی بخش مدیریت پست‌تایپ‌ها، استعلام‌های ورودی و متاباکس‌های پوسته
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onSwitchToLivePreview}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              مشاهده سایت در فرانت‌اند
            </button>
          </div>
        </div>

        {/* Demo importer alert if triggered */}
        {demoNotice && (
          <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            {demoNotice}
          </div>
        )}

        {/* Main Admin layout: Sidebar + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Admin Sidebar Navigation */}
          <div className="lg:col-span-3 space-y-2">
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
              <div className="text-[11px] font-bold text-slate-500 px-3 py-1.5 uppercase">
                پست‌تایپ‌های پوسته بومیا
              </div>

              <button
                onClick={() => setAdminTab('inquiries')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                  adminTab === 'inquiries'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <PhoneCall className="w-4 h-4 text-cyan-400" />
                  <span>درخواست‌های استعلام و مشاوره</span>
                </div>
                <span className="font-mono text-[10px] bg-slate-900/80 px-1.5 py-0.5 rounded">
                  {inquiries.length}
                </span>
              </button>

              <button
                onClick={() => setAdminTab('products')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                  adminTab === 'products'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4 text-amber-400" />
                  <span>مدیریت محصولات و تجهیزات</span>
                </div>
                <span className="font-mono text-[10px] bg-slate-900/80 px-1.5 py-0.5 rounded">
                  {PRODUCTS.length}
                </span>
              </button>

              <button
                onClick={() => setAdminTab('projects')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                  adminTab === 'projects'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                  <span>مدیریت پروژه‌ها و نمونه‌کارها</span>
                </div>
                <span className="font-mono text-[10px] bg-slate-900/80 px-1.5 py-0.5 rounded">
                  {PROJECTS.length}
                </span>
              </button>

              <div className="text-[11px] font-bold text-slate-500 px-3 pt-3 pb-1 uppercase">
                تنظیمات قالب
              </div>

              <button
                onClick={() => setAdminTab('customizer')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                  adminTab === 'customizer'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <Settings className="w-4 h-4 text-purple-400" />
                <span>سفارشی‌سازی و اطلاعات تماس</span>
              </button>

              <button
                onClick={() => setAdminTab('demo')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                  adminTab === 'demo'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>درون‌ریزی دمو اولیه (۱-کلیک)</span>
              </button>
            </div>
          </div>

          {/* Admin Content Area */}
          <div className="lg:col-span-9">
            {/* TAB: Inquiries */}
            {adminTab === 'inquiries' && (
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <PhoneCall className="w-4 h-4 text-cyan-400" />
                      صندوق ورودی استعلام‌های قیمت و مشاوره (Post Type: consultation_req)
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      درخواست‌های ارسال شده از طریق پاپ‌آپ استعلام و محاسبه‌گر هوشمند بلافاصله در این بخش ذخیره می‌شوند.
                    </p>
                  </div>

                  {/* Filter chips */}
                  <div className="flex flex-wrap gap-1.5 text-xs">
                    {['all', 'new', 'contacted', 'in_progress', 'completed'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setFilterStatus(st)}
                        className={`px-2.5 py-1 rounded-lg transition ${
                          filterStatus === st
                            ? 'bg-blue-600 text-white font-bold'
                            : 'bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                      >
                        {st === 'all' && 'همه'}
                        {st === 'new' && 'جدید'}
                        {st === 'contacted' && 'تماس گرفته شد'}
                        {st === 'in_progress' && 'در حال کارشناسی'}
                        {st === 'completed' && 'تکمیل شده'}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredInquiries.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-xs">
                    هیچ درخواستی در این وضعیت ثبت نشده است. از فرانت‌اند فرم استعلام ارسال فرمایید.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-right text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                          <th className="pb-3 px-3">شناسه</th>
                          <th className="pb-3 px-3">نام متقاضی</th>
                          <th className="pb-3 px-3">شماره همراه</th>
                          <th className="pb-3 px-3">سازمان / شرکت</th>
                          <th className="pb-3 px-3">موضوع استعلام</th>
                          <th className="pb-3 px-3">وضعیت</th>
                          <th className="pb-3 px-3 text-center">عملیات</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80">
                        {filteredInquiries.map((inq) => (
                          <tr key={inq.id} className="hover:bg-slate-900/60 transition">
                            <td className="py-3 px-3 font-mono text-cyan-400 font-bold">{inq.id}</td>
                            <td className="py-3 px-3 font-bold text-white">{inq.name}</td>
                            <td className="py-3 px-3 font-mono text-slate-300" dir="ltr">{inq.phone}</td>
                            <td className="py-3 px-3 text-slate-300">{inq.company || '—'}</td>
                            <td className="py-3 px-3 text-slate-300 max-w-[180px] truncate">{inq.serviceType}</td>
                            <td className="py-3 px-3">
                              <select
                                value={inq.status}
                                onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value as any)}
                                className="bg-slate-900 border border-slate-700 text-xs rounded-lg px-2 py-1 text-white focus:outline-none focus:border-cyan-400"
                              >
                                <option value="new">جدید (New)</option>
                                <option value="contacted">تماس گرفته شد (Contacted)</option>
                                <option value="in_progress">در حال کارشناسی (In Progress)</option>
                                <option value="completed">تکمیل شده / قرارداد (Completed)</option>
                                <option value="cancelled">لغو شده (Cancelled)</option>
                              </select>
                            </td>
                            <td className="py-3 px-3">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => setSelectedInquiry(inq)}
                                  className="p-1.5 rounded-lg bg-blue-600/20 text-cyan-300 hover:bg-blue-600/40 transition"
                                  title="مشاهده متن کامل پیام"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => onDeleteInquiry(inq.id)}
                                  className="p-1.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/40 transition"
                                  title="حذف"
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

            {/* TAB: Products */}
            {adminTab === 'products' && (
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Package className="w-4 h-4 text-amber-400" />
                    لیست محصولات ثبت شده در کاستوم پست تایپ (product)
                  </h3>
                  <span className="text-xs text-slate-400">متاباکس‌های فنی در single-product.php نمایش داده می‌شوند</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PRODUCTS.map((prod) => (
                    <div key={prod.id} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] text-amber-400 font-mono">{prod.model}</span>
                          <h4 className="text-xs font-bold text-white mt-0.5">{prod.title}</h4>
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-400 space-y-1 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                        <div>دسته‌بندی: <span className="text-slate-200">{prod.category}</span></div>
                        <div>سنسور / کیفیت: <span className="text-slate-200">{prod.resolution}</span></div>
                        <div>گارانتی: <span className="text-emerald-400">{prod.warranty}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: Projects */}
            {adminTab === 'projects' && (
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-emerald-400" />
                    پروژه‌های ثبت شده در کاستوم پست تایپ (project)
                  </h3>
                  <span className="text-xs text-slate-400">نمونه کارهای با جزئیات فنی و فیبر نوری</span>
                </div>

                <div className="space-y-3">
                  {PROJECTS.map((proj) => (
                    <div key={proj.id} className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
                      <div>
                        <div className="text-xs text-cyan-400 font-semibold">{proj.client}</div>
                        <div className="text-sm font-bold text-white mt-0.5">{proj.title}</div>
                        <div className="text-xs text-slate-400 mt-1 flex gap-3">
                          <span>تعداد دوربین: {proj.cameraCount}</span>
                          <span>فیبر نوری: {proj.fiberDistance}</span>
                          <span>محل: {proj.location}</span>
                        </div>
                      </div>
                      <span className="text-xs bg-slate-950 px-2.5 py-1 rounded border border-slate-800 text-slate-300">
                        {proj.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: Customizer */}
            {adminTab === 'customizer' && (
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5">
                <div className="pb-4 border-b border-slate-800">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Settings className="w-4 h-4 text-purple-400" />
                    شخصی‌ساز پوسته بومیا (Theme Customizer - inc/customizer.php)
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    مدیر سایت می‌تواند بدون دستکاری کدها، کلیه اطلاعات هدر، فوتر، تلفن‌های اضطراری و لوگو را تغییر دهد.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                    <div className="font-bold text-white">تلفن دفتر مرکزی (Phone 1):</div>
                    <div className="font-mono text-cyan-400 bg-slate-950 p-2 rounded border border-slate-800" dir="ltr">
                      021-88992201
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                    <div className="font-bold text-white">خط اضطراری ۲۴ ساعته (Emergency Hotline):</div>
                    <div className="font-mono text-amber-400 bg-slate-950 p-2 rounded border border-slate-800" dir="ltr">
                      0912-345-6789
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                    <div className="font-bold text-white">آدرس ایمیل پشتیبانی (Email):</div>
                    <div className="font-mono text-slate-300 bg-slate-950 p-2 rounded border border-slate-800">
                      info@bumiya-hefazat.ir
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                    <div className="font-bold text-white">متن حق کپی‌رایت فوتر (Footer Copyright):</div>
                    <div className="text-slate-300 bg-slate-950 p-2 rounded border border-slate-800">
                      تمامی حقوق متعلق به شرکت مهندسی بومیا حفاظت گستر است © ۱۴۰۳
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Demo Importer */}
            {adminTab === 'demo' && (
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  درون‌ریزی محتوای اولیه دمو (One-Click Demo Importer - inc/demo-importer.php)
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  پس از فعال‌سازی پوسته در وردپرس، با فشردن دکمه زیر کلیه دسته‌بندی‌های دوربین‌ها، محصولات نمونه ۴K، پروژه‌های صنعتی و مقالات آموزشی به صورت خودکار به پایگاه‌داده وردپرس اضافه خواهند شد.
                </p>

                <div className="pt-4">
                  <button
                    onClick={handleRunDemoImporter}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    شروع درون‌ریزی داده‌های دمو اولیه
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="font-mono text-cyan-400 font-bold text-xs">{selectedInquiry.id}</span>
                <span className="text-sm font-bold text-white">{selectedInquiry.name}</span>
              </div>
              {getStatusBadge(selectedInquiry.status)}
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                <div>شماره تماس: <span className="font-mono text-white font-bold" dir="ltr">{selectedInquiry.phone}</span></div>
                <div>شرکت / پروژه: <span className="text-slate-300">{selectedInquiry.company || '—'}</span></div>
                <div>نوع سرویس / محصول: <span className="text-cyan-300">{selectedInquiry.serviceType}</span></div>
                <div>تاریخ ثبت: <span className="text-slate-400 font-mono">{selectedInquiry.date}</span></div>
              </div>

              <div>
                <div className="font-bold text-slate-300 mb-1">متن کامل پیام / برآورد محاسبه‌گر:</div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-200 whitespace-pre-line leading-relaxed font-sans">
                  {selectedInquiry.message}
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold"
              >
                بستن پنجره
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
