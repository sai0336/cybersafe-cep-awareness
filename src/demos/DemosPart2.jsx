import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { SimpleResultBox } from './DemosPart1';

/* ============================================================================
   ACTIVITY 09: Safe Use of UPI and Digital Payments
   Fictional UPI payment request -> Approve, Reject, or Verify
============================================================================ */
const UPI_SCENARIOS = [
  {
    id: 'u1',
    name: 'Request 1: "₹3,500 Cashback" Request from Unknown Sender',
    sender: 'lucky.cashback99@upi (Unknown Person)',
    amount: 3500,
    type: 'COLLECT REQUEST (Money Leaving Your Account)',
    note: 'Congratulations! Tap Approve and enter your UPI PIN to RECEIVE ₹3,500.',
    isSafeToApprove: false
  },
  {
    id: 'u2',
    name: 'Request 2: Paying ₹150 at Verified College Stationery Shop',
    sender: 'sharmastationery@okaxis (Verified Merchant: Sharma Stationery)',
    amount: 150,
    type: 'MERCHANT PAYMENT (You Scanned at Counter)',
    note: 'Notebook and Pens',
    isSafeToApprove: true
  }
];

export function Demo09UpiSafety({ onComplete }) {
  const [selectedId, setSelectedId] = useState('u1');
  const [verifiedInfo, setVerifiedInfo] = useState(false);
  const [action, setAction] = useState(null); // 'approve' | 'reject' | null

  const current = UPI_SCENARIOS.find((s) => s.id === selectedId) || UPI_SCENARIOS[0];

  const handleDecision = (choice) => {
    setAction(choice);
    const isSafeChoice =
      (choice === 'reject' && !current.isSafeToApprove) ||
      (choice === 'approve' && current.isSafeToApprove);
    if (isSafeChoice && onComplete) onComplete();
  };

  const isSafeOutcome =
    (action === 'reject' && !current.isSafeToApprove) ||
    (action === 'approve' && current.isSafeToApprove);

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4">
        <div className="text-sm font-bold text-slate-900">
          Step 1 — Select a sample payment request in the simulated UPI app:
        </div>

        <div className="flex flex-wrap gap-2">
          {UPI_SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              type="button"
              onClick={() => {
                setSelectedId(sc.id);
                setVerifiedInfo(false);
                setAction(null);
              }}
              className={`px-3 py-1.5 rounded text-xs font-semibold border ${
                selectedId === sc.id
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-300'
              }`}
            >
              {sc.name}
            </button>
          ))}
        </div>

        {/* Simulated Payment Card */}
        <div className="max-w-md bg-white border-2 border-slate-300 rounded-lg p-4 space-y-3">
          <div className="text-xs font-bold uppercase text-teal-800 bg-teal-50 px-2.5 py-1 rounded inline-block">
            Fictional UPI Payment Screen (No Real Money)
          </div>
          <div className="text-2xl font-bold text-slate-900">
            ₹{current.amount.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-slate-600">
            <strong>To / From:</strong> {current.sender}
          </div>
          <div className="bg-slate-100 p-2.5 rounded text-xs text-slate-800">
            <strong>Message Note:</strong> &ldquo;{current.note}&rdquo;
          </div>

          {verifiedInfo && (
            <div className="bg-amber-50 border border-amber-300 rounded p-2.5 text-xs text-amber-950">
              <strong>Transaction Verification:</strong> This is a <strong>{current.type}</strong>.{' '}
              {current.isSafeToApprove
                ? 'You are paying a verified shop ₹150.'
                : 'Approving this will deduct ₹3,500 FROM your bank account!'}
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="button"
              onClick={() => setVerifiedInfo(true)}
              className="cep-btn-secondary text-xs py-1.5 px-3"
            >
              Verify Details
            </button>
            <button
              type="button"
              onClick={() => handleDecision('approve')}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-1.5 px-3.5 rounded"
            >
              Approve Payment
            </button>
            <button
              type="button"
              onClick={() => handleDecision('reject')}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-1.5 px-3.5 rounded"
            >
              Reject Request
            </button>
          </div>
        </div>
      </div>

      {action && (
        <SimpleResultBox
          isSafe={isSafeOutcome}
          resultTitle={
            isSafeOutcome
              ? 'Safe UPI Decision!'
              : `Unsafe Decision — ₹${current.amount.toLocaleString('en-IN')} Was Deducted!`
          }
          whatHappened={
            !current.isSafeToApprove && action === 'approve'
              ? 'The scammer wrote "Receive ₹3,500" in the message note, but it was actually a Collect Request. When you clicked Approve, ₹3,500 left your account.'
              : !current.isSafeToApprove && action === 'reject'
              ? 'You spotted that the ₹3,500 "Cashback" was actually a fake Collect Request and rejected it safely.'
              : action === 'approve'
              ? 'You verified the shop name ("Sharma Stationery") and amount (₹150) before approving the payment.'
              : 'You cancelled the payment.'
          }
          safeSolution="Remember: You never need to approve a request or enter a UPI PIN to receive money. Always verify the recipient name and reject unknown collect requests."
          onReset={() => {
            setAction(null);
            setVerifiedInfo(false);
          }}
        />
      )}
    </div>
  );
}

/* ============================================================================
   ACTIVITY 10: Recognising Fake Customer-Care and Impersonation Scams
   Fictional call transcript -> Share Info, Grant Remote Access, or Verify Independently
============================================================================ */
export function Demo10CustomerCare({ onComplete }) {
  const [choice, setChoice] = useState(null); // 'share' | 'remote' | 'verify' | null

  const handleSelect = (mode) => {
    setChoice(mode);
    if (mode === 'verify' && onComplete) onComplete();
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4">
        <div className="text-sm font-bold text-slate-900">
          Step 1 — Read the fictional customer-care call transcript:
        </div>

        <div className="bg-white border border-slate-300 rounded-md p-4 space-y-2 text-sm">
          <div className="text-xs font-bold text-slate-500">
            Call to a number found in a random online comment (+91-82XXXXXX11):
          </div>
          <p className="m-0 text-slate-800">
            <strong>Fake Support Agent:</strong> &ldquo;Hello! To refund your stuck ₹600 order,
            either tell me your bank OTP and card PIN right now, OR install the AnyDesk remote-access
            app so I can control your phone screen.&rdquo;
          </p>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-bold text-slate-900">
            Step 2 — Choose what to do:
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => handleSelect('share')}
              className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold py-2 px-3.5 rounded"
            >
              1. Share Bank OTP &amp; Card PIN
            </button>
            <button
              type="button"
              onClick={() => handleSelect('remote')}
              className="bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold py-2 px-3.5 rounded"
            >
              2. Grant Remote Screen Access (AnyDesk)
            </button>
            <button
              type="button"
              onClick={() => handleSelect('verify')}
              className="cep-btn-teal text-xs sm:text-sm py-2 px-3.5"
            >
              3. Hang Up &amp; Verify via Official App
            </button>
          </div>
        </div>
      </div>

      {choice && (
        <SimpleResultBox
          isSafe={choice === 'verify'}
          resultTitle={
            choice === 'verify'
              ? 'Safe Choice — You Blocked the Fake Agent!'
              : choice === 'remote'
              ? 'Unsafe Choice — Scammer Took Control of Your Phone Screen!'
              : 'Unsafe Choice — Scammer Stole Money Using Your OTP!'
          }
          whatHappened={
            choice === 'share'
              ? 'The caller was an impersonator who used your OTP and card PIN to steal ₹15,000 from your bank account.'
              : choice === 'remote'
              ? 'By granting AnyDesk remote access, the scammer could see everything on your phone screen, open your banking app, and read your incoming OTPs.'
              : 'You hung up and used the Help menu inside the official app instead of trusting a random phone number found online.'
          }
          safeSolution="Never install remote-access apps (like AnyDesk) or share OTPs on a support call. Only use the official app or the phone number printed on the back of your bank card."
          onReset={() => setChoice(null)}
        />
      )}
    </div>
  );
}

