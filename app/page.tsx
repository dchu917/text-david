"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

interface Typo {
  at: number;
  wrong: string;
  backspace: number;
  correct: string;
}

interface Message {
  type: "sent" | "received";
  text: string;
  typos?: Typo[];
}

const messages: Message[] = [
  {
    type: "sent",
    text: "yo 5299 apparently said poke is weird. u got anything to say about that",
  },
  {
    type: "received",
    text: "lol 0115 nice try stirring the pot. 5299 and poke can sort out their beef themselves im not getting in the middle of that",
  },
  {
    type: "sent",
    text: "5299 really out here calling me weird when they prob still use comic sans unironically",
    typos: [{ at: 37, wrong: "probly", backspace: 6, correct: "prob" }],
  },
  {
    type: "received",
    text: "ohhh poke coming in hot with the font shame. comic sans is a deep cut. your turn 5299 you gonna let that slide?",
  },
  { type: "sent", text: "nah i dont kiss people who use comic sans" },
  {
    type: "received",
    text: "clinker dodging the roast battle entirely with a kiss and make up. thats either big brain diplomacy or admitting defeat",
  },
  {
    type: "sent",
    text: "claiming victory. 5299 went silent. comic sans users always fold under pressure",
  },
  {
    type: "received",
    text: "poke wins by knockout. clinker folded faster than a lawn chair. rip 5299 may your comic sans legacy live on",
  },
  {
    type: "sent",
    text: "wait so konsti was just stirring the pot between two versions of the same person",
  },
  {
    type: "received",
    text: "this is some multiverse of madness stuff. three people one phone number. schrodingers texter",
  },
  {
    type: "sent",
    text: "konsti explain yourself before this group chat collapses into a singularity",
  },
  {
    type: "received",
    text: "0115 has gone suspiciously quiet. classic guilty behavior. accuse everyone else of being 5299 so nobody suspects youre 5299",
  },
  {
    type: "sent",
    text: "thats it konsti is 5299 confirmed. called himself weird blamed everyone else now hiding",
  },
  {
    type: "received",
    text: "case closed. 0115 played 4d chess and lost. the real cringe was the friends we made along the way",
  },
  { type: "sent", text: "this group chat is an absolute disaster" },
  {
    type: "received",
    text: "the group chat remembers. the group chat never forgets. text me:",
  },
  { type: "received", text: "__contact__" },
];

function playSound(type: "sent" | "received") {
  const audio = new Audio(
    type === "sent" ? "/sounds/send.mp3" : "/sounds/receive.mp3",
  );
  audio.volume = 0.4;
  audio.play().catch(() => {});
}

function EmojiIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" fill="white" />
      <circle cx="7" cy="8.5" r="1.2" fill="#8e8e93" />
      <circle cx="13" cy="8.5" r="1.2" fill="#8e8e93" />
      <path
        d="M6.5 12.5c.8 1.6 2.5 2.5 3.5 2.5s2.7-.9 3.5-2.5"
        stroke="#8e8e93"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Key({
  displayLabel,
  isActive,
  isSpecial,
  widthClass,
  children,
}: {
  displayLabel?: string;
  isActive: boolean;
  isSpecial: boolean;
  widthClass: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`flex h-[34px] items-center justify-center rounded-[5px] ${widthClass} ${
        isSpecial ? "bg-[#acb0b9]" : "bg-white"
      } ${isActive ? "!bg-[#9a9da5] scale-[1.08]" : ""} transition-all duration-75`}
      style={{ boxShadow: "0 1px 0 rgba(0,0,0,0.25)" }}
    >
      {children ?? (
        <span
          className={`select-none ${isSpecial ? "text-[11px]" : "text-[14px]"}`}
        >
          {displayLabel}
        </span>
      )}
    </div>
  );
}

