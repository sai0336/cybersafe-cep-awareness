// Educational practice questions. Every answer is about the *scenario*, not a guarantee
// that a particular action makes an account or device completely safe.
export const KNOWLEDGE_CHECKS = {
  1: {
    question: 'What is the best starting point for protecting several connected online accounts?',
    options: ['Use one password for all accounts', 'Use unique passwords and protect important accounts with MFA', 'Share a login with a friend'],
    correctIndex: 1,
    explanation: 'Unique passwords limit the impact of one breached account. Multi-factor authentication adds another barrier when it is available.'
  },
  2: {
    question: 'A message threatens to suspend your account unless you act immediately. What should you do?',
    options: ['Follow the link in the message', 'Reply with your personal details', 'Check the request independently through the official app or website'],
    correctIndex: 2,
    explanation: 'Urgency is a common scam tactic. Verify through a trusted channel rather than links or phone numbers supplied by the message.'
  },
  3: {
    question: 'Which password habit best protects you after one website suffers a breach?',
    options: ['Use a unique, sufficiently long password for each website', 'Reuse your longest password on every website', 'Change only the last digit of the same password'],
    correctIndex: 0,
    explanation: 'A unique password prevents a compromised password on one website from automatically unlocking another.'
  },
  4: {
    question: 'Where should you avoid saving passwords for your personal accounts?',
    options: ['Your own protected password manager', 'A shared or public computer', 'A password manager secured with a strong master password'],
    correctIndex: 1,
    explanation: 'Saving credentials on a shared device can allow other users to access your accounts.'
  },
  5: {
    question: 'What is a key reason to enable multi-factor authentication (MFA)?',
    options: ['It makes a weak password impossible to guess', 'It can stop some logins even if the password is stolen', 'It means you never need security updates'],
    correctIndex: 1,
    explanation: 'MFA adds a second verification step, such as a passkey, security key or authenticator code, depending on the service.'
  },
  6: {
    question: 'Someone calls claiming to be a bank employee and asks for your UPI PIN. What is the safest response?',
    options: ['Share the PIN after they confirm your name', 'Read out half of the PIN', 'Refuse and contact the bank through an official channel'],
    correctIndex: 2,
    explanation: 'Do not share UPI PINs, card PINs or OTPs with a caller. Use verified bank contact channels.'
  },
  7: {
    question: 'How should you inspect an unexpected email asking you to sign in to your bank?',
    options: ['Open its link because the logo looks correct', 'Go to the bank using a saved official app or manually entered URL', 'Send back your OTP to confirm the sender'],
    correctIndex: 1,
    explanation: 'Logos and display names can be copied. An independent official channel avoids trusting the supplied link.'
  },
  8: {
    question: 'What should you do before visiting a destination hidden behind a QR code?',
    options: ['Scan and pay immediately', 'Check the displayed destination and verify the sender', 'Assume QR codes cannot be used for fraud'],
    correctIndex: 1,
    explanation: 'A QR code simply represents data such as a URL. The linked destination can still be malicious.'
  },
  9: {
    question: 'A stranger says you must enter your UPI PIN to receive money. How should you react?',
    options: ['Enter it because receiving money requires authentication', 'Check independently and do not enter a PIN to receive a normal payment', 'Share your bank password instead'],
    correctIndex: 1,
    explanation: 'A standard incoming UPI transfer does not require you to enter your UPI PIN. A collect request may instead authorize sending money.'
  },
  10: {
    question: 'Where should you look for customer-care contact details?',
    options: ['A number from an unsolicited direct message', 'The first sponsored search result without checking', 'A verified number in the official app or website'],
    correctIndex: 2,
    explanation: 'Impersonators publish fake support numbers. Start from the service provider’s authenticated or official channel.'
  },
  11: {
    question: 'Which setting reduces the audience for a personal social-media post?',
    options: ['Public', 'Friends or a limited audience', 'Allow everyone to discover the account'],
    correctIndex: 1,
    explanation: 'Restricting post visibility reduces casual exposure, though people who see a post can still screenshot or share it.'
  },
  12: {
    question: 'Which detail is especially risky to share publicly?',
    options: ['A general hobby', 'An old school subject', 'A live location together with personal identity details'],
    correctIndex: 2,
    explanation: 'Real-time location and identifying details can expose someone to stalking, targeted scams or other risks.'
  },
  13: {
    question: 'A shopping website offers an expensive item at an unbelievable discount. What is the sensible next step?',
    options: ['Pay quickly before the countdown ends', 'Verify the seller, URL, reviews and payment protections independently', 'Send your banking PIN to confirm the offer'],
    correctIndex: 1,
    explanation: 'Urgency and implausible prices can be warning signs. Independent checks help assess legitimacy.'
  },
  14: {
    question: 'Does seeing HTTPS or a padlock prove a website is trustworthy?',
    options: ['Yes, all HTTPS websites are official', 'No, it protects the connection but does not verify the business is genuine', 'Yes, if the page looks professional'],
    correctIndex: 1,
    explanation: 'Attackers can use HTTPS too. Always check the actual domain and context.'
  },
  15: {
    question: 'A flashlight app requests contacts, SMS and microphone permissions. What should you do?',
    options: ['Grant all permissions', 'Review whether permissions are necessary and deny unnecessary access', 'Disable all phone security'],
    correctIndex: 1,
    explanation: 'Grant only the permissions required for a feature and reconsider apps requesting unrelated sensitive access.'
  },
  16: {
    question: 'Which combination best helps you recover from device failure or ransomware?',
    options: ['Software updates and a tested backup', 'Keeping the same password forever', 'Turning off the screen lock'],
    correctIndex: 0,
    explanation: 'Updates reduce known vulnerabilities and backups help restore important information after an incident.'
  },
  17: {
    question: 'You see an unexpected Bluetooth pairing request in a public place. What should you do?',
    options: ['Accept every pairing request', 'Reject and verify the device before pairing', 'Share your phone PIN'],
    correctIndex: 1,
    explanation: 'Unsolicited pairing requests can be suspicious. Pair only with devices you recognize and intend to use.'
  },
  18: {
    question: 'Which unexpected attachment should be treated as especially suspicious?',
    options: ['invoice.pdf.exe from an unknown sender', 'A verified document from a known sender you expected', 'A file you created and saved yourself'],
    correctIndex: 0,
    explanation: 'Double extensions and unexpected executable files can disguise malware. Verify the sender and attachment through another channel.'
  },
  19: {
    question: 'A student is being bullied in an online group. Which response is usually safer?',
    options: ['Threaten the bully publicly', 'Save relevant evidence, report/block where appropriate and seek support', 'Share the victim’s private information'],
    correctIndex: 1,
    explanation: 'Documenting abuse, reporting it, and asking a trusted adult or authority for help can reduce harm.'
  },
  20: {
    question: 'A caller claims a family member needs urgent money. What should you do?',
    options: ['Transfer immediately', 'Verify by contacting the family member through a known number', 'Give your online banking login'],
    correctIndex: 1,
    explanation: 'Use an independently known contact route, especially when a request is urgent or emotionally charged.'
  },
  21: {
    question: 'A realistic voice message asks you to send emergency funds. What is the safest approach?',
    options: ['Assume familiar voices cannot be faked', 'Verify through a separate trusted channel', 'Share it widely before checking'],
    correctIndex: 1,
    explanation: 'AI-generated audio and other impersonation methods can be convincing. Independent verification is vital.'
  },
  22: {
    question: 'After suspicious activity on an important account, what should you do?',
    options: ['Ignore it until next month', 'Secure the account, end unknown sessions, preserve evidence and report through official channels', 'Pay the attacker to stop'],
    correctIndex: 1,
    explanation: 'Prompt recovery and reporting reduce the time an attacker retains access. Financial fraud in India can be reported via 1930 and cybercrime.gov.in.'
  },
  23: {
    question: 'A game chat offers free rewards if you sign in on an unrelated website. What should you do?',
    options: ['Enter credentials immediately', 'Use the official game or publisher’s verified channels', 'Share your account password privately with the seller'],
    correctIndex: 1,
    explanation: 'Third-party giveaway pages may be credential-harvesting scams. Protect your game account as you would any other account.'
  },
  24: {
    question: 'What is the most transferable habit from this awareness course?',
    options: ['Act fast whenever a message feels urgent', 'Verify requests independently before sharing information or money', 'Use one password everywhere'],
    correctIndex: 1,
    explanation: 'Independent verification, unique credentials and calm decision-making are useful across many types of online threats.'
  }
};
