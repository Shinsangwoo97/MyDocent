'use client'
import Audioplayer from '../../components/ExplanationAudio';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Error from '../error/page';

export default function Player() {
  return (
    <>
      <Audioplayer />
    </>
  );
}