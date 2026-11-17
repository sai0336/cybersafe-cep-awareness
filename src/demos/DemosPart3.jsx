import React, { useState, useEffect } from 'react';
import { Printer, RotateCcw } from 'lucide-react';
import { SimpleResultBox } from './DemosPart1';

/* ============================================================================
   ACTIVITY 17: Public Wi-Fi and Bluetooth Safety
   Choose Wi-Fi network + Respond to unexpected Bluetooth connection request
============================================================================ */
export function Demo17WifiBluetooth({ onComplete }) {
  const [wifiChoice, setWifiChoice] = useState('open'); // 'open' | 'mobile'
  const [btChoice, setBtChoice] = useState('accept'); // 'accept' | 'reject'
  const [tested, setTested] = useState(false);

  const isSafe = wifiChoice === 'mobile' && btChoice === 'reject';

  const handleTest = () => {
    setTested(true);
    if (isSafe && onComplete) onComplete();
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4">
        <div className="text-sm font-bold text-slate-900">
          Step 1 — You need to check your bank account at a busy railway station. Choose your Wi-Fi
          and Bluetooth actions:
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Wi-Fi Selection */}
          <div className="bg-white border border-slate-200 rounded p-3.5 space-y-2">
            <div className="text-xs font-bold uppercase text-slate-500">
              1. Select Internet Connection for Banking:
            </div>
            <button
              type="button"
              onClick={() => {
                setWifiChoice('open');
                setTested(false);
              }}
              className={`w-full text-left p-2.5 rounded border text-xs sm:text-sm font-semibold ${
                wifiChoice === 'open'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50 text-slate-800 border-slate-300'
              }`}
            >
              Free_Station_WiFi (Open — No Password)
            </button>
            <button
              type="button"
              onClick={() => {
                setWifiChoice('mobile');
                setTested(false);
              }}
              className={`w-full text-left p-2.5 rounded border text-xs sm:text-sm font-semibold ${
                wifiChoice === 'mobile'
                  ? 'bg-teal-600 text-white border-teal-600'
                  : 'bg-slate-50 text-slate-800 border-slate-300'
              }`}
            >
              My Own Mobile Data / Personal Hotspot
            </button>
          </div>

          {/* Bluetooth Popup */}
          <div className="bg-white border border-slate-200 rounded p-3.5 space-y-2">
            <div className="text-xs font-bold uppercase text-slate-500">
              2. Bluetooth Popup: &ldquo;Unknown_Phone wants to send Gift.apk&rdquo;
            </div>
            <button
              type="button"
              onClick={() => {
                setBtChoice('accept');
                setTested(false);
              }}
              className={`w-full text-left p-2.5 rounded border text-xs sm:text-sm font-semibold ${
                btChoice === 'accept'
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-slate-50 text-slate-800 border-slate-300'
              }`}
            >
              Accept Pairing &amp; Receive File
            </button>
            <button
              type="button"
              onClick={() => {
                setBtChoice('reject');
                setTested(false);
              }}
              className={`w-full text-left p-2.5 rounded border text-xs sm:text-sm font-semibold ${
                btChoice === 'reject'
                  ? 'bg-teal-600 text-white border-teal-600'
                  : 'bg-slate-50 text-slate-800 border-slate-300'
              }`}
            >
              Reject Request &amp; Turn Off Bluetooth
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleTest}
          className="cep-btn-primary text-xs sm:text-sm"
        >
          Check My Connection Result
        </button>
      </div>

      {tested && (
        <SimpleResultBox
          isSafe={isSafe}
          resultTitle={
            isSafe
              ? 'Safe Wireless Choices!'
              : 'Wireless Risk — Your Connection or Device Was Exposed!'
          }
          whatHappened={
            isSafe
              ? 'You used your own mobile data for banking and rejected the unknown Bluetooth file transfer, keeping your phone and bank login private.'
              : `${
                  wifiChoice === 'open'
                    ? 'Connecting to an open public Wi-Fi network allowed an attacker nearby to spy on your connection. '
                    : ''
                }${
                  btChoice === 'accept'
                    ? 'Accepting an unknown Bluetooth pairing request allowed a stranger to send a harmful ".apk" file to your phone.'
                    : ''
                }`
          }
          safeSolution="Use your own mobile data (not open public Wi-Fi) when logging into banking apps, and always reject Bluetooth requests from unknown devices."
          onReset={() => setTested(false)}
        />
      )}
    </div>
  );
}

