import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  Mail,
  Lock,
  ExternalLink
} from 'lucide-react';

/* ============================================================================
   SHARED RESULT CARD: Simple 4-part outcome (Result, What Happened, Safe Solution, Restart)
============================================================================ */
export function SimpleResultBox({
  isSafe,
  resultTitle,
  whatHappened,
  safeSolution,
  extraContent,
  onReset
}) {
  return (
    <div
      className={`rounded-lg border-2 p-4 sm:p-5 space-y-3 mt-4 ${
        isSafe
          ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
          : 'bg-red-50 border-red-400 text-red-950'
      }`}
    >
      <div className="flex items-center gap-2 font-bold text-base sm:text-lg">
        {isSafe ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
        ) : (
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
        )}
        <span>{resultTitle}</span>
      </div>

      {extraContent && <div>{extraContent}</div>}

      <div className="bg-white/90 border border-current/20 rounded p-3 text-sm space-y-1">
        <div className="font-bold">What happened:</div>
        <p className="m-0 leading-relaxed">{whatHappened}</p>
      </div>

      <div className="bg-white/90 border border-current/20 rounded p-3 text-sm space-y-1">
        <div className="font-bold text-teal-900">Safe solution:</div>
        <p className="m-0 leading-relaxed text-slate-800">{safeSolution}</p>
      </div>

      {onReset && (
        <div className="pt-1">
          <button
            type="button"
            onClick={onReset}
            className="cep-btn-secondary text-xs sm:text-sm py-2 px-4 bg-white"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   ACTIVITY 01: Introduction to Cyber Security Awareness
   Interactive 4-Switch Digital Life Setup -> Dynamic Safety Check
============================================================================ */
export function Demo01Intro({ onComplete }) {
  const [locks, setLocks] = useState({
    phonePin: false,
    strongEmailPass: true,
    upiCheck: true,
    privateSocial: false
  });
  const [tested, setTested] = useState(false);

  const toggleItem = (key) => {
    setLocks((prev) => ({ ...prev, [key]: !prev[key] }));
    setTested(false);
  };

  const handleTestSetup = () => {
    setTested(true);
    if (locks.phonePin && locks.strongEmailPass && locks.upiCheck && locks.privateSocial) {
      if (onComplete) onComplete();
    }
  };

  const weakAreas = [];
  if (!locks.phonePin) weakAreas.push('your unlocked phone allowed someone to read your email and bank OTPs');
  if (!locks.strongEmailPass) weakAreas.push('your weak email password allowed an attacker to reset your other accounts');
  if (!locks.upiCheck) weakAreas.push('an unverified payment request took money from your UPI app');
  if (!locks.privateSocial) weakAreas.push('strangers copied your public profile photos and contact list');

  const allSafe = weakAreas.length === 0;

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
        <div className="text-sm font-bold text-slate-900">
          Step 1 — Turn protections ON or OFF for Rohan’s digital life:
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              key: 'phonePin',
              title: '1. Phone Screen Lock PIN',
              desc: locks.phonePin ? 'ON: Phone screen is locked with a PIN.' : 'OFF: Anyone can pick up and open the phone.'
            },
            {
              key: 'strongEmailPass',
              title: '2. Strong Email Password',
              desc: locks.strongEmailPass ? 'ON: Email uses a strong unique password.' : 'OFF: Email uses "123456".'
            },
            {
              key: 'upiCheck',
              title: '3. Verify UPI Payment Requests',
              desc: locks.upiCheck ? 'ON: Checks name and amount before paying.' : 'OFF: Enters UPI PIN without reading.'
            },
            {
              key: 'privateSocial',
              title: '4. Private Social Media Profile',
              desc: locks.privateSocial ? 'ON: Only friends can see photos.' : 'OFF: Anyone online can see photos and friends.'
            }
          ].map((item) => {
            const isOn = locks[item.key];
            return (
              <div
                key={item.key}
                className="bg-white border border-slate-200 rounded-md p-3.5 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="text-sm font-bold text-slate-900">{item.title}</div>
                  <div className={`text-xs mt-0.5 ${isOn ? 'text-emerald-700' : 'text-red-700'}`}>
                    {item.desc}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleItem(item.key)}
                  className={`px-3 py-1.5 rounded text-xs font-bold border shrink-0 ${
                    isOn
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-100 text-slate-800 border-slate-300'
                  }`}
                >
                  {isOn ? 'ON' : 'OFF'}
                </button>
              </div>
            );
          })}
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleTestSetup}
            className="cep-btn-primary text-xs sm:text-sm"
          >
            Test My Setup
          </button>
        </div>
      </div>

      {tested && (
        <SimpleResultBox
          isSafe={allSafe}
          resultTitle={
            allSafe
              ? 'All 4 areas are protected!'
              : `Security Risk Found (${weakAreas.length} unprotected area${weakAreas.length > 1 ? 's' : ''})`
          }
          whatHappened={
            allSafe
              ? 'Because you turned ON all four protections, a stranger could not unlock Rohan’s phone, guess his email password, or trick him on UPI.'
              : `In this test, ${weakAreas.join(', and ')}. One weak spot put the rest of your accounts in danger.`
          }
          safeSolution="Turn ON all 4 switches above—lock your phone screen, use a strong email password, check UPI details before paying, and keep your social profile private."
          onReset={() => setTested(false)}
        />
      )}
    </div>
  );
}