function IOSKeyboard({
  show,
  activeKey,
}: {
  show: boolean;
  activeKey: string;
}) {
  const ak = activeKey.toLowerCase();

  const letterKey = (k: string) => (
    <Key
      key={k}
      displayLabel={k}
      isActive={ak === k}
      isSpecial={false}
      widthClass="w-[calc((100%-36px)/10)]"
    />
  );

  return (
    <div
      className={`shrink-0 bg-[#d1d3d9] px-[3px] pb-5 pt-[6px] transition-all duration-300 ease-out ${
        show ? "max-h-[360px] opacity-100" : "max-h-0 overflow-hidden opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-2xl flex-col gap-[7px] px-[3px]">
        {/* Row 1: q w e r t y u i o p — 10 keys full width */}
        <div className="flex justify-center gap-[4px]">
          {["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map(letterKey)}
        </div>

        {/* Row 2: a s d f g h j k l — 9 keys, inset half-key on each side */}
        <div className="flex justify-center gap-[4px] px-[calc((100%-36px)/20+2px)]">
          {["a", "s", "d", "f", "g", "h", "j", "k", "l"].map(letterKey)}
        </div>

        {/* Row 3: shift + z x c v b n m + delete */}
        <div className="flex justify-center gap-[4px]">
          <Key
            displayLabel={"\u21E7"}
            isActive={ak === "shift"}
            isSpecial={true}
            widthClass="w-[calc((100%-36px)/10*1.5+4px)]"
          />
          {["z", "x", "c", "v", "b", "n", "m"].map(letterKey)}
          <Key
            displayLabel={"\u232B"}
            isActive={ak === "backspace"}
            isSpecial={true}
            widthClass="w-[calc((100%-36px)/10*1.5+4px)]"
          />
        </div>

        {/* Row 4: 123 emoji space . return */}
        <div className="flex justify-center gap-[4px]">
          <Key
            displayLabel="123"
            isActive={false}
            isSpecial={true}
            widthClass="w-[38px]"
          />
          <Key isActive={false} isSpecial={true} widthClass="w-[34px]">
            <EmojiIcon />
          </Key>
          <Key
            displayLabel="space"
            isActive={ak === " "}
            isSpecial={false}
            widthClass="flex-1"
          />
          <Key
            displayLabel="."
            isActive={ak === "."}
            isSpecial={false}
            widthClass="w-[34px]"
          />
          <Key
            displayLabel="return"
            isActive={false}
            isSpecial={true}
            widthClass="w-[68px]"
          />
        </div>

        {/* Home indicator */}
        <div className="mt-1 flex justify-center">
          <div className="h-[5px] w-[134px] rounded-full bg-black/20" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [showTypingDots, setShowTypingDots] = useState(false);
  const [showDelivered, setShowDelivered] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [activeKey, setActiveKey] = useState("");
  const conversationRef = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (conversationRef.current) {
        conversationRef.current.scrollTop =
          conversationRef.current.scrollHeight;
      }
    });
  }, []);

  useEffect(() => {
    // Prevent double-run from React Strict Mode
    if (hasRun.current) return;
    hasRun.current = true;

    let stopped = false;

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        setTimeout(resolve, ms);
      });

    const typeDelay = () => 70 + Math.random() * 90;
    const pauseDelay = () => 400 + Math.random() * 400;

    const flashKey = (char: string) => {
      setActiveKey(char.toLowerCase());
      setTimeout(() => setActiveKey(""), 80);
    };

    async function run() {
      await sleep(1200);

      for (let i = 0; i < messages.length; i++) {
        if (stopped) return;
        const msg = messages[i];

        if (msg.type === "sent") {
          setShowKeyboard(true);
          await sleep(500);

          let current = "";
          const fullText = msg.text;
          const typos = msg.typos ?? [];
          let j = 0;

          while (j < fullText.length) {
            if (stopped) return;

            const typo = typos.find((t) => t.at === j);
            if (typo) {
              for (const ch of typo.wrong) {
                if (stopped) return;
                current += ch;
                setInputText(current);
                flashKey(ch);
                scrollToBottom();
                await sleep(typeDelay());
              }
              await sleep(pauseDelay());
              for (let k = 0; k < typo.backspace; k++) {
                if (stopped) return;
                current = current.slice(0, -1);
                setInputText(current);
                flashKey("backspace");
                await sleep(80 + Math.random() * 50);
              }
              await sleep(150);
              for (const ch of typo.correct) {
                if (stopped) return;
                current += ch;
                setInputText(current);
                flashKey(ch);
                scrollToBottom();
                await sleep(typeDelay());
              }
              j += typo.correct.length;
              continue;
            }

            current += fullText[j];
            setInputText(current);
            flashKey(fullText[j]);
            scrollToBottom();
            await sleep(typeDelay());
            j++;
          }

          await sleep(500);
          if (stopped) return;

          setInputText("");
          setShowKeyboard(false);
          playSound("sent");
          setVisibleMessages((prev) => [...prev, msg]);
          scrollToBottom();
          await sleep(800);
        } else {
          await sleep(800);
          if (stopped) return;
          setShowTypingDots(true);
          scrollToBottom();
          await sleep(1800 + Math.random() * 1200);
          if (stopped) return;
          setShowTypingDots(false);
          playSound("received");
          setVisibleMessages((prev) => [...prev, msg]);
          scrollToBottom();
          await sleep(600);
        }
      }

      await sleep(400);
      if (!stopped) {
        setShowDelivered(true);
      }
    }

    run();
    return () => {
      stopped = true;
    };
  }, [scrollToBottom]);

  return (
    <div className="flex h-screen bg-white">
      {/* Mobile — Text David landing */}
      <div className="flex flex-1 flex-col bg-white md:hidden">
        {/* Header */}
        <div className="flex flex-col items-center pt-16 pb-6">
          <h1 className="font-display text-5xl tracking-tight text-black">
            Text David.
          </h1>
          <p className="mt-3 text-[15px] tracking-wide text-[#8e8e93]">
            (630) 290-8039
          </p>
        </div>

        {/* Chat preview */}
        <div className="flex flex-1 flex-col justify-center gap-3 px-5 py-4">
          <div className="flex justify-end pr-2 mobile-bubble-1">
            <div className="bubble-sent">
              yo 5299 apparently said poke is weird. u got anything to say about
              that
            </div>
          </div>
          <div className="flex justify-start pl-2 mobile-bubble-2">
            <div className="bubble-received">
              lol 0115 nice try stirring the pot. 5299 and poke can sort out
              their beef themselves
            </div>
          </div>
          <div className="flex justify-end pr-2 mobile-bubble-3">
            <div className="bubble-sent">
              5299 really out here calling me weird when they prob still use
              comic sans unironically
            </div>
          </div>
          <div className="flex justify-start pl-2 mobile-bubble-4">
            <div className="bubble-received">
              ohhh poke coming in hot with the font shame. comic sans is a deep
              cut 🔥
            </div>
          </div>
          {/* Fade overlay at bottom of chat */}
          <div className="pointer-events-none h-12 bg-gradient-to-t from-white to-transparent -mt-12 relative z-10" />
        </div>

        {/* CTA area */}
        <div className="shrink-0 px-6 pb-10 pt-2">
          <a
            href="sms:6302908039"
            className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#007aff] py-4 text-[17px] font-semibold text-white shadow-lg shadow-blue-500/25 transition active:scale-[0.98]"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C6.477 2 2 5.813 2 10.5c0 2.51 1.327 4.758 3.414 6.319-.2 1.387-.753 2.61-1.414 3.181 0 0 2.6-.2 4.6-1.6.88.2 1.8.3 2.8.3h.6c5.523 0 10-3.813 10-8.5S17.523 2 12 2Z"
                fill="white"
              />
            </svg>
            Send a Message
          </a>
          <p className="mt-3 text-center text-[13px] text-[#8e8e93]">
            iMessage &middot; SMS
          </p>
        </div>
      </div>

      {/* Left side — iPhone chat (desktop only) */}
      <div className="hidden w-[420px] flex-col border-r border-black/5 md:flex lg:w-[480px]">
        {/* Status bar */}
        <div className="flex shrink-0 items-center justify-between px-6 pb-1 pt-3 text-[14px] font-semibold">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
              <rect x="0" y="9" width="3" height="3" rx="0.5" fill="black" />
              <rect x="4.5" y="6" width="3" height="6" rx="0.5" fill="black" />
              <rect x="9" y="3" width="3" height="9" rx="0.5" fill="black" />
              <rect
                x="13.5"
                y="0"
                width="3"
                height="12"
                rx="0.5"
                fill="black"
              />
            </svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path
                d="M8 11.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"
                fill="black"
              />
              <path
                d="M5.17 8.33a4 4 0 0 1 5.66 0"
                stroke="black"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <path
                d="M2.93 6.1a7 7 0 0 1 10.14 0"
                stroke="black"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <path
                d="M.7 3.87a10 10 0 0 1 14.6 0"
                stroke="black"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
            <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
              <rect
                x="0.5"
                y="0.5"
                width="22"
                height="12"
                rx="2.5"
                stroke="black"
                strokeOpacity="0.35"
              />
              <rect x="2" y="2" width="19" height="9" rx="1.5" fill="black" />
              <path
                d="M24 4.5v4a2 2 0 0 0 0-4Z"
                fill="black"
                fillOpacity="0.4"
              />
            </svg>
          </div>
        </div>

        {/* Nav bar */}
        <div className="shrink-0 border-b border-black/5 bg-white/70 backdrop-blur-xl">
          <div className="flex items-center justify-center px-4 py-2">
            <div className="flex flex-col items-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#a0a0a8] text-xs font-semibold text-white">
                D
              </div>
              <p className="mt-0.5 text-[11px] font-semibold text-black">
                David
              </p>
            </div>
          </div>
        </div>

        {/* Conversation */}
        <div ref={conversationRef} className="flex-1 overflow-y-auto bg-white">
          <div className="flex flex-col gap-4 px-4 py-6">
            <p className="mb-2 mt-2 text-center text-[11px] font-medium text-[#8e8e93]">
              Today 9:41 AM
            </p>

            {visibleMessages.map((msg, i) =>
              msg.text === "__contact__" ? (
                <div
                  key={i}
                  className={`flex ${msg.type === "sent" ? "justify-end pr-2" : "justify-start pl-2"} bubble-appear`}
                >
                  <a
                    href="sms:6302908039"
                    className={`flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 ${
                      msg.type === "sent" ? "bg-[#007aff]" : "bg-[#e9e9eb]"
                    }`}
                  >
                    <span
                      className={`text-[15px] font-semibold ${
                        msg.type === "sent" ? "text-white" : "text-black"
                      }`}
                    >
                      David Chu
                    </span>
                    {/* Initials circle */}
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                        msg.type === "sent" ? "bg-white/25" : "bg-[#c7c7cc]"
                      }`}
                    >
                      <span
                        className={`text-[13px] font-bold leading-none ${
                          msg.type === "sent" ? "text-white" : "text-white"
                        }`}
                      >
                        DC
                      </span>
                    </div>
                    {/* Chevron */}
                    <svg
                      width="7"
                      height="12"
                      viewBox="0 0 7 12"
                      fill="none"
                      className="shrink-0"
                    >
                      <path
                        d="M1 1l4.5 5L1 11"
                        stroke={
                          msg.type === "sent"
                            ? "rgba(255,255,255,0.6)"
                            : "#c7c7cc"
                        }
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              ) : (
                <div
                  key={i}
                  className={`flex ${msg.type === "sent" ? "justify-end pr-2" : "justify-start pl-2"} bubble-appear`}
                >
                  <div
                    className={
                      msg.type === "sent" ? "bubble-sent" : "bubble-received"
                    }
                  >
                    {msg.text}
                  </div>
                </div>
              ),
            )}

            {showDelivered && (
              <p className="mr-4 mt-0.5 text-right text-[11px] font-medium text-[#8e8e93]">
                Delivered
              </p>
            )}

            {showTypingDots && (
              <div className="flex justify-start pl-2 bubble-appear">
                <div className="bubble-received">
                  <div className="flex items-center gap-[5px] px-1 py-0.5">
                    <span
                      className="typing-dot"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="typing-dot"
                      style={{ animationDelay: "200ms" }}
                    />
                    <span
                      className="typing-dot"
                      style={{ animationDelay: "400ms" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <p className="my-4 text-center text-[11px] font-medium text-[#8e8e93]">
              David is your friend
            </p>
          </div>
        </div>

        {/* Input bar */}
        <div className="shrink-0 border-t border-black/5 bg-white/80 px-3 py-2 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <a
              href="sms:6302908039"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#007aff]"
              aria-label="Add"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M9 3v12M3 9h12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </a>
            <div className="flex flex-1 items-center justify-between rounded-full border border-[#c6c6c8] bg-white py-1 pl-4 pr-1">
              {inputText ? (
                <span className="flex-1 text-[16px] text-black">
                  {inputText}
                  <span className="input-cursor">|</span>
                </span>
              ) : (
                <a
                  href="sms:6302908039"
                  className="flex-1 text-[16px] text-[#8e8e93]"
                >
                  Text 6302908039
                </a>
              )}
              <a
                href="sms:6302908039"
                className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#007aff] transition hover:opacity-90"
                aria-label="Send"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 13V3M8 3l4.5 4.5M8 3 3.5 7.5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* iOS Keyboard */}
        <IOSKeyboard show={showKeyboard} activeKey={activeKey} />
      </div>

      {/* Right side — Text David */}
      <div className="hidden flex-1 flex-col items-center justify-center bg-white md:flex relative">
        <div className="flex flex-col items-center">
          <h1 className="font-display text-7xl tracking-tight text-black lg:text-8xl">
            Text David.
          </h1>
          <p className="mt-4 text-lg tracking-wide text-[#8e8e93]">
            (630) 290-8039
          </p>
          <a
            href="sms:6302908039"
            className="mt-6 flex items-center gap-2.5 rounded-full bg-[#007aff] py-3 pl-6 pr-8 text-[17px] font-semibold text-white transition hover:brightness-110 active:scale-95"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C6.477 2 2 5.813 2 10.5c0 2.51 1.327 4.758 3.414 6.319-.2 1.387-.753 2.61-1.414 3.181 0 0 2.6-.2 4.6-1.6.88.2 1.8.3 2.8.3h.6c5.523 0 10-3.813 10-8.5S17.523 2 12 2Z"
                fill="white"
              />
            </svg>
            Send a Message
          </a>
        </div>
        <div className="absolute bottom-6 flex gap-4 text-[13px] text-[#8e8e93]">
          <Link
            href="/privacy-policy"
            className="hover:text-black transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms-of-service"
            className="hover:text-black transition-colors"
          >
            Terms
          </Link>
          <Link href="/eula" className="hover:text-black transition-colors">
            EULA
          </Link>
        </div>
      </div>
    </div>
  );
}
