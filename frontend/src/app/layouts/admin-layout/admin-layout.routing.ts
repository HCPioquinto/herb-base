import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { FeedbackComponent } from '../../feedback/feedback.component';
import { ArchiveComponent } from '../../archive/archive.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { IconsComponent } from '../../icons/icons.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'feedback', component: FeedbackComponent },
    { path: 'archive', component: ArchiveComponent },
    { path: 'requests', component: TableListComponent },
];