/* ============================================================================
   ACTIVITY 18: Email Security and Attachment Safety
   Inspect sample attachments -> Open or Delete/Report
============================================================================ */
const SAMPLE_ATTACHMENTS = [
  {
    id: 'a1',
    name: 'Urgent_Invoice.pdf.exe',
    sender: 'billing@unknown-mail.xyz',
    realType: '.exe (Executable computer program)',
    isSafeFile: false,
    msg: 'Even though ".pdf" is in the name, the real ending is ".exe". Opening it ran a harmful virus program on the computer!'
  },
  {
    id: 'a2',
    name: 'Salary_Update_Locked.zip (Password: 1234)',
    sender: 'hr-notice@outside-mail.top',
    realType: '.zip (Password-locked archive hiding malware)',
    isSafeFile: false,
    msg: 'Scammers lock ".zip" files with a password so email virus scanners cannot see the virus inside. Opening it infected the computer!'
  },
  {
    id: 'a3',
    name: 'College_Timetable_Sem4.pdf',
    sender: 'prof.sharma@citycollege.edu.in',
    realType: '.pdf (Genuine PDF document from your teacher)',
    isSafeFile: true,
    msg: 'This is a real ".pdf" file sent by your known college teacher.'
  }
];

export function Demo18EmailAttachments({ onComplete }) {
  const [selectedId, setSelectedId] = useState('a1');
  const [inspected, setInspected] = useState(false);
  const [action, setAction] = useState(null); // 'open' | 'delete' | null

  const file = SAMPLE_ATTACHMENTS.find((a) => a.id === selectedId) || SAMPLE_ATTACHMENTS[0];

  const handleAction = (choice) => {
    setAction(choice);
    const safe =
      (choice === 'delete' && !file.isSafeFile) || (choice === 'open' && file.isSafeFile);
    if (safe && onComplete) onComplete();
  };

  const isSafeOutcome =
    (action === 'delete' && !file.isSafeFile) || (action === 'open' && file.isSafeFile);

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4">
        <div className="text-sm font-bold text-slate-900">
          Step 1 — Select an email attachment to inspect:
        </div>

        <div className="flex flex-wrap gap-2">
          {SAMPLE_ATTACHMENTS.map((att) => (
            <button
              key={att.id}
              type="button"
              onClick={() => {
                setSelectedId(att.id);
                setInspected(false);
                setAction(null);
              }}
              className={`px-3 py-1.5 rounded text-xs font-mono font-semibold border ${
                selectedId === att.id
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-800 border-slate-300'
              }`}
            >
              {att.name}
            </button>
          ))}
        </div>

        <div className="bg-white border border-slate-300 rounded-md p-4 space-y-3 text-xs sm:text-sm">
          <div>
            <strong>Attachment Name:</strong> <code className="font-bold">{file.name}</code>
          </div>
          <div>
            <strong>Sender Email:</strong> <code>{file.sender}</code>
          </div>

          {inspected && (
            <div className="bg-amber-50 border border-amber-300 rounded p-2.5 text-xs text-amber-950">
              <strong>File Inspection:</strong> Real file type after the last dot is{' '}
              <strong>{file.realType}</strong>.
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="button"
              onClick={() => setInspected(true)}
              className="cep-btn-secondary text-xs py-1.5 px-3"
            >
              1. Inspect File Ending
            </button>
            <button
              type="button"
              onClick={() => handleAction('open')}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-1.5 px-3.5 rounded"
            >
              2. Open Attachment
            </button>
            <button
              type="button"
              onClick={() => handleAction('delete')}
              className="cep-btn-teal text-xs py-1.5 px-3.5"
            >
              3. Delete &amp; Report Suspicious File
            </button>
          </div>
        </div>
      </div>

      {action && (
        <SimpleResultBox
          isSafe={isSafeOutcome}
          resultTitle={
            isSafeOutcome
              ? 'Safe Attachment Decision!'
              : 'Unsafe Decision — You Opened a Harmful Attachment!'
          }
          whatHappened={file.msg}
          safeSolution="Always check the letters after the VERY LAST dot (never open .pdf.exe or unexpected password-locked .zip files from strangers)."
          onReset={() => {
            setAction(null);
            setInspected(false);
          }}
        />
      )}
    </div>
  );
}

/* ============================================================================
   ACTIVITY 19: Cyberbullying and Responsible Online Behaviour
   Fictional conversation -> Reply, Delete, or Save Evidence + Block & Report
============================================================================ */
export function Demo19Cyberbullying({ onComplete }) {
  const [choice, setChoice] = useState(null); // 'angry' | 'delete' | 'safe' | null

  const handleChoose = (mode) => {
    setChoice(mode);
    if (mode === 'safe' && onComplete) onComplete();
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4">
        <div className="text-sm font-bold text-slate-900">
          Step 1 — Read this message in a student chat group:
        </div>

        <div className="bg-white border border-slate-300 rounded-md p-4 text-sm text-slate-800">
          <strong>@troll_account_99:</strong> &ldquo;Look at this embarrassing photo of Rohan—let’s
          share it in every group and make fun of him!&rdquo;
        </div>

        <div className="space-y-2">
          <div className="text-sm font-bold text-slate-900">
            Step 2 — Choose how to respond:
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => handleChoose('angry')}
              className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold py-2 px-3.5 rounded"
            >
              1. Reply With Angry Insults
            </button>
            <button
              type="button"
              onClick={() => handleChoose('delete')}
              className="bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold py-2 px-3.5 rounded"
            >
              2. Delete the Chat Right Away
            </button>
            <button
              type="button"
              onClick={() => handleChoose('safe')}
              className="cep-btn-teal text-xs sm:text-sm py-2 px-3.5"
            >
              3. Save Screenshot Evidence, Block, Report &amp; Tell a Trusted Adult
            </button>
          </div>
        </div>
      </div>

      {choice && (
        <SimpleResultBox
          isSafe={choice === 'safe'}
          resultTitle={
            choice === 'safe'
              ? 'Safe & Responsible Response!'
              : choice === 'angry'
              ? 'The Fight Got Worse!'
              : 'You Lost the Proof Needed to Report the Bully!'
          }
          whatHappened={
            choice === 'angry'
              ? 'Replying with insults made the argument worse, and both accounts received a warning.'
              : choice === 'delete'
              ? 'Because you deleted the chat before taking a screenshot, there was no proof of the username or messages when you tried to report it.'
              : 'You took a screenshot as proof first, blocked and reported the account, supported your classmate, and informed a teacher.'
          }
          safeSolution="Do not reply in anger. Always save a screenshot showing the username and time first, then block, report, and talk to a parent or teacher."
          onReset={() => setChoice(null)}
        />
      )}
    </div>
  );
}

