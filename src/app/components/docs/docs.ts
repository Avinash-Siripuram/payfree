import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-docs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="docs" class="console-section">
      <div class="glow-bg glow-cyan" style="top: 10%; right: 5%;"></div>
      
      <div class="section-intro-deck">
        <span class="badge">Live Playground</span>
        <h2 class="viewport-title title-gradient">Interactive Linter Sandbox</h2>
        <p class="viewport-subtitle">Modify the JSON transaction payload variables on the left, then trigger a simulated ISO 20022 schema validation linter dry-run below.</p>
      </div>

      <div class="linter-playground-grid glass-panel">
        <!-- Input editor -->
        <div class="linter-inputs-area">
          <span class="explorer-hdr">ISO 20022 JSON Payload Sandbox</span>
          <textarea 
            [(ngModel)]="jsonPayloadInput"
            class="playground-textarea"
            placeholder="Type your transaction JSON here..."
          ></textarea>
          
          <div class="sandbox-run-bar">
            <button 
              class="btn btn-primary"
              (click)="runLinter()"
              [disabled]="isCompiling()"
            >
              <ng-container *ngIf="!isCompiling()">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width: 16px; height: 16px;">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                </svg>
                Run Parser Dry-Run
              </ng-container>
              <ng-container *ngIf="isCompiling()">
                Checking message compliance...
              </ng-container>
            </button>
            <span class="editor-info-summary">Validates nested schema tags in mock container nodes.</span>
          </div>
        </div>

        <!-- Terminal Output -->
        <div class="live-stream-panel">
          <div class="stream-hdr-meta">
            <h5>ISO Parser Logs Console</h5>
            <span class="badge" style="margin-bottom: 0;">payfree/iso-translator</span>
          </div>
          
          <div class="console-output-box">
            <div 
              *ngFor="let log of consoleOutput()" 
              class="sim-log-line"
              [class.cmd]="log.includes('[CMD]')"
              [class.success]="log.includes('[SUCCESS]')"
              [class.error]="log.includes('[ERROR]')"
              [class.info]="log.includes('[INFO]')"
            >
              {{ log }}
            </div>
          </div>
          
          <div class="consulting-badge" style="margin-top: 16px;">
            <p>Setup custom clearing adapters? Standard client setups are billed flat rate under paid integrations audits.</p>
            <a href="#contact" class="audit-btn">Request Billed Custom Setup</a>
          </div>
        </div>
      </div>
    </section>
  `
})
export class DocsComponent {
  jsonPayload = signal<string>(`{
  "Document": {
    "FIToFICstmrCdtTrf": {
      "GrpHdr": {
        "MsgId": "PAYFREE-22910-0988",
        "CreDtTm": "2026-07-02T13:51:00Z",
        "NbOfTxs": 1,
        "SttlmInf": {
          "SttlmMtd": "CLRG"
        }
      },
      "CdtTrfTxInf": {
        "PmtId": { "EndToEndId": "E2E-REF-41829" },
        "IntrBkSttlmAmt": { "@Ccy": "USD", "$": 250000.00 }
      }
    }
  }
}`);

  consoleOutput = signal<string[]>([
    '[INFO] Sandbox engine active. Modify values, break JSON delimiters, or run parser check.'
  ]);
  
  isCompiling = signal(false);

  get jsonPayloadInput(): string {
    return this.jsonPayload();
  }
  set jsonPayloadInput(val: string) {
    this.jsonPayload.set(val);
  }

  runLinter() {
    this.isCompiling.set(true);
    this.consoleOutput.set([
      '[CMD] starting payfree/iso-translator parsing container compiler runtime...',
      '[CMD] executing schema compliance dry-run on local payload document...'
    ]);

    setTimeout(() => {
      try {
        const payloadText = this.jsonPayload();
        const parsed = JSON.parse(payloadText);
        
        const doc = parsed?.Document;
        const clearanceItem = doc?.FIToFICstmrCdtTrf;
        const msgId = clearanceItem?.GrpHdr?.MsgId;
        const amount = clearanceItem?.CdtTrfTxInf?.IntrBkSttlmAmt?.['$'];
        const ccy = clearanceItem?.CdtTrfTxInf?.IntrBkSttlmAmt?.['@Ccy'];

        this.consoleOutput.update(logs => [
          ...logs,
          '[SUCCESS] ISO 20022 parsing completed successfully!',
          `[SUCCESS] Message Node Codec: ${clearanceItem ? 'FIToFICstmrCdtTrf (Customer Credit Transfer)' : 'Custom Extension Schema'}`,
          `[SUCCESS] Validation Unique MsgId: ${msgId || 'Undefined'}`,
          `[SUCCESS] Cleared Volume Balance: ${ccy || ''} ${amount !== undefined ? amount.toLocaleString() : '0.00'}`,
          '[SUCCESS] Schema integrity checks verified. Sandbox dry-run exit 0.'
        ]);
      } catch (err: any) {
        this.consoleOutput.update(logs => [
          ...logs,
          '[ERROR] parsing fail: invalid transaction template parser token error!',
          `[ERROR] detail: ${err?.message || 'Syntax error'}`,
          '[ERROR] checkout active markers. Sandbox dry-run exit 1.'
        ]);
      }
      this.isCompiling.set(false);
    }, 700);
  }
}
