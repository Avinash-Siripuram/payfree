import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="section-container footer-grid">
        <div class="footer-brand">
          <a href="#" class="logo">
            <span class="logo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
              </svg>
            </span>
            <span class="logo-text">Pay<span>Free</span></span>
          </a>
          <p class="brand-desc">Open-source banking core payment rails and compliance modules. Making double-entry ledger ledgers and clearing network integration affordable for community banks and scaling fintechs globally.</p>
        </div>

        <div class="footer-links">
          <h5>Open Modules</h5>
          <a href="#services">Account Ledger</a>
          <a href="#services">Network Adapters</a>
          <a href="#services">Clearing Codecs</a>
          <a href="#diagnostics">API Linter</a>
        </div>

        <div class="footer-links">
          <h5>Integration Design</h5>
          <a href="#contact">Compliance Review</a>
          <a href="#contact">Sovereign Deployment</a>
          <a href="#roi">Core Budget Estimator</a>
          <a href="#contact">ISO 20022 Audit</a>
        </div>

        <div class="footer-contact">
          <h5>Connect With Us</h5>
          <p>Interested in deploying our sandbox core ledger?</p>
          <a href="mailto:deploy@payfree.ai" class="email-link">deploy&#64;payfree.ai</a>
          <div class="socials">
            <span>Fintech Open Source Foundation Member</span>
            <br>
            <span class="compliance-badge">PCI-DSS Compliant Infrastructure Templates</span>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="section-container bottom-flex">
          <p>&copy; 2026 PayFree Inc. Released under Apache License 2.0. Payment software core and clearing adaptations. Sandboxes made available for small banks and union divisions.</p>
          <div class="legal-links">
            <a href="#">Security policy</a>
            <a href="#">Terms & License</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      border-top: 1px solid var(--border-glass);
      background: #05070c;
      padding-top: 60px;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
      gap: 50px;
      padding-bottom: 50px !important;
    }

    @media (max-width: 968px) {
      .footer-grid {
        grid-template-columns: 1fr 1fr;
        gap: 30px;
      }
    }

    @media (max-width: 600px) {
      .footer-grid {
        grid-template-columns: 1fr;
      }
    }

    .logo {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
      font-family: var(--font-heading);
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--text-white);
    }

    .logo-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, var(--primary), var(--accent-teal));
      border-radius: 8px;
    }

    .logo-icon svg {
      width: 18px;
      height: 18px;
    }

    .logo-text span {
      background: linear-gradient(135deg, var(--accent-mint), var(--accent-teal));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .brand-desc {
      font-size: 0.85rem;
      color: var(--text-muted);
      line-height: 1.6;
    }

    .footer-links {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .footer-links h5, .footer-contact h5 {
      font-family: var(--font-heading);
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--text-white);
      margin-bottom: 16px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .footer-links a {
      font-size: 0.88rem;
      color: var(--text-muted);
      transition: var(--transition-smooth);
    }

    .footer-links a:hover {
      color: var(--text-white);
      transform: translateX(4px);
    }

    .footer-contact p {
      font-size: 0.88rem;
      color: var(--text-muted);
      margin-bottom: 14px;
    }

    .email-link {
      font-family: var(--font-heading);
      font-weight: 700;
      font-size: 1.1rem;
      color: var(--primary);
      display: inline-block;
      margin-bottom: 20px;
    }

    .email-link:hover {
      color: var(--text-white);
    }

    .socials {
      font-size: 0.78rem;
      color: var(--text-dim);
    }

    .compliance-badge {
      display: inline-block;
      margin-top: 8px;
      padding: 4px 8px;
      border: 1px dashed rgba(255, 255, 255, 0.08);
      border-radius: 4px;
    }

    /* Bottom strip */
    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.03);
      padding: 30px 0;
      background: #020407;
    }

    .bottom-flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      font-size: 0.78rem;
      color: var(--text-dim);
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    }

    @media (max-width: 768px) {
      .bottom-flex {
        flex-direction: column;
        text-align: center;
      }
    }

    .legal-links {
      display: flex;
      gap: 20px;
      flex-shrink: 0;
    }

    .legal-links a:hover {
      color: var(--text-white);
    }
  `]
})
export class FooterComponent {}