/* ============================================================================
   ACTIVITY 20: Cyber Safety for Families and Senior Citizens
   Everyday situations + Large Text option + Printable Checklist
============================================================================ */
const SENIOR_SITUATIONS = [
  {
    id: 's1',
    title: '1. Fake Bank / Pension Call',
    message:
      'Caller says: "Your pension account will close today! Tell me the 6-digit OTP on your phone right now."',
    unsafeBtn: 'Tell Caller the OTP',
    safeBtn: 'Hang Up & Call a Family Member',
    unsafeText: 'The scammer used your OTP to steal ₹25,000 from the pension account.',
    safeText: 'You hung up and asked your family member. Banks never ask for an OTP on a call.'
  },
  {
    id: 's2',
    title: '2. Fake "Relative in Police Trouble" Call',
    message:
      'Caller says: "Your nephew caused an accident! Send ₹15,000 via UPI right now and do not tell anyone."',
    unsafeBtn: 'Send ₹15,000 in Panic',
    safeBtn: 'Hang Up & Call Nephew’s Real Number',
    unsafeText: 'It was a scammer lying to scare you. Your nephew was completely safe.',
    safeText: 'Calling your nephew’s real number proved he was safe at college and stopped the scam.'
  }
];

export function Demo20FamilySeniors({ onComplete }) {
  const [idx, setIdx] = useState(0);
  const [choice, setChoice] = useState(null); // 'unsafe' | 'safe' | null
  const [largeText, setLargeText] = useState(true);

  const item = SENIOR_SITUATIONS[idx];

  const handleAction = (mode) => {
    setChoice(mode);
    if (mode === 'safe' && onComplete) onComplete();
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 no-print">
          <div className="flex gap-2">
            {SENIOR_SITUATIONS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setIdx(i);
                  setChoice(null);
                }}
                className={`px-3 py-1.5 rounded text-xs font-bold border ${
                  idx === i
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setLargeText(!largeText)}
              className="cep-btn-secondary text-xs py-1 px-2.5"
            >
              {largeText ? 'Normal Text' : 'Large Text (A+)'}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="cep-btn-secondary text-xs py-1 px-2.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Rules</span>
            </button>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-300 rounded-md p-4 space-y-3">
          <div className={`${largeText ? 'text-lg' : 'text-sm'} font-bold text-slate-900`}>
            {item.title}
          </div>
          <p className={`${largeText ? 'text-base' : 'text-sm'} text-slate-800 m-0`}>
            {item.message}
          </p>

          <div className="flex flex-wrap gap-2.5 pt-1 no-print">
            <button
              type="button"
              onClick={() => handleAction('unsafe')}
              className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold py-2 px-4 rounded"
            >
              {item.unsafeBtn}
            </button>
            <button
              type="button"
              onClick={() => handleAction('safe')}
              className="cep-btn-teal text-xs sm:text-sm py-2 px-4"
            >
              {item.safeBtn}
            </button>
          </div>
        </div>
      </div>

      {choice && (
        <SimpleResultBox
          isSafe={choice === 'safe'}
          resultTitle={choice === 'safe' ? 'Safe Choice!' : 'Scam Trap Triggered!'}
          whatHappened={choice === 'safe' ? item.safeText : item.unsafeText}
          safeSolution="Whenever a caller tries to rush or scare you, hang up right away and call a family member to check."
          onReset={() => setChoice(null)}
        />
      )}

      {/* Simple Printable Family Checklist */}
      <div className="printable-area bg-white border border-slate-300 rounded-md p-4 text-xs sm:text-sm space-y-1">
        <div className="font-bold text-slate-900">
          3 Golden Rules for Families &amp; Senior Citizens (Printable):
        </div>
        <ul className="list-disc pl-5 m-0 space-y-1 text-slate-700">
          <li>Never share any OTP, ATM PIN, or UPI PIN with anyone on a phone call.</li>
          <li>Never install screen-sharing apps (like AnyDesk) when asked by a caller.</li>
          <li>If a caller says a relative is in trouble, hang up and call your family first.</li>
        </ul>
      </div>
    </div>
  );
}

/* ============================================================================
   ACTIVITY 21: AI-Generated Scams, Deepfakes and Misinformation
   Fictional voice call / video -> Trust, Share, or Verify Through Another Channel
============================================================================ */
export function Demo21AiDeepfakes({ onComplete }) {
  const [choice, setChoice] = useState(null); // 'trust' | 'share' | 'verify' | null

  const handlePick = (mode) => {
    setChoice(mode);
    if (mode === 'verify' && onComplete) onComplete();
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4">
        <div className="text-sm font-bold text-slate-900">
          Step 1 — Read this suspicious call transcript and viral video message:
        </div>

        <div className="bg-white border border-slate-300 rounded-md p-4 space-y-2 text-sm text-slate-800">
          <div>
            <strong>Call from Unknown Number (+91-70XXXXXX88):</strong> A voice that sounds just
            like your cousin says: &ldquo;My phone broke! Send ₹10,000 urgently to this stranger’s
            UPI number right now!&rdquo;
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-bold text-slate-900">
            Step 2 — What do you do?
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => handlePick('trust')}
              className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold py-2 px-3.5 rounded"
            >
              1. Trust the Voice &amp; Send ₹10,000
            </button>
            <button
              type="button"
              onClick={() => handlePick('share')}
              className="bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold py-2 px-3.5 rounded"
            >
              2. Forward Unverified Message to Groups
            </button>
            <button
              type="button"
              onClick={() => handlePick('verify')}
              className="cep-btn-teal text-xs sm:text-sm py-2 px-3.5"
            >
              3. Hang Up &amp; Call Cousin’s Saved Number to Verify
            </button>
          </div>
        </div>
      </div>

      {choice && (
        <SimpleResultBox
          isSafe={choice === 'verify'}
          resultTitle={
            choice === 'verify'
              ? 'Safe Choice — Independent Verification Stopped the AI Scam!'
              : 'Unsafe Choice — Fooled by Fake AI Media!'
          }
          whatHappened={
            choice === 'trust'
              ? 'Scammers used an AI voice tool to copy your cousin’s voice from a social media video. Because you sent ₹10,000 without calling their real number, your money was stolen.'
              : choice === 'share'
              ? 'Forwarding unverified sensational messages spreads panic and misinformation to your friends and family.'
              : 'When you hung up and called your cousin’s saved phone number directly, they answered and confirmed they were safe and never asked for money.'
          }
          safeSolution="AI can imitate voices and faces. Always verify unexpected money requests by calling the person’s real saved phone number."
          onReset={() => setChoice(null)}
        />
      )}
    </div>
  );
}

/* ============================================================================
   ACTIVITY 22: Cyber Incident Response and Reporting
   Compromised-account recovery steps -> Shows consequence if any step is skipped
============================================================================ */
export function Demo22IncidentResponse({ onComplete }) {
  const [steps, setSteps] = useState({
    endSessions: false,
    changePass: true,
    saveEvidenceAndReport: false
  });
  const [tested, setTested] = useState(false);

  const toggleStep = (key) => {
    setSteps((prev) => ({ ...prev, [key]: !prev[key] }));
    setTested(false);
  };

  const skipped = [];
  if (!steps.changePass) skipped.push('you did not change the password, so the attacker still knows it');
  if (!steps.endSessions) skipped.push('you skipped ending suspicious login sessions, so the attacker stayed logged in on their device');
  if (!steps.saveEvidenceAndReport) skipped.push('you skipped saving screenshots/UTR details and reporting on 1930, making fraud recovery much harder');

  const isSafe = skipped.length === 0;

  const handleCompleteRecovery = () => {
    setTested(true);
    if (isSafe && onComplete) onComplete();
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
        <div className="text-sm font-bold text-slate-900">
          Step 1 — Your account was just accessed from an unknown device. Select your recovery steps
          below (see what happens if you skip a step):
        </div>

        <div className="space-y-2">
          {[
            {
              key: 'changePass',
              title: '1. Change Account Password & Enable 2FA'
            },
            {
              key: 'endSessions',
              title: '2. End / Log Out All Suspicious Active Sessions'
            },
            {
              key: 'saveEvidenceAndReport',
              title: '3. Save Screenshots / UTR Proof & Call Bank / 1930 Helpline'
            }
          ].map((item) => (
            <label
              key={item.key}
              className="flex items-center justify-between gap-3 bg-white border border-slate-200 rounded p-3 cursor-pointer text-xs sm:text-sm"
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={steps[item.key]}
                  onChange={() => toggleStep(item.key)}
                  className="h-4 w-4 accent-teal-600"
                />
                <span className="font-bold text-slate-900">{item.title}</span>
              </div>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded ${
                  steps[item.key]
                    ? 'bg-emerald-100 text-emerald-900'
                    : 'bg-red-100 text-red-900'
                }`}
              >
                {steps[item.key] ? 'Completed' : 'Skipped'}
              </span>
            </label>
          ))}
        </div>

        <button
          type="button"
          onClick={handleCompleteRecovery}
          className="cep-btn-primary text-xs sm:text-sm"
        >
          Check My Recovery Result
        </button>
      </div>

      {tested && (
        <SimpleResultBox
          isSafe={isSafe}
          resultTitle={
            isSafe
              ? 'Account Secured & Incident Reported Properly!'
              : `Incomplete Recovery (${skipped.length} step${skipped.length > 1 ? 's' : ''} skipped)`
          }
          whatHappened={
            isSafe
              ? 'You changed your password, logged out the attacker’s active session, saved screenshot proof, and contacted your bank and the 1930 helpline.'
              : `Because ${skipped.join('; and ')}, the incident was not fully contained.`
          }
          safeSolution="Check all 3 boxes above: change your password, end all active sessions, and save evidence before reporting to your bank and 1930 / cybercrime.gov.in."
          onReset={() => setTested(false)}
        />
      )}
    </div>
  );
}

