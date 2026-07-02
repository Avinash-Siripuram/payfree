import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="hero" class="console-section">
      <div class="glow-bg glow-purple"></div>
      
      <div class="section-intro-deck">
        <span class="badge font-heading">Decentralized Platform Hub</span>
        <h1 class="viewport-title title-gradient">Self-Hostable Banking Infrastructure.</h1>
        <p class="viewport-subtitle">
          Pull pre-compiled OCI images to operate core double-entry ledgers, validate payload compliance schemas, and bridge clearing endpoints on-premises. Apache 2.0 open-source software, completely free of license fees.
        </p>
      </div>

      <!-- Overhauled visual: Sandboxed comparative viewports -->
      <div class="archs-compare-grid">
        <!-- Legacy Card -->
        <div class="arch-card legacy glass-panel">
          <h5>Proprietary Legacy Systems</h5>
          <p>Locked in proprietary architectures demanding user markups and licensing overheads.</p>
          <div class="arch-nodes-list">
            <div class="arch-node-item">
              <span class="node-badge-lbl">GATEWAY</span>
              <span class="lbl-txt">Closed Transaction Broker</span>
              <span class="cost-val">$24K/yr</span>
            </div>
            <div class="arch-node-item">
              <span class="node-badge-lbl">LEDGER</span>
              <span class="lbl-txt">Proprietary Core Seat Licenses</span>
              <span class="cost-val">$85K/yr</span>
            </div>
            <div class="arch-node-item">
              <span class="node-badge-lbl">ACH DEV</span>
              <span class="lbl-txt">Integration Consulting Fees</span>
              <span class="cost-val">$36K/yr</span>
            </div>
          </div>
        </div>

        <!-- PayFree OCI Card -->
        <div class="arch-card payfree glass-panel">
          <h5>PayFree Open-Source Core</h5>
          <p>Operate sovereign container codes locally on cloud clusters under zero markup conditions.</p>
          <div class="arch-nodes-list">
            <div class="arch-node-item">
              <span class="node-badge-lbl">IMAGE</span>
              <span class="lbl-txt">payfree/fednow-bridge:latest</span>
              <span class="cost-val">$0</span>
            </div>
            <div class="arch-node-item">
              <span class="node-badge-lbl">IMAGE</span>
              <span class="lbl-txt">payfree/ledger-core:latest</span>
              <span class="cost-val">$0</span>
            </div>
            <div class="arch-node-item">
              <span class="node-badge-lbl">IMAGE</span>
              <span class="lbl-txt">payfree/iso-translator:latest</span>
              <span class="cost-val">$0</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HeroComponent {}
