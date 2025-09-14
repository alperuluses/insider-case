# Insider Case — Horse Racing 🐎

Basit ama keyifli bir **At Yarışı** simülasyonu. Vue 3 (Composition API) + Vite + TypeScript + Vuex + SCSS ile geliştirildi. E2E testleri Playwright, unit testleri Vitest ile.

## Özellikler
- 🗂️ **Program/Results** tabları (tek ekrandan takip)
- 🐴 **Rastgele at havuzu** (tekil renk atamaları)
- ⏱️ **Tur zamanlayıcı** (duraklat/devam et, reset)
- 🏅 **İlk 3’e madalya** ve hafif parlama efekti
- ✔️ **Unit** (Vitest) ve **E2E** (Playwright) testleri

# bağımlılıklar
npm install

# geliştirme
npm run dev

# prod build
npm run build
npm run preview

# unit test
npm run test     # veya: npx vitest

# e2e test
npx playwright install
npm run test:e2e # veya: npx playwright test

# Proje Özel Yapısı
```
src/
├─ assets/
│  ├─ images/         # logo, ikonlar, madalyalar
│  └─ styles/         # variables & utilities (SCSS)
├─ components/
│  ├─ Header/         # üst bar, START/RESET vb.
│  ├─ Race/           # pist & animasyon
│  ├─ RaceTables/     # ProgramTable, ResultsTable
│  └─ Horse/          # at görselleri/numaralar(1-20 liste)
├─ core/              # model tanımları ve constantlar (Horse, Race...)
├─ stores/            # vuex modülleri (race, schedule, horses)
└─ utils/             # yardımcılar (raceMath, generator)
```      
