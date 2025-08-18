module.exports = module.exports = [
  {
    "label": "Conduct Search Engine Discovery Reconnaissance for Information Leakage",
    "id": "4.1.1",
    "description": "آزمون استفاده از موتور جستوجو / به منظور نشت اطلاعات.",
    "impact": "افشای اطلاعات حساس و مسیرهای قابل سوءاستفاده برای نفوذ.",
    "exploit": "Query search engines with specific site operators and keywords to find exposed information.",
    "exploit_fa": "استفاده از عملگرهای خاص سایت و کلمات کلیدی در موتورهای جستجو برای یافتن اطلاعات افشا شده",
    "solution": "محدود کردن اطلاعات قابل ایندکس شدن توسط رباتهای موتورهای جستجو، استفاده از فایل robots.txt به درستی، بررسی منظم نتایج جستجو برای اطلاعات حساس"
  },
  {
    "label": "Fingerprint Web Server",
    "id": "4.1.2",
    "description": "آزمون انگشت‌ نگاری سرویس دهنده وب.",
    "impact": "شناسایی نوع و نسخه وب سرور برای انتخاب حملات مناسب.",
    "exploit": "Send HTTP requests and analyze headers and responses to identify server type and version.",
    "exploit_fa": "ارسال درخواست‌های HTTP و تحلیل هدرها و پاسخ‌ها برای شناسایی نوع و نسخه سرور",
    "solution": "مخفی کردن اطلاعات نسخه سرور در هدرها، استفاده از تنظیمات امنیتی برای کاهش اطلاعات افشا شده، به‌روزرسانی منظم سرور"
  },
  {
    "label": "Review Webserver Metafiles for Information Leakage",
    "id": "4.1.3",
    "description": "آزمون بازبینی Metafile های سرویس دهنده وب برای نشت اطلاعات.",
    "impact": "افشای مسیرها، فایل‌ها و اطلاعات حساس سرور.",
    "exploit": "Access common metafiles like robots.txt, sitemap.xml, or backup files to find sensitive info.",
    "exploit_fa": "دسترسی به فایل‌های متا مانند robots.txt، sitemap.xml یا فایل‌های پشتیبان برای یافتن اطلاعات حساس",
    "solution": "محدود کردن دسترسی به فایل‌های متا، بررسی منظم این فایل‌ها برای اطلاعات حساس، حذف فایل‌های پشتیبان غیرضروری"
  },
  {
    "label": "Enumerate Applications on Webserver",
    "id": "4.1.4",
    "description": "آزمون برشماری برنامه‌های کاربردی بر روی سرویس دهنده وب.",
    "impact": "کشف نرم‌افزارهای در حال اجرا که ممکن است آسیب‌پذیری داشته باشند.",
    "exploit": "Scan server directories and use fingerprinting tools to list installed applications.",
    "exploit_fa": "اسکن دایرکتوری‌های سرور و استفاده از ابزارهای انگشت‌نگاری برای لیست برنامه‌های نصب شده",
    "solution": "محدود کردن دسترسی به دایرکتوری‌ها، حذف برنامه‌های غیرضروری، به‌روزرسانی منظم نرم‌افزارها"
  },
  {
    "label": "Review Web Page Content for Information Leakage",
    "id": "4.1.5",
    "description": "آزمون بازبینی توضیحات و فراداده‌های صفحات وب برای نشت اطلاعات.",
    "impact": "افشای اطلاعات حساس و جزئیات طراحی سیستم.",
    "exploit": "Inspect HTML source, comments, and metadata for sensitive information.",
    "exploit_fa": "بررسی کد منبع HTML، نظرات و فراداده‌ها برای یافتن اطلاعات حساس",
    "solution": "حذف نظرات و اطلاعات حساس از کد منبع، استفاده از ابزارهای پاکسازی خودکار، بررسی منظم محتوای صفحات"
  },
  {
    "label": "Identify Application Entry Points",
    "id": "4.1.6",
    "description": "آزمون شناسایی نقاط ورودی برنامه‌کاربردی.",
    "impact": "کشف مسیرهایی که می‌توان از آن‌ها برای نفوذ استفاده کرد.",
    "exploit": "Analyze URL parameters, forms, and endpoints to map possible input vectors.",
    "exploit_fa": "تحلیل پارامترهای URL، فرم‌ها و نقاط پایانی برای شناسایی بردارهای ورودی احتمالی",
    "solution": "محدود کردن نقاط ورودی غیرضروری، اعتبارسنجی دقیق ورودی‌ها، استفاده از مکانیزم‌های احراز هویت قوی"
  },
  {
    "label": "Map Execution Paths Through Application",
    "id": "4.1.7",
    "description": "آزمون نقشه‌کشی مسیرهای اجرایی در برنامه کاربردی.",
    "impact": "شناسایی مسیرهای حیاتی و نقاط ضعف برنامه.",
    "exploit": "Trace request flows and session behaviors to understand application logic.",
    "exploit_fa": "ردیابی جریان درخواست‌ها و رفتارهای نشست برای درک منطق برنامه",
    "solution": "پیاده‌سازی کنترل دسترسی دقیق، بررسی منطق کسب و کار، استفاده از ابزارهای تحلیل جریان داده"
  },
  {
    "label": "Fingerprint Web Application Framework",
    "id": "4.1.8",
    "description": "آزمون انگشت‌نگاری چارچوب برنامه‌ی کاربردی.",
    "impact": "شناسایی فریمورک برای هدف‌گیری آسیب‌پذیری‌های خاص آن.",
    "exploit": "Analyze HTTP responses, cookies, and page structure to detect framework type.",
    "exploit_fa": "تحلیل پاسخ‌های HTTP، کوکی‌ها و ساختار صفحه برای شناسایی نوع فریمورک",
    "solution": "مخفی کردن اطلاعات فریمورک، به‌روزرسانی منظم فریمورک، استفاده از تنظیمات امنیتی اختصاصی"
  },
  {
    "label": "Fingerprint Web Application",
    "id": "4.1.9",
    "description": "آزمون انگشت‌نگاری برنامه‌ی کاربردی وب.",
    "impact": "شناسایی برنامه و نسخه آن برای انتخاب حملات مناسب.",
    "exploit": "Use application fingerprinting tools and manual inspection to identify the app.",
    "exploit_fa": "استفاده از ابزارهای انگشت‌نگاری و بررسی دستی برای شناسایی برنامه",
    "solution": "مخفی کردن اطلاعات نسخه برنامه، تغییر فایل‌های شناسایی استاندارد، به‌روزرسانی منظم برنامه"
  },
  {
    "label": "Map Application Architecture",
    "id": "4.1.10",
    "description": "آزمون نقشه‌کشی معماری برنامه‌ی کاربردی.",
    "impact": "درک ساختار برنامه برای پیدا کردن مسیرهای حمله.",
    "exploit": "Analyze page flows, API endpoints, and interactions to understand system architecture.",
    "exploit_fa": "تحلیل جریان صفحات، نقاط پایانی API و تعاملات برای درک معماری سیستم",
    "solution": "مستندسازی کنترل شده معماری، جداسازی منطقی کامپوننت‌ها، استفاده از معماری امن از ابتدا"
  },
  {
    "label": "Test Network Infrastructure Configuration",
    "id": "4.2.1",
    "description": "آزمون پیکربندی شبکه/‌زیرساخت.",
    "impact": "شناسایی ضعف‌ها در شبکه که می‌تواند منجر به نفوذ یا نشت اطلاعات شود.",
    "exploit": "Inspect network devices, firewall rules, and routing configurations for misconfigurations.",
    "exploit_fa": "بررسی دستگاه‌های شبکه، قوانین فایروال و پیکربندی مسیریابی برای یافتن تنظیمات نادرست",
    "solution": "بازبینی منظم تنظیمات شبکه، پیاده‌سازی اصل حداقل دسترسی، استفاده از ابزارهای مدیریت پیکربندی متمرکز"
  },
  {
    "label": "Test Application Platform Configuration",
    "id": "4.2.2",
    "description": "آزمون پیکربندی بستر برنامه کاربردی.",
    "impact": "کشف تنظیمات ناامن که می‌تواند سوءاستفاده را ممکن کند.",
    "exploit": "Check platform settings, services, and modules for default or weak configurations.",
    "exploit_fa": "بررسی تنظیمات پلتفرم، سرویس‌ها و ماژول‌ها برای یافتن تنظیمات پیش‌فرض یا ضعیف",
    "solution": "سخت‌افزاری کردن پلتفرم، غیرفعال کردن سرویس‌های غیرضروری، به‌روزرسانی منظم پلتفرم"
  },
  {
    "label": "Test File Extensions Handling for Sensitive Information",
    "id": "4.2.3",
    "description": "آزمون مدیریت پسوند فایل ها برای داده‌های حساس.",
    "impact": "افشای اطلاعات محرمانه از طریق فایل‌های ناامن.",
    "exploit": "Attempt to access sensitive files with common extensions or misconfigured handlers.",
    "exploit_fa": "تلاش برای دسترسی به فایل‌های حساس با پسوندهای رایج یا مدیریت‌کننده‌های نادرست",
    "solution": "محدود کردن دسترسی به فایل‌های حساس، استفاده از لیست سفید پسوندهای مجاز، بررسی منظم مجوزهای فایل"
  },
  {
    "label": "Review Old Backup and Unreferenced Files for Sensitive Information",
    "id": "4.2.4",
    "description": "آزمون بررسی فایل های پشتیبان قدیمی و بی‌مرجع برای داده ‌های حساس.",
    "impact": "دسترسی غیرمجاز به داده‌های قدیمی یا غیر فعال.",
    "exploit": "Locate backup and orphaned files and inspect them for confidential data.",
    "exploit_fa": "یافتن فایل‌های پشتیبان و بی‌مرجع و بررسی آن‌ها برای اطلاعات محرمانه",
    "solution": "حذف فایل‌های پشتیبان غیرضروری، محدود کردن دسترسی به فایل‌های قدیمی، پیاده‌سازی فرآیند مدیریت فایل‌های پشتیبان امن"
  },
  {
    "label": "Enumerate Infrastructure and Application Admin Interfaces",
    "id": "4.2.5",
    "description": "آزمون برشماری واسط‌های مدیریتی زیرساخت و برنامه.",
    "impact": "شناسایی پنل‌های مدیریتی قابل سوءاستفاده.",
    "exploit": "Scan for admin interfaces, dashboards, and control panels accessible via web or network.",
    "exploit_fa": "اسکن برای یافتن رابط‌های مدیریتی، داشبوردها و پنل‌های کنترل قابل دسترسی از طریق وب یا شبکه",
    "solution": "محدود کردن دسترسی به رابط‌های مدیریتی، استفاده از VPN برای دسترسی مدیریتی، تغییر URLهای پیش‌فرض پنل‌ها"
  },
  {
    "label": "Test HTTP Methods",
    "id": "4.2.6",
    "description": "آزمون روش های HTTP.",
    "impact": "افشای روش‌های ناامن و آسیب‌پذیری به حملات HTTP.",
    "exploit": "Send requests using uncommon HTTP methods to test server behavior.",
    "exploit_fa": "ارسال درخواست‌ها با استفاده از روش‌های غیرمعمول HTTP برای تست رفتار سرور",
    "solution": "غیرفعال کردن روش‌های HTTP غیرضروری، پیاده‌سازی کنترل دسترسی برای روش‌های مختلف، استفاده از لیست سفید روش‌های مجاز"
  },
  {
    "label": "Test HTTP Strict Transport Security",
    "id": "4.2.7",
    "description": "آزمون HSTS.",
    "impact": "عدم استفاده از HSTS ممکن است منجر به حملات MITM شود.",
    "exploit": "Check response headers to ensure HSTS is enabled and correctly configured.",
    "exploit_fa": "بررسی هدرهای پاسخ برای اطمینان از فعال بودن و پیکربندی صحیح HSTS",
    "solution": "فعال‌سازی HSTS با حداکثر عمر، گنجاندن زیردامنه‌ها، استفاده از پیش‌بارگذاری HSTS"
  },
  {
    "label": "Test RIA Cross Domain Policy",
    "id": "4.2.8",
    "description": "آزمون سیاست‌های بین دامنه‌ای RIA.",
    "impact": "خطاهای پیکربندی ممکن است به افشای داده‌ها یا حملات CSRF منجر شود.",
    "exploit": "Review cross-domain policy files and configurations for permissive rules.",
    "exploit_fa": "بررسی فایل‌های سیاست بین دامنه‌ای و تنظیمات برای یافتن قوانین سهل‌انگارانه",
    "solution": "محدود کردن دامنه‌های مجاز، بررسی منظم فایل‌های crossdomain.xml و clientaccesspolicy.xml، پیاده‌سازی اصل حداقل دسترسی"
  },
  {
    "label": "Test File Permission",
    "id": "4.2.9",
    "description": "آزمون مجوز فایل.",
    "impact": "دسترسی غیرمجاز به فایل‌ها و اطلاعات حساس.",
    "exploit": "Check filesystem and directory permissions for insecure access.",
    "exploit_fa": "بررسی مجوزهای سیستم فایل و دایرکتوری برای دسترسی ناامن",
    "solution": "پیاده‌سازی اصل حداقل دسترسی، بررسی منظم مجوزهای فایل، استفاده از مکانیزم‌های کنترل دسترسی دقیق"
  },
  {
    "label": "Test for Subdomain Takeover",
    "id": "4.2.10",
    "description": "آزمون تصاحب زیردامنه.",
    "impact": "ممکن است منجر به کنترل کامل زیردامنه و سوءاستفاده شود.",
    "exploit": "Check for unclaimed DNS entries pointing to decommissioned services.",
    "exploit_fa": "بررسی ورودی‌های DNS بدون مالک که به سرویس‌های خارج از سرویس اشاره می‌کنند",
    "solution": "نظارت منظم روی رکوردهای DNS، حذف رکوردهای غیرضروری، استفاده از سرویس‌های مانیتورینگ زیردامنه"
  },
  {
    "label": "Test Cloud Storage",
    "id": "4.2.11",
    "description": "آزمون فضای ذخیره‌سازی ابری.",
    "impact": "افشای اطلاعات ذخیره شده در سرویس‌های ابری.",
    "exploit": "Inspect cloud storage permissions, buckets, and shared files for exposure.",
    "exploit_fa": "بررسی مجوزهای ذخیره‌سازی ابری، سطل‌ها و فایل‌های اشتراکی برای یافتن اطلاعات افشا شده",
    "solution": "تنظیم دقیق مجوزهای ذخیره‌سازی ابری، رمزگذاری داده‌های حساس، بررسی منظم دسترسی‌ها"
  },
  {
    "label": "Test for Content Security Policy",
    "id": "4.2.12",
    "description": "آزمون CSP.",
    "impact": "عدم پیاده‌سازی CSP ممکن است به حملات XSS منجر شود.",
    "exploit": "Check headers and meta tags to validate proper CSP rules are applied.",
    "exploit_fa": "بررسی هدرها و متا تگ‌ها برای اعتبارسنجی اعمال صحیح قوانین CSP",
    "solution": "پیاده‌سازی CSP با سیاست‌های محدودکننده، استفاده از گزارش‌گیری CSP، به‌روزرسانی منظم سیاست‌ها"
  },
  {
    "label": "Test for Path Confusion",
    "id": "4.2.13",
    "description": "آزمون Path Confusion.",
    "impact": "ممکن است منجر به دسترسی غیرمجاز به فایل‌ها و داده‌ها شود.",
    "exploit": "Attempt path traversal and symbolic link attacks to access unintended files.",
    "exploit_fa": "تلاش برای حملات پیمایش مسیر و پیوندهای نمادین برای دسترسی به فایل‌های غیرمجاز",
    "solution": "اعتبارسنجی دقیق مسیرهای ورودی، استفاده از توابع امن برای دسترسی به فایل‌ها، محدود کردن دسترسی به سیستم فایل"
  },
  {
    "label": "Test Role Definitions",
    "id": "4.3.1",
    "description": "بررسی تعریف نقش‌های سیستم برای اطمینان از اینکه هر نقش تنها دسترسی‌های لازم را دارد.",
    "impact": "تعریف نادرست نقش‌ها می‌تواند منجر به دسترسی غیرمجاز کاربران به منابع حساس شود.",
    "exploit": "Attempt to perform actions beyond assigned role permissions to check for privilege escalation.",
    "exploit_fa": "تلاش برای انجام اقدامات فراتر از مجوزهای نقش اختصاص داده شده برای بررسی ارتقای امتیاز",
    "solution": "پیاده‌سازی کنترل دسترسی مبتنی بر نقش دقیق، بررسی منظم مجوزها، اصل حداقل دسترسی"
  },
  {
    "label": "Test User Registration Process",
    "id": "4.3.2",
    "description": "بررسی فرآیند ثبت‌نام کاربران برای اطمینان از امنیت و اعتبار سنجی مناسب داده‌ها.",
    "impact": "فرایند ثبت‌نام ناامن می‌تواند به ایجاد حساب‌های تقلبی یا دسترسی غیرمجاز منجر شود.",
    "exploit": "Try submitting invalid or malicious input during registration to test validation and account creation.",
    "exploit_fa": "ارسال ورودی‌های نامعتبر یا مخرب در طول ثبت‌نام برای تست اعتبارسنجی و ایجاد حساب",
    "solution": "پیاده‌سازی اعتبارسنجی قوی سمت سرور، استفاده از CAPTCHA، بررسی دستی حساب‌های جدید"
  },
  {
    "label": "Test Account Provisioning Process",
    "id": "4.3.3",
    "description": "بررسی فرآیند اختصاص و فعال‌سازی حساب‌های کاربری برای اطمینان از رعایت اصول امنیتی.",
    "impact": "فرایند نامناسب می‌تواند باعث ایجاد حساب‌های با دسترسی بیش از حد یا اشتباه شود.",
    "exploit": "Attempt to provision accounts with unauthorized privileges or test workflow bypass.",
    "exploit_fa": "تلاش برای ایجاد حساب‌های با امتیازات غیرمجاز یا تست دور زدن گردش کار",
    "solution": "اتوماسیون فرآیند تأیید، بررسی دو مرحله‌ای حساب‌های جدید، ممیزی منظم حساب‌ها"
  },
  {
    "label": "Testing for Account Enumeration and Guessable User Account",
    "id": "4.3.4",
    "description": "بررسی امکان کشف حساب‌های موجود و نام‌های کاربری قابل حدس توسط مهاجمین.",
    "impact": "امکان برشماری حساب‌ها می‌تواند حملات بعدی مانند brute-force را تسهیل کند.",
    "exploit": "Try username enumeration via login error messages or timing attacks to identify valid accounts.",
    "exploit_fa": "تلاش برای برشماری نام کاربری از طریق پیام‌های خطای ورود یا حملات زمان‌بندی برای شناسایی حساب‌های معتبر",
    "solution": "پیاده‌سازی پیام‌های خطای عمومی، محدود کردن نرخ درخواست‌ها، استفاده از احراز هویت چندعاملی"
  },
  {
    "label": "Testing for Weak or Unenforced Userlabel Policy",
    "id": "4.3.5",
    "description": "بررسی سیاست انتخاب نام کاربری برای اطمینان از جلوگیری از نام‌های قابل حدس یا ضعیف.",
    "impact": "نام‌های کاربری ضعیف یا قابل حدس می‌تواند منجر به نفوذ و دسترسی غیرمجاز شود.",
    "exploit": "Attempt to register or guess accounts using common or predictable usernames.",
    "exploit_fa": "تلاش برای ثبت نام یا حدس زدن حساب‌ها با استفاده از نام‌های کاربری رایج یا قابل پیش‌بینی",
    "solution": "اجرای سیاست‌های قوی نام کاربری، ممنوعیت استفاده از نام‌های پیش‌فرض، بررسی منظم حساب‌ها"
  },
  {
    "label": "Testing for Credentials Transported over an Encrypted Channel",
    "id": "4.4.1",
    "description": "بررسی انتقال اطلاعات حساب کاربری از طریق کانال رمزگذاری شده برای جلوگیری از افشای داده‌ها.",
    "impact": "عدم استفاده از کانال رمزگذاری شده می‌تواند منجر به سرقت اعتبارنامه‌ها توسط مهاجم شود.",
    "exploit": "Intercept credentials over unencrypted connections using a network sniffer.",
    "exploit_fa": "رصد اعتبارنامه‌ها در ارتباطات رمزگذاری نشده با استفاده از ابزارهای شنود شبکه",
    "solution": "اجباری کردن استفاده از HTTPS، پیاده‌سازی HSTS، غیرفعال کردن پروتکل‌های ناامن"
  },
  {
    "label": "Testing for Default Credentials",
    "id": "4.4.2",
    "description": "بررسی استفاده از اعتبارنامه‌های پیش‌فرض که ممکن است توسط مهاجمین شناخته شوند.",
    "impact": "استفاده از اعتبارنامه‌های پیش‌فرض می‌تواند منجر به نفوذ آسان شود.",
    "exploit": "Attempt login using known default usernames and passwords for the system.",
    "exploit_fa": "تلاش برای ورود با استفاده از نام کاربری و رمزعبورهای پیش‌فرض شناخته شده سیستم",
    "solution": "تغییر همه اعتبارنامه‌های پیش‌فرض، غیرفعال کردن حساب‌های پیش‌فرض، بررسی منظم حساب‌های سیستم"
  },
  {
    "label": "Testing for Weak Lock Out Mechanism",
    "id": "4.4.3",
    "description": "بررسی مکانیزم مسدودسازی ضعیف برای جلوگیری از حملات brute-force.",
    "impact": "عدم وجود یا ضعف در مکانیزم مسدودسازی می‌تواند اجازه حدس زدن رمز عبور را بدهد.",
    "exploit": "Repeatedly attempt invalid logins to test lockout thresholds.",
    "exploit_fa": "تلاش مکرر برای ورود نامعتبر برای تست آستانه‌های مسدودسازی",
    "solution": "پیاده‌سازی مکانیزم قفل‌شدن حساب پس از چندین تلاش ناموفق، استفاده از تایم‌اوت افزایشی، نظارت بر تلاش‌های ورود"
  },
  {
    "label": "Testing for Bypassing Authentication Schema",
    "id": "4.4.4",
    "description": "آزمون امکان دور زدن شمای احراز هویت سیستم.",
    "impact": "دور زدن احراز هویت می‌تواند منجر به دسترسی غیرمجاز به سیستم شود.",
    "exploit": "Attempt session fixation, parameter tampering, or SQL injection to bypass authentication.",
    "exploit_fa": "تلاش برای تثبیت نشست، دستکاری پارامترها یا تزریق SQL برای دور زدن احراز هویت",
    "solution": "پیاده‌سازی احراز هویت چندلایه، بررسی دقیق توکن‌های نشست، اعتبارسنجی دقیق تمام پارامترها"
  },
  {
    "label": "Testing for Vulnerable Remember Password",
    "id": "4.4.5",
    "description": "بررسی امنیت مکانیزم ذخیره گذرواژه‌ها در مرورگر یا برنامه.",
    "impact": "ذخیره‌سازی ناامن گذرواژه‌ها می‌تواند منجر به افشای آنها شود.",
    "exploit": "Inspect local storage, cookies, or browser memory to retrieve stored passwords.",
    "exploit_fa": "بررسی حافظه محلی، کوکی‌ها یا حافظه مرورگر برای بازیابی رمزهای عبور ذخیره شده",
    "solution": "غیرفعال کردن قابلیت ذخیره رمزعبور، استفاده از رمزنگاری قوی برای ذخیره‌سازی، آموزش کاربران"
  },
  {
    "label": "Testing for Browser Cache Weaknesses",
    "id": "4.4.6",
    "description": "بررسی نقاط ضعف حافظه پنهان مرورگر در ذخیره‌سازی داده‌های حساس.",
    "impact": "حافظه پنهان ناامن می‌تواند اطلاعات حساس را در اختیار مهاجم قرار دهد.",
    "exploit": "Access cached pages or resources to retrieve sensitive data after logout.",
    "exploit_fa": "دسترسی به صفحات یا منابع ذخیره شده در حافظه پنهان برای بازیابی داده‌های حساس پس از خروج",
    "solution": "تنظیم هدرهای کش مناسب، اجبار به عدم کش صفحات حساس، پاکسازی حافظه پنهان پس از خروج"
  },
  {
    "label": "Testing for Weak Password Policy",
    "id": "4.4.7",
    "description": "بررسی سیاست‌های ضعیف گذرواژه که باعث انتخاب رمزهای ساده یا کوتاه می‌شوند.",
    "impact": "سیاست ضعیف گذرواژه می‌تواند حدس زدن یا حملات brute-force را آسان کند.",
    "exploit": "Attempt to set weak passwords or use brute-force to test password strength enforcement.",
    "exploit_fا": "تلاش برای تنظیم رمزهای عبور ضعیف یا استفاده از brute-force برای تست اجرای سیاست قدرت رمزعبور",
    "solution": "اجرای سیاست‌های قوی رمزعبور (حداقل طول، ترکیب کاراکترها)، آموزش کاربران، استفاده از احراز هویت چندعاملی"
  },
  {
    "label": "Testing for Weak Security Question Answer",
    "id": "4.4.8",
    "description": "بررسی پرسش/پاسخ امنیتی ضعیف که ممکن است توسط مهاجمین حدس زده شود.",
    "impact": "سوالات امنیتی ضعیف می‌توانند منجر به بازیابی غیرمجاز حساب‌ها شوند.",
    "exploit": "Attempt to reset passwords using easily guessable security question answers.",
    "exploit_fa": "تلاش برای بازنشانی رمزعبور با استفاده از پاسخ‌های قابل حدس به سوالات امنیتی",
    "solution": "استفاده از سوالات امنیتی پیچیده، اجازه دادن به کاربران برای تعریف سوالات خود، استفاده از روش‌های جایگزین بازیابی"
  },
  {
    "label": "Testing for Weak Password Change or Reset Functionalities",
    "id": "4.4.9",
    "description": "بررسی عملکردهای تغییر یا بازنشانی گذرواژه و اطمینان از امنیت آنها.",
    "impact": "فرایند ضعیف تغییر یا بازنشانی گذرواژه می‌تواند به دسترسی غیرمجاز منجر شود.",
    "exploit": "Attempt unauthorized password reset or change by manipulating the process.",
    "exploit_fa": "تلاش برای بازنشانی یا تغییر رمزعبور غیرمجاز با دستکاری فرآیند",
    "solution": "اعتبارسنجی دقیق هویت کاربر قبل از تغییر رمز، استفاده از لینک‌های یکبارمصرف، اطلاع‌رسانی به کاربر برای تغییرات"
  },
  {
    "label": "Testing for Weaker Authentication in Alternative Channel",
    "id": "4.4.10",
    "description": "بررسی احراز هویت ضعیف در کانال‌های جایگزین مانند ایمیل یا پیامک.",
    "impact": "کانال جایگزین ناامن می‌تواند منجر به دسترسی غیرمجاز شود.",
    "exploit": "Try to authenticate via alternative channels with weak verification mechanisms.",
    "exploit_fa": "تلاش برای احراز هویت از طریق کانال‌های جایگزین با مکانیزم‌های تأیید ضعیف",
    "solution": "یکسان‌سازی سطح امنیتی در تمام کانال‌ها، استفاده از احراز هویت قوی در کانال‌های جایگزین، نظارت بر فعالیت‌ها"
  },
  {
    "label": "Testing Multi-Factor Authentication",
    "id": "4.4.11",
    "description": "بررسی پیاده‌سازی احراز هویت چندعاملی (MFA) و کارکرد صحیح آن.",
    "impact": "پیاده‌سازی ناقص MFA می‌تواند منجر به نفوذ و دسترسی غیرمجاز شود.",
    "exploit": "Attempt bypassing MFA using social engineering or replay attacks.",
    "exploit_fa": "تلاش برای دور زدن MFA با استفاده از مهندسی اجتماعی یا حملات تکرار",
    "solution": "پیاده‌سازی MFA با فاکتورهای قوی، آموزش کاربران، نظارت بر تلاش‌های احراز هویت"
  },
  {
    "label": "Testing Directory Traversal File Include",
    "id": "4.5.1",
    "description": "بررسی امکان دسترسی به فایل‌ها و مسیرهای خارج از محدوده مجاز از طریق پیمایش مسیر.",
    "impact": "دسترسی غیرمجاز به فایل‌های حساس می‌تواند افشای داده‌ها و نفوذ به سیستم را تسهیل کند.",
    "exploit": "Attempt directory traversal attacks to include or read unauthorized files.",
    "exploit_fa": "تلاش برای حملات پیمایش دایرکتوری برای شامل کردن یا خواندن فایل‌های غیرمجاز",
    "solution": "اعتبارسنجی دقیق مسیرهای ورودی، استفاده از لیست سفید مسیرهای مجاز، محدود کردن دسترسی به سیستم فایل"
  },
  {
    "label": "Testing for Bypassing Authorization Schema",
    "id": "4.5.2",
    "description": "آزمون امکان دور زدن شمای کنترل دسترسی سیستم.",
    "impact": "دور زدن کنترل دسترسی می‌تواند منجر به دسترسی غیرمجاز به منابع محافظت‌شده شود.",
    "exploit": "Manipulate parameters or URLs to access restricted resources without proper authorization.",
    "exploit_fa": "دستکاری پارامترها یا URLها برای دسترسی به منابع محدود شده بدون مجوز مناسب",
    "solution": "پیاده‌سازی کنترل دسترسی دقیق، بررسی مجوزها در هر لایه، ممیزی منظم دسترسی‌ها"
  },
  {
    "label": "Testing for Privilege Escalation",
    "id": "4.5.3",
    "description": "بررسی امکان ارتقاء سطح دسترسی کاربران معمولی به دسترسی مدیریتی یا بالاتر.",
    "impact": "ارتقاء دسترسی غیرمجاز می‌تواند کنترل کامل سیستم را در اختیار مهاجم قرار دهد.",
    "exploit": "Exploit misconfigurations or vulnerabilities to gain higher privileges.",
    "exploit_fa": "سوءاستفاده از تنظیمات نادرست یا آسیب‌پذیری‌ها برای کسب امتیازات بالاتر",
    "solution": "اصل حداقل دسترسی، جداسازی وظایف، بررسی منظم مجوزهای کاربران"
  },
  {
    "label": "Testing for Insecure Direct Object References",
    "id": "4.5.4",
    "description": "بررسی دسترسی ناامن به منابع از طریق شناسه‌های مستقیم اشیاء.",
    "impact": "دسترسی مستقیم به اشیاء می‌تواند منجر به افشای داده‌های کاربران دیگر شود.",
    "exploit": "Access objects by modifying parameters to reference unauthorized resources.",
    "exploit_fa": "دسترسی به اشیاء با تغییر پارامترها برای ارجاع به منابع غیرمجاز",
    "solution": "استفاده از نقشه‌های غیرمستقیم، اعتبارسنجی دسترسی در هر درخواست، رمزنگاری شناسه‌ها"
  },
  {
    "label": "Testing for OAuth Authorization Server Weaknesses",
    "id": "4.5.5.1",
    "description": "بررسی ضعف‌های سرور احراز هویت OAuth مانند پیکربندی نادرست و آسیب‌پذیری‌های امنیتی.",
    "impact": "ضعف در سرور OAuth می‌تواند اجازه دسترسی غیرمجاز به منابع محافظت‌شده بدهد.",
    "exploit": "Attempt token manipulation, replay attacks, or misconfigured scopes on the authorization server.",
    "exploit_fa": "تلاش برای دستکاری توکن، حملات تکرار یا محدوده‌های پیکربندی نادرست در سرور احراز هویت",
    "solution": "پیکربندی صحیح سرور OAuth، استفاده از PKCE، محدود کردن عمر توکن‌ها، نظارت بر فعالیت‌ها"
  },
  {
    "label": "Testing for OAuth Client Weaknesses",
    "id": "4.5.5.2",
    "description": "بررسی ضعف‌های کلاینت OAuth شامل ذخیره‌سازی ناامن توکن‌ها یا نقص در احراز هویت.",
    "impact": "ضعف در کلاینت OAuth می‌تواند منجر به افشای توکن و دسترسی غیرمجاز شود.",
    "exploit": "Inspect client-side storage or intercept tokens to gain unauthorized access.",
    "exploit_fa": "بررسی ذخیره‌سازی سمت کلاینت یا رهگیری توکن‌ها برای دسترسی غیرمجاز",
    "solution": "ذخیره‌سازی امن توکن‌ها، استفاده از جریان‌های امن OAuth، اعتبارسنجی دقیق redirect URI"
  },
  {
    "label": "Testing for Session Management Schema",
    "id": "4.6.1",
    "description": "بررسی طراحی و پیاده‌سازی سیستم مدیریت نشست برای اطمینان از امنیت و مدیریت مناسب نشست‌ها.",
    "impact": "ضعف در مدیریت نشست می‌تواند منجر به دسترسی غیرمجاز و افشای داده‌ها شود.",
    "exploit": "Attempt to manipulate session identifiers or session flow to gain unauthorized access.",
    "exploit_fa": "تلاش برای دستکاری شناسه‌های نشست یا جریان نشست برای دسترسی غیرمجاز",
    "solution": "استفاده از شناسه‌های نشست تصادفی طولانی، رمزنگاری داده‌های نشست، باطل کردن نشست پس از خروج"
  },
  {
    "label": "Testing for Cookies Attributes",
    "id": "4.6.2",
    "description": "بررسی ویژگی‌های کوکی‌ها مانند HttpOnly، Secure و SameSite برای محافظت از اطلاعات نشست.",
    "impact": "عدم تنظیم صحیح ویژگی‌ها می‌تواند باعث افشای کوکی‌ها و نشست‌های کاربر شود.",
    "exploit": "Inspect and manipulate cookies to hijack or steal session information.",
    "exploit_fa": "بررسی و دستکاری کوکی‌ها برای سرقت یا ربودن اطلاعات نشست",
    "solution": "تنظیم صحیح ویژگی‌های امنیتی کوکی (HttpOnly، Secure، SameSite)، محدود کردن دامنه کوکی‌ها"
  },
  {
    "label": "Testing for Session Fixation",
    "id": "4.6.3",
    "description": "آزمون امکان استفاده از شناسه نشست ثابت برای دسترسی غیرمجاز.",
    "impact": "ممکن است مهاجم به یک نشست معتبر وارد شود و کنترل کاربر را به دست گیرد.",
    "exploit": "Set a predefined session ID and attempt to use it to authenticate as another user.",
    "exploit_fa": "تنظیم شناسه نشست از پیش تعریف شده و تلاش برای استفاده از آن به عنوان کاربر دیگر",
    "solution": "تغییر شناسه نشست پس از احراز هویت، عدم پذیرش شناسه‌های نشست از ورودی کاربر، باطل کردن نشست‌های قدیمی"
  },
  {
    "label": "Testing for Exposed Session Variables",
    "id": "4.6.4",
    "description": "بررسی متغیرهای نشست که به صورت ناامن افشا شده‌اند یا در دسترس هستند.",
    "impact": "افشای متغیرهای حساس نشست می‌تواند منجر به نفوذ و دسترسی غیرمجاز شود.",
    "exploit": "Access session variables via client-side scripts or URL manipulation.",
    "exploit_fa": "دسترسی به متغیرهای نشست از طریق اسکریپت‌های سمت کلاینت یا دستکاری URL",
    "solution": "ذخیره‌سازی داده‌های حساس نشست فقط در سمت سرور، رمزنگاری داده‌های نشست، بررسی منظم کد"
  },
  {
    "label": "Testing for Cross Site Request Forgery",
    "id": "4.6.5",
    "description": "بررسی آسیب‌پذیری سیستم در برابر حملات جعل درخواست از سایت دیگر (CSRF).",
    "impact": "مهاجم می‌تواند درخواست‌های مخرب به نام کاربر معتبر ارسال کند.",
    "exploit": "Forge malicious requests from another site to perform actions on behalf of the user.",
    "exploit_fa": "جعل درخواست‌های مخرب از سایت دیگر برای انجام اقدامات به نام کاربر",
    "solution": "پیاده‌سازی توکن‌های CSRF، بررسی هدر Origin/Referer، استفاده از احراز هویت چندعاملی برای اقدامات حساس"
  },
  {
    "label": "Testing for Logout Functionality",
    "id": "4.6.6",
    "description": "آزمون عملکرد خروج از سیستم برای اطمینان از خاتمه درست نشست.",
    "impact": "جلسه کاربر ممکن است پس از خروج فعال باقی بماند و دسترسی غیرمجاز ایجاد شود.",
    "exploit": "Verify session is invalidated after logout by reusing old session identifiers.",
    "exploit_fa": "تأیید باطل شدن نشست پس از خروج با استفاده مجدد از شناسه‌های نشست قدیمی",
    "solution": "باطل کردن کامل نشست در سمت سرور، پاکسازی کوکی‌های نشست، هدایت کاربر به صفحه لاگین پس از خروج"
  },
  {
    "label": "Testing Session Timeout",
    "id": "4.6.7",
    "description": "بررسی زمان انقضای نشست برای جلوگیری از نشست‌های طولانی و سوءاستفاده احتمالی.",
    "impact": "عدم اعمال تایم‌اوت مناسب می‌تواند منجر به سوءاستفاده از نشست‌های فعال شود.",
    "exploit": "Keep the session idle and check if it expires after the defined timeout period.",
    "exploit_fa": "نگه داشتن نشست در حالت بی‌کاری و بررسی انقضای آن پس از مدت زمان تعریف شده",
    "solution": "تنظیم زمان‌بندی مناسب برای انقضای نشست، اخطار به کاربران قبل از انقضا، امکان تمدید نشست"
  },
  {
    "label": "Testing for Session Puzzling",
    "id": "4.6.8",
    "description": "آزمون مشکلات پیچیده نشست که باعث سردرگمی در مدیریت نشست و آسیب‌پذیری شود.",
    "impact": "مشکلات پیچیده نشست می‌تواند باعث بروز ضعف‌های امنیتی و دسترسی غیرمجاز شود.",
    "exploit": "Attempt unusual session manipulations to find inconsistencies or vulnerabilities.",
    "exploit_fa": "تلاش برای دستکاری‌های غیرمعمول نشست برای یافتن ناسازگاری‌ها یا آسیب‌پذیری‌ها",
    "solution": "مدیریت یکپارچه نشست‌ها، بررسی منطق برنامه، تست‌های امنیتی دقیق"
  },
  {
    "label": "Testing for Session Hijacking",
    "id": "4.6.9",
    "description": "بررسی امکان ربودن نشست کاربران توسط مهاجم.",
    "impact": "دسترسی غیرمجاز به حساب کاربری و انجام عملیات به نام کاربر دیگر ممکن است.",
    "exploit": "Intercept or steal active session tokens to gain unauthorized access.",
    "exploit_fa": "رهگیری یا سرقت توکن‌های نشست فعال برای دسترسی غیرمجاز",
    "solution": "استفاده از HTTPS برای تمام ارتباطات، رمزنگاری توکن‌های نشست، چرخش منظم شناسه‌های نشست"
  },
  {
    "label": "Testing JSON Web Tokens",
    "id": "4.6.10",
    "description": "بررسی امنیت توکن‌های JWT شامل امضا، اعتبارسنجی و مدیریت نشست.",
    "impact": "ضعف در JWT می‌تواند منجر به جعل یا دسترسی غیرمجاز به منابع شود.",
    "exploit": "Attempt to tamper with JWT payloads or use expired tokens to bypass authentication.",
    "exploit_fa": "تلاش برای دستکاری محموله‌های JWT یا استفاده از توکن‌های منقضی شده برای دور زدن احراز هویت",
    "solution": "استفاده از الگوریتم‌های قوی امضا، اعتبارسنجی دقیق توکن‌ها، مدیریت مناسب کلیدها"
  },
  {
    "label": "Testing for Concurrent Sessions",
    "id": "4.6.11",
    "description": "بررسی امکان اجرای همزمان چند نشست برای یک کاربر و مدیریت صحیح آن.",
    "impact": "اجازه دادن به نشست‌های همزمان بدون کنترل مناسب می‌تواند امنیت سیستم را کاهش دهد.",
    "exploit": "Log in simultaneously from multiple devices and check if sessions are properly managed.",
    "exploit_fa": "ورود همزمان از چندین دستگاه و بررسی مدیریت صحیح نشست‌ها",
    "solution": "محدود کردن تعداد نشست‌های همزمان، اطلاع‌رسانی به کاربر برای نشست‌های جدید، امکان مشاهده و قطع نشست‌های فعال"
  },
  {
    "label": "Testing for Reflected Cross Site Scripting",
    "id": "4.7.1",
    "description": "بررسی آسیب‌پذیری XSS بازتابی که امکان تزریق اسکریپت‌های مخرب در پاسخ‌های وب را فراهم می‌کند.",
    "impact": "می‌تواند منجر به دزدی کوکی‌ها، تغییر محتوا یا اجرای کد مخرب شود.",
    "exploit": "Inject malicious scripts in input fields and observe if they are reflected in the response.",
    "exploit_fa": "تزریق اسکریپت‌های مخرب در فیلدهای ورودی و مشاهده بازتاب آن در پاسخ",
    "solution": "اعتبارسنجی و پالایش تمام ورودی‌ها، استفاده از رمزگذاری خروجی، پیاده‌سازی CSP"
  },
  {
    "label": "Testing for Stored Cross Site Scripting",
    "id": "4.7.2",
    "description": "آزمون XSS ذخیره‌شده که داده‌های مخرب در پایگاه داده ذخیره شده و برای کاربران دیگر نمایش داده می‌شود.",
    "impact": "می‌تواند باعث اجرای خودکار اسکریپت مخرب برای کاربران بازدیدکننده شود.",
    "exploit": "Submit payloads to persistent storage and trigger them when retrieved.",
    "exploit_fa": "ارسال محموله‌ها به ذخیره‌سازی پایدار و فعال کردن آن‌ها هنگام بازیابی",
    "solution": "اعتبارسنجی و پالایش داده‌های ذخیره شده، محدود کردن HTML مجاز، آموزش توسعه‌دهندگان"
  },
  {
    "label": "Testing for HTTP Verb Tampering",
    "id": "4.7.3",
    "description": "بررسی تغییر روش HTTP برای سوءاستفاده از سیستم و دور زدن کنترل‌ها.",
    "impact": "می‌تواند منجر به دسترسی غیرمجاز یا دور زدن محدودیت‌ها شود.",
    "exploit": "Modify HTTP methods like POST to GET to bypass restrictions.",
    "exploit_fa": "تغییر روش‌های HTTP مانند تبدیل POST به GET برای دور زدن محدودیت‌ها",
    "solution": "اعتبارسنجی روش‌های HTTP در هر نقطه پایانی، استفاده از لیست سفید روش‌های مجاز، ممیزی منظم"
  },
  {
    "label": "Testing for HTTP Parameter Pollution",
    "id": "4.7.4",
    "description": "بررسی آلودگی پارامترهای HTTP که باعث تداخل یا سوءاستفاده از داده‌ها می‌شود.",
    "impact": "می‌تواند باعث رفتار غیرمنتظره برنامه و دسترسی غیرمجاز شود.",
    "exploit": "Send multiple parameters with the same name to check for pollution effects.",
    "exploit_fa": "ارسال چندین پارامتر با نام یکسان برای بررسی اثرات آلودگی",
    "solution": "پردازش یکنواخت پارامترها، اعتبارسنجی دقیق ورودی‌ها، مستندسازی رفتار برنامه"
  },
  {
    "label": "Testing for SQL Injection - Oracle",
    "id": "4.7.5.1",
    "description": "آزمون تزریق SQL در پایگاه داده Oracle برای دسترسی یا تغییر داده‌های ناخواسته.",
    "impact": "می‌تواند منجر به افشای داده‌ها یا کنترل کامل پایگاه داده شود.",
    "exploit": "Inject SQL payloads into Oracle queries to extract or modify data.",
    "exploit_fa": "تزریق محموله‌های SQL در کوئری‌های اوراکل برای استخراج یا تغییر داده‌ها",
    "solution": "استفاده از دستورات پارامتری شده، اعتبارسنجی ورودی‌ها، اصل حداقل امتیاز برای اتصال به پایگاه داده"
  },
  {
    "label": "Testing for SQL Injection - MySQL",
    "id": "4.7.5.2",
    "description": "آزمون تزریق SQL در پایگاه داده MySQL.",
    "impact": "می‌تواند منجر به افشای داده‌ها یا دسترسی غیرمجاز شود.",
    "exploit": "Inject SQL payloads into MySQL queries to manipulate database operations.",
    "exploit_fa": "تزریق محموله‌های SQL در کوئری‌های MySQL برای دستکاری عملیات پایگاه داده",
    "solution": "استفاده از prepared statements، escaping ورودی‌ها، محدود کردن دسترسی‌های پایگاه داده"
  },
  {
    "label": "Testing for SQL Injection - SQL Server",
    "id": "4.7.5.3",
    "description": "آزمون تزریق SQL در پایگاه داده SQL Server.",
    "impact": "ممکن است منجر به افشای اطلاعات حساس شود.",
    "exploit": "Inject SQL payloads targeting SQL Server to bypass queries or extract data.",
    "exploit_fa": "تزریق محموله‌های SQL مختص SQL Server برای دور زدن کوئری‌ها یا استخراج داده",
    "solution": "استفاده از stored procedures، اعتبارسنجی ورودی‌ها، غیرفعال کردن دستورات خطرناک"
  },
  {
    "label": "Testing for SQL Injection - PostgreSQL",
    "id": "4.7.5.4",
    "description": "آزمون تزریق SQL در پایگاه داده PostgreSQL.",
    "impact": "می‌تواند باعث دسترسی یا تغییر داده‌های حساس شود.",
    "exploit": "Inject PostgreSQL-specific payloads to test for SQL injection vulnerabilities.",
    "exploit_fa": "تزریق محموله‌های خاص PostgreSQL برای تست آسیب‌پذیری‌های تزریق SQL",
    "solution": "استفاده از پارامترهای اتصال، محدود کردن دسترسی‌های کاربران، به‌روزرسانی منظم پایگاه داده"
  },
  {
    "label": "Testing for SQL Injection - MS Access",
    "id": "4.7.5.5",
    "description": "آزمون تزریق SQL در پایگاه داده MS Access.",
    "impact": "می‌تواند باعث دسترسی غیرمجاز یا تغییر داده‌ها شود.",
    "exploit": "Inject SQL payloads in MS Access queries to verify vulnerability.",
    "exploit_fa": "تزریق محموله‌های SQL در کوئری‌های MS Access برای تأیید آسیب‌پذیری",
    "solution": "اعتبارسنجی دقیق ورودی‌ها، استفاده از query parameters، محدود کردن دسترسی به فایل‌های پایگاه داده"
  },
  {
    "label": "Testing for SQL Injection - NoSQL",
    "id": "4.7.5.6",
    "description": "آزمون تزریق در پایگاه‌های داده NoSQL برای بررسی آسیب‌پذیری.",
    "impact": "می‌تواند منجر به دور زدن احراز هویت یا دسترسی به داده‌ها شود.",
    "exploit": "Inject payloads targeting NoSQL databases to manipulate queries.",
    "exploit_fa": "تزریق محموله‌های مختص پایگاه‌های داده NoSQL برای دستکاری کوئری‌ها",
    "solution": "اعتبارسنجی ورودی‌ها، استفاده از ORM امن، محدود کردن دسترسی‌های کاربران"
  },
  {
    "label": "Testing for SQL Injection - ORM",
    "id": "4.7.5.7",
    "description": "آزمون تزریق SQL از طریق ORM (Object-Relational Mapping).",
    "impact": "می‌تواند باعث دور زدن کنترل‌های ORM و دسترسی غیرمجاز شود.",
    "exploit": "Inject payloads through ORM queries to test for injection vulnerabilities.",
    "exploit_fa": "تزریق محموله‌ها از طریق کوئری‌های ORM برای تست آسیب‌پذیری‌های تزریق",
    "solution": "استفاده صحیح از ORM، اجتناب از کوئری‌های خام، اعتبارسنجی ورودی‌ها"
  },
  {
    "label": "Testing for SQL Injection - Client-side",
    "id": "4.7.5.8",
    "description": "آزمون تزریق SQL از سمت کلاینت و ورودی‌های کاربر.",
    "impact": "می‌تواند باعث اجرای دستورات ناخواسته در سمت سرور شود.",
    "exploit": "Send client-side payloads to trigger SQL execution on the server.",
    "exploit_fa": "ارسال محموله‌های سمت کلاینت برای فعال کردن اجرای SQL در سرور",
    "solution": "اعتبارسنجی سمت سرور، استفاده از پارامترهای اتصال، محدود کردن دستورات SQL قابل اجرا"
  },
  {
    "label": "Testing for LDAP Injection",
    "id": "4.7.6",
    "description": "آزمون تزریق LDAP که می‌تواند باعث دسترسی یا تغییر داده‌ها شود.",
    "impact": "می‌تواند منجر به دسترسی غیرمجاز و افشای اطلاعات شود.",
    "exploit": "Inject LDAP queries to manipulate directory lookups or authentication.",
    "exploit_fa": "تزریق کوئری‌های LDAP برای دستکاری جستجوهای دایرکتوری یا احراز هویت",
    "solution": "اعتبارسنجی و escaping ورودی‌ها، استفاده از دستورات پارامتری شده، اصل حداقل دسترسی"
  },
  {
    "label": "Testing for XML Injection",
    "id": "4.7.7",
    "description": "بررسی تزریق XML برای دستکاری داده‌های XML یا سرویس‌های مرتبط.",
    "impact": "می‌تواند باعث افشای داده‌ها یا انجام عملیات ناخواسته شود.",
    "exploit": "Inject malicious XML payloads into application XML parsers.",
    "exploit_fa": "تزریق محموله‌های XML مخرب در تجزیه‌کننده‌های XML برنامه",
    "solution": "اعتبارسنجی XML ورودی، غیرفعال کردن ویژگی‌های خطرناک XML، استفاده از لیست سفید"
  },
  {
    "label": "Testing for SSI Injection",
    "id": "4.7.8",
    "description": "آزمون تزریق SSI (Server Side Includes) در صفحات وب.",
    "impact": "می‌تواند منجر به اجرای کد ناخواسته در سرور شود.",
    "exploit": "Insert SSI directives to check server execution.",
    "exploit_fa": "درج دستورات SSI برای بررسی اجرا در سرور",
    "solution": "غیرفعال کردن SSI برای صفحات غیرضروری، اعتبارسنجی محتوای آپلود شده، محدود کردن دستورات مجاز"
  },
  {
    "label": "Testing for XPath Injection",
    "id": "4.7.9",
    "description": "آزمون تزریق XPath برای دستکاری داده‌های XML و پرس‌وجوها.",
    "impact": "می‌تواند باعث افشای داده‌ها یا دسترسی غیرمجاز شود.",
    "exploit": "Inject XPath payloads to manipulate XML query results.",
    "exploit_fa": "تزریق محموله‌های XPath برای دستکاری نتایج کوئری‌های XML",
    "solution": "اعتبارسنجی ورودی‌ها، استفاده از پارامترهای اتصال، محدود کردن دسترسی به داده‌های حساس"
  },
  {
    "label": "Testing for IMAP SMTP Injection",
    "id": "4.7.10",
    "description": "بررسی تزریق در پروتکل‌های ایمیل IMAP/SMTP.",
    "impact": "می‌تواند منجر به ارسال ایمیل ناخواسته یا دسترسی به اطلاعات شود.",
    "exploit": "Send crafted commands to IMAP/SMTP servers to test injection.",
    "exploit_fa": "ارسال دستورات ساختگی به سرورهای IMAP/SMTP برای تست تزریق",
    "solution": "اعتبارسنجی ورودی‌ها، استفاده از کتابخانه‌های امن، محدود کردن دستورات مجاز"
  },
  {
    "label": "Testing for Code Injection",
    "id": "4.7.11.1",
    "description": "آزمون تزریق کد برای اجرای دستورات ناخواسته در سیستم.",
    "impact": "می‌تواند باعث اجرای کد مخرب و دسترسی غیرمجاز شود.",
    "exploit": "Inject system commands or scripts to be executed on the server.",
    "exploit_fa": "تزریق دستورات سیستم یا اسکریپت‌ها برای اجرا در سرور",
    "solution": "اعتبارسنجی دقیق ورودی‌ها، استفاده از sandboxing، غیرفعال کردن توابع خطرناک"
  },
  {
    "label": "Testing for File Inclusion",
    "id": "4.7.11.2",
    "description": "آزمون تزریق شامل کردن فایل‌ها که ممکن است کد مخرب اجرا شود.",
    "impact": "می‌تواند باعث اجرای فایل‌های ناخواسته و کنترل سرور شود.",
    "exploit": "Include remote or local files to trigger unintended execution.",
    "exploit_fa": "شامل کردن فایل‌های محلی یا راه دور برای فعال کردن اجرای ناخواسته",
    "solution": "استفاده از لیست سفید فایل‌های مجاز، غیرفعال کردن include راه دور، اعتبارسنجی مسیرها"
  },
  {
    "label": "Testing for Command Injection",
    "id": "4.7.12",
    "description": "بررسی امکان تزریق دستورات سیستم از ورودی‌ها.",
    "impact": "می‌تواند منجر به کنترل کامل سیستم یا دسترسی غیرمجاز شود.",
    "exploit": "Inject OS commands into input fields and observe execution.",
    "exploit_fa": "تزریق دستورات سیستم عامل در فیلدهای ورودی و مشاهده اجرا",
    "solution": "اعتبارسنجی دقیق ورودی‌ها، استفاده از توابع امن برای اجرای دستورات، اصل حداقل دسترسی"
  },
  {
    "label": "Testing for Format String Injection",
    "id": "4.7.13",
    "description": "آزمون تزریق رشته‌های قالب که می‌تواند باعث رفتار غیرمنتظره شود.",
    "impact": "می‌تواند باعث آسیب‌پذیری امنیتی و افشای اطلاعات شود.",
    "exploit": "Use format specifiers in input fields to exploit the vulnerability.",
    "exploit_fa": "استفاده از مشخص‌کننده‌های قالب در فیلدهای ورودی برای سوءاستفاده از آسیب‌پذیری",
    "solution": "اعتبارسنجی ورودی‌ها، استفاده از توابع امن برای قالب‌بندی، بررسی کد برای نقاط آسیب‌پذیر"
  },
  {
    "label": "Testing for Incubated Vulnerability",
    "id": "4.7.14",
    "description": "آزمون آسیب‌پذیری‌های نهفته یا مخفی در سیستم.",
    "impact": "می‌تواند باعث سوءاستفاده ناخواسته و مشکلات امنیتی شود.",
    "exploit": "Identify latent vulnerabilities through fuzzing or static analysis.",
    "exploit_fa": "شناسایی آسیب‌پذیری‌های نهفته از طریق فازینگ یا تحلیل ایستا",
    "solution": "بررسی منظم کد، تست‌های امنیتی جامع، نظارت بر رفتار برنامه"
  },
  {
    "label": "Testing for HTTP Splitting Smuggling",
    "id": "4.7.15",
    "description": "بررسی آسیب‌پذیری HTTP Splitting و Smuggling.",
    "impact": "می‌تواند باعث تزریق هدرهای ناخواسته یا رفتار غیرمنتظره شود.",
    "exploit": "Manipulate HTTP headers to split or smuggle requests.",
    "exploit_fa": "دستکاری هدرهای HTTP برای تقسیم یا قاچاق درخواست‌ها",
    "solution": "اعتبارسنجی هدرها، کدگذاری مناسب داده‌ها، استفاده از پروکسی‌های امن"
  },
  {
    "label": "Testing for HTTP Incoming Requests",
    "id": "4.7.16",
    "description": "بررسی نحوه مدیریت درخواست‌های ورودی HTTP.",
    "impact": "عدم بررسی صحیح می‌تواند باعث دسترسی غیرمجاز شود.",
    "exploit": "Send crafted HTTP requests to test request handling.",
    "exploit_fa": "ارسال درخواست‌های HTTP ساختگی برای تست مدیریت درخواست‌ها",
    "solution": "اعتبارسنجی دقیق درخواست‌ها، محدود کردن اندازه درخواست‌ها، استفاده از WAF"
  },
  {
    "label": "Testing for Host Header Injection",
    "id": "4.7.17",
    "description": "آزمون تزریق هدر Host برای دستکاری رفتار سرور.",
    "impact": "می‌تواند باعث افشای داده‌ها یا دور زدن کنترل‌ها شود.",
    "exploit": "Modify Host header and observe server responses.",
    "exploit_fa": "تغییر هدر Host و مشاهده پاسخ‌های سرور",
    "solution": "اعتبارسنجی هدر Host، استفاده از لیست سفید دامنه‌های مجاز، غیرفعال کردن ویژگی‌های خطرناک"
  },
  {
    "label": "Testing for Server-side Template Injection",
    "id": "4.7.18",
    "description": "بررسی تزریق در قالب‌های سمت سرور که ممکن است کد اجرا شود.",
    "impact": "می‌تواند منجر به اجرای کد مخرب و دسترسی غیرمجاز شود.",
    "exploit": "Inject template expressions to trigger server-side execution.",
    "exploit_fa": "تزریق عبارات قالب برای فعال کردن اجرای سمت سرور",
    "solution": "استفاده از sandboxing برای قالب‌ها، محدود کردن دستورات مجاز، اعتبارسنجی ورودی‌ها"
  },
  {
    "label": "Testing for Server-Side Request Forgery",
    "id": "4.7.19",
    "description": "آزمون جعل درخواست سمت سرور (SSRF) برای دسترسی به منابع داخلی.",
    "impact": "می‌تواند منجر به افشای داده‌ها یا حمله به شبکه داخلی شود.",
    "exploit": "Send requests from server to internal services to test SSRF.",
    "exploit_fa": "ارسال درخواست‌ها از سرور به سرویس‌های داخلی برای تست SSRF",
    "solution": "اعتبارسنجی URLها، استفاده از لیست سفید دامنه‌های مجاز، جداسازی شبکه‌ای"
  },
  {
    "label": "Testing for Mass Assignment",
    "id": "4.7.20",
    "description": "بررسی آسیب‌پذیری Mass Assignment که مقادیر حساس می‌توانند تنظیم شوند.",
    "impact": "می‌تواند باعث تغییر داده‌های حساس بدون کنترل شود.",
    "exploit": "Attempt to assign sensitive fields via input payloads.",
    "exploit_fa": "تلاش برای اختصاص فیلدهای حساس از طریق محموله‌های ورودی",
    "solution": "استفاده از لیست سفید فیلدهای قابل تنظیم، اعتبارسنجی دقیق ورودی‌ها، استفاده از DTOها"
  },
  {
    "label": "Testing for Improper Error Handling",
    "id": "4.8.1",
    "description": "آزمون مدیریت نادرست خطا که ممکن است اطلاعات حساس را فاش کند یا رفتار برنامه را تغییر دهد.",
    "impact": "می‌تواند باعث افشای داده‌ها، نمایش جزئیات سیستم یا بروز رفتار ناخواسته شود.",
    "exploit": "Trigger errors and observe if detailed error messages or stack traces are returned.",
    "exploit_fa": "ایجاد خطا و مشاهده آیا پیام‌های خطای دقیق یا ردپای استک برگردانده می‌شود",
    "solution": "پیاده‌سازی مدیریت خطای یکپارچه، نمایش پیام‌های خطای عمومی، غیرفعال کردن نمایش خطاها در محیط تولید"
  },
  {
    "label": "Testing for Stack Traces",
    "id": "4.8.2",
    "description": "بررسی نمایش Stack Traces در پاسخ‌های برنامه که می‌تواند اطلاعات پیاده‌سازی را فاش کند.",
    "impact": "می‌تواند منجر به افشای ساختار برنامه و کمک به مهاجمان برای حمله شود.",
    "exploit": "Cause application exceptions and inspect if stack traces are exposed to users.",
    "exploit_fa": "ایجاد استثناهای برنامه و بررسی آیا ردپای استک به کاربران نمایش داده می‌شود",
    "solution": "غیرفعال کردن نمایش stack trace در محیط تولید، ثبت خطاها در فایل‌های لاگ، نمایش پیام‌های خطای عمومی"
  },
  {
    "label": "Testing for Weak Transport Layer Security",
    "id": "4.9.1",
    "description": "آزمون SSL/TLS ضعیف که می‌تواند ارتباطات را در معرض شنود و حملات مرد میانی قرار دهد.",
    "impact": "می‌تواند منجر به افشای داده‌های حساس و دسترسی غیرمجاز شود.",
    "exploit": "Analyze SSL/TLS configurations for weak ciphers or protocol versions and attempt man-in-the-middle attacks.",
    "exploit_fa": "تحلیل پیکربندی SSL/TLS برای یافتن رمزهای ضعیف یا نسخه‌های پروتکل و تلاش برای حملات مرد میانی",
    "solution": "استفاده از پروتکل‌ها و رمزهای قوی، غیرفعال کردن SSL قدیمی، به‌روزرسانی منظم سرور"
  },
  {
    "label": "Testing for Padding Oracle",
    "id": "4.9.2",
    "description": "آزمون آسیب‌پذیری Padding Oracle که امکان رمزگشایی داده‌های رمزنگاری شده را فراهم می‌کند.",
    "impact": "می‌تواند به مهاجم اجازه دهد پیام‌های رمزنگاری شده را بدون کلید رمزگشایی کند.",
    "exploit": "Send crafted ciphertexts and analyze server responses to infer plaintext using padding oracle attacks.",
    "exploit_fa": "ارسال متن‌های رمزنگاری شده ساختگی و تحلیل پاسخ‌های سرور برای استنتاج متن اصلی با استفاده از حملات Padding Oracle",
    "solution": "استفاده از حالت‌های رمزنگاری امن، پیاده‌سازی پاسخ‌های خطای یکنواخت، به‌روزرسانی کتابخانه‌های رمزنگاری"
  },
  {
    "label": "Testing for Sensitive Information Sent via Unencrypted Channels",
    "id": "4.9.3",
    "description": "بررسی ارسال اطلاعات حساس از طریق کانال‌های غیررمزگذاری شده که ممکن است در معرض افشا قرار گیرد.",
    "impact": "می‌تواند باعث افشای اطلاعات کاربر، گذرواژه‌ها یا داده‌های مهم شود.",
    "exploit": "Intercept traffic over unencrypted channels using a network sniffer to capture sensitive data.",
    "exploit_fa": "رصد ترافیک در کانال‌های غیررمزگذاری شده با استفاده از ابزارهای شنود شبکه برای ضبط داده‌های حساس",
    "solution": "اجباری کردن استفاده از رمزگذاری برای تمام ارتباطات حساس، پیاده‌سازی HTTPS، استفاده از پروتکل‌های امن"
  },
  {
    "label": "Testing for Weak Encryption",
    "id": "4.9.4",
    "description": "آزمون رمزنگاری ضعیف که نمی‌تواند داده‌ها را به طور ایمن محافظت کند.",
    "impact": "امکان شکستن رمزنگاری و افشای داده‌های حساس برای مهاجم فراهم می‌شود.",
    "exploit": "Analyze encrypted data and attempt to break weak algorithms using cryptanalysis tools.",
    "exploit_fa": "تحلیل داده‌های رمزنگاری شده و تلاش برای شکستن الگوریتم‌های ضعیف با استفاده از ابزارهای رمزنگاری",
    "solution": "استفاده از الگوریتم‌ها و کلیدهای قوی رمزنگاری، به‌روزرسانی منظم سیستم‌های رمزنگاری، مدیریت صحیح کلیدها"
  },
  {
    "label": "Test Business Logic Data Validation",
    "id": "4.10.1",
    "description": "آزمون اعتبارسنجی داده‌ها در منطق کسب و کار برای جلوگیری از ورودی‌های نادرست یا غیرمجاز.",
    "impact": "ورودی‌های نادرست می‌توانند باعث عملکرد غیرمنتظره برنامه یا دور زدن محدودیت‌ها شوند.",
    "exploit": "Submit malformed or unexpected data to business logic functions and observe application behavior.",
    "exploit_fa": "ارسال داده‌های نادرست یا غیرمنتظره به توابع منطق کسب و کار و مشاهده رفتار برنامه",
    "solution": "اعتبارسنجی دقیق تمام ورودی‌ها در سمت سرور، پیاده‌سازی کنترل‌های منطق کسب و کار امن، تست‌های جامع"
  },
  {
    "label": "Test Ability to Forge Requests",
    "id": "4.10.2",
    "description": "آزمون امکان جعل درخواست‌ها به منظور بررسی آسیب‌پذیری برنامه در برابر درخواست‌های غیرمجاز.",
    "impact": "می‌تواند منجر به اجرای عملیات بدون مجوز و دسترسی به منابع حساس شود.",
    "exploit": "Craft and send unauthorized HTTP requests to access restricted functionality.",
    "exploit_fa": "ساخت و ارسال درخواست‌های HTTP غیرمجاز برای دسترسی به عملکردهای محدود شده",
    "solution": "پیاده‌سازی مکانیزم‌های احراز هویت و کنترل دسترسی قوی، استفاده از توکن‌های امن، بررسی دقیق درخواست‌ها"
  },
  {
    "label": "Test Integrity Checks",
    "id": "4.10.3",
    "description": "آزمون بررسی صحت و یکپارچگی داده‌ها و محاسبات منطق کسب و کار.",
    "impact": "داده‌های آسیب‌پذیر ممکن است منجر به اشتباه در پردازش یا فساد داده‌ها شود.",
    "exploit": "Manipulate data or process parameters to bypass integrity checks and observe behavior.",
    "exploit_fa": "دستکاری داده‌ها یا پارامترهای فرآیند برای دور زدن بررسی‌های یکپارچگی و مشاهده رفتار",
    "solution": "پیاده‌سازی بررسی‌های یکپارچگی قوی، استفاده از امضاهای دیجیتال، اعتبارسنجی داده‌ها در چند لایه"
  },
  {
    "label": "Test for Process Timing",
    "id": "4.10.4",
    "description": "آزمون زمان‌بندی فرآیندها برای شناسایی شرایط مسابقه یا سوءاستفاده‌های احتمالی.",
    "impact": "می‌تواند باعث ایجاد مشکلات رقابتی یا سوءاستفاده از محدودیت‌ها شود.",
    "exploit": "Send concurrent requests or manipulate timing to identify race conditions.",
    "exploit_fa": "ارسال درخواست‌های همزمان یا دستکاری زمان‌بندی برای شناسایی شرایط مسابقه",
    "solution": "پیاده‌سازی مکانیزم‌های قفل‌گذاری، استفاده از تراکنش‌های اتمی، بررسی منطق برنامه برای شرایط مسابقه"
  },
  {
    "label": "Test Number of Times a Function Can Be Used Limits",
    "id": "4.10.5",
    "description": "آزمون محدودیت تعداد دفعات استفاده از یک تابع برای جلوگیری از سوءاستفاده.",
    "impact": "می‌تواند منجر به دور زدن محدودیت‌ها و سوءاستفاده مکرر از عملکرد شود.",
    "exploit": "Repeatedly invoke a function to test enforcement of usage limits.",
    "exploit_fa": "فراخوانی مکرر یک تابع برای تست اجرای محدودیت‌های استفاده",
    "solution": "پیاده‌سازی محدودیت‌های نرخ استفاده، نظارت بر فعالیت‌های غیرعادی، استفاده از مکانیزم‌های throttling"
  },
  {
    "label": "Testing for the Circumvention of Work Flows",
    "id": "4.10.6",
    "description": "آزمون امکان دور زدن جریان‌های کاری تعریف‌شده در برنامه.",
    "impact": "می‌تواند باعث انجام عملیات خارج از جریان استاندارد و نقض سیاست‌ها شود.",
    "exploit": "Attempt to skip or bypass workflow steps and verify if unauthorized actions succeed.",
    "exploit_fa": "تلاش برای رد شدن یا دور زدن مراحل گردش کار و تأیید آیا اقدامات غیرمجاز موفق می‌شوند",
    "solution": "پیاده‌سازی کنترل‌های دقیق در هر مرحله از گردش کار، اعتبارسنجی وضعیت قبل از انجام عملیات، ممیزی منظم"
  },
  {
    "label": "Test Defenses Against Application Misuse",
    "id": "4.10.7",
    "description": "آزمون دفاع برنامه در برابر استفاده نادرست یا غیرمجاز از امکانات آن.",
    "impact": "می‌تواند منجر به آسیب‌پذیری امنیتی یا خراب شدن داده‌ها شود.",
    "exploit": "Attempt actions that misuse the application features and observe security controls.",
    "exploit_fa": "تلاش برای اقداماتی که از ویژگی‌های برنامه سوءاستفاده می‌کنند و مشاهده کنترل‌های امنیتی",
    "solution": "پیاده‌سازی تشخیص ناهنجاری، نظارت بر فعالیت‌های غیرعادی، آموزش کاربران در مورد استفاده صحیح"
  },
  {
    "label": "Test Upload of Unexpected File Types",
    "id": "4.10.8",
    "description": "آزمون بارگذاری فایل‌هایی با نوع یا فرمت غیرمجاز برای شناسایی ضعف‌ها.",
    "impact": "می‌تواند منجر به اجرای کد مخرب یا پر شدن فضای سرور شود.",
    "exploit": "Upload files with unsupported types and observe handling by the application.",
    "exploit_fa": "بارگذاری فایل‌هایی با انواع غیرپشتیبانی شده و مشاهده رفتار برنامه",
    "solution": "استفاده از لیست سفید انواع فایل مجاز، بررسی محتوای فایل‌ها، محدود کردن حجم و تعداد فایل‌های آپلود شده"
  },
  {
    "label": "Test Upload of Malicious Files",
    "id": "4.10.9",
    "description": "آزمون بارگذاری فایل‌های مخرب به منظور بررسی آسیب‌پذیری برنامه در برابر آن‌ها.",
    "impact": "می‌تواند منجر به اجرای کد مخرب یا آسیب به سرور و داده‌ها شود.",
    "exploit": "Upload files containing malware or scripts to test security controls.",
    "exploit_fa": "بارگذاری فایل‌های حاوی بدافزار یا اسکریپت برای تست کنترل‌های امنیتی",
    "solution": "اسکن فایل‌ها با آنتی‌ویروس، محدود کردن دسترسی به فایل‌های آپلود شده، اجرای فایل‌ها در محیط ایزوله"
  },
  {
    "label": "Test Payment Functionality",
    "id": "4.10.10",
    "description": "آزمون عملکرد پرداخت برای اطمینان از صحت پردازش تراکنش‌ها و جلوگیری از سوءاستفاده.",
    "impact": "می‌تواند باعث پرداخت غیرمجاز یا فساد داده‌های مالی شود.",
    "exploit": "Attempt to manipulate payment parameters or transactions to test system integrity.",
    "exploit_fa": "تلاش برای دستکاری پارامترهای پرداخت یا تراکنش‌ها برای تست یکپارچگی سیستم",
    "solution": "پیاده‌سازی احراز هویت قوی برای تراکنش‌ها، استفاده از درگاه‌های پرداخت معتبر، نظارت بر تراکنش‌های غیرعادی"
  },
  {
    "label": "Testing for DOM-Based Cross Site Scripting",
    "id": "4.11.1",
    "description": "آزمون XSS مبتنی بر مدل DOM برای شناسایی نقاطی که داده‌های ورودی در DOM پردازش و اجرا می‌شوند.",
    "impact": "اجرای اسکریپت‌های مخرب در مرورگر کاربر و دسترسی غیرمجاز به داده‌ها.",
    "exploit": "Inject malicious scripts into DOM-manipulated inputs and observe execution.",
    "exploit_fa": "تزریق اسکریپت‌های مخرب به ورودی‌های دستکاری شده DOM و مشاهده اجرا",
    "solution": "اعتبارسنجی و پالایش داده‌های ورودی قبل از استفاده در DOM، استفاده از APIهای امن DOM، پیاده‌سازی CSP"
  },
  {
    "label": "Testing for JavaScript Execution",
    "id": "4.11.2",
    "description": "آزمون اجرای اسکریپت‌های جاوا برای شناسایی آسیب‌پذیری‌های سمت کاربر.",
    "impact": "اجرای کد مخرب، تغییر رفتار برنامه یا افشای اطلاعات حساس.",
    "exploit": "Inject or manipulate JavaScript code to test client-side execution.",
    "exploit_fa": "تزریق یا دستکاری کد جاوااسکریپت برای تست اجرای سمت کلاینت",
    "solution": "اعتبارسنجی و پالایش ورودی‌های قابل اجرا، استفاده از sandboxing، محدود کردن منابع قابل بارگیری"
  },
  {
    "label": "Testing for HTML Injection",
    "id": "4.11.3",
    "description": "آزمون تزریق HTML برای بررسی ضعف‌های سمت کاربر در پردازش ورودی.",
    "impact": "تغییر ساختار صفحه، نمایش محتوای مخرب یا افشای اطلاعات.",
    "exploit": "Insert HTML tags into input fields and observe rendering behavior.",
    "exploit_fa": "درج تگ‌های HTML در فیلدهای ورودی و مشاهده رفتار رندرینگ",
    "solution": "اعتبارسنجی و پالایش HTML ورودی، استفاده از کتابخانه‌های امن برای رندرینگ، محدود کردن تگ‌های مجاز"
  },
  {
    "label": "Testing for Client-side URL Redirect",
    "id": "4.11.4",
    "description": "آزمون تغییر مسیر URL در سمت کاربر برای شناسایی آسیب‌پذیری‌های بازنویسی مسیر.",
    "impact": "ارسال کاربران به سایت‌های مخرب و فیشینگ.",
    "exploit": "Manipulate URL parameters to redirect users to unauthorized destinations.",
    "exploit_fa": "دستکاری پارامترهای URL برای تغییر مسیر کاربران به مقاصد غیرمجاز",
    "solution": "اعتبارسنجی تمام URLهای تغییر مسیر، استفاده از لیست سفید دامنه‌های مجاز، آموزش کاربران"
  },
  {
    "label": "Testing for CSS Injection",
    "id": "4.11.5",
    "description": "آزمون تزریق CSS برای شناسایی امکان تغییر ظاهر یا رفتار صفحه توسط ورودی مخرب.",
    "impact": "تغییر ظاهر صفحه، مخفی کردن عناصر یا افشای اطلاعات.",
    "exploit": "Inject CSS code in user-controllable fields and observe style changes.",
    "exploit_fa": "تزریق کد CSS در فیلدهای قابل کنترل کاربر و مشاهده تغییرات استایل",
    "solution": "اعتبارسنجی و پالایش CSS ورودی، محدود کردن استایل‌های مجاز، استفاده از sandboxing"
  },
  {
    "label": "Testing for Client-side Resource Manipulation",
    "id": "4.11.6",
    "description": "آزمون دستکاری منابع سمت کاربر مانند فایل‌ها و داده‌ها.",
    "impact": "تغییر داده‌ها، عملکرد یا منابع بارگذاری شده توسط برنامه.",
    "exploit": "Manipulate client-side resources (JS, JSON, etc.) and check behavior.",
    "exploit_fa": "دستکاری منابع سمت کلاینت (JS، JSON و غیره) و بررسی رفتار",
    "solution": "اعتبارسنجی منابع بارگیری شده، استفاده از hash برای تأیید اعتبار فایل‌ها، محدود کردن دسترسی به منابع"
  },
  {
    "label": "Testing Cross Origin Resource Sharing",
    "id": "4.11.7",
    "description": "آزمون CORS برای شناسایی آسیب‌پذیری در اشتراک منابع بین مبدأها.",
    "impact": "دسترسی غیرمجاز به منابع حساس از دامنه‌های دیگر.",
    "exploit": "Send cross-origin requests to check for misconfigured CORS headers.",
    "exploit_fa": "ارسال درخواست‌های cross-origin برای بررسی هدرهای CORS نادرست",
    "solution": "پیکربندی دقیق هدرهای CORS، استفاده از لیست سفید دامنه‌های مجاز، محدود کردن روش‌های HTTP مجاز"
  },
  {
    "label": "Testing for Cross Site Flashing",
    "id": "4.11.8",
    "description": "آزمون بهره‌کشی از برنامه‌های کاربردی مبتنی بر Flash (CSF).",
    "impact": "اجرای کد مخرب یا افشای داده‌ها از طریق Flash.",
    "exploit": "Inject or manipulate Flash objects to test for CSF vulnerabilities.",
    "exploit_fa": "تزریق یا دستکاری اشیاء Flash برای تست آسیب‌پذیری‌های CSF",
    "solution": "غیرفعال کردن Flash در صورت عدم نیاز، به‌روزرسانی منظم Flash، محدود کردن دسترسی اشیاء Flash"
  },
  {
    "label": "Testing for Clickjacking",
    "id": "4.11.9",
    "description": "آزمون Clickjacking برای بررسی امکان فریب کاربر به کلیک روی عناصر غیرمجاز.",
    "impact": "کاربر ممکن است عملیات ناخواسته انجام دهد یا داده‌های حساس افشا شود.",
    "exploit": "Overlay UI elements to trick user into performing unintended actions.",
    "exploit_fa": "روکش کردن عناصر UI برای فریب کاربر به انجام اقدامات ناخواسته",
    "solution": "پیاده‌سازی هدر X-Frame-Options، استفاده از frame-busting scripts، آموزش کاربران"
  },
  {
    "label": "Testing WebSockets",
    "id": "4.11.10",
    "description": "آزمون WebSockets برای شناسایی آسیب‌پذیری‌های ارتباطی در سمت کاربر.",
    "impact": "دسترسی غیرمجاز یا افشای اطلاعات از طریق WebSocket.",
    "exploit": "Intercept or manipulate WebSocket messages to test security.",
    "exploit_fa": "رهگیری یا دستکاری پیام‌های WebSocket برای تست امنیت",
    "solution": "استفاده از رمزگذاری (wss://)، اعتبارسنجی مبدأ پیام‌ها، محدود کردن دسترسی به WebSocket"
  },
  {
    "label": "Testing Web Messaging",
    "id": "4.11.11",
    "description": "آزمون پیام‌رسانی تحت وب برای بررسی امنیت داده‌ها در انتقال پیام.",
    "impact": "افشای اطلاعات یا اجرای کد ناخواسته از طریق پیام‌های وب.",
    "exploit": "Send or intercept messages using postMessage API to test behavior.",
    "exploit_fa": "ارسال یا رهگیری پیام‌ها با استفاده از API postMessage برای تست رفتار",
    "solution": "اعتبارسنجی مبدأ پیام‌ها، محدود کردن دامنه‌های مجاز، استفاده از لیست سفید برای پیام‌ها"
  },
  {
    "label": "Testing Browser Storage",
    "id": "4.11.12",
    "description": "آزمون Storage مرورگر برای شناسایی ذخیره‌سازی ناامن اطلاعات حساس.",
    "impact": "دسترسی یا افشای داده‌ها از طریق LocalStorage یا SessionStorage.",
    "exploit": "Inspect and manipulate browser storage entries to test security.",
    "exploit_fa": "بررسی و دستکاری ورودی‌های ذخیره‌سازی مرورگر برای تست امنیت",
    "solution": "محدود کردن ذخیره‌سازی داده‌های حساس در مرورگر، استفاده از رمزنگاری، پاکسازی دوره‌ای storage"
  },
  {
    "label": "Testing for Cross Site Script Inclusion",
    "id": "4.11.13",
    "description": "آزمون گنجاندن اسکریپت درون سایت برای شناسایی نقاط تزریق اسکریپت خارجی.",
    "impact": "اجرای کد مخرب از منابع خارجی.",
    "exploit": "Inject external scripts and observe execution in client context.",
    "exploit_fa": "تزریق اسکریپت‌های خارجی و مشاهده اجرا در context کلاینت",
    "solution": "استفاده از Subresource Integrity (SRI)، محدود کردن منابع اسکریپت مجاز، بررسی منظم منابع خارجی"
  },
  {
    "label": "Testing for Reverse Tabnabbing",
    "id": "4.11.14",
    "description": "آزمون Tabnabbing معکوس برای شناسایی آسیب‌پذیری بازنویسی صفحه در تب‌ها.",
    "impact": "کاربر ممکن است فریب خورده و اطلاعات حساس وارد کند.",
    "exploit": "Open new tabs with manipulated pages to test for reverse tabnabbing.",
    "exploit_fa": "باز کردن تب‌های جدید با صفحات دستکاری شده برای تست reverse tabnabbing",
    "solution": "استفاده از rel=\"noopener noreferrer\" برای لینک‌های خارجی، محدود کردن دسترسی window.opener، آموزش کاربران"
  },
  {
    "label": "Testing GraphQL",
    "id": "4.12.1",
    "description": "آزمون GraphQL برای بررسی آسیب‌پذیری‌ها و محدودیت‌های امنیتی در APIهای GraphQL.",
    "impact": "دسترسی غیرمجاز به داده‌ها، اجرای کوئری‌های مخرب یا افشای اطلاعات حساس.",
    "exploit": "Send crafted GraphQL queries and mutations to test authorization, input validation, and data exposure.",
    "exploit_fa": "ارسال کوئری‌ها و mutationهای GraphQL ساختگی برای تست مجوزها، اعتبارسنجی ورودی و افشای داده",
    "solution": "پیاده‌سازی محدودیت عمق کوئری، اعتبارسنجی ورودی‌ها، کنترل دسترسی دقیق، نظارت بر کوئری‌های پیچیده"
  }
]