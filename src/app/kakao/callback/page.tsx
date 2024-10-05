'use client';

const axios = require('axios');
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  //   const code = new URL(window.location.href).searchParams.get('code');
  const code = new URL(window.location.toString()).searchParams.get('code');

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/oauth/kakao?code=${code}`
        );
      } catch (e) {
    
      }
    })();
  }, [window.location]);
  return <div></div>;
}
