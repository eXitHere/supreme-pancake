#### ติดตั้ง NodeJS ให้เรียบร้อย โดยสามารถทดสอบได้โดย

```sh
node --version
# ต้องเป็น version 18.0.0 ขึ้นไป
```

#### สร้าง Project ของ NuxtJS3

https://nuxt.com/docs/getting-started/installation

```sh
npx nuxi@latest init project_name # แทนที่ project_name ด้วยชื่อที่ต้องการ
```

```sh
❯ Which package manager would you like to use?
● npm
○ pnpm
○ yarn
○ bun

เลือก npm
```

```sh
❯ Initialize git repository?
● Yes / ○ No

เลือก "Yes" ถ้าต้องการ Upload ขึ้น gitlab
```

หลังจากติดตั้งแล้ว สามารถ `cd project_name` และ `npm run dev` เพื่อพัฒนาได้เลย

#### อธิบาย Nuxtjs3 Directory Structure

-   nuxt.config.ts
    -   ใช้สำหรับเก็บการตั้งค่าต่าง ๆ ของ Project
-   assets/ https://nuxt.com/docs/guide/directory-structure/assets
    -   ใช้หรับเก็บไฟล์ต่าง ๆ เช่น Css, font, image
-   components/ https://nuxt.com/docs/guide/directory-structure/components
    -   ใช้หรับเก็บ component ต่าง ๆ ที่มีการสร้างขึ้นมา
-   layouts/ https://nuxt.com/docs/guide/directory-structure/layouts
    -   ใช้สำหรับเก็บ layout ต่าง ๆ เช่น Layout ที่มี navbar
    -   Layout สามารถมีได้มากกว่า 1 layout
-   middleware/ https://nuxt.com/docs/guide/directory-structure/middleware
    -   ใช้หรับเก็บ middleware สำหรับฝั่ง client
    -   ใช้สำหรับตรวจสอบว่าผู้ใช้งานมีการเข้าสู่ระบบมาแล้วหรือไม่
-   node_modules/ https://nuxt.com/docs/guide/directory-structure/node_modules
    -   ใช้สำหรับเก็บ libs ต่าง ๆ ที่ใช้ภายในโปรเจค โดยระบบจะทำการสร้างขึ้นมาให้โดยอัตโนมัติ จาก `npm install`
-   pages/ https://nuxt.com/docs/guide/directory-structure/pages
    -   ใช้สำหรับเก็บหน้าต่าง ๆ โดยระบบจะทำการ generate ให้โดยอัตโนมัติ ตามชื่อของไฟล์ที่มีการสร้างไว้
-   public/ https://nuxt.com/docs/guide/directory-structure/public
    -   ใช้สำหรับเก็บไฟล์ต่าง ๆ เช่น robots.txt, favicon.ico
-   server/ https://nuxt.com/docs/guide/directory-structure/server
    -   ใช้สำหรับเก็บ api ต่าง ๆ ของฝั่ง backend

#### การใช้งาน Nuxt Module

โดย Nuxtjs3 จะมี module ต่าง ๆ ให้ใช้งาน เช่น google font, tailwindcss, pinia โดยสามารถดูรายละเอียด module ต่าง ๆ ได้ที่ https://nuxt.com/modules

สำหรับวิธีการติดตั้งจะมีให้ภายในหน้าแรกของแต่ละ Module เช่นของ Pinia

```sh
npm i pinia @pinia/nuxt # ทำการติดตั้ง libs ที่จำต้องเป็นต้องใช้งาน
```

ทำการเพิ่ม config ภายใน nuxt.config.js

```sh
export default defineNuxtConfig({
    modules: ['@pinia/nuxt'],
})
```

ทำการรัน application ใหม่อีกครั้ง

```sh
npm run dev
```

modules ต่าง ๆ ที่แนะนำให้มีการนำมาใช้งาน

-   https://nuxt.com/modules/pinia เป็น state management ที่ได้รับการออกแบบมาเพื่อทำให้การจัดการ state ในแอปพลิเคชัน Nuxt.js ง่ายขึ้น
-   https://nuxt.com/modules/tailwindcss เป็นเครื่องมือสำหรับช่วยในการเขียน css ให้ง่ายยิ่งขึ้นและช่วยในการทำ web responsive
    -   https://daisyui.com/docs/install/ โดยสามารถใช้งานรวมกับ tailwindcss ได้ โดย daisyui จะช่วยในการสร้าง component ให้ง่ายยิ่งขึ้น
-   https://nuxt.com/modules/i18n เป็นเครื่องมือสำหรับช่วยทำเว็บไซต์สามารถรองรับการเปลี่ยนภาษาได้
-   https://nuxt.com/modules/security เป็น modules ที่จะช่วยในการ setup security ให้เป็นไปตาม best practice
-   https://nuxt.com/modules/fonts ช่วยในการ import font จาก google font
