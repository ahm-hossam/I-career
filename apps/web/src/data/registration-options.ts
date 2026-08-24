import type { Locale } from '@/lib/i18n/types';

export interface LocalizedOption<V extends string = string> {
  value: V;
  labelEn: string;
  labelAr: string;
}

export function optionLabel<V extends string>(option: LocalizedOption<V>, locale: Locale): string {
  return locale === 'ar' ? option.labelAr : option.labelEn;
}

function fromNames(names: string[], arLabels: string[]): LocalizedOption[] {
  return names.map((name, i) => ({ value: name, labelEn: name, labelAr: arLabels[i] }));
}

const NATIONALITY_NAMES = [
  'Afghan', 'Albanian', 'Algerian', 'American', 'Andorran', 'Angolan', 'Antiguan and Barbudan', 'Argentine',
  'Armenian', 'Australian', 'Austrian', 'Azerbaijani', 'Bahamian', 'Bahraini', 'Bangladeshi', 'Barbadian',
  'Belarusian', 'Belgian', 'Belizean', 'Beninese', 'Bhutanese', 'Bolivian', 'Bosnian', 'Botswanan', 'Brazilian',
  'British', 'Bruneian', 'Bulgarian', 'Burkinabe', 'Burmese', 'Burundian', 'Cabo Verdean', 'Cambodian',
  'Cameroonian', 'Canadian', 'Central African', 'Chadian', 'Chilean', 'Chinese', 'Colombian', 'Comoran',
  'Congolese (Republic of the Congo)', 'Congolese (DR Congo)', 'Costa Rican', 'Croatian', 'Cuban', 'Cypriot',
  'Czech', 'Danish', 'Djiboutian', 'Dominican (Commonwealth of Dominica)', 'Dominican (Dominican Republic)',
  'Dutch', 'East Timorese', 'Ecuadorian', 'Egyptian', 'Emirati', 'Equatorial Guinean', 'Eritrean', 'Estonian',
  'Eswatini', 'Ethiopian', 'Fijian', 'Filipino', 'Finnish', 'French', 'Gabonese', 'Gambian', 'Georgian', 'German',
  'Ghanaian', 'Greek', 'Grenadian', 'Guatemalan', 'Guinean', 'Guinea-Bissauan', 'Guyanese', 'Haitian', 'Honduran',
  'Hungarian', 'Icelandic', 'Indian', 'Indonesian', 'Iranian', 'Iraqi', 'Irish', 'Israeli', 'Italian', 'Ivorian',
  'Jamaican', 'Japanese', 'Jordanian', 'Kazakhstani', 'Kenyan', 'Kittitian and Nevisian', 'I-Kiribati', 'Kuwaiti',
  'Kyrgyz', 'Lao', 'Latvian', 'Lebanese', 'Basotho', 'Liberian', 'Libyan', 'Liechtensteiner', 'Lithuanian',
  'Luxembourgish', 'Macedonian', 'Malagasy', 'Malawian', 'Malaysian', 'Maldivian', 'Malian', 'Maltese',
  'Marshallese', 'Mauritanian', 'Mauritian', 'Mexican', 'Micronesian', 'Moldovan', 'Monégasque', 'Mongolian',
  'Montenegrin', 'Moroccan', 'Mozambican', 'Namibian', 'Nauruan', 'Nepali', 'New Zealander', 'Nicaraguan',
  'Nigerian', 'Nigerien', 'North Korean', 'Norwegian', 'Omani', 'Pakistani', 'Palauan', 'Palestinian', 'Panamanian',
  'Papua New Guinean', 'Paraguayan', 'Peruvian', 'Polish', 'Portuguese', 'Qatari', 'Romanian', 'Russian',
  'Rwandan', 'Saint Lucian', 'Salvadoran', 'Samoan', 'San Marinese', 'São Toméan', 'Saudi', 'Senegalese',
  'Serbian', 'Seychellois', 'Sierra Leonean', 'Singaporean', 'Slovak', 'Slovenian', 'Solomon Islander', 'Somali',
  'South African', 'South Korean', 'South Sudanese', 'Spanish', 'Sri Lankan', 'Sudanese', 'Surinamese', 'Swedish',
  'Swiss', 'Syrian', 'Taiwanese', 'Tajik', 'Tanzanian', 'Thai', 'Togolese', 'Tongan',
  'Trinidadian and Tobagonian', 'Tunisian', 'Turkish', 'Turkmen', 'Tuvaluan', 'Ugandan', 'Ukrainian', 'Uruguayan',
  'Uzbek', 'Vanuatuan', 'Vatican', 'Venezuelan', 'Vietnamese', 'Vincentian', 'Yemeni', 'Zambian', 'Zimbabwean',
  'Other',
];

