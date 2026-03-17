import fs from 'fs';

const replacements = [
  { file: 'src/components/investigator/InvestigatorLayout.tsx', search: 'Governance & Oversight', replace: 'Nurul Huda' },
  { file: 'src/components/lea/LEALayout.tsx', search: 'PDRM — Cybercrime Unit', replace: 'Ahmad Faizal' },
  { file: 'src/components/reporter/ReporterLayout.tsx', search: 'PL-2024-001234', replace: 'Siti Nurhaliza' },
  { file: 'src/components/supervisor/SupervisorLayout.tsx', search: 'SV-2024-003', replace: 'Sarah Lim' },
];

replacements.forEach(({ file, search, replace }) => {
  try {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes(search)) {
      content = content.replace(search, replace);
      fs.writeFileSync(file, content);
      console.log(`Updated ${file}`);
    } else {
        console.log(`Not found in ${file}`);
    }
  } catch (err) {
    console.error(`Error updating ${file}:`, err);
  }
});
