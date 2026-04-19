import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        
        # Listen for console messages
        page.on("console", lambda msg: print(f"Browser Console [{msg.type}]: {msg.text}"))
        page.on("pageerror", lambda exc: print(f"Browser Uncaught Exception: {exc}"))
        
        await page.goto("http://localhost:5173", wait_until="networkidle")
        await page.screenshot(path="screenshot.png")
        
        print("Root innerHTML:", await page.evaluate("() => document.getElementById('root')?.innerHTML.substring(0, 500)"))
        await browser.close()

asyncio.run(main())