/* ============================================================================
   ACTIVITY 23: Online Gaming and Account Safety
   Fictional reward links, account-trading offers, and friend requests
============================================================================ */
const GAMING_ITEMS = [
  {
    id: 'g1',
    title: '1. Free Reward Link: "Enter your game password at free-diamonds.xyz"',
    unsafeBtn: 'Enter Game Password for Free Diamonds',
    safeBtn: 'Ignore Fake Reward Link',
    unsafeText: 'The fake website stole your login and locked you out of your gaming account!',
    safeText: 'You ignored the fake reward site and kept your gaming account safe.'
  },
  {
    id: 'g2',
    title: '2. Account-Trading Offer: "Send ₹500 on UPI first to buy my Pro Account"',
    unsafeBtn: 'Send ₹500 via UPI to Stranger',
    safeBtn: 'Refuse Account Trade',
    unsafeText: 'As soon as you sent ₹500, the stranger blocked you in chat and gave you nothing.',
    safeText: 'You refused the informal account trade and protected your ₹500.'
  },
  {
    id: 'g3',
    title: '3. Unknown Player Friend Request: "Tell me your home address and phone number"',
    unsafeBtn: 'Share Home Address & Phone Number',
    safeBtn: 'Keep Personal Info Private',
    unsafeText: 'Sharing your real home address and phone number with a stranger in game chat put your privacy at risk.',
    safeText: 'You kept your personal contact details private while playing online.'
  }
];

