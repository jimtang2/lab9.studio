'use client';
import { init } from '@telegram-apps/sdk';
import { useEffect } from 'react';

export default function TelegramMiniApp() {
  useEffect(() => {
    const [webApp] = init('WebApp');
    webApp.ready();
    webApp.expand();
  }, []);

  return <main>Telegram Mini App</main>;
}