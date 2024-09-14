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
        console.log(res);
        const token = res.headers.authorization;
        console.log(token);
        window.localStorage.setItem('token', token);
        router.push('/');
        window.location.reload();
      } catch (e) {
        console.error(e);
        router.push('/');
      }
    })();
  }, [window.location]);
  return <div></div>;
}