export function Demo23OnlineGaming({ onComplete }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [choice, setChoice] = useState(null); // 'unsafe' | 'safe' | null

  const current = GAMING_ITEMS[selectedIdx];

  const handleAction = (mode) => {
    setChoice(mode);
    if (mode === 'safe' && onComplete) onComplete();
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4">
        <div className="text-sm font-bold text-slate-900">
          Step 1 — Select a situation in the online game lobby:
        </div>

        <div className="flex flex-wrap gap-2">
          {GAMING_ITEMS.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSelectedIdx(i);
                setChoice(null);
              }}
              className={`px-3 py-1.5 rounded text-xs font-semibold border ${
                selectedIdx === i
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-300'
              }`}
            >
              Scenario {i + 1}
            </button>
          ))}
        </div>

        <div className="bg-white border border-slate-300 rounded-md p-4 space-y-3">
          <div className="text-sm font-bold text-slate-900">{current.title}</div>
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => handleAction('unsafe')}
              className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold py-2 px-3.5 rounded"
            >
              {current.unsafeBtn}
            </button>
            <button
              type="button"
              onClick={() => handleAction('safe')}
              className="cep-btn-teal text-xs sm:text-sm py-2 px-3.5"
            >
              {current.safeBtn}
            </button>
          </div>
        </div>
      </div>

      {choice && (
        <SimpleResultBox
          isSafe={choice === 'safe'}
          resultTitle={
            choice === 'safe' ? 'Safe Gaming Decision!' : 'Unsafe Gaming Decision!'
          }
          whatHappened={choice === 'safe' ? current.safeText : current.unsafeText}
          safeSolution="Never enter your game password on outside websites, avoid paying strangers in chat for accounts, and never share your home address with unknown players."
          onReset={() => setChoice(null)}
        />
      )}
    </div>
  );
}

