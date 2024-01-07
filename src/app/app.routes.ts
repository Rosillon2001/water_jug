import { Routes } from '@angular/router';
// Water Jugs Component
import { WaterJugsComponent } from './components/water-jugs/water-jugs.component';

export const routes: Routes = [
  { path: '', component: WaterJugsComponent },
  { path: '**', redirectTo: '/'}
];
