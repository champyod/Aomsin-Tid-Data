**AI Use Declaration**

**ส่วนที่ 1: เครื่องมือ AI**

| **ชื่อ AI** | **วัตถุประสงค์การใช้** | **ตัวอย่าง Prompt / Action** | **สิ่งที่ได้เรียนรู้จาก AI** |
| :--- | :--- | :--- | :--- |
| **Google DeepMind Agent** | **Coding & Refactoring** | "Move dashboard to root... using Next.js... Tailwind v4" | การตั้งค่า Project Structure ที่ดีสำหรับ Next.js, การใช้ Tailwind v4 (@theme), การเขียน GitHub Actions CI/CD ด้วย Bun |
| **Google DeepMind Agent** | **Documentation** | "Convert AI Use Declaration.odt... do ai report" | การใช้ Pandoc แปลงเอกสาร, การเขียนรายงานการใช้งาน AI แบบอัตโนมัติ |
| **Google DeepMind Agent** | **Data Integration** | "Verify dashboard with project-specific data structures" | การวิเคราะห์ CSV (Cars_cleaned.csv) เพื่อสร้าง JSON Schema ที่เหมาะสมสำหรับการแสดงผล Dashboard |
| **Google DeepMind Agent** | **UI/UX Enhancement** | "make web ui more professional look and more dynamic" | การใช้ Framer Motion สร้าง scroll-triggered animations, การออกแบบ GlassCard components |
| **Google DeepMind Agent** | **Component Design** | "sidebar selector use 1 div that move around" | การใช้ layoutId ใน Framer Motion สำหรับ shared layout animations |

**ส่วนที่ 2: สรุปสิ่งที่ได้จากการใช้ AI**

เราได้ใช้ AI (Google DeepMind Agent) ในการ Refactor และพัฒนา Dashboard ใหม่ทั้งหมด โดยเริ่มจากการเปลี่ยนจาก Python Streamlit เดิม มาเป็น **Next.js (App Router)** ร่วมกับ **Tailwind CSS v4** เพื่อความทันสมัยและประสิทธิภาพที่ดีขึ้น

AI ช่วยในการ:
1.  **Project Initialization**: สร้าง Next.js project, ตั้งค่า Tailwind v4, และติดตั้ง dependencies ที่จำเป็น (Bun, Recharts, Framer Motion).
2.  **Code Migration**: แปลง Components เดิม (StatCard, DataTable) มาเป็น React Components ที่รองรับ TypeScript และการ Responsive.
3.  **Data Integration**: วิเคราะห์ไฟล์ข้อมูลรถยนต์ (`Cars.csv`) และปรับโครงสร้าง Dashboard ให้แสดงผลข้อมูลจริง เช่น ราคาเฉลี่ย, ยี่ห้อรถ, และแนวโน้มราคาตามปี.
4.  **Deployment**: เขียน `workflow` สำหรับ GitHub Actions เพื่อให้ Deploy ขึ้น GitHub Pages ได้อัตโนมัติเมื่อมีการ Push code.
5.  **UI/UX Enhancement (2025-01-18)**: ปรับปรุง UI ให้ดูเป็นมืออาชีพมากขึ้น:
    - เพิ่ม **Floating Topbar** พร้อมลิงก์ GitHub
    - เพิ่ม **Tech Stack Ticker** ใน Credits page แสดง libraries ที่ใช้ (Python: Pandas, NumPy, Scikit-learn, Polars / Web: Next.js 16, React 19, Tailwind CSS 4, Framer Motion)
    - เพิ่ม **ScrollReveal animations** สำหรับ scroll-triggered effects
    - ปรับปรุง **Sidebar** ให้ใช้ single moving indicator ด้วย layoutId
    - เพิ่มข้อมูลใน Analysis page (5 charts), Modeling page (metrics grid, CV scores, predictions scatter), และ Data page (6 tables)

ผลลัพธ์ที่ได้คือ Dashboard ที่มีความสวยงาม (Glassmorphism), ทำงานรวดเร็ว (Static Export), มี animations ที่ลื่นไหล และรองรับการทำงานร่วมกับทีม Data Science ผ่าน JSON Data Contract ได้อย่างสมบูรณ์.