const NATIONALITY_AR = [
  'أفغانية', 'ألبانية', 'جزائرية', 'أمريكية', 'أندورية', 'أنغولية', 'أنتيغوية وباربودية', 'أرجنتينية', 'أرمينية',
  'أسترالية', 'نمساوية', 'أذرية', 'بهامية', 'بحرينية', 'بنغلاديشية', 'باربادوسية', 'بيلاروسية', 'بلجيكية', 'بليزية',
  'بنينية', 'بوتانية', 'بوليفية', 'بوسنية', 'بوتسوانية', 'برازيلية', 'بريطانية', 'بروناوية', 'بلغارية', 'بوركينابية',
  'بورمية', 'بوروندية', 'رأس أخضرية', 'كمبودية', 'كاميرونية', 'كندية', 'أفريقية وسطى', 'تشادية', 'تشيلية', 'صينية',
  'كولومبية', 'قمرية', 'كونغولية (جمهورية الكونغو)', 'كونغولية (جمهورية الكونغو الديمقراطية)', 'كوستاريكية',
  'كرواتية', 'كوبية', 'قبرصية', 'تشيكية', 'دنماركية', 'جيبوتية', 'دومينيكية (كومنولث دومينيكا)',
  'دومينيكية (جمهورية الدومينيكان)', 'هولندية', 'تيمورية شرقية', 'إكوادورية', 'مصرية', 'إماراتية',
  'غينية استوائية', 'إريترية', 'إستونية', 'إسواتينية', 'إثيوبية', 'فيجية', 'فلبينية', 'فنلندية', 'فرنسية',
  'غابونية', 'غامبية', 'جورجية', 'ألمانية', 'غانية', 'يونانية', 'غرينادية', 'غواتيمالية', 'غينية', 'غينية بيساوية',
  'غيانية', 'هايتية', 'هندوراسية', 'هنغارية', 'آيسلندية', 'هندية', 'إندونيسية', 'إيرانية', 'عراقية', 'أيرلندية',
  'إسرائيلية', 'إيطالية', 'إيفوارية', 'جامايكية', 'يابانية', 'أردنية', 'كازاخستانية', 'كينية',
  'سانت كيتسية ونيفسية', 'كيريباتية', 'كويتية', 'قيرغيزية', 'لاوسية', 'لاتفية', 'لبنانية', 'ليسوتوية', 'ليبيرية',
  'ليبية', 'ليختنشتاينية', 'ليتوانية', 'لوكسمبورغية', 'مقدونية', 'مدغشقرية', 'ملاوية', 'ماليزية', 'مالديفية',
  'مالية', 'مالطية', 'مارشالية', 'موريتانية', 'موريشيوسية', 'مكسيكية', 'ميكرونيزية', 'مولدوفية', 'موناكية',
  'منغولية', 'جبل أسودية', 'مغربية', 'موزمبيقية', 'ناميبية', 'ناوروية', 'نيبالية', 'نيوزيلندية', 'نيكاراغوية',
  'نيجيرية', 'نيجرية', 'كورية شمالية', 'نرويجية', 'عمانية', 'باكستانية', 'بالاوية', 'فلسطينية', 'بنمية',
  'بابوا غينية جديدة', 'باراغوانية', 'بيروفية', 'بولندية', 'برتغالية', 'قطرية', 'رومانية', 'روسية', 'رواندية',
  'سانت لوسية', 'سلفادورية', 'ساموية', 'سان مارينية', 'ساو تومية', 'سعودية', 'سنغالية', 'صربية', 'سيشيلية',
  'سيراليونية', 'سنغافورية', 'سلوفاكية', 'سلوفينية', 'جزر سليمان', 'صومالية', 'جنوب أفريقية', 'كورية جنوبية',
  'جنوب سودانية', 'إسبانية', 'سريلانكية', 'سودانية', 'سورينامية', 'سويدية', 'سويسرية', 'سورية', 'تايوانية',
  'طاجيكية', 'تنزانية', 'تايلاندية', 'توغولية', 'تونغية', 'ترينيدادية وتوباغوية', 'تونسية', 'تركية',
  'تركمانستانية', 'توفالية', 'أوغندية', 'أوكرانية', 'أوروغوانية', 'أوزبكستانية', 'فانواتية', 'فاتيكانية',
  'فنزويلية', 'فيتنامية', 'سانت فينسنتية', 'يمنية', 'زامبية', 'زيمبابوية', 'أخرى',
];

