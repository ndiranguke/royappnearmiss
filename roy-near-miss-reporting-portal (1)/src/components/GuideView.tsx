import React from 'react';
import {
  AlertTriangle,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Eye,
  FileCheck2,
  HelpCircle,
  Package,
  Shield,
  Truck,
  Users,
  Wrench,
  Zap,
} from 'lucide-react';
import { RoyLogo } from './RoyLogo';

export const GuideView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Hero Banner */}
      <div className="bg-[#23262b] text-white p-5 sm:p-7 rounded-xl border-l-4 border-[#7A1315] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2.5 text-[#e57373] text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Fleet Safety Training Guide</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white">
            Near-Miss Reporting &amp; Prevention
          </h1>
          <p className="text-sm text-[#c7cad0] mt-2 max-w-2xl leading-relaxed">
            A near miss is any unplanned incident that did not result in injury, illness, or equipment loss &mdash; but easily had the potential to do so under slightly different circumstances.
          </p>
        </div>
        <div className="bg-white rounded-lg p-2 sm:p-2.5 shadow-md flex-shrink-0 self-start sm:self-center">
          <RoyLogo size="sm" className="h-9 sm:h-11 w-auto" />
        </div>
      </div>

      {/* Why We Report */}
      <div className="bg-white border border-[#e1ddd0] rounded p-6 shadow-2xs space-y-3">
        <div className="flex items-center gap-2 text-[#202226]">
          <Shield className="w-5 h-5 text-[#7A1315]" />
          <h2 className="font-heading font-bold text-lg">Why We Report Near Misses</h2>
        </div>
        <p className="text-sm text-[#565b62] leading-relaxed">
          Every catastrophic collision is preceded by dozens of smaller warning signs. By identifying and logging hazards early, EHS management can repair equipment, redesign blind intersections, and update operational training before damage occurs.
        </p>
        <div className="p-3.5 bg-[#faf9f6] rounded border border-[#e1ddd0] text-xs text-[#383c42] flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>
            <strong>Zero Blame Policy:</strong> Near-miss reporting is never used for disciplinary action. It is an engineering and learning framework to ensure all fleet operators return home safely.
          </span>
        </div>
      </div>

      {/* Operational Categories & Real Examples */}
      <div className="bg-white border border-[#e1ddd0] rounded p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-[#202226]">
          <Truck className="w-5 h-5 text-[#7A1315]" />
          <h2 className="font-heading font-bold text-lg">Examples Across Our Fleet Operations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded border border-[#e1ddd0] bg-[#faf9f6] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7A1315]">
              <Truck className="w-4 h-4" />
              <span>On The Road</span>
            </div>
            <p className="text-xs text-[#565b62] leading-relaxed">
              Sudden emergency braking due to an unlit stationary vehicle; skidding on a diesel spill on wet bends; sudden tyre tread detachment without loss of control.
            </p>
          </div>

          <div className="p-4 rounded border border-[#e1ddd0] bg-[#faf9f6] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700">
              <Wrench className="w-4 h-4" />
              <span>Vehicle Condition</span>
            </div>
            <p className="text-xs text-[#565b62] leading-relaxed">
              Brake fade or overheating drum during descents; steering backlash noticed on pre-trip; air line leak detected before kingpin coupling.
            </p>
          </div>

          <div className="p-4 rounded border border-[#e1ddd0] bg-[#faf9f6] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
              <Package className="w-4 h-4" />
              <span>Loading &amp; Cargo</span>
            </div>
            <p className="text-xs text-[#565b62] leading-relaxed">
              Loose ratchet straps allowing container or pallet shift; overweight axle triggered at scale; uneven liquid tanker surge on corners.
            </p>
          </div>

          <div className="p-4 rounded border border-[#e1ddd0] bg-[#faf9f6] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700">
              <Zap className="w-4 h-4" />
              <span>Fatigue &amp; Wellbeing</span>
            </div>
            <p className="text-xs text-[#565b62] leading-relaxed">
              Micro-sleep warning caught in time; severe eye strain during blinding night high-beams; dehydration or heat exhaustion symptoms during hot transit.
            </p>
          </div>

          <div className="p-4 rounded border border-[#e1ddd0] bg-[#faf9f6] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
              <Users className="w-4 h-4" />
              <span>Depot &amp; Yard Safety</span>
            </div>
            <p className="text-xs text-[#565b62] leading-relaxed">
              Forklift near-miss around blind stacked pallets; dark inspection bay with broken lights; slippery diesel slick near washing ramp.
            </p>
          </div>

          <div className="p-4 rounded border border-[#e1ddd0] bg-[#faf9f6] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-700">
              <AlertTriangle className="w-4 h-4" />
              <span>Third-Party Hazards</span>
            </div>
            <p className="text-xs text-[#565b62] leading-relaxed">
              Boda-boda or pedestrians crossing blindly in blind spots; aggressive private cars cutting into safety distances on highway entry ramps.
            </p>
          </div>
        </div>
      </div>

      {/* 4-Step Lifecycle */}
      <div className="bg-white border border-[#e1ddd0] rounded p-6 shadow-2xs space-y-4">
        <h2 className="font-heading font-bold text-lg text-[#202226]">
          The 4-Step Incident Lifecycle
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-3.5 rounded border border-[#e1ddd0] bg-[#faf9f6] space-y-1">
            <div className="text-xs font-bold text-[#7A1315]">1. Report</div>
            <div className="text-xs font-semibold text-[#202226]">Employee Submits</div>
            <p className="text-[11px] text-[#6b7178] leading-relaxed">
              Driver or staff fills form in 2 minutes with photos or video notes.
            </p>
          </div>

          <div className="p-3.5 rounded border border-[#e1ddd0] bg-[#faf9f6] space-y-1">
            <div className="text-xs font-bold text-[#7A1315]">2. Acknowledge</div>
            <div className="text-xs font-semibold text-[#202226]">EHS Review</div>
            <p className="text-[11px] text-[#6b7178] leading-relaxed">
              Safety manager logs receipt, updates status to &apos;Under Review&apos;.
            </p>
          </div>

          <div className="p-3.5 rounded border border-[#e1ddd0] bg-[#faf9f6] space-y-1">
            <div className="text-xs font-bold text-[#7A1315]">3. Correct</div>
            <div className="text-xs font-semibold text-[#202226]">Physical Action</div>
            <p className="text-[11px] text-[#6b7178] leading-relaxed">
              Engineering, mechanical repair, or briefing implemented on-site.
            </p>
          </div>

          <div className="p-3.5 rounded border border-[#e1ddd0] bg-[#faf9f6] space-y-1">
            <div className="text-xs font-bold text-[#7A1315]">4. Feedback</div>
            <div className="text-xs font-semibold text-[#202226]">Worker Confirms</div>
            <p className="text-[11px] text-[#6b7178] leading-relaxed">
              Employee inspects feedback note, confirms closure, and audit closes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