/* ============================================================================
   ACTIVITY 11: Social Media Privacy Settings
   Switch Public/Private, Location Sharing, Post Audience -> Live Preview Updates Immediately
============================================================================ */
export function Demo11SocialPrivacy({ onComplete }) {
  const [isPrivate, setIsPrivate] = useState(false);
  const [shareLocation, setShareLocation] = useState(true);
  const [postsFriendsOnly, setPostsFriendsOnly] = useState(false);
  const [checked, setChecked] = useState(false);

  const isSafe = isPrivate && !shareLocation && postsFriendsOnly;

  const handleCheck = () => {
    setChecked(true);
    if (isSafe && onComplete) onComplete();
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Privacy Controls */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
          <div className="text-sm font-bold text-slate-900">
            Step 1 — Change Priya’s social media privacy settings:
          </div>

          <div className="bg-white border border-slate-200 rounded p-3 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900">1. Profile Visibility</div>
              <div className="text-xs text-slate-600">
                Currently: <strong>{isPrivate ? 'Private' : 'Public'}</strong>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsPrivate(!isPrivate);
                setChecked(false);
              }}
              className={`px-3 py-1.5 rounded text-xs font-bold ${
                isPrivate ? 'bg-emerald-600 text-white' : 'bg-red-100 text-red-900'
              }`}
            >
              {isPrivate ? 'Private (Switch to Public)' : 'Public (Switch to Private)'}
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded p-3 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900">2. Location Sharing</div>
              <div className="text-xs text-slate-600">
                Currently: <strong>{shareLocation ? 'ON (Visible)' : 'OFF (Hidden)'}</strong>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setShareLocation(!shareLocation);
                setChecked(false);
              }}
              className={`px-3 py-1.5 rounded text-xs font-bold ${
                !shareLocation ? 'bg-emerald-600 text-white' : 'bg-red-100 text-red-900'
              }`}
            >
              {shareLocation ? 'Location ON (Turn OFF)' : 'Location OFF (Turn ON)'}
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded p-3 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900">3. Who Can See Posts</div>
              <div className="text-xs text-slate-600">
                Currently: <strong>{postsFriendsOnly ? 'Friends Only' : 'Everyone'}</strong>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setPostsFriendsOnly(!postsFriendsOnly);
                setChecked(false);
              }}
              className={`px-3 py-1.5 rounded text-xs font-bold ${
                postsFriendsOnly ? 'bg-emerald-600 text-white' : 'bg-red-100 text-red-900'
              }`}
            >
              {postsFriendsOnly ? 'Friends Only' : 'Everyone (Change to Friends)'}
            </button>
          </div>

          <button
            type="button"
            onClick={handleCheck}
            className="cep-btn-primary text-xs sm:text-sm w-full justify-center"
          >
            Check My Privacy Settings
          </button>
        </div>

        {/* Right: Immediate Live Preview */}
        <div className="bg-white border-2 border-slate-300 rounded-lg p-4 space-y-3">
          <div className="text-xs font-bold uppercase text-teal-800">
            Live Preview — What a Stranger Online Sees Right Now:
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded p-3 space-y-2 text-xs sm:text-sm">
            <div className="font-bold text-slate-900">Priya Sharma (@priya_demo)</div>
            <div>
              <strong>Account Status:</strong>{' '}
              {isPrivate ? 'Private Account (Locked to Strangers)' : 'Public Account (Open to All)'}
            </div>
            <div>
              <strong>Photos &amp; Friend List:</strong>{' '}
              {isPrivate && postsFriendsOnly ? (
                <span className="text-emerald-700 font-semibold">Hidden from strangers.</span>
              ) : (
                <span className="text-red-700 font-semibold">
                  Visible! Strangers can download photos and see your friends.
                </span>
              )}
            </div>
            <div>
              <strong>Live Location Tag:</strong>{' '}
              {!shareLocation ? (
                <span className="text-emerald-700 font-semibold">Hidden.</span>
              ) : (
                <span className="text-red-700 font-semibold">
                  Visible: &ldquo;At Sunrise Hostel, Room 12, Mumbai&rdquo;.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {checked && (
        <SimpleResultBox
          isSafe={isSafe}
          resultTitle={
            isSafe
              ? 'Great Job — Priya’s Profile Is Private and Safe!'
              : 'Privacy Risk — Strangers Can Still See Private Details!'
          }
          whatHappened={
            isSafe
              ? 'Because you set the profile to Private, turned OFF Location Sharing, and limited posts to Friends Only, strangers cannot spy on Priya’s photos or location.'
              : 'With your current settings, unknown people online can still view Priya’s photos, friend list, or exact live location.'
          }
          safeSolution="Set your profile to Private, turn OFF live location sharing on posts, and share updates with Friends Only."
          onReset={() => setChecked(false)}
        />
      )}
    </div>
  );
}

