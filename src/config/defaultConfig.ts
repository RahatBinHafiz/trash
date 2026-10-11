import { AppConfig } from '../types';

export const DEFAULT_CONFIG: AppConfig = {
  girlfriendName: 'Sweetheart',
  boyfriendNickname: 'Salak',
  subtitle: 'Official Boyfriend Boredom Relief Protocol',
  welcomeSubtext: 'Your boredom has been reported to the Boyfriend Department.',
  
  courtCharges: [
    {
      id: 1,
      title: 'Being Illegally Beautiful',
      description: 'The defendant is accused of possessing an unauthorized amount of prettiness that blinds anyone in a 5-mile radius.',
      evidence: [
        'Photographic evidence of sweetheart looking angelic without even trying.',
        'Eyewitness statement from Salak: "I looked at her picture and forgot my own phone password."',
        'Scientific data: Salak\'s heart rate spikes 300% whenever her selfie appears.'
      ],
      verdictGuiltyText: 'THE COURT SENTENCES THE DEFENDANT TO 100 KISSES AND A LIFETIME OF LOVING YOU. 💋',
      verdictNotGuiltyText: 'OBJECTION! YOUR HONOR IS CLEARLY BIASED BECAUSE SHE IS TOO CUTE.'
    },
    {
      id: 2,
      title: "Stealing 97% of Her Boyfriend's Brain Capacity",
      description: 'The defendant has hijacked Salak\'s central processing unit. No thoughts left except "I wonder what my sweetheart is doing right now."',
      evidence: [
        'Salak went to kitchen for water, stared at the wall for 10 minutes thinking about her.',
        'When Salak looks in the mirror, he finds his sweetheart standing right beside him in his reflection.',
        'MRI scan shows sweetheart living rent-free in every neural lobe.'
      ],
      verdictGuiltyText: 'GUILTY AS CHARGED! The defendant must supply constant forehead kisses to repay the stolen cognitive bandwidth.',
      verdictNotGuiltyText: 'OBJECTION! The defendant claims she only borrowed 96.9% of brain capacity, which is still a federal crime.'
    },
    {
      id: 3,
      title: 'Making Him Smile at His Phone Like an Idiot',
      description: 'Causing public embarrassment as Salak grins stupidly at his lock screen on public transportation and family dinners.',
      evidence: [
        'Relatives questioned if Salak was okay because he was giggling at a simple "hmmm" text.',
        'Friends and family have officially labeled him "down astronomically for sweetheart".',
        'Exhibit C: Screengrab of 43 consecutive heart emojis sent to her.'
      ],
      verdictGuiltyText: 'GUILTY! Sentence: Defendant must send at least 3 voice notes calling him "Salak" to compensate.',
      verdictNotGuiltyText: 'OBJECTION! The court notes the judge is actively smiling at this exact sentence right now!'
    },
    {
      id: 4,
      title: 'Causing Excessive Heartbeats',
      description: 'Operating without a cardiology permit and inducing dangerous tachycardic flutter in innocent boyfriend Salak.',
      evidence: [
        'Apple Watch alert: "High heart rate detected while sitting completely still talking to her."',
        'Defendant wore that one cute outfit and Salak lost ability to speak English for 4 hours.',
        'Cardiologist report: Patient diagnosed with acute chronic love.'
      ],
      verdictGuiltyText: 'SENTENCE: 50 mandatory warm hugs and holding hands until heart rates synchronize. ❤️',
      verdictNotGuiltyText: 'OBJECTION! Denying this charge is impossible when defendant has those pretty eyes.'
    },
    {
      id: 5,
      title: 'Being Cute Without a Valid License',
      description: 'Violating municipal cuteness ordinances by being too adorable while sleepy, grumpy, or demanding snacks.',
      evidence: [
        'Exhibit A: The way she pouts when she is hungry (lethal weapon).',
        'Exhibit B: The adorable giggles that melt Salak\'s bad moods instantly.',
        'Officer report: No permit was found for such extreme squishiness.'
      ],
      verdictGuiltyText: 'THE COURT SENTENCES THE DEFENDANT TO BE SQUISHED IN A GIANT BEAR HUG IMMEDIATELY. 🫂',
      verdictNotGuiltyText: 'OBJECTION! The defense attorney collapsed from cuteness overload!'
    },
    {
      id: 6,
      title: 'Making Her Boyfriend Miss Her at Random Times',
      description: 'Telepathically triggering sudden waves of "I miss my girl" in the middle of grocery shopping, meetings, and games.',
      evidence: [
        'Salak looked at a cute stray cat and whispered "Sweetheart would love this cat".',
        'Witnesses report Salak sighing dramatically while looking at his wallpaper.',
        'Unsolicited text message sent at 2:37 PM: "I miss you sweetheart 😭"'
      ],
      verdictGuiltyText: 'GUILTY! Defendant must promise to never disappear for too long and accept infinite cuddles.',
      verdictNotGuiltyText: 'OBJECTION! How can defendant plead innocent when she is so chronically lovable?'
    },
    {
      id: 7,
      title: 'Being Suspiciously Adorable',
      description: 'Engaging in unlawful levels of charm, sweetness, and pookie behavior without government clearance.',
      evidence: [
        'Eye contact test: Salak was incapable of holding a serious face for more than 1.4 seconds.',
        'Security footage of defendant existing in 4K high definition cuteness.',
        'Expert witness testimony: "Ki cuteee, it should honestly be illegal."'
      ],
      verdictGuiltyText: 'THE COURT SENTENCES THE DEFENDANT TO UNCONDITIONAL SPOILING AND ICE CREAM. 🍦',
      verdictNotGuiltyText: 'OBJECTION! Even the jury is crying from how adorable your honor is.'
    },
    {
      id: 8,
      title: 'Existing and Being Distracting',
      description: 'Simply being alive in the same universe and rendering all other earthly tasks secondary.',
      evidence: [
        'Defendant breathed and Salak instantly forgot what task he was doing.',
        'Official study confirms: 100% of Salak’s universe now revolves around making his sweetheart happy.',
        'Zero regrets from the victim Salak.'
      ],
      verdictGuiltyText: 'THE SUPREME COURT ORDERS A PERMANENT LIFE SENTENCE OF BEING SALAK’S ONE AND ONLY. 💍',
      verdictNotGuiltyText: 'OBJECTION! Your honor, you literally cannot dismiss this charge with that face.'
    }
  ],

  gachaRewards: [
    // COMMON (Weight 60)
    {
      id: 'gacha_kiss_1',
      title: 'One Virtual Kiss 💋',
      description: 'Redeemable immediately. High-velocity virtual mwah from Salak aimed directly at your forehead or cheek!',
      rarity: 'common',
      icon: '💋',
      probabilityWeight: 60
    },
    {
      id: 'gacha_hug_1',
      title: 'One Virtual Hug 🫂',
      description: 'A cozy, warm, squishy hug from Salak that squeezes all the boredom and stress right out of you.',
      rarity: 'common',
      icon: '🫂',
      probabilityWeight: 60
    },
    {
      id: 'gacha_compliments_5',
      title: 'Five Compliments From Salak 😂',
      description: '1. You are stunning. 2. Your smile is my medicine. 3. You smell good even through the phone. 4. You are my favorite human. 5. Ki cuteee!',
      rarity: 'common',
      icon: '😂',
      probabilityWeight: 60
    },
    {
      id: 'gacha_forehead_kisses',
      title: 'Unlimited Forehead Kisses 🥺',
      description: 'A pass for infinite soft forehead kisses from Salak whenever you feel tired, grumpy, or overwhelmed.',
      rarity: 'common',
      icon: '🥺',
      probabilityWeight: 60
    },
    {
      id: 'gacha_chocolate',
      title: 'One Imaginary Chocolate 🍫',
      description: 'Zero calories, 100% sweetness, infused with Salak\'s love. (Real chocolate to follow in person!)',
      rarity: 'common',
      icon: '🍫',
      probabilityWeight: 60
    },
    {
      id: 'gacha_cat_love',
      title: 'A Cute Cat Sending Love 🐱❤️',
      description: 'A fluffy virtual kitten has arrived to purr softly and declare Sweetheart as the prettiest girl alive.',
      rarity: 'common',
      icon: '🐱',
      probabilityWeight: 60
    },

    // RARE (Weight 30)
    {
      id: 'gacha_love_confession',
      title: 'A Dramatic Love Confession 📜',
      description: '“Listen here, sweetheart: If I had to pick between breathing oxygen and looking at your smile... well, I would breathe just so I could stay alive and stare at you longer.” 😭💗',
      rarity: 'rare',
      icon: '📜',
      probabilityWeight: 30
    },
    {
      id: 'gacha_date_coupon',
      title: 'A Virtual Date Coupon 🎟️',
      description: 'Valid for one cozy Discord/FaceTime movie night or virtual food date. Salak pays and provides terrible jokes.',
      rarity: 'rare',
      icon: '🎟️',
      probabilityWeight: 30
    },
    {
      id: 'gacha_paragraph_beauty',
      title: 'Personalized Beauty Paragraph ✨',
      description: '“You don’t even need good lighting or filters. You are the kind of effortlessly pretty that makes artists wish they could paint and makes Salak sound like a stuttering poet.”',
      rarity: 'rare',
      icon: '✨',
      probabilityWeight: 30
    },
    {
      id: 'gacha_certificate',
      title: 'Boyfriend Appreciation Certificate 🏆',
      description: 'Official certification designating Sweetheart as the Supreme Ruler of Salak\'s Heart, valid until the end of time.',
      rarity: 'rare',
      icon: '🏆',
      probabilityWeight: 30
    },
    {
      id: 'gacha_call_coupon',
      title: 'A 10-Minute Call Coupon 📞',
      description: 'Priority hotline! Call Salak right now to complain about anything, talk about cats, or just demand attention.',
      rarity: 'rare',
      icon: '📞',
      probabilityWeight: 30
    },
    {
      id: 'gacha_request_wish',
      title: 'One Wish Salak Must Try His Best to Fulfill 🧞',
      description: 'Any reasonable or funny demand: sing a song, write a poem, fetch snacks, or let you win an argument!',
      rarity: 'rare',
      icon: '🧞',
      probabilityWeight: 30
    },

    // LEGENDARY (Weight 10)
    {
      id: 'gacha_miss_you_more',
      title: 'Salak misses you more than he admits. 🥹',
      description: 'Even when acting cool or busy, you are the background music playing in Salak\'s head 24/7. Always.',
      rarity: 'legendary',
      icon: '🥹',
      probabilityWeight: 10
    },
    {
      id: 'gacha_100_kisses',
      title: 'You have unlocked 100 virtual kisses. MWAHHHH 💋',
      description: 'A massive Gatling gun of affection from Salak: MWAH MWAH MWAH MWAH MWAH! Overwhelming love protocol engaged!',
      rarity: 'legendary',
      icon: '💋',
      probabilityWeight: 10
    },
    {
      id: 'gacha_lifetime_sub',
      title: 'Lifetime subscription to Salak\'s love. No expiration date. ❤️',
      description: 'Non-refundable, non-cancellable, auto-renews every single morning with extra devotion.',
      rarity: 'legendary',
      icon: '❤️',
      probabilityWeight: 10
    },
    {
      id: 'gacha_owner_idiot',
      title: 'Congratulations! You are the owner of one emotionally attached idiot.',
      description: 'Salak comes pre-trained to adore you, laugh at your jokes, bring you food, and miss you constantly.',
      rarity: 'legendary',
      icon: '🥰',
      probabilityWeight: 10
    },
    {
      id: 'gacha_future_wife_dlc',
      title: 'Future Wife DLC Unlocked 💍',
      description: 'Includes matching pajama privileges, unlimited teasing rights, and shared life adventures with Salak forever.',
      rarity: 'legendary',
      icon: '💍',
      probabilityWeight: 10
    },
    {
      id: 'gacha_surprise_love_letter',
      title: 'SECRET LEGENDARY: A surprise love letter from Salak.',
      description: '“You are my favorite part of every single day, sweetheart. Loving you is the easiest thing Salak will ever do.” 💌',
      rarity: 'legendary',
      icon: '💌',
      probabilityWeight: 10
    }
  ],

  fortunes: [
    'Breaking news: You will remain ridiculously beautiful tomorrow, sweetheart.',
    'Salak is thinking about you with a huge goofy smile right now.',
    'Your future contains snacks, cuddles, and unnecessary arguments over food with Salak.',
    'You will steal someone\'s hoodie. The suspect is your boyfriend Salak.',
    'There is a 99.9% chance of receiving a virtual kiss from Salak right now.',
    'Salak has officially requested that you drink some water and stay hydrated, my queen.',
    'Today\'s lucky number is the number of times Salak has thought about you. Error: Too many to count.',
    'Prediction: A sudden wave of happiness from Salak is heading your way at 200 mph.',
    'The stars say: Salak\'s sweetheart needs boba and a tight hug immediately.',
    'Astrological report: Salak is 100% smitten with his sweetheart and incapable of recovery.',
    'Future vision: You will burst into laughter very soon because Salak did something delightfully clumsy.',
    'Mystical truth: No matter how boring the world is today, you are Salak’s entire universe.'
  ],

  emergencyDelights: [
    {
      id: 'delight_1',
      type: 'compliment',
      emoji: '✨',
      title: 'Emergency Compliment Inbound!',
      text: 'Did you know you look effortlessly stunning even when you are rolling your eyes or making funny faces? Because you do, sweetheart!'
    },
    {
      id: 'delight_2',
      type: 'hug',
      emoji: '🫂',
      title: 'Emergency Bear Hug Deployed!',
      text: 'Sending a massive, squeezy, warm virtual hug from Salak! Close your eyes for 3 seconds and feel the warmth. (Squeeze!)'
    },
    {
      id: 'delight_3',
      type: 'confession',
      emoji: '🥹',
      title: 'Classified Boyfriend Confession',
      text: 'Whenever you text me first, your boyfriend Salak literally stops whatever he is doing and smiles like a complete dork. It’s embarrassing but true.'
    },
    {
      id: 'delight_4',
      type: 'joke',
      emoji: '😂',
      title: 'Emergency Silly Joke',
      text: 'Are you a magician? Because whenever I talk to you, everyone else in the room disappears... and Salak\'s brain stops working entirely!'
    },
    {
      id: 'delight_5',
      type: 'surprise',
      emoji: '💖',
      title: 'Pookie Love Injection',
      text: 'Kiiii 😭! How are you so cute every single day?! It’s actually unfair to the rest of humanity, sweetheart! 💗'
    },
    {
      id: 'delight_6',
      type: 'compliment',
      emoji: '👑',
      title: 'Royal Decree',
      text: 'By royal proclamation of your boyfriend Salak: Sweetheart is hereby officially exempted from being sad, bored, or stressed for the rest of the day. You are the prettiest girl in the world and endlessly loved! 👑💗'
    },
    {
      id: 'delight_7',
      type: 'confession',
      emoji: '🫠',
      title: 'Secret Truth',
      text: 'Salak has saved your pictures in a special place and looks at them whenever he needs a boost of serotonin. You are my sunshine, sweetheart.'
    }
  ],

  systemRepairs: [
    {
      id: 'rep_1',
      patchVersion: 'Patch v2.1.0 — Dopamine Booster',
      headline: 'Dopamine Reservoir Re-filled! ⚡',
      message: 'Emergency affection packet delivered from Salak. Heart warmth elevated by 400%. Boredom banished to the shadow realm.',
      status: 'SYSTEM STATUS: CUTE & OPERATIONAL'
    },
    {
      id: 'rep_2',
      patchVersion: 'Patch v2.2.4 — Memory Refresh',
      headline: 'RAM Cleared (Except Salak\'s Silly Face) 😂',
      message: 'Unnecessary worries purged from cache. High-priority thread: "Remembering that sweetheart is loved unconditionally by Salak."',
      status: 'SYSTEM STATUS: SMILING RESTORED'
    },
    {
      id: 'rep_3',
      patchVersion: 'Patch v2.3.9 — Tea & Hug Protocol',
      headline: 'Error 418: I’m a Teapot (and Salak adores you) 🫖',
      message: 'Brewing infinite virtual warm drinks and blanket rolls for sweetheart. Please wrap yourself like a cozy burrito.',
      status: 'SYSTEM STATUS: COZY MAXIMUM'
    },
    {
      id: 'rep_4',
      patchVersion: 'Patch v2.4.1 — Anti-Boredom Firewall',
      headline: 'Firewall Deployed Against Dull Thoughts! 🛡️',
      message: 'Any thought that is not "I am Salak\'s pretty queen who deserves kisses" has been quarantined and deleted.',
      status: 'SYSTEM STATUS: QUEEN PROTOCOL ENGAGED'
    },
    {
      id: 'rep_5',
      patchVersion: 'Patch v2.5.0 — Unlimited Cuteness Driver',
      headline: 'Cuteness Driver Updated! 🐱',
      message: 'Detected excessive cheek pinchability on sweetheart. Salak has been dispatched to administer gentle virtual nose boops.',
      status: 'SYSTEM STATUS: 100% HEALED'
    }
  ],

  loveLetter: `Hey, my pretty girl. ❤️

I know sometimes you get bored, and I cannot always be right beside you to make you laugh. So I made this little ridiculous place just for you.

You have officially been appointed the CEO of my heart, the owner of my attention, and the only person allowed to bully me for the rest of my life. 😭💗

Jokes aside, I hope this made you smile, even a little. You deserve happiness on your boring days too, not just on your special days.

And whenever the world feels dull, remember that somewhere there is an idiot named Salak who loves you, thinks about you, and wants to see you smile.

Now stop being so cute, sweetheart. My heart has limited storage. 🫠❤️

Love,
Your favorite idiot, Salak.`
};