/* ============================================================================
   ACTIVITY 24: Knowledge Review, Questions and Feedback
   Simple interactive quiz + optional local feedback form
============================================================================ */
const QUIZ_ITEMS = [
  {
    id: 1,
    q: '1. Which of these sample passwords is the safest?',
    options: ['123456', 'sai123', 'Banyan-Train-48-River!'],
    ans: 2,
    exp: 'A longer, unique passphrase is much harder to guess than short common passwords.'
  },
  {
    id: 2,
    q: '2. Someone sends a UPI request and says: "Enter your UPI PIN to receive ₹2,000." What happens if you enter your PIN?',
    options: [
      'You receive ₹2,000.',
      '₹2,000 is taken OUT of your bank account.',
      'Nothing happens.'
    ],
    ans: 1,
    exp: 'You never need to enter a UPI PIN to receive money. A UPI PIN is only for sending money out.'
  },
  {
    id: 3,
    q: '3. An email from <alert@bank-check.xyz> tells you to click a link or your account will close in 1 hour. What should you do?',
    options: [
      'Click the link and type your password quickly.',
      'Do not click the link; check your account using your official banking app.',
      'Reply with your ATM PIN.'
    ],
    ans: 1,
    exp: 'Scammers use fake email addresses and urgent threats to trick you into clicking phishing links.'
  },
  {
    id: 4,
    q: '4. What is the official National Cyber Crime Helpline number in India for reporting online financial fraud?',
    options: ['1930', '9999', '1234'],
    ans: 0,
    exp: 'Call 1930 or report at cybercrime.gov.in immediately if online financial fraud occurs.'
  }
];

