const WebOwasp = [
    {
      "id": "4.1",
      "label": "Information Gathering",
      "labelfa":"جمع آوری اطلاعات",
      "children": [
        {
          "id": "4.1.1",
          "label": "Conduct Search Engine Discovery Reconnaissance for Information Leakage",
          "wstg":"INFO-01",
          "labelfa": "آزمون استفاده از موتور جستوجو / به منظور نشت اطلاعات",
          "children": []
        },
        {
          "id": "4.1.2",
          "label": "Fingerprint Web Server",
          "labelfa":"آزمون انگشت‌ نگاری سرویس دهنده وب",
          "wstg":"INFO-02",
          "children": []
        },
        {
          "id": "4.1.3",
          "label": "Review Webserver Metafiles for Information Leakage",
          "wstg":"INFO-03",
          "labelfa":"آزمون بازبینی Metafile های سرویس دهنده وب برای نشت اطلاعات",
          "children": []
        },
        {
          "id": "4.1.4",
          "label": "Enumerate Applications on Webserver",
          "wstg":"INFO-04",
          "labelfa":"آزمون برشماری برنامه‌های کاربردی بر روی سرویس دهنده وب",
          "children": []
        },
        {
          "id": "4.1.5",
          "label": "Review Web Page Content for Information Leakage",
          "wstg":"INFO-05",
          "labelfa":"آزمون بازبینی توضیحات و فراداده‌های صفحات وب برای نشت اطلاعات",
          "children": []
        },
        {
          "id": "4.1.6",
          "label": "Identify Application Entry Points",
          "wstg":"INFO-06",
          "labelfa":"آزمون شناسایی نقاط ورودی برنامه‌کاربردی",
          "children": []
        },
        {
          "id": "4.1.7",
          "label": "Map Execution Paths Through Application",
          "wstg":"INFO-07",
          "labelfa":"آزمون نقشه‌کشی مسیرهای اجرایی در برنامه کاربردی",
          "children": []
        },
        {
          "id": "4.1.8",
          "label": "Fingerprint Web Application Framework",
          "wstg":"INFO-08",
          "labelfa":"آزمون انگشت‌نگاری چارچوب برنامه‌ی کاربردی",
          "children": []
        },
        {
          "id": "4.1.9",
          "label": "Fingerprint Web Application",
          "wstg":"INFO-09",
          "labelfa":"آزمون انگشت‌نگاری برنامه‌ی کاربردی وب",
          "children": []
        },
        {
          "id": "4.1.10",
          "label": "Map Application Architecture",
          "wstg":"INFO-10",
          "labelfa":"آزمون نقشه‌کشی معماری برنامه‌ی کاربردی",
          "children": []
        }
      ]
    },
    {
      "id": "4.2",
      "label": "Configuration and Deployment Management Testing",
      "children": [
        {
          "id": "4.2.1",
          "label": "Test Network Infrastructure Configuration",
          "wstg":"CONF-01",
           "labelfa":"آزمون پیکربندی شبکه/‌زیرساخت", 
          "children": []
        },
        {
          "id": "4.2.2",
          "label": "Test Application Platform Configuration",
          "wstg":"CONF-02",
          "labelfa":"آزمون پیکربندی بستر برنامه کاربردی",
          "children": []
        },
        {
          "id": "4.2.3",
          "label": "Test File Extensions Handling for Sensitive Information",
          "wstg":"CONF-03",
          "labelfa":"آزمون مدیریت پسوند فایل ها برای داده‌های حساس",
          "children": []
        },
        {
          "id": "4.2.4",
          "label": "Review Old Backup and Unreferenced Files for Sensitive Information",
          "wstg":"CONF-04",
          "labelfa":"آزمون بررسی فایل های پشتیبان قدیمی و بی‌مرجع برای داده ‌های حساس",
          "children": []
        },
        {
          "id": "4.2.5",
          "label": "Enumerate Infrastructure and Application Admin Interfaces",
          "wstg":"CONF-05",
          "labelfa":"آزمون برشماری واسط‌های مدیریتی زیرساخت و برنامه",
          "children": []
        },
        {
          "id": "4.2.6",
          "label": "Test HTTP Methods","wstg":"CONF-06",
          "labelfa":"آزمون روش های HTTP",
          "children": []
        },
        {
          "id": "4.2.7",
          "label": "Test HTTP Strict Transport Security","wstg":"CONF-07",
          "labelfa":"آزمون HSTS",
          "children": []
        },
        {
          "id": "4.2.8",
          "label": "Test RIA Cross Domain Policy","wstg":"CONF-08",
          "labelfa":"آزمون سیاست‌های بین دامنه‌ای RIA ",
          "children": []
        },
        {
          "id": "4.2.9",
          "label": "Test File Permission",
          "wstg":"CONF-09",
          "labelfa":"آزمون مجوز فایل ",
          "children": []
        },
        {
          "id": "4.2.10",
          "label": "Test for Subdomain Takeover",
          "wstg":"CONF-10",
          "labelfa":"آزمون تصاحب زیردامنه",
          "children": []
        },
        {
          "id": "4.2.11",
          "label": "Test Cloud Storage",
          "wstg":"CONF-11",
          "labelfa":"آزمون فضای ذخیره‌سازی ابری",
          "children": []
        },
        {
          "id": "4.2.12",
          "label": "Test for Content Security Policy",
          "wstg":"CONF-12",
          "labelfa":"آزمون CSP",
          "children": []
        },
        {
          "id": "4.2.13",
          "label": "Test for Path Confusion",
          "wstg":"CONF-13",
          "labelfa":"آزمون Path Confusion",
          "children": []
        }
      ]
    },
    {
      "id": "4.3",
      "label": "Identity Management Testing",
      "children": [
        {
          "id": "4.3.1",
          "label": "Test Role Definitions",
          "wstg":"IDNT-01",
          "labelfa":"آزمون تعریف نقش‌های سامانه",
          "children": []
        },
        {
          "id": "4.3.2",
          "label": "Test User Registration Process",
          "wstg":"IDNT-02",
          "labelfa":"آزمون فرآیند ثبت‌نام کاربر",
          "children": []
        },
        {
          "id": "4.3.3",
          "label": "Test Account Provisioning Process",
          "wstg":"IDNT-03",
          "labelfa":"آزمون فرآیند تأمین حساب کاربری",
          "children": []
        },
        {
          "id": "4.3.4",
          "label": "Testing for Account Enumeration and Guessable User Account",
          "wstg":"IDNT-04",
          "labelfa":"آزمون برشماری حساب‌های کاربری و نام‌های کاربری قابل حدس",
          "children": []
        },
        {
          "id": "4.3.5",
          "label": "Testing for Weak or Unenforced Userlabel Policy",
          "wstg":"IDNT-05",
          "labelfa":"آزمون سیاست انتخاب نام کاربری ضعیف یا غیرقابل اجرا",
          "children": []
        }
      ]
    },
    {
      "id": "4.4",
      "label": "Authentication Testing",
      "children": [
        {
          "id": "4.4.1",
          "label": "Testing for Credentials Transported over an Encrypted Channel",
          "wstg":"ATHN-01",
          "labelfa":"آزمون انتقال اطلاعات حساب کاربری از طریق کانال رمزگذاری شده",
          "children": []
        },
        {
          "id": "4.4.2",
          "label": "Testing for Default Credentials",
          "wstg":"ATHN-02",
          "labelfa":"آزمون بررسی اعتبارنامه‌های پیش فرض",
          "children": []
        },
        {
          "id": "4.4.3",
          "label": "Testing for Weak Lock Out Mechanism",
          "wstg":"ATHN-03",
          "labelfa":"آزمون سازوکار ضعیف مسدودسازی",
          "children": []
        },
        {
          "id": "4.4.4",
          "label": "Testing for Bypassing Authentication Schema",
          "wstg":"ATHN-04",
          "labelfa":"آزمون دور زدن شمای احرازهویت",
          "children": []
        },
        {
          "id": "4.4.5",
          "label": "Testing for Vulnerable Remember Password",
          "wstg":"ATHN-05",
          "labelfa":"آزمون سازوکار گذرواژه حفظ شده",
          "children": []
        },
        {
          "id": "4.4.6",
          "label": "Testing for Browser Cache Weaknesses",
          "wstg":"ATHN-06",
          "labelfa":"آزمون نقاط ضعف حافظه پنهان مرورگر",
          "children": []
        },
        {
          "id": "4.4.7",
          "label": "Testing for Weak Password Policy",
          "wstg":"ATHN-07",
          "labelfa":"آزمون سیاست گذرواژه ضعیف",
          "children": []
        },
        {
          "id": "4.4.8",
          "label": "Testing for Weak Security Question Answer",
          "wstg":"ATHN-08",
          "labelfa":"آزمون پرسش/پاسخ امنیتی ضعیف",
          "children": []
        },
        {
          "id": "4.4.9",
          "label": "Testing for Weak Password Change or Reset Functionalities",
          "wstg":"ATHN-09",
          "labelfa":"آزمون عملکردهای ضعیف بازنشانی یا تغییر گذرواژه",
          "children": []
        },
        {
          "id": "4.4.10",
          "label": "Testing for Weaker Authentication in Alternative Channel",
          "wstg":"ATHN-10",
          "labelfa":"آزمون احراز هویت ضعیف در کانال‌های جایگزین",
          "children": []
        },
        {
          "id": "4.4.11",
          "label": "Testing Multi-Factor Authentication",
          "wstg":"ATHN-11",
          "labelfa":"آزمون احراز هویت چندعاملی(MAF)",
          "children": []
        }
      ]
    },
    {
      "id": "4.5",
      "label": "Authorization Testing",
      "children": [
        {
          "id": "4.5.1",
          "label": "Testing Directory Traversal File Include",
          "wstg":"ATHZ-01",
          "labelfa":"آزمون پیمایش مسیر پوشه‌ها و فایل‌های آن",
          "children": []
        },
        {
          "id": "4.5.2",
          "label": "Testing for Bypassing Authorization Schema",
          "wstg":"ATHZ-02",
          "labelfa":"آزمون دور زدن شمای مجوز",
          "children": []
        },
        {
          "id": "4.5.3",
          "label": "Testing for Privilege Escalation",
          "wstg":"ATHZ-03",
          "labelfa":"آزمون ارتقاء سطح دسترسی",
          "children": []
        },
        {
          "id": "4.5.4",
          "label": "Testing for Insecure Direct Object References",
          "wstg":"ATHZ-04",
          "labelfa":"آزمون مراجع مستقیم ناامن به شیء",
          "children": []
        },
        {
          "id": "4.5.5",
          "label": "Testing for OAuth Weaknesses",
          "children": [
            {
              "id": "4.5.5.1",
              "label": "Testing for OAuth Authorization Server Weaknesses",
              "wstg":"ATHZ-05-01",
              "labelfa":"آزمون ضعف‌های سرور احراز هویت OAuth",
            },
            {
              "id": "4.5.5.2",
              "label": "Testing for OAuth Client Weaknesses",
              "wstg":"ATHZ-05-02",
              "labelfa":"آزمون برای ضعف‌های کلاینت OAuth",
            }
          ]
        }
      ]
    },
    {
      "id": "4.6",
      "label": "Session Management Testing",
      "children": [
        {
          "id": "4.6.1",
          "label": "Testing for Session Management Schema",
          "wstg":"SESS-01",
          "labelfa":"آزمون شمای مدیریت نشست",
          "children": []
        },
        {
          "id": "4.6.2",
          "label": "Testing for Cookies Attributes",
          "wstg":"SESS-02",
          "labelfa":"آزمون ویژگی کوکی‌ها",
          "children": []
        },
        {
          "id": "4.6.3",
          "label": "Testing for Session Fixation",
          "wstg":"SESS-03",
          "labelfa":"آزمون Session Fixation",
          "children": []
        },
        {
          "id": "4.6.4",
          "label": "Testing for Exposed Session Variables",
          "wstg":"SESS-04",
          "labelfa":"آزمون متغیرهای افشا شده نشست",
          "children": []
        },
        {
          "id": "4.6.5",
          "label": "Testing for Cross Site Request Forgery",
          "wstg":"SESS-05",
          "labelfa":"آزمون حمله‌ی جعل درخواست(CSRF)",
          "children": []
        },
        {
          "id": "4.6.6",
          "label": "Testing for Logout Functionality",
          "wstg":"SESS-06",
          "labelfa":"آزمون عملکرد خروج",
          "children": []
        },
        {
          "id": "4.6.7",
          "label": "Testing Session Timeout",
          "wstg":"SESS-07",
          "labelfa":"آزمون ناتمام مهلت نشست",
          "children": []
        },
        {
          "id": "4.6.8",
          "label": "Testing for Session Puzzling",
          "wstg":"SESS-08",
          "labelfa":"آزمون Session Puzzling",
          "children": []
        },
        {
          "id": "4.6.9",
          "label": "Testing for Session Hijacking",
          "wstg":"SESS-09",
          "labelfa":"آزمون Session Hijacking",
          "children": []
        },
        {
          "id": "4.6.10",
          "label": "Testing JSON Web Tokens",
          "wstg":"SESS-10",
          "labelfa":"آزمون وب توکن‌های JSON",
          "children": []
        },
        {
          "id": "4.6.11",
          "label": "Testing for Concurrent Sessions",
          "wstg":"SESS-11",
          "labelfa":"آزمون جلسات همزمان",
          "children": []
        }
      ]
    },
    {
      "id": "4.7",
      "label": "Input Validation Testing",
      "children": [
        {
          "id": "4.7.1",
          "label": "Testing for Reflected Cross Site Scripting",
          "wstg":"INPV-01",
          "labelfa":"آزمون XSS بازتابی",
          "children": []
        },
        {
          "id": "4.7.2",
          "label": "Testing for Stored Cross Site Scripting","wstg":"INPV-02",
          "labelfa":"آزمون XSS ذخیره‌شده(پایا)",
          "children": []
        },
        {
          "id": "4.7.3",
          "label": "Testing for HTTP Verb Tampering",
          "wstg":"INPV-03",
          "labelfa":"آزمون دست‌کاری عملکرد HTTP",
          "children": []
        },
        {
          "id": "4.7.4",
          "label": "Testing for HTTP Parameter Pollution",
          "wstg":"INPV-04",
          "labelfa":"آزمون آلودگی پارامترهای HTTP",
          "children": []
        },
        {
          "id": "4.7.5",
          "label": "Testing for SQL Injection",
          "children": [
            {
              "id": "4.7.5.1",
              "label": "Testing for Oracle",
              "wstg":"INPV-05-01",
              "labelfa":"آزمون تزریق اراکل",
            },
            {
              "id": "4.7.5.2",
              "label": "Testing for MySQL",
              "wstg":"INPV-05-02",
              "labelfa":"آزمون تزریق MySQL",
            },
            {
              "id": "4.7.5.3",
              "label": "Testing for SQL Server",
              "wstg":"INPV-05-03",
              "labelfa":"آزمون تزریق SQL Server",
            },
            {
              "id": "4.7.5.4",
              "label": "Testing PostgreSQL","wstg":"INPV-05-04",
              "labelfa":"آزمون تزریق PostgreSQL",
            },
            {
              "id": "4.7.5.5",
              "label": "Testing for MS Access","wstg":"INPV-05-05",
              "labelfa":"آزمون تزریق MS Access",
            },
            {
              "id": "4.7.5.6",
              "label": "Testing for NoSQL Injection","wstg":"INPV-05-06",
              "labelfa":"آزمون تزریق NoSQL",
            },
            {
              "id": "4.7.5.7",
              "label": "Testing for ORM Injection","wstg":"INPV-05-07",
              "labelfa":"آزمون تزریق ORM",
            },
            {
              "id": "4.7.5.8",
              "label": "Testing for Client-side",
              "wstg":"INPV-05-08",
              "labelfa":"آزمون Client-side",
            }
          ]
        },
        {
          "id": "4.7.6",
          "label": "Testing for LDAP Injection",
          "wstg":"INPV-06",
          "labelfa":"آزمون تزریق LDAP",
          "children": []
        },
        {
          "id": "4.7.7",
          "label": "Testing for XML Injection",
          "wstg":"INPV-07",
          "labelfa":"آزمون تزریق XML",
          "children": []
        },
        {
          "id": "4.7.8",
          "label": "Testing for SSI Injection","wstg":"INPV-08",
          "labelfa":"آزمون تزریق SSI",
          "children": []
        },
        {
          "id": "4.7.9",
          "label": "Testing for XPath Injection","wstg":"INPV-09",
          "labelfa":"آزمون تزریق XPath",
          "children": []
        },
        {
          "id": "4.7.10",
          "label": "Testing for IMAP SMTP Injection","wstg":"INPV-10",
          "labelfa":"آزمون تزریق IMAP/SMTP",
          "children": []
        },
        {
          "id": "4.7.11",
          "label": "Testing for Code Injection",
          "children": [
            {
              "id": "4.7.11.1",
              "label": "Testing for Code Injection",
              "wstg":"INPV-11-01",
              "labelfa":"آزمون تزریق کد",
            },
            {
              "id": "4.7.11.2",
              "label": "Testing for File Inclusion",
              "wstg":"INPV-11-02",
              "labelfa":"آزمون تزریق File Inclusion",
            }
          ]
        },
        {
          "id": "4.7.12",
          "label": "Testing for Command Injection","wstg":"INPV-12",
          "labelfa":"آزمون تزریق Command",
          "children": []
        },
        {
          "id": "4.7.13",
          "label": "Testing for Format String Injection",
          "wstg":"INPV-13",
          "labelfa":"آزمون تزریق Format String",
          "children": []
        },
        {
          "id": "4.7.14",
          "label": "Testing for Incubated Vulnerability","wstg":"INPV-14",
          "labelfa":"آزمون آسیب‌پذیری نهفته",
          "children": []
        },
        {
          "id": "4.7.15",
          "label": "Testing for HTTP Splitting Smuggling","wstg":"INPV-15",
          "labelfa":"آزمون قاچاق HTTP Splitting",
          "children": []
        },
        {
          "id": "4.7.16",
          "label": "Testing for HTTP Incoming Requests","wstg":"INPV-16",
          "labelfa":"آزمون درخواست‌های ورودیHTTP",
          "children": []
        },
        {
          "id": "4.7.17",
          "label": "Testing for Host Header Injection","wstg":"INPV-17",
          "labelfa":"آزمون تزریقHost Header",
          "children": []
        },
        {
          "id": "4.7.18",
          "label": "Testing for Server-side Template Injection","wstg":"INPV-18",
          "labelfa":"آزمون تزریق قالب سمت سرور",
          "children": []
        },
        {
          "id": "4.7.19",
          "label": "Testing for Server-Side Request Forgery","wstg":"INPV-19",
          "labelfa":"آزمون جعل درخواست سمت سرور",
          "children": []
        },
        {
          "id": "4.7.20",
          "label": "Testing for Mass Assignment","wstg":"INPV-20",
          "labelfa":"آزمون Mass Assignment",
          "children": []
        }
      ]
    },
    {
      "id": "4.8",
      "label": "Testing for Error Handling",
      "children": [
        {
          "id": "4.8.1",
          "label": "Testing for Improper Error Handling","wstg":"ERRH-01",
          "labelfa":"آزمون مدیریت نادرست خطا",
          "children": []
        },
        {
          "id": "4.8.2",
          "label": "Testing for Stack Traces","wstg":"ERRH-02",
          "labelfa":"آزمون Stack Traces",
          "children": []
        }
      ]
    },
    {
      "id": "4.9",
      "label": "Testing for Weak Cryptography",
      "children": [
        {
          "id": "4.9.1",
          "label": "Testing for Weak Transport Layer Security","wstg":"CRYP-01",
          "labelfa":"آزمون رمزنگاری SSL/TLS ضعیف",
          "children": []
        },
        {
          "id": "4.9.2",
          "label": "Testing for Padding Oracle","wstg":"CRYP-02",
          "labelfa":"آزمون Padding Oracle",
          "children": []
        },
        {
          "id": "4.9.3",
          "label": "Testing for Sensitive Information Sent via Unencrypted Channels",
          "wstg":"CRYP-03",
          "labelfa":"آزمون ارسال اطلاعات مهم از طریق کانال رمزگذاری نشده",
          "children": []
        },
        {
          "id": "4.9.4",
          "label": "Testing for Weak Encryption",
          "wstg":"CRYP-04",
          "labelfa":"آزمون رمزنگاری ضعیف",
          "children": []
        }
      ]
    },
    {
      "id": "4.10",
      "label": "Business Logic Testing",
      "children": [
        {
          "id": "4.10.1",
          "label": "Test Business Logic Data Validation",
          "wstg":"BUSL-01",
          "labelfa":"آزمون اعتبارسنجی داده منطق کسب و کار",
          "children": []
        },
        {
          "id": "4.10.2",
          "label": "Test Ability to Forge Requests",
          "wstg":"BUSL-02",
          "labelfa":"آزمون بررسی امکان جعل درخواست",
          "children": []
        },
        {
          "id": "4.10.3",
          "label": "Test Integrity Checks",
          "wstg":"BUSL-03",
          "labelfa":"آزمون یکپارچگی داده‌ها",
          "children": []
        },
        {
          "id": "4.10.4",
          "label": "Test for Process Timing",
          "wstg":"BUSL-04",
          "labelfa":"آزمون بررسی زمان پردازش",
          "children": []
        },
        {
          "id": "4.10.5",
          "label": "Test Number of Times a Function Can Be Used Limits",
          "wstg":"BUSL-05",
          "labelfa":"آزمون محدودیت تعداد دفعات استفاده از یک تابع",
          "children": []
        },
        {
          "id": "4.10.6",
          "label": "Testing for the Circumvention of Work Flows",
          "wstg":"BUSL-06",
          "labelfa":"آزمون دور زدن جریان کاری",
          "children": []
        },
        {
          "id": "4.10.7",
          "label": "Test Defenses Against Application Misuse",
          "wstg":"BUSL-07",
          "labelfa":"آزمون دفاع در برابر عدم استفاده مناسب برنامه کاربردی",
          "children": []
        },
        {
          "id": "4.10.8",
          "label": "Test Upload of Unexpected File Types",
          "wstg":"BUSL-08",
          "labelfa":"آزمون بارگذاری انواع فایل‌های غیرمجاز",
          "children": []
        },
        {
          "id": "4.10.9",
          "label": "Test Upload of Malicious Files",
          "wstg":"BUSL-09",
          "labelfa":"آزمون بارگذاری فایل‌های مخرب",
          "children": []
        },
        {
          "id": "4.10.10",
          "label": "Test Payment Functionality",
          "wstg":"BUSL-10",
          "labelfa":"آزمون عملکرد پرداخت",
          "children": []
        }
      ]
    },
    {
      "id": "4.11",
      "label": "Client-side Testing",
      "children": [
        {
          "id": "4.11.1",
          "label": "Testing for DOM-Based Cross Site Scripting",
          "wstg":"CLNT-11-01",
          "labelfa":"آزمون XSS مبتنی بر مدل DOM",
        "children":[]
        },
        {
          "id": "4.11.2",
          "label": "Testing for JavaScript Execution",
          "wstg":"CLNT-02",
          "labelfa":"آزمون اجرای اسکریپت جاوا",
          "children": []
        },
        {
          "id": "4.11.3",
          "label": "Testing for HTML Injection",
          "wstg":"CLNT-03",
          "labelfa":"آزمون تزریق HTML",
          "children": []
        },
        {
          "id": "4.11.4",
          "label": "Testing for Client-side URL Redirect",
          "wstg":"CLNT-04",
          "labelfa":"آزمون تغییر مسیر URL سمت کاربر",
          "children": []
        },
        {
          "id": "4.11.5",
          "label": "Testing for CSS Injection",
          "wstg":"CLNT-05",
          "labelfa":"آزمون تزریق CSS",
          "children": []
        },
        {
          "id": "4.11.6",
          "label": "Testing for Client-side Resource Manipulation",
          "wstg":"CLNT-06",
          "labelfa":"آزمون دستکاری منابع سمت کاربر",
          "children": []
        },
        {
          "id": "4.11.7",
          "label": "Testing Cross Origin Resource Sharing",
          "wstg":"CLNT-07",
          "labelfa":"آزمون CORS",
          "children": []
        },
        {
          "id": "4.11.8",
          "label": "Testing for Cross Site Flashing",
          "wstg":"CLNT-08",
          "labelfa":"آزمون بهره‌کشی از برنامه‌های کاربردی(CSF)",
          "children": []
        },
        {
          "id": "4.11.9",
          "label": "Testing for Clickjacking",
          "wstg":"CLNT-09",
          "labelfa":"آزمون Click Jacking",
          "children": []
        },
        {
          "id": "4.11.10",
          "label": "Testing WebSockets",
          "wstg":"CLNT-10",
          "labelfa":"آزمون WebSockets",
          "children": []
        },
        {
          "id": "4.11.11",
          "label": "Testing Web Messaging",
          "wstg":"CLNT-11",
          "labelfa":"آزمون پیام رسانی تحت وب",
          "children": []
        },
        {
          "id": "4.11.12",
          "label": "Testing Browser Storage",
          "wstg":"CLNT-12",
          "labelfa":"آزمون Storage مرورگر",
          "children": []
        },
        {
          "id": "4.11.13",
          "label": "Testing for Cross Site Script Inclusion",
          "wstg":"CLNT-13",
          "labelfa":"آزمون گنجاندن اسکریپت درون سایت",
          "children": []
        },
        {
          "id": "4.11.14",
          "label": "Testing for Reverse Tabnabbing",
          "wstg":"CLNT-14",
          "labelfa":"آزمون Tabnabbing معکوس",
          "children": []
        }
      ]
    },
    {
      "id": "4.12",
      "label": "API Testing",
      "children": [
        {
          "id": "4.12.1",
          "label": "Testing GraphQL",
          "wstg":"APIT-01",
          "labelfa":"آزمون GraphQL",
          "children": []
        }
      ]
    }
  ]
 
  module.exports = WebOwasp