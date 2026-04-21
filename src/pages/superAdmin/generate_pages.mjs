import fs from 'fs';
import path from 'path';

const pages = [
  'users/UserList',
  'users/CreateUser',
  'users/UserDetail',
  'nominations/NominationList',
  'nominations/NominationBuilder',
  'nominations/NominationDetail',
  'cases/AllCases',
  'cases/DeletedCases',
  'masterData/MasterDataList',
  'workflows/WorkflowSettings',
  'notifications/TemplateList',
  'notifications/TemplateEdit',
  'security/SecuritySettings',
  'settings/SystemSettings',
  'logs/AuditLogs',
  'monitoring/Monitoring',
];

const baseDir = '/Users/amri/Documents/GitHub/sentinel-hub/src/pages/superAdmin';

pages.forEach(p => {
  const filePath = path.join(baseDir, `${p}.tsx`);
  const dirPath = path.dirname(filePath);
  
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const componentName = p.split('/').pop();
  const content = `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ${componentName}() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">${componentName?.replace(/([A-Z])/g, ' $1').trim()}</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This module is under development. Consistent UI will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
`;

  fs.writeFileSync(filePath, content);
  console.log(`Created ${filePath}`);
});