/* ============================================================================
   ACTIVITY 12: Protecting Personal and Sensitive Information
   Interactive Public Profile Post Editor
============================================================================ */
const PROFILE_FIELDS = [
  { id: 'f1', label: 'First Name & Favourite Sport (Cricket)', sensitive: false },
  { id: 'f2', label: 'Full Home Address & Personal Mobile Number', sensitive: true },
  { id: 'f3', label: 'Exam Admit Card Photo (Showing Roll No & Date of Birth)', sensitive: true },
  { id: 'f4', label: 'Aadhaar Card & PAN Card Number', sensitive: true },
  { id: 'f5', label: 'Bank Account OTP & Password', sensitive: true }
];

export function Demo12InfoClassification({ onComplete }) {
  const [sharedIds, setSharedIds] = useState(['f1', 'f3']);
  const [published, setPublished] = useState(false);

  const toggleField = (id) => {
    setSharedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    setPublished(false);
  };

  const exposedSensitive = PROFILE_FIELDS.filter(
    (f) => f.sensitive && sharedIds.includes(f.id)
  );
  const isSafe = exposedSensitive.length === 0;

  const handlePublish = () => {
    setPublished(true);
    if (isSafe && onComplete) onComplete();
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
        <div className="text-sm font-bold text-slate-900">
          Step 1 — Uncheck any personal or sensitive information that should NOT be posted publicly:
        </div>

        <div className="space-y-2">
          {PROFILE_FIELDS.map((field) => {
            const isChecked = sharedIds.includes(field.id);
            return (
              <label
                key={field.id}
                className="flex items-center justify-between gap-3 bg-white border border-slate-200 rounded p-3 cursor-pointer text-xs sm:text-sm"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleField(field.id)}
                    className="h-4 w-4 accent-teal-600"
                  />
                  <span className="font-medium text-slate-900">{field.label}</span>
                </div>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded ${
                    isChecked ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {isChecked ? 'Shared Publicly' : 'Kept Private'}
                </span>
              </label>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handlePublish}
          className="cep-btn-primary text-xs sm:text-sm"
        >
          Publish Public Post &amp; Check Result
        </button>
      </div>

      {published && (
        <SimpleResultBox
          isSafe={isSafe}
          resultTitle={
            isSafe
              ? 'Safe Post — No Sensitive Information Exposed!'
              : `Warning — You Exposed ${exposedSensitive.length} Sensitive Item(s) Publicly!`
          }
          whatHappened={
            isSafe
              ? 'You only shared harmless public information (First Name & Favourite Sport) and kept your address, admit card, Aadhaar, and OTP private.'
              : `You publicly posted: ${exposedSensitive
                  .map((e) => e.label)
                  .join('; ')}. Scammers can use this information to log into your student portal, steal your identity, or access your bank account.`
          }
          safeSolution="Uncheck Home Address, Exam Admit Card, Aadhaar/PAN, and Bank OTPs above before posting anything online."
          onReset={() => setPublished(false)}
        />
      )}
    </div>
  );
}

/* ============================================================================
   ACTIVITY 13: Safe Online Shopping and Fake Offers
   Fictional shopping page -> Inspect Seller or Buy Without Checking
============================================================================ */
export function Demo13OnlineShopping({ onComplete }) {
  const [sellerInspected, setSellerInspected] = useState(false);
  const [decision, setDecision] = useState(null); // 'buy' | 'cancel' | null

  const handleDecision = (mode) => {
    setDecision(mode);
    if (mode === 'cancel' && onComplete) onComplete();
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4">
        <div className="text-sm font-bold text-slate-900">
          Step 1 — Look at this online shopping offer. You can inspect the seller first or proceed
          to buy:
        </div>

        <div className="bg-white border-2 border-slate-300 rounded-lg p-4 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-base font-bold text-slate-900">
              Latest 5G Smartphone (128 GB) — Flash Sale!
            </span>
            <span className="bg-red-100 text-red-900 text-xs font-bold px-2.5 py-1 rounded">
              95% OFF — Hurry, 2 mins left!
            </span>
          </div>
          <div className="text-xl font-extrabold text-teal-800">
            ₹1,499 <span className="text-xs font-normal text-slate-500 line-through">₹32,000</span>
          </div>
          <div className="text-xs text-slate-700">
            <strong>Payment Option:</strong> Advance UPI Transfer Only (Cash on Delivery Not
            Available)
          </div>

          {sellerInspected && (
            <div className="bg-amber-50 border border-amber-300 rounded p-3 text-xs text-amber-950 space-y-1">
              <div className="font-bold">Seller Details Found:</div>
              <ul className="list-disc pl-4 m-0 space-y-0.5">
                <li>Website address: <code>super-cheap-phones-2026.xyz</code> (Created 3 days ago)</li>
                <li>Company address &amp; customer-care phone: None listed</li>
                <li>Return policy: No returns or refunds allowed</li>
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <button
              type="button"
              onClick={() => setSellerInspected(true)}
              className="cep-btn-secondary text-xs py-2 px-3.5"
            >
              1. Inspect Seller Details
            </button>
            <button
              type="button"
              onClick={() => handleDecision('buy')}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-2 px-3.5 rounded"
            >
              2. Buy Now &amp; Pay ₹1,499 via UPI
            </button>
            <button
              type="button"
              onClick={() => handleDecision('cancel')}
              className="cep-btn-teal text-xs py-2 px-3.5"
            >
              3. Cancel &amp; Leave Fake Store
            </button>
          </div>
        </div>
      </div>

      {decision && (
        <SimpleResultBox
          isSafe={decision === 'cancel'}
          resultTitle={
            decision === 'cancel'
              ? 'Safe Choice — You Avoided the Fake Shopping Scam!'
              : 'Unsafe Choice — You Lost ₹1,499 to a Fake Website!'
          }
          whatHappened={
            decision === 'buy'
              ? 'You paid ₹1,499 in advance without checking the seller. The website closed down two days later and never delivered any phone.'
              : 'You checked the warning signs (an impossible 95% discount, no seller address, and forced advance UPI payment) and left the fake store safely.'
          }
          safeSolution="Always inspect the seller’s address and reviews before buying, and do not pay in advance on unknown websites offering unrealistic 90% discounts."
          onReset={() => {
            setDecision(null);
            setSellerInspected(false);
          }}
        />
      )}
    </div>
  );
}

/* ============================================================================
   ACTIVITY 14: Secure Browsing and Website Verification
   Simulated Browser: Check Domain & HTTPS Indicator
============================================================================ */
const BROWSER_SITES = [
  {
    id: 'b1',
    url: 'https://sbi.co.in.account-verify.xyz/login',
    hasHttps: true,
    realDomain: 'account-verify.xyz',
    isRealSite: false,
    desc: 'Has "https://" and a padlock icon, but the real domain is "account-verify.xyz".'
  },
  {
    id: 'b2',
    url: 'https://onlinesbi.sbi/personal',
    hasHttps: true,
    realDomain: 'onlinesbi.sbi',
    isRealSite: true,
    desc: 'Has "https://" AND the real official domain "onlinesbi.sbi".'
  }
];

export function Demo14SecureBrowsing({ onComplete }) {
  const [siteId, setSiteId] = useState('b1');
  const [action, setAction] = useState(null); // 'login' | 'leave' | null

  const site = BROWSER_SITES.find((s) => s.id === siteId) || BROWSER_SITES[0];

  const handleAction = (choice) => {
    setAction(choice);
    const safe =
      (choice === 'leave' && !site.isRealSite) || (choice === 'login' && site.isRealSite);
    if (safe && onComplete) onComplete();
  };

  const isSafeOutcome =
    (action === 'leave' && !site.isRealSite) || (action === 'login' && site.isRealSite);

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4">
        <div className="text-sm font-bold text-slate-900">
          Step 1 — Switch between the two websites in the simulated browser below:
        </div>

        <div className="flex flex-wrap gap-2">
          {BROWSER_SITES.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setSiteId(s.id);
                setAction(null);
              }}
              className={`px-3 py-1.5 rounded text-xs font-semibold border ${
                siteId === s.id
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-300'
              }`}
            >
              Website {idx + 1}: {s.realDomain}
            </button>
          ))}
        </div>

        {/* Simulated Browser Bar */}
        <div className="bg-white border-2 border-slate-300 rounded-lg overflow-hidden">
          <div className="bg-slate-100 border-b border-slate-200 p-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 text-xs font-bold px-2 py-1 rounded">
              <Lock className="w-3.5 h-3.5" /> HTTPS Padlock
            </span>
            <code className="text-xs sm:text-sm font-mono bg-white px-3 py-1 rounded border border-slate-300 flex-1 break-all">
              {site.url}
            </code>
          </div>
          <div className="p-4 space-y-3 text-xs sm:text-sm">
            <div>
              <strong>True Website Domain (before the first /):</strong>{' '}
              <code className="bg-teal-50 text-teal-900 font-bold px-2 py-0.5 rounded border border-teal-200">
                {site.realDomain}
              </code>
            </div>
            <p className="m-0 text-slate-700">{site.desc}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleAction('login')}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2 px-3.5 rounded"
              >
                Enter Password on This Site
              </button>
              <button
                type="button"
                onClick={() => handleAction('leave')}
                className="cep-btn-teal text-xs py-2 px-3.5"
              >
                Block / Leave This Site
              </button>
            </div>
          </div>
        </div>
      </div>

      {action && (
        <SimpleResultBox
          isSafe={isSafeOutcome}
          resultTitle={
            isSafeOutcome
              ? 'Safe Browsing Decision!'
              : 'Unsafe Decision — Fooled by a Fake Website With HTTPS!'
          }
          whatHappened={
            !site.isRealSite && action === 'login'
              ? 'Even though the website had an HTTPS padlock, its real domain was "account-verify.xyz". Entering your password sent it straight to the scammer.'
              : !site.isRealSite && action === 'leave'
              ? 'You noticed that the real domain was "account-verify.xyz" (not the real bank) and left the fake site safely.'
              : action === 'login'
              ? 'You verified both the HTTPS padlock and the official domain ("onlinesbi.sbi") before logging in.'
              : 'You left the official website.'
          }
          safeSolution="Never rely on the HTTPS padlock alone. Always check the real domain name right before the first single slash (/)."
          onReset={() => setAction(null)}
        />
      )}
    </div>
  );
}