/* ============================================================================
   ACTIVITY 02: Recognising Common Online Threats
   Interactive Notification Simulator
============================================================================ */
const THREAT_MESSAGES = [
  {
    id: 't1',
    type: 'Phishing SMS',
    sender: '+91-98XXXXXX12',
    text: '"URGENT: Your bank account is blocked today. Click http://sbi-update-now.xyz and enter your password and OTP."',
    unsafeActionText: 'Click the Link & Enter Password',
    safeActionText: 'Ignore Link & Check Official Bank App',
    consequence:
      'You opened a fake website ("sbi-update-now.xyz"). When you typed your password and OTP, the scammer stole your login and took money from your account.',
    safeMsg:
      'You spotted the fake ".xyz" link and personal phone number. By checking your official banking app instead, your account stayed safe.'
  },
  {
    id: 't2',
    type: 'Malware App Download',
    sender: 'Free_Movies_Channel',
    text: '"Download Cinema_VIP_Free.apk to watch new movies for free! Allow SMS permissions when installing."',
    unsafeActionText: 'Install the .apk File',
    safeActionText: 'Delete the .apk File',
    consequence:
      'The unofficial ".apk" file installed a hidden virus on your phone that secretly reads your bank OTP messages.',
    safeMsg:
      'You refused to install an unknown ".apk" file from a chat group. Your phone stayed clean and safe.'
  },
  {
    id: 't3',
    type: 'Impersonation Message',
    sender: 'Unknown WhatsApp Number',
    text: '"Hi, this is your cousin’s new number. I am at a hospital and my UPI is not working. Please send ₹3,000 urgently."',
    unsafeActionText: 'Send ₹3,000 Immediately',
    safeActionText: 'Call Cousin’s Saved Number First',
    consequence:
      'You sent ₹3,000 without checking. A scammer had copied your cousin’s photo to trick you, and your money was lost.',
    safeMsg:
      'You called your cousin’s real saved phone number first and found out they were fine and never asked for money.'
  }
];

export function Demo02Threats({ onComplete }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [choice, setChoice] = useState(null); // 'unsafe' | 'safe' | null

  const item = THREAT_MESSAGES[selectedIdx];

  const handleAction = (mode) => {
    setChoice(mode);
    if (mode === 'safe' && onComplete) onComplete();
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4">
        <div className="text-sm font-bold text-slate-900">
          Step 1 — Select a sample message received on your phone:
        </div>

        <div className="flex flex-wrap gap-2">
          {THREAT_MESSAGES.map((m, idx) => (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setSelectedIdx(idx);
                setChoice(null);
              }}
              className={`px-3 py-1.5 rounded text-xs font-semibold border ${
                selectedIdx === idx
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-300'
              }`}
            >
              Message {idx + 1}: {m.type}
            </button>
          ))}
        </div>

        <div className="bg-white border border-slate-300 rounded-md p-4 space-y-2">
          <div className="text-xs text-slate-500 font-semibold">From: {item.sender}</div>
          <p className="text-sm text-slate-900 font-mono m-0">{item.text}</p>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-bold text-slate-900">
            Step 2 — Choose how to respond to this message:
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => handleAction('unsafe')}
              className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold py-2 px-4 rounded"
            >
              {item.unsafeActionText}
            </button>
            <button
              type="button"
              onClick={() => handleAction('safe')}
              className="cep-btn-teal text-xs sm:text-sm py-2 px-4"
            >
              {item.safeActionText}
            </button>
          </div>
        </div>
      </div>

      {choice && (
        <SimpleResultBox
          isSafe={choice === 'safe'}
          resultTitle={
            choice === 'safe'
              ? `Safe Choice — You stopped the ${item.type}!`
              : `Unsafe Choice — You fell for the ${item.type}!`
          }
          whatHappened={choice === 'safe' ? item.safeMsg : item.consequence}
          safeSolution="Never click unknown links, never install .apk files from chats, and always call your relative’s saved phone number before sending emergency money."
          onReset={() => setChoice(null)}
        />
      )}
    </div>
  );
}