const GOVERNORATE_NAMES = [
  'Alexandria', 'Aswan', 'Asyut', 'Beheira', 'Beni Suef', 'Cairo', 'Dakahlia', 'Damietta', 'Faiyum', 'Gharbia',
  'Giza', 'Ismailia', 'Kafr El Sheikh', 'Luxor', 'Matruh', 'Minya', 'Monufia', 'New Valley', 'North Sinai',
  'Port Said', 'Qalyubia', 'Qena', 'Red Sea', 'Sharqia', 'Sohag', 'South Sinai', 'Suez', 'Other',
];

const GOVERNORATE_AR = [
  'الإسكندرية', 'أسوان', 'أسيوط', 'البحيرة', 'بني سويف', 'القاهرة', 'الدقهلية', 'دمياط', 'الفيوم', 'الغربية',
  'الجيزة', 'الإسماعيلية', 'كفر الشيخ', 'الأقصر', 'مطروح', 'المنيا', 'المنوفية', 'الوادي الجديد', 'شمال سيناء',
  'بورسعيد', 'القليوبية', 'قنا', 'البحر الأحمر', 'الشرقية', 'سوهاج', 'جنوب سيناء', 'السويس', 'أخرى',
];

const UNIVERSITY_NAMES = [
  'Ain Shams University', 'Alexandria University', 'Aswan University', 'Assiut University', 'Beni-Suef University',
  'Benha University', 'Cairo University', 'Damanhur University', 'Damietta University', 'Fayoum University',
  'Helwan University', 'Kafr El-Sheikh University', 'Mansoura University', 'Minia University', 'Monufia University',
  'Port Said University', 'Suez Canal University', 'Suez University', 'Tanta University', 'Zagazig University',
  'Luxor University', 'New Valley University', 'Sohag University', 'South Valley University',
  '6th of October University', 'Al Alamein International University', 'Al-Ahram Canadian University',
  'Al-Nahda University', 'American University (AUC)',
  'Arab Academy for Science, Technology & Maritime Transport (AAST)', 'Arab Open University (Egypt Branch)',
  'Badr University', 'British University (BUE)', 'Delta University for Science and Technology', 'Deraya University',
  'Egyptian Chinese University', 'Egyptian E-Learning University',
  'Egyptian Japanese University of Science and Technology (E-JUST)', 'Egyptian Russian University',
  'Future University (FUE)', 'Galala University', 'German University (GUC)', 'King Salman International University',
  'Heliopolis University', 'Misr International University (MIU)', 'Misr University for Science and Technology (MUST)',
  'Modern Sciences and Arts University (MSA)', 'Nile University (NU)', 'New Giza University', 'New Mansoura University',
  'Pharos University (PUA)', 'Sinai University (Arish and Kantara Branches)', 'Sphinx University',
  'University of Canada (UofCanada)', 'Zewail City of Science and Technology', 'Higher Technological Institute',
  'Cairo Higher Institute for Engineering', 'Higher Institute for Engineering and Technology in Kafr El-Sheikh',
  'Egyptian Academy for Engineering and Advanced Technology', 'Higher Technological Institute of 10th of Ramadan City',
  'Sadat Academy for Management Sciences', 'Arab Academy for Banking and Financial Sciences', 'Other',
];

