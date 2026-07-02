import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="dashboard" class="console-section">
      <div class="glow-bg glow-purple" style="bottom: 5%; left: 10%;"></div>
      
      <div class="section-intro-deck">
        <span class="badge">Real-Time Routing Visualizer</span>
        <h2 class="viewport-title title-gradient">Acquiring Node Simulator</h2>
        <p class="viewport-subtitle">Simulate real-time messaging, translation, and write logs mapping across local pre-built OCI container clusters.</p>
      </div>

      <div class="clearing-map-visualizer glass-panel">
        
        <!-- SVG Node Connection Map (Left Column) -->
        <div class="node-system-canvas">
          <!-- Flow Line Connectors (SVG overlays) -->
          <svg class="svg-flow-overlay">
            <!-- Path from Node 1 (Origin) to Node 2 (ISO) -->
            <path d="M 50,75 L 140,75" class="svg-wire" [class.active]="activeNode() >= 1" />
            <!-- Path from Node 2 (ISO) to Node 3 (Ledger) -->
            <path d="M 140,75 L 230,75" class="svg-wire" [class.active]="activeNode() >= 2" />
            <!-- Path from Node 3 (Ledger) to Node 4 (Bridge) -->
            <path d="M 230,75 L 320,75" class="svg-wire" [class.active]="activeNode() >= 3" />
            <!-- Path from Node 4 (Bridge) to Node 5 (Destination) -->
            <path d="M 320,75 L 410,75" class="svg-wire" [class.active]="activeNode() >= 4" />
          </svg>

          <div class="node-elements-row">
            <!-- Node 1: Origin -->
            <div class="node-bubble">
              <div class="node-circle" [class.active]="activeNode() === 0" [class.success]="activeNode() > 0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.33H4.5V21m-1.5 0h18M12 9.75a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
                </svg>
              </div>
              <span class="node-label">Origin Bank</span>
            </div>

            <!-- Node 2: ISO Translator -->
            <div class="node-bubble">
              <div class="node-circle" [class.active]="activeNode() === 1" [class.success]="activeNode() > 1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8.25V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18V8.25m-18 0V6a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6ZM7.5 6h.008v.008H7.5V6Zm2.25 0h.008v.008H9.75V6Z" />
                </svg>
              </div>
              <span class="node-label">ISO Codec</span>
            </div>

            <!-- Node 3: Ledger DB -->
            <div class="node-bubble">
              <div class="node-circle" [class.active]="activeNode() === 2" [class.success]="activeNode() > 2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75" />
                </svg>
              </div>
              <span class="node-label">ACID Ledger</span>
            </div>

            <!-- Node 4: FedNow Webhook Bridge -->
            <div class="node-bubble">
              <div class="node-circle" [class.active]="activeNode() === 3" [class.success]="activeNode() > 3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                </svg>
              </div>
              <span class="node-label">FedWeb Bridge</span>
            </div>

            <!-- Node 5: Destination -->
            <div class="node-bubble">
              <div class="node-circle" [class.active]="activeNode() === 4" [class.success]="activeNode() > 4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296a3.745 3.745 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
              </div>
              <span class="node-label">Settled Hub</span>
            </div>
          </div>

          <div class="simulation-alert alert-suc" style="margin-top: auto; padding: 14px;">
            <div class="alert-content">
              <strong>Simulated Clearing Pipeline:</strong> Active connections configured via standard environment files targeting local scratch containers.
            </div>
          </div>
        </div>

        <!-- Terminal Logs Panel (Right Column) -->
        <div class="live-stream-panel">
          <div class="stream-hdr-meta">
            <h5>Local Cluster Node Output</h5>
            <div class="simulator-toggles-bar" style="margin-bottom: 0;">
              <button 
                [class.active]="clearingSpeed() === 'fednow'"
                (click)="setSpeed('fednow')"
                class="sim-toggle-btn"
              >
                FedNow
              </button>
              <button 
                [class.active]="clearingSpeed() === 'swift'"
                (click)="setSpeed('swift')"
                class="sim-toggle-btn"
              >
                SWIFT
              </button>
              <button 
                [class.active]="clearingSpeed() === 'ach'"
                (click)="setSpeed('ach')"
                class="sim-toggle-btn"
              >
                ACH Batch
              </button>
            </div>
          </div>

          <div class="simulator-logs-box">
            <div 
              *ngFor="let item of streamLogs()" 
              class="sim-log-line"
              [class.cmd]="item.includes('[CMD]')"
              [class.success]="item.includes('[SUCCESS]')"
              [class.info]="item.includes('[INFO]')"
            >
              {{ item }}
            </div>
          </div>

          <div class="trigger-flow-panel">
            <button 
              class="btn btn-primary trigger-action-btn"
              (click)="triggerRouteScan()"
              [disabled]="isRunning()"
            >
              <ng-container *ngIf="!isRunning()">
                Trigger Simulated Clearing Cycle (Run Local Node)
              </ng-container>
              <ng-container *ngIf="isRunning()">
                Routing Transaction Data Packet...
              </ng-container>
            </button>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    /* Sub-grid positioning fix for node maps in small devices */
    @media (max-width: 600px) {
      .node-elements-row {
        flex-direction: column;
        gap: 20px;
        align-items: center;
      }
      .svg-flow-overlay {
        display: none;
      }
    }
  `]
})
export class DashboardComponent {
  activeNode = signal<number>(-1);
  isRunning = signal<boolean>(false);
  clearingSpeed = signal<'fednow' | 'swift' | 'ach'>('fednow');

  streamLogs = signal<string[]>([
    '[INFO] Clearing simulation container cluster idle.',
    '[INFO] Select clearing protocol above and click Trigger to simulate OCI node message transfer.'
  ]);

  setSpeed(speed: 'fednow' | 'swift' | 'ach') {
    this.clearingSpeed.set(speed);
    this.activeNode.set(-1);
    this.streamLogs.set([
      `[INFO] Switched target route clearing protocol configuration to: ${speed.toUpperCase()}`
    ]);
  }

  triggerRouteScan() {
    this.isRunning.set(true);
    this.activeNode.set(0);
    
    const speed = this.clearingSpeed();
    const isFed = speed === 'fednow';
    const isSwift = speed === 'swift';

    this.streamLogs.set([
      `[CMD] initiating routing package run: target transport protocol = ${speed.toUpperCase()}`,
      '[CMD] mapping message values to local double-entry banking ledger nodes...'
    ]);

    // Stage 1: ISO Translation
    setTimeout(() => {
      this.activeNode.set(1);
      this.streamLogs.update(logs => [
        ...logs,
        '[INFO] [payfree/iso-translator] parsing raw outbound transaction package payload...',
        isSwift 
          ? '[SUCCESS] translated data payload to standard SWIFT pacs.008 schema (1.2ms).'
          : '[SUCCESS] compiled transaction payload nodes to ISO 20022 XML formats (1.4ms).'
      ]);

      // Stage 2: ACID Ledger Database Write
      setTimeout(() => {
        this.activeNode.set(2);
        this.streamLogs.update(logs => [
          ...logs,
          '[INFO] [payfree/ledger-core] balancing accounts double journals: writing ACID debit-credit registers...',
          '[SUCCESS] recorded journals balance updates to local PostgreSQL shard indices (22ms).'
        ]);

        // Stage 3: Clearance Bridge
        setTimeout(() => {
          this.activeNode.set(3);
          this.streamLogs.update(logs => [
            ...logs,
            isFed 
              ? '[INFO] [payfree/fednow-bridge] broadcasting gRPC transaction webhook requests to Federal Clearing Endpoint...'
              : '[INFO] transmitting balance logs to standard corporate clearing hub...',
            isFed
              ? '[SUCCESS] Federal central settlement hub returns HTTP 200 message OK (55ms).'
              : '[SUCCESS] Clearing interface received balance settlement registers.'
          ]);

          // Stage 4: Finished Settlement
          setTimeout(() => {
            this.activeNode.set(4);
            const totalLatency = isFed ? '78ms' : isSwift ? '142ms' : '380ms';
            this.streamLogs.update(logs => [
              ...logs,
              `[SUCCESS] TRANSACTION COMPLETED. Settlement confirmed on remote customer nodes!`,
              `[SUCCESS] total clearing latency: ${totalLatency}. status code: EXITED OK.`
            ]);
            this.isRunning.set(false);
          }, 600);

        }, 700);

      }, 600);

    }, 550);
  }
}
