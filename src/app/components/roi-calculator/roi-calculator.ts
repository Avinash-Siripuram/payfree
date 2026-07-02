import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-roi-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="roi" class="roi-section">
      <div class="glow-bg glow-blue" style="top: 20%; right: 10%;"></div>
      <div class="section-container">
        <div class="section-header">
          <span class="badge">Open Source Savings</span>
          <h2 class="cyan-gradient section-title">Calculate License Reductions</h2>
          <p class="section-subtitle">Input your software core operating specs. See how much regional banks save by moving from proprietary subscription seats to free self-hosted containers.</p>
        </div>

        <div class="roi-grid glass-panel">
          <!-- Slider inputs -->
          <div class="roi-inputs">
            <h3 class="input-title">Verify Capital Savings</h3>
            
            <div class="input-group">
              <div class="slider-header">
                <label>Annual IT / Software Core Budget</label>
                <span class="value-display">{{ formatCurrency(volume()) }}</span>
              </div>
              <input 
                type="range" 
                min="50000" 
                max="5000000" 
                step="50000" 
                [(ngModel)]="volumeInput"
                class="roi-slider"
              />
              <div class="slider-labels">
                <span>$50K</span>
                <span>$2.5M</span>
                <span>$5M+</span>
              </div>
            </div>

            <div class="input-group">
              <div class="slider-header">
                <label>Proprietary Core Licensing ratio</label>
                <span class="value-display text-mint-light">{{ declineRate() }}%</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="70" 
                step="1" 
                [(ngModel)]="declineInput"
                class="roi-slider"
              />
              <div class="slider-labels">
                <span>10%</span>
                <span>40%</span>
                <span>70%</span>
              </div>
            </div>

            <div class="input-group">
              <div class="slider-header">
                <label>System Integration markup overhead</label>
                <span class="value-display">{{ feeRate() }}%</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="40" 
                step="0.5" 
                [(ngModel)]="feeInput"
                class="roi-slider"
              />
              <div class="slider-labels">
                <span>5%</span>
                <span>20%</span>
                <span>40%</span>
              </div>
            </div>
          </div>

          <!-- Savings Output Dashboard -->
          <div class="roi-outputs">
            <h3 class="output-title">Sovereign Financial Savings</h3>
            
            <div class="yield-card highlight">
              <span class="yield-lbl">Total Annual Capital Saved</span>
              <h2 class="total-saved-text">{{ formatCurrency(totalSaved()) }}</h2>
              <p class="yield-note">Estimated savings comparing self-hosted deployments against proprietary core subscription billing.</p>
            </div>

            <div class="yield-split">
              <div class="split-box">
                <span class="split-lbl">License Overhead Eliminated</span>
                <span class="split-val text-mint">{{ formatCurrency(recoveredRevenue()) }}</span>
                <p class="split-desc">Direct savings by self-running free container repositories.</p>
              </div>

              <div class="split-box">
                <span class="split-lbl">Integration Fees Saved</span>
                <span class="split-val text-cyan">{{ formatCurrency(feeSaved()) }}</span>
                <p class="split-desc">Direct savings by utilizing pre-built open acquiring adapters.</p>
              </div>
            </div>
            
            <div class="yield-action">
              <p class="consulting-note">Self-hosting software carrying $0 licensing fees. Integrating custom features via our system architects is billed under flat cost-based premium consultation plans.</p>
              <a href="#contact" class="btn btn-primary" style="margin-top: 14px; width: 100%;">Book Paid Consultation Session</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .roi-section {
      position: relative;
    }

    .section-header {
      text-align: center;
      margin-bottom: 50px;
    }

    .section-title {
      font-size: 2.6rem;
      margin: 16px 0;
    }

    .section-subtitle {
      color: var(--text-muted);
      max-width: 650px;
      margin: 0 auto;
    }

    .roi-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding: 40px;
      gap: 50px;
      border: 1px solid var(--border-glass);
    }

    @media (max-width: 968px) {
      .roi-grid {
        grid-template-columns: 1fr;
        padding: 24px;
        gap: 30px;
      }
    }

    .input-title, .output-title {
      font-family: var(--font-heading);
      font-weight: 700;
      font-size: 1.3rem;
      margin-bottom: 30px;
      letter-spacing: -0.01em;
      color: var(--text-white);
    }

    .input-group {
      margin-bottom: 32px;
    }

    .slider-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      font-family: var(--font-heading);
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--text-muted);
    }

    .value-display {
      color: var(--primary);
      font-weight: 700;
      font-size: 1.1rem;
    }

    .text-mint-light {
      color: var(--accent-cyan);
    }

    .roi-slider {
      width: 100%;
      height: 6px;
      background: rgba(194, 65, 12, 0.08);
      border-radius: 99px;
      outline: none;
      -webkit-appearance: none;
      transition: var(--transition-smooth);
    }

    .roi-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--primary);
      border: 2px solid #ffffff;
      cursor: pointer;
      box-shadow: 0 2px 7px rgba(194, 65, 12, 0.2);
      transition: var(--transition-smooth);
    }

    .roi-slider::-webkit-slider-thumb:hover {
      transform: scale(1.2);
    }

    .slider-labels {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      color: var(--text-dim);
      margin-top: 6px;
    }

    /* Outputs styling */
    .roi-outputs {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-between;
    }

    .yield-card {
      background: #ffffff;
      border: 1px solid var(--border-glass);
      border-radius: 12px;
      padding: 24px;
      text-align: center;
      margin-bottom: 24px;
    }

    .yield-lbl {
      display: block;
      font-size: 0.85rem;
      color: var(--text-muted);
      text-transform: uppercase;
      font-family: var(--font-heading);
      letter-spacing: 0.05em;
      margin-bottom: 8px;
    }

    .total-saved-text {
      font-size: 2.8rem;
      font-weight: 800;
      color: var(--primary);
      letter-spacing: -0.03em;
      margin-bottom: 8px;
    }

    .yield-note {
      font-size: 0.78rem;
      color: var(--text-dim);
    }

    .yield-split {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 24px;
    }

    .split-box {
      background: #ffffff;
      border: 1px solid var(--border-glass);
      border-radius: 8px;
      padding: 16px;
    }

    .split-lbl {
      display: block;
      font-size: 0.75rem;
      color: var(--text-dim);
      margin-bottom: 4px;
    }

    .split-val {
      font-weight: 700;
      font-size: 1.25rem;
      display: block;
      margin-bottom: 6px;
    }
    
    .text-mint { color: var(--accent-mint); }
    .text-cyan { color: var(--accent-cyan); }

    .split-desc {
      font-size: 0.72rem;
      color: var(--text-muted);
      line-height: 1.3;
    }

    .yield-action {
      text-align: center;
      border-top: 1px solid var(--border-glass);
      padding-top: 16px;
    }

    .consulting-note {
      font-size: 0.76rem;
      color: var(--text-dim);
      line-height: 1.4;
      text-align: left;
    }
  `]
})
export class RoiCalculatorComponent {
  volume = signal(1500000);   // $1.5M IT budget default
  declineRate = signal(40);    // 40% Licensing percentage default
  feeRate = signal(15);       // 15% System Integration markup default

  // Support inputs binding
  get volumeInput(): number {
    return this.volume();
  }
  set volumeInput(val: number) {
    this.volume.set(Number(val));
  }

  get declineInput(): number {
    return this.declineRate();
  }
  set declineInput(val: number) {
    this.declineRate.set(Number(val));
  }

  get feeInput(): number {
    return this.feeRate();
  }
  set feeInput(val: number) {
    this.feeRate.set(Number(val));
  }

  // Savings Math
  recoveredRevenue = computed(() => {
    const vol = this.volume();
    const licPercent = this.declineRate() / 100;
    return vol * licPercent * 0.95;
  });

  feeSaved = computed(() => {
    const vol = this.volume();
    const integrationMarkup = this.feeRate() / 100;
    return vol * integrationMarkup * 0.60;
  });

  totalSaved = computed(() => {
    return this.recoveredRevenue() + this.feeSaved();
  });

  formatCurrency(value: number): string {
    if (value >= 1000000) {
      return '$' + (value / 1000000).toFixed(2) + 'M';
    }
    return '$' + value.toLocaleString('en-US', { maximumFractionDigits: 0 });
  }
}