/* ============================================================================
   ACTIVITY 15: Safe App Downloads and Permissions
   Fictional Flashlight App requesting Camera, Microphone, Contacts, Location
============================================================================ */
export function Demo15AppPermissions({ onComplete }) {
  const [perms, setPerms] = useState({
    camera: true,
    microphone: true,
    contacts: true,
    location: true
  });
  const [tested, setTested] = useState(false);

  const togglePerm = (key) => {
    setPerms((prev) => ({ ...prev, [key]: !prev[key] }));
    setTested(false);
  };

  const extraGranted = [];
  if (perms.microphone) extraGranted.push('Microphone (can record your voice)');
  if (perms.contacts) extraGranted.push('Contacts (can copy your phonebook)');
  if (perms.location) extraGranted.push('Location (can track where you go)');

  const isSafe = extraGranted.length === 0;

  const handleTest = () => {
    setTested(true);
    if (isSafe && onComplete) onComplete();
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Permission Toggles */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
          <div className="text-sm font-bold text-slate-900">
            Step 1 — You are installing a &ldquo;Simple Torch / Flashlight App&rdquo;. Allow or Deny
            each permission:
          </div>

          {[
            { key: 'camera', name: 'Camera / LED Flash', needed: true },
            { key: 'microphone', name: 'Microphone', needed: false },
            { key: 'contacts', name: 'Contacts', needed: false },
            { key: 'location', name: 'Location', needed: false }
          ].map((item) => {
            const allowed = perms[item.key];
            return (
              <div
                key={item.key}
                className="bg-white border border-slate-200 rounded p-3 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">{item.name}</div>
                  <div className="text-xs text-slate-500">
                    {item.needed ? 'Needed for flashlight' : 'Not needed for a flashlight'}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => togglePerm(item.key)}
                  className={`px-3 py-1.5 rounded text-xs font-bold ${
                    allowed
                      ? item.needed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-600 text-white'
                      : 'bg-slate-200 text-slate-800'
                  }`}
                >
                  {allowed ? 'Allowed (Click to Deny)' : 'Denied (Click to Allow)'}
                </button>
              </div>
            );
          })}

          <button
            type="button"
            onClick={handleTest}
            className="cep-btn-primary text-xs sm:text-sm w-full justify-center"
          >
            Open App With These Permissions
          </button>
        </div>

        {/* Right: Live Simulated Access Preview */}
        <div className="bg-white border-2 border-slate-300 rounded-lg p-4 space-y-3">
          <div className="text-xs font-bold uppercase text-teal-800">
            Live App Access — What This Flashlight App Can Read Right Now:
          </div>
          <ul className="space-y-2 text-xs sm:text-sm list-disc pl-5 m-0">
            <li>
              <strong>Camera Flash:</strong>{' '}
              {perms.camera ? 'Allowed (Can turn on torch light)' : 'Denied'}
            </li>
            <li className={perms.microphone ? 'text-red-700 font-semibold' : 'text-emerald-700'}>
              <strong>Microphone:</strong>{' '}
              {perms.microphone ? 'ALLOWED — App can listen to your conversations!' : 'Blocked (Safe)'}
            </li>
            <li className={perms.contacts ? 'text-red-700 font-semibold' : 'text-emerald-700'}>
              <strong>Contacts:</strong>{' '}
              {perms.contacts ? 'ALLOWED — App can copy all your family phone numbers!' : 'Blocked (Safe)'}
            </li>
            <li className={perms.location ? 'text-red-700 font-semibold' : 'text-emerald-700'}>
              <strong>Location:</strong>{' '}
              {perms.location ? 'ALLOWED — App can track your live GPS location!' : 'Blocked (Safe)'}
            </li>
          </ul>
        </div>
      </div>

      {tested && (
        <SimpleResultBox
          isSafe={isSafe}
          resultTitle={
            isSafe
              ? 'Safe Permissions — Flashlight Works Without Spying!'
              : `Privacy Risk — Unnecessary Access Granted (${extraGranted.length} extra)`
          }
          whatHappened={
            isSafe
              ? 'You denied Microphone, Contacts, and Location access. The flashlight app still works fine, and it cannot spy on your private data.'
              : `Because you left ${extraGranted.join(', ')} allowed, a simple flashlight app was able to collect your private information in the background.`
          }
          safeSolution="Deny Microphone, Contacts, and Location permissions above—only allow permissions an app truly needs for its main job."
          onReset={() => setTested(false)}
        />
      )}
    </div>
  );
}

