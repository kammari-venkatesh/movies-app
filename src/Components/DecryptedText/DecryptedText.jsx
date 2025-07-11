import './index.css'
import { useEffect, useState, useRef } from 'react'
import React from 'react';
export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 1000,
  sequential = true,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(new Set());
  const containerRef = useRef(null);

  useEffect(() => {
    let interval;
    let currentIteration = 0;

    const getNextIndex = (revealedSet) => {
      const len = text.length;
      switch (revealDirection) {
        case 'start': return revealedSet.size;
        case 'end': return len - 1 - revealedSet.size;
        case 'center': {
          const mid = Math.floor(len / 2);
          const offset = Math.floor(revealedSet.size / 2);
          const idx = revealedSet.size % 2 === 0 ? mid + offset : mid - offset - 1;
          if (!revealedSet.has(idx) && idx >= 0 && idx < len) return idx;
          for (let i = 0; i < len; i++) if (!revealedSet.has(i)) return i;
          return 0;
        }
        default: return revealedSet.size;
      }
    };

    const availableChars = useOriginalCharsOnly
      ? Array.from(new Set(text.split(''))).filter((char) => char !== ' ')
      : characters.split('');

    const shuffleText = (originalText, revealed) => {
      if (useOriginalCharsOnly) {
        const chars = originalText.split('').map((c, i) => ({
          c, isSpace: c === ' ', i, isRevealed: revealed.has(i)
        }));
        const notRevealed = chars.filter(p => !p.isSpace && !p.isRevealed).map(p => p.c);
        for (let i = notRevealed.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [notRevealed[i], notRevealed[j]] = [notRevealed[j], notRevealed[i]];
        }
        let index = 0;
        return chars.map(p => p.isSpace ? ' ' : (p.isRevealed ? originalText[p.i] : notRevealed[index++])).join('');
      }
      return originalText.split('').map((c, i) => (
        revealed.has(i) || c === ' ' ? c : availableChars[Math.floor(Math.random() * availableChars.length)]
      )).join('');
    };

    if (isHovering) {
      setIsScrambling(true);
      interval = setInterval(() => {
        setRevealedIndices(prev => {
          if (sequential) {
            if (prev.size < text.length) {
              const newSet = new Set(prev);
              newSet.add(getNextIndex(prev));
              setDisplayText(shuffleText(text, newSet));
              return newSet;
            } else {
              clearInterval(interval);
              setIsScrambling(false);
              return prev;
            }
          } else {
            setDisplayText(shuffleText(text, prev));
            currentIteration++;
            if (currentIteration >= maxIterations) {
              clearInterval(interval);
              setIsScrambling(false);
              setDisplayText(text);
            }
            return prev;
          }
        });
      }, speed);
    } else {
      setDisplayText(text);
      setRevealedIndices(new Set());
      setIsScrambling(false);
    }

    return () => interval && clearInterval(interval);
  }, [
    isHovering, text, speed, maxIterations,
    sequential, revealDirection, characters,
    useOriginalCharsOnly
  ]);

  useEffect(() => {
  if (animateOn !== 'infinite') return;

  const startLoop = () => {
    setIsHovering(true);
    setTimeout(() => {
      setIsHovering(false);
      setTimeout(() => {
        startLoop(); // 🔁 Restart the loop after short delay
      }, 5000); // wait before restarting
    }, (maxIterations + 2) * speed); // duration to complete one scramble
  };

  startLoop();
}, [animateOn, speed, maxIterations]);


  const hoverProps = animateOn === 'hover'
    ? { onMouseEnter: () => setIsHovering(true), onMouseLeave: () => setIsHovering(false) }
    : {};

  return (
    <span
      className={`decrypted-parent ${parentClassName}`}
      ref={containerRef}
      {...hoverProps}
      {...props}
    >
      <span className="sr-only">{displayText}</span>
      <span aria-hidden="true">
        {displayText.split('').map((char, index) => (
          <span
            key={index}
            className={
              revealedIndices.has(index) || !isScrambling || !isHovering
                ? className
                : encryptedClassName
            }
          >
            {char}
          </span>
        ))}
      </span>
    </span>
  );
}