export function Demo24FinalQuizFeedback({ onComplete }) {
  const [answers, setAnswers] = useState({});
  const [feedbackText, setFeedbackText] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  const [savedMsg, setSavedMsg] = useState('');

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('cybersafe_cep_local_feedback');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setSavedNotes(parsed);
      }
    } catch {
      // Ignore
    }
  }, []);

  const score = QUIZ_ITEMS.filter((q) => answers[q.id] === q.ans).length;
  const answeredCount = Object.keys(answers).length;

  const handleAnswer = (qId, idx) => {
    const next = { ...answers, [qId]: idx };
    setAnswers(next);
    if (Object.keys(next).length === QUIZ_ITEMS.length && onComplete) {
      onComplete();
    }
  };

  const handleSaveFeedback = (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    const updated = [
      { id: Date.now(), text: feedbackText.trim(), date: new Date().toLocaleDateString('en-IN') },
      ...savedNotes
    ];
    setSavedNotes(updated);
    setFeedbackText('');
    setSavedMsg('Saved locally in this browser (never sent to any server).');
    try {
      window.localStorage.setItem('cybersafe_cep_local_feedback', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm font-bold text-slate-900">
            Quick Review Quiz — Score: {score} / {QUIZ_ITEMS.length}
          </div>
          <button
            type="button"
            onClick={() => setAnswers({})}
            className="cep-btn-secondary text-xs py-1 px-3 bg-white"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart Quiz</span>
          </button>
        </div>

        <div className="space-y-3">
          {QUIZ_ITEMS.map((item) => {
            const picked = answers[item.id];
            const hasPicked = picked !== undefined;
            return (
              <div key={item.id} className="bg-white border border-slate-200 rounded p-3.5 space-y-2">
                <div className="text-sm font-bold text-slate-900">{item.q}</div>
                <div className="space-y-1.5">
                  {item.options.map((opt, idx) => {
                    let btnStyle = 'bg-slate-50 text-slate-800 border-slate-300 hover:bg-slate-100';
                    if (hasPicked) {
                      if (idx === item.ans) {
                        btnStyle = 'bg-emerald-600 text-white border-emerald-600 font-semibold';
                      } else if (idx === picked) {
                        btnStyle = 'bg-red-600 text-white border-red-600';
                      }
                    }
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleAnswer(item.id, idx)}
                        className={`w-full text-left p-2 rounded border text-xs sm:text-sm ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {hasPicked && (
                  <div className="text-xs text-slate-700 bg-slate-50 p-2 rounded border border-slate-200">
                    <strong>{picked === item.ans ? 'Correct!' : 'Explanation:'}</strong> {item.exp}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {answeredCount === QUIZ_ITEMS.length && (
          <div className="bg-emerald-50 border border-emerald-300 rounded p-3 text-sm text-emerald-950 font-semibold">
            You completed the quiz with a score of {score} out of {QUIZ_ITEMS.length}!
          </div>
        )}
      </div>

      {/* Optional Local Feedback Form */}
      <form
        onSubmit={handleSaveFeedback}
        className="bg-white border border-slate-200 rounded-lg p-4 space-y-3"
      >
        <div className="text-sm font-bold text-slate-900">
          Optional Feedback Note (Stored Locally in Your Browser Only)
        </div>
        <textarea
          rows={2}
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder="Write a short comment or takeaway from this demonstration..."
          className="w-full border border-slate-300 rounded p-2.5 text-sm"
        />
        <button type="submit" className="cep-btn-teal text-xs py-2 px-4">
          Save Feedback Locally
        </button>
        {savedMsg && <div className="text-xs text-teal-800 font-medium">{savedMsg}</div>}
        {savedNotes.length > 0 && (
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            {savedNotes.map((n) => (
              <div key={n.id} className="text-xs bg-slate-50 border border-slate-200 p-2 rounded">
                <strong>{n.date}:</strong> {n.text}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}
