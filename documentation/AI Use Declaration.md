# AI Use Declaration

**ชื่อหัวข้อ:** Aomsin Tid Data - Car Market Intelligence Dashboard

**ชื่อสมาชิก:** Champyod

---

## ส่วนที่ 1: เครื่องมือ AI

| ชื่อ AI | วัตถุประสงค์การใช้ | ตัวอย่าง Prompt | สิ่งที่คุณได้เรียนรู้จาก AI |
| :--- | :--- | :--- | :--- |
| Google DeepMind Agent | Coding & Refactoring | "Move dashboard to root... using Next.js... Tailwind v4" | การตั้งค่า Project Structure ที่ดีสำหรับ Next.js, การใช้ Tailwind v4 (@theme), การเขียน GitHub Actions CI/CD ด้วย Bun |
| Google DeepMind Agent | Coding | "show more things in the dashboard both data analysis and modelling and raw data" | การออกแบบ dashboard ให้แสดงข้อมูลหลายมิติ (charts, tables, metrics) |
| Google DeepMind Agent | Coding | "make web ui more professional look and more dynamic - dynamic scroll not only one way something like that" | การใช้ Framer Motion สร้าง scroll-triggered animations |
| Google DeepMind Agent | Coding | "sidebar selector use 1 div that move around not an indicator on each one but move this one to hover that instead" | การใช้ layoutId ใน Framer Motion สำหรับ shared layout animations |
| Google DeepMind Agent | Documentation | "Convert AI Use Declaration.odt... do ai report" | การใช้ Pandoc แปลงเอกสาร, การเขียนรายงานการใช้งาน AI แบบอัตโนมัติ |
| Google DeepMind Agent | Data Integration | "Verify dashboard with project-specific data structures" | การวิเคราะห์ CSV (Cars_cleaned.csv) เพื่อสร้าง JSON Schema ที่เหมาะสมสำหรับการแสดงผล Dashboard |
| Google DeepMind Agent | ไอเดีย | "floating topbar please in the layout preserve the space for it and make it in the middle between rightside and sidebar" | การจัดวาง UI components ให้สมดุลและไม่ทับกัน |
| Claude Opus 4.5 Agent | Data Analysis (EDA) | "Implement analysis notebook based on approved plan" | ช่วยในการใช้ Polars สำหรับ DataFrame operations, การสร้างกราฟ Interactive ด้วย Plotly, การ Merge ข้อมูลหลายตารางด้วย Left Joins |
| GitHub Copilot | Coding | Autocomplete ขณะพิมพ์ | การเขียน code ได้เร็วขึ้น |

---

## ส่วนที่ 2: สรุปสิ่งที่ได้จากการใช้ AI

เราได้ใช้ AI (Google DeepMind Agent, Claude Opus 4.5 Agent, และ GitHub Copilot) ในการ Refactor, พัฒนา Dashboard, และวิเคราะห์ข้อมูล โดยเริ่มจากการเปลี่ยนจาก Python Streamlit เดิม มาเป็น **Next.js (App Router)** ร่วมกับ **Tailwind CSS v4** เพื่อความทันสมัยและประสิทธิภาพที่ดีขึ้น

AI ช่วยในการ:
1. **Project Initialization**: สร้าง Next.js project, ตั้งค่า Tailwind v4, และติดตั้ง dependencies ที่จำเป็น (Bun, Recharts, Framer Motion).
2. **Code Migration**: แปลง Components เดิม (StatCard, DataTable) มาเป็น React Components ที่รองรับ TypeScript และการ Responsive.
3. **UI/UX Enhancement**: ใช้ Framer Motion สร้าง scroll-triggered animations และ shared layout animations สำหรับ sidebar selector ทำให้ Dashboard มีความ dynamic และ professional.
4. **Data Integration**: วิเคราะห์ไฟล์ข้อมูลรถยนต์ (`Cars.csv`) และปรับโครงสร้าง Dashboard ให้แสดงผลข้อมูลจริง เช่น ราคาเฉลี่ย, ยี่ห้อรถ, และแนวโน้มราคาตามปี.
5. **Data Visualization**: ใช้ Recharts สร้างกราฟแนวโน้มราคา, การกระจายตัวของยี่ห้อรถ, และ metrics ต่างๆ ของ Machine Learning model.
6. **Deployment**: เขียน `workflow` สำหรับ GitHub Actions เพื่อให้ Deploy ขึ้น GitHub Pages ได้อัตโนมัติเมื่อมีการ Push code.
7. **Data Analysis (EDA)**: สร้าง Notebook (`3_analysis.ipynb`) สำหรับ Exploratory Data Analysis โดยใช้ Polars แทน Pandas เพื่อประสิทธิภาพที่สูงขึ้น, Merge ข้อมูล 3 ตาราง (Cars, Customers, Sales) ด้วย Left Joins, และสร้างกราฟ Interactive ด้วย Plotly Express สำหรับ Univariate, Bivariate, และ Temporal Analysis.

ผลลัพธ์ที่ได้คือ Dashboard ที่มีความสวยงาม (Glassmorphism), ทำงานรวดเร็ว (Static Export), มี animations ที่ลื่นไหลเมื่อ scroll และเปลี่ยนหน้า, รองรับการทำงานร่วมกับทีม Data Science ผ่าน JSON Data Contract, และมี EDA Notebook ที่ครบถ้วนพร้อม Merged Dataset (`Sales_merged.csv`) สำหรับการวิเคราะห์ขั้นถัดไป.