/* ============================================================================
   ACTIVITY 03: Creating Strong and Unique Passwords
   Step 1: Input + Show/Hide
   Step 2: Automatic Live Check (123456 -> Very weak, sai123 -> Weak, Mango@4821 -> Better, Long passphrase -> Potentially strong)
   Step 3: Press "Test Password" -> Simulated guessing attempts & result
   Step 4: "Try Again" button
============================================================================ */
function checkPasswordStrength(pw) {
  const trimmed = pw || '';
  const lower = trimmed.toLowerCase();

  if (!trimmed) {
    return {
      level: 'Empty',
      barWidth: 0,
      barColor: 'bg-slate-300',
      badgeColor: 'bg-slate-100 text-slate-700',
      isWeak: true,
      reasons: ['Type a sample password above to see its strength.']
    };
  }

  const veryWeakList = ['123456', '12345678', '1234567890', 'password', 'qwerty', '111111', '000000', 'admin'];
  const isVeryWeakExact = veryWeakList.includes(lower) || trimmed.length < 6 || /^\d+$/.test(trimmed);

  if (isVeryWeakExact) {
    const reasons = [];
    if (trimmed.length < 8) reasons.push('Too short.');
    if (veryWeakList.includes(lower) || /^\d+$/.test(trimmed)) reasons.push('Common password.');
    reasons.push('Easy to guess.');
    reasons.push('Try a longer, unique passphrase.');
    return {
      level: 'Very weak',
      barWidth: 20,
      barColor: 'bg-red-600',
      badgeColor: 'bg-red-100 text-red-900 border-red-300',
      isWeak: true,
      reasons
    };
  }

  // Check for simple name+number or short predictable patterns like sai123, rahul123, india123
  const isPredictableNameNum = /^[a-zA-Z]+\d{1,4}$/.test(trimmed);
  const hasCommonWord = /(password|qwerty|admin|welcome|1234|123)/i.test(trimmed);

  if (trimmed.length < 8 || isPredictableNameNum || hasCommonWord) {
    const reasons = [];
    if (trimmed.length < 10) reasons.push('Too short.');
    if (hasCommonWord) reasons.push('Common password.');
    reasons.push('Easy to guess.');
    reasons.push('Try a longer, unique passphrase.');
    return {
      level: 'Weak',
      barWidth: 45,
      barColor: 'bg-amber-500',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      isWeak: true,
      reasons
    };
  }

  // Check if it is a long, unique passphrase (14+ characters, multiple words or unpredictable)
  const isLongPassphrase = trimmed.length >= 14 && !hasCommonWord;

  if (isLongPassphrase) {
    return {
      level: 'Potentially strong',
      barWidth: 100,
      barColor: 'bg-emerald-600',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      isWeak: false,
      reasons: [
        'Good length (14+ characters).',
        'Does not use common number sequences.',
        'Make sure this passphrase is unique and never reused on other sites.'
      ]
    };
  }

  // Otherwise (e.g. Mango@4821 — 8 to 13 chars with mix and no "123" sequence)
  return {
    level: 'Better',
    barWidth: 75,
    barColor: 'bg-sky-600',
    badgeColor: 'bg-sky-100 text-sky-900 border-sky-300',
    isWeak: false,
    reasons: [
      'Better than a simple word or number sequence.',
      'Try a longer, unique passphrase (14+ characters) for even better protection.'
    ]
  };
}

