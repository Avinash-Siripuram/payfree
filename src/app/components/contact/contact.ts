import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact" class="contact-section">
      <div class="glow-bg glow-cyan" style="top: 20%; left: 5%;"></div>
      <div class="section-container">
        
        <div class="contact-card glass-panel">
          <!-- Submission Success State -->
          <div *ngIf="submitted()" class="success-state">
            <div class="success-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>
            </div>
            <h3 class="success-title">Consultation Session Billed</h3>
            <p class="success-desc">
              Thank you, <strong>{{ name }}</strong>. Our systems architects have scheduled your technical integration assessment. We have sent a billing invoice and calendar link for <strong>{{ email }}</strong>.
            </p>
            <div class="success-meta">
              <span>Target Core: <strong>{{ processor }}</strong></span>
              <span>Session Type: <strong>Paid Engineering Audit</strong></span>
            </div>
            <button (click)="resetForm()" class="btn btn-secondary btn-sm" style="margin-top: 20px;">Submit Another Session Request</button>
          </div>

          <!-- Form View -->
          <div *ngIf="!submitted()" class="form-view">
            <div class="contact-header">
              <span class="badge">Paid integration consulting</span>
              <h2 class="cyan-gradient form-title">Book a Paid Audit</h2>
              <p class="form-subtitle">Need custom schemas, cluster replication configurations, or SWIFT mapping engines? Request a billing quote for premium systems setup.</p>
            </div>

            <form (submit)="onSubmit()" class="consultation-form">
              <div class="form-row">
                <div class="form-field">
                  <label for="name">Lead Developer / Executive Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    [(ngModel)]="name" 
                    name="name" 
                    required 
                    placeholder="John Doe" 
                    class="form-input"
                  />
                </div>
                <div class="form-field">
                  <label for="email">Organization Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    [(ngModel)]="email" 
                    name="email" 
                    required 
                    placeholder="john@unionbank.com" 
                    class="form-input"
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-field">
                  <label for="volume">Annual IT Core Software Budget</label>
                  <select 
                    id="volume" 
                    [(ngModel)]="volume" 
                    name="volume" 
                    required 
                    class="form-input select-field"
                  >
                    <option value="" disabled selected>Select IT Budget range</option>
                    <option value="under_100k">Under $100K / year</option>
                    <option value="100k_500k">$100K - $500K / year</option>
                    <option value="500k_2m">$500K - $2M / year</option>
                    <option value="above_2m">Above $2M / year</option>
                  </select>
                </div>
                
                <div class="form-field">
                  <label for="processor">Target Legacy Core</label>
                  <select 
                    id="processor" 
                    [(ngModel)]="processor" 
                    name="processor" 
                    required 
                    class="form-input select-field"
                  >
                    <option value="" disabled selected>Select legacy core</option>
                    <option value="FIS">FIS Profile</option>
                    <option value="Fiserv">Fiserv Precision</option>
                    <option value="JackHenry">Jack Henry Silverlake</option>
                    <option value="Custom">Custom Proprietary Mainframe</option>
                    <option value="None">None (Starting New Sandbox)</option>
                  </select>
                </div>
              </div>

              <div class="form-field full-width">
                <label for="message">Custom specs required (gRPC loops, ISO converters, ledger endpoints)</label>
                <textarea 
                  id="message" 
                  [(ngModel)]="message" 
                  name="message" 
                  rows="4" 
                  placeholder="Inform us about your target ledger settlement loops, volume criteria, security standards, or ISO 20022 parsing needs..." 
                  class="form-input"
                ></textarea>
              </div>

              <button type="submit" class="btn btn-primary submit-btn">
                Schedule Billed Engineering Session
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 18px; height: 18px;">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .contact-section {
      position: relative;
    }

    .contact-card {
      max-width: 800px;
      margin: 0 auto;
      padding: 50px;
      border: 1px solid var(--border-glass);
    }

    @media (max-width: 768px) {
      .contact-card {
        padding: 24px;
      }
    }

    .contact-header {
      text-align: center;
      margin-bottom: 40px;
    }

    .form-title {
      font-size: 2.2rem;
      margin: 14px 0;
    }

    .form-subtitle {
      color: var(--text-muted);
      font-size: 0.95rem;
    }

    .consultation-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    @media (max-width: 600px) {
      .form-row {
        grid-template-columns: 1fr;
        gap: 20px;
      }
    }

    .form-field {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-field label {
      font-family: var(--font-heading);
      font-weight: 700;
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    .select-field {
      appearance: none;
      -webkit-appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23C2410C'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 18px center;
      background-size: 16px;
      padding-right: 40px;
      background-color: #ffffff;
      color: var(--text-white);
    }

    textarea.form-input {
      resize: vertical;
      line-height: 1.5;
    }

    .submit-btn {
      width: 100%;
      height: 52px;
      font-size: 1.05rem;
      margin-top: 10px;
      border: 1px solid var(--primary-hover);
    }

    /* Success State */
    .success-state {
      text-align: center;
      padding: 20px 0;
      animation: zoom-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .success-icon {
      width: 80px;
      height: 80px;
      color: var(--accent-mint);
      margin: 0 auto 24px;
      background: rgba(21, 128, 61, 0.08);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      box-shadow: 0 0 30px rgba(21, 128, 61, 0.1);
    }

    .success-title {
      font-family: var(--font-heading);
      font-size: 1.8rem;
      color: var(--text-white);
      margin-bottom: 12px;
    }

    .success-desc {
      color: var(--text-muted);
      max-width: 580px;
      margin: 0 auto 24px;
      font-size: 0.98rem;
      line-height: 1.6;
    }

    .success-meta {
      display: inline-flex;
      gap: 24px;
      background: #ffffff;
      border: 1px solid var(--border-glass);
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    @media (max-width: 600px) {
      .success-meta {
        flex-direction: column;
        gap: 10px;
      }
    }

    @keyframes zoom-in {
      from { transform: scale(0.9); opacity: 0; }
    }
  `]
})
export class ContactComponent {
  name = '';
  email = '';
  volume = '';
  processor = '';
  message = '';
  submitted = signal(false);

  onSubmit() {
    if (this.name && this.email && this.volume && this.processor) {
      this.submitted.set(true);
    }
  }

  resetForm() {
    this.name = '';
    this.email = '';
    this.volume = '';
    this.processor = '';
    this.message = '';
    this.submitted.set(false);
  }

  formatVolume(val: string): string {
    switch (val) {
      case 'under_100k': return 'Under $100K/yr';
      case '100k_500k': return '$100K - $500K/yr';
      case '500k_2m': return '$500K - $2M/yr';
      case 'above_2m': return 'Above $2M/yr';
    }
    return val;
  }
}
