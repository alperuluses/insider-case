import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Horse Race Game/);
});


test('start text ready', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText(/press start to begin/i)).toBeVisible();
})


test("is horse list visible", async ({ page }) => {
  await page.goto('/');
  const list = page.locator('.list');

  // En az 1 öğe var mı?
  await expect(list.locator('.list-item')).not.toHaveCount(0);
})

test('ilk tab aktif', async ({ page }) => {
  await page.goto('/');

  const tabs = page.getByRole('tab');
  // ilk tab'ın class'ında tab--active var mı?
  await expect(tabs.first()).toHaveClass(/(^|\s)tab--active(\s|$)/);

  // opsiyonel: ikinci tab aktif OLMAMALI
  await expect(tabs.nth(1)).not.toHaveClass(/(^|\s)tab--active(\s|$)/);
});

test('START -> round biter, 5sn sonra Results badge > 0', async ({ page }) => {
  await page.goto('/');

    await page.waitForTimeout(5000);

  // 2) Program tablosu doldu mu? (program-tables altında bir şeyler gelsin)
  const programWrap = page.locator('.program-tables');
  await expect
    .poll(async () => await programWrap.locator(':scope > *').count(), { timeout: 20_000 })
    .toBeGreaterThan(0);

  // 3) Yarışı başlat
  const toggle = page.getByRole('button', { name: /^start$/i });
  await toggle.click();

  // (İsteğe bağlı) Raund bitti sinyali: overlay mesajı
  const overlay = page.locator('.race-track-overlay');
  await expect(overlay).toContainText(/next round starting in 3/i, { timeout: 120_000 });

  // 4) +5 sn bekle
  await page.waitForTimeout(5000);

  // 5) Results sekmesindeki badge > 0
  const resultsTabBadge = page.getByRole('tab').nth(1).locator('.badge');
  await expect
    .poll(async () => {
      const txt = (await resultsTabBadge.textContent())?.trim() ?? '0';
      const n = parseInt(txt, 10);
      return Number.isFinite(n) ? n : 0;
    }, { timeout: 10_000 })
    .toBeGreaterThan(0);
});