export function Demo03Passwords({ onComplete }) {
  const [password, setPassword] = useState('sai123');
  const [showPassword, setShowPassword] = useState(true);
  const [tested, setTested] = useState(false);

  const info = checkPasswordStrength(password);

  const handleTestPassword = (e) => {
    if (e) e.preventDefault();
    if (!password.trim()) return;
    setTested(true);
    if (!info.isWeak && onComplete) {
      onComplete();
    }
  };

  const handleTryAgain = () => {
    setTested(false);
    setPassword('');
  };

  const weakAttempts = [
    'Attempt 1: Trying common password "123456"...',
    'Attempt 2: Trying common password "password"...',
    `Attempt 3: Trying predictable pattern "${password}" -> MATCH FOUND (Account Compromised!)`
  ];

  const strongAttempts = [
    'Attempt 1: Trying common password "123456" -> Failed',
    'Attempt 2: Trying common pattern "sai123" -> Failed',
    'Attempt 3: Trying common names and birth years -> Failed',
    'Result: Simulated guessing attempt did not succeed within this demonstration.'
  ];

  return (
    <div className="space-y-5">
      <div className="text-xs text-slate-500 bg-slate-100 border border-slate-200 rounded p-2.5">
        <strong>Note:</strong> All password checks happen locally in your browser. Never enter a
        real password. Nothing you type is saved or sent anywhere.
      </div>

      {/* STEP 1 — Create a password */}
      <form onSubmit={handleTestPassword} className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4">
        <div className="text-sm font-bold text-slate-900">
          Step 1 — Create or select a sample password
        </div>

        <div className="flex flex-wrap gap-2 items-center text-xs">
          <span className="text-slate-600 font-medium">Quick examples to click:</span>
          {[
            { label: '123456 (Very weak)', val: '123456' },
            { label: 'sai123 (Weak)', val: 'sai123' },
            { label: 'Mango@4821 (Better)', val: 'Mango@4821' },
            { label: 'Banyan-Train-48-River! (Potentially strong)', val: 'Banyan-Train-48-River!' }
          ].map((ex) => (
            <button
              key={ex.val}
              type="button"
              onClick={() => {
                setPassword(ex.val);
                setTested(false);
              }}
              className="px-2.5 py-1 rounded bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-mono"
            >
              {ex.label}
            </button>
          ))}
        </div>

        <div>
          <label
            htmlFor="demo-password-input"
            className="block text-sm font-semibold text-slate-800 mb-1.5"
          >
            Enter a sample password:
          </label>
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
            <input
              id="demo-password-input"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setTested(false);
              }}
              placeholder="Type a sample password here..."
              autoComplete="off"
              className="w-full bg-white border border-slate-300 rounded px-3.5 py-2 text-base font-mono text-slate-900 focus:border-teal-600 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="cep-btn-secondary py-2 px-3 text-xs font-semibold shrink-0"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showPassword ? 'Hide Password' : 'Show Password'}</span>
            </button>
          </div>
        </div>

        {/* STEP 2 — Check the password automatically */}
        {password && (
          <div className="bg-white border border-slate-200 rounded-md p-3.5 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase text-slate-500">
                Step 2 — Automatic Password Check:
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded border ${info.badgeColor}`}>
                Strength: {info.level}
              </span>
            </div>

            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-200 ${info.barColor}`}
                style={{ width: `${info.barWidth}%` }}
              />
            </div>

            <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-700 space-y-0.5 m-0 pt-1">
              {info.reasons.map((r, idx) => (
                <li key={idx}>{r}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Button to trigger Step 3 */}
        <div className="pt-1">
          <button
            type="submit"
            disabled={!password.trim()}
            className="cep-btn-primary text-xs sm:text-sm py-2 px-5"
          >
            Test Password
          </button>
        </div>
      </form>

      {/* STEP 3 & STEP 4 — Show what happens next & Try Again */}
      {tested && (
        <div
          className={`rounded-lg border-2 p-5 space-y-4 ${
            info.isWeak
              ? 'bg-red-50 border-red-400 text-red-950'
              : 'bg-emerald-50 border-emerald-400 text-emerald-950'
          }`}
        >
          <div className="font-bold text-base sm:text-lg flex items-center gap-2">
            {info.isWeak ? (
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
            ) : (
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            )}
            <span>
              {info.isWeak
                ? 'Step 3 Result: Fictional Account Compromised!'
                : 'Step 3 Result: Simulated Guessing Attempt Did Not Succeed'}
            </span>
          </div>

          {/* Simulated Attacker Guessing Sequence */}
          <div className="bg-slate-900 text-slate-100 rounded p-3.5 font-mono text-xs space-y-1">
            <div className="text-teal-400 font-bold mb-1">
              Simulated Attacker Guessing Sequence (Fictional Demo):
            </div>
            {(info.isWeak ? weakAttempts : strongAttempts).map((line, i) => (
              <div key={i}>&gt; {line}</div>
            ))}
          </div>

          {info.isWeak ? (
            <div className="space-y-2 text-sm">
              <p className="font-bold m-0">
                &ldquo;A weak password can make your account easier to break into.&rdquo;
              </p>
              <p className="m-0">
                <strong>Possible consequences:</strong> An attacker who guesses your password can
                read your private messages, view personal photos, or break into other accounts where
                you used the same password.
              </p>
            </div>
          ) : (
            <div className="space-y-2 text-sm">
              <p className="m-0">
                <strong>Why this is safer:</strong> A longer password or multi-word passphrase with
                unpredictable words takes much longer to guess than common names or short numbers.
              </p>
              <p className="m-0 text-xs text-slate-700">
                <strong>Important reminder:</strong> No password is 100% impossible to crack. Always
                use a unique password for each important account and turn on Two-Factor
                Authentication (2FA).
              </p>
            </div>
          )}

          {/* STEP 4 — Try Again */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleTryAgain}
              className="cep-btn-secondary bg-white text-xs sm:text-sm py-2 px-4"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   ACTIVITY 04: Password Managers and Secure Login Habits
   Compare Reusing One Password vs Using Unique Passwords in a Password Manager
============================================================================ */
export function Demo04PasswordManager({ onComplete }) {
  const [useUniqueVault, setUseUniqueVault] = useState(false);
  const [savedOnPublicPc, setSavedOnPublicPc] = useState(false);
  const [tested, setTested] = useState(false);

  const accounts = useUniqueVault
    ? [
        { name: 'Email Account', pass: 'Lotus-Train-49-Cloud!' },
        { name: 'Shopping Account', pass: 'Mango-River-83-Book#' },
        { name: 'Gaming Website', pass: 'Tiger-Kite-27-Rain$' }
      ]
    : [
        { name: 'Email Account', pass: 'sai123' },
        { name: 'Shopping Account', pass: 'sai123' },
        { name: 'Gaming Website', pass: 'sai123' }
      ];

  const handleTest = () => {
    setTested(true);
    if (useUniqueVault && !savedOnPublicPc && onComplete) {
      onComplete();
    }
  };

  const isSafe = useUniqueVault && !savedOnPublicPc;

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4">
        <div className="text-sm font-bold text-slate-900">
          Step 1 — Choose how Arjun manages his passwords:
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => {
              setUseUniqueVault(false);
              setTested(false);
            }}
            className={`px-3.5 py-2 rounded text-xs sm:text-sm font-semibold border ${
              !useUniqueVault
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-300'
            }`}
          >
            Option A: Use Same Password (&ldquo;sai123&rdquo;) Everywhere
          </button>
          <button
            type="button"
            onClick={() => {
              setUseUniqueVault(true);
              setTested(false);
            }}
            className={`px-3.5 py-2 rounded text-xs sm:text-sm font-semibold border ${
              useUniqueVault
                ? 'bg-teal-600 text-white border-teal-600'
                : 'bg-white text-slate-700 border-slate-300'
            }`}
          >
            Option B: Generate Unique Passwords in Password Manager
          </button>
        </div>

        {/* Simulated Vault Table */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {accounts.map((acc) => (
            <div key={acc.name} className="bg-white border border-slate-200 rounded p-3">
              <div className="text-xs font-bold text-slate-900">{acc.name}</div>
              <div className="text-xs font-mono text-slate-700 mt-1 bg-slate-100 px-2 py-1 rounded">
                {acc.pass}
              </div>
            </div>
          ))}
        </div>

        <label className="flex items-center gap-2 text-xs sm:text-sm text-slate-800 cursor-pointer bg-white border border-slate-200 p-3 rounded">
          <input
            type="checkbox"
            checked={savedOnPublicPc}
            onChange={() => {
              setSavedOnPublicPc(!savedOnPublicPc);
              setTested(false);
            }}
            className="h-4 w-4 accent-red-600"
          />
          <span>Also click &ldquo;Save Password&rdquo; on a shared college computer lab PC</span>
        </label>

        <button
          type="button"
          onClick={handleTest}
          className="cep-btn-primary text-xs sm:text-sm"
        >
          Test What Happens If the Gaming Website Gets Hacked
        </button>
      </div>

      {tested && (
        <SimpleResultBox
          isSafe={isSafe}
          resultTitle={
            isSafe
              ? 'Your Email and Shopping Accounts Stayed Safe!'
              : 'Your Email and Shopping Accounts Were Broken Into!'
          }
          whatHappened={
            !useUniqueVault
              ? 'Because you used "sai123" on all three sites, attackers took the leaked password from the Gaming Website and unlocked your Email and Shopping accounts too.'
              : savedOnPublicPc
              ? 'Your passwords were unique, but because you clicked "Save Password" on a shared lab computer, the next student opened your saved accounts.'
              : 'Because the Password Manager gave each website a completely different password and you did not save it on a public computer, the gaming site leak could not unlock your Email or Shopping accounts.'
          }
          safeSolution="Use a password manager to store a different password for every website, and never save passwords on shared or public computers."
          onReset={() => setTested(false)}
        />
      )}
    </div>
  );
}

/* ============================================================================
   ACTIVITY 05: Two-Factor and Multi-Factor Authentication
   Password-only login vs 2FA Authenticator code verification
============================================================================ */
export function Demo05TwoFactor({ onComplete }) {
  const [enable2FA, setEnable2FA] = useState(false);
  const [stage, setStage] = useState('start'); // 'start' | 'compromised' | 'enterCode' | 'protected'
  const [codeInput, setCodeInput] = useState('');
  const [codeError, setCodeError] = useState('');

  const sampleCode = '482915';

  const handleTestLogin = () => {
    setCodeError('');
    if (!enable2FA) {
      setStage('compromised');
    } else {
      setStage('enterCode');
    }
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (codeInput.trim() === sampleCode) {
      setCodeError('');
      setStage('protected');
      if (onComplete) onComplete();
    } else {
      setCodeError('Please enter the sample code 482915 shown below.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4">
        <div className="text-sm font-bold text-slate-900">
          Step 1 — Suppose a scammer already knows your password (<code>Mango@4821</code>). Choose
          your 2FA setting and test what happens:
        </div>

        <div className="bg-white border border-slate-200 rounded p-3.5 flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-bold text-slate-900">
              Two-Factor Authentication (2FA)
            </div>
            <div className="text-xs text-slate-600">
              {enable2FA
                ? 'ON: Requires a 6-digit phone code after entering the password.'
                : 'OFF: Only requires the password to log in.'}
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setEnable2FA(!enable2FA);
              setStage('start');
              setCodeInput('');
              setCodeError('');
            }}
            className={`px-3.5 py-1.5 rounded text-xs font-bold border ${
              enable2FA
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-slate-200 text-slate-800 border-slate-300'
            }`}
          >
            {enable2FA ? '2FA is ON' : '2FA is OFF'}
          </button>
        </div>

        <button
          type="button"
          onClick={handleTestLogin}
          className="cep-btn-primary text-xs sm:text-sm"
        >
          Test Login With Stolen Password
        </button>

        {/* Step 2 when 2FA is ON: Ask for the sample code */}
        {stage === 'enterCode' && (
          <form
            onSubmit={handleVerifyCode}
            className="bg-white border-2 border-teal-600 rounded-md p-4 space-y-3"
          >
            <div className="text-xs font-bold uppercase text-teal-700">
              Step 2 — 2FA Verification Step Triggered!
            </div>
            <p className="text-xs sm:text-sm text-slate-700 m-0">
              The attacker knew your password, but they are <strong>stopped here</strong> because
              they do not have your phone. Now enter the sample code from your phone below to log in
              safely:
            </p>
            <div className="bg-slate-900 text-teal-300 font-mono text-xs p-2.5 rounded">
              Your Phone Authenticator App Sample Code: <strong>{sampleCode}</strong>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                placeholder="Type 482915"
                className="bg-white border border-slate-300 rounded px-3 py-1.5 text-sm font-mono w-40"
              />
              <button
                type="button"
                onClick={() => setCodeInput(sampleCode)}
                className="cep-btn-secondary text-xs py-1.5 px-2.5"
              >
                Fill 482915
              </button>
              <button type="submit" className="cep-btn-teal text-xs py-1.5 px-4">
                Verify Code
              </button>
            </div>
            {codeError && <div className="text-xs text-red-600 font-medium">{codeError}</div>}
          </form>
        )}
      </div>

      {stage === 'compromised' && (
        <SimpleResultBox
          isSafe={false}
          resultTitle="Account Compromised (Password-Only Login)!"
          whatHappened="Because Two-Factor Authentication (2FA) was OFF, the attacker logged straight into your account using only your stolen password."
          safeSolution="Turn ON Two-Factor Authentication (2FA) above and test again so a second verification code is required."
          onReset={() => setStage('start')}
        />
      )}

      {stage === 'protected' && (
        <SimpleResultBox
          isSafe={true}
          resultTitle="Attacker Blocked & You Logged In Safely!"
          whatHappened="Even though the attacker had your password, they could not get past the second step because they did not have the 6-digit code on your phone."
          safeSolution="Always turn on Two-Factor Authentication (2FA) for your email, banking, and social media accounts."
          onReset={() => {
            setStage('start');
            setCodeInput('');
          }}
        />
      )}
    </div>
  );
}

/* ============================================================================
   ACTIVITY 06: OTP, PIN and Banking Credential Safety
   Live Caller Requesting OTP -> Share, Ignore, or Verify
============================================================================ */
export function Demo06OtpSafety({ onComplete }) {
  const [decision, setDecision] = useState(null); // 'share' | 'ignore' | 'verify' | null
  const [otpInput, setOtpInput] = useState('');

  const balance = decision === 'share' ? 15000 : 25000;

  const handleChoice = (mode) => {
    setDecision(mode);
    if (mode !== 'share' && onComplete) onComplete();
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-bold text-slate-900">
            Step 1 — Read the incoming phone call and SMS alert:
          </span>
          <span
            className={`text-xs font-bold px-3 py-1 rounded border ${
              balance < 25000
                ? 'bg-red-100 text-red-900 border-red-300'
                : 'bg-emerald-100 text-emerald-900 border-emerald-300'
            }`}
          >
            Fictional Bank Balance: ₹{balance.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="bg-amber-50 border border-amber-300 rounded p-3 text-xs font-mono text-amber-950">
          <strong>SMS on your phone:</strong> &ldquo;OTP is 492810 for ₹10,000 transfer from your
          bank account. DO NOT share this OTP with anyone.&rdquo;
        </div>

        <div className="bg-white border border-slate-200 rounded p-3.5 text-sm text-slate-800">
          <strong>Caller (&ldquo;Bank KYC Officer&rdquo;):</strong> &ldquo;Your bank account will be
          frozen in 10 minutes! Tell me the 6-digit OTP (492810) on your phone right now to keep
          your account active.&rdquo;
        </div>

        <div className="space-y-2">
          <div className="text-sm font-bold text-slate-900">
            Step 2 — What do you do?
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              placeholder="Optional: type 492810"
              className="bg-white border border-slate-300 rounded px-3 py-1.5 text-xs font-mono w-40"
            />
            <button
              type="button"
              onClick={() => handleChoice('share')}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-2 px-3.5 rounded"
            >
              Share OTP with Caller
            </button>
            <button
              type="button"
              onClick={() => handleChoice('ignore')}
              className="cep-btn-secondary text-xs py-2 px-3.5"
            >
              Ignore &amp; Hang Up
            </button>
            <button
              type="button"
              onClick={() => handleChoice('verify')}
              className="cep-btn-teal text-xs py-2 px-3.5"
            >
              Hang Up &amp; Verify with Bank Directly
            </button>
          </div>
        </div>
      </div>

      {decision && (
        <SimpleResultBox
          isSafe={decision !== 'share'}
          resultTitle={
            decision === 'share'
              ? '₹10,000 Stolen From Your Fictional Account!'
              : 'Your ₹25,000 Balance Is Safe!'
          }
          whatHappened={
            decision === 'share'
              ? 'The caller was a scammer trying to transfer ₹10,000 out of your account. As soon as you shared the OTP, the transfer finished and your balance dropped to ₹15,000.'
              : 'You refused to share the OTP and hung up. Checking directly with your official bank confirmed your account was never in danger.'
          }
          safeSolution="Never share an OTP, UPI PIN, or ATM PIN with anyone on a call or message. Real bank staff never ask for your OTP."
          onReset={() => {
            setDecision(null);
            setOtpInput('');
          }}
        />
      )}
    </div>
  );
}

/* ============================================================================
   ACTIVITY 07: Identifying Phishing Emails and Messages
   Inspect sample email -> Click suspicious link -> Fake login page -> Stolen info result -> Restart & Report
============================================================================ */
export function Demo07Phishing({ onComplete }) {
  const [step, setStep] = useState('email'); // 'email' | 'fakelogin' | 'stolen' | 'reported'
  const [inspected, setInspected] = useState(false);
  const [sampleUser, setSampleUser] = useState('student_demo');
  const [samplePass, setSamplePass] = useState('DemoPass123');

  const handleReportEmail = () => {
    setStep('reported');
    if (onComplete) onComplete();
  };

  const handleFakeSubmit = (e) => {
    e.preventDefault();
    setStep('stolen');
  };

  return (
    <div className="space-y-4">
      {step === 'email' && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-bold text-slate-900">
              Step 1 — Read this email in your inbox. You can inspect it, click the link inside it,
              or report it:
            </span>
            <button
              type="button"
              onClick={() => setInspected(!inspected)}
              className="cep-btn-secondary text-xs py-1 px-3 bg-white"
            >
              {inspected ? 'Hide Warning Signs' : 'Inspect Sender & Link'}
            </button>
          </div>

          <div className="bg-white border-2 border-slate-300 rounded-md p-4 space-y-3 text-sm">
            <div className="border-b border-slate-200 pb-2 space-y-1 text-xs">
              <div>
                <strong>From:</strong> Bank Security Team{' '}
                <code className="bg-amber-100 text-amber-950 px-1.5 py-0.5 rounded">
                  &lt;alert@bank-verify-now.xyz&gt;
                </code>
              </div>
              <div>
                <strong>Subject:</strong> URGENT: Your account will be closed in 2 hours!
              </div>
            </div>

            {inspected && (
              <div className="bg-amber-50 border border-amber-300 rounded p-2.5 text-xs text-amber-950 space-y-1">
                <div>
                  <strong>Warning Sign 1:</strong> The sender email ends in{' '}
                  <code>@bank-verify-now.xyz</code>, not a real bank address.
                </div>
                <div>
                  <strong>Warning Sign 2:</strong> It uses scary urgency (&ldquo;closed in 2
                  hours!&rdquo;) to make you panic.
                </div>
              </div>
            )}

            <p className="m-0 text-slate-800">
              Dear Customer, your bank account has been locked. Click the link below right now to
              log in and keep your account open:
            </p>

            <div>
              <button
                type="button"
                onClick={() => setStep('fakelogin')}
                className="text-sky-700 hover:text-sky-900 underline font-mono text-xs sm:text-sm inline-flex items-center gap-1 bg-sky-50 px-3 py-1.5 rounded border border-sky-200"
              >
                <span>http://login.bank-verify-now.xyz/unlock</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={handleReportEmail}
              className="cep-btn-teal text-xs sm:text-sm py-2 px-4"
            >
              Report &amp; Delete Phishing Email
            </button>
          </div>
        </div>
      )}

      {/* Fake Login Page inside simulation */}
      {step === 'fakelogin' && (
        <div className="border-2 border-red-400 rounded-lg bg-white overflow-hidden">
          <div className="bg-red-800 text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2">
            <span className="font-bold">SIMULATED FAKE LOGIN WEBSITE</span>
            <code className="bg-red-950 px-2 py-0.5 rounded text-amber-200">
              http://login.bank-verify-now.xyz/unlock
            </code>
          </div>
          <form onSubmit={handleFakeSubmit} className="p-5 space-y-3 max-w-md">
            <div className="text-sm font-bold text-slate-900">
              Fake Bank Login Page (Fictional Demo)
            </div>
            <p className="text-xs text-slate-600 m-0">
              You clicked the suspicious link in the email. See what happens if you submit sample
              login details here:
            </p>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Sample Username
              </label>
              <input
                type="text"
                value={sampleUser}
                onChange={(e) => setSampleUser(e.target.value)}
                className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Sample Password
              </label>
              <input
                type="text"
                value={samplePass}
                onChange={(e) => setSamplePass(e.target.value)}
                className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm font-mono"
              />
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 px-4 rounded"
              >
                Submit Login on Fake Page
              </button>
              <button
                type="button"
                onClick={() => setStep('email')}
                className="cep-btn-secondary text-xs py-2 px-3"
              >
                Go Back to Email Safely
              </button>
            </div>
          </form>
        </div>
      )}

      {step === 'stolen' && (
        <SimpleResultBox
          isSafe={false}
          resultTitle="Your Login Details Were Stolen by the Fake Website!"
          extraContent={
            <div className="bg-slate-900 text-amber-300 font-mono text-xs p-3 rounded">
              Scammer Server Captured: Username = &ldquo;{sampleUser}&rdquo; | Password = &ldquo;
              {samplePass}&rdquo;
            </div>
          }
          whatHappened="You clicked the link inside the phishing email and submitted your login details on a fake website ('bank-verify-now.xyz'). The scammer now has your username and password."
          safeSolution="Never click login links inside urgent emails. Check the sender address and report or delete suspicious emails."
          onReset={() => setStep('email')}
        />
      )}

      {step === 'reported' && (
        <SimpleResultBox
          isSafe={true}
          resultTitle="Phishing Email Reported and Deleted Safely!"
          whatHappened="You spotted the fake sender address (@bank-verify-now.xyz) and urgent threat, avoided clicking the fake login link, and reported the email."
          safeSolution="Always verify the sender’s real email address and open your bank website by typing the official address yourself."
          onReset={() => setStep('email')}
        />
      )}
    </div>
  );
}

/* ============================================================================
   ACTIVITY 08: Safe Link Checking and QR Code Awareness
   Simulated Browser & QR Inspector
============================================================================ */
const SAMPLE_LINKS = [
  {
    id: 'l1',
    label: 'https://www.amaz0n-festival-prize.xyz/login',
    realDomain: 'amaz0n-festival-prize.xyz',
    isSafe: false,
    warning:
      'Fake Website Warning! This link uses a zero ("0") in "amaz0n" and ends in ".xyz". It leads to a fake login page designed to steal your password.'
  },
  {
    id: 'l2',
    label: 'https://sbi.co.in.kyc-update-form.net/verify',
    realDomain: 'kyc-update-form.net',
    isSafe: false,
    warning:
      'Fake Website Warning! Even though "sbi.co.in" is written at the start, the actual website domain before the slash is "kyc-update-form.net".'
  },
  {
    id: 'l3',
    label: 'QR Code from Stranger: "Scan to Receive ₹2,000"',
    realDomain: 'upi://pay?pa=scammer@upi&am=2000',
    isSafe: false,
    warning:
      'QR Code Scam Warning! This QR code actually contains a "upi://pay" command that takes ₹2,000 OUT of your account. Scanning a QR code is never needed to receive money.'
  },
  {
    id: 'l4',
    label: 'https://scholarships.gov.in/ApplicationForm',
    realDomain: 'scholarships.gov.in',
    isSafe: true,
    warning:
      'Safe Official Website! The real domain ends in the official government address ".gov.in".'
  }
];

export function Demo08LinksAndQr({ onComplete }) {
  const [selectedId, setSelectedId] = useState('l1');
  const [inspected, setInspected] = useState(false);
  const [actionTaken, setActionTaken] = useState(null); // 'opened' | 'blocked' | null

  const current = SAMPLE_LINKS.find((l) => l.id === selectedId) || SAMPLE_LINKS[0];

  const handleOpenLink = () => {
    setActionTaken('opened');
    if (current.isSafe && onComplete) onComplete();
  };

  const handleBlockLink = () => {
    setActionTaken('blocked');
    if (!current.isSafe && onComplete) onComplete();
  };

  const isOutcomeSafe =
    (actionTaken === 'opened' && current.isSafe) ||
    (actionTaken === 'blocked' && !current.isSafe);

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4">
        <div className="text-sm font-bold text-slate-900">
          Step 1 — Select a sample link or QR code to test in the simulated browser:
        </div>

        <div className="space-y-2">
          {SAMPLE_LINKS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSelectedId(item.id);
                setInspected(false);
                setActionTaken(null);
              }}
              className={`w-full text-left p-2.5 rounded border font-mono text-xs sm:text-sm ${
                selectedId === item.id
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Simulated Browser Bar */}
        <div className="bg-white border-2 border-slate-300 rounded-md p-3.5 space-y-3">
          <div className="text-xs text-slate-500 font-semibold">
            Simulated Browser / QR Scanner Preview:
          </div>
          <div className="font-mono text-xs sm:text-sm bg-slate-100 p-2.5 rounded border border-slate-200 break-all">
            {current.label}
          </div>

          {inspected && (
            <div className="bg-teal-50 border border-teal-200 rounded p-2.5 text-xs text-teal-950">
              <strong>Inspected Destination:</strong> True domain / command is{' '}
              <code className="font-bold">{current.realDomain}</code>.
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setInspected(true)}
              className="cep-btn-secondary text-xs py-1.5 px-3"
            >
              1. Inspect Destination First
            </button>
            <button
              type="button"
              onClick={handleOpenLink}
              className="cep-btn-primary text-xs py-1.5 px-3"
            >
              2. Open Link in Simulated Browser
            </button>
            <button
              type="button"
              onClick={handleBlockLink}
              className="cep-btn-teal text-xs py-1.5 px-3"
            >
              3. Block / Do Not Open
            </button>
          </div>
        </div>
      </div>

      {actionTaken && (
        <SimpleResultBox
          isSafe={isOutcomeSafe}
          resultTitle={
            isOutcomeSafe
              ? 'Good Decision — You Handled the Link Safely!'
              : 'Warning — You Opened a Fake Link / Scam QR Code!'
          }
          whatHappened={current.warning}
          safeSolution="Always inspect the real domain name before the first slash (/), watch out for spelling tricks like 'amaz0n', and never scan a QR code to receive money."
          onReset={() => {
            setActionTaken(null);
            setInspected(false);
          }}
        />
      )}
    </div>
  );
}
