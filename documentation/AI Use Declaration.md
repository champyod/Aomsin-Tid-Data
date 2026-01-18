**AI Use Declaration**

**ส่วนที่ 1: เครื่องมือ AI**

| **ชื่อ AI** | **วัตถุประสงค์การใช้** | **ตัวอย่าง Prompt / Action** | **สิ่งที่ได้เรียนรู้จาก AI** |
| :--- | :--- | :--- | :--- |
| **Google DeepMind Agent** | **ช่วยเขียน Code** | "help create a stats component" | วิธีเขียน React component ที่ดี, การใช้ TypeScript types |
| **Google DeepMind Agent** | **ช่วยแก้ปัญหา** | "there's an error in Tooltip formatter" | วิธี debug TypeScript errors ใน Recharts |
| **Google DeepMind Agent** | **ช่วยออกแบบ UI** | "make web ui more professional look and more dynamic" | การใช้ Framer Motion layoutId สำหรับ smooth transitions |
| **Google DeepMind Agent** | **ช่วยตั้งค่า Project** | "setup Next.js with Tailwind v4" | การ configure Next.js App Router และ Tailwind CSS v4 |
| **GitHub Copilot** | **Autocomplete** | ใช้สำหรับ autocomplete code ขณะพิมพ์ | การเขียน code ได้เร็วขึ้น, เรียนรู้ patterns ที่ดี |

**ส่วนที่ 2: สรุปสิ่งที่ได้จากการใช้ AI**

ในโปรเจคนี้ เราได้ใช้ AI เป็นเครื่องมือช่วยเหลือในการพัฒนา โดย AI ทำหน้าที่เหมือน **คู่คิดและผู้ช่วย** ไม่ใช่ผู้ทำแทนทั้งหมด

**วิธีที่เราใช้ AI:**

1. **ถาม-ตอบเพื่อเรียนรู้**: เมื่อไม่แน่ใจวิธีเขียน code บางส่วน จะถาม AI เพื่อเรียนรู้วิธีการ แล้วนำมาประยุกต์ใช้เอง
2. **ช่วย Debug**: เมื่อเจอ error ที่แก้ไม่ได้ จะให้ AI ช่วยวิเคราะห์และแนะนำวิธีแก้ไข
3. **ช่วยเขียน Boilerplate**: AI ช่วยสร้างโครงสร้างพื้นฐานของ component แล้วเราปรับแต่งเองตามต้องการ
4. **ช่วยหา Best Practices**: ถาม AI เกี่ยวกับวิธีที่ดีที่สุดในการทำสิ่งต่างๆ เช่น การจัดโครงสร้างโฟลเดอร์, การตั้งชื่อ

**ตัวอย่างการใช้งานจริง:**

- เมื่อต้องการสร้าง animation สำหรับ sidebar เราบอก AI ว่า "sidebar selector use 1 div that move around" แล้ว AI แนะนำให้ใช้ `layoutId` ของ Framer Motion
- เมื่อเจอ TypeScript error เราให้ AI ช่วยอธิบายว่า error หมายความว่าอย่างไร และควรแก้อย่างไร

**สิ่งที่ได้เรียนรู้:**

ผ่านการใช้ AI เราได้เรียนรู้เทคนิคใหม่ๆ มากมาย เช่น Framer Motion animations, Recharts configuration, และการ deploy ขึ้น GitHub Pages ซึ่งความรู้เหล่านี้สามารถนำไปใช้ในโปรเจคอื่นๆ ได้ต่อไป
