import {
  Product,
  Project,
  ConsultationRequest,
  SiteSettings,
  PRODUCTS,
  PROJECTS,
  INITIAL_INQUIRIES,
  INITIAL_SITE_SETTINGS
} from './mockData';

export interface AdminCredentials {
  username: string;
  password: string;
  lastUpdated: string;
}

export const DEFAULT_ADMIN_CREDENTIALS: AdminCredentials = {
  username: 'admin',
  password: 'admin',
  lastUpdated: '۱۴۰۳/۰۵/۰۱'
};

const STORAGE_KEYS = {
  PRODUCTS: 'bumiya_products_v1',
  PROJECTS: 'bumiya_projects_v1',
  INQUIRIES: 'bumiya_inquiries_v1',
  SETTINGS: 'bumiya_settings_v1',
  AUTH_CREDS: 'bumiya_admin_creds_v1',
  AUTH_SESSION: 'bumiya_admin_session_v1'
};

export function loadAdminCredentials(): AdminCredentials {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH_CREDS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.username === 'string' && typeof parsed.password === 'string') {
        return {
          username: parsed.username,
          password: parsed.password,
          lastUpdated: parsed.lastUpdated || '۱۴۰۳/۰۵/۰۱'
        };
      }
    }
  } catch (err) {
    console.error('Error loading admin credentials from storage:', err);
  }
  return DEFAULT_ADMIN_CREDENTIALS;
}

export function saveAdminCredentials(creds: AdminCredentials): void {
  try {
    localStorage.setItem(STORAGE_KEYS.AUTH_CREDS, JSON.stringify(creds));
  } catch (err) {
    console.error('Error saving admin credentials to storage:', err);
  }
}

export function verifyAdminCredentials(username: string, password: string): boolean {
  const current = loadAdminCredentials();
  return (
    username.trim().toLowerCase() === current.username.trim().toLowerCase() &&
    password === current.password
  );
}

export function isAdminAuthenticated(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEYS.AUTH_SESSION) === 'true';
  } catch {
    return false;
  }
}

export function setAdminAuthenticated(authenticated: boolean): void {
  try {
    if (authenticated) {
      sessionStorage.setItem(STORAGE_KEYS.AUTH_SESSION, 'true');
    } else {
      sessionStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
    }
  } catch (err) {
    console.error('Error setting auth session:', err);
  }
}

export function resetAdminCredentialsToDefault(): AdminCredentials {
  saveAdminCredentials(DEFAULT_ADMIN_CREDENTIALS);
  return DEFAULT_ADMIN_CREDENTIALS;
}

export function loadStoredProducts(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading products from storage:', err);
  }
  return PRODUCTS;
}

export function saveStoredProducts(products: Product[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  } catch (err) {
    console.error('Error saving products to storage:', err);
  }
}

export function loadStoredProjects(): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading projects from storage:', err);
  }
  return PROJECTS;
}

export function saveStoredProjects(projects: Project[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  } catch (err) {
    console.error('Error saving projects to storage:', err);
  }
}

export function loadStoredInquiries(): ConsultationRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading inquiries from storage:', err);
  }
  return INITIAL_INQUIRIES;
}

export function saveStoredInquiries(inquiries: ConsultationRequest[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  } catch (err) {
    console.error('Error saving inquiries to storage:', err);
  }
}

export function loadStoredSiteSettings(): SiteSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return { ...INITIAL_SITE_SETTINGS, ...parsed };
      }
    }
  } catch (err) {
    console.error('Error loading site settings from storage:', err);
  }
  return INITIAL_SITE_SETTINGS;
}

export function saveStoredSiteSettings(settings: SiteSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (err) {
    console.error('Error saving site settings to storage:', err);
  }
}

export function resetAllStorageToDefaults() {
  localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
  localStorage.removeItem(STORAGE_KEYS.PROJECTS);
  localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
  localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  return {
    products: PRODUCTS,
    projects: PROJECTS,
    inquiries: INITIAL_INQUIRIES,
    settings: INITIAL_SITE_SETTINGS
  };
}

export function exportFullDatabaseBackup(): string {
  const data = {
    appName: 'Bumiya Security Management',
    exportDate: new Date().toISOString(),
    products: loadStoredProducts(),
    projects: loadStoredProjects(),
    inquiries: loadStoredInquiries(),
    settings: loadStoredSiteSettings()
  };
  return JSON.stringify(data, null, 2);
}

export function importFullDatabaseBackup(jsonString: string): {
  success: boolean;
  error?: string;
  data?: {
    products: Product[];
    projects: Project[];
    inquiries: ConsultationRequest[];
    settings: SiteSettings;
  };
} {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') {
      return { success: false, error: 'فرمت فایل وارد شده معتبر نمی‌باشد.' };
    }

    const products = Array.isArray(parsed.products) ? parsed.products : PRODUCTS;
    const projects = Array.isArray(parsed.projects) ? parsed.projects : PROJECTS;
    const inquiries = Array.isArray(parsed.inquiries) ? parsed.inquiries : INITIAL_INQUIRIES;
    const settings = parsed.settings && typeof parsed.settings === 'object'
      ? { ...INITIAL_SITE_SETTINGS, ...parsed.settings }
      : INITIAL_SITE_SETTINGS;

    saveStoredProducts(products);
    saveStoredProjects(projects);
    saveStoredInquiries(inquiries);
    saveStoredSiteSettings(settings);

    return {
      success: true,
      data: { products, projects, inquiries, settings }
    };
  } catch (err: any) {
    return { success: false, error: 'خطا در پردازش فایل: ' + (err?.message || 'فرمت نامعتبر') };
  }
}
