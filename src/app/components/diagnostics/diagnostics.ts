import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Scenario {
  id: string;
  name: string;
  description: string;
  volume: string;
  declineRate: string;
  processor: string;
}

interface DiagnosticResult {
  issue: string;
  impact: string;
  resolution: string;
  recovery: string;
  steps: string[];
}

@Component({
  selector: 'app-diagnostics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="diagnostics" class="diagnostics-section">
      <div class="glow-bg glow-cyan"></div>
      <div class="section-container">
        <div class="section-header">
          <span class="badge">Compliance & Integration scan</span>
          <h2 class="title-gradient section-title">API Compliance Checker</h2>
          <p class="section-subtitle">Test our open-source codecs against banking messaging formats (ISO 20022) and real-time ledger connectors.</p>
        </div>

        <div class="diagnostics-grid">
          <!-- Step 1: Select Scenario -->
          <div class="controls-panel glass-panel">
            <h3 class="panel-title">1. Select Target Protocol</h3>
            <div class="scenarios-list">
              <div 
                *ngFor="let s of scenarios" 
                class="scenario-item"
                [class.active]="selectedScenarioId() === s.id"
                (click)="selectScenario(s.id)"
              >
                <div class="scenario-meta">
                  <span class="scen-name">{{ s.name }}</span>
                  <span class="scen-proc">{{ s.processor }}</span>
                </div>
                <p class="scen-desc">{{ s.description }}</p>
                <div class="scen-data">
                  <span>Standard: <strong>{{ s.volume }}</strong></span>
                  <span>Compliance Risk: <strong class="text-mint">{{ s.declineRate }}</strong></span>
                </div>
              </div>
            </div>

            <button 
              class="btn btn-primary diagnostic-btn" 
              [disabled]="isAnalyzing()"
              (click)="runDiagnostics()"
            >
              <ng-container *ngIf="!isAnalyzing()">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="btn-icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                </svg>
                Lint API Schema
              </ng-container>
              <ng-container *ngIf="isAnalyzing()">
                <span class="loader"></span>
                Parsing Transaction Schemas...
              </ng-container>
            </button>
          </div>

          <!-- Step 2: Diagnostic Output -->
          <div class="output-panel glass-panel">
            <!-- Default Idle State -->
            <div *ngIf="status() === 'idle'" class="idle-state">
              <div class="idle-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                </svg>
              </div>
              <p>Diagnostics Idle. Select a protocol schema on the left and run analysis to view compliance results.</p>
            </div>

            <!-- Testing/Analyzing State -->
            <div *ngIf="status() === 'analyzing'" class="analyzing-state">
              <div class="spinner-container">
                <div class="radar-scan"></div>
                <div class="radar-grid"></div>
              </div>
              <div class="log-stream">
                <div *ngFor="let log of activeLogs()" class="log-line" [class.warn]="log.includes('WARN')" [class.suc]="log.includes('SUCCESS')">
                  {{ log }}
                </div>
              </div>
            </div>

            <!-- Done State -->
            <div *ngIf="status() === 'done' && results()" class="results-state">
              <div class="results-header">
                <div class="res-badge">Linter Scan Successful</div>
                <h4 class="recovery-headline">Audit Result: <span class="accent">{{ results()?.recovery }}</span></h4>
              </div>

              <div class="metrics-summary">
                <div class="metric-block card-vol">
                  <span class="m-lbl">Validation Issue</span>
                  <span class="m-val warning-text">{{ results()?.issue }}</span>
                </div>
                <div class="metric-block card-impact">
                  <span class="m-lbl">Estimated Compliance Overhead</span>
                  <span class="m-val error-text">{{ results()?.impact }}</span>
                </div>
              </div>

              <div class="remedy-box">
                <h5>Open-Source Solution Strategy</h5>
                <p>{{ results()?.resolution }}</p>
              </div>

              <div class="remedy-steps">
                <h5>Required Remediation Path</h5>
                <ol>
                  <li *ngFor="let step of results()?.steps">{{ step }}</li>
                </ol>
              </div>

              <div class="remedy-actions">
                <a href="#contact" class="btn btn-primary btn-sm">Download Implementation Guide</a>
                <button (click)="resetDiagnostic()" class="btn btn-secondary btn-sm">Reset</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .diagnostics-section {
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

    .diagnostics-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      min-height: 520px;
    }

    @media (max-width: 968px) {
      .diagnostics-grid {
        grid-template-columns: 1fr;
      }
    }

    .panel-title {
      font-family: var(--font-heading);
      font-size: 1.25rem;
      margin-bottom: 20px;
      color: var(--text-white);
    }

    .controls-panel {
      padding: 30px;
      display: flex;
      flex-direction: column;
      border: 1px solid var(--border-glass);
    }

    .scenarios-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 24px;
      flex: 1;
    }

    .scenario-item {
      background: #ffffff;
      border: 1px solid var(--border-glass);
      border-radius: 10px;
      padding: 16px;
      cursor: pointer;
      transition: var(--transition-smooth);
    }

    .scenario-item:hover {
      background: rgba(255, 255, 255, 0.95);
      border-color: rgba(194, 65, 12, 0.22);
    }

    .scenario-item.active {
      background: rgba(194, 65, 12, 0.05);
      border-color: var(--primary);
    }

    .scenario-meta {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .scen-name {
      font-weight: 700;
      color: var(--text-white);
      font-size: 0.95rem;
    }

    .scen-proc {
      font-family: monospace;
      font-size: 0.75rem;
      padding: 2px 8px;
      background: rgba(194, 65, 12, 0.06);
      border-radius: 4px;
      color: var(--primary);
      font-weight: 600;
    }

    .scen-desc {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-bottom: 12px;
      line-height: 1.4;
    }

    .scen-data {
      display: flex;
      gap: 16px;
      font-size: 0.8rem;
      color: var(--text-dim);
    }

    .text-mint {
      color: var(--accent-mint);
    }

    .diagnostic-btn {
      width: 100%;
      height: 52px;
      font-size: 1.05rem;
    }

    .btn-icon {
      width: 20px;
      height: 20px;
    }

    /* Output Panel */
    .output-panel {
      padding: 30px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: var(--bg-card);
      border: 1px solid var(--border-glass);
    }

    .idle-state {
      text-align: center;
      color: var(--text-dim);
      max-width: 320px;
      margin: 0 auto;
    }

    .idle-icon {
      width: 60px;
      height: 60px;
      color: var(--text-dim);
      margin: 0 auto 20px;
      opacity: 0.5;
    }

    .idle-state p {
      font-size: 0.9rem;
    }

    /* Analyzing State animations */
    .analyzing-state {
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: space-between;
    }

    .spinner-container {
      position: relative;
      width: 120px;
      height: 120px;
      margin: 30px auto;
    }

    .radar-scan {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 2px solid var(--primary-glow);
      border-radius: 50%;
      animation: radar-sweep 2s infinite linear;
    }

    .radar-scan::after {
      content: "";
      position: absolute;
      width: 50%;
      height: 50%;
      background: linear-gradient(135deg, var(--primary) 0%, transparent 60%);
      top: 0;
      left: 0;
      transform-origin: bottom right;
      border-bottom-right-radius: 0;
      border-top-left-radius: 100%;
      animation: sweep-color 2s infinite linear;
    }

    .radar-grid {
      position: absolute;
      width: 70%;
      height: 70%;
      border: 1px dashed rgba(194, 65, 12, 0.15);
      border-radius: 50%;
      top: 15%;
      left: 15%;
    }

    .log-stream {
      background: #23211E;
      border: 1px solid var(--border-glass);
      border-radius: 8px;
      padding: 16px;
      font-family: monospace;
      font-size: 0.75rem;
      color: #A3E635; /* Terminal green */
      height: 180px;
      overflow-y: auto;
    }

    .log-line {
      margin-bottom: 6px;
      border-bottom: 1px solid rgba(255,255,255,0.02);
      padding-bottom: 4px;
    }

    .log-line.warn {
      color: #9D968A;
    }

    .log-line.suc {
      color: #A3E635;
    }

    /* Results layout */
    .results-state {
      display: flex;
      flex-direction: column;
      gap: 20px;
      animation: fade-in 0.4s ease-out;
    }

    .res-badge {
      display: inline-block;
      padding: 4px 10px;
      background: rgba(21, 128, 61, 0.08);
      color: var(--accent-mint);
      border: 1px solid rgba(21, 128, 61, 0.18);
      border-radius: 4px;
      font-size: 0.75rem;
      font-family: monospace;
      margin-bottom: 8px;
      font-weight: 600;
    }

    .recovery-headline {
      font-size: 1.35rem;
      color: var(--text-white);
    }

    .recovery-headline .accent {
      color: var(--accent-mint);
      font-weight: 800;
    }

    .metrics-summary {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .metric-block {
      background: #ffffff;
      border: 1px solid var(--border-glass);
      border-radius: 8px;
      padding: 14px;
    }

    .m-lbl {
      display: block;
      font-size: 0.75rem;
      color: var(--text-dim);
      text-transform: uppercase;
      margin-bottom: 6px;
    }

    .m-val {
      font-weight: 700;
      font-size: 1.05rem;
    }

    .warning-text { color: var(--accent-mint); }
    .error-text { color: var(--accent-cyan); }

    .remedy-box {
      background: rgba(19, 116, 144, 0.04);
      border: 1px solid rgba(19, 116, 144, 0.12);
      padding: 16px;
      border-radius: 8px;
    }

    .remedy-box h5, .remedy-steps h5 {
      color: var(--text-white);
      margin-bottom: 8px;
      font-size: 0.95rem;
    }

    .remedy-box p {
      font-size: 0.88rem;
      color: var(--text-muted);
      line-height: 1.5;
    }

    .remedy-steps ol {
      padding-left: 20px;
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    .remedy-steps li {
      margin-bottom: 6px;
    }

    .remedy-actions {
      display: flex;
      gap: 14px;
      border-top: 1px solid var(--border-glass);
      padding-top: 18px;
    }

    .btn-sm {
      padding: 8px 18px;
      font-size: 0.85rem;
    }

    .loader {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 1s infinite linear;
      margin-right: 8px;
      vertical-align: middle;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @keyframes radar-sweep {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes sweep-color {
      0% { opacity: 0.3; }
      50% { opacity: 0.7; }
      100% { opacity: 0.3; }
    }

    @keyframes fade-in {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class DiagnosticsComponent {
  readonly scenarios = [
    {
      id: 'scen_1',
      name: 'ISO 20022 Schema Linter',
      description: 'Validate custom regional transaction files against standard SWIFT/ISO financial schema codecs.',
      volume: 'pacs.008 compliant',
      declineRate: 'Low Schema Risk',
      processor: 'XML Decoder'
    },
    {
      id: 'scen_2',
      name: 'ACH Reserve Lock Audit',
      description: 'Check double-entry deposit registers structures to prevent overdraft ledger collisions during batches.',
      volume: 'Secured ACID core',
      declineRate: 'Medium Collision Risk',
      processor: 'Asset Core'
    },
    {
      id: 'scen_3',
      name: 'FedNow Clearing Handshake',
      description: 'Lints routing API gRPC handovers to ensure real-time response times do not exceed 100ms thresholds.',
      volume: 'Ultra-low latency',
      declineRate: 'High Latency Risk',
      processor: 'FedNow Rail'
    }
  ];

  selectedScenarioId = signal('scen_1');
  status = signal<'idle' | 'analyzing' | 'done'>('idle');
  isAnalyzing = signal(false);
  activeLogs = signal<string[]>([]);
  results = signal<DiagnosticResult | null>(null);

  selectScenario(id: string) {
    if (this.isAnalyzing()) return;
    this.selectedScenarioId.set(id);
    this.status.set('idle');
  }

  runDiagnostics() {
    this.status.set('analyzing');
    this.isAnalyzing.set(true);
    this.activeLogs.set([]);
    this.results.set(null);

    const simulationLogs = [
      'INIT: Connecting open-source validator engine...',
      'PARSING: Reading bank profile transaction schemas...',
      'ISO-PARSE: Analyzing pacs.008 message structures...',
      'WARN: Legacy core nesting fields contain non-compliant tags.',
      'LEDGER: Triggering ACID validation split rules...',
      'LEDGER: Audited 5,000 double-entry registers successfully.',
      'ISO-PARSE: Running regulatory validation loops...',
      'SUCCESS: Audit and validation checks complete.'
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < simulationLogs.length) {
        this.activeLogs.update(logs => [...logs, simulationLogs[index]]);
        index++;
      } else {
        clearInterval(interval);
        this.status.set('done');
        this.isAnalyzing.set(false);
        this.generateResults();
      }
    }, 400);
  }

  generateResults() {
    const id = this.selectedScenarioId();
    if (id === 'scen_1') {
      this.results.set({
        issue: 'Nesting errors inside custom XML namespaces.',
        impact: 'Generates ISO message rejections on 4.1% of transactions.',
        resolution: 'Apply PayFree open-source ISO parser codecs to standardise outbound SWIFT envelopes.',
        recovery: '99.99% XML Compliance',
        steps: [
          'Install payfree-iso-20022 schemas npm library.',
          'Bind local bank output to XML encoder modules.',
          'Run continuous integration schema test checks.'
        ]
      });
    } else if (id === 'scen_2') {
      this.results.set({
        issue: 'Soft overdraft checks trigger database write locks.',
        impact: 'Generates up to 18 second database delays during peaks.',
        resolution: 'Deploy PayFree double-entry journal core with optimistic concurrency transaction isolation levels.',
        recovery: '+14x Faster Operations',
        steps: [
          'Configure PostgreSQL isolation level to Read Committed.',
          'Migrate single accounts tables to PayFree ledger entries tables.',
          'Execute async balance updates via write webhooks.'
        ]
      });
    } else {
      this.results.set({
        issue: 'Acquiring server connection timeouts to FedNow endpoints.',
        impact: 'Yielding retry backlogs of 2,400 clearances daily.',
        resolution: 'Set up PayFree distributed message queue handlers with self-healing routing endpoints.',
        recovery: '< 85ms Target Latency',
        steps: [
          'Configure PayFree gRPC client load balances.',
          'Enable automatic active-active FedNow gateway clustering.',
          'Add transaction cache buffers to local Redis endpoints.'
        ]
      });
    }
  }

  resetDiagnostic() {
    this.status.set('idle');
    this.activeLogs.set([]);
    this.results.set(null);
  }
}