const UNIVERSITY_AR = [
  'جامعة عين شمس', 'جامعة الإسكندرية', 'جامعة أسوان', 'جامعة أسيوط', 'جامعة بني سويف', 'جامعة بنها',
  'جامعة القاهرة', 'جامعة دمنهور', 'جامعة دمياط', 'جامعة الفيوم', 'جامعة حلوان', 'جامعة كفر الشيخ',
  'جامعة المنصورة', 'جامعة المنيا', 'جامعة المنوفية', 'جامعة بورسعيد', 'جامعة قناة السويس', 'جامعة السويس',
  'جامعة طنطا', 'جامعة الزقازيق', 'جامعة الأقصر', 'جامعة الوادي الجديد', 'جامعة سوهاج', 'جامعة جنوب الوادي',
  'جامعة 6 أكتوبر', 'جامعة العلمين الدولية', 'جامعة الأهرام الكندية', 'جامعة النهضة',
  'الجامعة الأمريكية بالقاهرة (AUC)', 'الأكاديمية العربية للعلوم والتكنولوجيا والنقل البحري (AAST)',
  'الجامعة العربية المفتوحة (فرع مصر)', 'جامعة بدر', 'الجامعة البريطانية في مصر (BUE)',
  'جامعة الدلتا للعلوم والتكنولوجيا', 'جامعة دراية', 'الجامعة المصرية الصينية', 'الجامعة المصرية للتعلم الإلكتروني',
  'الجامعة المصرية اليابانية للعلوم والتكنولوجيا (E-JUST)', 'الجامعة المصرية الروسية', 'جامعة المستقبل (FUE)',
  'جامعة الجلالة', 'الجامعة الألمانية بالقاهرة (GUC)', 'جامعة الملك سلمان الدولية', 'جامعة هليوبوليس',
  'جامعة مصر الدولية (MIU)', 'جامعة مصر للعلوم والتكنولوجيا (MUST)', 'جامعة العلوم الحديثة والآداب (MSA)',
  'جامعة النيل (NU)', 'جامعة نيو جيزة', 'جامعة المنصورة الجديدة', 'جامعة فاروس بالإسكندرية (PUA)',
  'جامعة سيناء (فرعا العريش والقنطرة)', 'جامعة سفينكس', 'جامعة كندا الدولية بمصر (UofCanada)',
  'مدينة زويل للعلوم والتكنولوجيا', 'المعهد العالي للتكنولوجيا', 'معهد القاهرة العالي للهندسة',
  'المعهد العالي للهندسة والتكنولوجيا بكفر الشيخ', 'الأكاديمية المصرية للهندسة والتكنولوجيا المتقدمة',
  'المعهد العالي للتكنولوجيا بمدينة العاشر من رمضان', 'أكاديمية السادات للعلوم الإدارية',
  'الأكاديمية العربية للعلوم المصرفية والمالية', 'أخرى',
];

