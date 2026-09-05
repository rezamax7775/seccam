import React, { useState, useId } from 'react';
import { Calculator, CheckCircle2, Shield, HardDrive, Cpu, X, Send, Sparkles } from 'lucide-react';

interface QuoteCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitQuote: (data: {
    serviceType: string;
    productName: string;
    message: string;
    name: string;
    phone: string;
    company: string;
  }) => void;
}

export const QuoteCalculatorModal: React.FC<QuoteCalculatorModalProps> = ({
  isOpen,
  onClose,
  onSubmitQuote
}) => {
  const [cameraCount, setCameraCount] = useState<number>(8);
  const [cameraType, setCameraType] = useState<'4k' | '4mp' | 'ptz' | 'lpr'>('4k');
  const [storageDays, setStorageDays] = useState<number>(30);
  const [cableMeters, setCableMeters] = useState<number>(300);
  const [aiEnabled, setAiEnabled] = useState<boolean>(true);
  const [accessControlDoors, setAccessControlDoors] = useState<number>(2);
  const [fireAlarmLoops, setFireAlarmLoops] = useState<number>(1);

  // Form info
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nameInputId = useId();
  const phoneInputId = useId();
  const companyInputId = useId();

  if (!isOpen) return null;

  // Calculation formulas
  const cameraUnitPrice = cameraType === '4k' ? 6500000 : cameraType === 'ptz' ? 24000000 : cameraType === 'lpr' ? 18500000 : 4200000;
  const cameraTypeLabel = cameraType === '4k' ? 'دوربین بولت ۴K UHD' : cameraType === 'ptz' ? 'اسپیددام چرخشی ۳۲X' : cameraType === 'lpr' ? 'پلاک‌خوان هوشمند ANPR' : 'دوربین ۴ مگاپیکسل دید در شب';

  // Storage estimation (GB per camera per day with H.265+)
  const gbPerDayPerCam = cameraType === '4k' ? 25 : 15;
  const totalGbNeeded = cameraCount * storageDays * gbPerDayPerCam;
  const tbNeeded = Math.ceil(totalGbNeeded / 900); // Enterprise HDDs in TB
  const storageEstimatedCost = tbNeeded * 5500000;

  // NVR requirement
  const nvrChannels = cameraCount <= 8 ? 8 : cameraCount <= 16 ? 16 : cameraCount <= 32 ? 32 : 64;
  const nvrCost = nvrChannels === 8 ? 9500000 : nvrChannels === 16 ? 16000000 : nvrChannels === 32 ? 28000000 : 48000000;

  // Cabling & passive network cost
  const cablingCost = cableMeters * 35000;

  // AI & Access Control additions
  const aiCost = aiEnabled ? cameraCount * 1200000 : 0;
  const accessControlCost = accessControlDoors * 14500000;
  const fireAlarmCost = fireAlarmLoops * 22000000;

  // Total estimate in Toman
  const totalEstimateToman = (cameraCount * cameraUnitPrice) + storageEstimatedCost + nvrCost + cablingCost + aiCost + accessControlCost + fireAlarmCost;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const summaryMessage = `برآورد اولیه هوشمند:
• تعداد ${cameraCount} عدد ${cameraTypeLabel}
• ذخیره‌ساز ${nvrChannels} کانال با ${tbNeeded} ترابایت هارد دیسک (${storageDays} روز ذخیره)
• ${cableMeters} متر کابل‌کشی و زیرساخت شبکه
• هوش مصنوعی و آنالیتیک تصویری: ${aiEnabled ? 'فعال' : 'غیرفعال'}
• کنترل تردد: ${accessControlDoors} درب مجهز به بیومتریک
• اعلام حریق: ${fireAlarmLoops} لوپ استاندارد
• برآورد کل تجهیزات: ${formatPrice(totalEstimateToman)}`;

    onSubmitQuote({
      name,
      phone,
      company: company || 'شخصی',
      serviceType: 'استعلام آنلاین و برآورد هوشمند پروژه',
      productName: `پکیج امنیتی ${cameraCount} دوربین + ${nvrChannels} کانال NVR`,
      message: summaryMessage
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div id="calculator-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div id="calculator-modal-container" className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                محاسبه‌گر هوشمند هزینه و مشخصات فنی پروژه امنیتی
                <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-normal">
                  نسخه مهندسی
                </span>
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                برآورد فوری حجم هارد دیسک، مشخصات دستگاه NVR و هزینه تقریبی تجهیزات
              </p>
            </div>
          </div>
          <button
            id="close-calculator-btn"
            onClick={onClose}
            className="w-10 h-10 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 max-h-[75vh] overflow-y-auto">
          {/* Controls column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Camera Type & Count */}
            <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/50 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  نوع دوربین مداربسته:
                </label>
                <span className="text-xs text-cyan-400 font-mono">کیفیت و رزولوشن</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: '4k', label: '۴K UHD بولت (۸MP)', sub: 'دید در شب رنگی' },
                  { id: '4mp', label: '۴ مگاپیکسل دام', sub: 'محیط اداری/داخلی' },
                  { id: 'ptz', label: 'اسپیددام ۳۲X', sub: 'چرخشی و محوطه باز' },
                  { id: 'lpr', label: 'پلاک‌خوان هوشمند', sub: 'ورودی پارکینگ و گیت' }
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setCameraType(type.id as any)}
                    className={`p-3 rounded-lg border text-right transition ${
                      cameraType === type.id
                        ? 'bg-blue-600/30 border-cyan-400 text-cyan-200'
                        : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="text-xs font-bold">{type.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{type.sub}</div>
                  </button>
                ))}
              </div>

              {/* Slider for count */}
              <div className="pt-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-slate-400">تعداد دوربین‌های مورد نیاز:</span>
                  <span className="text-sm font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-mono">
                    {cameraCount} عدد
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="64"
                  step="2"
                  value={cameraCount}
                  onChange={(e) => setCameraCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>۲ عدد (فروشگاهی)</span>
                  <span>۱۶ عدد (ساختمان)</span>
                  <span>۳۲ عدد (انبار)</span>
                  <span>۶۴ عدد (کارخانه)</span>
                </div>
              </div>
            </div>

            {/* Storage & Cabling */}
            <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/50 space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-emerald-400" />
                    مدت زمان ذخیره‌سازی تصاویر:
                  </label>
                  <span className="text-xs font-bold text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {storageDays} روز پیوسته
                  </span>
                </div>
                <input
                  type="range"
                  min="7"
                  max="90"
                  step="7"
                  value={storageDays}
                  onChange={(e) => setStorageDays(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-slate-300">طول تقریبی کابل‌کشی / فیبر نوری:</span>
                  <span className="text-xs font-bold text-cyan-400 font-mono">
                    {cableMeters} متر
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  step="50"
                  value={cableMeters}
                  onChange={(e) => setCableMeters(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>
            </div>

            {/* Supplementary Modules */}
            <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/50 space-y-3">
              <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-400" />
                سایر سامانه‌های حفاظتی یکپارچه:
              </span>
              <div className="space-y-2">
                <label className="flex items-center justify-between p-2.5 bg-slate-900/50 rounded-lg border border-slate-700/50 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={aiEnabled}
                      onChange={(e) => setAiEnabled(e.target.checked)}
                      className="w-4 h-4 rounded text-cyan-500 bg-slate-800 border-slate-600 focus:ring-cyan-400"
                    />
                    <span className="text-xs text-slate-200">آنالیز هوش مصنوعی تشخیص چهره و ورود غیرمجاز</span>
                  </div>
                  <span className="text-[11px] text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded">AI Analytics</span>
                </label>

                <div className="flex items-center justify-between p-2.5 bg-slate-900/50 rounded-lg border border-slate-700/50">
                  <span className="text-xs text-slate-200">درب‌های مجهز به کنترل تردد بیومتریک:</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAccessControlDoors(Math.max(0, accessControlDoors - 1))}
                      className="w-6 h-6 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 flex items-center justify-center font-bold"
                    >
                      -
                    </button>
                    <span className="text-xs font-mono font-bold text-white w-4 text-center">{accessControlDoors}</span>
                    <button
                      type="button"
                      onClick={() => setAccessControlDoors(accessControlDoors + 1)}
                      className="w-6 h-6 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results & Submission column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-gradient-to-b from-slate-800/90 to-slate-950 p-6 rounded-xl border border-blue-500/20">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-4 border-b border-slate-700 pb-2">
                <Sparkles className="w-4 h-4" />
                آنالیز مهندسی و مشخصات پیشنهادی:
              </div>

              {/* Spec Cards */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-700/60">
                  <span className="text-slate-400">دستگاه ضبط (NVR):</span>
                  <span className="text-white font-bold">{nvrChannels} کانال هوشمند ۴K</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-700/60">
                  <span className="text-slate-400">ظرفیت هارد دیسک مورد نیاز:</span>
                  <span className="text-emerald-400 font-bold font-mono">{tbNeeded} ترابایت (Enterprise)</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-700/60">
                  <span className="text-slate-400">پهنای باند شبکه مورد نیاز:</span>
                  <span className="text-cyan-400 font-bold font-mono">{cameraCount * 4} Mbps</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-700/60">
                  <span className="text-slate-400">گارانتی و خدمات پس از فروش:</span>
                  <span className="text-amber-300 font-bold">۳۶ ماه گارانتی طلایی بومیا</span>
                </div>
              </div>

              {/* Price summary block */}
              <div className="mt-6 p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 text-center">
                <div className="text-xs text-slate-400">برآورد تقریبی هزینه کل تجهیزات و اجرا:</div>
                <div className="text-xl font-extrabold text-amber-400 mt-1 font-mono">
                  {formatPrice(totalEstimateToman)}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  * قیمت نهایی پس از بازدید کارشناسی حضوری و نقشه اتوکد تعیین خواهد شد.
                </div>
              </div>
            </div>

            {/* Fast Request form */}
            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <div className="text-xs font-semibold text-slate-300">
                دریافت پیش‌فاکتور رسمی و هماهنگی بازدید رایگان:
              </div>
              <input
                id={nameInputId}
                type="text"
                required
                placeholder="نام و نام خانوادگی *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <input
                id={phoneInputId}
                type="tel"
                required
                placeholder="شماره تماس همراه (جهت تماس کارشناس) *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <input
                id={companyInputId}
                type="text"
                placeholder="نام شرکت یا پروژه (اختیاری)"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />

              {isSubmitted ? (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-lg text-emerald-300 text-xs flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  درخواست شما ثبت و به کارشناسان بومیا ارسال گردید.
                </div>
              ) : (
                <button
                  id="submit-calculator-quote-btn"
                  type="submit"
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-lg text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  ارسال استعلام و دریافت پیش‌فاکتور رسمی
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
