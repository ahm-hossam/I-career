import type { LocalizedOption } from './registration-options';

export { optionLabel } from './registration-options';

function fromNames(names: string[], arLabels: string[]): LocalizedOption[] {
  return names.map((name, i) => ({ value: name, labelEn: name, labelAr: arLabels[i] }));
}

const EMPLOYEE_COUNT_NAMES = [
  'Self-employed', '1-10 employees', '11-50 employees', '51-200 employees', '201-500 employees',
  '501-1000 employees', '1001-5000 employees', '5001-10,000 employees', '10,001+ employees',
];

const EMPLOYEE_COUNT_AR = [
  'عمل حر', '1-10 موظفين', '11-50 موظفًا', '51-200 موظف', '201-500 موظف',
  '501-1000 موظف', '1001-5000 موظف', '5001-10,000 موظف', 'أكثر من 10,001 موظف',
];

const INDUSTRY_NAMES = [
  'Aerospace & Defense', 'Agriculture & Environment', 'Arts, Entertainment & Sports',
  'Automotive/Transportation Manufacturing', 'Banking, Investment & Financial Services',
  'Biotechnology & Pharmaceuticals', 'Business & Consulting Services', 'Chemicals',
  'Construction, Materials & Mining', 'Consumer Products', 'Education & Training',
  'Electronics & Telecommunications', 'Engineering and Nanotechnology', 'Food, Beverages and Tobacco',
  'Government and Military', 'Healthcare', 'Hospitality, Travel and Tourism',
  'Information Technology and Computer Software/Hardware', 'Insurance and Risk Management',
  'Law and Legal Affairs', 'Manufacturing', 'Media and Communications',
  'Non-Profit and Community Development', 'Oil & Gas, Petroleum, Energy and Utilities',
  'Real Estate and Property Development', 'Retail and Wholesale Trade', 'Transportation and Shipping',
  'Outsourcing/Offshoring', 'Other',
];

const INDUSTRY_AR = [
  'الطيران والدفاع', 'الزراعة والبيئة', 'الفنون والترفيه والرياضة',
  'صناعة السيارات والنقل', 'الخدمات المصرفية والاستثمارية والمالية',
  'التكنولوجيا الحيوية والأدوية', 'خدمات الأعمال والاستشارات', 'الكيماويات',
  'التشييد والمواد والتعدين', 'المنتجات الاستهلاكية', 'التعليم والتدريب',
  'الإلكترونيات والاتصالات', 'الهندسة والتكنولوجيا النانوية', 'الأغذية والمشروبات والتبغ',
  'الحكومة والجيش', 'الرعاية الصحية', 'الضيافة والسفر والسياحة',
  'تكنولوجيا المعلومات والبرمجيات/الأجهزة', 'التأمين وإدارة المخاطر',
  'القانون والشؤون القانونية', 'التصنيع', 'الإعلام والاتصالات',
  'التنمية غير الربحية والمجتمعية', 'النفط والغاز والطاقة والمرافق',
  'التطوير العقاري', 'تجارة التجزئة والجملة', 'النقل والشحن',
  'التعهيد الخارجي', 'أخرى',
];

const COMPANY_TYPE_NAMES = [
  'Startup', 'Local corporation', 'Multinational/International corporation',
  'Non-governmental organization', 'Government institution', 'Public corporation',
];

const COMPANY_TYPE_AR = [
  'شركة ناشئة', 'شركة محلية', 'شركة متعددة الجنسيات/دولية',
  'منظمة غير حكومية', 'مؤسسة حكومية', 'شركة عامة',
];

const COMPANY_BENEFIT_NAMES = [
  'Social Insurance', 'Medical Insurance', 'Minimum Wages', 'Compete based on Salary Surveys',
  'Remote Work Policy', 'Child Care Policy', 'Transportation Allowance/Services', 'Mobile Allowance',
  'Sabbatical Leave', 'PWD Hiring Programs', 'Women Focused Programs', 'Wellbeing Programs',
];

const COMPANY_BENEFIT_AR = [
  'التأمينات الاجتماعية', 'التأمين الطبي', 'الحد الأدنى للأجور', 'المنافسة وفق مسوحات الرواتب',
  'سياسة العمل عن بُعد', 'سياسة رعاية الأطفال', 'بدل/خدمات المواصلات', 'بدل الهاتف المحمول',
  'إجازة تفرغ', 'برامج توظيف ذوي الإعاقة', 'برامج موجهة للمرأة', 'برامج الرفاهية',
];

export const EMPLOYEE_COUNT_OPTIONS: LocalizedOption[] = fromNames(EMPLOYEE_COUNT_NAMES, EMPLOYEE_COUNT_AR);
export const INDUSTRY_OPTIONS: LocalizedOption[] = fromNames(INDUSTRY_NAMES, INDUSTRY_AR);
export const COMPANY_TYPE_OPTIONS: LocalizedOption[] = fromNames(COMPANY_TYPE_NAMES, COMPANY_TYPE_AR);
export const COMPANY_BENEFIT_OPTIONS: LocalizedOption[] = fromNames(COMPANY_BENEFIT_NAMES, COMPANY_BENEFIT_AR);
