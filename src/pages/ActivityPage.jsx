import React from 'react';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { ACTIVITIES_DATA } from '../data/activitiesData';
import { StandardActivityLayout } from '../components/StandardActivityLayout';
import {
  Demo01Intro,
  Demo02Threats,
  Demo03Passwords,
  Demo04PasswordManager,
  Demo05TwoFactor,
  Demo06OtpSafety,
  Demo07Phishing,
  Demo08LinksAndQr
} from '../demos/DemosPart1';
import {
  Demo09UpiSafety,
  Demo10CustomerCare,
  Demo11SocialPrivacy,
  Demo12InfoClassification,
  Demo13OnlineShopping,
  Demo14SecureBrowsing,
  Demo15AppPermissions,
  Demo16DeviceSecurity
} from '../demos/DemosPart2';
import {
  Demo17WifiBluetooth,
  Demo18EmailAttachments,
  Demo19Cyberbullying,
  Demo20FamilySeniors,
  Demo21AiDeepfakes,
  Demo22IncidentResponse,
  Demo23OnlineGaming,
  Demo24FinalQuizFeedback
} from '../demos/DemosPart3';

const DEMO_COMPONENTS = {
  1: Demo01Intro,
  2: Demo02Threats,
  3: Demo03Passwords,
  4: Demo04PasswordManager,
  5: Demo05TwoFactor,
  6: Demo06OtpSafety,
  7: Demo07Phishing,
  8: Demo08LinksAndQr,
  9: Demo09UpiSafety,
  10: Demo10CustomerCare,
  11: Demo11SocialPrivacy,
  12: Demo12InfoClassification,
  13: Demo13OnlineShopping,
  14: Demo14SecureBrowsing,
  15: Demo15AppPermissions,
  16: Demo16DeviceSecurity,
  17: Demo17WifiBluetooth,
  18: Demo18EmailAttachments,
  19: Demo19Cyberbullying,
  20: Demo20FamilySeniors,
  21: Demo21AiDeepfakes,
  22: Demo22IncidentResponse,
  23: Demo23OnlineGaming,
  24: Demo24FinalQuizFeedback
};

export function ActivityPage({ routePath, onNavigate, completedIds = [], onMarkComplete }) {
  const activity = ACTIVITIES_DATA.find((a) => a.route === routePath);

  if (!activity) {
    return (
      <main className="cep-container py-12">
        <div className="cep-card p-8 text-center bg-white max-w-lg mx-auto space-y-4">
          <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" />
          <h1 className="text-xl font-bold text-slate-900 m-0">Activity Page Not Found</h1>
          <p className="text-sm text-slate-600 m-0">
            The route <code>{routePath}</code> does not match one of the 24 CEP activities.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="cep-btn-primary text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage (All 24 Activities)</span>
          </button>
        </div>
      </main>
    );
  }

  const DemoComponent = DEMO_COMPONENTS[activity.id] || Demo01Intro;
  const isCompleted = completedIds.includes(activity.id);

  return (
    <StandardActivityLayout
      activity={activity}
      onNavigate={onNavigate}
      isCompleted={isCompleted}
      onMarkComplete={onMarkComplete}
    >
      <DemoComponent
        onComplete={() => onMarkComplete && onMarkComplete(activity.id)}
        completedIds={completedIds}
        onNavigate={onNavigate}
      />
    </StandardActivityLayout>
  );
}
