import { Component, signal } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar';
import { HeroComponent } from './components/hero/hero';
import { ServicesComponent } from './components/services/services';
import { DocsComponent } from './components/docs/docs';
import { DiagnosticsComponent } from './components/diagnostics/diagnostics';
import { RoiCalculatorComponent } from './components/roi-calculator/roi-calculator';
import { DashboardComponent } from './components/dashboard/dashboard';
import { ContactComponent } from './components/contact/contact';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    ServicesComponent,
    DocsComponent,
    DiagnosticsComponent,
    RoiCalculatorComponent,
    DashboardComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('payfree');
}
