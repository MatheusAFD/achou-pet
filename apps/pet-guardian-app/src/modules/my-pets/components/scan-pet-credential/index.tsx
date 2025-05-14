'use client'

import { useRef, useState, useEffect } from 'react'

import Image from 'next/image'

import { CameraOff, ScanQrCode } from 'lucide-react'
import QrScanner from 'qr-scanner'
import { toast } from 'sonner'

import { Button, Conditional } from '@user-app/modules/@shared/components'
import { useSteps } from '@user-app/modules/@shared/hooks'

import { AttachCredentialFormSteps } from '../../types'

export const ScanPetCredential = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const [cameraError, setCameraError] = useState<string | null>(null)
  const [scanning, setScanning] = useState(false)

  const { updateFormStep } = useSteps<AttachCredentialFormSteps>()

  useEffect(() => {
    if (!scanning) return
    let scanner: QrScanner | null = null
    const localVideoRef = videoRef.current

    const initializeCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' } }
        })
        if (localVideoRef) {
          localVideoRef.srcObject = stream
          localVideoRef.onloadedmetadata = () => {
            localVideoRef.play()
          }
        }
        scanner = new QrScanner(localVideoRef!, (result) => {
          if (
            result &&
            (typeof result === 'string' ||
              (typeof result === 'object' && 'data' in result))
          ) {
            console.log('QR Code result:', result)
            toast.success('QR Code escaneado com sucesso')
            updateFormStep(AttachCredentialFormSteps.PetData)
          } else {
            toast.warning('QR Code não reconhecido')
          }
          setScanning(false)

          scanner?.stop()

          if (localVideoRef && localVideoRef.srcObject) {
            const tracks = (localVideoRef.srcObject as MediaStream).getTracks()
            tracks.forEach((track) => track.stop())
            localVideoRef.srcObject = null
          }
        })
        scanner.start()
      } catch (err) {
        if (
          err &&
          typeof err === 'object' &&
          err !== null &&
          'name' in err &&
          (err as { name?: string }).name === 'NotAllowedError'
        ) {
          setCameraError('Permissão da câmera negada pelo usuário')
        } else {
          setCameraError('Permissão da câmera negada ou não disponível')
        }
        setScanning(false)
      }
    }

    initializeCameraStream()

    return () => {
      scanner?.stop()
      if (localVideoRef && localVideoRef.srcObject) {
        const tracks = (localVideoRef.srcObject as MediaStream).getTracks()
        tracks.forEach((track) => track.stop())
        localVideoRef.srcObject = null
      }
    }
  }, [scanning, updateFormStep])

  return (
    <div className="relative w-full flex flex-col gap-8 justify-center items-center">
      <h1 className="text-lg font-semibold">
        1. Aponte a câmera para o QR Code
      </h1>

      <Image src="/scan-camera.svg" width={256} height={256} alt="Camera" />

      <Button
        onClick={() => {
          setCameraError(null)
          setScanning(true)
        }}
        className="mt-8"
        disabled={scanning}
        size="lg"
      >
        <ScanQrCode />
        {scanning ? 'Escaneando...' : 'Escanear QR Code'}
      </Button>

      <Conditional condition={!!cameraError}>
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded">
          {cameraError}
        </div>
      </Conditional>

      <Conditional condition={scanning && !cameraError}>
        <div className="w-full fixed inset-0 top-14 flex justify-center items-center">
          <div className="relative">
            <div className=" w-full max-w-md">
              <video ref={videoRef} className="w-full h-auto" autoPlay muted />
            </div>

            <Button
              className="absolute top-2 right-2"
              size="icon"
              onClick={() => setScanning(false)}
            >
              <CameraOff />
            </Button>
          </div>
        </div>
      </Conditional>
    </div>
  )
}
