@echo off
cd /d "f:\programming\CoreCraft Portfolio\Frontend"
start "ccserver" /min cmd /c "npm run start > _qa_server.log 2>&1"
ping -n 15 127.0.0.1 >nul
npx lighthouse http://localhost:3000/ --output=json --output-path=_lh_home_mobile.json --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless=new" --quiet
npx lighthouse http://localhost:3000/ --preset=desktop --output=json --output-path=_lh_home_desktop.json --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless=new" --quiet
npx lighthouse http://localhost:3000/contact --output=json --output-path=_lh_contact_mobile.json --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless=new" --quiet
npx lighthouse http://localhost:3000/services --output=json --output-path=_lh_services_mobile.json --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless=new" --quiet
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do taskkill /f /pid %%a
echo done> _lh_done.txt