const FACULTY_NAMES = [
  'Faculty of Medicine', 'Faculty of Engineering', 'Faculty of Pharmacy', 'Faculty of Law', 'Faculty of Commerce',
  'Faculty of Science', 'Faculty of Agriculture', 'Faculty of Arts', 'Faculty of Education', 'Faculty of Dentistry',
  'Faculty of Veterinary Medicine', 'Faculty of Physical Education', 'Faculty of Nursing', 'Faculty of Fine Arts',
  'Faculty of Computers and Information Sciences', 'Faculty of Economics and Political Science',
  'Faculty of Tourism and Hotels', 'Faculty of Applied Arts', 'Faculty of Specific Education',
  'Faculty of Languages and Translation', 'Faculty of Islamic Studies', 'Faculty of Archaeology',
  'Faculty of Mass Communication', 'Faculty of Social Work', 'Faculty of Alsun (Languages)',
  'Faculty of Physical Therapy', 'Faculty of Home Economics', 'Other',
];

const FACULTY_AR = [
  'كلية الطب', 'كلية الهندسة', 'كلية الصيدلة', 'كلية الحقوق', 'كلية التجارة', 'كلية العلوم', 'كلية الزراعة',
  'كلية الآداب', 'كلية التربية', 'كلية طب الأسنان', 'كلية الطب البيطري', 'كلية التربية الرياضية', 'كلية التمريض',
  'كلية الفنون الجميلة', 'كلية الحاسبات وعلوم المعلومات', 'كلية الاقتصاد والعلوم السياسية',
  'كلية السياحة والفنادق', 'كلية الفنون التطبيقية', 'كلية التربية النوعية', 'كلية اللغات والترجمة',
  'كلية الدراسات الإسلامية', 'كلية الآثار', 'كلية الإعلام', 'كلية الخدمة الاجتماعية', 'كلية الألسن',
  'كلية العلاج الطبيعي', 'كلية الاقتصاد المنزلي', 'أخرى',
];

export const NATIONALITIES: LocalizedOption[] = fromNames(NATIONALITY_NAMES, NATIONALITY_AR);
export const GOVERNORATES: LocalizedOption[] = fromNames(GOVERNORATE_NAMES, GOVERNORATE_AR);
export const UNIVERSITIES: LocalizedOption[] = fromNames(UNIVERSITY_NAMES, UNIVERSITY_AR);
export const FACULTIES: LocalizedOption[] = fromNames(FACULTY_NAMES, FACULTY_AR);

export const GENDER_OPTIONS: LocalizedOption<'MALE' | 'FEMALE'>[] = [
  { value: 'MALE', labelEn: 'Male', labelAr: 'ذكر' },
  { value: 'FEMALE', labelEn: 'Female', labelAr: 'أنثى' },
];

export const STUDENT_STATUS_OPTIONS: LocalizedOption<'STUDENT' | 'GRADUATE'>[] = [
  { value: 'STUDENT', labelEn: 'Student', labelAr: 'طالب' },
  { value: 'GRADUATE', labelEn: 'Graduate', labelAr: 'خريج' },
];

export const EMPLOYMENT_STATUS_OPTIONS: LocalizedOption<
  'FULL_TIME' | 'PART_TIME' | 'FREELANCE' | 'PROJECT_BASED' | 'INTERNSHIP' | 'UNEMPLOYED'
>[] = [
  { value: 'FULL_TIME', labelEn: 'Full time job', labelAr: 'وظيفة بدوام كامل' },
  { value: 'PART_TIME', labelEn: 'Part time job', labelAr: 'وظيفة بدوام جزئي' },
  { value: 'FREELANCE', labelEn: 'Freelance', labelAr: 'عمل حر' },
  { value: 'PROJECT_BASED', labelEn: 'Project based', labelAr: 'عمل بالمشروع' },
  { value: 'INTERNSHIP', labelEn: 'Internship', labelAr: 'تدريب' },
  { value: 'UNEMPLOYED', labelEn: 'Unemployed', labelAr: 'عاطل عن العمل' },
];
