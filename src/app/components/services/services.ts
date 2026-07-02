import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: true,
  template: `
    <section id="services" class="services-section">
      <div class="section-container">
        <div class="section-header">
          <span class="badge">Registry Images</span>
          <h2 class="cyan-gradient section-title">Direct Image Downloads</h2>
          <p class="section-subtitle">Pull our pre-compiled container repositories. Free Apache 2.0 license allows complete private infrastructure self-hosting.</p>
        </div>

        <div class="services-grid">
          <!-- Card 1 -->
          <div class="service-card glass-panel">
            <div class="card-icon terracotta">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m6 0V15m6-9.75V15M3 5.25h18" />
              </svg>
            </div>
            <h3>payfree/ledger-core:v1.2</h3>
            <p>Runs double-entry banking ledger entries and atomic debit-credit balance registers in on-premises containers.</p>
            <div class="docker-cmd">docker pull payfree/ledger-core</div>
            <ul class="card-bullets">
              <li>Atomic commit guarantees</li>
              <li>SQL database connectors</li>
              <li>Sovereign credential storage</li>
            </ul>
          </div>

          <!-- Card 2 -->
          <div class="service-card glass-panel">
            <div class="card-icon sage">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a9.008 9.008 0 0 1 8.716 6.747M12 3a9.008 9.008 0 0 0-8.716 6.747M12 9h.008v.008H12V9Zm6 0h.008v.008H18V9ZM6 9h.008v.008H6V9Z" />
              </svg>
            </div>
            <h3>payfree/iso-translator:v1.0</h3>
            <p>Self-contained microservice container mapping nested data schemas into compliant standard ISO 20022 messages.</p>
            <div class="docker-cmd">docker pull payfree/iso-translator</div>
            <ul class="card-bullets">
              <li>Lints payload formats</li>
              <li>Validates SWIFT compliance</li>
              <li>Zero core memory leaks</li>
            </ul>
          </div>

          <!-- Card 3 -->
          <div class="service-card glass-panel">
            <div class="card-icon teal">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
              </svg>
            </div>
            <h3>payfree/fednow-bridge:v0.9</h3>
            <p>Direct network driver bridging locally clearing ACH cores natively with real-time Federal Hub Webhooks.</p>
            <div class="docker-cmd">docker pull payfree/fednow-bridge</div>
            <ul class="card-bullets">
              <li>gRPC connection hooks</li>
              <li>Low-latency response buffers</li>
              <li>Self-healing reconnection loop</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .services-section {
      position: relative;
    }

    .section-header {
      text-align: center;
      margin-bottom: 60px;
    }

    .section-title {
      font-size: 2.6rem;
      margin: 16px 0;
    }

    .section-subtitle {
      color: var(--text-muted);
      max-width: 650px;
      margin: 0 auto;
      font-size: 1.05rem;
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
    }

    .service-card {
      padding: 36px 30px;
      height: 100%;
      display: flex;
      flex-direction: column;
      border: 1px solid var(--border-glass);
    }

    .service-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }

    .card-icon {
      width: 50px;
      height: 50px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
    }

    .card-icon svg {
      width: 24px;
      height: 24px;
    }

    .card-icon.terracotta {
      background: rgba(194, 65, 12, 0.08);
      color: var(--primary);
    }

    .card-icon.sage {
      background: rgba(21, 128, 61, 0.08);
      color: var(--accent-mint);
    }

    .card-icon.teal {
      background: rgba(14, 116, 144, 0.08);
      color: var(--accent-cyan);
    }

    .service-card h3 {
      font-size: 1.25rem;
      margin-bottom: 14px;
      color: var(--text-white);
      font-family: monospace;
      font-weight: 700;
    }

    .service-card p {
      color: var(--text-muted);
      font-size: 0.95rem;
      line-height: 1.5;
      margin-bottom: 20px;
      flex-grow: 1;
    }

    .docker-cmd {
      background: #FAF8F5;
      border: 1px solid var(--border-glass);
      padding: 10px 14px;
      border-radius: 6px;
      font-family: monospace;
      font-size: 0.8rem;
      color: var(--primary);
      margin-bottom: 20px;
      text-align: center;
      user-select: all;
      font-weight: 600;
    }

    .card-bullets {
      list-style: none;
      border-top: 1px solid var(--border-glass);
      padding-top: 18px;
    }

    .card-bullets li {
      position: relative;
      padding-left: 20px;
      margin-bottom: 8px;
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    .card-bullets li::before {
      content: "";
      position: absolute;
      left: 0;
      top: 6px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--primary);
    }

    .service-card:nth-child(2) .card-bullets li::before {
      background: var(--accent-mint);
    }

    .service-card:nth-child(3) .card-bullets li::before {
      background: var(--accent-cyan);
    }

    @media (max-width: 968px) {
      .services-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ServicesComponent {}