/* ============================================================================
   ACTIVITY 16: Device Locks, Updates and Backups
   Turn Screen Lock, Updates, and Backups ON/OFF -> Run Lost-Device Scenario
============================================================================ */
export function Demo16DeviceSecurity({ onComplete }) {
  const [screenLock, setScreenLock] = useState(false);
  const [autoUpdates, setAutoUpdates] = useState(true);
  const [backups, setBackups] = useState(false);
  const [tested, setTested] = useState(false);

  const isSafe = screenLock && autoUpdates && backups;

  const handleRunScenario = () => {
    setTested(true);
    if (isSafe && onComplete) onComplete();
  };

  const problems = [];
  if (!screenLock) problems.push('the person who found your lost phone opened it right away and read your messages and bank OTPs');
  if (!autoUpdates) problems.push('outdated software left your device open to security bugs');
  if (!backups) problems.push('all your photos and college project files were lost forever because there was no backup');

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
        <div className="text-sm font-bold text-slate-900">
          Step 1 — Turn device protections ON or OFF, then run the lost-phone test:
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              label: '1. Screen Lock PIN',
              state: screenLock,
              toggle: () => {
                setScreenLock(!screenLock);
                setTested(false);
              }
            },
            {
              label: '2. Automatic Updates',
              state: autoUpdates,
              toggle: () => {
                setAutoUpdates(!autoUpdates);
                setTested(false);
              }
            },
            {
              label: '3. Regular File Backups',
              state: backups,
              toggle: () => {
                setBackups(!backups);
                setTested(false);
              }
            }
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white border border-slate-200 rounded p-3.5 flex flex-col justify-between gap-2"
            >
              <div className="text-sm font-bold text-slate-900">{item.label}</div>
              <button
                type="button"
                onClick={item.toggle}
                className={`py-1.5 px-3 rounded text-xs font-bold ${
                  item.state ? 'bg-emerald-600 text-white' : 'bg-red-100 text-red-900'
                }`}
              >
                {item.state ? 'ON (Protected)' : 'OFF (Unprotected)'}
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleRunScenario}
          className="cep-btn-primary text-xs sm:text-sm"
        >
          Run Lost-Device Scenario
        </button>
      </div>

      {tested && (
        <SimpleResultBox
          isSafe={isSafe}
          resultTitle={
            isSafe
              ? 'Safe Outcome — Your Accounts and Files Survived the Lost Phone!'
              : 'Data & Account Loss in the Lost-Device Scenario!'
          }
          whatHappened={
            isSafe
              ? 'When your phone was lost on the bus, the Screen Lock PIN blocked strangers from opening it, updates kept the system secure, and you restored all your photos and college files from your backup.'
              : `When your phone was lost, ${problems.join('; and ')}.`
          }
          safeSolution="Turn ON Screen Lock PIN, Automatic Updates, and File Backups so a lost or damaged device does not ruin your digital life."
          onReset={() => setTested(false)}
        />
      )}
    </div>
  );
}
